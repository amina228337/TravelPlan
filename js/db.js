// =============================================
// db.js - функции работы TravelPlan с Supabase
// =============================================

function isSupabaseReady() {
  return Boolean(window.supabaseClient);
}

async function dbTestConnection() {
  if (!isSupabaseReady()) {
    console.warn('Supabase SDK не найден. Проверь подключение CDN в index.html.');
    return false;
  }

  const { data, error } = await supabaseClient
    .from('reviews')
    .select('id')
    .limit(1);

  if (error) {
    console.warn('Supabase подключён, но запрос не прошёл:', error.message);
    return false;
  }

  console.log('Supabase подключён:', data);
  return true;
}

// ── Reviews ────────────────────────────────────────────────────────────────

async function dbGetReviews(entityType, entityId) {
  if (!isSupabaseReady()) return [];

  const { data, error } = await supabaseClient
    .from('reviews')
    .select('*')
    .eq('entity_type', entityType)
    .eq('entity_id', entityId)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Ошибка загрузки отзывов:', error.message);
    return [];
  }

  return data || [];
}

async function dbAddReview({ entityType, entityId, city, country, authorName, rating, comment, imageUrl }) {
  if (!isSupabaseReady()) throw new Error('Supabase не подключён');

  const { data, error } = await supabaseClient
    .from('reviews')
    .insert({
      entity_type: entityType,
      entity_id: entityId,
      city: city || null,
      country: country || null,
      user_id: window.travelplanCurrentUser?.id || null,
      author_name: authorName,
      rating: Number(rating),
      comment: comment?.trim() || null,
      image_url: imageUrl || null
    })
    .select()
    .single();

  if (error) {
    console.error('Ошибка добавления отзыва:', error.message);
    throw error;
  }

  return data;
}

function calcAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return null;
  const sum = reviews.reduce((acc, item) => acc + Number(item.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

// ── Bookings ───────────────────────────────────────────────────────────────

function getCurrentAuthUserSync() {
  return window.travelplanCurrentUser || null;
}

function getCurrentProfileSync() {
  return window.travelplanUserProfile || null;
}

function appBookingToDbBooking(booking) {
  const isFlight = booking.type === 'flight';
  const user = getCurrentAuthUserSync();
  const email = user?.email || null;
  const routeFrom = booking.city_from || booking.from || (String(booking.destination || '').split('→')[0]?.trim()) || null;
  const routeTo = booking.city_to || booking.to || (String(booking.destination || '').split('→').pop()?.trim()) || booking.arrival || null;

  return {
    user_id: user?.id || null,
    user_email: email,
    booking_type: isFlight ? 'flight' : 'hotel',
    status: booking.status === 'expired' ? 'expired' : 'pending',
    customer_name: booking.customer_name || booking.name || null,
    customer_email: booking.customer_email || null,
    customer_phone: booking.customer_phone || null,

    city_from: isFlight ? routeFrom : null,
    city_to: isFlight ? routeTo : booking.destination || booking.city_to || null,
    country_to: booking.country || booking.country_to || null,

    airline: isFlight ? booking.airline || booking.carrier || booking.departure || null : null,
    flight_key: isFlight ? booking.flight_key || `${routeFrom || ''}->${routeTo || ''}` : null,
    departure_time: booking.outbound_depart || booking.departure_time || null,
    arrival_time: booking.outbound_arrive || booking.arrival_time || null,
    return_departure_time: booking.return_depart || null,
    return_arrival_time: booking.return_arrive || null,
    duration: booking.flight_duration || booking.duration || null,
    travel_class: booking.travel_class || booking.class || null,

    hotel_name: !isFlight ? booking.departure || booking.hotel_name || null : null,
    hotel_key: !isFlight ? booking.hotel_key || booking.departure || booking.hotel_name || null : null,
    check_in: booking.date_from || null,
    check_out: booking.date_to || null,

    guests: Number(booking.guests || 1),
    passengers: Number(booking.guests || booking.passengers || 1),
    total_price: Number(booking.price || booking.total_price || 0),
    paid_at: booking.payment_status === 'paid' ? booking.paid_at || new Date().toISOString() : null
  };
}

function dbBookingToAppBooking(row) {
  const isFlight = row.booking_type === 'flight';
  return {
    id: row.id,
    __backendId: row.id,
    type: isFlight ? 'flight' : 'hotel',
    status: row.status === 'expired' ? 'expired' : 'active',
    payment_status: row.status === 'paid' ? 'paid' : 'pending',
    paid_at: row.paid_at,
    departure: isFlight ? (row.airline || 'Рейс') : (row.hotel_name || 'Отель'),
    destination: isFlight ? `${row.city_from || ''} → ${row.city_to || ''}` : row.city_to,
    city_from: row.city_from,
    city_to: row.city_to,
    airline: row.airline,
    date_from: row.check_in || row.created_at,
    date_to: row.check_out || null,
    guests: row.guests || row.passengers || 1,
    price: row.total_price || 0,
    outbound_depart: row.departure_time,
    outbound_arrive: row.arrival_time,
    return_depart: row.return_departure_time,
    return_arrive: row.return_arrival_time,
    flight_duration: row.duration,
    travel_class: row.travel_class,
    created_at: row.created_at
  };
}

async function dbCreateBooking(booking) {
  if (!isSupabaseReady()) throw new Error('Supabase не подключён');

  const { data, error } = await supabaseClient
    .from('bookings')
    .insert(appBookingToDbBooking(booking))
    .select()
    .single();

  if (error) {
    console.error('Ошибка создания брони:', error.message);
    throw error;
  }

  return data;
}

async function dbGetBookings() {
  if (!isSupabaseReady()) return [];

  const { data, error } = await supabaseClient
    .from('bookings')
    .select('*')
    .neq('status', 'cancelled')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Ошибка загрузки броней:', error.message);
    return [];
  }

  return (data || []).map(dbBookingToAppBooking);
}

async function dbMarkBookingPaid(bookingId) {
  if (!isSupabaseReady()) throw new Error('Supabase не подключён');

  const { data, error } = await supabaseClient
    .from('bookings')
    .update({ status: 'paid', paid_at: new Date().toISOString() })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error('Ошибка оплаты брони:', error.message);
    throw error;
  }

  return data;
}

async function dbCancelBooking(bookingId) {
  if (!isSupabaseReady()) throw new Error('Supabase не подключён');

  const { data, error } = await supabaseClient
    .from('bookings')
    .update({ status: 'cancelled' })
    .eq('id', bookingId)
    .select()
    .single();

  if (error) {
    console.error('Ошибка отмены брони:', error.message);
    throw error;
  }

  return data;
}

async function dbGetFlightPaidCount(flightKey) {
  if (!isSupabaseReady()) return 0;

  const { data, error } = await supabaseClient
    .from('bookings')
    .select('passengers')
    .eq('booking_type', 'flight')
    .eq('status', 'paid')
    .eq('flight_key', flightKey);

  if (error) {
    console.error('Ошибка статистики рейса:', error.message);
    return 0;
  }

  return (data || []).reduce((sum, row) => sum + Number(row.passengers || 1), 0);
}

async function dbGetHotelPaidCount(hotelKey) {
  if (!isSupabaseReady()) return 0;

  const { count, error } = await supabaseClient
    .from('bookings')
    .select('*', { count: 'exact', head: true })
    .eq('booking_type', 'hotel')
    .eq('status', 'paid')
    .eq('hotel_key', hotelKey);

  if (error) {
    console.error('Ошибка статистики отеля:', error.message);
    return 0;
  }

  return count || 0;
}


// ── Profiles / Auth helpers ───────────────────────────────────────────────

async function dbGetCurrentUser() {
  if (!isSupabaseReady()) return null;
  const { data, error } = await supabaseClient.auth.getUser();
  if (error) return null;
  return data?.user || null;
}

async function dbGetProfile(userId = null) {
  if (!isSupabaseReady()) return null;
  const user = userId ? { id: userId } : await dbGetCurrentUser();
  if (!user?.id) return null;
  const { data, error } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .maybeSingle();
  if (error) {
    console.warn('Профиль пока не загрузился:', error.message);
    return null;
  }
  return data || null;
}

async function dbUpsertProfile(profile) {
  if (!isSupabaseReady()) throw new Error('Supabase не подключён');
  const user = await dbGetCurrentUser();
  if (!user?.id) throw new Error('Нужно войти в аккаунт');
  const payload = {
    id: user.id,
    email: user.email,
    display_name: profile.display_name || profile.nickname || user.user_metadata?.full_name || user.email?.split('@')[0] || 'Путешественник',
    nickname: profile.nickname || profile.display_name || user.email?.split('@')[0] || 'traveler',
    display_name_updated_at: profile.display_name_updated_at || null,
    nickname_updated_at: profile.nickname_updated_at || null,
    avatar_url: profile.avatar_url || user.user_metadata?.avatar_url || null,
    avatar_updated_at: profile.avatar_updated_at || null,
    country: profile.country || null,
    city: profile.city || 'Алматы',
    travel_style: profile.travel_style || 'Комфортно и красиво',
    budget_level: profile.budget_level || 'Средний',
    updated_at: new Date().toISOString()
  };
  const { data, error } = await supabaseClient
    .from('profiles')
    .upsert(payload, { onConflict: 'id' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

async function dbEnsureProfile() {
  const user = await dbGetCurrentUser();
  if (!user?.id) return null;
  let profile = await dbGetProfile(user.id);
  if (!profile) {
    profile = await dbUpsertProfile({
      display_name: user.user_metadata?.full_name || user.email?.split('@')[0],
      nickname: user.email?.split('@')[0],
      avatar_url: user.user_metadata?.avatar_url,
      city: (typeof getUserCity === 'function' ? getUserCity().name : 'Алматы')
    });
  }
  return profile;
}

// ── Places ─────────────────────────────────────────────────────────────────

async function dbGetPlaces(city = null) {
  if (!isSupabaseReady()) return [];

  let query = supabaseClient
    .from('places')
    .select('*')
    .order('country', { ascending: true })
    .order('city', { ascending: true })
    .order('category', { ascending: true });

  if (city) query = query.eq('city', city);

  const { data, error } = await query;

  if (error) {
    console.error('Ошибка загрузки мест:', error.message);
    return [];
  }

  return data || [];
}

// Тест запускается мягко: если таблицы ещё не созданы, сайт не ломается.
window.addEventListener('DOMContentLoaded', () => {
  dbTestConnection();
});

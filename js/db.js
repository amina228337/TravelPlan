// =============================================
// db.js - функции работы TravelPlan с Supabase
// =============================================

// Зачем этот файл:
// Тонкий слой между сайтом и Supabase. Остальной код не должен знать детали запросов к базе.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

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

  return await tpHydrateReviewRowsWithProfileAvatars(data || []);
}

async function dbAddReview({ entityType, entityId, city, country, authorName, rating, comment, imageUrl, avatarUrl }) {
  if (!isSupabaseReady()) throw new Error('Supabase не подключён');

  const basePayload = {
    entity_type: entityType,
    entity_id: entityId,
    city: city || null,
    country: country || null,
    user_id: window.travelplanCurrentUser?.id || null,
    author_name: authorName,
    rating: Number(rating),
    comment: comment?.trim() || null,
    image_url: imageUrl || null
  };

  // Если в таблице reviews есть колонка avatar_url, аватар сохраняется в Supabase
  // и будет виден с другого аккаунта/браузера. Если колонки ещё нет, запрос
  // мягко повторится без неё, чтобы публикация отзыва не падала перед защитой.
  const payloadWithAvatar = {
    ...basePayload,
    avatar_url: avatarUrl || null
  };

  let { data, error } = await supabaseClient
    .from('reviews')
    .insert(payloadWithAvatar)
    .select()
    .single();

  if (error && /avatar_url|schema cache|column/i.test(error.message || '')) {
    ({ data, error } = await supabaseClient
      .from('reviews')
      .insert(basePayload)
      .select()
      .single());
    if (data && avatarUrl) {
      data.avatar_url = data.avatar_url || avatarUrl;
      data.author_avatar_url = data.author_avatar_url || avatarUrl;
    }
  }

  if (error) {
    console.error('Ошибка добавления отзыва:', error.message);
    throw error;
  }

  const cachedRow = data || { ...basePayload, avatar_url: avatarUrl || null, author_avatar_url: avatarUrl || null, created_at: new Date().toISOString() };
  if (avatarUrl) {
    cachedRow.avatar_url = cachedRow.avatar_url || avatarUrl;
    cachedRow.author_avatar_url = cachedRow.author_avatar_url || avatarUrl;
  }
  tpAddReviewToCache(cachedRow);
  return cachedRow;
}

function calcAverageRating(reviews) {
  if (!reviews || reviews.length === 0) return null;
  const sum = reviews.reduce((acc, item) => acc + Number(item.rating || 0), 0);
  return Math.round((sum / reviews.length) * 10) / 10;
}

async function tpHydrateReviewRowsWithProfileAvatars(rows = []) {
  const list = Array.isArray(rows) ? rows : [];
  if (!list.length) return list;

  // Без миграций Supabase: аватарка берётся из profiles по user_id.
  // Если profiles закрыт RLS, хотя бы отзывы текущего пользователя получают аву
  // из уже загруженного профиля. Ну хоть где-то хаос загнан в стойло.
  const currentUserId = window.travelplanCurrentUser?.id || null;
  const currentAvatar = window.travelplanUserProfile?.avatar_url
    || window.travelplanCurrentUser?.user_metadata?.avatar_url
    || '';

  const withCurrentUserAvatar = list.map(row => {
    const hasAvatar = row?.avatar_url || row?.author_avatar_url || row?.avatarUrl;
    if (!hasAvatar && currentUserId && row?.user_id === currentUserId && currentAvatar) {
      return { ...row, avatar_url: currentAvatar, author_avatar_url: currentAvatar };
    }
    return row;
  });

  if (!isSupabaseReady()) return withCurrentUserAvatar;

  const missingAvatarUserIds = [...new Set(withCurrentUserAvatar
    .filter(row => row?.user_id && !(row.avatar_url || row.author_avatar_url || row.avatarUrl))
    .map(row => row.user_id))];

  if (!missingAvatarUserIds.length) return withCurrentUserAvatar;

  try {
    const { data: profiles, error } = await supabaseClient
      .from('profiles')
      .select('id, avatar_url, display_name, nickname')
      .in('id', missingAvatarUserIds);

    if (error) {
      console.warn('Не удалось подтянуть аватарки из profiles:', error.message);
      return withCurrentUserAvatar;
    }

    const byId = new Map((profiles || []).map(profile => [profile.id, profile]));
    return withCurrentUserAvatar.map(row => {
      const profile = byId.get(row.user_id);
      if (!profile?.avatar_url) return row;
      return {
        ...row,
        avatar_url: row.avatar_url || profile.avatar_url,
        author_avatar_url: row.author_avatar_url || profile.avatar_url,
        author_name: row.author_name || profile.display_name || profile.nickname || 'Гость'
      };
    });
  } catch (err) {
    console.warn('Ошибка подтягивания аватарок отзывов:', err?.message || err);
    return withCurrentUserAvatar;
  }
}


// ── Reviews cache: синхронизация отзывов из Supabase со всем сайтом ───────

function tpReviewToUiReview(row) {
  if (!row) return null;
  const created = row.created_at || row.updated_at || row.date || null;
  let date = '';
  try {
    date = created
      ? new Date(created).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
      : '';
  } catch {
    date = '';
  }

  return {
    id: row.id,
    author: row.author_name || row.author || 'Гость',
    author_name: row.author_name || row.author || 'Гость',
    rating: Number(row.rating || 0),
    text: row.comment || row.text || '',
    comment: row.comment || row.text || '',
    imageUrl: row.image_url || row.imageUrl || '',
    image_url: row.image_url || row.imageUrl || '',
    avatarUrl: row.avatar_url || row.author_avatar_url || row.avatarUrl || '',
    avatar_url: row.avatar_url || row.author_avatar_url || row.avatarUrl || '',
    date,
    created_at: created,
    user_id: row.user_id || null,
    entity_type: row.entity_type,
    entity_id: row.entity_id,
    city: row.city || null,
    country: row.country || null,
    _source: 'supabase'
  };
}

function tpReviewCacheKey(entityType, entityId) {
  return `${String(entityType || '').trim()}::${String(entityId || '').trim()}`;
}

function tpReviewCacheKeysForUi(ui) {
  const keys = [tpReviewCacheKey(ui.entity_type, ui.entity_id)];
  // Для направлений дополнительно кладём ключ по названию города,
  // чтобы код мог найти отзыв и по id "shymkent", и по "Шымкент".
  if (ui.entity_type === 'destination' && ui.city) keys.push(tpReviewCacheKey('destination', ui.city));
  return [...new Set(keys)];
}

function tpReviewTimestamp(review) {
  const raw = review?.created_at || review?.updated_at || review?.createdAt || review?.dateRaw || review?.date || '';
  const time = Date.parse(raw);
  return Number.isFinite(time) ? time : 0;
}

function tpSortReviewsNewestFirst(reviews = []) {
  return [...reviews].sort((a, b) => tpReviewTimestamp(b) - tpReviewTimestamp(a));
}

function tpReviewSemanticKey(review) {
  const entityType = String(review?.entity_type || '').trim().toLowerCase();
  const entityId = String(review?.entity_id || '').trim().toLowerCase();
  const author = String(review?.author || review?.author_name || '').trim().toLowerCase();
  const text = String(review?.text || review?.comment || '').trim().toLowerCase();
  const rating = String(review?.rating || '').trim();
  const rawDate = review?.created_at || review?.date || '';
  let day = '';
  const parsed = Date.parse(rawDate);
  if (Number.isFinite(parsed)) day = new Date(parsed).toISOString().slice(0, 10);
  else day = String(rawDate).trim().toLowerCase();
  return `${entityType}::${entityId}::${author}::${rating}::${text}::${day}`;
}

function tpAddReviewToCache(row) {
  const ui = tpReviewToUiReview(row);
  if (!ui || !ui.entity_type || !ui.entity_id) return null;
  if (!window.travelplanReviewsCache || typeof window.travelplanReviewsCache.get !== 'function') {
    window.travelplanReviewsCache = new Map();
  }
  tpReviewCacheKeysForUi(ui).forEach(key => {
    const current = window.travelplanReviewsCache.get(key) || [];
    window.travelplanReviewsCache.set(key, tpMergeReviews([ui], current));
  });
  window.travelplanReviewsCacheLoaded = true;
  window.travelplanReviewsCacheLoadedAt = Date.now();
  return ui;
}

function tpSetReviewsCache(rows) {
  const map = new Map();
  (rows || []).forEach(row => {
    const ui = tpReviewToUiReview(row);
    if (!ui || !ui.entity_type || !ui.entity_id) return;

    tpReviewCacheKeysForUi(ui).forEach(key => {
      if (!map.has(key)) map.set(key, []);
      map.get(key).push(ui);
    });
  });

  for (const [key, value] of map.entries()) map.set(key, tpMergeReviews([], value));
  window.travelplanReviewsCache = map;
  window.travelplanReviewsCacheLoaded = true;
  window.travelplanReviewsCacheLoadedAt = Date.now();
  return map;
}

async function dbLoadAllReviewsCache() {
  if (!isSupabaseReady()) {
    window.travelplanReviewsCache = new Map();
    window.travelplanReviewsCacheLoaded = false;
    return [];
  }

  const { data, error } = await supabaseClient
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Не удалось загрузить отзывы из Supabase:', error.message);
    window.travelplanReviewsCache = new Map();
    window.travelplanReviewsCacheLoaded = false;
    return [];
  }

  const hydrated = await tpHydrateReviewRowsWithProfileAvatars(data || []);
  tpSetReviewsCache(hydrated);
  return hydrated;
}

function dbGetCachedReviews(entityType, entityId) {
  const map = window.travelplanReviewsCache;
  if (!map || typeof map.get !== 'function') return [];
  return map.get(tpReviewCacheKey(entityType, entityId)) || [];
}

function tpMergeReviews(localReviews = [], dbReviews = []) {
  const result = [];
  const byId = new Set();
  const bySemantic = new Map();

  // Сначала Supabase, потом localStorage. Если localStorage содержит старую копию того же
  // отзыва, она не появится вторым дублем, но может добить аватарку, если в БД ещё нет avatar_url.
  [...dbReviews, ...localReviews].forEach((review) => {
    if (!review) return;
    const idKey = review.id ? `id:${review.id}` : null;
    const semKey = tpReviewSemanticKey(review);

    if (idKey && byId.has(idKey)) return;
    const existingIndex = bySemantic.get(semKey);
    if (existingIndex !== undefined) {
      const existing = result[existingIndex];
      if (!existing.avatarUrl && (review.avatarUrl || review.avatar_url)) {
        existing.avatarUrl = review.avatarUrl || review.avatar_url;
        existing.avatar_url = review.avatarUrl || review.avatar_url;
      }
      if (!existing.imageUrl && (review.imageUrl || review.image_url)) {
        existing.imageUrl = review.imageUrl || review.image_url;
        existing.image_url = review.imageUrl || review.image_url;
      }
      if (!existing.id && review.id) existing.id = review.id;
      if (!existing.created_at && review.created_at) existing.created_at = review.created_at;
      return;
    }

    if (idKey) byId.add(idKey);
    bySemantic.set(semKey, result.length);
    result.push(review);
  });

  return tpSortReviewsNewestFirst(result);
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

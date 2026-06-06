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
// Важно: отзывы теперь живут по одному правилу:
// 1 объект + 1 владелец = 1 отзыв.
// Владелец = auth.uid() для аккаунта или стабильный guest-id для гостя.
// Старые локальные дубли больше не зеркалим поверх Supabase, потому что именно так рождаются два отзыва из одного клика.

window.travelplanReviewsCache = window.travelplanReviewsCache || { loaded: false, rows: [] };

function tpGetCurrentReviewUserId() {
  return window.travelplanCurrentUser?.id || null;
}

function tpNormalizeOwnerText(value) {
  return String(value || '').trim().toLowerCase();
}

function tpGetGuestReviewId() {
  const key = 'travelplan_review_guest_id';
  try {
    let id = localStorage.getItem(key);
    if (!id) {
      id = 'guest_' + Math.random().toString(36).slice(2) + '_' + Date.now().toString(36);
      localStorage.setItem(key, id);
    }
    return id;
  } catch {
    return 'guest_fallback';
  }
}

function tpGetCurrentReviewOwnerKey() {
  return String(tpGetCurrentReviewUserId() || tpGetGuestReviewId());
}

function tpCurrentAuthorNames() {
  const user = window.travelplanCurrentUser || null;
  const profile = window.travelplanUserProfile || null;
  return [
    profile?.display_name,
    profile?.nickname,
    user?.user_metadata?.full_name,
    user?.email?.split('@')[0],
    typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : null
  ].filter(Boolean).map(tpNormalizeOwnerText);
}

function tpReviewOwnerKey(review = {}) {
  return String(
    review.owner_key || review.ownerKey ||
    review.userId || review.user_id ||
    review._localUserId || review.guest_id || review.guestId ||
    ''
  ).trim();
}

function tpReviewBelongsToCurrentUser(review) {
  if (!review) return false;

  const currentUserId = tpGetCurrentReviewUserId();
  const currentOwnerKey = tpGetCurrentReviewOwnerKey();
  const reviewUserId = String(review.userId || review.user_id || '').trim();
  const reviewOwnerKey = tpReviewOwnerKey(review);

  if (currentUserId && reviewUserId && reviewUserId === String(currentUserId)) return true;
  if (reviewOwnerKey && reviewOwnerKey === currentOwnerKey) return true;

  // Legacy-отзывы, созданные до owner_key/user_id. Разрешаем управлять ими только вошедшему пользователю,
  // если имя автора совпадает с текущим профилем. Это нужно для старых отзывов, а не для нормальной жизни.
  if (currentUserId && !reviewUserId && !reviewOwnerKey) {
    const author = tpNormalizeOwnerText(review.author || review.author_name);
    if (author && tpCurrentAuthorNames().includes(author)) return true;
    // Старые отзывы могли уйти в Supabase как «Гость», хотя человек уже потом вошёл в аккаунт.
    // Даём удалить такие legacy-строки руками из интерфейса, иначе они становятся мусором без хозяина.
    if (!author || author === 'гость' || author === 'guest') return true;
  }

  if (!currentUserId && !reviewUserId && !reviewOwnerKey) {
    const author = tpNormalizeOwnerText(review.author || review.author_name);
    if (!author || author === 'гость' || author === 'guest') return true;
  }

  return false;
}

function tpHasOwnReview(reviews = []) {
  return Array.isArray(reviews) && reviews.some(r => !tpIsReviewDeleted(r) && tpReviewBelongsToCurrentUser(r));
}

const TP_DELETED_REVIEWS_KEY = 'travelplan_deleted_review_ids';

function tpGetDeletedReviewIds() {
  try { return JSON.parse(localStorage.getItem(TP_DELETED_REVIEWS_KEY) || '[]').map(String); }
  catch { return []; }
}

function tpIsReviewDeleted(reviewOrId) {
  const id = typeof reviewOrId === 'string' ? reviewOrId : (reviewOrId?.id || reviewOrId?.review_id);
  return Boolean(id) && tpGetDeletedReviewIds().includes(String(id));
}

function tpMarkReviewDeleted(reviewOrId) {
  const id = typeof reviewOrId === 'string' ? reviewOrId : (reviewOrId?.id || reviewOrId?.review_id);
  if (!id) return;
  try {
    const ids = new Set(tpGetDeletedReviewIds());
    ids.add(String(id));
    localStorage.setItem(TP_DELETED_REVIEWS_KEY, JSON.stringify([...ids]));
  } catch {}
}

function tpForgetReviewDeleted(reviewOrId) {
  const id = typeof reviewOrId === 'string' ? reviewOrId : (reviewOrId?.id || reviewOrId?.review_id);
  if (!id) return;
  try {
    const ids = tpGetDeletedReviewIds().filter(x => x !== String(id));
    localStorage.setItem(TP_DELETED_REVIEWS_KEY, JSON.stringify(ids));
  } catch {}
}

function tpNormalizeReviewEntityId(value) {
  const raw = String(value || '').trim();
  const lower = raw.toLowerCase();
  const cityMap = {
    'шымкент': 'shymkent', 'shymкент': 'shymkent',
    'дубай': 'dubai',
    'астана': 'astana', 'нур-султан': 'astana', 'нурсултан': 'astana',
    'актау': 'aktau', 'алматы': 'almaty', 'түркістан': 'turkistan', 'туркестан': 'turkistan',
    'бурабай': 'burabay', 'боровое': 'burabay',
    'стамбул': 'istanbul', 'istanbul': 'istanbul',
    'бангкок': 'bangkok', 'bangkok': 'bangkok'
  };
  if (cityMap[lower]) return cityMap[lower];
  return lower
    .replace(/^dest_/, '')
    .replace(/[ё]/g, 'е')
    .replace(/\s+/g, '_')
    .replace(/[^a-zа-я0-9_\-]/gi, '');
}

function tpGetAvatarForReviewAuthor(rowOrReview) {
  const direct = rowOrReview?.avatar_url || rowOrReview?.avatarUrl || rowOrReview?.author_avatar_url || rowOrReview?.authorAvatar || '';
  if (direct) return direct;

  const reviewUserId = String(rowOrReview?.user_id || rowOrReview?.userId || '').trim();
  const currentUserId = tpGetCurrentReviewUserId();
  const currentAvatar = typeof getCurrentReviewAvatarValue === 'function' ? getCurrentReviewAvatarValue() : '';
  if (currentAvatar && currentUserId && reviewUserId && reviewUserId === String(currentUserId)) return currentAvatar;

  const author = tpNormalizeOwnerText(rowOrReview?.author_name || rowOrReview?.author);
  if (currentAvatar && author && tpCurrentAuthorNames().includes(author)) return currentAvatar;
  return '';
}

function tpReviewRowToAppReview(row) {
  const dateValue = row?.created_at || row?.date || new Date().toISOString();
  let readableDate = '';
  try {
    readableDate = new Date(dateValue).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    readableDate = String(dateValue || '');
  }
  return {
    id: row?.id || '',
    author: row?.author_name || row?.author || 'Гость',
    rating: Number(row?.rating || 0),
    text: row?.comment || row?.text || '',
    imageUrl: row?.image_url || row?.imageUrl || '',
    avatarUrl: row?.avatar_url || row?.avatarUrl || tpGetAvatarForReviewAuthor(row) || '',
    userId: row?.user_id || row?.userId || '',
    owner_key: row?.owner_key || row?.ownerKey || '',
    date: readableDate,
    _source: row?._source || 'supabase',
    _localUserId: row?._localUserId || row?.owner_key || row?.ownerKey || '',
    _entityType: row?.entity_type || row?._entityType || '',
    _entityId: row?.entity_id || row?._entityId || ''
  };
}

function tpReviewSignature(review = {}) {
  const text = String(review.text || review.comment || '').trim().toLowerCase();
  const image = String(review.imageUrl || review.image_url || '').trim().toLowerCase();
  const rating = String(Number(review.rating || 0));
  const owner = tpReviewOwnerKey(review) || (tpReviewBelongsToCurrentUser(review) ? tpGetCurrentReviewOwnerKey() : '');
  if (owner) return `owner_${owner}_${rating}_${text}_${image}`;
  // Для старых локальных дублей без owner_key. Не схлопываем всех гостей просто по слову «Гость», только по полному контенту.
  return `legacy_${tpNormalizeOwnerText(review.author || review.author_name)}_${rating}_${text}_${image}`;
}

function tpMergeReviews(localReviews = [], supabaseReviews = []) {
  const byId = new Map();
  const bySignature = new Map();
  const ordered = [...supabaseReviews, ...localReviews]
    .map(r => ({ ...r, rating: Number(r.rating || 0) }))
    .filter(r => r.rating > 0 && !tpIsReviewDeleted(r));

  for (const review of ordered) {
    const id = String(review.id || '').trim();
    const sig = tpReviewSignature(review);

    if (id && byId.has(id)) {
      const existing = byId.get(id);
      Object.assign(existing, { ...review, ...existing, avatarUrl: existing.avatarUrl || review.avatarUrl });
      continue;
    }

    if (sig && bySignature.has(sig)) {
      const existing = bySignature.get(sig);
      Object.assign(existing, { ...review, ...existing, avatarUrl: existing.avatarUrl || review.avatarUrl });
      if (id) byId.set(id, existing);
      continue;
    }

    bySignature.set(sig, review);
    if (id) byId.set(id, review);
  }

  // Если у текущего пользователя/гостя почему-то остались два отзыва на один объект,
  // показываем только самый свежий Supabase-вариант. Лимит должен чиниться в базе, но UI тоже не обязан плодить шизу.
  const result = [];
  let ownAlreadyShown = false;
  for (const review of [...bySignature.values()]) {
    if (tpReviewBelongsToCurrentUser(review)) {
      if (ownAlreadyShown) continue;
      ownAlreadyShown = true;
    }
    result.push(review);
  }

  return result;
}

function tpGetCachedReviews(entityType, entityId) {
  const wantedType = String(entityType || '').trim().toLowerCase();
  const wantedId = String(entityId || '').trim();
  const wantedNorm = tpNormalizeReviewEntityId(wantedId);
  const rows = window.travelplanReviewsCache?.rows || [];

  return rows
    .filter(row => !tpIsReviewDeleted(row))
    .filter(row => {
      const rowType = String(row.entity_type || '').trim().toLowerCase();
      const rowId = String(row.entity_id || '').trim();
      const rowNorm = tpNormalizeReviewEntityId(rowId);
      if (wantedType === 'destination') return rowType === 'destination' && (rowId === wantedId || rowNorm === wantedNorm);
      return rowType === wantedType && (rowId === wantedId || rowNorm === wantedNorm);
    })
    .map(tpReviewRowToAppReview);
}

async function dbLoadReviewCache() {
  if (!isSupabaseReady()) {
    window.travelplanReviewsCache = { loaded: true, rows: [] };
    return [];
  }

  const { data, error } = await supabaseClient
    .from('reviews')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.warn('Отзывы из Supabase не загрузились:', error.message);
    window.travelplanReviewsCache = { loaded: true, rows: [] };
    return [];
  }

  window.travelplanReviewsCache = { loaded: true, rows: (data || []).filter(row => !tpIsReviewDeleted(row)) };
  window.dispatchEvent(new CustomEvent('travelplan:reviews-loaded'));
  return data || [];
}

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

async function dbFindOwnReview(entityType, entityId) {
  if (!isSupabaseReady()) return null;
  const ownerKey = tpGetCurrentReviewOwnerKey();
  const userId = tpGetCurrentReviewUserId();

  // Новый нормальный путь: owner_key. Для этого надо применить SQL из supabase_reviews_owner_fix.sql.
  try {
    const { data, error } = await supabaseClient
      .from('reviews')
      .select('*')
      .eq('entity_type', entityType)
      .eq('entity_id', entityId)
      .eq('owner_key', ownerKey)
      .limit(1);
    if (!error && Array.isArray(data) && data.length) return data[0];
  } catch {}

  // Legacy: отзывы аккаунтов до owner_key.
  if (userId) {
    try {
      const { data, error } = await supabaseClient
        .from('reviews')
        .select('*')
        .eq('entity_type', entityType)
        .eq('entity_id', entityId)
        .eq('user_id', userId)
        .limit(1);
      if (!error && Array.isArray(data) && data.length) return data[0];
    } catch {}
  }

  return null;
}

async function dbAddReview({ entityType, entityId, city, country, authorName, rating, comment, imageUrl }) {
  if (!isSupabaseReady()) throw new Error('Supabase не подключён');

  const currentUserId = tpGetCurrentReviewUserId();
  const ownerKey = tpGetCurrentReviewOwnerKey();
  const avatarUrl = typeof getCurrentReviewAvatarValue === 'function' ? getCurrentReviewAvatarValue() : '';

  // Проверка в кэше + базе. Удалил отзыв — его уже нет в базе/кэше, значит новый можно.
  const cachedOwnReview = tpGetCachedReviews(entityType, entityId).find(tpReviewBelongsToCurrentUser);
  if (cachedOwnReview && !tpIsReviewDeleted(cachedOwnReview)) {
    const duplicateError = new Error('Вы уже оставили отзыв для этого объекта. Сначала удалите старый отзыв.');
    duplicateError.code = 'REVIEW_EXISTS';
    throw duplicateError;
  }

  const existing = await dbFindOwnReview(entityType, entityId);
  if (existing && !tpIsReviewDeleted(existing)) {
    const duplicateError = new Error('Вы уже оставили отзыв для этого объекта. Сначала удалите старый отзыв.');
    duplicateError.code = 'REVIEW_EXISTS';
    throw duplicateError;
  }

  const basePayload = {
    entity_type: entityType,
    entity_id: entityId,
    city: city || null,
    country: country || null,
    user_id: currentUserId,
    author_name: authorName || 'Гость',
    rating: Number(rating),
    comment: comment?.trim() || null,
    image_url: imageUrl || null,
    avatar_url: avatarUrl || null,
    owner_key: ownerKey
  };

  let result = await supabaseClient
    .from('reviews')
    .insert(basePayload)
    .select()
    .single();

  // Если owner_key/avatar_url ещё не добавлены в Supabase, авторизованным пользователям пробуем старую схему.
  // Гостям без owner_key писать в Supabase нельзя: потом невозможно честно ограничить и удалить их отзыв.
  if (result.error && String(result.error.message || '').toLowerCase().includes('owner_key')) {
    if (!currentUserId) {
      const schemaError = new Error('В Supabase не добавлен столбец owner_key. Выполните SQL-файл supabase_reviews_owner_fix.sql.');
      schemaError.code = 'SCHEMA_MISSING_OWNER_KEY';
      throw schemaError;
    }
    const legacyPayload = { ...basePayload };
    delete legacyPayload.owner_key;
    delete legacyPayload.avatar_url;
    result = await supabaseClient.from('reviews').insert(legacyPayload).select().single();
  }

  if (result.error) {
    if (String(result.error.message || '').toLowerCase().includes('duplicate') || result.error.code === '23505') {
      const duplicateError = new Error('Вы уже оставили отзыв для этого объекта. Сначала удалите старый отзыв.');
      duplicateError.code = 'REVIEW_EXISTS';
      throw duplicateError;
    }
    console.error('Ошибка добавления отзыва:', result.error.message);
    throw result.error;
  }

  const data = result.data;
  if (data) {
    window.travelplanReviewsCache = window.travelplanReviewsCache || { loaded: false, rows: [] };
    const rows = (window.travelplanReviewsCache.rows || []).filter(row => String(row.id) !== String(data.id));
    window.travelplanReviewsCache.rows = [data, ...rows];
    window.travelplanReviewsCache.loaded = true;
    window.dispatchEvent(new CustomEvent('travelplan:reviews-loaded'));
  }

  return data;
}

async function dbDeleteReview(reviewOrId) {
  if (!isSupabaseReady()) throw new Error('Supabase не подключён');
  const id = typeof reviewOrId === 'string' ? reviewOrId : (reviewOrId?.id || reviewOrId?.review_id);
  if (!id) return true;

  if (String(id).startsWith('local_')) {
    tpMarkReviewDeleted(id);
    window.dispatchEvent(new CustomEvent('travelplan:reviews-loaded'));
    return true;
  }

  const { data, error } = await supabaseClient
    .from('reviews')
    .delete()
    .eq('id', id)
    .select('id');

  if (error) {
    console.error('Ошибка удаления отзыва:', error.message);
    throw new Error('Supabase не разрешил удалить отзыв. Проверьте RLS policies из SQL-патча.');
  }

  if (!data || data.length === 0) {
    throw new Error('Отзыв не удалился из Supabase. Проверьте owner_key и RLS policies.');
  }

  tpMarkReviewDeleted(id);
  if (window.travelplanReviewsCache?.rows) {
    window.travelplanReviewsCache.rows = window.travelplanReviewsCache.rows.filter(row => String(row.id) !== String(id));
    window.travelplanReviewsCache.loaded = true;
  }

  window.dispatchEvent(new CustomEvent('travelplan:reviews-loaded'));
  return true;
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

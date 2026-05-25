// =============================================
//  bookings.js - управление бронированиями
// =============================================

let bookings = [];
let currentDeleteId = null;
let recordCount = 0;

const BOOKING_LIMIT = 10;
const LS_KEY = 'travelplan_bookings';

function getBookingStorageKey() {
  const userId = window.travelplanCurrentUser?.id;
  return userId ? `${LS_KEY}_${userId}` : `${LS_KEY}_guest`;
}

function getBookingRouteLabel(booking) {
  if (!booking || booking.type !== 'flight') return booking?.destination || '';
  let from = booking.city_from || String(booking.destination || '').split('→')[0]?.trim();
  const to = booking.city_to || String(booking.destination || '').split('→').pop()?.trim();
  if (from && booking.departure && String(from).trim() === String(booking.departure).trim()) {
    from = typeof getUserCity === 'function' ? getUserCity().name : 'Ваш город';
  }
  if (from && to) return `${from} → ${to}`;
  return booking.destination || `${from || ''} → ${to || ''}`;
}

function getExpiredBadgeText(booking) {
  return booking?.type === 'hotel' ? 'Бронь завершилась' : 'Самолет улетел';
}

function clearBookingsForGuest() {
  bookings = [];
  recordCount = 0;
  renderBookings();
}
window.clearBookingsForGuest = clearBookingsForGuest;

async function refreshBookingsFromSupabase() {
  // Гость не должен видеть чужие/старые локальные брони. Никаких «призраков бронирования».
  if (!window.travelplanCurrentUser) {
    bookings = [];
    recordCount = 0;
    renderBookings();
    return;
  }

  if (typeof dbGetBookings !== 'function') {
    bookings = loadFromLocalStorage();
    recordCount = bookings.length;
    renderBookings();
    return;
  }

  try {
    const remote = await dbGetBookings();
    bookings = remote;
    recordCount = remote.length;
    saveToLocalStorage(remote);
    renderBookings();
  } catch (error) {
    console.warn('Не удалось загрузить брони из Supabase:', error.message || error);
    bookings = loadFromLocalStorage();
    recordCount = bookings.length;
    renderBookings();
  }
}

// ── Хранилище ──────────────────────────────────────────────────────────────

function loadFromLocalStorage() {
  // Локальный fallback теперь привязан к конкретному пользователю.
  // Для гостя возвращаем пусто, чтобы брони аккаунта не висели без входа.
  if (!window.travelplanCurrentUser) return [];
  try {
    const raw = localStorage.getItem(getBookingStorageKey());
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveToLocalStorage(data) {
  if (!window.travelplanCurrentUser) return;
  localStorage.setItem(getBookingStorageKey(), JSON.stringify(data));
}

async function addBooking(booking) {
  if (!window.travelplanCurrentUser && typeof openAuthModal === 'function') {
    showToast('Сначала войдите или создайте аккаунт', 'error');
    openAuthModal();
    return false;
  }
  if (recordCount >= BOOKING_LIMIT) {
    showToast(`Достигнут лимит в ${BOOKING_LIMIT} бронирований. Удалите старые.`, 'error');
    return false;
  }
  if (window.dataSdk) {
    const result = await window.dataSdk.create(booking);
    return result.isOk;
  }

  if (typeof dbCreateBooking === 'function') {
    try {
      const row = await dbCreateBooking(booking);
      if (row?.id) booking.__backendId = row.id;
    } catch (error) {
      console.warn('Бронь сохранена локально, но не ушла в Supabase:', error.message || error);
    }
  }

  booking.__backendId = booking.__backendId || booking.id || crypto.randomUUID?.() || String(Date.now());
  const stored = loadFromLocalStorage();
  stored.push(booking);
  saveToLocalStorage(stored);
  bookings = stored;
  recordCount = stored.length;
  renderBookings();
  return true;
}


async function removeBooking(id) {
  if (window.dataSdk) {
    const b = bookings.find(b => b.__backendId === id);
    if (!b) return false;
    const result = await window.dataSdk.delete(b);
    return result.isOk;
  }

  if (typeof dbCancelBooking === 'function' && window.travelplanCurrentUser) {
    try { await dbCancelBooking(id); }
    catch (error) { console.warn('Не удалось отменить бронь в Supabase:', error.message || error); }
  }

  const stored = loadFromLocalStorage().filter(b => b.__backendId !== id);
  saveToLocalStorage(stored);
  bookings = bookings.filter(b => b.__backendId !== id);
  recordCount = bookings.length;
  renderBookings();
  return true;
}


async function markAsPaid(id) {
  const idx = bookings.findIndex(b => b.__backendId === id);
  if (idx !== -1) {
    bookings[idx].payment_status = 'paid';
    bookings[idx].status = 'active';
    bookings[idx].paid_at = new Date().toISOString();

    if (typeof dbMarkBookingPaid === 'function' && window.travelplanCurrentUser) {
      try { await dbMarkBookingPaid(id); }
      catch (error) { console.warn('Не удалось обновить оплату в Supabase:', error.message || error); }
    }

    saveToLocalStorage(bookings);
    renderBookings();
    showToast('Оплата подтверждена! 🎉');
    setTimeout(() => showSection('bookings'), 200);
  }
}


function checkExpiredBookings() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  let changed = false;

  bookings.forEach(b => {
    if (b.status === 'expired') return;
    const departDate = new Date(b.date_from);
    if (Number.isNaN(departDate.getTime())) return;
    departDate.setHours(0, 0, 0, 0);
    if (departDate < today) {
      b.status = 'expired';
      changed = true;
    }
  });

  if (changed) saveToLocalStorage(bookings);
}


function checkBookingLimit() {
  if (recordCount >= BOOKING_LIMIT) {
    showToast(`Лимит: максимум ${BOOKING_LIMIT} бронирований. Удалите старые.`, 'error');
    return false;
  }
  return true;
}


// ── Статистика оплаченных предложений ─────────────────────────────────────

function getPaidBookingStatsForFeedItem(item) {
  const source = Array.isArray(bookings) && bookings.length ? bookings : loadFromLocalStorage();
  const paid = source.filter(b => b.payment_status === 'paid');

  if (!item) return { count: 0, label: '0 бронирований' };

  if (item.type === 'flight') {
    const count = paid
      .filter(b => b.type === 'flight')
      .filter(b => {
        const routeTo = String(b.destination || '').split('→').pop().trim();
        return routeTo === item.city && String(b.departure || '') === String(item.airline || '');
      })
      .reduce((sum, b) => sum + Number(b.guests || 1), 0);
    return { count, label: `${count.toLocaleString('ru-RU')} пассажиров уже оплатили этот рейс` };
  }

  const count = paid
    .filter(b => b.type === 'hotel')
    .filter(b => String(b.departure || '') === String(item.name || ''))
    .length;
  return { count, label: `${count.toLocaleString('ru-RU')} оплаченных броней этого отеля` };
}

// ── Детальное модальное окно брони ──────────────────────────────────────────

function openBookingDetail(id) {
  
  const booking = bookings.find(b => b.__backendId === id);
  if (!booking) return;

  const isExpired = booking.status === 'expired';
  const isPaid    = booking.payment_status === 'paid';
  const isFlight  = booking.type === 'flight';

  let statusBadge = '';
  if (isExpired) statusBadge = `<span class="badge-expired text-xs px-3 py-1 rounded-full">🛬 ${getExpiredBadgeText(booking)}</span>`;
  else if (isPaid) statusBadge = `<span class="badge-paid text-xs px-3 py-1 rounded-full">✓ Оплачено</span>`;
  else statusBadge = `<span class="badge-pending text-xs px-3 py-1 rounded-full">⏳ Ожидает оплаты</span>`;

  const dateRange = booking.date_to
    ? `${formatDate(booking.date_from)} - ${formatDate(booking.date_to)}`
    : formatDate(booking.date_from);

  let detailRows = '';
  if (isFlight) {
    detailRows = `
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Авиакомпания</div>
          <div class="font-semibold text-sm">✈️ ${booking.departure}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Маршрут</div>
          <div class="font-semibold text-sm">${getBookingRouteLabel(booking)}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Дата вылета</div>
          <div class="font-semibold text-sm">${formatDate(booking.date_from)}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Туда: вылет → прилёт</div>
          <div class="font-semibold text-sm">${booking.outbound_depart || '-'} → ${booking.outbound_arrive || '-'}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Дата возврата</div>
          <div class="font-semibold text-sm">${booking.date_to ? formatDate(booking.date_to) : '-'}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Обратно: вылет → прилёт</div>
          <div class="font-semibold text-sm">${booking.date_to ? `${booking.return_depart || '-'} → ${booking.return_arrive || '-'}` : '-'}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Дорога</div>
          <div class="font-semibold text-sm">${booking.flight_duration || '-'}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Пассажиры</div>
          <div class="font-semibold text-sm">👤 ${booking.guests}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Статус</div>
          <div class="text-sm">${statusBadge}</div>
        </div>
      </div>`;
  } else {
    detailRows = `
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Отель</div>
          <div class="font-semibold text-sm">🏨 ${booking.departure}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Город</div>
          <div class="font-semibold text-sm">📍 ${booking.destination}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Заезд</div>
          <div class="font-semibold text-sm">${formatDate(booking.date_from)}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Выезд</div>
          <div class="font-semibold text-sm">${booking.date_to ? formatDate(booking.date_to) : '-'}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Гости</div>
          <div class="font-semibold text-sm">👤 ${booking.guests}</div>
        </div>
        <div class="bg-white/5 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Статус</div>
          <div class="text-sm">${statusBadge}</div>
        </div>
      </div>`;
  }

  const paidInfo = isPaid && booking.paid_at
    ? `<div class="text-xs text-slate-500 text-center mt-1">Оплачено: ${formatDate(booking.paid_at)}</div>` : '';

  const payBtn = (!isExpired && !isPaid) ? `
    <button onclick="payBooking('${booking.__backendId}');closeDetailModal();"
      class="w-full py-3 font-semibold text-white rounded-xl transition kaspi-pulse"
      style="background: linear-gradient(135deg, #ff5a00, #ff8c00)">
      Оплатить через Kaspi
    </button>` : '';

  const bookingId = booking.__backendId || booking.id || '-';
  const createdAt = booking.created_at ? formatDate(booking.created_at) : '-';

  const imgQuery = isFlight
    ? `${booking.city_to || booking.destination} city skyline travel`
    : `${booking.departure || booking.destination} hotel`;
  const imgUrl = typeof tpRemoteImageUrl === 'function'
    ? tpRemoteImageUrl(imgQuery, 800, 400)
    : `https://loremflickr.com/800/400/${encodeURIComponent(imgQuery + ',travel')}?lock=detail`;
  const imgFallback = isFlight
    ? 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=70'
    : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=70';

  document.getElementById('detail-modal-content').innerHTML = `
    <div class="space-y-4">
      <div class="h-48 rounded-2xl overflow-hidden relative border border-white/10 mb-5">
        <img src="${imgUrl}" alt="${booking.departure || booking.destination}" loading="lazy"
             class="w-full h-full object-cover"
             onerror="this.onerror=null;this.src='${imgFallback}'">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent"></div>
        <div class="absolute left-4 bottom-4 right-4">
          <div class="flex items-center gap-2 mb-1">
            <span class="text-2xl">${isFlight ? '✈️' : '🏨'}</span>
            <span class="text-xs font-medium text-white/70 bg-black/40 px-2 py-0.5 rounded-full">${isFlight ? 'Перелёт' : 'Отель'}</span>
            ${statusBadge}
          </div>
          <div class="text-xl font-bold text-white drop-shadow">${isFlight ? booking.departure : booking.departure}</div>
          <div class="text-sm text-white/70">${isFlight ? getBookingRouteLabel(booking) : booking.destination}</div>
        </div>
      </div>
      ${detailRows}
      <div class="bg-sky-500/20 rounded-xl p-4 flex justify-between items-center">
        <span class="text-slate-300 font-semibold">Итого</span>
        <span class="text-2xl font-bold text-sky-400">${Number(booking.price).toLocaleString()} ₸</span>
      </div>
      ${paidInfo}
      <div class="text-xs text-slate-600 text-center">ID: ${bookingId.slice(-8)} · Создано: ${createdAt}</div>
      ${payBtn}
    </div>`;

  openDetailModal();
}

// ── Рендер ─────────────────────────────────────────────────────────────────

function updateBookingCounter() {
  const counter = document.getElementById('booking-count');
  if (counter) counter.textContent = recordCount;
}

function renderBookings() {
  checkExpiredBookings();
  updateBookingCounter();
  const emptyState   = document.getElementById('bookings-empty');
  const bookingsList = document.getElementById('bookings-list');
  if (!emptyState || !bookingsList) return;

  if (bookings.length === 0) {
    emptyState.classList.remove('hidden');
    bookingsList.classList.add('hidden');
    return;
  }

  emptyState.classList.add('hidden');
  bookingsList.classList.remove('hidden');

  bookingsList.innerHTML = bookings.map(booking => {
    const isExpired = booking.status === 'expired';
    const isPaid    = booking.payment_status === 'paid';
    const typeIcon  = booking.type === 'flight' ? '✈️' : '🏨';
    const isFlight  = booking.type === 'flight';

    const dateRange = booking.date_to
      ? `${formatDate(booking.date_from)} - ${formatDate(booking.date_to)}`
      : formatDate(booking.date_from);

    let statusBadge;
    if (isExpired) {
      statusBadge = `<span class="text-xs badge-expired px-2 py-1 rounded-full">🛬 ${getExpiredBadgeText(booking)}</span>`;
    } else if (isPaid) {
      statusBadge = `<span class="text-xs badge-paid px-2 py-1 rounded-full">✓ Оплачено</span>`;
    } else {
      statusBadge = `<span class="text-xs badge-pending px-2 py-1 rounded-full">⏳ Ожидает оплаты</span>`;
    }

    const payBtn = (!isExpired && !isPaid) ? `
      <button onclick="event.stopPropagation();payBooking('${booking.__backendId}')"
        class="px-3 py-1.5 text-xs font-semibold text-white rounded-lg transition kaspi-pulse"
        style="background: linear-gradient(135deg, #ff5a00, #ff8c00)">
        Оплатить
      </button>` : '';

    // Изображение: для перелётов — город назначения, для отелей — название отеля + город
    const _bookingCity = booking.city_to || booking.destination || '';
    const _bookingHotelName = booking.departure || '';
    const imgQuery = isFlight
      ? `${_bookingCity} city skyline travel`
      : `${_bookingHotelName} hotel`;
    const imgUrl = isFlight
      ? ((typeof tpCityImage === 'function' ? tpCityImage(_bookingCity) : null)
          || (typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(imgQuery, 400, 300) : null)
          || 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=70')
      : ((typeof tpHotelImage === 'function' ? tpHotelImage(_bookingHotelName, _bookingCity) : null)
          || (typeof tpCityImage === 'function' ? tpCityImage(booking.destination || _bookingCity) : null)
          || (typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(imgQuery, 400, 300) : null)
          || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=70');
    const imgFallback = isFlight
      ? (typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(imgQuery, 400, 300) : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=70')
      : (typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(imgQuery, 400, 300) : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=70');

    return `
      <div class="card-gradient rounded-xl p-4 ${isExpired ? 'opacity-60' : ''} cursor-pointer hover:ring-1 hover:ring-sky-500/30 transition"
           onclick="openBookingDetail('${booking.__backendId}')">
        <div class="flex items-start gap-4">
          <!-- Миниатюра как в ленте -->
          <div class="w-20 h-20 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/10">
            <img src="${imgUrl}" alt="${booking.departure || booking.destination}" loading="lazy"
                 class="w-full h-full object-cover"
                 onerror="this.onerror=null;this.src='${imgFallback}'">
            <div class="absolute inset-0 bg-black/10"></div>
          </div>
          <!-- Основная инфо -->
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <span class="text-base">${typeIcon}</span>
                  <span class="text-xs font-medium text-slate-400">${isFlight ? 'Перелёт' : 'Отель'}</span>
                  ${statusBadge}
                </div>
                <div class="font-semibold text-base truncate">${booking.departure}</div>
                <div class="text-slate-400 text-sm truncate">${isFlight ? getBookingRouteLabel(booking) : booking.destination}</div>
                <div class="text-xs text-slate-500 mt-0.5">${dateRange} · ${booking.guests} гост.</div>
                ${isFlight ? `<div class="text-xs text-slate-500 mt-0.5">✈ ${booking.outbound_depart || '-'}→${booking.outbound_arrive || '-'}${booking.date_to ? ` · ↩ ${booking.return_depart || '-'}→${booking.return_arrive || '-'}` : ''}</div>` : ''}
              </div>
              <div class="flex flex-col items-end gap-1.5 shrink-0">
                <div class="text-lg font-bold text-sky-400 whitespace-nowrap">${Number(booking.price).toLocaleString()} ₸</div>
                ${isPaid ? `<div class="text-xs text-slate-500">${formatDate(booking.paid_at)}</div>` : ''}
                <div class="flex items-center gap-1.5">
                  ${payBtn}
                  <button onclick="event.stopPropagation();requestDelete('${booking.__backendId}')"
                    class="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition text-sm" title="${isExpired ? 'Удалить' : 'Отменить'}">
                    🗑️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>`;
  }).join('');
}

function payBooking(id) {
  const booking = bookings.find(b => b.__backendId === id);
  if (!booking) return;
  openKaspiPayment(
    { id: booking.__backendId, price: booking.price, name: booking.departure },
    (paidId) => markAsPaid(paidId)
  );
}

// ── Удаление ───────────────────────────────────────────────────────────────

function requestDelete(id) {
  currentDeleteId = id;
  const booking = bookings.find(b => b.__backendId === id);
  const isExpired = booking && booking.status === 'expired';
  const dialog = document.getElementById('delete-confirm');
  if (dialog) { dialog.style.display = 'flex'; dialog.classList.remove('hidden'); }
  const titleEl = dialog ? dialog.querySelector('h3') : null;
  const descEl  = dialog ? dialog.querySelector('p')  : null;
  if (titleEl) titleEl.textContent = isExpired ? 'Удалить из истории?' : 'Отменить бронирование?';
  if (descEl)  descEl.textContent  = isExpired ? 'Запись исчезнет из истории. Отменить действие будет невозможно.' : 'Бронирование будет отменено. Отменить действие будет невозможно.';
  const btn = document.getElementById('confirm-delete-btn');
  if (btn) {
    btn.textContent = isExpired ? 'Да, удалить' : 'Да, отменить';
    btn.onclick = () => deleteBooking(id);
  }
}

async function deleteBooking(id) {
  const ok = await removeBooking(id);
  showToast(ok ? 'Бронирование отменено' : 'Ошибка при удалении', ok ? 'success' : 'error');
  closeDeleteConfirm();
}

// ── Init ───────────────────────────────────────────────────────────────────

async function initLocalBookings() {
  if (window.dataSdk) return;
  await refreshBookingsFromSupabase();
}

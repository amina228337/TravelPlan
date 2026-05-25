// =============================================
//  flights.js
//  Базовые варианты рейсов, цены корректируются по маршруту
// =============================================

// Зачем этот файл:
// Поиск и бронирование авиабилетов.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

const SAMPLE_FLIGHTS = [
  { airline: 'Air Astana',       time: '07:00', duration: '3ч 30мин', price: 52000,  class: 'Эконом'   },
  { airline: 'FlyArystan',       time: '10:15', duration: '3ч 45мин', price: 38000,  class: 'Эконом'   },
  { airline: 'Turkish Airlines', time: '14:00', duration: '4ч 00мин', price: 61600,  class: 'Бизнес'   },
  { airline: 'Pegasus Airlines', time: '19:30', duration: '4ч 20мин', price: 29500,  class: 'Эконом'   },
  { airline: 'SCAT',             time: '22:45', duration: '3ч 50мин', price: 34200,  class: 'Эконом'   },
];

function searchFlights() {
  const from       = document.getElementById('flight-from').value.trim();
  const to         = document.getElementById('flight-to').value.trim();
  const dateFrom   = document.getElementById('flight-date-from').value;
  const dateTo     = document.getElementById('flight-date-to').value;
  const passengers = parseInt(document.getElementById('flight-passengers').value);

  if (!from) { showToast('Укажите город отправления', 'error'); return; }
  if (!to)   { showToast('Укажите город назначения', 'error');  return; }
  if (from.toLowerCase() === to.toLowerCase()) { showToast('Город отправления и назначения совпадают', 'error'); return; }
  if (!dateFrom) { showToast('Укажите дату вылета', 'error');   return; }

  const list = document.getElementById('flight-results-list');
  list.innerHTML = SAMPLE_FLIGHTS.map((f, index) => {
    const onePassengerPrice = typeof getSearchFlightPrice === 'function'
      ? getSearchFlightPrice(to, f.price, from, index)
      : f.price;
    const total = onePassengerPrice * passengers;
    const localCityImg = typeof tpCityImage === 'function' ? tpCityImage(to) : null;
    const cityImgUrl = localCityImg || (typeof tpRemoteImageUrl === 'function'
      ? tpRemoteImageUrl(`${to} city skyline travel`, 400, 300)
      : `https://loremflickr.com/400/300/${encodeURIComponent(to + ',city,travel,landmark')}?lock=${index + 42}`);
    const cityImgFallback = typeof tpRemoteImageUrl === 'function'
      ? tpRemoteImageUrl(`${to} city skyline travel`, 400, 300)
      : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=70';
    return `
      <div class="card-gradient rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div class="flex items-center gap-4">
          <div class="w-20 h-16 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/10">
            <img src="${cityImgUrl}" alt="${to}" loading="lazy" class="w-full h-full object-cover"
                 onerror="this.onerror=null;this.src='${cityImgFallback}'">
            <div class="absolute inset-0 bg-black/10"></div>
          </div>
          <div>
            <div class="font-semibold">${f.airline}</div>
            <div class="text-sm text-slate-400">${from} → ${to}</div>
            <div class="text-xs text-slate-500">💺 ${f.class}</div>
          </div>
        </div>
        <div class="text-center">
          <div class="font-semibold">${f.time}</div>
          <div class="text-sm text-slate-400">${f.duration}</div>
        </div>
        <div class="flex items-center gap-4">
          <div class="text-right">
            <div class="text-xl font-bold text-sky-400">${total.toLocaleString()} ₸</div>
            <div class="text-sm text-slate-400">${passengers} пасс.</div>
          </div>
          <button onclick="openFlightModal('${f.airline}','${from}','${to}','${dateFrom}','${dateTo}',${total},${passengers},'${f.time}','${f.duration}')"
            class="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg font-semibold hover:from-sky-400 hover:to-blue-500 transition text-sm">
            Забронировать
          </button>
        </div>
      </div>`;
  }).join('');

  document.getElementById('flight-results').classList.remove('hidden');
}


function parseFlightDurationMinutes(durationText) {
  const hours = Number((durationText.match(/(\d+)\s*ч/) || [0,0])[1] || 0);
  const minutes = Number((durationText.match(/(\d+)\s*мин/) || [0,0])[1] || 0);
  return hours * 60 + minutes;
}

function addMinutesToTime(time, minutes) {
  const [h, m] = String(time || '09:00').split(':').map(Number);
  const total = ((h || 0) * 60 + (m || 0) + minutes) % 1440;
  return `${String(Math.floor(total / 60)).padStart(2, '0')}:${String(total % 60).padStart(2, '0')}`;
}

function getReturnDepartTime(departTime) {
  return addMinutesToTime(departTime, 150);
}

function openFlightModal(airline, from, to, dateFrom, dateTo, price, passengers, departTime = '09:00', durationText = '3ч 00мин') {
  if (!checkBookingLimit()) return;
  const arriveTime = addMinutesToTime(departTime, parseFlightDurationMinutes(durationText));
  const returnDepart = getReturnDepartTime(departTime);
  const returnArrive = addMinutesToTime(returnDepart, parseFlightDurationMinutes(durationText));

  const _flightModalImg = (typeof tpCityImage === 'function' ? tpCityImage(to) : null)
    || (typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(to + ' city skyline travel', 800, 400) : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=70');
  const _flightModalFallback = typeof tpRemoteImageUrl === 'function'
    ? tpRemoteImageUrl(to + ' city skyline travel', 800, 400)
    : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=70';
  document.getElementById('modal-content').innerHTML = `
    <div class="space-y-4">
      <div class="h-48 rounded-2xl overflow-hidden relative border border-white/10 mb-5">
        <img src="${_flightModalImg}" 
             alt="${to}" loading="lazy" class="w-full h-full object-cover"
             onerror="this.onerror=null;this.src='${_flightModalFallback}'">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent"></div>
        <div class="absolute left-4 bottom-4 right-4">
          <div class="text-xl font-bold text-white drop-shadow">✈️ ${airline}</div>
          <div class="text-sm text-white/70">${from} → ${to}</div>
        </div>
      </div>
      <div class="flex items-center justify-between mb-1">
        <div>
          <h2 class="text-2xl font-bold">${airline}</h2>
          <p class="text-slate-400 text-sm">${passengers} пасс. · ${durationText}</p>
        </div>
        <span class="text-sky-300 font-semibold">${Number(price).toLocaleString()} ₸</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Откуда</div><div class="font-semibold text-sm">${from}</div>
        </div>
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Куда</div><div class="font-semibold text-sm">${to}</div>
        </div>
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Туда: дата</div><div class="font-semibold text-sm">${formatDate(dateFrom)}</div>
        </div>
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Туда: вылет → прилёт</div><div class="font-semibold text-sm">${departTime} → ${arriveTime}</div>
        </div>
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Возврат: дата</div><div class="font-semibold text-sm">${dateTo ? formatDate(dateTo) : '-'}</div>
        </div>
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Возврат: вылет → прилёт</div><div class="font-semibold text-sm">${dateTo ? `${returnDepart} → ${returnArrive}` : '-'}</div>
        </div>
      </div>
      <div class="bg-sky-500/20 rounded-xl p-4 flex justify-between items-center">
        <span class="text-slate-300">Итого</span>
        <span class="text-2xl font-bold text-sky-400">${Number(price).toLocaleString()} ₸</span>
      </div>
      <div class="text-xs text-slate-500 text-center">⚠️ Демо-версия. Реальное бронирование не производится.</div>
      <button onclick="confirmFlightBooking('${airline}','${from}','${to}','${dateFrom}','${dateTo}',${price},${passengers},'${departTime}','${durationText}')"
        class="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl font-semibold text-lg hover:from-emerald-400 hover:to-green-500 transition">
        ✓ Подтвердить бронирование
      </button>
    </div>`;
  openBookingModal();
}

async function confirmFlightBooking(airline, from, to, dateFrom, dateTo, price, passengers, departTime = '09:00', durationText = '3ч 00мин') {
  const booking = {
    id: Date.now().toString(), type: 'flight',
    destination: `${from} → ${to}`, departure: airline, arrival: to,
    airline, city_from: from, city_to: to,
    date_from: dateFrom, date_to: dateTo || '', guests: parseInt(passengers),
    price: Number(price), status: 'confirmed', created_at: new Date().toISOString(),
    outbound_depart: departTime, outbound_arrive: addMinutesToTime(departTime, parseFlightDurationMinutes(durationText)),
    return_depart: dateTo ? getReturnDepartTime(departTime) : '', return_arrive: dateTo ? addMinutesToTime(getReturnDepartTime(departTime), parseFlightDurationMinutes(durationText)) : '',
    flight_duration: durationText
  };
  const ok = await addBooking(booking);
  if (ok) {
    showToast('Авиабилет забронирован! 🎉');
    closeModal();
    setTimeout(() => showSection('bookings'), 900);
  } else {
    showToast('Ошибка при бронировании', 'error');
  }
}

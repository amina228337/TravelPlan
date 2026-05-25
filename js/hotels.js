// =============================================
//  hotels.js
// =============================================

const FALLBACK_HOTELS = [
  { name: 'Grand Hotel', stars: 5, rating: 9.1, price: 65000, emoji: '🏰', amenities: 'бассейн, SPA, фитнес' },
  { name: 'City Hotel', stars: 4, rating: 8.7, price: 36000, emoji: '🌿', amenities: 'завтрак, фитнес' },
  { name: 'Boutique Rooms', stars: 3, rating: 8.4, price: 21000, emoji: '🎨', amenities: 'завтрак, быстрый Wi‑Fi' },
];

function getHotelSearchItems(query) {
  const q = String(query || '').trim().toLowerCase();
  const source = (typeof FEED_HOTELS !== 'undefined' && Array.isArray(FEED_HOTELS)) ? FEED_HOTELS : [];
  let matches = source.filter(h =>
    h.city.toLowerCase() === q ||
    h.name.toLowerCase() === q ||
    h.city.toLowerCase().includes(q) ||
    h.name.toLowerCase().includes(q)
  );
  if (matches.length === 0) return FALLBACK_HOTELS.map(h => ({ ...h, city: query, desc: 'Демо-вариант размещения', amenitiesList: [] }));
  return matches.slice(0, 8).map(h => ({
    ...h,
    rating: 8.2 + ((h.name.length % 13) / 10),
    amenities: Array.isArray(h.amenities) ? h.amenities.join(', ') : h.amenities,
    amenitiesList: Array.isArray(h.amenities) ? h.amenities : [],
    emoji: h.emoji || '🏨'
  }));
}

function searchHotels() {
  const destination = document.getElementById('hotel-destination').value.trim();
  const checkin     = document.getElementById('hotel-checkin').value;
  const checkout    = document.getElementById('hotel-checkout').value;
  const guests      = parseInt(document.getElementById('hotel-guests').value);

  if (!destination) { showToast('Укажите город или отель', 'error'); return; }
  if (!checkin)     { showToast('Укажите дату заезда', 'error');     return; }
  if (!checkout)    { showToast('Укажите дату выезда', 'error');     return; }

  let hotels = getHotelSearchItems(destination);
  if (typeof tpApplyHotelAmenities === 'function') hotels = tpApplyHotelAmenities(hotels);
  if (typeof tpSortByProfile === 'function') hotels = tpSortByProfile(hotels.map(h => ({...h, type:'hotel'})));
  const list = document.getElementById('hotel-results-list');
  list.innerHTML = hotels.map((h, index) => {
    const city = h.city || destination;
    const nightPrice = typeof getHotelPriceForCity === 'function'
      ? (h.price || getHotelPriceForCity(city, index, 40000))
      : (h.price || 40000);
    const rating = Number(h.rating || 8.7).toFixed(1);
    const _localHotelImg = typeof tpHotelImage === 'function' ? tpHotelImage(h.name, city) : null;
    const _localCityImg = typeof tpCityImage === 'function' ? tpCityImage(city) : null;
    const hotelImgUrl = _localHotelImg || _localCityImg || (typeof tpRemoteImageUrl === 'function'
      ? tpRemoteImageUrl(`${h.name} ${city} hotel`, 400, 300)
      : `https://loremflickr.com/400/300/${encodeURIComponent(h.name + ',' + city + ',hotel')}?lock=${index + 77}`);
    const hotelImgFallback = typeof tpRemoteImageUrl === 'function'
      ? tpRemoteImageUrl(`${city} hotel`, 400, 300)
      : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=400&q=70';
    return `
    <div class="card-gradient rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div class="flex items-center gap-4">
        <div class="w-20 h-16 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/10">
          <img src="${hotelImgUrl}" alt="${h.name}" loading="lazy" class="w-full h-full object-cover"
               onerror="this.onerror=null;this.src='${hotelImgFallback}'">
          <div class="absolute inset-0 bg-black/10"></div>
        </div>
        <div>
          <div class="font-semibold">${h.name}</div>
          <div class="text-sm text-slate-400">${city} · ${'⭐'.repeat(h.stars || 4)} · ${rating}/10</div>
          <div class="text-xs text-slate-500 mt-0.5">${h.amenities || 'завтрак, Wi‑Fi'}</div>
          ${typeof tpRenderBadges === 'function' ? tpRenderBadges({...h, type:'hotel', price:nightPrice}) : ''}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <div class="text-xl font-bold text-sky-400">${Number(nightPrice).toLocaleString()} ₸</div>
        </div>
        <button onclick="openHotelModal('${jsString(h.name)}','${jsString(city)}','${jsString(checkin)}','${jsString(checkout)}',${Number(nightPrice)},${guests})"
          class="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg font-semibold hover:from-sky-400 hover:to-blue-500 transition text-sm">
          Забронировать
        </button>
      </div>
    </div>`;
  }).join('');

  document.getElementById('hotel-results').classList.remove('hidden');
}

function openHotelModal(name, destination, checkin, checkout, price, guests) {
  if (!checkBookingLimit()) return;
  const nights = Math.max(1, Math.ceil((new Date(checkout) - new Date(checkin)) / 86400000));
  const total  = price * nights;

  const _hotelModalImg = (typeof tpHotelImage === 'function' ? tpHotelImage(name, destination) : null)
    || (typeof tpCityImage === 'function' ? tpCityImage(destination) : null)
    || (typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(name + ' ' + destination + ' hotel', 800, 400) : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=70');
  const _hotelModalFallback = typeof tpRemoteImageUrl === 'function'
    ? tpRemoteImageUrl(destination + ' hotel', 800, 400)
    : 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=70';
  document.getElementById('modal-content').innerHTML = `
    <div class="space-y-4">
      <div class="h-48 rounded-2xl overflow-hidden relative border border-white/10 mb-5">
        <img src="${_hotelModalImg}"
             alt="${name}" loading="lazy" class="w-full h-full object-cover"
             onerror="this.onerror=null;this.src='${_hotelModalFallback}'">
        <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent"></div>
        <div class="absolute left-4 bottom-4 right-4">
          <div class="text-xl font-bold text-white drop-shadow">🏨 ${name}</div>
          <div class="text-sm text-white/70">📍 ${destination}</div>
        </div>
      </div>
      <div class="flex items-center justify-between mb-1">
        <div>
          <h2 class="text-2xl font-bold">${name}</h2>
          <p class="text-slate-400 text-sm">${guests} гост. · ${nights} ноч.</p>
          ${typeof tpRenderTags === 'function' ? tpRenderTags({type:'hotel', name, city:destination, price}) : ''}
        </div>
        <span class="text-amber-300 font-semibold">${price.toLocaleString()} ₸/ночь</span>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Заезд</div><div class="font-semibold text-sm">${formatDate(checkin)}</div>
        </div>
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Выезд</div><div class="font-semibold text-sm">${formatDate(checkout)}</div>
        </div>
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Гостей</div><div class="font-semibold text-sm">👤 ${guests}</div>
        </div>
        <div class="bg-slate-800/50 rounded-xl p-3">
          <div class="text-xs text-slate-400 mb-1">Ночей</div><div class="font-semibold text-sm">${nights}</div>
        </div>
      </div>
      <div class="bg-sky-500/20 rounded-xl p-4">
        <div class="flex justify-between mb-2 text-slate-300 text-sm">
          <span>${price.toLocaleString()} ₸ × ${nights} ночей</span>
        </div>
        <div class="flex justify-between items-center">
          <span class="font-semibold">Итого</span>
          <span class="text-2xl font-bold text-sky-400">${total.toLocaleString()} ₸</span>
        </div>
      </div>
      <div class="text-xs text-slate-500 text-center">⚠️ Демо-версия. Реальное бронирование не производится.</div>
      <button onclick="confirmHotelBooking('${jsString(name)}','${jsString(destination)}','${jsString(checkin)}','${jsString(checkout)}',${total},${guests})"
        class="w-full py-4 bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl font-semibold text-lg hover:from-emerald-400 hover:to-green-500 transition">
        ✓ Подтвердить бронирование
      </button>
    </div>`;
  openBookingModal();
}

async function confirmHotelBooking(name, destination, checkin, checkout, price, guests) {
  const booking = {
    id: Date.now().toString(), type: 'hotel',
    destination: destination, departure: name, arrival: '',
    date_from: checkin, date_to: checkout, guests: parseInt(guests),
    price: Number(price), status: 'confirmed', created_at: new Date().toISOString()
  };
  const ok = await addBooking(booking);
  if (ok) {
    showToast('Отель забронирован! 🎉');
    closeModal();
    setTimeout(() => showSection('bookings'), 900);
  } else {
    showToast('Ошибка при бронировании', 'error');
  }
}

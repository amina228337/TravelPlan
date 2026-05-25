// =============================================
// personalization.js - профиль влияет на сайт
// =============================================

// Зачем этот файл:
// Персонализация: стиль поездок, бюджет, бейджи и сортировка под профиль.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

const TP_STYLE_KEYWORDS = {
  'Комфортно и красиво': ['красиво', 'уютно', 'парк', 'сад', 'набереж', 'вид', 'центр', 'комфорт', 'бутик'],
  'Бюджетно': ['рынок', 'парк', 'площадь', 'набереж', 'free', 'бесплат', 'старый город'],
  'Люкс': ['люкс', 'марина', 'palace', 'grand', 'four seasons', 'ritz', 'hyatt', 'premium', 'премиум', 'бутик', 'resort'],
  'Культура и музеи': ['музей', 'собор', 'кремль', 'дворец', 'замок', 'крепость', 'храм', 'галерея', 'археолог', 'история', 'культура'],
  'Море и отдых': ['море', 'пляж', 'бухта', 'лагуна', 'остров', 'набереж', 'курорт', 'beach', 'marina', 'bay'],
  'Горы и природа': ['гора', 'горы', 'каньон', 'озеро', 'водопад', 'парк', 'ущелье', 'лес', 'природа', 'скала', 'долина']
};

const TP_BUDGET_LIMITS = {
  'Эконом': { flight: 85000, hotel: 35000 },
  'Средний': { flight: 165000, hotel: 70000 },
  'Выше среднего': { flight: 320000, hotel: 130000 },
  'Без ограничений': { flight: Infinity, hotel: Infinity }
};

function tpProfile() {
  return window.travelplanUserProfile || {};
}

function tpTravelStyle() {
  return tpProfile().travel_style || 'Комфортно и красиво';
}

function tpBudgetLevel() {
  return tpProfile().budget_level || 'Средний';
}

function tpCountryNameByCode(code) {
  if (typeof PLACES_COUNTRY_NAMES !== 'undefined' && PLACES_COUNTRY_NAMES[code]) return PLACES_COUNTRY_NAMES[code];
  const found = (typeof CITY_OPTIONS !== 'undefined') ? CITY_OPTIONS.find(c => (getCityMeta(c.name)?.country || '').toLowerCase() === String(code || '').toLowerCase()) : null;
  return found?.country || code || '';
}

function tpItemText(item) {
  return [item?.city, item?.name, item?.desc, item?.tag, item?.country, item?.amenities?.join?.(' ') || item?.amenities || '']
    .join(' ')
    .toLowerCase();
}

function tpItemPrice(item) {
  if (!item) return 0;
  if (item.type === 'hotel') return Number(item.price || 0);
  if (item.type === 'place') return Number(item.entryPrice || 0);
  if (item.price) return Number(item.price || 0);
  if (item.city && typeof getDisplayFlightPrice === 'function' && typeof DESTINATIONS !== 'undefined') {
    const d = DESTINATIONS.find(x => x.city === item.city);
    if (d) return Number(getDisplayFlightPrice(d) || d.price || 0);
  }
  return 0;
}

function tpBudgetType(item) {
  return item?.type === 'hotel' ? 'hotel' : 'flight';
}

function tpBudgetLimit(item) {
  const limits = TP_BUDGET_LIMITS[tpBudgetLevel()] || TP_BUDGET_LIMITS['Средний'];
  return limits[tpBudgetType(item)] ?? Infinity;
}

function tpMatchesStyle(item) {
  const style = tpTravelStyle();
  const words = TP_STYLE_KEYWORDS[style] || [];
  const text = tpItemText(item);
  return words.some(w => text.includes(String(w).toLowerCase()));
}

function tpWithinBudget(item) {
  const price = tpItemPrice(item);
  const limit = tpBudgetLimit(item);
  return !price || price <= limit;
}

function tpPersonalScore(item) {
  let score = 0;
  if (tpMatchesStyle(item)) score += 70;
  if (tpWithinBudget(item)) score += 40;
  if (item?.rating) score += Math.round(Number(item.rating) * 4);
  if (item?.stars && tpBudgetLevel() !== 'Эконом') score += Number(item.stars) * 3;
  if (tpTravelStyle() === 'Люкс' && item?.stars >= 5) score += 40;
  if (tpTravelStyle() === 'Бюджетно' && tpItemPrice(item) <= (item?.type === 'hotel' ? 35000 : 85000)) score += 35;
  return score;
}

function tpSelectionFacts(item) {
  const facts = [];
  const price = tpItemPrice(item);
  const limit = tpBudgetLimit(item);
  if (tpMatchesStyle(item)) facts.push(`Стиль: ${tpTravelStyle()}`);
  if (price && limit !== Infinity && price <= limit) facts.push(`В бюджете: до ${Number(limit).toLocaleString()} ₸`);
  if (price && limit !== Infinity && price > limit) facts.push(`Выше бюджета: лимит ${Number(limit).toLocaleString()} ₸`);
  if (item?.type === 'hotel' && item?.stars) facts.push(`${item.stars}★ отель`);
  if (item?.type === 'flight' && item?.duration_h) facts.push(`Перелёт ${item.duration_text || item.duration_h + 'ч'}`);
  if (item?.type === 'place') facts.push(item.entryPrice ? `Вход: ${Number(item.entryPrice).toLocaleString()} ₸` : 'Бесплатно');
  return facts;
}



// Красивый вывод удобств отеля.
// Раньше amenities показывались как "breakfast,gym,spa" - это похоже на сырой лог,
// а не на интерфейс для живого человека. Здесь переводим ключи в понятные чипсы.
const TP_AMENITY_UI = {
  breakfast: { icon: '🍳', label: 'Завтрак' },
  gym:       { icon: '🏋️', label: 'Фитнес' },
  spa:       { icon: '💆', label: 'SPA' },
  pool:      { icon: '🏊', label: 'Бассейн' },
  beach:     { icon: '🏖️', label: 'Пляж' },
  wifi:      { icon: '📶', label: 'Wi-Fi' }
};

function tpAmenityItems(amenities) {
  if (!amenities) return [];
  const raw = Array.isArray(amenities)
    ? amenities
    : String(amenities).split(/[,,;]+/).map(x => x.trim()).filter(Boolean);

  return raw.map(item => {
    const key = String(item).toLowerCase().trim();
    const known = TP_AMENITY_UI[key];
    if (known) return { key, ...known };
    return { key, icon: '•', label: String(item).trim() };
  });
}

function tpRenderAmenityChips(amenities) {
  const items = tpAmenityItems(amenities);
  if (!items.length) return '';
  return `<div class="hotel-amenities flex flex-wrap gap-1.5 mt-2">${items.map(a => `
    <span class="hotel-amenity-chip inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-slate-300">
      <span>${a.icon}</span><span>${a.label}</span>
    </span>`).join('')}</div>`;
}

function tpRenderBadges(item) {
  const facts = tpSelectionFacts(item);
  if (!facts.length) return '';
  const good = tpMatchesStyle(item) || tpWithinBudget(item);
  return `<div class="flex flex-wrap gap-1.5 mt-2">${facts.slice(0, 3).map(f => `<span class="text-[11px] px-2 py-1 rounded-full ${good ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25' : 'bg-amber-500/15 text-amber-300 border border-amber-500/25'}">${f}</span>`).join('')}</div>`;
}

function tpRenderTags(item) {
  const facts = tpSelectionFacts(item);
  const base = [];
  if (item?.city) base.push(item.city);
  if (item?.country) base.push(tpCountryNameByCode(item.country));
  const tags = [...new Set([...base, ...facts])].filter(Boolean).slice(0, 6);
  return `<div class="flex flex-wrap gap-2 my-3">${tags.map(t => `<span class="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-slate-300">${t}</span>`).join('')}</div>`;
}

function tpSortByProfile(items) {
  return [...items].sort((a, b) => tpPersonalScore(b) - tpPersonalScore(a));
}

function tpApplyHotelAmenities(items) {
  const cityCounters = {};
  return items.map((h, index) => {
    const cityName = h.city || '';
    const cityIndex = cityCounters[cityName] || 0;
    cityCounters[cityName] = cityIndex + 1;
    const adjustedPrice = typeof getHotelPriceForCity === 'function' ? getHotelPriceForCity(cityName, cityIndex % 3, h.price) : h.price;
    const name = String(h.name || '').toLowerCase();
    const city = String(h.city || '').toLowerCase();
    const stars = Number(h.stars || 4);
    const amenities = new Set();
    amenities.add('breakfast');
    if (stars >= 4) amenities.add('gym');
    if (stars >= 5 || /resort|spa|palace|hyatt|four seasons|radisson|swissotel|amara|elysium|ritz|grand/.test(name)) amenities.add('spa');
    if (stars >= 5 || /resort|paradise|beach|sun|sea|bay|sultanahmet|kempinski/.test(name)) amenities.add('pool');
    if (/сочи|актау|ларнака|пафос|лимассол|айя|анталья/.test(city)) amenities.add('beach');
    if (['актау','сочи','ларнака','пафос','лимассол','айя-напа','анталья','пхукет','паттайя','самуи','батуми','дубай','абу-даби','шарджа','ница','марсель','майорка','санторини','крит','шарм-эль-шейх','хургада','александрия','майами','пусан','чеджу'].some(x => city.includes(x))) amenities.add('beach');
    return { ...h, price: adjustedPrice, amenities: [...amenities] };
  });
}

function tpPlaceEntry(placeName, category) {
  const text = String(placeName || '').toLowerCase();
  const freeWords = ['парк', 'набереж', 'пляж', 'бухта', 'гора', 'озеро', 'водопад', 'район', 'улица', 'площадь', 'мост', 'сад', 'каньон', 'лагуна', 'скала', 'долина'];
  const paidWords = ['музей', 'дворец', 'замок', 'крепость', 'собор', 'храм', 'галерея', 'аквариум', 'башня', 'монастырь', 'археолог'];
  if (freeWords.some(w => text.includes(w))) return { price: 0, label: 'Бесплатно' };
  if (paidWords.some(w => text.includes(w))) {
    const price = 2500 + (String(placeName).length % 7) * 900;
    return { price, label: `Вход: ${price.toLocaleString()} ₸` };
  }
  if (category === 'beauty') return { price: 0, label: 'Бесплатно' };
  return { price: 3000, label: 'Вход: 3 000 ₸' };
}

function tpRefreshPersonalizedUI() {
  try { if (typeof renderTop3Destinations === 'function') renderTop3Destinations(); } catch {}
  try { if (typeof renderPersonalSection === 'function') renderPersonalSection(); } catch {}
  try { if (typeof initFeed === 'function') initFeed(); } catch {}
  try { if (typeof initPlaces === 'function') initPlaces(); } catch {}
}

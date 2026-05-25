// =============================================
//  utils.js
// =============================================

// Зачем этот файл:
// Общие помощники: форматирование, картинки, город пользователя, toast-уведомления и мелкая бытовая магия.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

function jsString(value) {
  return String(value ?? '').replace(/\\/g, '\\\\').replace(/'/g, "\\'").replace(/\n/g, ' ');
}

// ── Debounce ──────────────────────────────────────────────────────────────
function debounce(fn, delay = 250) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}

// ── Простой in-memory кеш ─────────────────────────────────────────────────
const _tpCache = new Map();
function tpCacheGet(key) { return _tpCache.get(key); }
function tpCacheSet(key, value, ttlMs = 60000) {
  _tpCache.set(key, { value, expires: Date.now() + ttlMs });
  return value;
}
function tpCached(key, fn, ttlMs = 60000) {
  const cached = _tpCache.get(key);
  if (cached && Date.now() < cached.expires) return cached.value;
  const result = fn();
  _tpCache.set(key, { value: result, expires: Date.now() + ttlMs });
  return result;
}

function showToast(message, type = 'success') {
  const toast = document.getElementById('toast');
  const msg   = document.getElementById('toast-message');
  if (!toast || !msg) return;
  toast.className = `fixed bottom-6 right-6 text-white px-6 py-3 rounded-xl shadow-lg z-[9999] transition-all duration-300 ${type === 'error' ? 'bg-red-500' : 'bg-emerald-500'}`;
  msg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  setTimeout(() => toast.classList.add('translate-y-20', 'opacity-0'), 3000);
}

function formatDate(dateStr) {
  if (!dateStr) return '';
  return new Date(dateStr).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' });
}

function closeModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
}

function closeDeleteConfirm() {
  const dialog = document.getElementById('delete-confirm');
  if (dialog) { dialog.style.display = 'none'; dialog.classList.add('hidden'); }
}

// Открыть модальное окно бронирования
function openBookingModal() {
  const modal = document.getElementById('booking-modal');
  if (modal) { modal.style.display = 'flex'; modal.classList.remove('hidden'); }
}

// Закрыть детальное модальное окно брони
function closeDetailModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
}

// Открыть детальное модальное окно брони
function openDetailModal() {
  const modal = document.getElementById('detail-modal');
  if (modal) { modal.style.display = 'flex'; modal.classList.remove('hidden'); }
}

// Закрыть детальное модальное окно ленты
function closeFeedDetailModal() {
  const modal = document.getElementById('feed-detail-modal');
  if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
}

// Открыть детальное модальное окно ленты
function openFeedDetailModal() {
  const modal = document.getElementById('feed-detail-modal');
  if (modal) { modal.style.display = 'flex'; modal.classList.remove('hidden'); }
}

// ── Город отправления (My City) ────────────────────────────────────────────

const CITY_OPTIONS = [
  {
    "code": "ALA",
    "name": "Алматы",
    "iata": "ALA",
    "country": "Казахстан"
  },
  {
    "code": "NQZ",
    "name": "Астана",
    "iata": "NQZ",
    "country": "Казахстан"
  },
  {
    "code": "CIT",
    "name": "Шымкент",
    "iata": "CIT",
    "country": "Казахстан"
  },
  {
    "code": "SCO",
    "name": "Актау",
    "iata": "SCO",
    "country": "Казахстан"
  },
  {
    "code": "HSA",
    "name": "Туркестан",
    "iata": "HSA",
    "country": "Казахстан"
  },
  {
    "code": "KOV",
    "name": "Бурабай",
    "iata": "KOV",
    "country": "Казахстан"
  },
  {
    "code": "SVO",
    "name": "Москва",
    "iata": "SVO",
    "country": "Россия"
  },
  {
    "code": "LED",
    "name": "Санкт-Петербург",
    "iata": "LED",
    "country": "Россия"
  },
  {
    "code": "AER",
    "name": "Сочи",
    "iata": "AER",
    "country": "Россия"
  },
  {
    "code": "KZN",
    "name": "Казань",
    "iata": "KZN",
    "country": "Россия"
  },
  {
    "code": "KGD",
    "name": "Калининград",
    "iata": "KGD",
    "country": "Россия"
  },
  {
    "code": "LCA",
    "name": "Ларнака",
    "iata": "LCA",
    "country": "Кипр"
  },
  {
    "code": "PFO",
    "name": "Пафос",
    "iata": "PFO",
    "country": "Кипр"
  },
  {
    "code": "LMS",
    "name": "Лимассол",
    "iata": "LMS",
    "country": "Кипр"
  },
  {
    "code": "NIC",
    "name": "Никосия",
    "iata": "NIC",
    "country": "Кипр"
  },
  {
    "code": "AYA",
    "name": "Айя-Напа",
    "iata": "AYA",
    "country": "Кипр"
  },
  {
    "code": "IST",
    "name": "Стамбул",
    "iata": "IST",
    "country": "Турция"
  },
  {
    "code": "AYT",
    "name": "Анталья",
    "iata": "AYT",
    "country": "Турция"
  },
  {
    "code": "NAV",
    "name": "Каппадокия",
    "iata": "NAV",
    "country": "Турция"
  },
  {
    "code": "ADB",
    "name": "Измир",
    "iata": "ADB",
    "country": "Турция"
  },
  {
    "code": "DXB",
    "name": "Дубай",
    "iata": "DXB",
    "country": "ОАЭ"
  },
  {
    "code": "AUH",
    "name": "Абу-Даби",
    "iata": "AUH",
    "country": "ОАЭ"
  },
  {
    "code": "SHJ",
    "name": "Шарджа",
    "iata": "SHJ",
    "country": "ОАЭ"
  },
  {
    "code": "TBS",
    "name": "Тбилиси",
    "iata": "TBS",
    "country": "Грузия"
  },
  {
    "code": "BUS",
    "name": "Батуми",
    "iata": "BUS",
    "country": "Грузия"
  },
  {
    "code": "KUT",
    "name": "Кутаиси",
    "iata": "KUT",
    "country": "Грузия"
  },
  {
    "code": "PRG",
    "name": "Прага",
    "iata": "PRG",
    "country": "Чехия"
  },
  {
    "code": "KLV",
    "name": "Карловы Вары",
    "iata": "KLV",
    "country": "Чехия"
  },
  {
    "code": "BRQ",
    "name": "Брно",
    "iata": "BRQ",
    "country": "Чехия"
  },
  {
    "code": "BCN",
    "name": "Барселона",
    "iata": "BCN",
    "country": "Испания"
  },
  {
    "code": "MAD",
    "name": "Мадрид",
    "iata": "MAD",
    "country": "Испания"
  },
  {
    "code": "VLC",
    "name": "Валенсия",
    "iata": "VLC",
    "country": "Испания"
  },
  {
    "code": "SVQ",
    "name": "Севилья",
    "iata": "SVQ",
    "country": "Испания"
  },
  {
    "code": "PMI",
    "name": "Майорка",
    "iata": "PMI",
    "country": "Испания"
  },
  {
    "code": "FCO",
    "name": "Рим",
    "iata": "FCO",
    "country": "Италия"
  },
  {
    "code": "MXP",
    "name": "Милан",
    "iata": "MXP",
    "country": "Италия"
  },
  {
    "code": "VCE",
    "name": "Венеция",
    "iata": "VCE",
    "country": "Италия"
  },
  {
    "code": "FLR",
    "name": "Флоренция",
    "iata": "FLR",
    "country": "Италия"
  },
  {
    "code": "NAP",
    "name": "Неаполь",
    "iata": "NAP",
    "country": "Италия"
  },
  {
    "code": "CDG",
    "name": "Париж",
    "iata": "CDG",
    "country": "Франция"
  },
  {
    "code": "NCE",
    "name": "Ницца",
    "iata": "NCE",
    "country": "Франция"
  },
  {
    "code": "LYS",
    "name": "Лион",
    "iata": "LYS",
    "country": "Франция"
  },
  {
    "code": "MRS",
    "name": "Марсель",
    "iata": "MRS",
    "country": "Франция"
  },
  {
    "code": "BKK",
    "name": "Бангкок",
    "iata": "BKK",
    "country": "Таиланд"
  },
  {
    "code": "HKT",
    "name": "Пхукет",
    "iata": "HKT",
    "country": "Таиланд"
  },
  {
    "code": "UTP",
    "name": "Паттайя",
    "iata": "UTP",
    "country": "Таиланд"
  },
  {
    "code": "CNX",
    "name": "Чиангмай",
    "iata": "CNX",
    "country": "Таиланд"
  },
  {
    "code": "USM",
    "name": "Самуи",
    "iata": "USM",
    "country": "Таиланд"
  },
  {
    "code": "HND",
    "name": "Токио",
    "iata": "HND",
    "country": "Япония"
  },
  {
    "code": "KIX",
    "name": "Киото",
    "iata": "KIX",
    "country": "Япония"
  },
  {
    "code": "KIX",
    "name": "Осака",
    "iata": "KIX",
    "country": "Япония"
  },
  {
    "code": "CTS",
    "name": "Саппоро",
    "iata": "CTS",
    "country": "Япония"
  },
  {
    "code": "ICN",
    "name": "Сеул",
    "iata": "ICN",
    "country": "Южная Корея"
  },
  {
    "code": "PUS",
    "name": "Пусан",
    "iata": "PUS",
    "country": "Южная Корея"
  },
  {
    "code": "CJU",
    "name": "Чеджу",
    "iata": "CJU",
    "country": "Южная Корея"
  },
  {
    "code": "PEK",
    "name": "Пекин",
    "iata": "PEK",
    "country": "Китай"
  },
  {
    "code": "PVG",
    "name": "Шанхай",
    "iata": "PVG",
    "country": "Китай"
  },
  {
    "code": "CAN",
    "name": "Гуанчжоу",
    "iata": "CAN",
    "country": "Китай"
  },
  {
    "code": "HKG",
    "name": "Гонконг",
    "iata": "HKG",
    "country": "Китай"
  },
  {
    "code": "JFK",
    "name": "Нью-Йорк",
    "iata": "JFK",
    "country": "США"
  },
  {
    "code": "LAX",
    "name": "Лос-Анджелес",
    "iata": "LAX",
    "country": "США"
  },
  {
    "code": "MIA",
    "name": "Майами",
    "iata": "MIA",
    "country": "США"
  },
  {
    "code": "LAS",
    "name": "Лас-Вегас",
    "iata": "LAS",
    "country": "США"
  },
  {
    "code": "SFO",
    "name": "Сан-Франциско",
    "iata": "SFO",
    "country": "США"
  },
  {
    "code": "LHR",
    "name": "Лондон",
    "iata": "LHR",
    "country": "Великобритания"
  },
  {
    "code": "EDI",
    "name": "Эдинбург",
    "iata": "EDI",
    "country": "Великобритания"
  },
  {
    "code": "MAN",
    "name": "Манчестер",
    "iata": "MAN",
    "country": "Великобритания"
  },
  {
    "code": "BER",
    "name": "Берлин",
    "iata": "BER",
    "country": "Германия"
  },
  {
    "code": "MUC",
    "name": "Мюнхен",
    "iata": "MUC",
    "country": "Германия"
  },
  {
    "code": "HAM",
    "name": "Гамбург",
    "iata": "HAM",
    "country": "Германия"
  },
  {
    "code": "ATH",
    "name": "Афины",
    "iata": "ATH",
    "country": "Греция"
  },
  {
    "code": "JTR",
    "name": "Санторини",
    "iata": "JTR",
    "country": "Греция"
  },
  {
    "code": "HER",
    "name": "Крит",
    "iata": "HER",
    "country": "Греция"
  },
  {
    "code": "SKG",
    "name": "Салоники",
    "iata": "SKG",
    "country": "Греция"
  },
  {
    "code": "CAI",
    "name": "Каир",
    "iata": "CAI",
    "country": "Египет"
  },
  {
    "code": "SSH",
    "name": "Шарм-эль-Шейх",
    "iata": "SSH",
    "country": "Египет"
  },
  {
    "code": "HRG",
    "name": "Хургада",
    "iata": "HRG",
    "country": "Египет"
  },
  {
    "code": "HBE",
    "name": "Александрия",
    "iata": "HBE",
    "country": "Египет"
  },
  {
    "code": "TAS",
    "name": "Ташкент",
    "iata": "TAS",
    "country": "Узбекистан"
  },
  {
    "code": "SKD",
    "name": "Самарканд",
    "iata": "SKD",
    "country": "Узбекистан"
  },
  {
    "code": "BHK",
    "name": "Бухара",
    "iata": "BHK",
    "country": "Узбекистан"
  }
];



// ── Демо-цены по городу отправления ───────────────────────────────────────
// Это не live API, а реалистичные ориентиры в ₸ для дипломного демо.
const ROUTE_PRICE_BY_FROM = {
  'Алматы': {
    'Актобе': 28500, 'Кызылорда': 26000,
    'Астана': 17800, 'Шымкент': 12500, 'Актау': 38000, 'Москва': 74200, 'Санкт-Петербург': 74600,
    'Сочи': 52000, 'Минск': 95000, 'Стамбул': 61600, 'Анталья': 24200, 'Гуанчжоу': 100800,
    'Пекин': 115000, 'Токио': 80000, 'Осака': 88000, 'Рим': 77100, 'Милан': 82000,
    'Париж': 85000, 'Бангкок': 79600, 'Пхукет': 89400, 'Дубай': 90100, 'Абу-Даби': 95000,
    'Нью-Йорк': 310000, 'Лос-Анджелес': 295000, 'Тбилиси': 72000, 'Батуми': 76000, 'Прага': 135000, 'Барселона': 150000, 'Сеул': 145000
  },
  'Астана': {
    'Алматы': 18000, 'Актобе': 33000, 'Кызылорда': 30000, 'Шымкент': 22000, 'Актау': 42000, 'Москва': 68000, 'Санкт-Петербург': 76000,
    'Сочи': 62000, 'Минск': 90000, 'Стамбул': 78000, 'Анталья': 72000, 'Гуанчжоу': 118000,
    'Пекин': 108000, 'Токио': 135000, 'Осака': 142000, 'Рим': 128000, 'Милан': 126000,
    'Париж': 132000, 'Бангкок': 115000, 'Пхукет': 125000, 'Дубай': 82000, 'Абу-Даби': 90000,
    'Нью-Йорк': 330000, 'Лос-Анджелес': 340000, 'Тбилиси': 88000, 'Прага': 145000, 'Барселона': 160000, 'Сеул': 150000
  },
  'Москва': {
    'Алматы': 74200, 'Актобе': 72000, 'Кызылорда': 82000, 'Астана': 68000, 'Шымкент': 85000, 'Актау': 78000, 'Санкт-Петербург': 17000,
    'Сочи': 18000, 'Минск': 14000, 'Стамбул': 85000, 'Анталья': 95000, 'Гуанчжоу': 170000,
    'Пекин': 165000, 'Токио': 190000, 'Осака': 205000, 'Рим': 120000, 'Милан': 115000,
    'Париж': 135000, 'Бангкок': 170000, 'Пхукет': 185000, 'Дубай': 125000, 'Абу-Даби': 130000,
    'Нью-Йорк': 220000, 'Лос-Анджелес': 260000, 'Прага': 65000, 'Барселона': 80000, 'Тбилиси': 52000, 'Сеул': 180000
  },
  'Санкт-Петербург': {
    'Москва': 17000, 'Алматы': 76000, 'Астана': 76000, 'Сочи': 22000, 'Минск': 16000,
    'Стамбул': 92000, 'Анталья': 105000, 'Париж': 125000, 'Рим': 118000, 'Милан': 110000,
    'Дубай': 135000, 'Бангкок': 185000, 'Нью-Йорк': 230000
  },
  'Актау': {
    'Алматы': 38000, 'Астана': 42000, 'Актобе': 29000, 'Шымкент': 47000, 'Москва': 78000,
    'Стамбул': 68000, 'Анталья': 76000, 'Дубай': 95000, 'Тбилиси': 72000, 'Прага': 145000
  },
  'Актобе': {
    'Алматы': 28500, 'Астана': 33000, 'Актау': 29000, 'Шымкент': 36000, 'Москва': 72000,
    'Стамбул': 82000, 'Анталья': 90000, 'Дубай': 110000, 'Тбилиси': 78000, 'Прага': 150000, 'Сеул': 165000
  },
  'Шымкент': {
    'Алматы': 12500, 'Астана': 22000, 'Актау': 47000, 'Актобе': 36000, 'Москва': 85000,
    'Стамбул': 64000, 'Анталья': 70000, 'Дубай': 98000, 'Тбилиси': 82000
  },
  'Сочи': {
    'Москва': 18000, 'Санкт-Петербург': 22000, 'Алматы': 52000, 'Астана': 62000,
    'Стамбул': 55000, 'Анталья': 65000, 'Дубай': 110000, 'Париж': 150000
  }
};


const CITY_META = {
  "Алматы": {
    "country": "kz",
    "basePrice": 18000
  },
  "Астана": {
    "country": "kz",
    "basePrice": 17800
  },
  "Шымкент": {
    "country": "kz",
    "basePrice": 12500
  },
  "Актау": {
    "country": "kz",
    "basePrice": 38000
  },
  "Туркестан": {
    "country": "kz",
    "basePrice": 26000
  },
  "Бурабай": {
    "country": "kz",
    "basePrice": 24000
  },
  "Москва": {
    "country": "ru",
    "basePrice": 74200
  },
  "Санкт-Петербург": {
    "country": "ru",
    "basePrice": 74600
  },
  "Сочи": {
    "country": "ru",
    "basePrice": 52000
  },
  "Казань": {
    "country": "ru",
    "basePrice": 72000
  },
  "Калининград": {
    "country": "ru",
    "basePrice": 88000
  },
  "Ларнака": {
    "country": "cy",
    "basePrice": 112000
  },
  "Пафос": {
    "country": "cy",
    "basePrice": 118000
  },
  "Лимассол": {
    "country": "cy",
    "basePrice": 120000
  },
  "Никосия": {
    "country": "cy",
    "basePrice": 116000
  },
  "Айя-Напа": {
    "country": "cy",
    "basePrice": 122000
  },
  "Стамбул": {
    "country": "tr",
    "basePrice": 61600
  },
  "Анталья": {
    "country": "tr",
    "basePrice": 24200
  },
  "Каппадокия": {
    "country": "tr",
    "basePrice": 76000
  },
  "Измир": {
    "country": "tr",
    "basePrice": 72000
  },
  "Дубай": {
    "country": "ae",
    "basePrice": 90100
  },
  "Абу-Даби": {
    "country": "ae",
    "basePrice": 95000
  },
  "Шарджа": {
    "country": "ae",
    "basePrice": 85000
  },
  "Тбилиси": {
    "country": "ge",
    "basePrice": 72000
  },
  "Батуми": {
    "country": "ge",
    "basePrice": 76000
  },
  "Кутаиси": {
    "country": "ge",
    "basePrice": 68000
  },
  "Прага": {
    "country": "cz",
    "basePrice": 135000
  },
  "Карловы Вары": {
    "country": "cz",
    "basePrice": 145000
  },
  "Брно": {
    "country": "cz",
    "basePrice": 132000
  },
  "Барселона": {
    "country": "es",
    "basePrice": 150000
  },
  "Мадрид": {
    "country": "es",
    "basePrice": 155000
  },
  "Валенсия": {
    "country": "es",
    "basePrice": 148000
  },
  "Севилья": {
    "country": "es",
    "basePrice": 152000
  },
  "Майорка": {
    "country": "es",
    "basePrice": 165000
  },
  "Рим": {
    "country": "it",
    "basePrice": 77100
  },
  "Милан": {
    "country": "it",
    "basePrice": 82000
  },
  "Венеция": {
    "country": "it",
    "basePrice": 88000
  },
  "Флоренция": {
    "country": "it",
    "basePrice": 90000
  },
  "Неаполь": {
    "country": "it",
    "basePrice": 86000
  },
  "Париж": {
    "country": "fr",
    "basePrice": 85000
  },
  "Ницца": {
    "country": "fr",
    "basePrice": 90000
  },
  "Лион": {
    "country": "fr",
    "basePrice": 88000
  },
  "Марсель": {
    "country": "fr",
    "basePrice": 92000
  },
  "Бангкок": {
    "country": "th",
    "basePrice": 79600
  },
  "Пхукет": {
    "country": "th",
    "basePrice": 89400
  },
  "Паттайя": {
    "country": "th",
    "basePrice": 85000
  },
  "Чиангмай": {
    "country": "th",
    "basePrice": 87000
  },
  "Самуи": {
    "country": "th",
    "basePrice": 98000
  },
  "Токио": {
    "country": "jp",
    "basePrice": 80000
  },
  "Киото": {
    "country": "jp",
    "basePrice": 85000
  },
  "Осака": {
    "country": "jp",
    "basePrice": 88000
  },
  "Саппоро": {
    "country": "jp",
    "basePrice": 98000
  },
  "Сеул": {
    "country": "kr",
    "basePrice": 145000
  },
  "Пусан": {
    "country": "kr",
    "basePrice": 150000
  },
  "Чеджу": {
    "country": "kr",
    "basePrice": 160000
  },
  "Пекин": {
    "country": "cn",
    "basePrice": 115000
  },
  "Шанхай": {
    "country": "cn",
    "basePrice": 120000
  },
  "Гуанчжоу": {
    "country": "cn",
    "basePrice": 100800
  },
  "Гонконг": {
    "country": "cn",
    "basePrice": 140000
  },
  "Нью-Йорк": {
    "country": "us",
    "basePrice": 310000
  },
  "Лос-Анджелес": {
    "country": "us",
    "basePrice": 295000
  },
  "Майами": {
    "country": "us",
    "basePrice": 320000
  },
  "Лас-Вегас": {
    "country": "us",
    "basePrice": 300000
  },
  "Сан-Франциско": {
    "country": "us",
    "basePrice": 330000
  },
  "Лондон": {
    "country": "gb",
    "basePrice": 180000
  },
  "Эдинбург": {
    "country": "gb",
    "basePrice": 190000
  },
  "Манчестер": {
    "country": "gb",
    "basePrice": 175000
  },
  "Берлин": {
    "country": "de",
    "basePrice": 125000
  },
  "Мюнхен": {
    "country": "de",
    "basePrice": 135000
  },
  "Гамбург": {
    "country": "de",
    "basePrice": 132000
  },
  "Афины": {
    "country": "gr",
    "basePrice": 118000
  },
  "Санторини": {
    "country": "gr",
    "basePrice": 150000
  },
  "Крит": {
    "country": "gr",
    "basePrice": 135000
  },
  "Салоники": {
    "country": "gr",
    "basePrice": 120000
  },
  "Каир": {
    "country": "eg",
    "basePrice": 110000
  },
  "Шарм-эль-Шейх": {
    "country": "eg",
    "basePrice": 90000
  },
  "Хургада": {
    "country": "eg",
    "basePrice": 85000
  },
  "Александрия": {
    "country": "eg",
    "basePrice": 115000
  },
  "Ташкент": {
    "country": "uz",
    "basePrice": 42000
  },
  "Самарканд": {
    "country": "uz",
    "basePrice": 52000
  },
  "Бухара": {
    "country": "uz",
    "basePrice": 56000
  }
};
const COUNTRY_GROUPS = { kz:'local', ru:'near', uz:'near', ge:'near', cy:'mid', tr:'mid', ae:'mid', eg:'mid', cz:'eu', es:'eu', it:'eu', fr:'eu', gb:'eu', de:'eu', gr:'eu', th:'asia', jp:'asia', kr:'asia', cn:'asia', us:'long' };
function getCityMeta(cityName) { return CITY_META[cityName] || null; }

const HOTEL_PRICE_BY_CITY = {
  "Алматы": [
    22000,
    29000,
    18000
  ],
  "Астана": [
    26000,
    35000,
    21000
  ],
  "Шымкент": [
    18000,
    24000,
    14000
  ],
  "Актау": [
    21000,
    28000,
    17000
  ],
  "Туркестан": [
    19000,
    25000,
    15000
  ],
  "Бурабай": [
    30000,
    40000,
    24000
  ],
  "Москва": [
    52000,
    70000,
    42000
  ],
  "Санкт-Петербург": [
    45000,
    60000,
    36000
  ],
  "Сочи": [
    38000,
    51000,
    31000
  ],
  "Казань": [
    32000,
    43000,
    26000
  ],
  "Калининград": [
    35000,
    47000,
    28000
  ],
  "Ларнака": [
    42000,
    56000,
    34000
  ],
  "Пафос": [
    52000,
    70000,
    42000
  ],
  "Лимассол": [
    60000,
    81000,
    49000
  ],
  "Никосия": [
    45000,
    60000,
    36000
  ],
  "Айя-Напа": [
    48000,
    64000,
    39000
  ],
  "Стамбул": [
    30000,
    40000,
    24000
  ],
  "Анталья": [
    28000,
    37000,
    22000
  ],
  "Каппадокия": [
    42000,
    56000,
    34000
  ],
  "Измир": [
    33000,
    44000,
    27000
  ],
  "Дубай": [
    65000,
    87000,
    53000
  ],
  "Абу-Даби": [
    70000,
    94000,
    57000
  ],
  "Шарджа": [
    40000,
    54000,
    32000
  ],
  "Тбилиси": [
    28000,
    37000,
    22000
  ],
  "Батуми": [
    30000,
    40000,
    24000
  ],
  "Кутаиси": [
    22000,
    29000,
    18000
  ],
  "Прага": [
    42000,
    56000,
    34000
  ],
  "Карловы Вары": [
    45000,
    60000,
    36000
  ],
  "Брно": [
    32000,
    43000,
    26000
  ],
  "Барселона": [
    56000,
    75000,
    45000
  ],
  "Мадрид": [
    52000,
    70000,
    42000
  ],
  "Валенсия": [
    46000,
    62000,
    37000
  ],
  "Севилья": [
    42000,
    56000,
    34000
  ],
  "Майорка": [
    60000,
    81000,
    49000
  ],
  "Рим": [
    52000,
    70000,
    42000
  ],
  "Милан": [
    56000,
    75000,
    45000
  ],
  "Венеция": [
    65000,
    87000,
    53000
  ],
  "Флоренция": [
    50000,
    67000,
    41000
  ],
  "Неаполь": [
    38000,
    51000,
    31000
  ],
  "Париж": [
    65000,
    87000,
    53000
  ],
  "Ницца": [
    62000,
    83000,
    50000
  ],
  "Лион": [
    42000,
    56000,
    34000
  ],
  "Марсель": [
    40000,
    54000,
    32000
  ],
  "Бангкок": [
    26000,
    35000,
    21000
  ],
  "Пхукет": [
    36000,
    48000,
    29000
  ],
  "Паттайя": [
    22000,
    29000,
    18000
  ],
  "Чиангмай": [
    20000,
    27000,
    16000
  ],
  "Самуи": [
    42000,
    56000,
    34000
  ],
  "Токио": [
    70000,
    94000,
    57000
  ],
  "Киото": [
    52000,
    70000,
    42000
  ],
  "Осака": [
    50000,
    67000,
    41000
  ],
  "Саппоро": [
    46000,
    62000,
    37000
  ],
  "Сеул": [
    52000,
    70000,
    42000
  ],
  "Пусан": [
    46000,
    62000,
    37000
  ],
  "Чеджу": [
    55000,
    74000,
    45000
  ],
  "Пекин": [
    42000,
    56000,
    34000
  ],
  "Шанхай": [
    52000,
    70000,
    42000
  ],
  "Гуанчжоу": [
    35000,
    47000,
    28000
  ],
  "Гонконг": [
    72000,
    97000,
    59000
  ],
  "Нью-Йорк": [
    110000,
    148000,
    90000
  ],
  "Лос-Анджелес": [
    95000,
    128000,
    77000
  ],
  "Майами": [
    90000,
    121000,
    73000
  ],
  "Лас-Вегас": [
    70000,
    94000,
    57000
  ],
  "Сан-Франциско": [
    105000,
    141000,
    86000
  ],
  "Лондон": [
    80000,
    108000,
    65000
  ],
  "Эдинбург": [
    60000,
    81000,
    49000
  ],
  "Манчестер": [
    50000,
    67000,
    41000
  ],
  "Берлин": [
    50000,
    67000,
    41000
  ],
  "Мюнхен": [
    62000,
    83000,
    50000
  ],
  "Гамбург": [
    52000,
    70000,
    42000
  ],
  "Афины": [
    42000,
    56000,
    34000
  ],
  "Санторини": [
    85000,
    114000,
    69000
  ],
  "Крит": [
    48000,
    64000,
    39000
  ],
  "Салоники": [
    35000,
    47000,
    28000
  ],
  "Каир": [
    35000,
    47000,
    28000
  ],
  "Шарм-эль-Шейх": [
    42000,
    56000,
    34000
  ],
  "Хургада": [
    36000,
    48000,
    29000
  ],
  "Александрия": [
    30000,
    40000,
    24000
  ],
  "Ташкент": [
    26000,
    35000,
    21000
  ],
  "Самарканд": [
    30000,
    40000,
    24000
  ],
  "Бухара": [
    28000,
    37000,
    22000
  ]
};



// Ориентиры цен: близко к минимальным fares Aviasales, но не realtime API.
const AVIASALES_PRICE_OVERRIDES = {
  'Астана': 29600, 'Шымкент': 18700, 'Актау': 43200, 'Актобе': 35400, 'Туркестан': 23000,
  'Бурабай': 30000, 'Тбилиси': 83500, 'Батуми': 88000, 'Кутаиси': 78000, 'Ташкент': 37000,
  'Самарканд': 53500, 'Бухара': 62000, 'Стамбул': 100000, 'Анталья': 98000, 'Каппадокия': 112000,
  'Измир': 105000, 'Дубай': 120000, 'Абу-Даби': 128000, 'Шарджа': 118000, 'Бангкок': 104000,
  'Пхукет': 132000, 'Паттайя': 124000, 'Самуи': 148000, 'Чиангмай': 126000, 'Сеул': 144000,
  'Пусан': 156000, 'Чеджу': 166000, 'Шанхай': 117000, 'Пекин': 122000, 'Гуанчжоу': 143000,
  'Гонконг': 168000, 'Москва': 74000, 'Санкт-Петербург': 82000, 'Сочи': 76000, 'Казань': 78000,
  'Калининград': 98000, 'Ларнака': 128000, 'Пафос': 139000, 'Лимассол': 134000, 'Никосия': 132000,
  'Айя-Напа': 138000, 'Прага': 142000, 'Карловы Вары': 154000, 'Брно': 148000, 'Барселона': 164000,
  'Мадрид': 158000, 'Валенсия': 156000, 'Севилья': 152000, 'Майорка': 170000, 'Рим': 145000,
  'Милан': 138000, 'Венеция': 152000, 'Флоренция': 148000, 'Неаполь': 146000, 'Париж': 155000,
  'Ницца': 162000, 'Лион': 148000, 'Марсель': 158000, 'Токио': 186000, 'Киото': 194000,
  'Осака': 190000, 'Саппоро': 205000, 'Нью-Йорк': 255000, 'Лос-Анджелес': 285000, 'Майами': 295000,
  'Лас-Вегас': 300000, 'Сан-Франциско': 292000, 'Лондон': 185000, 'Эдинбург': 198000, 'Манчестер': 192000,
  'Берлин': 150000, 'Мюнхен': 154000, 'Гамбург': 158000, 'Афины': 135000, 'Санторини': 168000,
  'Крит': 154000, 'Салоники': 136000, 'Каир': 128000, 'Шарм-эль-Шейх': 142000, 'Хургада': 139000,
  'Александрия': 145000
};

const HOTEL_PRICE_OVERRIDES = {
  'Алматы': [26000, 36000, 19000], 'Астана': [28000, 39000, 22000], 'Шымкент': [17000, 25000, 14000],
  'Актау': [25000, 35000, 21000], 'Сочи': [52000, 76000, 38000], 'Москва': [65000, 95000, 48000],
  'Санкт-Петербург': [56000, 84000, 42000], 'Стамбул': [48000, 85000, 36000], 'Дубай': [76000, 155000, 52000],
  'Бангкок': [32000, 52000, 23000], 'Пхукет': [48000, 82000, 34000], 'Ларнака': [52000, 82000, 36000],
  'Пафос': [65000, 110000, 44000], 'Прага': [52000, 78000, 38000], 'Париж': [76000, 140000, 56000],
  'Рим': [62000, 105000, 45000], 'Барселона': [70000, 120000, 48000], 'Токио': [82000, 150000, 58000],
  'Сеул': [62000, 108000, 44000]
};

function getRouteFlightPrice(toCity, fallbackPrice, fromCityName) {
  const from = fromCityName || (typeof getUserCity === 'function' ? getUserCity().name : 'Алматы');
  if (from === toCity) return 0;

  const toMeta = getCityMeta(toCity);
  const fromMeta = getCityMeta(from);
  let base = Number(AVIASALES_PRICE_OVERRIDES[toCity] || fallbackPrice || (toMeta && toMeta.basePrice) || 60000);

  if (fromMeta && toMeta) {
    if (fromMeta.country === toMeta.country) {
      base = Math.min(base, fromMeta.country === 'kz' ? 42000 : Math.max(18000, base * 0.45));
    } else {
      const fromGroup = COUNTRY_GROUPS[fromMeta.country] || 'mid';
      const toGroup = COUNTRY_GROUPS[toMeta.country] || 'mid';
      const groupPair = `${fromGroup}-${toGroup}`;
      const multipliers = {
        'local-near': 1.0, 'near-local': 1.05,
        'local-mid': 1.0,  'mid-local': 1.05,
        'local-eu': 1.08,   'eu-local': 1.15,
        'local-asia': 1.08, 'asia-local': 1.12,
        'local-long': 1.0,  'long-local': 1.05,
        'near-mid': 1.05,   'mid-near': 1.05,
        'near-eu': 0.9,     'eu-near': 0.95,
        'near-asia': 1.25,  'asia-near': 1.15,
        'near-long': 0.85,  'long-near': 0.9,
        'eu-eu': 0.45,      'mid-mid': 0.55,
        'asia-asia': 0.55,  'long-long': 0.5,
        'eu-asia': 1.25,    'asia-eu': 1.25,
        'eu-long': 1.15,    'long-eu': 1.10,
        'mid-eu': 0.95,     'eu-mid': 0.95,
        'mid-asia': 1.05,   'asia-mid': 1.05,
        'mid-long': 1.15,   'long-mid': 1.15,
        'asia-long': 1.05,  'long-asia': 1.05
      };
      base *= (multipliers[groupPair] || 1.1);
    }
  }

  return Math.max(12000, Math.round(base / 100) * 100);
}

function getSearchFlightPrice(toCity, fallbackPrice, fromCityName, airlineIndex = 0) {
  const routeBase = getRouteFlightPrice(toCity, fallbackPrice, fromCityName);
  if (routeBase === 0) return 0;
  const multipliers = [1, 0.78, 1.28, 0.86, 0.82];
  return Math.round(routeBase * (multipliers[airlineIndex] || 1) / 100) * 100;
}

function getHotelPriceForCity(cityName, hotelIndex = 0, fallbackPrice = 40000) {
  const overridePrices = HOTEL_PRICE_OVERRIDES[cityName];
  if (overridePrices && overridePrices[hotelIndex] !== undefined) return overridePrices[hotelIndex];
  const prices = HOTEL_PRICE_BY_CITY[cityName];
  if (prices && prices[hotelIndex] !== undefined) return prices[hotelIndex];
  return Number(fallbackPrice || 40000);
}

let userCity = JSON.parse(localStorage.getItem('travelplan_city') || 'null') || CITY_OPTIONS[0];

function getUserCity() { return userCity; }

function setUserCity(cityObj) {
  userCity = cityObj;
  localStorage.setItem('travelplan_city', JSON.stringify(cityObj));
  updateCityUI();
  // Автозаполнение поля "Откуда" на странице билетов
  const flightFrom = document.getElementById('flight-from');
  if (flightFrom) flightFrom.value = cityObj.name;
  if (typeof renderTop3Destinations === 'function') renderTop3Destinations();
  if (typeof initFeed === 'function') initFeed();
}


function updateCityUI() {
  const btn = document.getElementById('city-selector-btn');
  if (btn) btn.textContent = `📍 ${userCity.name}`;
}

function openCitySelector() {
  const modal = document.getElementById('city-selector-modal');
  if (modal) { modal.style.display = 'flex'; modal.classList.remove('hidden'); }
}

function closeCitySelector() {
  const modal = document.getElementById('city-selector-modal');
  if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
}

function initCitySelector() {
  updateCityUI();
  // Автозаполнение "Откуда" при загрузке
  const flightFrom = document.getElementById('flight-from');
  if (flightFrom && !flightFrom.value) flightFrom.value = userCity.name;
}


async function getImageDataFromFileInput(inputId) {
  const input = document.getElementById(inputId);
  const file = input?.files?.[0];
  if (!file) return null;
  if (!file.type.startsWith('image/')) throw new Error('Можно прикреплять только изображения');
  if (file.size > 900 * 1024) throw new Error('Картинка слишком большая. Лучше до 900 КБ, база не резиновая, увы.');
  return await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Не удалось прочитать картинку'));
    reader.readAsDataURL(file);
  });
}

async function getReviewImageValue(fileInputId, urlInputId) {
  const url = (document.getElementById(urlInputId)?.value || '').trim();
  if (url) return url;
  return await getImageDataFromFileInput(fileInputId);
}

function renderReviewImage(imageUrl) {
  return imageUrl ? `<img src="${imageUrl}" alt="Фото к отзыву" class="mt-3 w-full max-h-72 object-cover rounded-xl border border-white/10">` : '';
}




// === TravelPlan image helpers ===
// Здесь управляются ВСЕ картинки сайта.
// Важно: раньше часть путей лежала в отдельном place_image_overrides.js,
// из-за этого получалось дублирование. Теперь источник один - TP_IMAGE_OVERRIDES.
// Хочешь заменить фото города/отеля/места - меняешь путь здесь и кладешь файл в assets/images/...
const TP_IMAGE_OVERRIDES = {
  // Города: ключ = русское название города, значение = путь к файлу.
  cities: {
    'Алматы': 'assets/images/cities/almaty.jpg',
    'Астана': 'assets/images/cities/astana.jpg',
    'Шымкент': 'assets/images/cities/shymkent.jpg',
    'Актау': 'assets/images/cities/aktau.jpg',
    'Туркестан': 'assets/images/cities/turkistan.jpg',
    'Бурабай': 'assets/images/cities/burabay.jpg',
    'Москва': 'assets/images/cities/moscow.jpg',
    'Санкт-Петербург': 'assets/images/cities/sankt-peterburg.jpg',
    'Сочи': 'assets/images/cities/sochi.jpg',
    'Казань': 'assets/images/cities/kazan.jpg',
    'Калининград': 'assets/images/cities/kaliningrad.jpg',
    'Ларнака': 'assets/images/cities/larnaca.jpg',
    'Пафос': 'assets/images/cities/paphos.jpg',
    'Лимассол': 'assets/images/cities/limassol.jpg',
    'Никосия': 'assets/images/cities/nicosia.jpg',
    'Айя-Напа': 'assets/images/cities/ayya-napa.jpg',
    'Стамбул': 'assets/images/cities/istanbul.jpg',
    'Анталья': 'assets/images/cities/antalya.jpg',
    'Каппадокия': 'assets/images/cities/cappadocia.jpg',
    'Измир': 'assets/images/cities/izmir.jpg',
    'Дубай': 'assets/images/cities/dubai.jpg',
    'Абу-Даби': 'assets/images/cities/abu-dhabi.jpg',
    'Шарджа': 'assets/images/cities/sharjah.jpg',
    'Тбилиси': 'assets/images/cities/tbilisi.jpg',
    'Батуми': 'assets/images/cities/batumi.jpg',
    'Кутаиси': 'assets/images/cities/kutaisi.jpg',
    'Прага': 'assets/images/cities/prague.jpg',
    'Карловы Вары': 'assets/images/cities/karlovy-vary.jpg',
    'Брно': 'assets/images/cities/brno.jpg',
    'Барселона': 'assets/images/cities/barcelona.jpg',
    'Мадрид': 'assets/images/cities/madrid.jpg',
    'Валенсия': 'assets/images/cities/valencia.jpg',
    'Севилья': 'assets/images/cities/seville.jpg',
    'Майорка': 'assets/images/cities/mallorca.jpg',
    'Рим': 'assets/images/cities/rome.jpg',
    'Милан': 'assets/images/cities/milan.jpg',
    'Венеция': 'assets/images/cities/venice.jpg',
    'Флоренция': 'assets/images/cities/florence.jpg',
    'Неаполь': 'assets/images/cities/naples.jpg',
    'Париж': 'assets/images/cities/paris.jpg',
    'Ницца': 'assets/images/cities/nice.jpg',
    'Лион': 'assets/images/cities/lyon.jpg',
    'Марсель': 'assets/images/cities/marseille.jpg',
    'Бангкок': 'assets/images/cities/bangkok.jpg',
    'Пхукет': 'assets/images/cities/phuket.jpg',
    'Паттайя': 'assets/images/cities/pattaya.jpg',
    'Чиангмай': 'assets/images/cities/chiang-mai.jpg',
    'Самуи': 'assets/images/cities/samui.jpg',
    'Токио': 'assets/images/cities/tokyo.jpg',
    'Киото': 'assets/images/cities/kyoto.jpg',
    'Осака': 'assets/images/cities/osaka.jpg',
    'Саппоро': 'assets/images/cities/sapporo.jpg',
    'Сеул': 'assets/images/cities/seoul.jpg',
    'Пусан': 'assets/images/cities/busan.jpg',
    'Чеджу': 'assets/images/cities/jeju.jpg',
    'Пекин': 'assets/images/cities/beijing.jpg',
    'Шанхай': 'assets/images/cities/shanghai.jpg',
    'Гуанчжоу': 'assets/images/cities/guangzhou.jpg',
    'Гонконг': 'assets/images/cities/hong-kong.jpg',
    'Нью-Йорк': 'assets/images/cities/new-york.jpg',
    'Лос-Анджелес': 'assets/images/cities/los-angeles.jpg',
    'Майами': 'assets/images/cities/miami.jpg',
    'Лас-Вегас': 'assets/images/cities/las-vegas.jpg',
    'Сан-Франциско': 'assets/images/cities/san-francisco.jpg',
    'Лондон': 'assets/images/cities/london.jpg',
    'Эдинбург': 'assets/images/cities/edinburgh.jpg',
    'Манчестер': 'assets/images/cities/manchester.jpg',
    'Берлин': 'assets/images/cities/berlin.jpg',
    'Мюнхен': 'assets/images/cities/munich.jpg',
    'Гамбург': 'assets/images/cities/hamburg.jpg',
    'Афины': 'assets/images/cities/athens.jpg',
    'Санторини': 'assets/images/cities/santorini.jpg',
    'Крит': 'assets/images/cities/crete.jpg',
    'Салоники': 'assets/images/cities/thessaloniki.jpg',
    'Каир': 'assets/images/cities/cairo.jpg',
    'Шарм-эль-Шейх': 'assets/images/cities/sharm-el-sheikh.jpg',
    'Хургада': 'assets/images/cities/hurghada.jpg',
    'Александрия': 'assets/images/cities/alexandria.jpg',
    'Ташкент': 'assets/images/cities/tashkent.jpg',
    'Самарканд': 'assets/images/cities/samarkand.jpg',
    'Бухара': 'assets/images/cities/bukhara.jpg'
  },

  // Отели: ключ = точное название отеля из ленты/поиска.
  // Здесь перечислены все отели проекта, чтобы можно было Ctrl+F по названию.
  hotels: {
    'InterContinental Almaty': 'assets/images/hotels/intercontinental-almaty.jpg',
    'The Ritz-Carlton Almaty': 'assets/images/hotels/the-ritz-carlton-almaty.jpg',
    'Kazakhstan Hotel': 'assets/images/hotels/kazakhstan-hotel.jpg',
    'The Ritz-Carlton Astana': 'assets/images/hotels/the-ritz-carlton-astana.jpg',
    'Rixos President Astana': 'assets/images/hotels/rixos-president-astana.jpg',
    'Hilton Astana': 'assets/images/hotels/hilton-astana.jpg',
    'Rixos Khadisha Shymkent': 'assets/images/hotels/rixos-khadisha-shymkent.jpg',
    'Ramada by Wyndham Shymkent': 'assets/images/hotels/ramada-by-wyndham-shymkent.jpg',
    'Renaissance by Sulo': 'assets/images/hotels/renaissance-by-sulo.jpg',
    'Holiday Inn Aktau': 'assets/images/hotels/holiday-inn-aktau.jpg',
    'Hampton by Hilton Turkistan': 'assets/images/hotels/hampton-by-hilton-turkistan.jpg',
    'Karavansaray Turkistan Hotel': 'assets/images/hotels/karavansaray-turkistan-hotel.jpg',
    'Rixos Borovoe': 'assets/images/hotels/rixos-borovoe.jpg',
    'Wyndham Garden Burabay': 'assets/images/hotels/wyndham-garden-burabay.jpg',
    'The Carlton Moscow': 'assets/images/hotels/the-carlton-moscow.jpg',
    'Ararat Park Hyatt Moscow': 'assets/images/hotels/ararat-park-hyatt-moscow.jpg',
    'Hotel Metropol Moscow': 'assets/images/hotels/hotel-metropol-moscow.jpg',
    'Grand Hotel Europe': 'assets/images/hotels/grand-hotel-europe.jpg',
    'Astoria Hotel St Petersburg': 'assets/images/hotels/astoria-hotel-st-petersburg.jpg',
    'Corinthia St Petersburg': 'assets/images/hotels/corinthia-st-petersburg.jpg',
    'Hyatt Regency Sochi': 'assets/images/hotels/hyatt-regency-sochi.jpg',
    'Swissotel Resort Sochi Kamelia': 'assets/images/hotels/swissotel-resort-sochi-kamelia.jpg',
    'Radisson Collection Paradise Resort': 'assets/images/hotels/radisson-collection-paradise-resort.jpg',
    'Kazan Palace by Tasigo': 'assets/images/hotels/kazan-palace-by-tasigo.jpg',
    'Mirage Hotel Kazan': 'assets/images/hotels/mirage-hotel-kazan.jpg',
    'Crystal House Suite Hotel and Spa': 'assets/images/hotels/crystal-house-suite-hotel-and-spa.jpg',
    'Radisson Blu Hotel Kaliningrad': 'assets/images/hotels/radisson-blu-hotel-kaliningrad.jpg',
    'Radisson Blu Hotel Larnaca': 'assets/images/hotels/radisson-blu-hotel-larnaca.jpg',
    'Sun Hall Hotel': 'assets/images/hotels/sun-hall-hotel.jpg',
    'The Ciao Stelio Deluxe Hotel': 'assets/images/hotels/the-ciao-stelio-deluxe-hotel.jpg',
    'Elysium Hotel Paphos': 'assets/images/hotels/elysium-hotel-paphos.jpg',
    'Annabelle Paphos': 'assets/images/hotels/annabelle-paphos.jpg',
    'Almyra Hotel Paphos': 'assets/images/hotels/almyra-hotel-paphos.jpg',
    'Amara Limassol': 'assets/images/hotels/amara-limassol.jpg',
    'Four Seasons Hotel Limassol': 'assets/images/hotels/four-seasons-hotel-limassol.jpg',
    'St Raphael Resort': 'assets/images/hotels/st-raphael-resort.jpg',
    'Hilton Nicosia': 'assets/images/hotels/hilton-nicosia.jpg',
    'The Landmark Nicosia': 'assets/images/hotels/the-landmark-nicosia.jpg',
    'MAP Boutique Hotel': 'assets/images/hotels/map-boutique-hotel.jpg',
    'Adams Beach Hotel': 'assets/images/hotels/adams-beach-hotel.jpg',
    'Nissi Beach Resort': 'assets/images/hotels/nissi-beach-resort.jpg',
    'Napa Mermaid Hotel and Suites': 'assets/images/hotels/napa-mermaid-hotel-and-suites.jpg',
    'Four Seasons Hotel Istanbul at Sultanahmet': 'assets/images/hotels/four-seasons-hotel-istanbul-at-sultanahmet.jpg',
    'Ciragan Palace Kempinski': 'assets/images/hotels/ciragan-palace-kempinski.jpg',
    'Pera Palace Hotel': 'assets/images/hotels/pera-palace-hotel.jpg',
    'Akra Antalya': 'assets/images/hotels/akra-antalya.jpg',
    'Regnum Carya': 'assets/images/hotels/regnum-carya.jpg',
    'Rixos Downtown Antalya': 'assets/images/hotels/rixos-downtown-antalya.jpg',
    'Museum Hotel Cappadocia': 'assets/images/hotels/museum-hotel-cappadocia.jpg',
    'Argos in Cappadocia': 'assets/images/hotels/argos-in-cappadocia.jpg',
    'Sultan Cave Suites': 'assets/images/hotels/sultan-cave-suites.jpg',
    'Swissotel Buyuk Efes Izmir': 'assets/images/hotels/swissotel-buyuk-efes-izmir.jpg',
    'Key Hotel Izmir': 'assets/images/hotels/key-hotel-izmir.jpg',
    'Renaissance Izmir Hotel': 'assets/images/hotels/renaissance-izmir-hotel.jpg',
    'Burj Al Arab': 'assets/images/hotels/burj-al-arab.jpg',
    'Atlantis The Palm': 'assets/images/hotels/atlantis-the-palm.jpg',
    'Jumeirah Beach Hotel': 'assets/images/hotels/jumeirah-beach-hotel.jpg',
    'Emirates Palace Mandarin Oriental': 'assets/images/hotels/emirates-palace-mandarin-oriental.jpg',
    'The St. Regis Abu Dhabi': 'assets/images/hotels/the-st-regis-abu-dhabi.jpg',
    'Conrad Abu Dhabi Etihad Towers': 'assets/images/hotels/conrad-abu-dhabi-etihad-towers.jpg',
    'Sheraton Sharjah Beach Resort and Spa': 'assets/images/hotels/sheraton-sharjah-beach-resort-and-spa.jpg',
    'The Chedi Al Bait Sharjah': 'assets/images/hotels/the-chedi-al-bait-sharjah.jpg',
    'Rooms Hotel Tbilisi': 'assets/images/hotels/rooms-hotel-tbilisi.jpg',
    'Stamba Hotel': 'assets/images/hotels/stamba-hotel.jpg',
    'Radisson Blu Iveria Hotel': 'assets/images/hotels/radisson-blu-iveria-hotel.jpg',
    'Radisson Blu Hotel Batumi': 'assets/images/hotels/radisson-blu-hotel-batumi.jpg',
    'Sheraton Batumi Hotel': 'assets/images/hotels/sheraton-batumi-hotel.jpg',
    'Hilton Batumi': 'assets/images/hotels/hilton-batumi.jpg',
    'Newport Hotel Kutaisi': 'assets/images/hotels/newport-hotel-kutaisi.jpg',
    'Best Western Kutaisi': 'assets/images/hotels/best-western-kutaisi.jpg',
    'Mosaic House Design Hotel': 'assets/images/hotels/mosaic-house-design-hotel.jpg',
    'Hotel Kings Court Prague': 'assets/images/hotels/hotel-kings-court-prague.jpg',
    'Grand Hotel Bohemia': 'assets/images/hotels/grand-hotel-bohemia.jpg',
    'Grandhotel Pupp': 'assets/images/hotels/grandhotel-pupp.jpg',
    'Hotel Thermal Karlovy Vary': 'assets/images/hotels/hotel-thermal-karlovy-vary.jpg',
    'Savoy Westend Hotel': 'assets/images/hotels/savoy-westend-hotel.jpg',
    'Barcelo Brno Palace': 'assets/images/hotels/barcelo-brno-palace.jpg',
    'Grandezza Hotel Luxury Palace': 'assets/images/hotels/grandezza-hotel-luxury-palace.jpg',
    'Hotel Arts Barcelona': 'assets/images/hotels/hotel-arts-barcelona.jpg',
    'Casa Gracia Barcelona': 'assets/images/hotels/casa-gracia-barcelona.jpg',
    'H10 Madison Barcelona': 'assets/images/hotels/h10-madison-barcelona.jpg',
    'Hotel Riu Plaza Espana': 'assets/images/hotels/hotel-riu-plaza-espana.jpg',
    'Only YOU Boutique Hotel Madrid': 'assets/images/hotels/only-you-boutique-hotel-madrid.jpg',
    'The Principal Madrid': 'assets/images/hotels/the-principal-madrid.jpg',
    'SH Valencia Palace': 'assets/images/hotels/sh-valencia-palace.jpg',
    'Only YOU Hotel Valencia': 'assets/images/hotels/only-you-hotel-valencia.jpg',
    'Hotel Alfonso XIII': 'assets/images/hotels/hotel-alfonso-xiii.jpg',
    'Eurostars Torre Sevilla': 'assets/images/hotels/eurostars-torre-sevilla.jpg',
    'Nixe Palace Hotel': 'assets/images/hotels/nixe-palace-hotel.jpg',
    'Hotel Saratoga Palma': 'assets/images/hotels/hotel-saratoga-palma.jpg',
    'Hotel Hassler Roma': 'assets/images/hotels/hotel-hassler-roma.jpg',
    'The Hoxton Rome': 'assets/images/hotels/the-hoxton-rome.jpg',
    'Hotel Artemide': 'assets/images/hotels/hotel-artemide.jpg',
    'Excelsior Hotel Gallia': 'assets/images/hotels/excelsior-hotel-gallia.jpg',
    'Room Mate Giulia': 'assets/images/hotels/room-mate-giulia.jpg',
    'NYX Hotel Milan': 'assets/images/hotels/nyx-hotel-milan.jpg',
    'Belmond Hotel Cipriani': 'assets/images/hotels/belmond-hotel-cipriani.jpg',
    'Hotel Danieli Venice': 'assets/images/hotels/hotel-danieli-venice.jpg',
    'Bauer Palazzo': 'assets/images/hotels/bauer-palazzo.jpg',
    'Hotel Brunelleschi Florence': 'assets/images/hotels/hotel-brunelleschi-florence.jpg',
    'Portrait Firenze': 'assets/images/hotels/portrait-firenze.jpg',
    'Grand Hotel Vesuvio': 'assets/images/hotels/grand-hotel-vesuvio.jpg',
    'UNAHOTELS Napoli': 'assets/images/hotels/unahotels-napoli.jpg',
    'Le Meurice Paris': 'assets/images/hotels/le-meurice-paris.jpg',
    'Hotel Lutetia Paris': 'assets/images/hotels/hotel-lutetia-paris.jpg',
    'CitizenM Paris Gare de Lyon': 'assets/images/hotels/citizenm-paris-gare-de-lyon.jpg',
    'Hotel Negresco': 'assets/images/hotels/hotel-negresco.jpg',
    'Hyatt Regency Nice Palais de la Mediterranee': 'assets/images/hotels/hyatt-regency-nice-palais-de-la-mediterranee.jpg',
    'InterContinental Lyon Hotel Dieu': 'assets/images/hotels/intercontinental-lyon-hotel-dieu.jpg',
    'Cour des Loges Lyon': 'assets/images/hotels/cour-des-loges-lyon.jpg',
    'InterContinental Marseille Hotel Dieu': 'assets/images/hotels/intercontinental-marseille-hotel-dieu.jpg',
    'Sofitel Marseille Vieux Port': 'assets/images/hotels/sofitel-marseille-vieux-port.jpg',
    'Mandarin Oriental Bangkok': 'assets/images/hotels/mandarin-oriental-bangkok.jpg',
    'The Standard Bangkok Mahanakhon': 'assets/images/hotels/the-standard-bangkok-mahanakhon.jpg',
    'Eastin Grand Hotel Sathorn': 'assets/images/hotels/eastin-grand-hotel-sathorn.jpg',
    'Amanpuri Resort': 'assets/images/hotels/amanpuri-resort.jpg',
    'The Slate Phuket': 'assets/images/hotels/the-slate-phuket.jpg',
    'Katathani Phuket Beach Resort': 'assets/images/hotels/katathani-phuket-beach-resort.jpg',
    'Hilton Pattaya': 'assets/images/hotels/hilton-pattaya.jpg',
    'InterContinental Pattaya Resort': 'assets/images/hotels/intercontinental-pattaya-resort.jpg',
    'Anantara Chiang Mai Resort': 'assets/images/hotels/anantara-chiang-mai-resort.jpg',
    'U Nimman Chiang Mai': 'assets/images/hotels/u-nimman-chiang-mai.jpg',
    'Four Seasons Resort Koh Samui': 'assets/images/hotels/four-seasons-resort-koh-samui.jpg',
    'Banyan Tree Samui': 'assets/images/hotels/banyan-tree-samui.jpg',
    'The Peninsula Tokyo': 'assets/images/hotels/the-peninsula-tokyo.jpg',
    'Park Hotel Tokyo': 'assets/images/hotels/park-hotel-tokyo.jpg',
    'Hotel Metropolitan Tokyo Marunouchi': 'assets/images/hotels/hotel-metropolitan-tokyo-marunouchi.jpg',
    'The Thousand Kyoto': 'assets/images/hotels/the-thousand-kyoto.jpg',
    'Hotel Granvia Kyoto': 'assets/images/hotels/hotel-granvia-kyoto.jpg',
    'InterContinental Osaka': 'assets/images/hotels/intercontinental-osaka.jpg',
    'Cross Hotel Osaka': 'assets/images/hotels/cross-hotel-osaka.jpg',
    'Hotel Monterey Grasmere Osaka': 'assets/images/hotels/hotel-monterey-grasmere-osaka.jpg',
    'JR Tower Hotel Nikko Sapporo': 'assets/images/hotels/jr-tower-hotel-nikko-sapporo.jpg',
    'Sapporo Grand Hotel': 'assets/images/hotels/sapporo-grand-hotel.jpg',
    'L7 Hongdae Seoul': 'assets/images/hotels/l7-hongdae-seoul.jpg',
    'Signiel Seoul': 'assets/images/hotels/signiel-seoul.jpg',
    'Four Points by Sheraton Josun Seoul Station': 'assets/images/hotels/four-points-by-sheraton-josun-seoul-station.jpg',
    'Paradise Hotel Busan': 'assets/images/hotels/paradise-hotel-busan.jpg',
    'Lotte Hotel Busan': 'assets/images/hotels/lotte-hotel-busan.jpg',
    'Grand Hyatt Jeju': 'assets/images/hotels/grand-hyatt-jeju.jpg',
    'The Shilla Jeju': 'assets/images/hotels/the-shilla-jeju.jpg',
    'The Peninsula Beijing': 'assets/images/hotels/the-peninsula-beijing.jpg',
    'Park Plaza Beijing Wangfujing': 'assets/images/hotels/park-plaza-beijing-wangfujing.jpg',
    'Fairmont Peace Hotel': 'assets/images/hotels/fairmont-peace-hotel.jpg',
    'The Langham Shanghai Xintiandi': 'assets/images/hotels/the-langham-shanghai-xintiandi.jpg',
    'LN Garden Hotel Guangzhou': 'assets/images/hotels/ln-garden-hotel-guangzhou.jpg',
    'White Swan Hotel Guangzhou': 'assets/images/hotels/white-swan-hotel-guangzhou.jpg',
    'The Peninsula Hong Kong': 'assets/images/hotels/the-peninsula-hong-kong.jpg',
    'Cordis Hong Kong': 'assets/images/hotels/cordis-hong-kong.jpg',
    'Eaton HK': 'assets/images/hotels/eaton-hk.jpg',
    'The Plaza Hotel New York': 'assets/images/hotels/the-plaza-hotel-new-york.jpg',
    'CitizenM New York Bowery': 'assets/images/hotels/citizenm-new-york-bowery.jpg',
    'Pod Times Square': 'assets/images/hotels/pod-times-square.jpg',
    'The Hollywood Roosevelt': 'assets/images/hotels/the-hollywood-roosevelt.jpg',
    'Freehand Los Angeles': 'assets/images/hotels/freehand-los-angeles.jpg',
    'Hotel Figueroa': 'assets/images/hotels/hotel-figueroa.jpg',
    'Faena Hotel Miami Beach': 'assets/images/hotels/faena-hotel-miami-beach.jpg',
    'The Palms Hotel and Spa': 'assets/images/hotels/the-palms-hotel-and-spa.jpg',
    'Bellagio Las Vegas': 'assets/images/hotels/bellagio-las-vegas.jpg',
    'The Venetian Resort Las Vegas': 'assets/images/hotels/the-venetian-resort-las-vegas.jpg',
    'Fairmont San Francisco': 'assets/images/hotels/fairmont-san-francisco.jpg',
    'Hotel Nikko San Francisco': 'assets/images/hotels/hotel-nikko-san-francisco.jpg',
    'The Savoy London': 'assets/images/hotels/the-savoy-london.jpg',
    'St. Pancras Renaissance Hotel': 'assets/images/hotels/st-pancras-renaissance-hotel.jpg',
    'Zedwell Piccadilly Circus': 'assets/images/hotels/zedwell-piccadilly-circus.jpg',
    'The Balmoral Edinburgh': 'assets/images/hotels/the-balmoral-edinburgh.jpg',
    'Motel One Edinburgh Royal': 'assets/images/hotels/motel-one-edinburgh-royal.jpg',
    'Kimpton Clocktower Hotel': 'assets/images/hotels/kimpton-clocktower-hotel.jpg',
    'The Midland Manchester': 'assets/images/hotels/the-midland-manchester.jpg',
    'Hotel Adlon Kempinski Berlin': 'assets/images/hotels/hotel-adlon-kempinski-berlin.jpg',
    '25hours Hotel Bikini Berlin': 'assets/images/hotels/25hours-hotel-bikini-berlin.jpg',
    'Motel One Berlin Alexanderplatz': 'assets/images/hotels/motel-one-berlin-alexanderplatz.jpg',
    'Bayerischer Hof Munich': 'assets/images/hotels/bayerischer-hof-munich.jpg',
    'Cortiina Hotel Munich': 'assets/images/hotels/cortiina-hotel-munich.jpg',
    'The Westin Hamburg': 'assets/images/hotels/the-westin-hamburg.jpg',
    'Henri Hotel Hamburg Downtown': 'assets/images/hotels/henri-hotel-hamburg-downtown.jpg',
    'Hotel Grande Bretagne Athens': 'assets/images/hotels/hotel-grande-bretagne-athens.jpg',
    'Coco-Mat Athens BC': 'assets/images/hotels/coco-mat-athens-bc.jpg',
    'Canaves Oia Suites': 'assets/images/hotels/canaves-oia-suites.jpg',
    'Santo Pure Oia Suites and Villas': 'assets/images/hotels/santo-pure-oia-suites-and-villas.jpg',
    'Domes Noruz Chania': 'assets/images/hotels/domes-noruz-chania.jpg',
    'Creta Maris Resort': 'assets/images/hotels/creta-maris-resort.jpg',
    'Electra Palace Thessaloniki': 'assets/images/hotels/electra-palace-thessaloniki.jpg',
    'Makedonia Palace': 'assets/images/hotels/makedonia-palace.jpg',
    'Marriott Mena House Cairo': 'assets/images/hotels/marriott-mena-house-cairo.jpg',
    'Kempinski Nile Hotel Cairo': 'assets/images/hotels/kempinski-nile-hotel-cairo.jpg',
    'Rixos Premium Seagate': 'assets/images/hotels/rixos-premium-seagate.jpg',
    'Savoy Sharm El Sheikh': 'assets/images/hotels/savoy-sharm-el-sheikh.jpg',
    'Steigenberger Aldau Beach Hotel': 'assets/images/hotels/steigenberger-aldau-beach-hotel.jpg',
    'Jaz Aquaviva': 'assets/images/hotels/jaz-aquaviva.jpg',
    'Four Seasons Hotel Alexandria': 'assets/images/hotels/four-seasons-hotel-alexandria.jpg',
    'Steigenberger Cecil Hotel Alexandria': 'assets/images/hotels/steigenberger-cecil-hotel-alexandria.jpg',
    'Hyatt Regency Tashkent': 'assets/images/hotels/hyatt-regency-tashkent.jpg',
    'Hilton Tashkent City': 'assets/images/hotels/hilton-tashkent-city.jpg',
    'Lotte City Hotel Tashkent Palace': 'assets/images/hotels/lotte-city-hotel-tashkent-palace.jpg',
    'Hilton Samarkand Regency': 'assets/images/hotels/hilton-samarkand-regency.jpg',
    'Movenpick Samarkand': 'assets/images/hotels/movenpick-samarkand.jpg',
    'Mercure Bukhara Old Town': 'assets/images/hotels/mercure-bukhara-old-town.jpg',
    'Amelia Boutique Hotel Bukhara': 'assets/images/hotels/amelia-boutique-hotel-bukhara.jpg'
  },

  // Интересные места: ключ = 'Город|Название места'.
  // Здесь перечислены все достопримечательности и красивые места проекта.
  places: {
    'Алматы|Парк имени 28 гвардейцев-панфиловцев': 'assets/images/places/almaty-park-imeni-28-gvardeycev-panfilovcev.jpg',
    'Алматы|Вознесенский кафедральный собор': 'assets/images/places/almaty-voznesenskiy-kafedralnyy-sobor.jpg',
    'Алматы|Центральный государственный музей Казахстана': 'assets/images/places/almaty-centralnyy-gosudarstvennyy-muzey-kazahstana.jpg',
    'Алматы|Кок-Тобе': 'assets/images/places/almaty-kok-tobe.jpg',
    'Алматы|Большое Алматинское озеро': 'assets/images/places/almaty-bolshoe-almatinskoe-ozero.jpg',
    'Алматы|Чарынский каньон': 'assets/images/places/almaty-charynskiy-kanon.jpg',
    'Астана|Байтерек': 'assets/images/places/astana-bayterek.jpg',
    'Астана|Мечеть Хазрет Султан': 'assets/images/places/astana-mechet-hazret-sultan.jpg',
    'Астана|Национальный музей Республики Казахстан': 'assets/images/places/astana-nacionalnyy-muzey-respubliki-kazahstan.jpg',
    'Астана|Набережная реки Есиль': 'assets/images/places/astana-naberezhnaya-reki-esil.jpg',
    'Астана|Ботанический сад Астаны': 'assets/images/places/astana-botanicheskiy-sad-astany.jpg',
    'Астана|Парк Жетысу': 'assets/images/places/astana-park-zhetysu.jpg',
    'Шымкент|Цитадель Шымкента': 'assets/images/places/shymkent-citadel-shymkenta.jpg',
    'Шымкент|Парк Абая': 'assets/images/places/shymkent-park-abaya.jpg',
    'Шымкент|Этнопарк Кен-Баба': 'assets/images/places/shymkent-etnopark-ken-baba.jpg',
    'Шымкент|Сайрам-Угамский национальный парк': 'assets/images/places/shymkent-sayram-ugamskiy-nacionalnyy-park.jpg',
    'Шымкент|Аксу-Жабаглы': 'assets/images/places/shymkent-aksu-zhabagly.jpg',
    'Шымкент|Каньон Аксу': 'assets/images/places/shymkent-kanon-aksu.jpg',
    'Актау|Набережная Актау': 'assets/images/places/aktau-naberezhnaya-aktau.jpg',
    'Актау|Подземная мечеть Бекет-Ата': 'assets/images/places/aktau-podzemnaya-mechet-beket-ata.jpg',
    'Актау|Маяк на крыше жилого дома': 'assets/images/places/aktau-mayak-na-kryshe-zhilogo-doma.jpg',
    'Актау|Скальная тропа': 'assets/images/places/aktau-skalnaya-tropa.jpg',
    'Актау|Долина шаров Торыш': 'assets/images/places/aktau-dolina-sharov-torysh.jpg',
    'Актау|Голубая бухта': 'assets/images/places/aktau-golubaya-buhta.jpg',
    'Туркестан|Мавзолей Ходжи Ахмеда Ясави': 'assets/images/places/turkestan-mavzoley-hodzhi-ahmeda-yasavi.jpg',
    'Туркестан|Караван-сарай Turkistan': 'assets/images/places/turkestan-karavan-saray-turkistan.jpg',
    'Туркестан|Мавзолей Рабии Султан Бегим': 'assets/images/places/turkestan-mavzoley-rabii-sultan-begim.jpg',
    'Туркестан|Оазис Караван-сарая вечером': 'assets/images/places/turkestan-oazis-karavan-saraya-vecherom.jpg',
    'Туркестан|Сауран': 'assets/images/places/turkestan-sauran.jpg',
    'Туркестан|Окрестности Отрара': 'assets/images/places/turkestan-okrestnosti-otrara.jpg',
    'Бурабай|Поляна Абылай хана': 'assets/images/places/burabay-polyana-abylay-hana.jpg',
    'Бурабай|Музей природы Бурабая': 'assets/images/places/burabay-muzey-prirody-burabaya.jpg',
    'Бурабай|Кенесары үңгірі': 'assets/images/places/burabay-kenesary-g-r.jpg',
    'Бурабай|Озеро Бурабай': 'assets/images/places/burabay-ozero-burabay.jpg',
    'Бурабай|Скала Жумбактас': 'assets/images/places/burabay-skala-zhumbaktas.jpg',
    'Бурабай|Гора Окжетпес': 'assets/images/places/burabay-gora-okzhetpes.jpg',
    'Москва|Красная площадь': 'assets/images/places/moskva-krasnaya-ploschad.jpg',
    'Москва|Московский Кремль': 'assets/images/places/moskva-moskovskiy-kreml.jpg',
    'Москва|Государственная Третьяковская галерея': 'assets/images/places/moskva-gosudarstvennaya-tretyakovskaya-galereya.jpg',
    'Москва|Парк Зарядье': 'assets/images/places/moskva-park-zaryade.jpg',
    'Москва|Воробьёвы горы': 'assets/images/places/moskva-vorobevy-gory.jpg',
    'Москва|Патриаршие пруды': 'assets/images/places/moskva-patriarshie-prudy.jpg',
    'Санкт-Петербург|Эрмитаж': 'assets/images/places/sankt-peterburg-ermitazh.jpg',
    'Санкт-Петербург|Исаакиевский собор': 'assets/images/places/sankt-peterburg-isaakievskiy-sobor.jpg',
    'Санкт-Петербург|Петропавловская крепость': 'assets/images/places/sankt-peterburg-petropavlovskaya-krepost.jpg',
    'Санкт-Петербург|Дворцовая набережная': 'assets/images/places/sankt-peterburg-dvorcovaya-naberezhnaya.jpg',
    'Санкт-Петербург|Петергофские фонтаны': 'assets/images/places/sankt-peterburg-petergofskie-fontany.jpg',
    'Санкт-Петербург|Елагин остров': 'assets/images/places/sankt-peterburg-elagin-ostrov.jpg',
    'Сочи|Дендрарий Сочи': 'assets/images/places/sochi-dendrariy-sochi.jpg',
    'Сочи|Олимпийский парк': 'assets/images/places/sochi-olimpiyskiy-park.jpg',
    'Сочи|Морской вокзал Сочи': 'assets/images/places/sochi-morskoy-vokzal-sochi.jpg',
    'Сочи|Роза Хутор': 'assets/images/places/sochi-roza-hutor.jpg',
    'Сочи|Агурские водопады': 'assets/images/places/sochi-agurskie-vodopady.jpg',
    'Сочи|Тисо-самшитовая роща': 'assets/images/places/sochi-tiso-samshitovaya-roscha.jpg',
    'Казань|Казанский Кремль': 'assets/images/places/kazan-kazanskiy-kreml.jpg',
    'Казань|Мечеть Кул-Шариф': 'assets/images/places/kazan-mechet-kul-sharif.jpg',
    'Казань|Дворец земледельцев': 'assets/images/places/kazan-dvorec-zemledelcev.jpg',
    'Казань|Кремлёвская набережная': 'assets/images/places/kazan-kremlevskaya-naberezhnaya.jpg',
    'Казань|Озеро Кабан': 'assets/images/places/kazan-ozero-kaban.jpg',
    'Казань|Остров-град Свияжск': 'assets/images/places/kazan-ostrov-grad-sviyazhsk.jpg',
    'Калининград|Кафедральный собор': 'assets/images/places/kaliningrad-kafedralnyy-sobor.jpg',
    'Калининград|Музей янтаря': 'assets/images/places/kaliningrad-muzey-yantarya.jpg',
    'Калининград|Рыбная деревня': 'assets/images/places/kaliningrad-rybnaya-derevnya.jpg',
    'Калининград|Куршская коса': 'assets/images/places/kaliningrad-kurshskaya-kosa.jpg',
    'Калининград|Балтийская коса': 'assets/images/places/kaliningrad-baltiyskaya-kosa.jpg',
    'Калининград|Озеро Верхнее': 'assets/images/places/kaliningrad-ozero-verhnee.jpg',
    'Ларнака|Церковь Святого Лазаря': 'assets/images/places/larnaca-cerkov-svyatogo-lazarya.jpg',
    'Ларнака|Форт Ларнаки': 'assets/images/places/larnaca-fort-larnaki.jpg',
    'Ларнака|Акведук Камарес': 'assets/images/places/larnaca-akveduk-kamares.jpg',
    'Ларнака|Солёное озеро Ларнаки': 'assets/images/places/larnaca-solenoe-ozero-larnaki.jpg',
    'Ларнака|Пляж Финикудес': 'assets/images/places/larnaca-plyazh-finikudes.jpg',
    'Ларнака|Пляж Маккензи': 'assets/images/places/larnaca-plyazh-makkenzi.jpg',
    'Пафос|Археологический парк Пафоса': 'assets/images/places/paphos-arheologicheskiy-park-pafosa.jpg',
    'Пафос|Гробницы королей': 'assets/images/places/paphos-grobnicy-koroley.jpg',
    'Пафос|Замок Пафоса': 'assets/images/places/paphos-zamok-pafosa.jpg',
    'Пафос|Камень Афродиты': 'assets/images/places/paphos-kamen-afrodity.jpg',
    'Пафос|Голубая лагуна Акамаса': 'assets/images/places/paphos-golubaya-laguna-akamasa.jpg',
    'Пафос|Корал Бэй': 'assets/images/places/paphos-koral-bey.jpg',
    'Лимассол|Лимассольский замок': 'assets/images/places/limassol-limassolskiy-zamok.jpg',
    'Лимассол|Марина Лимассола': 'assets/images/places/limassol-marina-limassola.jpg',
    'Лимассол|Древний Курион': 'assets/images/places/limassol-drevniy-kurion.jpg',
    'Лимассол|Пляж Дасуди': 'assets/images/places/limassol-plyazh-dasudi.jpg',
    'Лимассол|Белые скалы Governor’s Beach': 'assets/images/places/limassol-belye-skaly-governor-s-beach.jpg',
    'Лимассол|Набережная Molos': 'assets/images/places/limassol-naberezhnaya-molos.jpg',
    'Никосия|Улица Ледра': 'assets/images/places/nicosia-ulica-ledra.jpg',
    'Никосия|Кипрский музей': 'assets/images/places/nicosia-kiprskiy-muzey.jpg',
    'Никосия|Венецианские стены Никосии': 'assets/images/places/nicosia-venecianskie-steny-nikosii.jpg',
    'Никосия|Старый город Никосии': 'assets/images/places/nicosia-staryy-gorod-nikosii.jpg',
    'Никосия|Парк Аталасса': 'assets/images/places/nicosia-park-atalassa.jpg',
    'Никосия|Пешеходные кварталы Лаики Гитонья': 'assets/images/places/nicosia-peshehodnye-kvartaly-laiki-gitonya.jpg',
    'Айя-Напа|Монастырь Айя-Напы': 'assets/images/places/ayya-napa-monastyr-ayya-napy.jpg',
    'Айя-Напа|Музей моря Thalassa': 'assets/images/places/ayya-napa-muzey-morya-thalassa.jpg',
    'Айя-Напа|Парк скульптур Айя-Напы': 'assets/images/places/ayya-napa-park-skulptur-ayya-napy.jpg',
    'Айя-Напа|Nissi Beach': 'assets/images/places/ayya-napa-nissi-beach.jpg',
    'Айя-Напа|Cape Greco': 'assets/images/places/ayya-napa-cape-greco.jpg',
    'Айя-Напа|Sea Caves': 'assets/images/places/ayya-napa-sea-caves.jpg',
    'Стамбул|Айя-София': 'assets/images/places/istanbul-ayya-sofiya.jpg',
    'Стамбул|Голубая мечеть': 'assets/images/places/istanbul-golubaya-mechet.jpg',
    'Стамбул|Дворец Топкапы': 'assets/images/places/istanbul-dvorec-topkapy.jpg',
    'Стамбул|Босфор на закате': 'assets/images/places/istanbul-bosfor-na-zakate.jpg',
    'Стамбул|Район Балат': 'assets/images/places/istanbul-rayon-balat.jpg',
    'Стамбул|Парк Эмирган': 'assets/images/places/istanbul-park-emirgan.jpg',
    'Анталья|Старый город Калеичи': 'assets/images/places/antalya-staryy-gorod-kaleichi.jpg',
    'Анталья|Ворота Адриана': 'assets/images/places/antalya-vorota-adriana.jpg',
    'Анталья|Музей Антальи': 'assets/images/places/antalya-muzey-antali.jpg',
    'Анталья|Водопады Дюден': 'assets/images/places/antalya-vodopady-dyuden.jpg',
    'Анталья|Пляж Коньяалты': 'assets/images/places/antalya-plyazh-konyaalty.jpg',
    'Анталья|Каньон Кёпрюлю': 'assets/images/places/antalya-kanon-kepryulyu.jpg',
    'Каппадокия|Музей под открытым небом Гёреме': 'assets/images/places/cappadocia-muzey-pod-otkrytym-nebom-gereme.jpg',
    'Каппадокия|Подземный город Деринкую': 'assets/images/places/cappadocia-podzemnyy-gorod-derinkuyu.jpg',
    'Каппадокия|Крепость Учхисар': 'assets/images/places/cappadocia-krepost-uchhisar.jpg',
    'Каппадокия|Долина Любви': 'assets/images/places/cappadocia-dolina-lyubvi.jpg',
    'Каппадокия|Долина Пашабаг': 'assets/images/places/cappadocia-dolina-pashabag.jpg',
    'Каппадокия|Полёт воздушных шаров над Гёреме': 'assets/images/places/cappadocia-polet-vozdushnyh-sharov-nad-gereme.jpg',
    'Измир|Часовая башня Измира': 'assets/images/places/izmir-chasovaya-bashnya-izmira.jpg',
    'Измир|Агора Смирны': 'assets/images/places/izmir-agora-smirny.jpg',
    'Измир|Рынок Кемералты': 'assets/images/places/izmir-rynok-kemeralty.jpg',
    'Измир|Набережная Кордон': 'assets/images/places/izmir-naberezhnaya-kordon.jpg',
    'Измир|Чешме': 'assets/images/places/izmir-cheshme.jpg',
    'Измир|Алачаты': 'assets/images/places/izmir-alachaty.jpg',
    'Дубай|Бурдж-Халифа': 'assets/images/places/dubai-burdzh-halifa.jpg',
    'Дубай|Dubai Mall': 'assets/images/places/dubai-dubai-mall.jpg',
    'Дубай|Музей будущего': 'assets/images/places/dubai-muzey-buduschego.jpg',
    'Дубай|Dubai Marina': 'assets/images/places/dubai-dubai-marina.jpg',
    'Дубай|Пляж JBR': 'assets/images/places/dubai-plyazh-jbr.jpg',
    'Дубай|Пустыня Аль-Мармум': 'assets/images/places/dubai-pustynya-al-marmum.jpg',
    'Абу-Даби|Мечеть шейха Зайда': 'assets/images/places/abu-dhabi-mechet-sheyha-zayda.jpg',
    'Абу-Даби|Лувр Абу-Даби': 'assets/images/places/abu-dhabi-luvr-abu-dabi.jpg',
    'Абу-Даби|Qasr Al Watan': 'assets/images/places/abu-dhabi-qasr-al-watan.jpg',
    'Абу-Даби|Corniche Beach': 'assets/images/places/abu-dhabi-corniche-beach.jpg',
    'Абу-Даби|Остров Саадият': 'assets/images/places/abu-dhabi-ostrov-saadiyat.jpg',
    'Абу-Даби|Мангровый парк Jubail': 'assets/images/places/abu-dhabi-mangrovyy-park-jubail.jpg',
    'Шарджа|Музей исламской цивилизации': 'assets/images/places/sharjah-muzey-islamskoy-civilizacii.jpg',
    'Шарджа|Blue Souk': 'assets/images/places/sharjah-blue-souk.jpg',
    'Шарджа|Sharjah Heritage Area': 'assets/images/places/sharjah-sharjah-heritage-area.jpg',
    'Шарджа|Al Noor Island': 'assets/images/places/sharjah-al-noor-island.jpg',
    'Шарджа|Al Majaz Waterfront': 'assets/images/places/sharjah-al-majaz-waterfront.jpg',
    'Шарджа|Пляж Аль-Хан': 'assets/images/places/sharjah-plyazh-al-han.jpg',
    'Тбилиси|Крепость Нарикала': 'assets/images/places/tbilisi-krepost-narikala.jpg',
    'Тбилиси|Старый Тбилиси': 'assets/images/places/tbilisi-staryy-tbilisi.jpg',
    'Тбилиси|Серные бани Абанотубани': 'assets/images/places/tbilisi-sernye-bani-abanotubani.jpg',
    'Тбилиси|Мтацминда': 'assets/images/places/tbilisi-mtacminda.jpg',
    'Тбилиси|Мост Мира вечером': 'assets/images/places/tbilisi-most-mira-vecherom.jpg',
    'Тбилиси|Черепашье озеро': 'assets/images/places/tbilisi-cherepashe-ozero.jpg',
    'Батуми|Батумский бульвар': 'assets/images/places/batumi-batumskiy-bulvar.jpg',
    'Батуми|Статуя Али и Нино': 'assets/images/places/batumi-statuya-ali-i-nino.jpg',
    'Батуми|Площадь Европы': 'assets/images/places/batumi-ploschad-evropy.jpg',
    'Батуми|Ботанический сад Батуми': 'assets/images/places/batumi-botanicheskiy-sad-batumi.jpg',
    'Батуми|Зелёный мыс': 'assets/images/places/batumi-zelenyy-mys.jpg',
    'Батуми|Водопад Махунцети': 'assets/images/places/batumi-vodopad-mahunceti.jpg',
    'Кутаиси|Храм Баграта': 'assets/images/places/kutaisi-hram-bagrata.jpg',
    'Кутаиси|Гелатский монастырь': 'assets/images/places/kutaisi-gelatskiy-monastyr.jpg',
    'Кутаиси|Белый мост': 'assets/images/places/kutaisi-belyy-most.jpg',
    'Кутаиси|Пещера Прометея': 'assets/images/places/kutaisi-peschera-prometeya.jpg',
    'Кутаиси|Каньон Мартвили': 'assets/images/places/kutaisi-kanon-martvili.jpg',
    'Кутаиси|Заповедник Сатаплия': 'assets/images/places/kutaisi-zapovednik-satapliya.jpg',
    'Прага|Пражский Град': 'assets/images/places/prague-prazhskiy-grad.jpg',
    'Прага|Карлов мост': 'assets/images/places/prague-karlov-most.jpg',
    'Прага|Староместская площадь': 'assets/images/places/prague-staromestskaya-ploschad.jpg',
    'Прага|Петршинский холм': 'assets/images/places/prague-petrshinskiy-holm.jpg',
    'Прага|Набережная Влтавы': 'assets/images/places/prague-naberezhnaya-vltavy.jpg',
    'Прага|Летенские сады': 'assets/images/places/prague-letenskie-sady.jpg',
    'Карловы Вары|Мельничная колоннада': 'assets/images/places/karlovy-vary-melnichnaya-kolonnada.jpg',
    'Карловы Вары|Гейзерная колоннада': 'assets/images/places/karlovy-vary-geyzernaya-kolonnada.jpg',
    'Карловы Вары|Музей Becherovka': 'assets/images/places/karlovy-vary-muzey-becherovka.jpg',
    'Карловы Вары|Смотровая Диана': 'assets/images/places/karlovy-vary-smotrovaya-diana.jpg',
    'Карловы Вары|Река Тепла': 'assets/images/places/karlovy-vary-reka-tepla.jpg',
    'Карловы Вары|Лесные прогулочные тропы': 'assets/images/places/karlovy-vary-lesnye-progulochnye-tropy.jpg',
    'Брно|Замок Шпильберк': 'assets/images/places/brno-zamok-shpilberk.jpg',
    'Брно|Собор Святых Петра и Павла': 'assets/images/places/brno-sobor-svyatyh-petra-i-pavla.jpg',
    'Брно|Вилла Тугендхат': 'assets/images/places/brno-villa-tugendhat.jpg',
    'Брно|Моравский карст': 'assets/images/places/brno-moravskiy-karst.jpg',
    'Брно|Плотина Брно': 'assets/images/places/brno-plotina-brno.jpg',
    'Брно|Парк Лужанки': 'assets/images/places/brno-park-luzhanki.jpg',
    'Барселона|Саграда Фамилия': 'assets/images/places/barcelona-sagrada-familiya.jpg',
    'Барселона|Парк Гуэль': 'assets/images/places/barcelona-park-guel.jpg',
    'Барселона|Дом Бальо': 'assets/images/places/barcelona-dom-balo.jpg',
    'Барселона|Пляж Барселонета': 'assets/images/places/barcelona-plyazh-barseloneta.jpg',
    'Барселона|Гора Монжуик': 'assets/images/places/barcelona-gora-monzhuik.jpg',
    'Барселона|Бункеры Carmel': 'assets/images/places/barcelona-bunkery-carmel.jpg',
    'Мадрид|Музей Прадо': 'assets/images/places/madrid-muzey-prado.jpg',
    'Мадрид|Королевский дворец Мадрида': 'assets/images/places/madrid-korolevskiy-dvorec-madrida.jpg',
    'Мадрид|Площадь Майор': 'assets/images/places/madrid-ploschad-mayor.jpg',
    'Мадрид|Парк Ретиро': 'assets/images/places/madrid-park-retiro.jpg',
    'Мадрид|Храм Дебод на закате': 'assets/images/places/madrid-hram-debod-na-zakate.jpg',
    'Мадрид|Сады Сабатини': 'assets/images/places/madrid-sady-sabatini.jpg',
    'Валенсия|Город искусств и наук': 'assets/images/places/valencia-gorod-iskusstv-i-nauk.jpg',
    'Валенсия|Кафедральный собор Валенсии': 'assets/images/places/valencia-kafedralnyy-sobor-valensii.jpg',
    'Валенсия|Центральный рынок': 'assets/images/places/valencia-centralnyy-rynok.jpg',
    'Валенсия|Парк Турия': 'assets/images/places/valencia-park-turiya.jpg',
    'Валенсия|Пляж Мальварроса': 'assets/images/places/valencia-plyazh-malvarrosa.jpg',
    'Валенсия|Альбуфера': 'assets/images/places/valencia-albufera.jpg',
    'Севилья|Севильский Алькасар': 'assets/images/places/seville-sevilskiy-alkasar.jpg',
    'Севилья|Севильский кафедральный собор': 'assets/images/places/seville-sevilskiy-kafedralnyy-sobor.jpg',
    'Севилья|Площадь Испании': 'assets/images/places/seville-ploschad-ispanii.jpg',
    'Севилья|Район Санта-Крус': 'assets/images/places/seville-rayon-santa-krus.jpg',
    'Севилья|Парк Марии-Луизы': 'assets/images/places/seville-park-marii-luizy.jpg',
    'Севилья|Набережная Гвадалквивира': 'assets/images/places/seville-naberezhnaya-gvadalkvivira.jpg',
    'Майорка|Кафедральный собор Пальмы': 'assets/images/places/mallorca-kafedralnyy-sobor-palmy.jpg',
    'Майорка|Замок Бельвер': 'assets/images/places/mallorca-zamok-belver.jpg',
    'Майорка|Старинный поезд Сольер': 'assets/images/places/mallorca-starinnyy-poezd-soler.jpg',
    'Майорка|Мыс Форментор': 'assets/images/places/mallorca-mys-formentor.jpg',
    'Майорка|Бухта Са Калобра': 'assets/images/places/mallorca-buhta-sa-kalobra.jpg',
    'Майорка|Пляж Эс-Тренк': 'assets/images/places/mallorca-plyazh-es-trenk.jpg',
    'Рим|Колизей': 'assets/images/places/rome-kolizey.jpg',
    'Рим|Римский форум': 'assets/images/places/rome-rimskiy-forum.jpg',
    'Рим|Пантеон': 'assets/images/places/rome-panteon.jpg',
    'Рим|Сад апельсинов': 'assets/images/places/rome-sad-apelsinov.jpg',
    'Рим|Холм Яникул': 'assets/images/places/rome-holm-yanikul.jpg',
    'Рим|Фонтан Треви ночью': 'assets/images/places/rome-fontan-trevi-nochyu.jpg',
    'Милан|Миланский собор': 'assets/images/places/milan-milanskiy-sobor.jpg',
    'Милан|Галерея Виктора Эммануила II': 'assets/images/places/milan-galereya-viktora-emmanuila-ii.jpg',
    'Милан|Театр Ла Скала': 'assets/images/places/milan-teatr-la-skala.jpg',
    'Милан|Каналы Навильи': 'assets/images/places/milan-kanaly-navili.jpg',
    'Милан|Парк Семпионе': 'assets/images/places/milan-park-sempione.jpg',
    'Милан|Озеро Комо рядом': 'assets/images/places/milan-ozero-komo-ryadom.jpg',
    'Венеция|Площадь Сан-Марко': 'assets/images/places/venice-ploschad-san-marko.jpg',
    'Венеция|Дворец дожей': 'assets/images/places/venice-dvorec-dozhey.jpg',
    'Венеция|Мост Риальто': 'assets/images/places/venice-most-rialto.jpg',
    'Венеция|Гранд-канал': 'assets/images/places/venice-grand-kanal.jpg',
    'Венеция|Остров Бурано': 'assets/images/places/venice-ostrov-burano.jpg',
    'Венеция|Лагуна Венеции на рассвете': 'assets/images/places/venice-laguna-venecii-na-rassvete.jpg',
    'Флоренция|Санта-Мария-дель-Фьоре': 'assets/images/places/florence-santa-mariya-del-fore.jpg',
    'Флоренция|Галерея Уффици': 'assets/images/places/florence-galereya-uffici.jpg',
    'Флоренция|Палаццо Веккьо': 'assets/images/places/florence-palacco-vekko.jpg',
    'Флоренция|Площадь Микеланджело': 'assets/images/places/florence-ploschad-mikelandzhelo.jpg',
    'Флоренция|Сады Боболи': 'assets/images/places/florence-sady-boboli.jpg',
    'Флоренция|Мост Понте-Веккьо': 'assets/images/places/florence-most-ponte-vekko.jpg',
    'Неаполь|Национальный археологический музей': 'assets/images/places/naples-nacionalnyy-arheologicheskiy-muzey.jpg',
    'Неаполь|Кастель-дель-Ово': 'assets/images/places/naples-kastel-del-ovo.jpg',
    'Неаполь|Подземный Неаполь': 'assets/images/places/naples-podzemnyy-neapol.jpg',
    'Неаполь|Вид на Везувий': 'assets/images/places/naples-vid-na-vezuviy.jpg',
    'Неаполь|Побережье Амальфи': 'assets/images/places/naples-poberezhe-amalfi.jpg',
    'Неаполь|Остров Капри': 'assets/images/places/naples-ostrov-kapri.jpg',
    'Париж|Эйфелева башня': 'assets/images/places/paris-eyfeleva-bashnya.jpg',
    'Париж|Лувр': 'assets/images/places/paris-luvr.jpg',
    'Париж|Собор Парижской Богоматери': 'assets/images/places/paris-sobor-parizhskoy-bogomateri.jpg',
    'Париж|Монмартр': 'assets/images/places/paris-monmartr.jpg',
    'Париж|Сад Тюильри': 'assets/images/places/paris-sad-tyuilri.jpg',
    'Париж|Набережные Сены': 'assets/images/places/paris-naberezhnye-seny.jpg',
    'Ницца|Английская набережная': 'assets/images/places/nice-angliyskaya-naberezhnaya.jpg',
    'Ницца|Старый город Ниццы': 'assets/images/places/nice-staryy-gorod-niccy.jpg',
    'Ницца|Музей Матисса': 'assets/images/places/nice-muzey-matissa.jpg',
    'Ницца|Замковый холм': 'assets/images/places/nice-zamkovyy-holm.jpg',
    'Ницца|Пляж Castel': 'assets/images/places/nice-plyazh-castel.jpg',
    'Ницца|Вильфранш-сюр-Мер': 'assets/images/places/nice-vilfransh-syur-mer.jpg',
    'Лион|Базилика Нотр-Дам-де-Фурвьер': 'assets/images/places/lyon-bazilika-notr-dam-de-furver.jpg',
    'Лион|Старый Лион': 'assets/images/places/lyon-staryy-lion.jpg',
    'Лион|Площадь Белькур': 'assets/images/places/lyon-ploschad-belkur.jpg',
    'Лион|Холм Фурвьер': 'assets/images/places/lyon-holm-furver.jpg',
    'Лион|Набережные Соны': 'assets/images/places/lyon-naberezhnye-sony.jpg',
    'Лион|Парк Тет д’Ор': 'assets/images/places/lyon-park-tet-d-or.jpg',
    'Марсель|Нотр-Дам-де-ла-Гард': 'assets/images/places/marseille-notr-dam-de-la-gard.jpg',
    'Марсель|Старый порт Марселя': 'assets/images/places/marseille-staryy-port-marselya.jpg',
    'Марсель|Музей MuCEM': 'assets/images/places/marseille-muzey-mucem.jpg',
    'Марсель|Каланки': 'assets/images/places/marseille-kalanki.jpg',
    'Марсель|Остров Иф': 'assets/images/places/marseille-ostrov-if.jpg',
    'Марсель|Пляж Прадо': 'assets/images/places/marseille-plyazh-prado.jpg',
    'Бангкок|Большой дворец': 'assets/images/places/bangkok-bolshoy-dvorec.jpg',
    'Бангкок|Храм Ват Арун': 'assets/images/places/bangkok-hram-vat-arun.jpg',
    'Бангкок|Храм Ват Пхо': 'assets/images/places/bangkok-hram-vat-pho.jpg',
    'Бангкок|Парк Люмпини': 'assets/images/places/bangkok-park-lyumpini.jpg',
    'Бангкок|Река Чао Прайя ночью': 'assets/images/places/bangkok-reka-chao-prayya-nochyu.jpg',
    'Бангкок|Рынок цветов Пак Клонг Талат': 'assets/images/places/bangkok-rynok-cvetov-pak-klong-talat.jpg',
    'Пхукет|Большой Будда Пхукета': 'assets/images/places/phuket-bolshoy-budda-phuketa.jpg',
    'Пхукет|Старый город Пхукета': 'assets/images/places/phuket-staryy-gorod-phuketa.jpg',
    'Пхукет|Храм Ват Чалонг': 'assets/images/places/phuket-hram-vat-chalong.jpg',
    'Пхукет|Пляж Най Харн': 'assets/images/places/phuket-plyazh-nay-harn.jpg',
    'Пхукет|Острова Пхи-Пхи': 'assets/images/places/phuket-ostrova-phi-phi.jpg',
    'Пхукет|Смотровая площадка Карон': 'assets/images/places/phuket-smotrovaya-ploschadka-karon.jpg',
    'Паттайя|Храм Истины': 'assets/images/places/pattaya-hram-istiny.jpg',
    'Паттайя|Nong Nooch Tropical Garden': 'assets/images/places/pattaya-nong-nooch-tropical-garden.jpg',
    'Паттайя|Большой Будда': 'assets/images/places/pattaya-bolshoy-budda.jpg',
    'Паттайя|Остров Ко Лан': 'assets/images/places/pattaya-ostrov-ko-lan.jpg',
    'Паттайя|Пляж Джомтьен': 'assets/images/places/pattaya-plyazh-dzhomten.jpg',
    'Паттайя|Смотровая Pattaya Viewpoint': 'assets/images/places/pattaya-smotrovaya-pattaya-viewpoint.jpg',
    'Чиангмай|Ват Пхра Тхат Дой Сутхеп': 'assets/images/places/chiang-mai-vat-phra-that-doy-suthep.jpg',
    'Чиангмай|Старый город Чиангмая': 'assets/images/places/chiang-mai-staryy-gorod-chiangmaya.jpg',
    'Чиангмай|Ват Чеди Луанг': 'assets/images/places/chiang-mai-vat-chedi-luang.jpg',
    'Чиангмай|Национальный парк Дой Интханон': 'assets/images/places/chiang-mai-nacionalnyy-park-doy-inthanon.jpg',
    'Чиангмай|Sticky Waterfalls': 'assets/images/places/chiang-mai-sticky-waterfalls.jpg',
    'Чиангмай|Рисовые поля Mae Rim': 'assets/images/places/chiang-mai-risovye-polya-mae-rim.jpg',
    'Самуи|Большой Будда Самуи': 'assets/images/places/samui-bolshoy-budda-samui.jpg',
    'Самуи|Wat Plai Laem': 'assets/images/places/samui-wat-plai-laem.jpg',
    'Самуи|Рыбацкая деревня Bophut': 'assets/images/places/samui-rybackaya-derevnya-bophut.jpg',
    'Самуи|Пляж Чавенг': 'assets/images/places/samui-plyazh-chaveng.jpg',
    'Самуи|Водопад На Муанг': 'assets/images/places/samui-vodopad-na-muang.jpg',
    'Самуи|Ang Thong Marine Park': 'assets/images/places/samui-ang-thong-marine-park.jpg',
    'Токио|Храм Сэнсо-дзи': 'assets/images/places/tokyo-hram-senso-dzi.jpg',
    'Токио|Токийская башня': 'assets/images/places/tokyo-tokiyskaya-bashnya.jpg',
    'Токио|Район Сибуя': 'assets/images/places/tokyo-rayon-sibuya.jpg',
    'Токио|Сады Синдзюку-гёэн': 'assets/images/places/tokyo-sady-sindzyuku-geen.jpg',
    'Токио|Река Мэгуро весной': 'assets/images/places/tokyo-reka-meguro-vesnoy.jpg',
    'Токио|Одайба вечером': 'assets/images/places/tokyo-odayba-vecherom.jpg',
    'Киото|Фусими Инари': 'assets/images/places/kyoto-fusimi-inari.jpg',
    'Киото|Кинкаку-дзи': 'assets/images/places/kyoto-kinkaku-dzi.jpg',
    'Киото|Киёмидзу-дэра': 'assets/images/places/kyoto-kiemidzu-dera.jpg',
    'Киото|Бамбуковая роща Арасияма': 'assets/images/places/kyoto-bambukovaya-roscha-arasiyama.jpg',
    'Киото|Философская тропа': 'assets/images/places/kyoto-filosofskaya-tropa.jpg',
    'Киото|Район Гион вечером': 'assets/images/places/kyoto-rayon-gion-vecherom.jpg',
    'Осака|Замок Осаки': 'assets/images/places/osaka-zamok-osaki.jpg',
    'Осака|Dotonbori': 'assets/images/places/osaka-dotonbori.jpg',
    'Осака|Universal Studios Japan': 'assets/images/places/osaka-universal-studios-japan.jpg',
    'Осака|Парк Наканосима': 'assets/images/places/osaka-park-nakanosima.jpg',
    'Осака|Tempozan Harbor Village': 'assets/images/places/osaka-tempozan-harbor-village.jpg',
    'Осака|Ночной Дотонбори': 'assets/images/places/osaka-nochnoy-dotonbori.jpg',
    'Саппоро|Часовая башня Саппоро': 'assets/images/places/sapporo-chasovaya-bashnya-sapporo.jpg',
    'Саппоро|Парк Одори': 'assets/images/places/sapporo-park-odori.jpg',
    'Саппоро|Музей пива Саппоро': 'assets/images/places/sapporo-muzey-piva-sapporo.jpg',
    'Саппоро|Гора Мойва': 'assets/images/places/sapporo-gora-moyva.jpg',
    'Саппоро|Парк Моэрэнума': 'assets/images/places/sapporo-park-moerenuma.jpg',
    'Саппоро|Горячие источники Дзёдзанкэй': 'assets/images/places/sapporo-goryachie-istochniki-dzedzankey.jpg',
    'Сеул|Дворец Кёнбоккун': 'assets/images/places/seoul-dvorec-kenbokkun.jpg',
    'Сеул|Башня N Seoul': 'assets/images/places/seoul-bashnya-n-seoul.jpg',
    'Сеул|Деревня Букчон Ханок': 'assets/images/places/seoul-derevnya-bukchon-hanok.jpg',
    'Сеул|Ручей Чхонгечхон': 'assets/images/places/seoul-ruchey-chhongechhon.jpg',
    'Сеул|Парк Ханган': 'assets/images/places/seoul-park-hangan.jpg',
    'Сеул|Гора Букхансан': 'assets/images/places/seoul-gora-bukhansan.jpg',
    'Пусан|Храм Хэдон Ёнгунса': 'assets/images/places/busan-hram-hedon-engunsa.jpg',
    'Пусан|Gamcheon Culture Village': 'assets/images/places/busan-gamcheon-culture-village.jpg',
    'Пусан|Рынок Jagalchi': 'assets/images/places/busan-rynok-jagalchi.jpg',
    'Пусан|Пляж Хэундэ': 'assets/images/places/busan-plyazh-heunde.jpg',
    'Пусан|Пляж Кваналли ночью': 'assets/images/places/busan-plyazh-kvanalli-nochyu.jpg',
    'Пусан|Остров Тонбэк': 'assets/images/places/busan-ostrov-tonbek.jpg',
    'Чеджу|Seongsan Ilchulbong': 'assets/images/places/jeju-seongsan-ilchulbong.jpg',
    'Чеджу|Музей чая O’sulloc': 'assets/images/places/jeju-muzey-chaya-o-sulloc.jpg',
    'Чеджу|Деревня Seongeup': 'assets/images/places/jeju-derevnya-seongeup.jpg',
    'Чеджу|Водопад Чонбан': 'assets/images/places/jeju-vodopad-chonban.jpg',
    'Чеджу|Пляж Хёпчже': 'assets/images/places/jeju-plyazh-hepchzhe.jpg',
    'Чеджу|Лавовые трубки Manjanggul': 'assets/images/places/jeju-lavovye-trubki-manjanggul.jpg',
    'Пекин|Запретный город': 'assets/images/places/beijing-zapretnyy-gorod.jpg',
    'Пекин|Храм Неба': 'assets/images/places/beijing-hram-neba.jpg',
    'Пекин|Летний дворец': 'assets/images/places/beijing-letniy-dvorec.jpg',
    'Пекин|Великая Китайская стена Бадалин': 'assets/images/places/beijing-velikaya-kitayskaya-stena-badalin.jpg',
    'Пекин|Парк Бэйхай': 'assets/images/places/beijing-park-beyhay.jpg',
    'Пекин|Озеро Хоухай': 'assets/images/places/beijing-ozero-houhay.jpg',
    'Шанхай|Набережная Вайтань': 'assets/images/places/shanghai-naberezhnaya-vaytan.jpg',
    'Шанхай|Сад Юйюань': 'assets/images/places/shanghai-sad-yuyyuan.jpg',
    'Шанхай|Шанхайская башня': 'assets/images/places/shanghai-shanhayskaya-bashnya.jpg',
    'Шанхай|Район Пудун ночью': 'assets/images/places/shanghai-rayon-pudun-nochyu.jpg',
    'Шанхай|Французская концессия': 'assets/images/places/shanghai-francuzskaya-koncessiya.jpg',
    'Шанхай|Парк Century': 'assets/images/places/shanghai-park-century.jpg',
    'Гуанчжоу|Canton Tower': 'assets/images/places/guangzhou-canton-tower.jpg',
    'Гуанчжоу|Храм Шести баньяновых деревьев': 'assets/images/places/guangzhou-hram-shesti-banyanovyh-derevev.jpg',
    'Гуанчжоу|Chen Clan Ancestral Hall': 'assets/images/places/guangzhou-chen-clan-ancestral-hall.jpg',
    'Гуанчжоу|Остров Шамянь': 'assets/images/places/guangzhou-ostrov-shamyan.jpg',
    'Гуанчжоу|Парк Юэсю': 'assets/images/places/guangzhou-park-yuesyu.jpg',
    'Гуанчжоу|Жемчужная река вечером': 'assets/images/places/guangzhou-zhemchuzhnaya-reka-vecherom.jpg',
    'Гонконг|Пик Виктория': 'assets/images/places/hong-kong-pik-viktoriya.jpg',
    'Гонконг|Большой Будда Тяньтань': 'assets/images/places/hong-kong-bolshoy-budda-tyantan.jpg',
    'Гонконг|Аллея звёзд': 'assets/images/places/hong-kong-alleya-zvezd.jpg',
    'Гонконг|Бухта Виктория': 'assets/images/places/hong-kong-buhta-viktoriya.jpg',
    'Гонконг|Dragon’s Back Trail': 'assets/images/places/hong-kong-dragon-s-back-trail.jpg',
    'Гонконг|Пляж Repulse Bay': 'assets/images/places/hong-kong-plyazh-repulse-bay.jpg',
    'Нью-Йорк|Статуя Свободы': 'assets/images/places/new-york-statuya-svobody.jpg',
    'Нью-Йорк|Метрополитен-музей': 'assets/images/places/new-york-metropoliten-muzey.jpg',
    'Нью-Йорк|Таймс-сквер': 'assets/images/places/new-york-tayms-skver.jpg',
    'Нью-Йорк|Центральный парк': 'assets/images/places/new-york-centralnyy-park.jpg',
    'Нью-Йорк|Бруклинский мост': 'assets/images/places/new-york-bruklinskiy-most.jpg',
    'Нью-Йорк|High Line': 'assets/images/places/new-york-high-line.jpg',
    'Лос-Анджелес|Голливудская аллея славы': 'assets/images/places/los-angeles-gollivudskaya-alleya-slavy.jpg',
    'Лос-Анджелес|Griffith Observatory': 'assets/images/places/los-angeles-griffith-observatory.jpg',
    'Лос-Анджелес|Getty Center': 'assets/images/places/los-angeles-getty-center.jpg',
    'Лос-Анджелес|Пляж Санта-Моника': 'assets/images/places/los-angeles-plyazh-santa-monika.jpg',
    'Лос-Анджелес|Runyon Canyon': 'assets/images/places/los-angeles-runyon-canyon.jpg',
    'Лос-Анджелес|Venice Canals': 'assets/images/places/los-angeles-venice-canals.jpg',
    'Майами|Art Deco Historic District': 'assets/images/places/mayami-art-deco-historic-district.jpg',
    'Майами|Vizcaya Museum and Gardens': 'assets/images/places/mayami-vizcaya-museum-and-gardens.jpg',
    'Майами|Little Havana': 'assets/images/places/mayami-little-havana.jpg',
    'Майами|South Beach': 'assets/images/places/mayami-south-beach.jpg',
    'Майами|Key Biscayne': 'assets/images/places/mayami-key-biscayne.jpg',
    'Майами|Wynwood Walls вечером': 'assets/images/places/mayami-wynwood-walls-vecherom.jpg',
    'Лас-Вегас|Las Vegas Strip': 'assets/images/places/las-vegas-las-vegas-strip.jpg',
    'Лас-Вегас|Bellagio Fountains': 'assets/images/places/las-vegas-bellagio-fountains.jpg',
    'Лас-Вегас|Fremont Street Experience': 'assets/images/places/las-vegas-fremont-street-experience.jpg',
    'Лас-Вегас|Red Rock Canyon': 'assets/images/places/las-vegas-red-rock-canyon.jpg',
    'Лас-Вегас|Valley of Fire': 'assets/images/places/las-vegas-valley-of-fire.jpg',
    'Лас-Вегас|Смотровая High Roller': 'assets/images/places/las-vegas-smotrovaya-high-roller.jpg',
    'Сан-Франциско|Golden Gate Bridge': 'assets/images/places/san-francisco-golden-gate-bridge.jpg',
    'Сан-Франциско|Остров Алькатрас': 'assets/images/places/san-francisco-ostrov-alkatras.jpg',
    'Сан-Франциско|Fisherman’s Wharf': 'assets/images/places/san-francisco-fisherman-s-wharf.jpg',
    'Сан-Франциско|Twin Peaks': 'assets/images/places/san-francisco-twin-peaks.jpg',
    'Сан-Франциско|Lands End': 'assets/images/places/san-francisco-lands-end.jpg',
    'Сан-Франциско|Baker Beach': 'assets/images/places/san-francisco-baker-beach.jpg',
    'Лондон|Британский музей': 'assets/images/places/london-britanskiy-muzey.jpg',
    'Лондон|Тауэр': 'assets/images/places/london-tauer.jpg',
    'Лондон|Букингемский дворец': 'assets/images/places/london-bukingemskiy-dvorec.jpg',
    'Лондон|Скай Гарден': 'assets/images/places/london-skay-garden.jpg',
    'Лондон|Гайд-парк': 'assets/images/places/london-gayd-park.jpg',
    'Лондон|Набережная Темзы вечером': 'assets/images/places/london-naberezhnaya-temzy-vecherom.jpg',
    'Эдинбург|Эдинбургский замок': 'assets/images/places/edinburgh-edinburgskiy-zamok.jpg',
    'Эдинбург|Королевская миля': 'assets/images/places/edinburgh-korolevskaya-milya.jpg',
    'Эдинбург|Дворец Холирудхаус': 'assets/images/places/edinburgh-dvorec-holirudhaus.jpg',
    'Эдинбург|Arthur’s Seat': 'assets/images/places/edinburgh-arthur-s-seat.jpg',
    'Эдинбург|Calton Hill': 'assets/images/places/edinburgh-calton-hill.jpg',
    'Эдинбург|Dean Village': 'assets/images/places/edinburgh-dean-village.jpg',
    'Манчестер|Manchester Cathedral': 'assets/images/places/manchester-manchester-cathedral.jpg',
    'Манчестер|Science and Industry Museum': 'assets/images/places/manchester-science-and-industry-museum.jpg',
    'Манчестер|John Rylands Library': 'assets/images/places/manchester-john-rylands-library.jpg',
    'Манчестер|Castlefield Canals': 'assets/images/places/manchester-castlefield-canals.jpg',
    'Манчестер|Heaton Park': 'assets/images/places/manchester-heaton-park.jpg',
    'Манчестер|Salford Quays': 'assets/images/places/manchester-salford-quays.jpg',
    'Берлин|Бранденбургские ворота': 'assets/images/places/berlin-brandenburgskie-vorota.jpg',
    'Берлин|Рейхстаг': 'assets/images/places/berlin-reyhstag.jpg',
    'Берлин|Музейный остров': 'assets/images/places/berlin-muzeynyy-ostrov.jpg',
    'Берлин|Тиргартен': 'assets/images/places/berlin-tirgarten.jpg',
    'Берлин|East Side Gallery': 'assets/images/places/berlin-east-side-gallery.jpg',
    'Берлин|Темпельхофское поле': 'assets/images/places/berlin-tempelhofskoe-pole.jpg',
    'Мюнхен|Мариенплац': 'assets/images/places/munich-marienplac.jpg',
    'Мюнхен|Дворец Нимфенбург': 'assets/images/places/munich-dvorec-nimfenburg.jpg',
    'Мюнхен|Мюнхенская резиденция': 'assets/images/places/munich-myunhenskaya-rezidenciya.jpg',
    'Мюнхен|Английский сад': 'assets/images/places/munich-angliyskiy-sad.jpg',
    'Мюнхен|Олимпийский парк': 'assets/images/places/munich-olimpiyskiy-park.jpg',
    'Мюнхен|Озеро Штарнберг': 'assets/images/places/munich-ozero-shtarnberg.jpg',
    'Гамбург|Эльбская филармония': 'assets/images/places/hamburg-elbskaya-filarmoniya.jpg',
    'Гамбург|Миниатюрная страна чудес': 'assets/images/places/hamburg-miniatyurnaya-strana-chudes.jpg',
    'Гамбург|Ратуша Гамбурга': 'assets/images/places/hamburg-ratusha-gamburga.jpg',
    'Гамбург|Озеро Альстер': 'assets/images/places/hamburg-ozero-alster.jpg',
    'Гамбург|Шпайхерштадт': 'assets/images/places/hamburg-shpayhershtadt.jpg',
    'Гамбург|Парк Planten un Blomen': 'assets/images/places/hamburg-park-planten-un-blomen.jpg',
    'Афины|Афинский Акрополь': 'assets/images/places/athens-afinskiy-akropol.jpg',
    'Афины|Музей Акрополя': 'assets/images/places/athens-muzey-akropolya.jpg',
    'Афины|Агора Афин': 'assets/images/places/athens-agora-afin.jpg',
    'Афины|Холм Ликавит': 'assets/images/places/athens-holm-likavit.jpg',
    'Афины|Район Плака': 'assets/images/places/athens-rayon-plaka.jpg',
    'Афины|Мыс Сунион': 'assets/images/places/athens-mys-sunion.jpg',
    'Санторини|Деревня Ия': 'assets/images/places/santorini-derevnya-iya.jpg',
    'Санторини|Археологический объект Акротири': 'assets/images/places/santorini-arheologicheskiy-obekt-akrotiri.jpg',
    'Санторини|Фира': 'assets/images/places/santorini-fira.jpg',
    'Санторини|Кальдера Санторини': 'assets/images/places/santorini-kaldera-santorini.jpg',
    'Санторини|Красный пляж': 'assets/images/places/santorini-krasnyy-plyazh.jpg',
    'Санторини|Закат в Ие': 'assets/images/places/santorini-zakat-v-ie.jpg',
    'Крит|Кносский дворец': 'assets/images/places/crete-knosskiy-dvorec.jpg',
    'Крит|Старый город Ханьи': 'assets/images/places/crete-staryy-gorod-hani.jpg',
    'Крит|Крепость Кулес': 'assets/images/places/crete-krepost-kules.jpg',
    'Крит|Лагуна Балос': 'assets/images/places/crete-laguna-balos.jpg',
    'Крит|Пляж Элафониси': 'assets/images/places/crete-plyazh-elafonisi.jpg',
    'Крит|Самарийское ущелье': 'assets/images/places/crete-samariyskoe-uschele.jpg',
    'Салоники|Белая башня': 'assets/images/places/thessaloniki-belaya-bashnya.jpg',
    'Салоники|Ротонда Галерия': 'assets/images/places/thessaloniki-rotonda-galeriya.jpg',
    'Салоники|Арка Галерия': 'assets/images/places/thessaloniki-arka-galeriya.jpg',
    'Салоники|Набережная Салоник': 'assets/images/places/thessaloniki-naberezhnaya-salonik.jpg',
    'Салоники|Верхний город Ано Поли': 'assets/images/places/thessaloniki-verhniy-gorod-ano-poli.jpg',
    'Салоники|Озеро Керкини': 'assets/images/places/thessaloniki-ozero-kerkini.jpg',
    'Каир|Пирамиды Гизы': 'assets/images/places/cairo-piramidy-gizy.jpg',
    'Каир|Египетский музей': 'assets/images/places/cairo-egipetskiy-muzey.jpg',
    'Каир|Цитадель Саладина': 'assets/images/places/cairo-citadel-saladina.jpg',
    'Каир|Нил вечером': 'assets/images/places/cairo-nil-vecherom.jpg',
    'Каир|Парк Аль-Азхар': 'assets/images/places/cairo-park-al-azhar.jpg',
    'Каир|Хан эль-Халили ночью': 'assets/images/places/cairo-han-el-halili-nochyu.jpg',
    'Шарм-эль-Шейх|Старый рынок Шарм-эль-Шейха': 'assets/images/places/sharm-el-sheikh-staryy-rynok-sharm-el-sheyha.jpg',
    'Шарм-эль-Шейх|Площадь Сохо': 'assets/images/places/sharm-el-sheikh-ploschad-soho.jpg',
    'Шарм-эль-Шейх|Мечеть Аль-Сахаба': 'assets/images/places/sharm-el-sheikh-mechet-al-sahaba.jpg',
    'Шарм-эль-Шейх|Национальный парк Рас-Мохаммед': 'assets/images/places/sharm-el-sheikh-nacionalnyy-park-ras-mohammed.jpg',
    'Шарм-эль-Шейх|Бухта Наама': 'assets/images/places/sharm-el-sheikh-buhta-naama.jpg',
    'Шарм-эль-Шейх|Голубая дыра Дахаба': 'assets/images/places/sharm-el-sheikh-golubaya-dyra-dahaba.jpg',
    'Хургада|Hurghada Marina': 'assets/images/places/hurghada-hurghada-marina.jpg',
    'Хургада|Sand City Hurghada': 'assets/images/places/hurghada-sand-city-hurghada.jpg',
    'Хургада|Мечеть Эль-Мина': 'assets/images/places/hurghada-mechet-el-mina.jpg',
    'Хургада|Острова Гифтун': 'assets/images/places/hurghada-ostrova-giftun.jpg',
    'Хургада|Пляж Mahmya': 'assets/images/places/hurghada-plyazh-mahmya.jpg',
    'Хургада|Пустынное сафари на закате': 'assets/images/places/hurghada-pustynnoe-safari-na-zakate.jpg',
    'Александрия|Библиотека Александрина': 'assets/images/places/alexandria-biblioteka-aleksandrina.jpg',
    'Александрия|Цитадель Кайт-Бей': 'assets/images/places/alexandria-citadel-kayt-bey.jpg',
    'Александрия|Катакомбы Ком-эль-Шукафа': 'assets/images/places/alexandria-katakomby-kom-el-shukafa.jpg',
    'Александрия|Набережная Корниш': 'assets/images/places/alexandria-naberezhnaya-kornish.jpg',
    'Александрия|Дворец Монтаза': 'assets/images/places/alexandria-dvorec-montaza.jpg',
    'Александрия|Средиземноморские пляжи': 'assets/images/places/alexandria-sredizemnomorskie-plyazhi.jpg',
    'Ташкент|Комплекс Хаст-Имам': 'assets/images/places/tashkent-kompleks-hast-imam.jpg',
    'Ташкент|Рынок Чорсу': 'assets/images/places/tashkent-rynok-chorsu.jpg',
    'Ташкент|Музей Амира Тимура': 'assets/images/places/tashkent-muzey-amira-timura.jpg',
    'Ташкент|Ташкентская телебашня вечером': 'assets/images/places/tashkent-tashkentskaya-telebashnya-vecherom.jpg',
    'Ташкент|Японский сад': 'assets/images/places/tashkent-yaponskiy-sad.jpg',
    'Ташкент|Парк Анхор': 'assets/images/places/tashkent-park-anhor.jpg',
    'Самарканд|Регистан': 'assets/images/places/samarkand-registan.jpg',
    'Самарканд|Шахи-Зинда': 'assets/images/places/samarkand-shahi-zinda.jpg',
    'Самарканд|Мавзолей Гур-Эмир': 'assets/images/places/samarkand-mavzoley-gur-emir.jpg',
    'Самарканд|Сиабский базар на рассвете': 'assets/images/places/samarkand-siabskiy-bazar-na-rassvete.jpg',
    'Самарканд|Обсерватория Улугбека': 'assets/images/places/samarkand-observatoriya-ulugbeka.jpg',
    'Самарканд|Сады Самарканда': 'assets/images/places/samarkand-sady-samarkanda.jpg',
    'Бухара|Пои-Калян': 'assets/images/places/bukhara-poi-kalyan.jpg',
    'Бухара|Крепость Арк': 'assets/images/places/bukhara-krepost-ark.jpg',
    'Бухара|Ляби-Хауз': 'assets/images/places/bukhara-lyabi-hauz.jpg',
    'Бухара|Старый город Бухары': 'assets/images/places/bukhara-staryy-gorod-buhary.jpg',
    'Бухара|Чор-Минор': 'assets/images/places/bukhara-chor-minor.jpg',
    'Бухара|Караванные улочки вечером': 'assets/images/places/bukhara-karavannye-ulochki-vecherom.jpg'
  }
};

function tpExplicitImage(kind, name) {
  return TP_IMAGE_OVERRIDES?.[kind]?.[name] || null;
}

function tpTravelSlug(value) {
  const explicit = {
    'Стамбул': 'istanbul',
    'Дубай': 'dubai',
    'Санкт-Петербург': 'sankt-peterburg',
    'Нью-Йорк': 'new-york',
    'Лос-Анджелес': 'los-angeles',
    'Сан-Франциско': 'san-francisco',
    'Абу-Даби': 'abu-dhabi',
    'Карловы Вары': 'karlovy-vary',
    'Шарм-эль-Шейх': 'sharm-el-sheikh',
    'Чиангмай': 'chiang-mai',
    'Гонконг': 'hong-kong',
    'Каппадокия': 'cappadocia',
    'Севилья': 'seville',
    'Рим': 'rome',
    'Венеция': 'venice',
    'Флоренция': 'florence',
    'Неаполь': 'naples',
    'Ницца': 'nice',
    'Марсель': 'marseille',
    'Пекин': 'beijing',
    'Токио': 'tokyo',
    'Киото': 'kyoto',
    'Сеул': 'seoul',
    'Пусан': 'busan',
    'Каир': 'cairo',
    'Афины': 'athens',
    'Мюнхен': 'munich',
    'Эдинбург': 'edinburgh'
  };
  if (explicit[value]) return explicit[value];
  const map = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'sch','ы':'y','э':'e','ю':'yu','я':'ya','ъ':'','ь':''};
  return String(value || 'travel')
    .toLowerCase()
    .split('')
    .map(ch => map[ch] ?? ch)
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'travel';
}

function tpCityImage(city) {
  return tpExplicitImage('cities', city) || `assets/images/cities/${tpTravelSlug(city)}.jpg`;
}

function tpHotelImage(hotelName, city = '') {
  return tpExplicitImage('hotels', hotelName) || `assets/images/hotels/${tpTravelSlug(hotelName)}.jpg`;
}

function tpPlaceImage(city, placeName) {
  const key = `${city}|${placeName}`;
  return tpExplicitImage('places', key) || `assets/images/places/${tpTravelSlug(city)}-${tpTravelSlug(placeName)}.jpg`;
}

// Уникальные внешние картинки по названию, пока пользователь не положил свои файлы в assets/images.
function tpHash(value) {
  const s = String(value || 'travelplan');
  let h = 0;
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return Math.abs(h) || 1;
}

function tpImageQuery(value) {
  const s = String(value || 'travel').toLowerCase();
  const map = {
    'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'sch','ы':'y','э':'e','ю':'yu','я':'ya','ъ':'','ь':''
  };
  return s.split('').map(ch => map[ch] ?? ch).join('').replace(/[^a-z0-9]+/g, ',').replace(/^,+|,+$/g, '') || 'travel';
}

function tpRemoteImageUrl(query, w = 1200, h = 800) {
  const q = tpImageQuery(query);
  const lock = tpHash(query) % 100000;
  return `https://loremflickr.com/${w}/${h}/${encodeURIComponent(q + ',travel,landmark')}?lock=${lock}`;
}

function tpGenericImageUrl(w = 1200, h = 800) {
  return `https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=${w}&q=80`;
}

function tpImgOnError(query, w = 1200, h = 800) {
  const remote = tpRemoteImageUrl(query, w, h);
  const generic = tpGenericImageUrl(w, h);
  return `this.onerror=function(){this.onerror=null;this.src='${generic}';};this.src='${remote}';`;
}

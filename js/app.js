// =============================================
//  app.js - инициализация
// =============================================

// Зачем этот файл:
// Главная точка запуска сайта: собирает стартовое состояние и поднимает основные блоки интерфейса.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

const defaultConfig = {
  site_title: 'TravelPlan', hero_title: 'Откройте мир путешествий',
  hero_subtitle: 'Планируйте идеальные поездки, бронируйте билеты и отели в одном месте. Смотрите куда сходить во всех интересуемых городах',
  background_color: '#0f172a', surface_color: '#1e3a5f', text_color: '#f8fafc',
  primary_action_color: '#38bdf8', secondary_action_color: '#0ea5e9',
  font_family: 'Montserrat', font_size: 16
};

const dataHandler = {
  onDataChanged(data) {
    bookings = data;
    recordCount = data.length;
    renderBookings();
  }
};

function applyConfig(config) {
  const siteTitle = document.getElementById('site-title');
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  if (siteTitle)    siteTitle.textContent    = config.site_title    || defaultConfig.site_title;
  if (heroTitle)    heroTitle.textContent    = config.hero_title    || defaultConfig.hero_title;
  if (heroSubtitle) heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
  document.body.style.fontFamily = `${config.font_family || defaultConfig.font_family}, sans-serif`;
  const baseSize = config.font_size || defaultConfig.font_size;
  if (heroTitle)    heroTitle.style.fontSize    = `${baseSize * 2.5}px`;
  if (heroSubtitle) heroSubtitle.style.fontSize = `${baseSize * 1.25}px`;
  document.documentElement.style.setProperty('--primary-color', config.primary_action_color || defaultConfig.primary_action_color);
}

function setupDateConstraints() {
  const today = new Date().toISOString().split('T')[0];
  const flightFrom = document.getElementById('flight-date-from');
  const flightTo   = document.getElementById('flight-date-to');
  if (flightFrom) {
    flightFrom.min = today;
    flightFrom.addEventListener('change', () => {
      if (!flightTo) return;
      flightTo.min = flightFrom.value || today;
      if (flightTo.value && flightTo.value < flightFrom.value) flightTo.value = flightFrom.value;
    });
  }
  if (flightTo) flightTo.min = today;

  const checkin  = document.getElementById('hotel-checkin');
  const checkout = document.getElementById('hotel-checkout');
  if (checkin) {
    checkin.min = today;
    checkin.addEventListener('change', () => {
      if (!checkout) return;
      checkout.min = checkin.value || today;
      if (checkout.value && checkout.value < checkin.value) checkout.value = checkin.value;
    });
  }
  if (checkout) checkout.min = today;
}

function initElementSdk() {
  if (!window.elementSdk) return;
  window.elementSdk.init({
    defaultConfig, onConfigChange: applyConfig,
    mapToCapabilities: (config) => ({
      recolorables: [
        { get: () => config.background_color || defaultConfig.background_color, set: v => window.elementSdk.setConfig({ background_color: v }) },
        { get: () => config.surface_color || defaultConfig.surface_color, set: v => window.elementSdk.setConfig({ surface_color: v }) },
        { get: () => config.text_color || defaultConfig.text_color, set: v => window.elementSdk.setConfig({ text_color: v }) },
        { get: () => config.primary_action_color || defaultConfig.primary_action_color, set: v => window.elementSdk.setConfig({ primary_action_color: v }) },
        { get: () => config.secondary_action_color || defaultConfig.secondary_action_color, set: v => window.elementSdk.setConfig({ secondary_action_color: v }) },
      ],
      borderables: [],
      fontEditable: { get: () => config.font_family || defaultConfig.font_family, set: v => window.elementSdk.setConfig({ font_family: v }) },
      fontSizeable: { get: () => config.font_size || defaultConfig.font_size, set: v => window.elementSdk.setConfig({ font_size: v }) },
    }),
    mapToEditPanelValues: (config) => new Map([
      ['site_title', config.site_title || defaultConfig.site_title],
      ['hero_title', config.hero_title || defaultConfig.hero_title],
      ['hero_subtitle', config.hero_subtitle || defaultConfig.hero_subtitle],
    ])
  });
}

async function initDataSdk() {
  if (window.dataSdk) {
    const result = await window.dataSdk.init(dataHandler);
    if (!result.isOk) initLocalBookings();
  } else {
    initLocalBookings();
  }
}

function setupForms() {
  const ff = document.getElementById('flight-form');
  if (ff) ff.addEventListener('submit', e => { e.preventDefault(); searchFlights(); });
  const hf = document.getElementById('hotel-form');
  if (hf) hf.addEventListener('submit', e => { e.preventDefault(); searchHotels(); });
}

function selectDestination(destination, section = 'flights') {
  const ft = document.getElementById('flight-to');
  const hd = document.getElementById('hotel-destination');
  if (ft) ft.value = destination;
  if (hd) hd.value = destination;
  showSection(section);
  showToast(`Выбрано: ${destination}`);
}

function initCitySelectorModal() {
  const list = document.getElementById('city-selector-list');
  if (!list) return;
  list.innerHTML = CITY_OPTIONS.map(c => `
    <button onclick="setUserCity(${JSON.stringify(c).replace(/"/g, '&quot;')});closeCitySelector();"
      class="w-full text-left px-4 py-3 rounded-xl hover:bg-white/10 transition flex items-center justify-between group">
      <span class="font-medium">${c.name}</span>
      <span class="text-xs text-slate-500 group-hover:text-slate-300">${c.country} · ${c.iata}</span>
    </button>`).join('');
}

// Синхронизировать оба city-selector-btn (desktop + mobile)
const _origUpdateCityUI = window.updateCityUI;
window.updateCityUI = function() {
  ['city-selector-btn','city-selector-btn-mob'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.textContent = `📍 ${userCity.name}`;
  });
};


function getAutocompleteValues(mode) {
  const cityNames = new Set();
  if (typeof CITY_OPTIONS !== 'undefined') CITY_OPTIONS.forEach(c => cityNames.add(c.name));
  if (typeof DESTINATIONS !== 'undefined') DESTINATIONS.forEach(d => cityNames.add(d.city));
  if (typeof FEED_FLIGHTS !== 'undefined') FEED_FLIGHTS.forEach(f => cityNames.add(f.city));
  if (typeof FEED_HOTELS !== 'undefined') FEED_HOTELS.forEach(h => cityNames.add(h.city));
  if (mode === 'hotel' && typeof FEED_HOTELS !== 'undefined') {
    return [
      ...[...cityNames].map(v => ({ value: v, meta: 'город' })),
      ...FEED_HOTELS.map(h => ({ value: h.name, meta: `${h.city} · ${h.stars}★` }))
    ];
  }
  return [...cityNames].map(v => ({ value: v, meta: 'город' }));
}

function setupAutocomplete(inputId, listId, mode = 'city') {
  const input = document.getElementById(inputId);
  const list = document.getElementById(listId);
  if (!input || !list) return;
  const values = tpCached(`autocomplete_${mode}`, () => getAutocompleteValues(mode), 300000);

  function render() {
    const q = input.value.trim().toLowerCase();
    const matches = values
      .filter(item => !q || item.value.toLowerCase().includes(q));
    if (!matches.length) { list.classList.add('hidden'); list.innerHTML = ''; return; }
    list.innerHTML = matches.map(item => `
      <button type="button" class="autocomplete-option" data-value="${item.value.replace(/"/g, '&quot;')}">
        <span>${item.value}</span><small>${item.meta}</small>
      </button>`).join('');
    list.classList.remove('hidden');
  }

  const debouncedRender = debounce(render, 220);
  input.addEventListener('input', debouncedRender);
  input.addEventListener('focus', render);
  list.addEventListener('mousedown', (e) => {
    const btn = e.target.closest('.autocomplete-option');
    if (!btn) return;
    e.preventDefault();
    input.value = btn.dataset.value;
    list.classList.add('hidden');
  });
  document.addEventListener('click', (e) => {
    if (e.target !== input && !list.contains(e.target)) list.classList.add('hidden');
  });
}

function initAutocomplete() {
  setupAutocomplete('flight-from', 'flight-from-suggestions', 'city');
  setupAutocomplete('flight-to', 'flight-to-suggestions', 'city');
  setupAutocomplete('hotel-destination', 'hotel-destination-suggestions', 'hotel');
}

async function initApp() {
  try {
    initElementSdk();
    // Сначала восстанавливаем Supabase-сессию, потом грузим брони.
    // Иначе после reload сайт считает пользователя гостем и показывает локальные фантомы.
    if (window.travelplanAuthReady) await window.travelplanAuthReady;
    else if (typeof refreshAuthState === 'function') await refreshAuthState({ skipBookings: true });
    await initDataSdk();
    setupForms();
    setupDateConstraints();
    initAutocomplete();
    renderTop3Destinations();
    if (typeof renderPersonalSection === 'function') renderPersonalSection();
    initCitySelector();
    initCitySelectorModal();
    // Автозаполнение поля «Откуда» при загрузке
    const flightFrom = document.getElementById('flight-from');
    if (flightFrom && !flightFrom.value) flightFrom.value = getUserCity().name;
    const initialSection = typeof getInitialTravelPlanSection === 'function'
      ? getInitialTravelPlanSection()
      : (localStorage.getItem('travelplan_current_section') || 'explore');
    showSection(initialSection, { replace: true });
  } catch (error) {
    console.error('Ошибка запуска TravelPlan:', error);
  } finally {
    document.body.classList.remove('auth-booting');
  }
}

initApp();

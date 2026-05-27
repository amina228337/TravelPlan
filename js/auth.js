// =============================================
// auth.js - аккаунты, профиль, город, аватарка
// =============================================

// Зачем этот файл:
// Вход, регистрация и профиль. Здесь живет вся логика аккаунта, чтобы она не расползалась по сайту.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

window.travelplanCurrentUser = null;
window.travelplanUserProfile = null;
let authMode = 'login';

let travelplanAuthReadyResolve;
window.travelplanAuthReady = new Promise(resolve => { travelplanAuthReadyResolve = resolve; });
window.travelplanAuthInitialized = false;

function getProfileDisplayName() {
  const profile = window.travelplanUserProfile;
  const user = window.travelplanCurrentUser;
  return profile?.display_name || profile?.nickname || user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Гость';
}

function getReviewAuthorName() {
  return getProfileDisplayName();
}

function getInitials(name) {
  const clean = String(name || 'TP').trim();
  return clean.split(/\s+/).slice(0, 2).map(x => x[0]?.toUpperCase()).join('') || 'TP';
}

function updateAuthUI() {
  const user = window.travelplanCurrentUser;
  const profile = window.travelplanUserProfile;
  const name = getProfileDisplayName();
  const avatar = profile?.avatar_url || user?.user_metadata?.avatar_url || '';
  const content = avatar
    ? `<img src="${avatar}" class="w-6 h-6 rounded-full object-cover" alt="avatar"><span class="hidden lg:inline">${name}</span>`
    : `<span class="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center text-xs">${getInitials(name)}</span><span class="hidden lg:inline">${user ? name : 'Войти'}</span>`;
  ['auth-profile-btn', 'auth-profile-btn-mob'].forEach(id => {
    const btn = document.getElementById(id);
    if (btn) btn.innerHTML = user ? content : (id.endsWith('mob') ? '👤' : '👤 Войти');
  });
}

function openAuthModal() {
  renderAuthModal();
  const modal = document.getElementById('auth-modal');
  if (modal) { modal.style.display = 'flex'; modal.classList.remove('hidden'); }
}

function closeAuthModal() {
  const modal = document.getElementById('auth-modal');
  if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
}

function setAuthMode(mode) {
  authMode = mode;
  renderAuthModal();
}

function renderAuthModal() {
  const root = document.getElementById('auth-modal-content');
  if (!root) return;
  const user = window.travelplanCurrentUser;
  if (user) {
    renderProfileForm(root);
  } else {
    renderLoginRegister(root);
  }
}

function renderLoginRegister(root) {
  const isLogin = authMode === 'login';
  root.innerHTML = `
    <div class="space-y-4">
      <div class="text-center">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-3xl mb-3">👤</div>
        <h2 class="text-2xl font-bold">${isLogin ? 'Вход в аккаунт' : 'Создать аккаунт'}</h2>
        <p class="text-slate-400 text-sm mt-1">Брони, город и профиль будут храниться в Supabase.</p>
      </div>
      <div class="grid grid-cols-2 gap-2 bg-white/5 rounded-xl p-1">
        <button onclick="setAuthMode('login')" class="py-2 rounded-lg text-sm font-semibold ${isLogin ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}">Вход</button>
        <button onclick="setAuthMode('register')" class="py-2 rounded-lg text-sm font-semibold ${!isLogin ? 'bg-sky-500 text-white' : 'text-slate-400 hover:text-white'}">Регистрация</button>
      </div>
      <div class="space-y-3">
        ${!isLogin ? `<input id="auth-name" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="Имя или ник">` : ''}
        <input id="auth-email" type="email" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="Email">
        <input id="auth-password" type="password" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none" placeholder="Пароль">
        <button onclick="${isLogin ? 'loginWithEmail()' : 'registerWithEmail()'}" class="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 font-semibold">${isLogin ? 'Войти' : 'Создать аккаунт'}</button>
        <button onclick="loginWithGoogle()" class="w-full py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/20 transition">G Войти через Google</button>
      </div>
      <p class="text-xs text-slate-500 text-center">После регистрации Supabase попросит открыть письмо. Потому что даже сайт путешествий обязан заниматься бюрократией.</p>
    </div>`;
}

function switchLoginToRegister(email = '') {
  authMode = 'register';
  renderAuthModal();
  setTimeout(() => {
    const emailInput = document.getElementById('auth-email');
    const passInput = document.getElementById('auth-password');
    if (emailInput && email) emailInput.value = email;
    if (passInput) passInput.value = '';
    const nameInput = document.getElementById('auth-name');
    if (nameInput) nameInput.focus();
  }, 0);
}

function isLoginAccountMissingError(error) {
  const msg = String(error?.message || '').toLowerCase();
  return msg.includes('invalid login credentials')
    || msg.includes('invalid credentials')
    || msg.includes('user not found')
    || msg.includes('email not confirmed') === false && msg.includes('invalid');
}

function getProfileCountryOptions(selectedCountry) {
  if (typeof CITY_OPTIONS === 'undefined') return '<option>Казахстан</option>';
  const countries = [...new Set(CITY_OPTIONS.map(c => c.country))].sort((a, b) => a.localeCompare(b, 'ru'));
  return countries.map(c => `<option value="${c}" ${c === selectedCountry ? 'selected' : ''}>${c}</option>`).join('');
}

function getProfileCityOptions(selectedCity, selectedCountry) {
  if (typeof CITY_OPTIONS === 'undefined') return '<option>Алматы</option>';
  return CITY_OPTIONS
    .filter(c => !selectedCountry || c.country === selectedCountry)
    .map(c => `<option value="${c.name}" ${c.name === selectedCity ? 'selected' : ''}>${c.name}</option>`).join('');
}

function onProfileCountryChange() {
  const country = document.getElementById('profile-country')?.value;
  const citySelect = document.getElementById('profile-city');
  if (!citySelect) return;
  const cities = CITY_OPTIONS.filter(c => c.country === country);
  citySelect.innerHTML = cities.map(c => `<option value="${c.name}">${c.name}</option>`).join('');
}

function canUpdateAvatar(profile) {
  const last = profile?.avatar_updated_at ? new Date(profile.avatar_updated_at).getTime() : 0;
  if (!last) return { ok: true, waitText: '' };
  const diff = Date.now() - last;
  const limit = 12 * 60 * 60 * 1000;
  if (diff >= limit) return { ok: true, waitText: '' };
  const left = limit - diff;
  const hours = Math.floor(left / 3600000);
  const mins = Math.ceil((left % 3600000) / 60000);
  return { ok: false, waitText: `${hours}ч ${mins}мин` };
}

function formatWaitTime(ms) {
  const safe = Math.max(0, ms);
  const hours = Math.floor(safe / 3600000);
  const mins = Math.ceil((safe % 3600000) / 60000);
  if (hours <= 0) return `${mins}мин`;
  return `${hours}ч ${mins}мин`;
}

function canUpdateProfileField(profile, field) {
  const rules = {
    display_name: { key: 'display_name_updated_at', limit: 6 * 60 * 60 * 1000 },
    nickname: { key: 'nickname_updated_at', limit: 48 * 60 * 60 * 1000 }
  };
  const rule = rules[field];
  if (!rule) return { ok: true, waitText: '' };
  const last = profile?.[rule.key] ? new Date(profile[rule.key]).getTime() : 0;
  if (!last) return { ok: true, waitText: '' };
  const diff = Date.now() - last;
  if (diff >= rule.limit) return { ok: true, waitText: '' };
  return { ok: false, waitText: formatWaitTime(rule.limit - diff) };
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('Не удалось прочитать файл'));
    reader.readAsDataURL(file);
  });
}

function renderProfileForm(root) {
  const user = window.travelplanCurrentUser;
  const profile = window.travelplanUserProfile || {};
  const name = getProfileDisplayName();
  const city = profile.city || (typeof getUserCity === 'function' ? getUserCity().name : 'Алматы');
  const cityObj = (typeof CITY_OPTIONS !== 'undefined') ? CITY_OPTIONS.find(c => c.name === city) : null;
  const country = profile.country || cityObj?.country || 'Казахстан';
  const avatar = profile.avatar_url || user?.user_metadata?.avatar_url || '';
  const avatarGate = canUpdateAvatar(profile);
  const nameGate = canUpdateProfileField(profile, 'display_name');
  const nickGate = canUpdateProfileField(profile, 'nickname');
  root.innerHTML = `
    <div class="space-y-5">
      <div class="flex items-center gap-4">
        <div class="w-20 h-20 rounded-2xl bg-sky-500/20 flex items-center justify-center overflow-hidden text-xl font-bold">
          ${avatar ? `<img src="${avatar}" class="w-full h-full object-cover" alt="avatar">` : getInitials(name)}
        </div>
        <div>
          <h2 class="text-2xl font-bold">${name}</h2>
          <p class="text-slate-400 text-sm">${user.email || 'Аккаунт TravelPlan'}</p>
          <p class="text-xs text-slate-500 mt-1">Город, ник, аватарка и настройки профиля</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label class="block text-xs text-slate-400 mb-1">Имя пользователя до 12 символов</label>
          <input id="profile-display-name" maxlength="12" value="${profile.display_name || name}" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none">
          ${nameGate.ok ? '<p class="text-xs text-slate-500 mt-1">Имя можно менять раз в 6 часов.</p>' : `<p class="text-xs text-amber-300 mt-1">Имя можно будет сменить через ${nameGate.waitText}</p>`}
        </div>
        <div>
          <label class="block text-xs text-slate-400 mb-1">Ник до 8 символов</label>
          <input id="profile-nickname" maxlength="8" value="${profile.nickname || name}" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none">
          ${nickGate.ok ? '<p class="text-xs text-slate-500 mt-1">Ник можно менять раз в 48 часов.</p>' : `<p class="text-xs text-amber-300 mt-1">Ник можно будет сменить через ${nickGate.waitText}</p>`}
        </div>
        <div>
          <label class="block text-xs text-slate-400 mb-1">Страна</label>
          <select id="profile-country" onchange="onProfileCountryChange()" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none">${getProfileCountryOptions(country)}</select>
        </div>
        <div>
          <label class="block text-xs text-slate-400 mb-1">Город</label>
          <select id="profile-city" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none">${getProfileCityOptions(city, country)}</select>
        </div>
        <div>
          <label class="block text-xs text-slate-400 mb-1">Стиль путешествий</label>
          <select id="profile-travel-style" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none">
            ${['Комфортно и красиво','Бюджетно','Люкс','Культура и музеи','Море и отдых','Горы и природа'].map(v => `<option ${v === profile.travel_style ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
        </div>
        <div>
          <label class="block text-xs text-slate-400 mb-1">Бюджет</label>
          <select id="profile-budget" class="w-full px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none">
            ${['Эконом','Средний','Выше среднего','Без ограничений'].map(v => `<option ${v === profile.budget_level ? 'selected' : ''}>${v}</option>`).join('')}
          </select>
        </div>
        <div class="md:col-span-2">
          <label class="block text-xs text-slate-400 mb-1">Аватарка · менять можно раз в 12 часов</label>
          <input id="profile-avatar-file" type="file" accept="image/*" ${avatarGate.ok ? '' : 'disabled'} class="w-full text-sm text-slate-300 file:mr-3 file:px-4 file:py-3 file:rounded-xl file:border-0 file:bg-sky-500/20 file:text-sky-200 hover:file:bg-sky-500/30 disabled:opacity-50">
          ${avatarGate.ok ? '<p class="text-xs text-slate-500 mt-1">JPG/PNG/WebP</p>' : `<p class="text-xs text-amber-300 mt-1">Следующая смена аватарки через ${avatarGate.waitText}</p>`}
        </div>
      </div>

      <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
        <h3 class="font-semibold mb-2">🔐 Пароль</h3>
        <p class="text-slate-400 text-sm mb-3">Если вошли через Google, можно задать пароль и потом входить ещё и по email.</p>
        <div class="flex gap-2">
          <input id="profile-new-password" type="password" placeholder="Новый пароль" class="flex-1 px-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl focus:border-sky-500 focus:outline-none">
          <button onclick="updateAccountPassword()" class="px-4 py-3 rounded-xl bg-white/10 border border-white/15 font-semibold hover:bg-white/20">Задать</button>
        </div>
      </div>

      <div id="profile-save-status" class="hidden rounded-xl border border-emerald-400/25 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-200">✅ Изменения сохранены</div>

      <div class="flex flex-col sm:flex-row gap-3">
        <button onclick="saveProfile()" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 font-semibold">Сохранить профиль</button>
        <button type="button" id="profile-logout-btn" onclick="logoutAccount(event)" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 text-white font-bold shadow-lg shadow-red-950/30 hover:from-red-400 hover:to-rose-500 transition">Выйти из аккаунта</button>
      </div>
    </div>`;
}

async function registerWithEmail() {
  const email = document.getElementById('auth-email')?.value.trim();
  const password = document.getElementById('auth-password')?.value;
  const name = document.getElementById('auth-name')?.value.trim();
  if (!email || !password) return showToast('Введите email и пароль', 'error');
  const { data, error } = await supabaseClient.auth.signUp({
    email,
    password,
    options: { data: { full_name: name || email.split('@')[0] } }
  });
  if (error) return showToast(error.message, 'error');
  showToast(data?.session ? 'Аккаунт создан' : 'Аккаунт создан. Проверьте email, если включено подтверждение.');
  await refreshAuthState();
  renderAuthModal();
}

async function loginWithEmail() {
  const email = document.getElementById('auth-email')?.value.trim();
  const password = document.getElementById('auth-password')?.value;
  if (!email || !password) return showToast('Введите email и пароль', 'error');

  const { error } = await supabaseClient.auth.signInWithPassword({ email, password });

  if (error) {
    const msg = String(error.message || '').toLowerCase();
    if (msg.includes('email not confirmed')) {
      showToast('Аккаунт есть, но email ещё не подтверждён', 'error');
      return;
    }
    showToast('Такого аккаунта нет или пароль неверный. Перехожу к регистрации.', 'error');
    switchLoginToRegister(email);
    return;
  }

  showToast('Вы вошли в аккаунт');
  await refreshAuthState({ skipBookings: false });
  renderAuthModal();
}

async function loginWithGoogle() {
  const { error } = await supabaseClient.auth.signInWithOAuth({
    provider: 'google',
    options: { redirectTo: window.location.origin + window.location.pathname }
  });
  if (error) showToast(error.message, 'error');
}

async function logoutAccount(event) {
  if (event && typeof event.preventDefault === 'function') event.preventDefault();
  if (event && typeof event.stopPropagation === 'function') event.stopPropagation();

  const btn = document.getElementById('profile-logout-btn');
  if (btn) {
    btn.disabled = true;
    btn.textContent = 'Выходим...';
  }

  window.travelplanSuppressAuthEvents = true;

  // Сначала меняем интерфейс, потом ждём Supabase. Так выход ощущается мгновенным,
  // а не как просьба браузеру подумать о вечном.
  window.travelplanCurrentUser = null;
  window.travelplanUserProfile = null;
  authMode = 'login';

  try { updateAuthUI(); } catch {}
  try {
    if (typeof clearBookingsForGuest === 'function') clearBookingsForGuest();
    else if (typeof renderBookings === 'function') { window.bookings = []; renderBookings([]); }
  } catch {}

  try {
    if (window.supabaseClient?.auth) {
      await window.supabaseClient.auth.signOut({ scope: 'local' });
    }
  } catch (error) {
    console.warn('Supabase signOut не ответил, чистим локально:', error?.message || error);
  }

  try {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;
      if (
        key === 'travelplan_supabase_auth' ||
        key === 'supabase.auth.token' ||
        key === 'travelplan_bookings_migrated' ||
        key.startsWith('sb-') ||
        key.includes('supabase') ||
        key.includes('auth-token')
      ) keysToRemove.push(key);
    }
    keysToRemove.forEach(key => localStorage.removeItem(key));
    Object.keys(sessionStorage || {}).forEach(key => {
      if (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth-token')) sessionStorage.removeItem(key);
    });
  } catch {}

  window.travelplanSuppressAuthEvents = false;
  try { closeAuthModal(); } catch {}
  try { updateAuthUI(); } catch {}
  try { renderLoginRegister(document.getElementById('auth-modal-content')); } catch {}
  showToast('Вы вышли из аккаунта');
  return false;
}
window.travelplanHardLogout = logoutAccount;

window.logoutAccount = logoutAccount;
window.signOutAccount = logoutAccount;
window.travelplanLogout = logoutAccount;

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-auth-logout]');
  if (!button) return;
  event.preventDefault();
  travelplanHardLogout(event);
});

async function saveProfile() {
  try {
    const cityName = document.getElementById('profile-city')?.value || 'Алматы';
    const countryName = document.getElementById('profile-country')?.value || 'Казахстан';
    let displayName = (document.getElementById('profile-display-name')?.value || '').trim().slice(0, 12);
    let nickname = (document.getElementById('profile-nickname')?.value || '').trim().slice(0, 8);
    const currentProfile = window.travelplanUserProfile || {};
    const displayNameChanged = displayName && displayName !== (currentProfile.display_name || '');
    const nicknameChanged = nickname && nickname !== (currentProfile.nickname || '');
    if (displayNameChanged) {
      const gate = canUpdateProfileField(currentProfile, 'display_name');
      if (!gate.ok) throw new Error(`Имя пользователя можно будет сменить через ${gate.waitText}`);
    }
    if (nicknameChanged) {
      const gate = canUpdateProfileField(currentProfile, 'nickname');
      if (!gate.ok) throw new Error(`Ник можно будет сменить через ${gate.waitText}`);
    }
    let avatarUrl = currentProfile.avatar_url || window.travelplanCurrentUser?.user_metadata?.avatar_url || null;
    let avatarUpdatedAt = currentProfile.avatar_updated_at || null;
    const avatarFile = document.getElementById('profile-avatar-file')?.files?.[0];
    if (avatarFile) {
      const gate = canUpdateAvatar(currentProfile);
      if (!gate.ok) throw new Error(`Аватарку можно будет сменить через ${gate.waitText}`);
      if (avatarFile.size > 900 * 1024) throw new Error('Аватарка слишком большая. Лучше до 900 КБ, а не портрет в 8K, спасибо браузеру за страдания.');
      avatarUrl = await fileToDataUrl(avatarFile);
      avatarUpdatedAt = new Date().toISOString();
    }
    const saved = await dbUpsertProfile({
      display_name: displayName || nickname,
      nickname: nickname || displayName,
      display_name_updated_at: displayNameChanged ? new Date().toISOString() : currentProfile.display_name_updated_at,
      nickname_updated_at: nicknameChanged ? new Date().toISOString() : currentProfile.nickname_updated_at,
      country: countryName,
      city: cityName,
      travel_style: document.getElementById('profile-travel-style')?.value,
      budget_level: document.getElementById('profile-budget')?.value,
      avatar_url: avatarUrl,
      avatar_updated_at: avatarUpdatedAt
    });
    window.travelplanUserProfile = saved;
    const cityObj = (CITY_OPTIONS || []).find(c => c.name === cityName);
    if (cityObj && typeof setUserCity === 'function') setUserCity(cityObj);
    updateAuthUI();
    if (typeof tpRefreshPersonalizedUI === 'function') tpRefreshPersonalizedUI();
    const status = document.getElementById('profile-save-status');
    if (status) {
      status.classList.remove('hidden');
      status.textContent = '✅ Изменения сохранены';
      setTimeout(() => status.classList.add('hidden'), 2500);
    }
    showToast('Изменения сохранены');
    renderProfileForm(document.getElementById('auth-modal-content'));
  } catch (error) {
    showToast(error.message || 'Не удалось сохранить профиль', 'error');
  }
}

async function updateAccountPassword() {
  const password = document.getElementById('profile-new-password')?.value;
  if (!password || password.length < 6) return showToast('Пароль должен быть минимум 6 символов', 'error');
  const { error } = await supabaseClient.auth.updateUser({ password });
  if (error) return showToast(error.message, 'error');
  document.getElementById('profile-new-password').value = '';
  showToast('Пароль обновлён');
}

async function refreshAuthState(options = {}) {
  if (!window.supabaseClient) {
    if (travelplanAuthReadyResolve && !window.travelplanAuthInitialized) {
      window.travelplanAuthInitialized = true;
      travelplanAuthReadyResolve(null);
    }
    return null;
  }

  const { data, error } = await supabaseClient.auth.getSession();
  if (error) console.warn('Не удалось восстановить сессию:', error.message);

  window.travelplanCurrentUser = data?.session?.user || null;

  if (window.travelplanCurrentUser) {
    try {
      window.travelplanUserProfile = await dbEnsureProfile();
    } catch (e) {
      console.warn('Не удалось загрузить профиль:', e.message || e);
      window.travelplanUserProfile = null;
    }

    const cityName = window.travelplanUserProfile?.city;
    const cityObj = cityName && typeof CITY_OPTIONS !== 'undefined' ? CITY_OPTIONS.find(c => c.name === cityName) : null;
    if (cityObj && typeof setUserCity === 'function') setUserCity(cityObj);
  } else {
    window.travelplanUserProfile = null;
  }

  updateAuthUI();

  if (!options.skipBookings && typeof refreshBookingsFromSupabase === 'function') {
    await refreshBookingsFromSupabase();
  }

  return window.travelplanCurrentUser;
}

async function initAuth() {
  if (window.travelplanAuthInitialized) return window.travelplanCurrentUser;

  await refreshAuthState({ skipBookings: true });

  if (window.supabaseClient && !window.travelplanAuthSubscriptionSet) {
    window.travelplanAuthSubscriptionSet = true;
    supabaseClient.auth.onAuthStateChange(async () => {
      if (window.travelplanSuppressAuthEvents) return;
      await refreshAuthState({ skipBookings: false });
      renderAuthModal();
    });
  }

  window.travelplanAuthInitialized = true;
  if (travelplanAuthReadyResolve) travelplanAuthReadyResolve(window.travelplanCurrentUser);
  return window.travelplanCurrentUser;
}

if (document.readyState === 'loading') {
  window.addEventListener('DOMContentLoaded', initAuth);
} else {
  initAuth();
}

// =============================================
//  navigation.js - вкладки + browser history
// =============================================

const SECTIONS = ['explore', 'feed', 'flights', 'hotels', 'places', 'bookings'];
let travelplanNavSilent = false;

function showSection(section, options = {}) {
  if (!SECTIONS.includes(section)) section = 'explore';
  try { localStorage.setItem('travelplan_current_section', section); } catch {}

  if (!options.fromHistory && !travelplanNavSilent) {
    const url = new URL(window.location.href);
    url.hash = section === 'explore' ? '' : section;
    const state = { section };
    if (history.state?.section !== section) history.pushState(state, '', url);
  }

  const explorePage = document.getElementById('explore-page');
  if (explorePage) explorePage.classList.add('hidden');

  ['feed', 'flights', 'hotels', 'places', 'bookings'].forEach(s => {
    const el = document.getElementById(`${s}-section`);
    if (el) el.classList.add('hidden');
  });

  if (section === 'explore') {
    if (explorePage) explorePage.classList.remove('hidden');
    if (typeof renderTop3Destinations === 'function') renderTop3Destinations();
    if (typeof renderPersonalSection === 'function') renderPersonalSection();
  } else {
    const el = document.getElementById(`${section}-section`);
    if (el) el.classList.remove('hidden');
    if (section === 'feed') initFeed();
    if (section === 'places' && typeof initPlaces === 'function') initPlaces();
    if (section === 'bookings' && typeof refreshBookingsFromSupabase === 'function') refreshBookingsFromSupabase();
    if (section === 'flights') {
      const ff = document.getElementById('flight-from');
      if (ff && !ff.value && typeof getUserCity === 'function') ff.value = getUserCity().name;
    }
  }
}

window.addEventListener('popstate', (event) => {
  const fromHash = window.location.hash.replace('#', '');
  const section = event.state?.section || (SECTIONS.includes(fromHash) ? fromHash : 'explore');
  travelplanNavSilent = true;
  showSection(section, { fromHistory: true });
  travelplanNavSilent = false;
});

window.addEventListener('DOMContentLoaded', () => {
  const fromHash = window.location.hash.replace('#', '');
  const saved = localStorage.getItem('travelplan_current_section');
  const section = SECTIONS.includes(fromHash) ? fromHash : (SECTIONS.includes(saved) ? saved : 'explore');
  history.replaceState({ section }, '', section === 'explore' ? window.location.pathname : `#${section}`);
});

function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  if (menu) menu.classList.toggle('hidden');
}

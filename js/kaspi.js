// =============================================
//  kaspi.js - симуляция оплаты через Kaspi QR
// =============================================

// Зачем этот файл:
// Демо-оплата через Kaspi: имитация платежа и обновление статуса брони.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

const KASPI_NUMBER = '+7 (777) 000-00-00'; // тестовый номер
const KASPI_MERCHANT = 'TravelPlan Demo';

/**
 * Генерирует SVG QR-кода (упрощённая визуализация - не настоящий QR).
 * В реальном приложении здесь был бы вызов библиотеки типа qrcode.js.
 * @param {string} text - данные для QR
 */
function generateQRsvg(text) {
  // Детерминированный псевдо-QR на основе хеша строки
  const hash = [...text].reduce((acc, ch) => (acc * 31 + ch.charCodeAt(0)) & 0xffff, 0);
  const seed = hash;
  const size = 21; // 21×21 = минимальный QR v1
  const cells = [];

  // Позиционные маркеры (углы)
  const markers = [
    [0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],
    [1,0],[1,6],[2,0],[2,2],[2,3],[2,4],[2,6],
    [3,0],[3,2],[3,3],[3,4],[3,6],
    [4,0],[4,2],[4,3],[4,4],[4,6],
    [5,0],[5,6],[6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[6,6],
    // Top-right
    [0,14],[0,15],[0,16],[0,17],[0,18],[0,19],[0,20],
    [1,14],[1,20],[2,14],[2,16],[2,17],[2,18],[2,20],
    [3,14],[3,16],[3,17],[3,18],[3,20],
    [4,14],[4,16],[4,17],[4,18],[4,20],
    [5,14],[5,20],[6,14],[6,15],[6,16],[6,17],[6,18],[6,19],[6,20],
    // Bottom-left
    [14,0],[14,1],[14,2],[14,3],[14,4],[14,5],[14,6],
    [15,0],[15,6],[16,0],[16,2],[16,3],[16,4],[16,6],
    [17,0],[17,2],[17,3],[17,4],[17,6],
    [18,0],[18,2],[18,3],[18,4],[18,6],
    [19,0],[19,6],[20,0],[20,1],[20,2],[20,3],[20,4],[20,5],[20,6],
  ];

  const markerSet = new Set(markers.map(([r,c]) => `${r},${c}`));

  // Заполняем данные псевдо-случайно
  const cellSize = 8;
  let rects = '';
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const key = `${r},${c}`;
      let filled;
      if (markerSet.has(key)) {
        filled = true;
      } else {
        const idx = r * size + c;
        const bit = (seed >> (idx % 16)) & 1;
        filled = bit === 1;
      }
      if (filled) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#000"/>`;
      }
    }
  }

  const svgSize = size * cellSize;
  return `<svg width="${svgSize}" height="${svgSize}" viewBox="0 0 ${svgSize} ${svgSize}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${svgSize}" height="${svgSize}" fill="white"/>
    ${rects}
  </svg>`;
}

/**
 * Открывает модальное окно Kaspi-оплаты.
 * @param {object} bookingData - данные бронирования (name/from, price, id, type)
 * @param {function} onSuccess - колбэк при успешной оплате
 */
function openKaspiPayment(bookingData, onSuccess) {
  const modal = document.getElementById('kaspi-modal');
  const content = document.getElementById('kaspi-modal-content');
  if (!modal || !content) return;

  const qrData = `travelplan://pay?merchant=${KASPI_MERCHANT}&amount=${bookingData.price}&id=${bookingData.id}&phone=${KASPI_NUMBER}`;
  const qrSvg = generateQRsvg(qrData);

  content.innerHTML = `
    <div class="space-y-5">
      <!-- Заголовок Kaspi -->
      <div class="flex items-center justify-center gap-2">
        <div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-lg"
             style="background: linear-gradient(135deg, #ff5a00, #ff8c00)">K</div>
        <span class="text-white font-bold text-xl">Kaspi.kz</span>
      </div>

      <p class="text-slate-300 text-sm">Оплатите через приложение Kaspi, отсканировав QR-код</p>

      <!-- Информация о платеже -->
      <div class="bg-white/5 rounded-xl p-3 text-left space-y-1">
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Получатель:</span>
          <span class="text-white font-medium">${KASPI_MERCHANT}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Номер:</span>
          <span class="text-white font-medium">${KASPI_NUMBER}</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-slate-400">Сумма:</span>
          <span class="text-sky-400 font-bold text-base">${Number(bookingData.price).toLocaleString()} ₸</span>
        </div>
      </div>

      <!-- QR-код -->
      <div class="flex justify-center">
        <div class="kaspi-qr-wrap kaspi-pulse">
          ${qrSvg}
        </div>
      </div>

      <p class="text-xs text-slate-500">
        Откройте <strong class="text-slate-300">Kaspi.kz</strong> → Платежи → Сканировать QR
      </p>

      <!-- Кнопка симуляции -->
      <button id="kaspi-simulate-btn" onclick="simulateKaspiPayment('${bookingData.id}')"
        class="w-full py-3 rounded-xl font-semibold text-white transition kaspi-pulse"
        style="background: linear-gradient(135deg, #ff5a00, #ff8c00)">
        ✅ Симулировать оплату
      </button>

      <button onclick="closeKaspiModal()"
        class="w-full py-2 text-slate-500 hover:text-slate-300 transition text-sm">
        Отмена
      </button>
    </div>
  `;

  // Сохраняем колбэк
  window._kaspiOnSuccess = onSuccess;
  window._kaspiBookingId = bookingData.id;

  modal.style.display = 'flex';
  modal.classList.remove('hidden');
}

/**
 * Симулирует успешную оплату через Kaspi.
 */
function simulateKaspiPayment(bookingId) {
  const content = document.getElementById('kaspi-modal-content');
  if (!content) return;

  // Шаг 1: Показываем спиннер "обработка"
  content.innerHTML = `
    <div class="py-8 space-y-4">
      <div class="flex justify-center">
        <div class="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full kaspi-spin"></div>
      </div>
      <p class="text-white font-semibold">Обработка платежа...</p>
      <p class="text-slate-400 text-sm">Ожидаем подтверждение от Kaspi</p>
    </div>
  `;

  // Шаг 2: Через 2 сек показываем "успех"
  setTimeout(() => {
    content.innerHTML = `
      <div class="py-6 space-y-4">
        <div class="text-6xl">✅</div>
        <h3 class="text-white text-xl font-bold">Оплата прошла!</h3>
        <div class="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 text-sm text-left space-y-1">
          <p class="text-emerald-400 font-semibold">Здесь должно быть подтверждение от Kaspi!</p>
          <p class="text-slate-400 text-xs mt-1">В реальном приложении сюда придёт push-уведомление и SMS от банка с номером транзакции.</p>
        </div>
        <div class="text-xs text-slate-500 space-y-1">
          <p>🏦 Kaspi Bank · Демо-транзакция</p>
          <p>ID: KSP-${Date.now().toString().slice(-8)}</p>
          <p>${new Date().toLocaleString('ru-RU')}</p>
        </div>
        <button onclick="confirmKaspiSuccess()"
          class="w-full py-3 rounded-xl font-semibold text-white transition"
          style="background: linear-gradient(135deg, #10b981, #059669)">
          Отлично! Перейти к бронированиям
        </button>
      </div>
    `;
  }, 2000);
}

/**
 * Завершает симуляцию - помечает бронь оплаченной и закрывает модал.
 */
function confirmKaspiSuccess() {
  closeKaspiModal();
  if (typeof window._kaspiOnSuccess === 'function') {
    window._kaspiOnSuccess(window._kaspiBookingId);
  }
  window._kaspiOnSuccess = null;
  window._kaspiBookingId = null;
}

/**
 * Закрывает Kaspi-модал.
 */
function closeKaspiModal() {
  const modal = document.getElementById('kaspi-modal');
  if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
}

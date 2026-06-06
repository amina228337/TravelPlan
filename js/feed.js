// =============================================
//  feed.js - лента поездок с фильтрами
// =============================================

// Зачем этот файл:
// Лента предложений: билеты, отели, фильтры, модалки и отзывы.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

let feedFiltersVisible = true;
let currentFeedType = 'all';

// ── Данные ленты ───────────────────────────────────────────────────────────

const FEED_FLIGHTS = [
  {
    "type": "flight",
    "country": "kz",
    "city": "Алматы",
    "emoji": "🏔️",
    "flag": "🇰🇿",
    "airline": "Air Astana",
    "price": 18000,
    "duration_h": 2,
    "stops": 0,
    "depart": "05:00",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "kz",
    "city": "Астана",
    "emoji": "🏛️",
    "flag": "🇰🇿",
    "airline": "Turkish Airlines",
    "price": 17800,
    "duration_h": 2,
    "stops": 0,
    "depart": "07:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "kz",
    "city": "Шымкент",
    "emoji": "🌿",
    "flag": "🇰🇿",
    "airline": "FlyArystan",
    "price": 12500,
    "duration_h": 2,
    "stops": 0,
    "depart": "08:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "kz",
    "city": "Актау",
    "emoji": "🏖️",
    "flag": "🇰🇿",
    "airline": "Qatar Airways",
    "price": 38000,
    "duration_h": 2,
    "stops": 0,
    "depart": "10:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "kz",
    "city": "Туркестан",
    "emoji": "🕌",
    "flag": "🇰🇿",
    "airline": "Emirates",
    "price": 26000,
    "duration_h": 2,
    "stops": 0,
    "depart": "11:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "kz",
    "city": "Бурабай",
    "emoji": "🌲",
    "flag": "🇰🇿",
    "airline": "Lufthansa",
    "price": 24000,
    "duration_h": 2,
    "stops": 0,
    "depart": "13:45",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ru",
    "city": "Москва",
    "emoji": "🏰",
    "flag": "🇷🇺",
    "airline": "Turkish Airlines",
    "price": 74200,
    "duration_h": 4,
    "stops": 0,
    "depart": "10:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ru",
    "city": "Санкт-Петербург",
    "emoji": "🌉",
    "flag": "🇷🇺",
    "airline": "FlyArystan",
    "price": 74600,
    "duration_h": 4,
    "stops": 0,
    "depart": "11:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ru",
    "city": "Сочи",
    "emoji": "🌊",
    "flag": "🇷🇺",
    "airline": "Qatar Airways",
    "price": 52000,
    "duration_h": 4,
    "stops": 0,
    "depart": "13:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ru",
    "city": "Казань",
    "emoji": "🕌",
    "flag": "🇷🇺",
    "airline": "Emirates",
    "price": 72000,
    "duration_h": 4,
    "stops": 0,
    "depart": "14:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ru",
    "city": "Калининград",
    "emoji": "🏰",
    "flag": "🇷🇺",
    "airline": "Lufthansa",
    "price": 88000,
    "duration_h": 4,
    "stops": 0,
    "depart": "16:45",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cy",
    "city": "Ларнака",
    "emoji": "🌊",
    "flag": "🇨🇾",
    "airline": "FlyArystan",
    "price": 112000,
    "duration_h": 4,
    "stops": 1,
    "depart": "14:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cy",
    "city": "Пафос",
    "emoji": "🏛️",
    "flag": "🇨🇾",
    "airline": "Qatar Airways",
    "price": 118000,
    "duration_h": 4,
    "stops": 1,
    "depart": "16:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cy",
    "city": "Лимассол",
    "emoji": "⛵",
    "flag": "🇨🇾",
    "airline": "Emirates",
    "price": 120000,
    "duration_h": 4,
    "stops": 1,
    "depart": "18:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cy",
    "city": "Никосия",
    "emoji": "🏙️",
    "flag": "🇨🇾",
    "airline": "Lufthansa",
    "price": 116000,
    "duration_h": 4,
    "stops": 1,
    "depart": "20:45",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cy",
    "city": "Айя-Напа",
    "emoji": "🏖️",
    "flag": "🇨🇾",
    "airline": "Pegasus",
    "price": 122000,
    "duration_h": 4,
    "stops": 1,
    "depart": "22:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "tr",
    "city": "Стамбул",
    "emoji": "🕌",
    "flag": "🇹🇷",
    "airline": "Qatar Airways",
    "price": 61600,
    "duration_h": 5,
    "stops": 0,
    "depart": "20:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "tr",
    "city": "Анталья",
    "emoji": "🏖️",
    "flag": "🇹🇷",
    "airline": "Emirates",
    "price": 24200,
    "duration_h": 5,
    "stops": 0,
    "depart": "22:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "tr",
    "city": "Каппадокия",
    "emoji": "🎈",
    "flag": "🇹🇷",
    "airline": "Lufthansa",
    "price": 76000,
    "duration_h": 4,
    "stops": 0,
    "depart": "23:45",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "tr",
    "city": "Измир",
    "emoji": "🌅",
    "flag": "🇹🇷",
    "airline": "Pegasus",
    "price": 72000,
    "duration_h": 4,
    "stops": 0,
    "depart": "05:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ae",
    "city": "Дубай",
    "emoji": "🏙️",
    "flag": "🇦🇪",
    "airline": "Emirates",
    "price": 90100,
    "duration_h": 5,
    "stops": 0,
    "depart": "05:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ae",
    "city": "Абу-Даби",
    "emoji": "🕌",
    "flag": "🇦🇪",
    "airline": "Lufthansa",
    "price": 95000,
    "duration_h": 5,
    "stops": 0,
    "depart": "07:45",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ae",
    "city": "Шарджа",
    "emoji": "🎨",
    "flag": "🇦🇪",
    "airline": "Pegasus",
    "price": 85000,
    "duration_h": 5,
    "stops": 0,
    "depart": "08:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ge",
    "city": "Тбилиси",
    "emoji": "🍷",
    "flag": "🇬🇪",
    "airline": "Lufthansa",
    "price": 72000,
    "duration_h": 4,
    "stops": 1,
    "depart": "10:45",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ge",
    "city": "Батуми",
    "emoji": "🌊",
    "flag": "🇬🇪",
    "airline": "Pegasus",
    "price": 76000,
    "duration_h": 4,
    "stops": 1,
    "depart": "11:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "ge",
    "city": "Кутаиси",
    "emoji": "🏞️",
    "flag": "🇬🇪",
    "airline": "SCAT",
    "price": 68000,
    "duration_h": 4,
    "stops": 1,
    "depart": "13:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cz",
    "city": "Прага",
    "emoji": "🏰",
    "flag": "🇨🇿",
    "airline": "Pegasus",
    "price": 135000,
    "duration_h": 7,
    "stops": 1,
    "depart": "14:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cz",
    "city": "Карловы Вары",
    "emoji": "♨️",
    "flag": "🇨🇿",
    "airline": "SCAT",
    "price": 145000,
    "duration_h": 7,
    "stops": 1,
    "depart": "16:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cz",
    "city": "Брно",
    "emoji": "🍺",
    "flag": "🇨🇿",
    "airline": "Asiana",
    "price": 132000,
    "duration_h": 7,
    "stops": 1,
    "depart": "18:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "es",
    "city": "Барселона",
    "emoji": "🎨",
    "flag": "🇪🇸",
    "airline": "SCAT",
    "price": 150000,
    "duration_h": 7,
    "stops": 1,
    "depart": "20:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "es",
    "city": "Мадрид",
    "emoji": "🖼️",
    "flag": "🇪🇸",
    "airline": "Asiana",
    "price": 155000,
    "duration_h": 7,
    "stops": 1,
    "depart": "22:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "es",
    "city": "Валенсия",
    "emoji": "🍊",
    "flag": "🇪🇸",
    "airline": "China Southern",
    "price": 148000,
    "duration_h": 7,
    "stops": 1,
    "depart": "23:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "es",
    "city": "Севилья",
    "emoji": "💃",
    "flag": "🇪🇸",
    "airline": "Air Astana",
    "price": 152000,
    "duration_h": 7,
    "stops": 1,
    "depart": "05:40",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "es",
    "city": "Майорка",
    "emoji": "🏝️",
    "flag": "🇪🇸",
    "airline": "Turkish Airlines",
    "price": 165000,
    "duration_h": 7,
    "stops": 1,
    "depart": "07:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "it",
    "city": "Рим",
    "emoji": "🏛️",
    "flag": "🇮🇹",
    "airline": "Asiana",
    "price": 77100,
    "duration_h": 7,
    "stops": 1,
    "depart": "05:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "it",
    "city": "Милан",
    "emoji": "👗",
    "flag": "🇮🇹",
    "airline": "China Southern",
    "price": 82000,
    "duration_h": 7,
    "stops": 1,
    "depart": "07:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "it",
    "city": "Венеция",
    "emoji": "🚤",
    "flag": "🇮🇹",
    "airline": "Air Astana",
    "price": 88000,
    "duration_h": 7,
    "stops": 1,
    "depart": "08:40",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "it",
    "city": "Флоренция",
    "emoji": "🎨",
    "flag": "🇮🇹",
    "airline": "Turkish Airlines",
    "price": 90000,
    "duration_h": 7,
    "stops": 1,
    "depart": "10:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "it",
    "city": "Неаполь",
    "emoji": "🍕",
    "flag": "🇮🇹",
    "airline": "FlyArystan",
    "price": 86000,
    "duration_h": 7,
    "stops": 1,
    "depart": "11:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "fr",
    "city": "Париж",
    "emoji": "🗼",
    "flag": "🇫🇷",
    "airline": "China Southern",
    "price": 85000,
    "duration_h": 7,
    "stops": 1,
    "depart": "10:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "fr",
    "city": "Ницца",
    "emoji": "🌊",
    "flag": "🇫🇷",
    "airline": "Air Astana",
    "price": 90000,
    "duration_h": 7,
    "stops": 1,
    "depart": "11:40",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "fr",
    "city": "Лион",
    "emoji": "🍷",
    "flag": "🇫🇷",
    "airline": "Turkish Airlines",
    "price": 88000,
    "duration_h": 7,
    "stops": 1,
    "depart": "13:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "fr",
    "city": "Марсель",
    "emoji": "⚓",
    "flag": "🇫🇷",
    "airline": "FlyArystan",
    "price": 92000,
    "duration_h": 7,
    "stops": 1,
    "depart": "14:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "th",
    "city": "Бангкок",
    "emoji": "🛕",
    "flag": "🇹🇭",
    "airline": "Air Astana",
    "price": 79600,
    "duration_h": 7,
    "stops": 1,
    "depart": "14:40",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "th",
    "city": "Пхукет",
    "emoji": "🏝️",
    "flag": "🇹🇭",
    "airline": "Turkish Airlines",
    "price": 89400,
    "duration_h": 7,
    "stops": 1,
    "depart": "16:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "th",
    "city": "Паттайя",
    "emoji": "🌴",
    "flag": "🇹🇭",
    "airline": "FlyArystan",
    "price": 85000,
    "duration_h": 7,
    "stops": 1,
    "depart": "18:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "th",
    "city": "Чиангмай",
    "emoji": "🌺",
    "flag": "🇹🇭",
    "airline": "Qatar Airways",
    "price": 87000,
    "duration_h": 7,
    "stops": 1,
    "depart": "20:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "th",
    "city": "Самуи",
    "emoji": "🥥",
    "flag": "🇹🇭",
    "airline": "Emirates",
    "price": 98000,
    "duration_h": 7,
    "stops": 1,
    "depart": "22:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "jp",
    "city": "Токио",
    "emoji": "🏯",
    "flag": "🇯🇵",
    "airline": "Turkish Airlines",
    "price": 80000,
    "duration_h": 7,
    "stops": 1,
    "depart": "20:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "jp",
    "city": "Киото",
    "emoji": "⛩️",
    "flag": "🇯🇵",
    "airline": "FlyArystan",
    "price": 85000,
    "duration_h": 7,
    "stops": 1,
    "depart": "22:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "jp",
    "city": "Осака",
    "emoji": "🍜",
    "flag": "🇯🇵",
    "airline": "Qatar Airways",
    "price": 88000,
    "duration_h": 7,
    "stops": 1,
    "depart": "23:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "jp",
    "city": "Саппоро",
    "emoji": "❄️",
    "flag": "🇯🇵",
    "airline": "Emirates",
    "price": 98000,
    "duration_h": 7,
    "stops": 1,
    "depart": "05:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "kr",
    "city": "Сеул",
    "emoji": "🌃",
    "flag": "🇰🇷",
    "airline": "FlyArystan",
    "price": 145000,
    "duration_h": 7,
    "stops": 1,
    "depart": "05:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "kr",
    "city": "Пусан",
    "emoji": "🌊",
    "flag": "🇰🇷",
    "airline": "Qatar Airways",
    "price": 150000,
    "duration_h": 7,
    "stops": 1,
    "depart": "07:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "kr",
    "city": "Чеджу",
    "emoji": "🌋",
    "flag": "🇰🇷",
    "airline": "Emirates",
    "price": 160000,
    "duration_h": 7,
    "stops": 1,
    "depart": "08:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cn",
    "city": "Пекин",
    "emoji": "🐉",
    "flag": "🇨🇳",
    "airline": "Qatar Airways",
    "price": 115000,
    "duration_h": 7,
    "stops": 1,
    "depart": "10:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cn",
    "city": "Шанхай",
    "emoji": "🌆",
    "flag": "🇨🇳",
    "airline": "Emirates",
    "price": 120000,
    "duration_h": 7,
    "stops": 1,
    "depart": "11:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cn",
    "city": "Гуанчжоу",
    "emoji": "🏯",
    "flag": "🇨🇳",
    "airline": "Lufthansa",
    "price": 100800,
    "duration_h": 7,
    "stops": 1,
    "depart": "13:30",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "cn",
    "city": "Гонконг",
    "emoji": "🌃",
    "flag": "🇨🇳",
    "airline": "Pegasus",
    "price": 140000,
    "duration_h": 7,
    "stops": 1,
    "depart": "14:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "us",
    "city": "Нью-Йорк",
    "emoji": "🗽",
    "flag": "🇺🇸",
    "airline": "Emirates",
    "price": 310000,
    "duration_h": 17,
    "stops": 2,
    "depart": "14:20",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "us",
    "city": "Лос-Анджелес",
    "emoji": "🎬",
    "flag": "🇺🇸",
    "airline": "Lufthansa",
    "price": 295000,
    "duration_h": 17,
    "stops": 2,
    "depart": "16:30",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "us",
    "city": "Майами",
    "emoji": "🌴",
    "flag": "🇺🇸",
    "airline": "Pegasus",
    "price": 320000,
    "duration_h": 17,
    "stops": 2,
    "depart": "18:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "us",
    "city": "Лас-Вегас",
    "emoji": "🎰",
    "flag": "🇺🇸",
    "airline": "SCAT",
    "price": 300000,
    "duration_h": 17,
    "stops": 2,
    "depart": "20:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "us",
    "city": "Сан-Франциско",
    "emoji": "🌁",
    "flag": "🇺🇸",
    "airline": "Asiana",
    "price": 330000,
    "duration_h": 17,
    "stops": 2,
    "depart": "22:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "gb",
    "city": "Лондон",
    "emoji": "🎡",
    "flag": "🇬🇧",
    "airline": "Lufthansa",
    "price": 180000,
    "duration_h": 7,
    "stops": 1,
    "depart": "20:30",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "gb",
    "city": "Эдинбург",
    "emoji": "🏰",
    "flag": "🇬🇧",
    "airline": "Pegasus",
    "price": 190000,
    "duration_h": 7,
    "stops": 1,
    "depart": "22:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "gb",
    "city": "Манчестер",
    "emoji": "🎸",
    "flag": "🇬🇧",
    "airline": "SCAT",
    "price": 175000,
    "duration_h": 7,
    "stops": 1,
    "depart": "23:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "de",
    "city": "Берлин",
    "emoji": "🧱",
    "flag": "🇩🇪",
    "airline": "Pegasus",
    "price": 125000,
    "duration_h": 7,
    "stops": 1,
    "depart": "05:40",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "de",
    "city": "Мюнхен",
    "emoji": "🍺",
    "flag": "🇩🇪",
    "airline": "SCAT",
    "price": 135000,
    "duration_h": 7,
    "stops": 1,
    "depart": "07:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "de",
    "city": "Гамбург",
    "emoji": "⚓",
    "flag": "🇩🇪",
    "airline": "Asiana",
    "price": 132000,
    "duration_h": 7,
    "stops": 1,
    "depart": "08:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "gr",
    "city": "Афины",
    "emoji": "🏛️",
    "flag": "🇬🇷",
    "airline": "SCAT",
    "price": 118000,
    "duration_h": 7,
    "stops": 1,
    "depart": "10:45",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "gr",
    "city": "Санторини",
    "emoji": "🤍",
    "flag": "🇬🇷",
    "airline": "Asiana",
    "price": 150000,
    "duration_h": 7,
    "stops": 1,
    "depart": "11:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "gr",
    "city": "Крит",
    "emoji": "🏝️",
    "flag": "🇬🇷",
    "airline": "China Southern",
    "price": 135000,
    "duration_h": 7,
    "stops": 1,
    "depart": "13:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "gr",
    "city": "Салоники",
    "emoji": "🌊",
    "flag": "🇬🇷",
    "airline": "Air Astana",
    "price": 120000,
    "duration_h": 7,
    "stops": 1,
    "depart": "14:20",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "eg",
    "city": "Каир",
    "emoji": "🐪",
    "flag": "🇪🇬",
    "airline": "Asiana",
    "price": 110000,
    "duration_h": 7,
    "stops": 1,
    "depart": "14:00",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "eg",
    "city": "Шарм-эль-Шейх",
    "emoji": "🐠",
    "flag": "🇪🇬",
    "airline": "China Southern",
    "price": 90000,
    "duration_h": 7,
    "stops": 1,
    "depart": "16:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "eg",
    "city": "Хургада",
    "emoji": "🏖️",
    "flag": "🇪🇬",
    "airline": "Air Astana",
    "price": 85000,
    "duration_h": 7,
    "stops": 1,
    "depart": "18:20",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "eg",
    "city": "Александрия",
    "emoji": "⚓",
    "flag": "🇪🇬",
    "airline": "Turkish Airlines",
    "price": 115000,
    "duration_h": 7,
    "stops": 1,
    "depart": "20:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "uz",
    "city": "Ташкент",
    "emoji": "🏙️",
    "flag": "🇺🇿",
    "airline": "China Southern",
    "price": 42000,
    "duration_h": 4,
    "stops": 0,
    "depart": "20:15",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "uz",
    "city": "Самарканд",
    "emoji": "🕌",
    "flag": "🇺🇿",
    "airline": "Air Astana",
    "price": 52000,
    "duration_h": 4,
    "stops": 0,
    "depart": "22:20",
    "classType": "comfort",
    "rating": null,
    "ratingCount": 0
  },
  {
    "type": "flight",
    "country": "uz",
    "city": "Бухара",
    "emoji": "🏺",
    "flag": "🇺🇿",
    "airline": "Turkish Airlines",
    "price": 56000,
    "duration_h": 4,
    "stops": 0,
    "depart": "23:30",
    "classType": "economy",
    "rating": null,
    "ratingCount": 0
  }
];

const FEED_HOTELS = [
  {
    "type": "hotel",
    "country": "kz",
    "city": "Алматы",
    "emoji": "🏔️",
    "flag": "🇰🇿",
    "name": "InterContinental Almaty",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 29000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Алматы",
    "address": "Алматы, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Алматы",
    "emoji": "🏔️",
    "flag": "🇰🇿",
    "name": "The Ritz-Carlton Almaty",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 22000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Алматы",
    "address": "Алматы, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Алматы",
    "emoji": "🏔️",
    "flag": "🇰🇿",
    "name": "Kazakhstan Hotel",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 17000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Алматы",
    "address": "Алматы, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Астана",
    "emoji": "🏛️",
    "flag": "🇰🇿",
    "name": "The Ritz-Carlton Astana",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Астана",
    "address": "Астана, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Астана",
    "emoji": "🏛️",
    "flag": "🇰🇿",
    "name": "Rixos President Astana",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 26000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Астана",
    "address": "Астана, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Астана",
    "emoji": "🏛️",
    "flag": "🇰🇿",
    "name": "Hilton Astana",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 20000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Астана",
    "address": "Астана, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Шымкент",
    "emoji": "🌿",
    "flag": "🇰🇿",
    "name": "Rixos Khadisha Shymkent",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 24000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Шымкент",
    "address": "Шымкент, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Шымкент",
    "emoji": "🌿",
    "flag": "🇰🇿",
    "name": "Ramada by Wyndham Shymkent",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 18000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Шымкент",
    "address": "Шымкент, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Актау",
    "emoji": "🏖️",
    "flag": "🇰🇿",
    "name": "Renaissance by Sulo",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 28000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Актау",
    "address": "Актау, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Актау",
    "emoji": "🏖️",
    "flag": "🇰🇿",
    "name": "Holiday Inn Aktau",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 21000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Актау",
    "address": "Актау, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Туркестан",
    "emoji": "🕌",
    "flag": "🇰🇿",
    "name": "Hampton by Hilton Turkistan",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 25000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Туркестан",
    "address": "Туркестан, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Туркестан",
    "emoji": "🕌",
    "flag": "🇰🇿",
    "name": "Karavansaray Turkistan Hotel",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 19000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Туркестан",
    "address": "Туркестан, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Бурабай",
    "emoji": "🌲",
    "flag": "🇰🇿",
    "name": "Rixos Borovoe",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Бурабай",
    "address": "Бурабай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kz",
    "city": "Бурабай",
    "emoji": "🌲",
    "flag": "🇰🇿",
    "name": "Wyndham Garden Burabay",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 30000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Бурабай",
    "address": "Бурабай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Москва",
    "emoji": "🏰",
    "flag": "🇷🇺",
    "name": "The Carlton Moscow",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Москва",
    "address": "Москва, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Москва",
    "emoji": "🏰",
    "flag": "🇷🇺",
    "name": "Ararat Park Hyatt Moscow",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 52000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Москва",
    "address": "Москва, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Москва",
    "emoji": "🏰",
    "flag": "🇷🇺",
    "name": "Hotel Metropol Moscow",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Москва",
    "address": "Москва, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Санкт-Петербург",
    "emoji": "🌉",
    "flag": "🇷🇺",
    "name": "Grand Hotel Europe",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 60000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Санкт-Петербург",
    "address": "Санкт-Петербург, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Санкт-Петербург",
    "emoji": "🌉",
    "flag": "🇷🇺",
    "name": "Astoria Hotel St Petersburg",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 45000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Санкт-Петербург",
    "address": "Санкт-Петербург, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Санкт-Петербург",
    "emoji": "🌉",
    "flag": "🇷🇺",
    "name": "Corinthia St Petersburg",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Санкт-Петербург",
    "address": "Санкт-Петербург, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Сочи",
    "emoji": "🌊",
    "flag": "🇷🇺",
    "name": "Hyatt Regency Sochi",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 51000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Сочи",
    "address": "Сочи, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Сочи",
    "emoji": "🌊",
    "flag": "🇷🇺",
    "name": "Swissotel Resort Sochi Kamelia",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 38000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Сочи",
    "address": "Сочи, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Сочи",
    "emoji": "🌊",
    "flag": "🇷🇺",
    "name": "Radisson Collection Paradise Resort",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 29000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Сочи",
    "address": "Сочи, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Казань",
    "emoji": "🕌",
    "flag": "🇷🇺",
    "name": "Kazan Palace by Tasigo",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 43000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Казань",
    "address": "Казань, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Казань",
    "emoji": "🕌",
    "flag": "🇷🇺",
    "name": "Mirage Hotel Kazan",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 32000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Казань",
    "address": "Казань, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Калининград",
    "emoji": "🏰",
    "flag": "🇷🇺",
    "name": "Crystal House Suite Hotel and Spa",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 47000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Калининград",
    "address": "Калининград, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ru",
    "city": "Калининград",
    "emoji": "🏰",
    "flag": "🇷🇺",
    "name": "Radisson Blu Hotel Kaliningrad",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Калининград",
    "address": "Калининград, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Ларнака",
    "emoji": "🌊",
    "flag": "🇨🇾",
    "name": "Radisson Blu Hotel Larnaca",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Ларнака",
    "address": "Ларнака, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Ларнака",
    "emoji": "🌊",
    "flag": "🇨🇾",
    "name": "Sun Hall Hotel",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Ларнака",
    "address": "Ларнака, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Ларнака",
    "emoji": "🌊",
    "flag": "🇨🇾",
    "name": "The Ciao Stelio Deluxe Hotel",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 32000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Ларнака",
    "address": "Ларнака, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Пафос",
    "emoji": "🏛️",
    "flag": "🇨🇾",
    "name": "Elysium Hotel Paphos",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Пафос",
    "address": "Пафос, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Пафос",
    "emoji": "🏛️",
    "flag": "🇨🇾",
    "name": "Annabelle Paphos",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 52000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Пафос",
    "address": "Пафос, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Пафос",
    "emoji": "🏛️",
    "flag": "🇨🇾",
    "name": "Almyra Hotel Paphos",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Пафос",
    "address": "Пафос, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Лимассол",
    "emoji": "⛵",
    "flag": "🇨🇾",
    "name": "Amara Limassol",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 81000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Лимассол",
    "address": "Лимассол, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Лимассол",
    "emoji": "⛵",
    "flag": "🇨🇾",
    "name": "Four Seasons Hotel Limassol",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 60000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Лимассол",
    "address": "Лимассол, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Лимассол",
    "emoji": "⛵",
    "flag": "🇨🇾",
    "name": "St Raphael Resort",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 46000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Лимассол",
    "address": "Лимассол, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Никосия",
    "emoji": "🏙️",
    "flag": "🇨🇾",
    "name": "Hilton Nicosia",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 60000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Никосия",
    "address": "Никосия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Никосия",
    "emoji": "🏙️",
    "flag": "🇨🇾",
    "name": "The Landmark Nicosia",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 45000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Никосия",
    "address": "Никосия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Никосия",
    "emoji": "🏙️",
    "flag": "🇨🇾",
    "name": "MAP Boutique Hotel",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Никосия",
    "address": "Никосия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Айя-Напа",
    "emoji": "🏖️",
    "flag": "🇨🇾",
    "name": "Adams Beach Hotel",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 64000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Айя-Напа",
    "address": "Айя-Напа, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Айя-Напа",
    "emoji": "🏖️",
    "flag": "🇨🇾",
    "name": "Nissi Beach Resort",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 48000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Айя-Напа",
    "address": "Айя-Напа, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cy",
    "city": "Айя-Напа",
    "emoji": "🏖️",
    "flag": "🇨🇾",
    "name": "Napa Mermaid Hotel and Suites",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 37000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Айя-Напа",
    "address": "Айя-Напа, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Стамбул",
    "emoji": "🕌",
    "flag": "🇹🇷",
    "name": "Four Seasons Hotel Istanbul at Sultanahmet",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Стамбул",
    "address": "Стамбул, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Стамбул",
    "emoji": "🕌",
    "flag": "🇹🇷",
    "name": "Ciragan Palace Kempinski",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 30000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Стамбул",
    "address": "Стамбул, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Стамбул",
    "emoji": "🕌",
    "flag": "🇹🇷",
    "name": "Pera Palace Hotel",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 23000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Стамбул",
    "address": "Стамбул, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Анталья",
    "emoji": "🏖️",
    "flag": "🇹🇷",
    "name": "Akra Antalya",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 37000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Анталья",
    "address": "Анталья, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Анталья",
    "emoji": "🏖️",
    "flag": "🇹🇷",
    "name": "Regnum Carya",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 28000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Анталья",
    "address": "Анталья, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Анталья",
    "emoji": "🏖️",
    "flag": "🇹🇷",
    "name": "Rixos Downtown Antalya",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 21000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Анталья",
    "address": "Анталья, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Каппадокия",
    "emoji": "🎈",
    "flag": "🇹🇷",
    "name": "Museum Hotel Cappadocia",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Каппадокия",
    "address": "Каппадокия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Каппадокия",
    "emoji": "🎈",
    "flag": "🇹🇷",
    "name": "Argos in Cappadocia",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Каппадокия",
    "address": "Каппадокия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Каппадокия",
    "emoji": "🎈",
    "flag": "🇹🇷",
    "name": "Sultan Cave Suites",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 32000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Каппадокия",
    "address": "Каппадокия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Измир",
    "emoji": "🌅",
    "flag": "🇹🇷",
    "name": "Swissotel Buyuk Efes Izmir",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 44000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Измир",
    "address": "Измир, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Измир",
    "emoji": "🌅",
    "flag": "🇹🇷",
    "name": "Key Hotel Izmir",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 33000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Измир",
    "address": "Измир, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "tr",
    "city": "Измир",
    "emoji": "🌅",
    "flag": "🇹🇷",
    "name": "Renaissance Izmir Hotel",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 25000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Измир",
    "address": "Измир, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ae",
    "city": "Дубай",
    "emoji": "🏙️",
    "flag": "🇦🇪",
    "name": "Burj Al Arab",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 87000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Дубай",
    "address": "Дубай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ae",
    "city": "Дубай",
    "emoji": "🏙️",
    "flag": "🇦🇪",
    "name": "Atlantis The Palm",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 65000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Дубай",
    "address": "Дубай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ae",
    "city": "Дубай",
    "emoji": "🏙️",
    "flag": "🇦🇪",
    "name": "Jumeirah Beach Hotel",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 50000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Дубай",
    "address": "Дубай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ae",
    "city": "Абу-Даби",
    "emoji": "🕌",
    "flag": "🇦🇪",
    "name": "Emirates Palace Mandarin Oriental",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 94000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Абу-Даби",
    "address": "Абу-Даби, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ae",
    "city": "Абу-Даби",
    "emoji": "🕌",
    "flag": "🇦🇪",
    "name": "The St. Regis Abu Dhabi",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Абу-Даби",
    "address": "Абу-Даби, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ae",
    "city": "Абу-Даби",
    "emoji": "🕌",
    "flag": "🇦🇪",
    "name": "Conrad Abu Dhabi Etihad Towers",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 54000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Абу-Даби",
    "address": "Абу-Даби, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ae",
    "city": "Шарджа",
    "emoji": "🎨",
    "flag": "🇦🇪",
    "name": "Sheraton Sharjah Beach Resort and Spa",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 54000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Шарджа",
    "address": "Шарджа, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ae",
    "city": "Шарджа",
    "emoji": "🎨",
    "flag": "🇦🇪",
    "name": "The Chedi Al Bait Sharjah",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Шарджа",
    "address": "Шарджа, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ge",
    "city": "Тбилиси",
    "emoji": "🍷",
    "flag": "🇬🇪",
    "name": "Rooms Hotel Tbilisi",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 37000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Тбилиси",
    "address": "Тбилиси, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ge",
    "city": "Тбилиси",
    "emoji": "🍷",
    "flag": "🇬🇪",
    "name": "Stamba Hotel",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 28000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Тбилиси",
    "address": "Тбилиси, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ge",
    "city": "Тбилиси",
    "emoji": "🍷",
    "flag": "🇬🇪",
    "name": "Radisson Blu Iveria Hotel",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 21000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Тбилиси",
    "address": "Тбилиси, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ge",
    "city": "Батуми",
    "emoji": "🌊",
    "flag": "🇬🇪",
    "name": "Radisson Blu Hotel Batumi",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Батуми",
    "address": "Батуми, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ge",
    "city": "Батуми",
    "emoji": "🌊",
    "flag": "🇬🇪",
    "name": "Sheraton Batumi Hotel",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 30000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Батуми",
    "address": "Батуми, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ge",
    "city": "Батуми",
    "emoji": "🌊",
    "flag": "🇬🇪",
    "name": "Hilton Batumi",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 23000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Батуми",
    "address": "Батуми, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ge",
    "city": "Кутаиси",
    "emoji": "🏞️",
    "flag": "🇬🇪",
    "name": "Newport Hotel Kutaisi",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 29000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Кутаиси",
    "address": "Кутаиси, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "ge",
    "city": "Кутаиси",
    "emoji": "🏞️",
    "flag": "🇬🇪",
    "name": "Best Western Kutaisi",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 22000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Кутаиси",
    "address": "Кутаиси, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cz",
    "city": "Прага",
    "emoji": "🏰",
    "flag": "🇨🇿",
    "name": "Mosaic House Design Hotel",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Прага",
    "address": "Прага, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cz",
    "city": "Прага",
    "emoji": "🏰",
    "flag": "🇨🇿",
    "name": "Hotel Kings Court Prague",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Прага",
    "address": "Прага, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cz",
    "city": "Прага",
    "emoji": "🏰",
    "flag": "🇨🇿",
    "name": "Grand Hotel Bohemia",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 32000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Прага",
    "address": "Прага, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cz",
    "city": "Карловы Вары",
    "emoji": "♨️",
    "flag": "🇨🇿",
    "name": "Grandhotel Pupp",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 60000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Карловы Вары",
    "address": "Карловы Вары, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cz",
    "city": "Карловы Вары",
    "emoji": "♨️",
    "flag": "🇨🇿",
    "name": "Hotel Thermal Karlovy Vary",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 45000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Карловы Вары",
    "address": "Карловы Вары, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cz",
    "city": "Карловы Вары",
    "emoji": "♨️",
    "flag": "🇨🇿",
    "name": "Savoy Westend Hotel",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Карловы Вары",
    "address": "Карловы Вары, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cz",
    "city": "Брно",
    "emoji": "🍺",
    "flag": "🇨🇿",
    "name": "Barcelo Brno Palace",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 43000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Брно",
    "address": "Брно, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cz",
    "city": "Брно",
    "emoji": "🍺",
    "flag": "🇨🇿",
    "name": "Grandezza Hotel Luxury Palace",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 32000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Брно",
    "address": "Брно, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Барселона",
    "emoji": "🎨",
    "flag": "🇪🇸",
    "name": "Hotel Arts Barcelona",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 75000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Барселона",
    "address": "Барселона, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Барселона",
    "emoji": "🎨",
    "flag": "🇪🇸",
    "name": "Casa Gracia Barcelona",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Барселона",
    "address": "Барселона, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Барселона",
    "emoji": "🎨",
    "flag": "🇪🇸",
    "name": "H10 Madison Barcelona",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 43000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Барселона",
    "address": "Барселона, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Мадрид",
    "emoji": "🖼️",
    "flag": "🇪🇸",
    "name": "Hotel Riu Plaza Espana",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Мадрид",
    "address": "Мадрид, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Мадрид",
    "emoji": "🖼️",
    "flag": "🇪🇸",
    "name": "Only YOU Boutique Hotel Madrid",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 52000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Мадрид",
    "address": "Мадрид, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Мадрид",
    "emoji": "🖼️",
    "flag": "🇪🇸",
    "name": "The Principal Madrid",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Мадрид",
    "address": "Мадрид, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Валенсия",
    "emoji": "🍊",
    "flag": "🇪🇸",
    "name": "SH Valencia Palace",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 62000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Валенсия",
    "address": "Валенсия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Валенсия",
    "emoji": "🍊",
    "flag": "🇪🇸",
    "name": "Only YOU Hotel Valencia",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 46000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Валенсия",
    "address": "Валенсия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Севилья",
    "emoji": "💃",
    "flag": "🇪🇸",
    "name": "Hotel Alfonso XIII",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Севилья",
    "address": "Севилья, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Севилья",
    "emoji": "💃",
    "flag": "🇪🇸",
    "name": "Eurostars Torre Sevilla",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Севилья",
    "address": "Севилья, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Майорка",
    "emoji": "🏝️",
    "flag": "🇪🇸",
    "name": "Nixe Palace Hotel",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 81000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Майорка",
    "address": "Майорка, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "es",
    "city": "Майорка",
    "emoji": "🏝️",
    "flag": "🇪🇸",
    "name": "Hotel Saratoga Palma",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 60000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Майорка",
    "address": "Майорка, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Рим",
    "emoji": "🏛️",
    "flag": "🇮🇹",
    "name": "Hotel Hassler Roma",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Рим",
    "address": "Рим, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Рим",
    "emoji": "🏛️",
    "flag": "🇮🇹",
    "name": "The Hoxton Rome",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 52000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Рим",
    "address": "Рим, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Рим",
    "emoji": "🏛️",
    "flag": "🇮🇹",
    "name": "Hotel Artemide",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Рим",
    "address": "Рим, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Милан",
    "emoji": "👗",
    "flag": "🇮🇹",
    "name": "Excelsior Hotel Gallia",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 75000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Милан",
    "address": "Милан, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Милан",
    "emoji": "👗",
    "flag": "🇮🇹",
    "name": "Room Mate Giulia",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Милан",
    "address": "Милан, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Милан",
    "emoji": "👗",
    "flag": "🇮🇹",
    "name": "NYX Hotel Milan",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 43000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Милан",
    "address": "Милан, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Венеция",
    "emoji": "🚤",
    "flag": "🇮🇹",
    "name": "Belmond Hotel Cipriani",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 87000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Венеция",
    "address": "Венеция, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Венеция",
    "emoji": "🚤",
    "flag": "🇮🇹",
    "name": "Hotel Danieli Venice",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 65000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Венеция",
    "address": "Венеция, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Венеция",
    "emoji": "🚤",
    "flag": "🇮🇹",
    "name": "Bauer Palazzo",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 50000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Венеция",
    "address": "Венеция, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Флоренция",
    "emoji": "🎨",
    "flag": "🇮🇹",
    "name": "Hotel Brunelleschi Florence",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 67000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Флоренция",
    "address": "Флоренция, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Флоренция",
    "emoji": "🎨",
    "flag": "🇮🇹",
    "name": "Portrait Firenze",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 50000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Флоренция",
    "address": "Флоренция, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Неаполь",
    "emoji": "🍕",
    "flag": "🇮🇹",
    "name": "Grand Hotel Vesuvio",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 51000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Неаполь",
    "address": "Неаполь, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "it",
    "city": "Неаполь",
    "emoji": "🍕",
    "flag": "🇮🇹",
    "name": "UNAHOTELS Napoli",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 38000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Неаполь",
    "address": "Неаполь, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Париж",
    "emoji": "🗼",
    "flag": "🇫🇷",
    "name": "Le Meurice Paris",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 87000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Париж",
    "address": "Париж, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Париж",
    "emoji": "🗼",
    "flag": "🇫🇷",
    "name": "Hotel Lutetia Paris",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 65000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Париж",
    "address": "Париж, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Париж",
    "emoji": "🗼",
    "flag": "🇫🇷",
    "name": "CitizenM Paris Gare de Lyon",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 50000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Париж",
    "address": "Париж, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Ницца",
    "emoji": "🌊",
    "flag": "🇫🇷",
    "name": "Hotel Negresco",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 83000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Ницца",
    "address": "Ницца, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Ницца",
    "emoji": "🌊",
    "flag": "🇫🇷",
    "name": "Hyatt Regency Nice Palais de la Mediterranee",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 62000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Ницца",
    "address": "Ницца, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Лион",
    "emoji": "🍷",
    "flag": "🇫🇷",
    "name": "InterContinental Lyon Hotel Dieu",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Лион",
    "address": "Лион, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Лион",
    "emoji": "🍷",
    "flag": "🇫🇷",
    "name": "Cour des Loges Lyon",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Лион",
    "address": "Лион, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Марсель",
    "emoji": "⚓",
    "flag": "🇫🇷",
    "name": "InterContinental Marseille Hotel Dieu",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 54000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Марсель",
    "address": "Марсель, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "fr",
    "city": "Марсель",
    "emoji": "⚓",
    "flag": "🇫🇷",
    "name": "Sofitel Marseille Vieux Port",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Марсель",
    "address": "Марсель, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Бангкок",
    "emoji": "🛕",
    "flag": "🇹🇭",
    "name": "Mandarin Oriental Bangkok",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Бангкок",
    "address": "Бангкок, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Бангкок",
    "emoji": "🛕",
    "flag": "🇹🇭",
    "name": "The Standard Bangkok Mahanakhon",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 26000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Бангкок",
    "address": "Бангкок, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Бангкок",
    "emoji": "🛕",
    "flag": "🇹🇭",
    "name": "Eastin Grand Hotel Sathorn",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 20000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Бангкок",
    "address": "Бангкок, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Пхукет",
    "emoji": "🏝️",
    "flag": "🇹🇭",
    "name": "Amanpuri Resort",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 48000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Пхукет",
    "address": "Пхукет, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Пхукет",
    "emoji": "🏝️",
    "flag": "🇹🇭",
    "name": "The Slate Phuket",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 36000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Пхукет",
    "address": "Пхукет, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Пхукет",
    "emoji": "🏝️",
    "flag": "🇹🇭",
    "name": "Katathani Phuket Beach Resort",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 28000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Пхукет",
    "address": "Пхукет, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Паттайя",
    "emoji": "🌴",
    "flag": "🇹🇭",
    "name": "Hilton Pattaya",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 29000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Паттайя",
    "address": "Паттайя, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Паттайя",
    "emoji": "🌴",
    "flag": "🇹🇭",
    "name": "InterContinental Pattaya Resort",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 22000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Паттайя",
    "address": "Паттайя, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Чиангмай",
    "emoji": "🌺",
    "flag": "🇹🇭",
    "name": "Anantara Chiang Mai Resort",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 27000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Чиангмай",
    "address": "Чиангмай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Чиангмай",
    "emoji": "🌺",
    "flag": "🇹🇭",
    "name": "U Nimman Chiang Mai",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 20000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Чиангмай",
    "address": "Чиангмай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Самуи",
    "emoji": "🥥",
    "flag": "🇹🇭",
    "name": "Four Seasons Resort Koh Samui",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Самуи",
    "address": "Самуи, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "th",
    "city": "Самуи",
    "emoji": "🥥",
    "flag": "🇹🇭",
    "name": "Banyan Tree Samui",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Самуи",
    "address": "Самуи, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Токио",
    "emoji": "🏯",
    "flag": "🇯🇵",
    "name": "The Peninsula Tokyo",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 94000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Токио",
    "address": "Токио, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Токио",
    "emoji": "🏯",
    "flag": "🇯🇵",
    "name": "Park Hotel Tokyo",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Токио",
    "address": "Токио, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Токио",
    "emoji": "🏯",
    "flag": "🇯🇵",
    "name": "Hotel Metropolitan Tokyo Marunouchi",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 54000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Токио",
    "address": "Токио, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Киото",
    "emoji": "⛩️",
    "flag": "🇯🇵",
    "name": "The Thousand Kyoto",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Киото",
    "address": "Киото, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Киото",
    "emoji": "⛩️",
    "flag": "🇯🇵",
    "name": "Hotel Granvia Kyoto",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 52000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Киото",
    "address": "Киото, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Осака",
    "emoji": "🍜",
    "flag": "🇯🇵",
    "name": "InterContinental Osaka",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 67000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Осака",
    "address": "Осака, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Осака",
    "emoji": "🍜",
    "flag": "🇯🇵",
    "name": "Cross Hotel Osaka",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 50000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Осака",
    "address": "Осака, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Осака",
    "emoji": "🍜",
    "flag": "🇯🇵",
    "name": "Hotel Monterey Grasmere Osaka",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 39000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Осака",
    "address": "Осака, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Саппоро",
    "emoji": "❄️",
    "flag": "🇯🇵",
    "name": "JR Tower Hotel Nikko Sapporo",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 62000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Саппоро",
    "address": "Саппоро, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "jp",
    "city": "Саппоро",
    "emoji": "❄️",
    "flag": "🇯🇵",
    "name": "Sapporo Grand Hotel",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 46000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Саппоро",
    "address": "Саппоро, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kr",
    "city": "Сеул",
    "emoji": "🌃",
    "flag": "🇰🇷",
    "name": "L7 Hongdae Seoul",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Сеул",
    "address": "Сеул, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kr",
    "city": "Сеул",
    "emoji": "🌃",
    "flag": "🇰🇷",
    "name": "Signiel Seoul",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 52000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Сеул",
    "address": "Сеул, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kr",
    "city": "Сеул",
    "emoji": "🌃",
    "flag": "🇰🇷",
    "name": "Four Points by Sheraton Josun Seoul Station",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Сеул",
    "address": "Сеул, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kr",
    "city": "Пусан",
    "emoji": "🌊",
    "flag": "🇰🇷",
    "name": "Paradise Hotel Busan",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 62000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Пусан",
    "address": "Пусан, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kr",
    "city": "Пусан",
    "emoji": "🌊",
    "flag": "🇰🇷",
    "name": "Lotte Hotel Busan",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 46000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Пусан",
    "address": "Пусан, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kr",
    "city": "Чеджу",
    "emoji": "🌋",
    "flag": "🇰🇷",
    "name": "Grand Hyatt Jeju",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 74000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Чеджу",
    "address": "Чеджу, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "kr",
    "city": "Чеджу",
    "emoji": "🌋",
    "flag": "🇰🇷",
    "name": "The Shilla Jeju",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 55000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Чеджу",
    "address": "Чеджу, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Пекин",
    "emoji": "🐉",
    "flag": "🇨🇳",
    "name": "The Peninsula Beijing",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Пекин",
    "address": "Пекин, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Пекин",
    "emoji": "🐉",
    "flag": "🇨🇳",
    "name": "Park Plaza Beijing Wangfujing",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Пекин",
    "address": "Пекин, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Шанхай",
    "emoji": "🌆",
    "flag": "🇨🇳",
    "name": "Fairmont Peace Hotel",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Шанхай",
    "address": "Шанхай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Шанхай",
    "emoji": "🌆",
    "flag": "🇨🇳",
    "name": "The Langham Shanghai Xintiandi",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 52000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Шанхай",
    "address": "Шанхай, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Гуанчжоу",
    "emoji": "🏯",
    "flag": "🇨🇳",
    "name": "LN Garden Hotel Guangzhou",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 47000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Гуанчжоу",
    "address": "Гуанчжоу, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Гуанчжоу",
    "emoji": "🏯",
    "flag": "🇨🇳",
    "name": "White Swan Hotel Guangzhou",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Гуанчжоу",
    "address": "Гуанчжоу, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Гонконг",
    "emoji": "🌃",
    "flag": "🇨🇳",
    "name": "The Peninsula Hong Kong",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 97000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Гонконг",
    "address": "Гонконг, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Гонконг",
    "emoji": "🌃",
    "flag": "🇨🇳",
    "name": "Cordis Hong Kong",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 72000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Гонконг",
    "address": "Гонконг, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "cn",
    "city": "Гонконг",
    "emoji": "🌃",
    "flag": "🇨🇳",
    "name": "Eaton HK",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Гонконг",
    "address": "Гонконг, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Нью-Йорк",
    "emoji": "🗽",
    "flag": "🇺🇸",
    "name": "The Plaza Hotel New York",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 148000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Нью-Йорк",
    "address": "Нью-Йорк, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Нью-Йорк",
    "emoji": "🗽",
    "flag": "🇺🇸",
    "name": "CitizenM New York Bowery",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 110000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Нью-Йорк",
    "address": "Нью-Йорк, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Нью-Йорк",
    "emoji": "🗽",
    "flag": "🇺🇸",
    "name": "Pod Times Square",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 85000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Нью-Йорк",
    "address": "Нью-Йорк, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Лос-Анджелес",
    "emoji": "🎬",
    "flag": "🇺🇸",
    "name": "The Hollywood Roosevelt",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 128000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Лос-Анджелес",
    "address": "Лос-Анджелес, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Лос-Анджелес",
    "emoji": "🎬",
    "flag": "🇺🇸",
    "name": "Freehand Los Angeles",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 95000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Лос-Анджелес",
    "address": "Лос-Анджелес, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Лос-Анджелес",
    "emoji": "🎬",
    "flag": "🇺🇸",
    "name": "Hotel Figueroa",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 74000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Лос-Анджелес",
    "address": "Лос-Анджелес, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Майами",
    "emoji": "🌴",
    "flag": "🇺🇸",
    "name": "Faena Hotel Miami Beach",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 121000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Майами",
    "address": "Майами, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Майами",
    "emoji": "🌴",
    "flag": "🇺🇸",
    "name": "The Palms Hotel and Spa",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 90000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Майами",
    "address": "Майами, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Лас-Вегас",
    "emoji": "🎰",
    "flag": "🇺🇸",
    "name": "Bellagio Las Vegas",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 94000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Лас-Вегас",
    "address": "Лас-Вегас, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Лас-Вегас",
    "emoji": "🎰",
    "flag": "🇺🇸",
    "name": "The Venetian Resort Las Vegas",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Лас-Вегас",
    "address": "Лас-Вегас, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Сан-Франциско",
    "emoji": "🌁",
    "flag": "🇺🇸",
    "name": "Fairmont San Francisco",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 141000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Сан-Франциско",
    "address": "Сан-Франциско, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "us",
    "city": "Сан-Франциско",
    "emoji": "🌁",
    "flag": "🇺🇸",
    "name": "Hotel Nikko San Francisco",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 105000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Сан-Франциско",
    "address": "Сан-Франциско, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gb",
    "city": "Лондон",
    "emoji": "🎡",
    "flag": "🇬🇧",
    "name": "The Savoy London",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 108000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Лондон",
    "address": "Лондон, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gb",
    "city": "Лондон",
    "emoji": "🎡",
    "flag": "🇬🇧",
    "name": "St. Pancras Renaissance Hotel",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 80000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Лондон",
    "address": "Лондон, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gb",
    "city": "Лондон",
    "emoji": "🎡",
    "flag": "🇬🇧",
    "name": "Zedwell Piccadilly Circus",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 62000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Лондон",
    "address": "Лондон, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gb",
    "city": "Эдинбург",
    "emoji": "🏰",
    "flag": "🇬🇧",
    "name": "The Balmoral Edinburgh",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 81000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Эдинбург",
    "address": "Эдинбург, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gb",
    "city": "Эдинбург",
    "emoji": "🏰",
    "flag": "🇬🇧",
    "name": "Motel One Edinburgh Royal",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 60000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Эдинбург",
    "address": "Эдинбург, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gb",
    "city": "Манчестер",
    "emoji": "🎸",
    "flag": "🇬🇧",
    "name": "Kimpton Clocktower Hotel",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 67000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Манчестер",
    "address": "Манчестер, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gb",
    "city": "Манчестер",
    "emoji": "🎸",
    "flag": "🇬🇧",
    "name": "The Midland Manchester",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 50000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Манчестер",
    "address": "Манчестер, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "de",
    "city": "Берлин",
    "emoji": "🧱",
    "flag": "🇩🇪",
    "name": "Hotel Adlon Kempinski Berlin",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 67000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Берлин",
    "address": "Берлин, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "de",
    "city": "Берлин",
    "emoji": "🧱",
    "flag": "🇩🇪",
    "name": "25hours Hotel Bikini Berlin",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 50000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Берлин",
    "address": "Берлин, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "de",
    "city": "Берлин",
    "emoji": "🧱",
    "flag": "🇩🇪",
    "name": "Motel One Berlin Alexanderplatz",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 39000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Берлин",
    "address": "Берлин, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "de",
    "city": "Мюнхен",
    "emoji": "🍺",
    "flag": "🇩🇪",
    "name": "Bayerischer Hof Munich",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 83000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Мюнхен",
    "address": "Мюнхен, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "de",
    "city": "Мюнхен",
    "emoji": "🍺",
    "flag": "🇩🇪",
    "name": "Cortiina Hotel Munich",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 62000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Мюнхен",
    "address": "Мюнхен, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "de",
    "city": "Гамбург",
    "emoji": "⚓",
    "flag": "🇩🇪",
    "name": "The Westin Hamburg",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 70000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Гамбург",
    "address": "Гамбург, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "de",
    "city": "Гамбург",
    "emoji": "⚓",
    "flag": "🇩🇪",
    "name": "Henri Hotel Hamburg Downtown",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 52000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Гамбург",
    "address": "Гамбург, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gr",
    "city": "Афины",
    "emoji": "🏛️",
    "flag": "🇬🇷",
    "name": "Hotel Grande Bretagne Athens",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Афины",
    "address": "Афины, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gr",
    "city": "Афины",
    "emoji": "🏛️",
    "flag": "🇬🇷",
    "name": "Coco-Mat Athens BC",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Афины",
    "address": "Афины, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gr",
    "city": "Санторини",
    "emoji": "🤍",
    "flag": "🇬🇷",
    "name": "Canaves Oia Suites",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 114000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Санторини",
    "address": "Санторини, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gr",
    "city": "Санторини",
    "emoji": "🤍",
    "flag": "🇬🇷",
    "name": "Santo Pure Oia Suites and Villas",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 85000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Санторини",
    "address": "Санторини, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gr",
    "city": "Крит",
    "emoji": "🏝️",
    "flag": "🇬🇷",
    "name": "Domes Noruz Chania",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 64000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Крит",
    "address": "Крит, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gr",
    "city": "Крит",
    "emoji": "🏝️",
    "flag": "🇬🇷",
    "name": "Creta Maris Resort",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 48000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Крит",
    "address": "Крит, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gr",
    "city": "Салоники",
    "emoji": "🌊",
    "flag": "🇬🇷",
    "name": "Electra Palace Thessaloniki",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 47000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Салоники",
    "address": "Салоники, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "gr",
    "city": "Салоники",
    "emoji": "🌊",
    "flag": "🇬🇷",
    "name": "Makedonia Palace",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Салоники",
    "address": "Салоники, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "eg",
    "city": "Каир",
    "emoji": "🐪",
    "flag": "🇪🇬",
    "name": "Marriott Mena House Cairo",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 47000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Каир",
    "address": "Каир, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "eg",
    "city": "Каир",
    "emoji": "🐪",
    "flag": "🇪🇬",
    "name": "Kempinski Nile Hotel Cairo",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Каир",
    "address": "Каир, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "eg",
    "city": "Шарм-эль-Шейх",
    "emoji": "🐠",
    "flag": "🇪🇬",
    "name": "Rixos Premium Seagate",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 56000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Шарм-эль-Шейх",
    "address": "Шарм-эль-Шейх, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "eg",
    "city": "Шарм-эль-Шейх",
    "emoji": "🐠",
    "flag": "🇪🇬",
    "name": "Savoy Sharm El Sheikh",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 42000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Шарм-эль-Шейх",
    "address": "Шарм-эль-Шейх, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "eg",
    "city": "Хургада",
    "emoji": "🏖️",
    "flag": "🇪🇬",
    "name": "Steigenberger Aldau Beach Hotel",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 48000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Хургада",
    "address": "Хургада, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "eg",
    "city": "Хургада",
    "emoji": "🏖️",
    "flag": "🇪🇬",
    "name": "Jaz Aquaviva",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 36000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Хургада",
    "address": "Хургада, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "eg",
    "city": "Александрия",
    "emoji": "⚓",
    "flag": "🇪🇬",
    "name": "Four Seasons Hotel Alexandria",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "pool",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Александрия",
    "address": "Александрия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "eg",
    "city": "Александрия",
    "emoji": "⚓",
    "flag": "🇪🇬",
    "name": "Steigenberger Cecil Hotel Alexandria",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 30000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Александрия",
    "address": "Александрия, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "uz",
    "city": "Ташкент",
    "emoji": "🏙️",
    "flag": "🇺🇿",
    "name": "Hyatt Regency Tashkent",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 35000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Ташкент",
    "address": "Ташкент, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "uz",
    "city": "Ташкент",
    "emoji": "🏙️",
    "flag": "🇺🇿",
    "name": "Hilton Tashkent City",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 26000,
    "amenities": [
      "beach",
      "pool",
      "spa"
    ],
    "desc": "Популярный вариант размещения в городе Ташкент",
    "address": "Ташкент, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "uz",
    "city": "Ташкент",
    "emoji": "🏙️",
    "flag": "🇺🇿",
    "name": "Lotte City Hotel Tashkent Palace",
    "stars": 3,
    "rating": null,
    "ratingCount": 0,
    "price": 20000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Ташкент",
    "address": "Ташкент, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "uz",
    "city": "Самарканд",
    "emoji": "🕌",
    "flag": "🇺🇿",
    "name": "Hilton Samarkand Regency",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 40000,
    "amenities": [
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Самарканд",
    "address": "Самарканд, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "uz",
    "city": "Самарканд",
    "emoji": "🕌",
    "flag": "🇺🇿",
    "name": "Movenpick Samarkand",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 30000,
    "amenities": [
      "spa",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Самарканд",
    "address": "Самарканд, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "uz",
    "city": "Бухара",
    "emoji": "🏺",
    "flag": "🇺🇿",
    "name": "Mercure Bukhara Old Town",
    "stars": 5,
    "rating": null,
    "ratingCount": 0,
    "price": 37000,
    "amenities": [
      "pool",
      "spa",
      "gym",
      "breakfast"
    ],
    "desc": "Популярный вариант размещения в городе Бухара",
    "address": "Бухара, центр",
    "phone": "",
    "website": ""
  },
  {
    "type": "hotel",
    "country": "uz",
    "city": "Бухара",
    "emoji": "🏺",
    "flag": "🇺🇿",
    "name": "Amelia Boutique Hotel Bukhara",
    "stars": 4,
    "rating": null,
    "ratingCount": 0,
    "price": 28000,
    "amenities": [
      "breakfast",
      "gym"
    ],
    "desc": "Популярный вариант размещения в городе Бухара",
    "address": "Бухара, центр",
    "phone": "",
    "website": ""
  }
];

// ── Рейтинги из localStorage ───────────────────────────────────────────────

const RATINGS_KEY = 'travelplan_ratings';

function loadRatings() {
  try { return JSON.parse(localStorage.getItem(RATINGS_KEY) || '{}'); } catch { return {}; }
}

function saveRating(itemKey, score) {
  const ratings = loadRatings();
  if (!ratings[itemKey]) ratings[itemKey] = { total: 0, count: 0 };
  ratings[itemKey].total += score;
  ratings[itemKey].count += 1;
  localStorage.setItem(RATINGS_KEY, JSON.stringify(ratings));
}

function getRating(itemKey) {
  const ratings = loadRatings();
  return ratings[itemKey] || null;
}

function getDestinationIdForCity(city) {
  const dest = (typeof DESTINATIONS !== 'undefined' && Array.isArray(DESTINATIONS))
    ? DESTINATIONS.find(d => d.city === city)
    : null;
  return dest?.id || String(city || '').toLowerCase().replace(/\s+/g, '_');
}

function getItemKey(item) {
  if (item.type === 'hotel') return `hotel_${item.name}`;
  // Рейсы к одному городу должны иметь один рейтинг/отзывы с топ-направлением.
  return `dest_${getDestinationIdForCity(item.city)}`;
}


function travelplanSlug(value) {
  return typeof tpTravelSlug === 'function' ? tpTravelSlug(value) : String(value || 'travel').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function feedLocalImageUrl(item) {
  if (item?.image_url || item?.imageUrl || item?.photo_url || item?.photo) {
    return item.image_url || item.imageUrl || item.photo_url || item.photo;
  }
  if (item?.type === 'hotel') {
    return typeof tpHotelImage === 'function'
      ? tpHotelImage(item?.name, item?.city)
      : `assets/images/hotels/${travelplanSlug(item?.name)}.jpg`;
  }
  return typeof tpCityImage === 'function'
    ? tpCityImage(item?.city)
    : `assets/images/cities/${travelplanSlug(item?.city)}.jpg`;
}

function feedFallbackImageUrl(item) {
  const query = item?.type === 'hotel'
    ? `${item?.name || 'hotel'} ${item?.city || ''} hotel exterior`
    : `${item?.city || 'city'} ${getFeedCountryName(item) || ''} skyline travel`;
  return typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(query, 1200, 800) : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80';
}

function feedImageUrl(item) {
  return feedLocalImageUrl(item);
}

function feedImageOnError(item) {
  const query = item?.type === 'hotel'
    ? `${item?.name || 'hotel'} ${item?.city || ''} hotel exterior`
    : `${item?.city || 'city'} ${getFeedCountryName(item) || ''} skyline travel`;
  return typeof tpImgOnError === 'function' ? tpImgOnError(query, 1200, 800) : `this.onerror=null;this.src='${feedFallbackImageUrl(item)}';`;
}

function feedImageAlt(item) {
  return item?.type === 'hotel' ? `Фото отеля ${item.name}` : `Фото города ${item.city}`;
}

function getFeedCountryName(item) {
  const city = item?.city || '';
  const code = item?.country || '';
  const byCity = (typeof CITY_OPTIONS !== 'undefined') ? CITY_OPTIONS.find(c => c.name === city) : null;
  if (byCity?.country) return byCity.country;
  const names = {
    kz: 'Казахстан', ru: 'Россия', cy: 'Кипр', tr: 'Турция', ae: 'ОАЭ', ge: 'Грузия',
    cz: 'Чехия', es: 'Испания', it: 'Италия', fr: 'Франция', th: 'Таиланд', jp: 'Япония',
    kr: 'Южная Корея', cn: 'Китай', us: 'США', gb: 'Великобритания', de: 'Германия',
    gr: 'Греция', eg: 'Египет', uz: 'Узбекистан'
  };
  return names[code] || '';
}

function getCombinedFeedRating(key) {
  const r = getRating(key);
  const reviews = loadFeedReviews(key);
  const savedTotal = r?.total || 0;
  const savedCount = r?.count || 0;
  const reviewTotal = reviews.reduce((sum, review) => sum + (Number(review.rating) || 0), 0);
  const reviewCount = reviews.length;
  const total = savedTotal + reviewTotal;
  const count = savedCount + reviewCount;
  return count > 0 ? { rating: parseFloat((total / count).toFixed(1)), count } : { rating: null, count: 0 };
}

function applyRatingsToItems(items) {
  return items.map(item => {
    const key = getItemKey(item);
    const combined = getCombinedFeedRating(key);
    return {
      ...item,
      price: item.type === 'flight' && typeof getRouteFlightPrice === 'function'
        ? getRouteFlightPrice(item.city, item.price)
        : item.price,
      rating: combined.rating,
      ratingCount: combined.count
    };
  });
}

const ALL_FEED_ITEMS_RAW = [...FEED_FLIGHTS, ...FEED_HOTELS];

function getFeedPlaceItems() {
  if (typeof CITY_PLACES === 'undefined') return [];
  const items = [];
  Object.entries(CITY_PLACES).forEach(([city, data]) => {
    const dest = (typeof DESTINATIONS !== 'undefined') ? DESTINATIONS.find(d => d.city === city) : null;
    const countryName = dest?.country && typeof PLACES_COUNTRY_NAMES !== 'undefined' ? PLACES_COUNTRY_NAMES[dest.country] : '';
    ['attractions', 'beauty'].forEach(category => {
      (data[category] || []).forEach((name, index) => {
        const entry = typeof tpPlaceEntry === 'function' ? tpPlaceEntry(name, category) : { price: 0, label: 'Бесплатно' };
        items.push({
          type: 'place', city, country: dest?.country || '', countryName,
          name, category, price: entry.price, entryPrice: entry.price, entryLabel: entry.label,
          desc: category === 'attractions' ? 'Достопримечательность' : 'Красивое место',
          index
        });
      });
    });
  });
  return items;
}


function feedDurationHours(durationText) {
  const text = String(durationText || '');
  const h = Number((text.match(/(\d+)\s*ч/) || [0, 0])[1] || 0);
  const m = Number((text.match(/(\d+)\s*мин/) || [0, 0])[1] || 0);
  return Math.round((h + m / 60) * 10) / 10;
}

function getBookableFlightVariant(city, rawItem, index = 0, fromCity = 'Алматы') {
  const source = (typeof SAMPLE_FLIGHTS !== 'undefined' && Array.isArray(SAMPLE_FLIGHTS) && SAMPLE_FLIGHTS.length)
    ? SAMPLE_FLIGHTS
    : [{ airline: rawItem.airline || 'Air Astana', time: rawItem.depart || '07:00', duration: '3ч 30мин', price: rawItem.price || 52000, class: 'Эконом' }];
  const seed = String(city || '').split('').reduce((sum, ch) => sum + ch.charCodeAt(0), 0) + index;
  const variantIndex = seed % source.length;
  const variant = source[variantIndex];
  const classMap = { 'Эконом': 'economy', 'Комфорт': 'comfort', 'Бизнес': 'business', 'Первый': 'first' };
  const routePrice = typeof getSearchFlightPrice === 'function'
    ? getSearchFlightPrice(city, variant.price, fromCity, variantIndex)
    : Number(rawItem.price || variant.price || 0);

  return {
    ...rawItem,
    airline: variant.airline,
    depart: variant.time,
    duration_text: variant.duration,
    duration_h: feedDurationHours(variant.duration),
    classType: classMap[variant.class] || 'economy',
    price: routePrice
  };
}

function getAllFeedItems() {
  const fromCity = (typeof getUserCity === 'function') ? getUserCity().name : 'Алматы';
  let rawItems = ALL_FEED_ITEMS_RAW;
  if (typeof tpApplyHotelAmenities === 'function') {
    const flights = rawItems.filter(i => i.type === 'flight');
    const hotels = tpApplyHotelAmenities(rawItems.filter(i => i.type === 'hotel'));
    rawItems = [...flights, ...hotels];
  }
  const bookableItems = rawItems
    .map((item, index) => item.type === 'flight'
      ? getBookableFlightVariant(item.city, item, index, fromCity)
      : item)
    .filter(item => !(item.type === 'flight' && item.city === fromCity))
    .filter(item => !(item.type === 'flight' && item.price === 0));

  return applyRatingsToItems(bookableItems);
}

// ── Состояние фильтров ─────────────────────────────────────────────────────

function toggleFilters() {
  feedFiltersVisible = !feedFiltersVisible;
  const panel = document.getElementById('filters-panel');
  const arrow = document.getElementById('filters-arrow');
  if (panel) panel.style.display = feedFiltersVisible ? '' : 'none';
  if (arrow) arrow.style.transform = feedFiltersVisible ? '' : 'rotate(-90deg)';
}

function setFeedType(type) {
  currentFeedType = type;
  document.querySelectorAll('.feed-type-btn').forEach(btn => {
    btn.className = 'feed-type-btn flex-1 py-2 rounded-xl text-sm font-medium bg-white/10 hover:bg-white/20 transition';
  });
  const active = document.getElementById(`ft-${type}`);
  if (active) active.className = 'feed-type-btn flex-1 py-2 rounded-xl text-sm font-medium bg-gradient-to-r from-sky-500 to-blue-600 transition';

  const flightFilters = ['filter-deptime-wrap', 'filter-stops-wrap', 'filter-class-wrap', 'filter-duration-wrap'];
  const hotelFilters  = ['filter-stars-wrap', 'filter-amenities-wrap'];

  flightFilters.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = (type === 'hotel') ? 'none' : '';
  });
  hotelFilters.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = (type === 'flight') ? 'none' : '';
  });
}

const FEED_FILTER_STATE_KEY = 'travelplan_feed_filters';

function getFeedFilterState() {
  return {
    type: currentFeedType,
    maxPrice: parseInt(document.getElementById('filter-price')?.value || '600000'),
    country: document.getElementById('filter-country')?.value || '',
    sort: document.getElementById('filter-sort')?.value || 'price_asc',
    deptime: document.getElementById('filter-deptime')?.value || '',
    stops: document.getElementById('filter-stops')?.value || '',
    classType: document.getElementById('filter-class')?.value || '',
    duration: document.getElementById('filter-duration')?.value || '',
    stars: document.getElementById('filter-stars')?.value || '',
    amenities: [...document.querySelectorAll('.amenity-cb:checked')].map(cb => cb.value)
  };
}

function saveFeedFilterState() {
  try { localStorage.setItem(FEED_FILTER_STATE_KEY, JSON.stringify(getFeedFilterState())); } catch {}
}

function restoreFeedFilterState() {
  let state = null;
  try { state = JSON.parse(localStorage.getItem(FEED_FILTER_STATE_KEY) || 'null'); } catch {}
  if (!state) return false;

  currentFeedType = state.type || 'all';
  setFeedType(currentFeedType);
  const set = (id, value) => { const el = document.getElementById(id); if (el) el.value = value ?? ''; };
  set('filter-price', state.maxPrice || 600000);
  const priceVal = document.getElementById('filter-price-val');
  if (priceVal) priceVal.textContent = String(state.maxPrice || 600000).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  set('filter-country', state.country || '');
  set('filter-sort', state.sort || 'price_asc');
  set('filter-deptime', state.deptime || '');
  set('filter-stops', state.stops || '');
  set('filter-class', state.classType || '');
  set('filter-duration', state.duration || '');
  set('filter-stars', state.stars || '');
  document.querySelectorAll('.amenity-cb').forEach(cb => cb.checked = (state.amenities || []).includes(cb.value));
  return true;
}

function updateFiltersBadge(state = getFeedFilterState()) {
  const badge = document.getElementById('filters-badge');
  const hasFilters = state.country || state.deptime || state.stops || state.classType || state.duration || state.stars || state.amenities.length > 0 || state.maxPrice < 600000 || state.type !== 'all';
  if (badge) badge.classList.toggle('hidden', !hasFilters);
}

function getFilteredFeedItems(state = getFeedFilterState()) {
  let items = getAllFeedItems();
  items = items.filter(item => {
    if (state.type !== 'all' && item.type !== state.type) return false;
    if (item.price > state.maxPrice) return false;
    if (state.country && item.country !== state.country) return false;

    if (item.type === 'flight') {
      if (state.deptime) {
        const h = parseInt(item.depart.split(':')[0]);
        if (state.deptime === 'morning' && !(h >= 6  && h < 12)) return false;
        if (state.deptime === 'day'     && !(h >= 12 && h < 18)) return false;
        if (state.deptime === 'evening' && !(h >= 18 && h < 24)) return false;
        if (state.deptime === 'night'   && !(h >= 0  && h < 6))  return false;
      }
      if (state.stops !== '') {
        const stopN = parseInt(state.stops);
        if (state.stops === '2' && item.stops < 2) return false;
        if (state.stops !== '2' && item.stops !== stopN) return false;
      }
      if (state.classType && item.classType !== state.classType) return false;
      if (state.duration) {
        if (state.duration === 'short'  && item.duration_h >= 3)  return false;
        if (state.duration === 'medium' && (item.duration_h < 3 || item.duration_h > 8)) return false;
        if (state.duration === 'long'   && item.duration_h <= 8)  return false;
      }
    }

    if (item.type === 'hotel') {
      if (state.stars && item.stars !== parseInt(state.stars)) return false;
      if (state.amenities.length > 0 && !state.amenities.every(a => (item.amenities || []).includes(a))) return false;
    }

    return true;
  });

  if (state.sort === 'price_asc')  items.sort((a, b) => a.price - b.price);
  if (state.sort === 'price_desc') items.sort((a, b) => b.price - a.price);
  if (state.sort === 'rating')     items.sort((a, b) => (b.rating || 0) - (a.rating || 0));
  if (state.sort === 'duration')   items.sort((a, b) => (a.duration_h || 0) - (b.duration_h || 0));
  if (state.sort === 'profile' && typeof tpSortByProfile === 'function') items = tpSortByProfile(items);

  return items;
}

function applyFeedFilters() {
  const state = getFeedFilterState();
  saveFeedFilterState();
  const items = getFilteredFeedItems(state);
  renderFeed(items);
  updateFiltersBadge(state);
  showToast(`Найдено: ${items.length} предложений`);
}

function resetFeedFilters() {
  document.getElementById('filter-price').value = 600000;
  document.getElementById('filter-price-val').textContent = '600 000';
  document.getElementById('filter-country').value = '';
  document.getElementById('filter-sort').value = 'price_asc';
  document.getElementById('filter-deptime').value = '';
  document.getElementById('filter-stops').value = '';
  document.getElementById('filter-class').value = '';
  document.getElementById('filter-duration').value = '';
  document.getElementById('filter-stars').value = '';
  document.querySelectorAll('.amenity-cb').forEach(cb => cb.checked = false);
  setFeedType('all');
  try { localStorage.removeItem(FEED_FILTER_STATE_KEY); } catch {}
  const state = getFeedFilterState();
  updateFiltersBadge(state);
  renderFeed(getFilteredFeedItems(state));
  showToast('Фильтры сброшены');
}

// ── Рейтинг UI ────────────────────────────────────────────────────────────

function renderStarRating(key, currentRating, count) {
  const avg = currentRating ? currentRating.toFixed(1) : null;
  const stars = [1,2,3,4,5].map(i => {
    const filled = currentRating && i <= Math.round(currentRating);
    return `<button onclick="submitFeedRating('${key}',${i})" class="text-xl transition hover:scale-110" title="${i} звезда">${filled ? '⭐' : '☆'}</button>`;
  }).join('');
  return `
    <div class="mt-3 pt-3 border-t border-white/10">
      <div class="text-sm font-semibold text-slate-300 mb-2">Ваша оценка</div>
      <div class="flex items-center gap-1">${stars}</div>
      ${avg ? `<div class="text-xs text-slate-400 mt-1">Средняя оценка: <span class="text-sky-400 font-semibold">${avg}/5</span> (${count} отзывов)</div>` : '<div class="text-xs text-slate-500 mt-1">Оценок пока нет</div>'}
    </div>`;
}

function submitFeedRating(key, score) {
  saveRating(key, score);
  showToast(`Оценка ${score}⭐ сохранена!`);
  // Перерендерить только текущий элемент внутри модалки
  const ratingEl = document.getElementById(`feed-detail-rating-${key}`);
  if (ratingEl) {
    const r = getRating(key);
    const avg = r && r.count > 0 ? parseFloat((r.total / r.count).toFixed(1)) : null;
    ratingEl.innerHTML = renderStarRating(key, avg, r ? r.count : 0);
  }
}

// ── Текстовые отзывы в модалках ленты ─────────────────────────────────────

const FEED_REVIEWS_KEY = 'travelplan_feed_reviews';

function feedKeyToDestinationId(key) {
  return String(key || '').startsWith('dest_') ? String(key).slice(5) : null;
}

function loadFeedReviews(key) {
  const destId = feedKeyToDestinationId(key);
  if (destId && typeof loadReviews === 'function') return loadReviews(destId);

  let localReviews = [];
  try {
    const raw = localStorage.getItem(FEED_REVIEWS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    localReviews = all[key] || [];
  } catch { localReviews = []; }

  const entityType = String(key || '').startsWith('hotel_') ? 'hotel' : 'flight';
  const supabaseReviews = typeof tpGetCachedReviews === 'function'
    ? tpGetCachedReviews(entityType, key)
    : [];

  return typeof tpMergeReviews === 'function'
    ? tpMergeReviews(localReviews, supabaseReviews)
    : [...supabaseReviews, ...localReviews];
}

function saveLocalFeedReview(key, review) {
  try {
    const raw = localStorage.getItem(FEED_REVIEWS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    if (!all[key]) all[key] = [];
    all[key].unshift(review);
    localStorage.setItem(FEED_REVIEWS_KEY, JSON.stringify(all));
  } catch {}
}

function removeLocalFeedReview(key, reviewId) {
  const destId = feedKeyToDestinationId(key);
  if (destId && typeof removeLocalDestinationReview === 'function') {
    removeLocalDestinationReview(destId, reviewId);
    return;
  }
  try {
    const raw = localStorage.getItem(FEED_REVIEWS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    all[key] = (all[key] || []).filter(r => String(r.id || '') !== String(reviewId));
    localStorage.setItem(FEED_REVIEWS_KEY, JSON.stringify(all));
  } catch {}
}

async function saveFeedReview(key, review) {
  const destId = feedKeyToDestinationId(key);
  if (destId && typeof saveReview === 'function') {
    return await saveReview(destId, review);
  }
  if (typeof dbAddReview === 'function') {
    try {
      const saved = await dbAddReview({
        entityType: String(key).startsWith('hotel_') ? 'hotel' : 'flight',
        entityId: key,
        authorName: review.author || (typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость'),
        rating: review.rating,
        comment: review.text || null,
        imageUrl: review.imageUrl || null
      });
      saveLocalFeedReview(key, { ...review, id: saved?.id || review.id });
      return saved;
    } catch (err) {
      if (err?.code === 'REVIEW_EXISTS') throw err;
      console.warn('Отзыв ленты сохранён локально, но не ушёл в Supabase:', err.message || err);
    }
  }
  saveLocalFeedReview(key, review);
  return review;
}

function renderFeedReviewItem(r, key) {
  const canDelete = typeof tpReviewBelongsToCurrentUser === 'function' && tpReviewBelongsToCurrentUser(r);
  const reviewId = jsString(r.id || '');
  return `
      <div class="bg-slate-800/50 rounded-xl p-4 mb-3">
        <div class="flex items-start gap-3">
          ${typeof renderReviewAvatar === 'function' ? renderReviewAvatar(r) : ''}
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-3 mb-1">
              <span class="font-semibold text-sm truncate">${tpReviewEscapeHtml ? tpReviewEscapeHtml(r.author) : r.author}</span>
              <span class="text-amber-400 text-sm shrink-0">${renderFeedReviewStars(r.rating)}</span>
            </div>
            ${r.text ? `<p class="text-slate-300 text-sm">${tpReviewEscapeHtml ? tpReviewEscapeHtml(r.text) : r.text}</p>` : ''}
            ${typeof renderReviewImage === 'function' ? renderReviewImage(r.imageUrl) : ''}
            <div class="flex items-center justify-between gap-3 mt-1">
              <p class="text-slate-600 text-xs">${r.date}</p>
              ${canDelete ? `<button onclick="event.stopPropagation(); deleteFeedReview('${jsString(key)}','${reviewId}')" class="text-xs text-red-300 hover:text-red-200 hover:underline">Удалить</button>` : ''}
            </div>
          </div>
        </div>
      </div>`;
}

async function deleteFeedReview(key, reviewId) {
  const review = loadFeedReviews(key).find(r => String(r.id || '') === String(reviewId));
  if (!review || !(typeof tpReviewBelongsToCurrentUser === 'function' && tpReviewBelongsToCurrentUser(review))) {
    showToast('Можно удалить только свой отзыв', 'error');
    return;
  }
  try {
    if (review._source === 'supabase' && typeof dbDeleteReview === 'function') await dbDeleteReview(review);
    removeLocalFeedReview(key, reviewId);
    const countEl = document.getElementById('feed-reviews-count');
    if (countEl) countEl.textContent = String(loadFeedReviews(key).length);
    const list = document.getElementById('feed-reviews-list');
    if (list) list.innerHTML = loadFeedReviews(key).map(r => renderFeedReviewItem(r, key)).join('') || '<p class="text-slate-500 text-sm text-center py-3">Пока нет отзывов.</p>';
    if (typeof renderFeed === 'function') renderFeed(getFilteredFeedItems(getFeedFilterState()));
    if (typeof renderTop3Destinations === 'function') renderTop3Destinations();
    showToast('Отзыв удалён. Теперь можно написать новый.');
  } catch (error) {
    showToast(error.message || 'Не удалось удалить отзыв', 'error');
  }
}

function renderFeedReviewStars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function pickFeedReviewStar(n) {
  window._feedReviewStarRating = n;
  document.querySelectorAll('.feed-review-star-btn').forEach(btn => {
    btn.style.color = parseInt(btn.dataset.star) <= n ? '#fbbf24' : '';
  });
}

function renderFeedReviewsSection(key, title = 'отзыв') {
  const reviews = loadFeedReviews(key);
  const reviewsHtml = reviews.length === 0
    ? '<p class="text-slate-500 text-sm text-center py-3">Пока нет отзывов. Можно оставить первым, цивилизация выдержит.</p>'
    : reviews.map(r => renderFeedReviewItem(r, key)).join('');
  const hasOwnReview = typeof tpHasOwnReview === 'function' && tpHasOwnReview(reviews);

  return `
    <div class="mt-4 pt-4 border-t border-white/10">
      <div class="mt-4 border-t border-white/10 pt-4">
        ${hasOwnReview ? `
          <div class="bg-sky-500/10 border border-sky-400/20 rounded-xl p-3 text-sm text-sky-100">
            Вы уже оставили отзыв. Чтобы написать новый, удалите старый.
          </div>` : `
          <h3 class="text-base font-semibold mb-1">✍️ Оставьте свой отзыв</h3>
          <div class="text-xs text-slate-400 mb-2">Отзыв будет опубликован от имени: <span class="text-sky-300 font-semibold">${typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость'}</span></div>
          <div class="flex gap-1 mb-2">
            ${[1,2,3,4,5].map(n => `<button class="feed-review-star-btn text-2xl text-slate-600 hover:text-amber-400 transition" data-star="${n}" onclick="pickFeedReviewStar(${n})">★</button>`).join('')}
          </div>
          <textarea id="feed-review-text" rows="3" placeholder="Комментарий можно не писать"
            class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-sm mb-3 focus:border-sky-500 focus:outline-none resize-none"></textarea>
          <div class="grid grid-cols-1 gap-2 mb-3">
            <input id="feed-review-image-file" type="file" accept="image/*" class="w-full text-xs text-slate-400 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20">
            <input id="feed-review-image-url" type="url" placeholder="Или ссылка на фото" class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-sm focus:border-sky-500 focus:outline-none">
          </div>
          <button onclick="submitFeedReview('${key}')"
            class="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-sm font-semibold hover:from-sky-400 hover:to-blue-500 transition">
            Опубликовать отзыв
          </button>`}
      </div>
    </div>
    <div class="mt-5 border-t border-white/10 pt-4">
      <h3 class="font-semibold mb-3">💬 Отзывы (<span id="feed-reviews-count">${reviews.length}</span>)</h3>
      <div id="feed-reviews-list">${reviewsHtml}</div>
    </div>`;
}

async function submitFeedReview(key) {
  if (typeof tpHasOwnReview === 'function' && tpHasOwnReview(loadFeedReviews(key))) {
    showToast('Вы уже оставили отзыв. Удалите его, чтобы написать новый.', 'error');
    return;
  }
  const author = typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость';
  const text = (document.getElementById('feed-review-text')?.value || '').trim();
  const rating = window._feedReviewStarRating || 0;

  if (!rating) { showToast('Выберите оценку', 'error'); return; }
  let imageUrl = null;
  try { imageUrl = typeof getReviewImageValue === 'function' ? await getReviewImageValue('feed-review-image-file', 'feed-review-image-url') : null; }
  catch (error) { showToast(error.message, 'error'); return; }

  try {
    await saveFeedReview(key, {
      id: `local_${Date.now()}`,
      _localUserId: (typeof tpGetCurrentReviewOwnerKey === 'function' ? tpGetCurrentReviewOwnerKey() : (window.travelplanCurrentUser?.id || 'guest')),
      userId: window.travelplanCurrentUser?.id || '',
      author, rating, text, imageUrl, avatarUrl: (typeof getCurrentReviewAvatarValue === 'function' ? getCurrentReviewAvatarValue() : ''),
      date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
    });
  } catch (error) {
    showToast(error.message || 'Не удалось сохранить отзыв', 'error');
    return;
  }

  const combined = getCombinedFeedRating(key);
  const ratingEl = document.getElementById('feed-detail-average-rating');
  if (ratingEl) ratingEl.textContent = combined.rating ? `★ ${combined.rating.toFixed(1)}` : '';
  const countEl = document.getElementById('feed-reviews-count');
  if (countEl) countEl.textContent = String(loadFeedReviews(key).length);

  const reviewsList = document.getElementById('feed-reviews-list');
  if (reviewsList) {
    const reviews = loadFeedReviews(key);
    reviewsList.innerHTML = reviews.map(r => renderFeedReviewItem(r, key)).join('');
  }

  
  document.getElementById('feed-review-text').value = '';
  const feedFile = document.getElementById('feed-review-image-file'); if (feedFile) feedFile.value = '';
  const feedUrl = document.getElementById('feed-review-image-url'); if (feedUrl) feedUrl.value = '';
  window._feedReviewStarRating = 0;
  document.querySelectorAll('.feed-review-star-btn').forEach(btn => btn.style.color = '');
  renderFeed(getFilteredFeedItems(getFeedFilterState()));
  if (typeof renderTop3Destinations === 'function') renderTop3Destinations();
  showToast('Отзыв опубликован!');
}

// ── Модальное окно ленты ──────────────────────────────────────────────────

function openFeedItemDetail(itemIndex) {
  const allItems = getAllFeedItems();
  const item = allItems[itemIndex];
  if (!item) return;

  const key = getItemKey(item);
  const fromCity = (typeof getUserCity === 'function') ? getUserCity().name : 'Алматы';
  const dest = (typeof DESTINATIONS !== 'undefined')
    ? DESTINATIONS.find(d => d.city === item.city)
    : null;

  const city = item.city;
  const title = item.type === 'hotel' ? item.name : item.city;
  const countryNameForModal = getFeedCountryName(item);
  const subtitle = item.type === 'hotel'
    ? `${item.city}, ${countryNameForModal}`
    : `${countryNameForModal}, ${item.airline} · вылет ${item.depart}`;
  const emoji = item.emoji || dest?.emoji || '✈️';
  const flag = item.flag || dest?.flag || '';
  const gradient = dest?.gradient || (item.type === 'hotel'
    ? 'from-amber-500/30 to-orange-600/30'
    : 'from-sky-500/30 to-blue-600/30');
  const flightPrice = item.type === 'flight'
    ? item.price
    : (typeof getRouteFlightPrice === 'function'
        ? getRouteFlightPrice(city, dest?.price || item.price)
        : (dest?.price || item.price));
  const hotelPrice = item.type === 'hotel'
    ? item.price
    : (dest?.hotelPrice || (typeof getHotelPriceForCity === 'function'
        ? getHotelPriceForCity(city, 0, 22000)
        : 22000));

  const reviews = loadFeedReviews(key);
  const combinedRating = getCombinedFeedRating(key);
  const avgRating = combinedRating.rating ? combinedRating.rating.toFixed(1) : null;

  const reviewsHtml = reviews.length === 0
    ? `<p class="text-slate-500 text-sm text-center py-4">Пока нет отзывов. Будьте первым!</p>`
    : reviews.map(r => `
      <div class="bg-slate-800/50 rounded-xl p-4 mb-3">
        <div class="flex items-start gap-3">
          ${typeof renderReviewAvatar === 'function' ? renderReviewAvatar(r) : ''}
          <div class="min-w-0 flex-1">
            <div class="flex items-center justify-between gap-3 mb-1">
              <span class="font-semibold text-sm truncate">${r.author}</span>
              <span class="text-amber-400 text-sm shrink-0">${renderFeedReviewStars(r.rating)}</span>
            </div>
            ${r.text ? `<p class="text-slate-300 text-sm">${r.text}</p>` : ''}
            ${typeof renderReviewImage === 'function' ? renderReviewImage(r.imageUrl) : ''}
            <p class="text-slate-600 text-xs mt-1">${r.date}</p>
          </div>
        </div>
      </div>`).join('');

  const contentHtml = `
    <div class="h-48 rounded-2xl mt-[5px] mb-5 overflow-hidden relative border border-white/10">
      <img src="${feedImageUrl(item)}" onerror="${feedImageOnError(item)}" alt="${feedImageAlt(item)}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent"></div>
      <div class="absolute left-4 bottom-4 right-4">
        <div class="text-xl font-bold text-white drop-shadow">${title}</div>
      </div>
    </div>
    <div class="flex justify-end mb-2">
      ${avgRating ? `<span id="feed-detail-average-rating" class="text-amber-400 font-semibold">★ ${avgRating}</span>` : `<span id="feed-detail-average-rating" class="text-amber-400 font-semibold"></span>`}
    </div>
    <p class="text-slate-400 text-sm mb-2">${subtitle}</p>
    ${typeof tpRenderTags === 'function' ? tpRenderTags(item) : ''}
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="bg-slate-800/50 rounded-xl p-3 text-center">
        <div class="text-xs text-slate-400 mb-1">✈️ Билет от</div>
        <div class="text-sky-400 font-bold">${flightPrice ? flightPrice.toLocaleString() + ' ₸' : 'вы уже здесь'}</div>
      </div>
      <div class="bg-slate-800/50 rounded-xl p-3 text-center">
        <div class="text-xs text-slate-400 mb-1">🏨 Отель от</div>
        <div class="text-amber-400 font-bold">${hotelPrice.toLocaleString()} ₸/ночь</div>
      </div>
    </div>
    <div class="flex gap-2 mb-5">
      <button onclick="selectDestination('${city}', 'flights');closeFeedDetailModal();"
        class="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-sm font-semibold hover:from-sky-400 hover:to-blue-500 transition">
        ✈️ Найти билеты
      </button>
      <button onclick="selectDestination('${city}', 'hotels');closeFeedDetailModal();"
        class="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-sm font-semibold hover:from-amber-400 hover:to-orange-500 transition">
        🏨 Найти отели
      </button>
    </div>
    <button onclick="closeFeedDetailModal();openPlacesForCity('${city}');"
      class="w-full py-2.5 mb-5 bg-white/10 border border-white/15 rounded-xl text-sm font-semibold hover:bg-white/20 transition">
      🗺️ Посмотреть интересные места
    </button>

    <div class="mt-4 border-t border-white/10 pt-4">
      <h3 class="text-base font-semibold mb-3">✍️ Оставьте свой отзыв</h3>
      <div class="text-xs text-slate-400 mb-2">Отзыв будет опубликован от имени: <span class="text-sky-300 font-semibold">${typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость'}</span></div>
      <div class="flex gap-1 mb-2" id="feed-review-star-picker">
        ${[1,2,3,4,5].map(n => `<button class="feed-review-star-btn text-2xl text-slate-600 hover:text-amber-400 transition" data-star="${n}" onclick="pickFeedReviewStar(${n})">★</button>`).join('')}
      </div>
      <textarea id="feed-review-text" rows="3" placeholder="Комментарий можно не писать"
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-sm mb-3 focus:border-sky-500 focus:outline-none resize-none"></textarea>
      <div class="grid grid-cols-1 gap-2 mb-3">
        <input id="feed-review-image-file" type="file" accept="image/*" class="w-full text-xs text-slate-400 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20">
        <input id="feed-review-image-url" type="url" placeholder="Или ссылка на фото" class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-sm focus:border-sky-500 focus:outline-none">
      </div>
      <button onclick="submitFeedReview('${key}')"
        class="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-sm font-semibold hover:from-sky-400 hover:to-blue-500 transition">
        Опубликовать отзыв
      </button>
    </div>

    <div class="mt-5 border-t border-white/10 pt-4">
      <h3 class="font-semibold mb-3">💬 Отзывы (<span id="feed-reviews-count">${reviews.length}</span>)</h3>
      <div id="feed-reviews-list">${reviewsHtml}</div>
    </div>
  `;

  document.getElementById('feed-detail-content').innerHTML = contentHtml;
  window._feedReviewStarRating = 0;
  openFeedDetailModal();
}
// ── Рендер ─────────────────────────────────────────────────────────────────

function renderFeed(items) {
  const container = document.getElementById('feed-results');
  if (!container) return;

  if (items.length === 0) {
    container.innerHTML = `
      <div class="card-gradient rounded-2xl p-12 text-center">
        <div class="text-5xl mb-4">🔍</div>
        <h3 class="text-xl font-semibold mb-2">Ничего не найдено</h3>
        <p class="text-slate-400">Попробуйте изменить фильтры</p>
      </div>`;
    return;
  }

  // Сохраняем индексы в оригинальном массиве
  const allItems = getAllFeedItems();

  container.innerHTML = items.map(item => {
    // Находим индекс в allItems
    const idx = allItems.findIndex(i =>
      i.type === item.type &&
      (item.type === 'hotel' ? i.name === item.name : (i.city === item.city && i.airline === item.airline))
    );
    if (item.type === 'place') return renderPlaceFeedCard(item);
    return item.type === 'flight'
      ? renderFlightCard(item, idx)
      : renderHotelCard(item, idx);
  }).join('');
}

function renderFlightCard(f, idx) {
  const classLabel = { economy: 'Эконом', comfort: 'Комфорт', business: 'Бизнес', first: 'Первый' }[f.classType] || 'Эконом';
  const ratingStr  = f.rating ? `⭐ ${f.rating}/5 (${f.ratingCount})` : '☆ нет оценок';
  const durationText = f.duration_text || `${f.duration_h}ч`;
  const countryName = getFeedCountryName(f);
  return `
    <div class="card-gradient rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:ring-1 hover:ring-sky-500/40 transition"
         onclick="openFeedItemDetail(${idx})">
      <div class="flex items-center gap-4">
        <div class="w-20 h-16 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/10">
          <img src="${feedImageUrl(f)}" onerror="${feedImageOnError(f)}" alt="${feedImageAlt(f)}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/10"></div>
        </div>
        <div>
          <div class="font-semibold text-lg">✈️ ${f.city}</div>
          <div class="text-slate-400 text-sm">${countryName}, ${f.airline} · вылет ${f.depart}</div>
          <div class="flex gap-3 mt-1 text-xs text-slate-500">
            <span>⏱ ${durationText}</span>
            <span>💺 ${classLabel}</span>
          </div>
          ${typeof tpRenderBadges === 'function' ? tpRenderBadges(f) : ''}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <div class="text-xl font-bold text-sky-400">${f.price.toLocaleString()} ₸</div>
          <div class="text-xs text-slate-500">${ratingStr}</div>
        </div>
        <button onclick="event.stopPropagation();selectDestination('${f.city}')"
          class="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg font-semibold text-sm hover:from-sky-400 hover:to-blue-500 transition">
          Найти билет
        </button>
      </div>
    </div>`;
}

function renderHotelCard(h, idx) {
  const amenityIcons = { pool:'🏊', spa:'💆', gym:'🏋️', beach:'🏖️', breakfast:'🍳' };
  const amenitiesStr = h.amenities.map(a => amenityIcons[a] || '').join(' ');
  const ratingStr    = h.rating ? `${h.rating}/5 ⭐ (${h.ratingCount})` : '☆ нет оценок';
  const countryName = getFeedCountryName(h);
  return `
    <div class="card-gradient rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:ring-1 hover:ring-amber-500/40 transition"
         onclick="openFeedItemDetail(${idx})">
      <div class="flex items-center gap-4">
        <div class="w-20 h-16 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/10">
          <img src="${feedImageUrl(h)}" onerror="${feedImageOnError(h)}" alt="${feedImageAlt(h)}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/10"></div>
        </div>
        <div>
          <div class="font-semibold text-lg">🏨 ${h.name}</div>
          <div class="text-slate-400 text-sm">${h.city}, ${countryName} · ${'⭐'.repeat(h.stars)}</div>
          ${typeof tpRenderAmenityChips === 'function' ? tpRenderAmenityChips(h.amenities) : ''}
          ${typeof tpRenderBadges === 'function' ? tpRenderBadges(h) : ''}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <div class="text-xl font-bold text-sky-400">${h.price.toLocaleString()} ₸</div>
          <div class="text-xs text-slate-500">${ratingStr}</div>
        </div>
        <button onclick="event.stopPropagation();selectDestination('${h.city}', 'hotels')"
          class="px-4 py-2 bg-gradient-to-r from-sky-500 to-blue-600 rounded-lg font-semibold text-sm hover:from-sky-400 hover:to-blue-500 transition">
          Смотреть отели
        </button>
      </div>
    </div>`;
}


function renderPlaceFeedCard(p) {
  const image = typeof getPlacePhoto === 'function' ? getPlacePhoto(p.name, p.city) : (typeof tpPlaceImage === 'function' ? tpPlaceImage(p.city, p.name) : '');
  const categoryLabel = p.category === 'attractions' ? 'Достопримечательность' : 'Красивое место';
  return `
    <div class="card-gradient rounded-xl p-4 md:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:ring-1 hover:ring-emerald-500/40 transition"
         onclick="openPlaceDetail('${jsString(p.city)}','${p.category}',${p.index})">
      <div class="flex items-center gap-4">
        <div class="w-20 h-16 rounded-xl overflow-hidden relative flex-shrink-0 border border-white/10">
          <img src="${image}" onerror="${typeof tpImgOnError === 'function' ? tpImgOnError(p.name + ' ' + p.city, 600, 400) : ''}" alt="${p.name}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-black/15"></div>
        </div>
        <div>
          <div class="font-semibold text-lg">🗺️ ${p.name}</div>
          <div class="text-slate-400 text-sm">${p.city}, ${p.countryName || ''} · ${categoryLabel}</div>
          ${typeof tpRenderBadges === 'function' ? tpRenderBadges(p) : ''}
        </div>
      </div>
      <div class="flex items-center gap-4">
        <div class="text-right">
          <div class="text-lg font-bold ${p.entryPrice ? 'text-amber-400' : 'text-emerald-400'}">${p.entryLabel}</div>
        </div>
        <button onclick="event.stopPropagation();openPlaceDetail('${jsString(p.city)}','${p.category}',${p.index})"
          class="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg font-semibold text-sm hover:from-emerald-400 hover:to-teal-500 transition">
          Смотреть
        </button>
      </div>
    </div>`;
}

function initFeed() {
  restoreFeedFilterState();
  const state = getFeedFilterState();
  updateFiltersBadge(state);
  renderFeed(getFilteredFeedItems(state));
}

window.addEventListener('travelplan:reviews-loaded', () => {
  const feed = document.getElementById('feed-results');
  if (feed) {
    const state = getFeedFilterState();
    renderFeed(getFilteredFeedItems(state));
  }
  if (typeof renderTop3Destinations === 'function') renderTop3Destinations();
  if (typeof renderPersonalSection === 'function') renderPersonalSection();
});

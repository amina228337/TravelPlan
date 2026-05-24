// =============================================
//  destinations.js - данные направлений и рендер карточек
//  Базовые цены в одну сторону, в интерфейсе корректируются по выбранному городу
// =============================================

const DESTINATIONS = [
  {
    "id": "almaty",
    "country": "kz",
    "city": "Алматы",
    "flag": "🇰🇿",
    "emoji": "🏔️",
    "desc": "Горы, кофе и быстрые выезды в Чарын",
    "price": 18000,
    "tag": "Популярно",
    "tagColor": "sky",
    "gradient": "from-sky-500/30 to-blue-600/30",
    "hotelPrice": 22000
  },
  {
    "id": "astana",
    "country": "kz",
    "city": "Астана",
    "flag": "🇰🇿",
    "emoji": "🏛️",
    "desc": "Футуристичная столица степи",
    "price": 17800,
    "tag": "Хит",
    "tagColor": "amber",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 26000
  },
  {
    "id": "shymkent",
    "country": "kz",
    "city": "Шымкент",
    "flag": "🇰🇿",
    "emoji": "🌿",
    "desc": "Юг, рынки и мягкий климат",
    "price": 12500,
    "tag": "Красиво",
    "tagColor": "purple",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 18000
  },
  {
    "id": "aktau",
    "country": "kz",
    "city": "Актау",
    "flag": "🇰🇿",
    "emoji": "🏖️",
    "desc": "Каспий, скалы и пляжи",
    "price": 38000,
    "tag": "Культура",
    "tagColor": "orange",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 21000
  },
  {
    "id": "turkistan",
    "country": "kz",
    "city": "Туркестан",
    "flag": "🇰🇿",
    "emoji": "🕌",
    "desc": "Мавзолеи, история и новый туристический район",
    "price": 26000,
    "tag": "Море",
    "tagColor": "cyan",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 19000
  },
  {
    "id": "burabay",
    "country": "kz",
    "city": "Бурабай",
    "flag": "🇰🇿",
    "emoji": "🌲",
    "desc": "Озёра, лес и короткий отдых от города",
    "price": 24000,
    "tag": "Гастро",
    "tagColor": "emerald",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 30000
  },
  {
    "id": "moscow",
    "country": "ru",
    "city": "Москва",
    "flag": "🇷🇺",
    "emoji": "🏰",
    "desc": "Музеи, театры и большой город",
    "price": 74200,
    "tag": "Хит",
    "tagColor": "amber",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 52000
  },
  {
    "id": "spb",
    "country": "ru",
    "city": "Санкт-Петербург",
    "flag": "🇷🇺",
    "emoji": "🌉",
    "desc": "Мосты, дворцы и северная романтика",
    "price": 74600,
    "tag": "Красиво",
    "tagColor": "purple",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 45000
  },
  {
    "id": "sochi",
    "country": "ru",
    "city": "Сочи",
    "flag": "🇷🇺",
    "emoji": "🌊",
    "desc": "Море, горы и курортный ритм",
    "price": 52000,
    "tag": "Культура",
    "tagColor": "orange",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 38000
  },
  {
    "id": "kazan",
    "country": "ru",
    "city": "Казань",
    "flag": "🇷🇺",
    "emoji": "🕌",
    "desc": "Кремль, татарская кухня и уютный центр",
    "price": 72000,
    "tag": "Море",
    "tagColor": "cyan",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 32000
  },
  {
    "id": "kaliningrad",
    "country": "ru",
    "city": "Калининград",
    "flag": "🇷🇺",
    "emoji": "🏰",
    "desc": "Балтика, немецкая архитектура и янтарь",
    "price": 88000,
    "tag": "Гастро",
    "tagColor": "emerald",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 35000
  },
  {
    "id": "larnaca",
    "country": "cy",
    "city": "Ларнака",
    "flag": "🇨🇾",
    "emoji": "🌊",
    "desc": "Пляжи, набережная и спокойный старт по Кипру",
    "price": 112000,
    "tag": "Красиво",
    "tagColor": "purple",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "paphos",
    "country": "cy",
    "city": "Пафос",
    "flag": "🇨🇾",
    "emoji": "🏛️",
    "desc": "Античность, бухты и курортный вайб",
    "price": 118000,
    "tag": "Культура",
    "tagColor": "orange",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 52000
  },
  {
    "id": "limassol",
    "country": "cy",
    "city": "Лимассол",
    "flag": "🇨🇾",
    "emoji": "⛵",
    "desc": "Марина, рестораны и город у моря",
    "price": 120000,
    "tag": "Море",
    "tagColor": "cyan",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 60000
  },
  {
    "id": "nicosia",
    "country": "cy",
    "city": "Никосия",
    "flag": "🇨🇾",
    "emoji": "🏙️",
    "desc": "Столица острова, музеи и старый город",
    "price": 116000,
    "tag": "Гастро",
    "tagColor": "emerald",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 45000
  },
  {
    "id": "ayianapa",
    "country": "cy",
    "city": "Айя-Напа",
    "flag": "🇨🇾",
    "emoji": "🏖️",
    "desc": "Пляжи, вечеринки и прозрачная вода",
    "price": 122000,
    "tag": "Выгодно",
    "tagColor": "pink",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 48000
  },
  {
    "id": "istanbul",
    "country": "tr",
    "city": "Стамбул",
    "flag": "🇹🇷",
    "emoji": "🕌",
    "desc": "Босфор, базары и два континента",
    "price": 61600,
    "tag": "Культура",
    "tagColor": "orange",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 30000
  },
  {
    "id": "antalya",
    "country": "tr",
    "city": "Анталья",
    "flag": "🇹🇷",
    "emoji": "🏖️",
    "desc": "Море, all-inclusive и старый город",
    "price": 24200,
    "tag": "Море",
    "tagColor": "cyan",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 28000
  },
  {
    "id": "cappadocia",
    "country": "tr",
    "city": "Каппадокия",
    "flag": "🇹🇷",
    "emoji": "🎈",
    "desc": "Шары, пещерные отели и марсианские долины",
    "price": 76000,
    "tag": "Гастро",
    "tagColor": "emerald",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "izmir",
    "country": "tr",
    "city": "Измир",
    "flag": "🇹🇷",
    "emoji": "🌅",
    "desc": "Эгейское море, набережная и античные выезды",
    "price": 72000,
    "tag": "Выгодно",
    "tagColor": "pink",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 33000
  },
  {
    "id": "dubai",
    "country": "ae",
    "city": "Дубай",
    "flag": "🇦🇪",
    "emoji": "🏙️",
    "desc": "Роскошь, пляжи и архитектура будущего",
    "price": 90100,
    "tag": "Море",
    "tagColor": "cyan",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 65000
  },
  {
    "id": "abudhabi",
    "country": "ae",
    "city": "Абу-Даби",
    "flag": "🇦🇪",
    "emoji": "🕌",
    "desc": "Мечети, музеи и спокойный люкс",
    "price": 95000,
    "tag": "Гастро",
    "tagColor": "emerald",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 70000
  },
  {
    "id": "sharjah",
    "country": "ae",
    "city": "Шарджа",
    "flag": "🇦🇪",
    "emoji": "🎨",
    "desc": "Музеи, культура и более тихий отдых",
    "price": 85000,
    "tag": "Выгодно",
    "tagColor": "pink",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 40000
  },
  {
    "id": "tbilisi",
    "country": "ge",
    "city": "Тбилиси",
    "flag": "🇬🇪",
    "emoji": "🍷",
    "desc": "Старый город, вино и горные виды",
    "price": 72000,
    "tag": "Гастро",
    "tagColor": "emerald",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 28000
  },
  {
    "id": "batumi",
    "country": "ge",
    "city": "Батуми",
    "flag": "🇬🇪",
    "emoji": "🌊",
    "desc": "Море, неон и аджарский вайб",
    "price": 76000,
    "tag": "Выгодно",
    "tagColor": "pink",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 30000
  },
  {
    "id": "kutaisi",
    "country": "ge",
    "city": "Кутаиси",
    "flag": "🇬🇪",
    "emoji": "🏞️",
    "desc": "Каньоны, монастыри и база для выездов",
    "price": 68000,
    "tag": "Семейно",
    "tagColor": "sky",
    "gradient": "from-indigo-500/30 to-blue-600/30",
    "hotelPrice": 22000
  },
  {
    "id": "prague",
    "country": "cz",
    "city": "Прага",
    "flag": "🇨🇿",
    "emoji": "🏰",
    "desc": "Готика, мосты и трамваи",
    "price": 135000,
    "tag": "Выгодно",
    "tagColor": "pink",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "karlovyvary",
    "country": "cz",
    "city": "Карловы Вары",
    "flag": "🇨🇿",
    "emoji": "♨️",
    "desc": "Спа, колоннады и красивый курорт",
    "price": 145000,
    "tag": "Семейно",
    "tagColor": "sky",
    "gradient": "from-indigo-500/30 to-blue-600/30",
    "hotelPrice": 45000
  },
  {
    "id": "brno",
    "country": "cz",
    "city": "Брно",
    "flag": "🇨🇿",
    "emoji": "🍺",
    "desc": "Студенческий город, кафе и замки рядом",
    "price": 132000,
    "tag": "Уютно",
    "tagColor": "amber",
    "gradient": "from-sky-500/30 to-blue-600/30",
    "hotelPrice": 32000
  },
  {
    "id": "barcelona",
    "country": "es",
    "city": "Барселона",
    "flag": "🇪🇸",
    "emoji": "🎨",
    "desc": "Гауди, море и архитектурный перегрев мозга",
    "price": 150000,
    "tag": "Семейно",
    "tagColor": "sky",
    "gradient": "from-indigo-500/30 to-blue-600/30",
    "hotelPrice": 56000
  },
  {
    "id": "madrid",
    "country": "es",
    "city": "Мадрид",
    "flag": "🇪🇸",
    "emoji": "🖼️",
    "desc": "Музеи, площади и ночная жизнь",
    "price": 155000,
    "tag": "Уютно",
    "tagColor": "amber",
    "gradient": "from-sky-500/30 to-blue-600/30",
    "hotelPrice": 52000
  },
  {
    "id": "valencia",
    "country": "es",
    "city": "Валенсия",
    "flag": "🇪🇸",
    "emoji": "🍊",
    "desc": "Пляжи, футуризм и паэлья",
    "price": 148000,
    "tag": "Премиум",
    "tagColor": "purple",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 46000
  },
  {
    "id": "seville",
    "country": "es",
    "city": "Севилья",
    "flag": "🇪🇸",
    "emoji": "💃",
    "desc": "Фламенко, дворцы и жара с характером",
    "price": 152000,
    "tag": "Популярно",
    "tagColor": "orange",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "mallorca",
    "country": "es",
    "city": "Майорка",
    "flag": "🇪🇸",
    "emoji": "🏝️",
    "desc": "Бухты, серпантины и пляжный отдых",
    "price": 165000,
    "tag": "Хит",
    "tagColor": "cyan",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 60000
  },
  {
    "id": "rome",
    "country": "it",
    "city": "Рим",
    "flag": "🇮🇹",
    "emoji": "🏛️",
    "desc": "Вечный город, руины и паста",
    "price": 77100,
    "tag": "Уютно",
    "tagColor": "amber",
    "gradient": "from-sky-500/30 to-blue-600/30",
    "hotelPrice": 52000
  },
  {
    "id": "milan",
    "country": "it",
    "city": "Милан",
    "flag": "🇮🇹",
    "emoji": "👗",
    "desc": "Мода, собор и удобный север Италии",
    "price": 82000,
    "tag": "Премиум",
    "tagColor": "purple",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 56000
  },
  {
    "id": "venice",
    "country": "it",
    "city": "Венеция",
    "flag": "🇮🇹",
    "emoji": "🚤",
    "desc": "Каналы, острова и романтика",
    "price": 88000,
    "tag": "Популярно",
    "tagColor": "orange",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 65000
  },
  {
    "id": "florence",
    "country": "it",
    "city": "Флоренция",
    "flag": "🇮🇹",
    "emoji": "🎨",
    "desc": "Ренессанс, галереи и тосканская еда",
    "price": 90000,
    "tag": "Хит",
    "tagColor": "cyan",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 50000
  },
  {
    "id": "naples",
    "country": "it",
    "city": "Неаполь",
    "flag": "🇮🇹",
    "emoji": "🍕",
    "desc": "Пицца, море и выезды к Помпеям",
    "price": 86000,
    "tag": "Красиво",
    "tagColor": "emerald",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 38000
  },
  {
    "id": "paris",
    "country": "fr",
    "city": "Париж",
    "flag": "🇫🇷",
    "emoji": "🗼",
    "desc": "Музеи, архитектура и вечная классика",
    "price": 85000,
    "tag": "Премиум",
    "tagColor": "purple",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 65000
  },
  {
    "id": "nice",
    "country": "fr",
    "city": "Ницца",
    "flag": "🇫🇷",
    "emoji": "🌊",
    "desc": "Лазурный берег и променад у моря",
    "price": 90000,
    "tag": "Популярно",
    "tagColor": "orange",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 62000
  },
  {
    "id": "lyon",
    "country": "fr",
    "city": "Лион",
    "flag": "🇫🇷",
    "emoji": "🍷",
    "desc": "Гастрономия, старый город и реки",
    "price": 88000,
    "tag": "Хит",
    "tagColor": "cyan",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "marseille",
    "country": "fr",
    "city": "Марсель",
    "flag": "🇫🇷",
    "emoji": "⚓",
    "desc": "Порт, каланки и южный темперамент",
    "price": 92000,
    "tag": "Красиво",
    "tagColor": "emerald",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 40000
  },
  {
    "id": "bangkok",
    "country": "th",
    "city": "Бангкок",
    "flag": "🇹🇭",
    "emoji": "🛕",
    "desc": "Храмы, рынки и уличная еда",
    "price": 79600,
    "tag": "Популярно",
    "tagColor": "orange",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 26000
  },
  {
    "id": "phuket",
    "country": "th",
    "city": "Пхукет",
    "flag": "🇹🇭",
    "emoji": "🏝️",
    "desc": "Пляжи, острова и курортная классика",
    "price": 89400,
    "tag": "Хит",
    "tagColor": "cyan",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 36000
  },
  {
    "id": "pattaya",
    "country": "th",
    "city": "Паттайя",
    "flag": "🇹🇭",
    "emoji": "🌴",
    "desc": "Море, развлечения и быстрый выезд из Бангкока",
    "price": 85000,
    "tag": "Красиво",
    "tagColor": "emerald",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 22000
  },
  {
    "id": "chiangmai",
    "country": "th",
    "city": "Чиангмай",
    "flag": "🇹🇭",
    "emoji": "🌺",
    "desc": "Горы, храмы и северная культура",
    "price": 87000,
    "tag": "Культура",
    "tagColor": "pink",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 20000
  },
  {
    "id": "samui",
    "country": "th",
    "city": "Самуи",
    "flag": "🇹🇭",
    "emoji": "🥥",
    "desc": "Пальмы, виллы и спокойный остров",
    "price": 98000,
    "tag": "Море",
    "tagColor": "sky",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "tokyo",
    "country": "jp",
    "city": "Токио",
    "flag": "🇯🇵",
    "emoji": "🏯",
    "desc": "Неон, храмы и идеальный хаос",
    "price": 80000,
    "tag": "Хит",
    "tagColor": "cyan",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 70000
  },
  {
    "id": "kyoto",
    "country": "jp",
    "city": "Киото",
    "flag": "🇯🇵",
    "emoji": "⛩️",
    "desc": "Храмы, сады и старая Япония",
    "price": 85000,
    "tag": "Красиво",
    "tagColor": "emerald",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 52000
  },
  {
    "id": "osaka",
    "country": "jp",
    "city": "Осака",
    "flag": "🇯🇵",
    "emoji": "🍜",
    "desc": "Еда, замок и яркие улицы",
    "price": 88000,
    "tag": "Культура",
    "tagColor": "pink",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 50000
  },
  {
    "id": "sapporo",
    "country": "jp",
    "city": "Саппоро",
    "flag": "🇯🇵",
    "emoji": "❄️",
    "desc": "Снег, фестивали и Хоккайдо",
    "price": 98000,
    "tag": "Море",
    "tagColor": "sky",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 46000
  },
  {
    "id": "seoul",
    "country": "kr",
    "city": "Сеул",
    "flag": "🇰🇷",
    "emoji": "🌃",
    "desc": "Неон, дворцы и районы для ночных прогулок",
    "price": 145000,
    "tag": "Красиво",
    "tagColor": "emerald",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 52000
  },
  {
    "id": "busan",
    "country": "kr",
    "city": "Пусан",
    "flag": "🇰🇷",
    "emoji": "🌊",
    "desc": "Пляжи, рыба и портовый город",
    "price": 150000,
    "tag": "Культура",
    "tagColor": "pink",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 46000
  },
  {
    "id": "jeju",
    "country": "kr",
    "city": "Чеджу",
    "flag": "🇰🇷",
    "emoji": "🌋",
    "desc": "Вулкан, море и островной отдых",
    "price": 160000,
    "tag": "Море",
    "tagColor": "sky",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 55000
  },
  {
    "id": "beijing",
    "country": "cn",
    "city": "Пекин",
    "flag": "🇨🇳",
    "emoji": "🐉",
    "desc": "Запретный город и Великая стена",
    "price": 115000,
    "tag": "Культура",
    "tagColor": "pink",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "shanghai",
    "country": "cn",
    "city": "Шанхай",
    "flag": "🇨🇳",
    "emoji": "🌆",
    "desc": "Небоскрёбы, набережная и скорость",
    "price": 120000,
    "tag": "Море",
    "tagColor": "sky",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 52000
  },
  {
    "id": "guangzhou",
    "country": "cn",
    "city": "Гуанчжоу",
    "flag": "🇨🇳",
    "emoji": "🏯",
    "desc": "Торговый хаб и южная кухня",
    "price": 100800,
    "tag": "Гастро",
    "tagColor": "amber",
    "gradient": "from-indigo-500/30 to-blue-600/30",
    "hotelPrice": 35000
  },
  {
    "id": "hongkong",
    "country": "cn",
    "city": "Гонконг",
    "flag": "🇨🇳",
    "emoji": "🌃",
    "desc": "Гавань, небоскрёбы и острова",
    "price": 140000,
    "tag": "Выгодно",
    "tagColor": "purple",
    "gradient": "from-sky-500/30 to-blue-600/30",
    "hotelPrice": 72000
  },
  {
    "id": "nyc",
    "country": "us",
    "city": "Нью-Йорк",
    "flag": "🇺🇸",
    "emoji": "🗽",
    "desc": "Манхэттен, музеи и большой городской шум",
    "price": 310000,
    "tag": "Море",
    "tagColor": "sky",
    "gradient": "from-red-500/30 to-orange-600/30",
    "hotelPrice": 110000
  },
  {
    "id": "la",
    "country": "us",
    "city": "Лос-Анджелес",
    "flag": "🇺🇸",
    "emoji": "🎬",
    "desc": "Голливуд, пляжи и бесконечные дороги",
    "price": 295000,
    "tag": "Гастро",
    "tagColor": "amber",
    "gradient": "from-indigo-500/30 to-blue-600/30",
    "hotelPrice": 95000
  },
  {
    "id": "miami",
    "country": "us",
    "city": "Майами",
    "flag": "🇺🇸",
    "emoji": "🌴",
    "desc": "Пляжи, арт-деко и ночная жизнь",
    "price": 320000,
    "tag": "Выгодно",
    "tagColor": "purple",
    "gradient": "from-sky-500/30 to-blue-600/30",
    "hotelPrice": 90000
  },
  {
    "id": "lasvegas",
    "country": "us",
    "city": "Лас-Вегас",
    "flag": "🇺🇸",
    "emoji": "🎰",
    "desc": "Шоу, отели и пустыня рядом",
    "price": 300000,
    "tag": "Семейно",
    "tagColor": "orange",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 70000
  },
  {
    "id": "sf",
    "country": "us",
    "city": "Сан-Франциско",
    "flag": "🇺🇸",
    "emoji": "🌁",
    "desc": "Мост, холмы и залив",
    "price": 330000,
    "tag": "Уютно",
    "tagColor": "cyan",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 105000
  },
  {
    "id": "london",
    "country": "gb",
    "city": "Лондон",
    "flag": "🇬🇧",
    "emoji": "🎡",
    "desc": "Музеи, парки и королевская классика",
    "price": 180000,
    "tag": "Гастро",
    "tagColor": "amber",
    "gradient": "from-indigo-500/30 to-blue-600/30",
    "hotelPrice": 80000
  },
  {
    "id": "edinburgh",
    "country": "gb",
    "city": "Эдинбург",
    "flag": "🇬🇧",
    "emoji": "🏰",
    "desc": "Замок, холмы и шотландская атмосфера",
    "price": 190000,
    "tag": "Выгодно",
    "tagColor": "purple",
    "gradient": "from-sky-500/30 to-blue-600/30",
    "hotelPrice": 60000
  },
  {
    "id": "manchester",
    "country": "gb",
    "city": "Манчестер",
    "flag": "🇬🇧",
    "emoji": "🎸",
    "desc": "Музыка, футбол и индустриальный стиль",
    "price": 175000,
    "tag": "Семейно",
    "tagColor": "orange",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 50000
  },
  {
    "id": "berlin",
    "country": "de",
    "city": "Берлин",
    "flag": "🇩🇪",
    "emoji": "🧱",
    "desc": "История, клубы и музеи",
    "price": 125000,
    "tag": "Выгодно",
    "tagColor": "purple",
    "gradient": "from-sky-500/30 to-blue-600/30",
    "hotelPrice": 50000
  },
  {
    "id": "munich",
    "country": "de",
    "city": "Мюнхен",
    "flag": "🇩🇪",
    "emoji": "🍺",
    "desc": "Бавария, пивные и Альпы рядом",
    "price": 135000,
    "tag": "Семейно",
    "tagColor": "orange",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 62000
  },
  {
    "id": "hamburg",
    "country": "de",
    "city": "Гамбург",
    "flag": "🇩🇪",
    "emoji": "⚓",
    "desc": "Порт, каналы и северная эстетика",
    "price": 132000,
    "tag": "Уютно",
    "tagColor": "cyan",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 52000
  },
  {
    "id": "athens",
    "country": "gr",
    "city": "Афины",
    "flag": "🇬🇷",
    "emoji": "🏛️",
    "desc": "Акрополь, еда и древность без занудства",
    "price": 118000,
    "tag": "Семейно",
    "tagColor": "orange",
    "gradient": "from-emerald-500/30 to-sky-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "santorini",
    "country": "gr",
    "city": "Санторини",
    "flag": "🇬🇷",
    "emoji": "🤍",
    "desc": "Белые домики, закаты и вулканические пляжи",
    "price": 150000,
    "tag": "Уютно",
    "tagColor": "cyan",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 85000
  },
  {
    "id": "crete",
    "country": "gr",
    "city": "Крит",
    "flag": "🇬🇷",
    "emoji": "🏝️",
    "desc": "Море, горы и длинный островной отпуск",
    "price": 135000,
    "tag": "Премиум",
    "tagColor": "emerald",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 48000
  },
  {
    "id": "thessaloniki",
    "country": "gr",
    "city": "Салоники",
    "flag": "🇬🇷",
    "emoji": "🌊",
    "desc": "Набережная, еда и молодая атмосфера",
    "price": 120000,
    "tag": "Популярно",
    "tagColor": "pink",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 35000
  },
  {
    "id": "cairo",
    "country": "eg",
    "city": "Каир",
    "flag": "🇪🇬",
    "emoji": "🐪",
    "desc": "Пирамиды, музеи и большой город",
    "price": 110000,
    "tag": "Уютно",
    "tagColor": "cyan",
    "gradient": "from-amber-500/30 to-orange-600/30",
    "hotelPrice": 35000
  },
  {
    "id": "sharm",
    "country": "eg",
    "city": "Шарм-эль-Шейх",
    "flag": "🇪🇬",
    "emoji": "🐠",
    "desc": "Красное море, рифы и отели",
    "price": 90000,
    "tag": "Премиум",
    "tagColor": "emerald",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 42000
  },
  {
    "id": "hurghada",
    "country": "eg",
    "city": "Хургада",
    "flag": "🇪🇬",
    "emoji": "🏖️",
    "desc": "Пляжи, дайвинг и all-inclusive",
    "price": 85000,
    "tag": "Популярно",
    "tagColor": "pink",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 36000
  },
  {
    "id": "alexandria",
    "country": "eg",
    "city": "Александрия",
    "flag": "🇪🇬",
    "emoji": "⚓",
    "desc": "Средиземное море и античная история",
    "price": 115000,
    "tag": "Хит",
    "tagColor": "sky",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 30000
  },
  {
    "id": "tashkent",
    "country": "uz",
    "city": "Ташкент",
    "flag": "🇺🇿",
    "emoji": "🏙️",
    "desc": "Большой город, рынки и метро",
    "price": 42000,
    "tag": "Премиум",
    "tagColor": "emerald",
    "gradient": "from-purple-500/30 to-indigo-600/30",
    "hotelPrice": 26000
  },
  {
    "id": "samarkand",
    "country": "uz",
    "city": "Самарканд",
    "flag": "🇺🇿",
    "emoji": "🕌",
    "desc": "Регистан, голубые купола и история",
    "price": 52000,
    "tag": "Популярно",
    "tagColor": "pink",
    "gradient": "from-pink-500/30 to-rose-600/30",
    "hotelPrice": 30000
  },
  {
    "id": "bukhara",
    "country": "uz",
    "city": "Бухара",
    "flag": "🇺🇿",
    "emoji": "🏺",
    "desc": "Медресе, караван-сараи и старый город",
    "price": 56000,
    "tag": "Хит",
    "tagColor": "sky",
    "gradient": "from-cyan-500/30 to-teal-600/30",
    "hotelPrice": 28000
  }
];

let currentCountryFilter = 'all';

const TAG_COLORS = {
  sky:     'bg-sky-500/20 text-sky-300',
  emerald: 'bg-emerald-500/20 text-emerald-400',
  amber:   'bg-amber-500/20 text-amber-400',
  purple:  'bg-purple-500/20 text-purple-400',
  orange:  'bg-orange-500/20 text-orange-400',
  cyan:    'bg-cyan-500/20 text-cyan-400',
  pink:    'bg-pink-500/20 text-pink-400',
};

/**
 * Рендерит карточки направлений с учётом фильтра по стране.
 */

function destinationSlug(value) {
  return typeof tpTravelSlug === 'function' ? tpTravelSlug(value) : String(value || 'travel').toLowerCase().replace(/[^a-z0-9]+/g, '-');
}

function destinationImageUrl(dest) {
  return dest?.photo || (typeof tpCityImage === 'function' ? tpCityImage(dest?.city) : `assets/images/cities/${destinationSlug(dest?.city)}.jpg`);
}

function destinationImageOnError(dest) {
  const query = `${dest?.city || 'city'} ${(dest?.desc || '')} travel skyline`;
  return typeof tpImgOnError === 'function' ? tpImgOnError(query, 1200, 800) : "this.onerror=null;this.src='https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80';";
}

function getDisplayFlightPrice(dest) {
  return typeof getRouteFlightPrice === 'function' ? getRouteFlightPrice(dest.city, dest.price) : dest.price;
}

function renderDestinations(countryCode) {
  currentCountryFilter = countryCode || 'all';
  const fromCity = (typeof getUserCity === 'function') ? getUserCity().name : 'Алматы';
  const list = (countryCode === 'all'
    ? DESTINATIONS
    : DESTINATIONS.filter(d => d.country === countryCode))
    .filter(d => d.city !== fromCity);

  const grid = document.getElementById('destinations-grid');
  if (!grid) return;

  grid.innerHTML = list.map(d => {
    const tagClass = TAG_COLORS[d.tagColor] || TAG_COLORS.sky;
    return `
      <div class="destination-card card-gradient rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
           onclick="selectDestination('${d.city}')">
        <div class="h-40 relative overflow-hidden">
          <img src="${destinationImageUrl(d)}" onerror="${destinationImageOnError(d)}" alt="Фото города ${d.city}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/25 to-transparent"></div>
          <span class="absolute left-4 bottom-4 text-xl font-bold text-white drop-shadow">${d.city}</span>
        </div>
        <div class="p-5">
          <h3 class="text-xl font-bold mb-1">${d.city}</h3>
          <p class="text-slate-400 text-sm mb-3">${d.desc}</p>
          ${typeof tpRenderBadges === 'function' ? tpRenderBadges({...d, type:'flight', price:getDisplayFlightPrice(d)}) : ''}
          <div class="flex items-center justify-between mt-3">
            <span class="text-sky-400 font-semibold">${getDisplayFlightPrice(d) ? 'от ' + getDisplayFlightPrice(d).toLocaleString() + ' ₸' : 'вы уже здесь'}</span>
            <span class="text-xs ${tagClass} px-3 py-1 rounded-full">${d.tag}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

/**
 * Фильтрация карточек по стране (вкладки).
 */
function filterDestinations(countryCode) {
  // обновить стиль вкладок
  document.querySelectorAll('.country-tab').forEach(btn => {
    const isActive = btn.dataset.country === countryCode;
    btn.className = isActive
      ? 'country-tab tab-active px-4 py-2 rounded-full text-sm font-medium transition'
      : 'country-tab px-4 py-2 rounded-full text-sm font-medium bg-white/10 hover:bg-white/20 transition';
  });
  renderDestinations(countryCode);
}

// ── Топ-3 для главной ──────────────────────────────────────────────────────

const TOP3_DESTINATIONS = ['dubai', 'istanbul', 'bangkok'];

/**
 * Рендерит только топ-3 направления на главной странице.
 */
function renderTop3Destinations() {
  const items = DESTINATIONS.filter(d => TOP3_DESTINATIONS.includes(d.id));
  const grid = document.getElementById('destinations-grid');
  if (!grid) return;

  const fromCity = (typeof getUserCity === 'function') ? getUserCity().name : 'Алматы';
  const subtitle = document.getElementById('top-directions-subtitle');
  if (subtitle) subtitle.textContent = `Самые популярные у путешественников из города ${fromCity} · данные Aviasales.kz`;
  grid.innerHTML = items.filter(d => d.city !== fromCity).map(d => {
    const tagClass = TAG_COLORS[d.tagColor] || TAG_COLORS.sky;
    const displayPrice = getDisplayFlightPrice(d);
    return `
      <div class="destination-card card-gradient rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
           onclick="openCityModal('${d.id}')">
        <div class="h-44 relative overflow-hidden">
          <img src="${destinationImageUrl(d)}" onerror="${destinationImageOnError(d)}" alt="Фото города ${d.city}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
          <span class="absolute left-4 bottom-4 text-xl font-bold text-white drop-shadow">${d.city}</span>
          <span class="absolute top-3 right-3 text-xs ${tagClass} px-2 py-1 rounded-full backdrop-blur-sm">${d.tag}</span>
        </div>
        <div class="p-5">
          <h3 class="text-xl font-bold mb-1">${d.city}</h3>
          <p class="text-slate-400 text-sm mb-3">${d.desc}</p>
          ${typeof tpRenderBadges === 'function' ? tpRenderBadges({...d, type:'flight', price:getDisplayFlightPrice(d)}) : ''}
          <div class="flex items-center justify-between mt-3">
            <span class="text-sky-400 font-semibold">${getDisplayFlightPrice(d) ? 'от ' + getDisplayFlightPrice(d).toLocaleString() + ' ₸' : 'вы уже здесь'}</span>
            <span class="text-xs text-slate-500">Из города ${fromCity} →</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}


function renderPersonalSection() {
  const grid = document.getElementById('personal-grid');
  if (!grid || typeof tpSortByProfile !== 'function') return;
  const fromCity = (typeof getUserCity === 'function') ? getUserCity().name : 'Алматы';
  const subtitle = document.getElementById('personal-subtitle');
  if (subtitle) subtitle.textContent = `Ваш стиль: ${typeof tpTravelStyle === 'function' ? tpTravelStyle() : 'Комфортно'} · бюджет: ${typeof tpBudgetLevel === 'function' ? tpBudgetLevel() : 'Средний'} · из города ${fromCity}`;
  const list = tpSortByProfile(DESTINATIONS
    .filter(d => d.city !== fromCity)
    .map(d => ({ ...d, type: 'flight', price: getDisplayFlightPrice(d) })))
    .slice(0, 3);
  grid.innerHTML = list.map(d => {
    const tagClass = TAG_COLORS[d.tagColor] || TAG_COLORS.sky;
    return `
      <div class="destination-card card-gradient rounded-2xl overflow-hidden transition-all duration-300 cursor-pointer"
           onclick="openCityModal('${d.id}')">
        <div class="h-44 relative overflow-hidden">
          <img src="${destinationImageUrl(d)}" onerror="${destinationImageOnError(d)}" alt="Фото города ${d.city}" class="w-full h-full object-cover">
          <div class="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent"></div>
          <span class="absolute left-4 bottom-4 text-xl font-bold text-white drop-shadow">${d.city}</span>
          <span class="absolute top-3 right-3 text-xs ${tagClass} px-2 py-1 rounded-full backdrop-blur-sm">${d.tag}</span>
        </div>
        <div class="p-5">
          <p class="text-slate-400 text-sm mb-3">${d.desc}</p>
          ${typeof tpRenderBadges === 'function' ? tpRenderBadges(d) : ''}
          <div class="flex items-center justify-between mt-3">
            <span class="text-sky-400 font-semibold">от ${Number(d.price || 0).toLocaleString()} ₸</span>
            <span class="text-xs text-slate-500">Под профиль →</span>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ── Модальное окно города ──────────────────────────────────────────────────

const REVIEWS_KEY = 'travelplan_reviews';

function loadReviews(cityId) {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    return all[cityId] || [];
  } catch { return []; }
}

function saveReview(cityId, review) {
  try {
    const raw = localStorage.getItem(REVIEWS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    if (!all[cityId]) all[cityId] = [];
    all[cityId].unshift(review);
    localStorage.setItem(REVIEWS_KEY, JSON.stringify(all));
  } catch {}
  const dest = (typeof DESTINATIONS !== 'undefined') ? DESTINATIONS.find(d => d.id === cityId || d.city === cityId) : null;
  if (typeof dbAddReview === 'function') {
    dbAddReview({
      entityType: 'destination',
      entityId: cityId,
      city: dest?.city || cityId,
      country: dest?.country || null,
      authorName: review.author || (typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость'),
      rating: review.rating,
      comment: review.text || null,
      imageUrl: review.imageUrl || null
    }).catch(err => console.warn('Отзыв сохранён локально, но не ушёл в Supabase:', err.message || err));
  }
}

function renderStars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function openCityModal(destId) {
  const dest = DESTINATIONS.find(d => d.id === destId);
  if (!dest) return;

  const reviews = loadReviews(destId);
  const avgRating = reviews.length
    ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  const reviewsHtml = reviews.length === 0
    ? `<p class="text-slate-500 text-sm text-center py-4">Пока нет отзывов. Будьте первым!</p>`
    : reviews.map(r => `
      <div class="bg-slate-800/50 rounded-xl p-4 mb-3">
        <div class="flex items-center justify-between mb-1">
          <span class="font-semibold text-sm">${r.author}</span>
          <span class="text-amber-400 text-sm">${renderStars(r.rating)}</span>
        </div>
        ${r.text ? `<p class="text-slate-300 text-sm">${r.text}</p>` : ''}
        ${typeof renderReviewImage === 'function' ? renderReviewImage(r.imageUrl) : ''}
        <p class="text-slate-600 text-xs mt-1">${r.date}</p>
      </div>`).join('');

  const modal = document.getElementById('city-modal');
  const content = document.getElementById('city-modal-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="h-40 rounded-xl mt-[5px] mb-5 overflow-hidden relative border border-white/10">
      <img src="${destinationImageUrl(dest)}" onerror="${destinationImageOnError(dest)}" alt="Фото города ${dest.city}" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/15 to-transparent"></div>
      <div class="absolute left-4 bottom-4 right-4 text-xl font-bold text-white drop-shadow">${dest.city}</div>
    </div>
    ${avgRating ? `<div class="flex justify-end mb-2"><span class="text-amber-400 font-semibold">★ ${avgRating}</span></div>` : ''}
    <p class="text-slate-400 text-sm mb-2">${dest.desc}</p>
    ${typeof tpRenderTags === 'function' ? tpRenderTags({...dest, type:'flight', price:getDisplayFlightPrice(dest)}) : ''}
    <div class="grid grid-cols-2 gap-3 mb-5">
      <div class="bg-slate-800/50 rounded-xl p-3 text-center">
        <div class="text-xs text-slate-400 mb-1">✈️ Билет от</div>
        <div class="text-sky-400 font-bold">${getDisplayFlightPrice(dest) ? getDisplayFlightPrice(dest).toLocaleString() + ' ₸' : 'вы уже здесь'}</div>
      </div>
      <div class="bg-slate-800/50 rounded-xl p-3 text-center">
        <div class="text-xs text-slate-400 mb-1">🏨 Отель от</div>
        <div class="text-amber-400 font-bold">${dest.hotelPrice.toLocaleString()} ₸/ночь</div>
      </div>
    </div>
    <div class="flex gap-2 mb-5">
      <button onclick="selectDestinationFromModal('${dest.city}', 'flights')"
        class="flex-1 py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-sm font-semibold hover:from-sky-400 hover:to-blue-500 transition">
        ✈️ Найти билеты
      </button>
      <button onclick="selectDestinationFromModal('${dest.city}', 'hotels')"
        class="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl text-sm font-semibold hover:from-amber-400 hover:to-orange-500 transition">
        🏨 Найти отели
      </button>
    </div>
    <button onclick="selectPlacesFromCityModal('${dest.city}')"
      class="w-full py-2.5 mb-5 bg-white/10 border border-white/15 rounded-xl text-sm font-semibold hover:bg-white/20 transition">
      🗺️ Посмотреть интересные места
    </button>

    <div class="mt-4 border-t border-white/10 pt-4">
      <h3 class="text-base font-semibold mb-3">✍️ Оставьте свой отзыв</h3>
      <div class="text-xs text-slate-400 mb-2">Отзыв будет опубликован от имени: <span class="text-sky-300 font-semibold">${typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость'}</span></div>
      <div class="flex gap-1 mb-2" id="star-picker">
        ${[1,2,3,4,5].map(n => `<button class="star-btn text-2xl text-slate-600 hover:text-amber-400 transition" data-star="${n}" onclick="pickStar(${n})">★</button>`).join('')}
      </div>
      <textarea id="review-text" rows="3" placeholder="Расскажите о поездке..."
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-sm mb-3 focus:border-sky-500 focus:outline-none resize-none"></textarea>
      <div class="grid grid-cols-1 gap-2 mb-3">
        <input id="review-image-file" type="file" accept="image/*" class="w-full text-xs text-slate-400 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20">
        <input id="review-image-url" type="url" placeholder="Или ссылка на фото" class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-sm focus:border-sky-500 focus:outline-none">
      </div>
      <button onclick="submitReview('${destId}')"
        class="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-sm font-semibold hover:from-sky-400 hover:to-blue-500 transition">
        Опубликовать отзыв
      </button>
    </div>

    <div class="mt-5 border-t border-white/10 pt-4">
      <h3 class="font-semibold mb-3">💬 Отзывы (${reviews.length})</h3>
      <div id="city-reviews-list">${reviewsHtml}</div>
    </div>
  `;

  modal.style.display = 'flex';
  modal.classList.remove('hidden');
  window._cityModalStarRating = 0;
}

function closeCityModal() {
  const modal = document.getElementById('city-modal');
  if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
}

function pickStar(n) {
  window._cityModalStarRating = n;
  document.querySelectorAll('.star-btn').forEach(btn => {
    btn.style.color = parseInt(btn.dataset.star) <= n ? '#fbbf24' : '';
  });
}

async function submitReview(cityId) {
  const author = typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость';
  const text   = (document.getElementById('review-text')?.value   || '').trim();
  const rating = window._cityModalStarRating || 0;

  if (!rating)  { showToast('Выберите оценку', 'error'); return; }

  let imageUrl = null;
  try { imageUrl = typeof getReviewImageValue === 'function' ? await getReviewImageValue('review-image-file', 'review-image-url') : null; }
  catch (error) { showToast(error.message, 'error'); return; }

  const review = {
    author, rating, text, imageUrl,
    date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  };
  saveReview(cityId, review);
  openCityModal(cityId); // перерисовать
  if (typeof renderFeed === 'function' && typeof getFilteredFeedItems === 'function' && typeof getFeedFilterState === 'function') {
    renderFeed(getFilteredFeedItems(getFeedFilterState()));
  }
  showToast('Отзыв опубликован! 🎉');
}

function selectDestinationFromModal(city, section) {
  closeCityModal();
  const ft = document.getElementById('flight-to');
  const hd = document.getElementById('hotel-destination');
  if (ft) ft.value = city;
  if (hd) hd.value = city;
  showSection(section);
  showToast(`Выбрано: ${city}`);
}


function selectPlacesFromCityModal(city) {
  closeCityModal();
  if (typeof openPlacesForCity === 'function') openPlacesForCity(city);
}

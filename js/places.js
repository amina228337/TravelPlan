// =============================================
// places.js - интересные места по городам
// =============================================

// Зачем этот файл:
// Интересные места: карточки, модалки, фото, истории и переходы к отелям.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.


const PLACES_COUNTRY_NAMES = {
  kz: 'Казахстан', ru: 'Россия', cy: 'Кипр', tr: 'Турция', ae: 'ОАЭ', ge: 'Грузия', cz: 'Чехия', es: 'Испания', it: 'Италия', fr: 'Франция', th: 'Таиланд', jp: 'Япония', kr: 'Южная Корея', cn: 'Китай', us: 'США', gb: 'Великобритания', de: 'Германия', gr: 'Греция', eg: 'Египет', uz: 'Узбекистан'
};

const CITY_PLACES = {
  "Алматы": {
    "attractions": [
      "Парк имени 28 гвардейцев-панфиловцев",
      "Вознесенский кафедральный собор",
      "Центральный государственный музей Казахстана"
    ],
    "beauty": [
      "Кок-Тобе",
      "Большое Алматинское озеро",
      "Чарынский каньон"
    ]
  },
  "Астана": {
    "attractions": [
      "Байтерек",
      "Мечеть Хазрет Султан",
      "Национальный музей Республики Казахстан"
    ],
    "beauty": [
      "Набережная реки Есиль",
      "Ботанический сад Астаны",
      "Парк Жетысу"
    ]
  },
  "Шымкент": {
    "attractions": [
      "Цитадель Шымкента",
      "Парк Абая",
      "Этнопарк Кен-Баба"
    ],
    "beauty": [
      "Сайрам-Угамский национальный парк",
      "Аксу-Жабаглы",
      "Каньон Аксу"
    ]
  },
  "Актау": {
    "attractions": [
      "Набережная Актау",
      "Подземная мечеть Бекет-Ата",
      "Маяк на крыше жилого дома"
    ],
    "beauty": [
      "Скальная тропа",
      "Долина шаров Торыш",
      "Голубая бухта"
    ]
  },
  "Туркестан": {
    "attractions": [
      "Мавзолей Ходжи Ахмеда Ясави",
      "Караван-сарай Turkistan",
      "Мавзолей Рабии Султан Бегим"
    ],
    "beauty": [
      "Оазис Караван-сарая вечером",
      "Сауран",
      "Окрестности Отрара"
    ]
  },
  "Бурабай": {
    "attractions": [
      "Поляна Абылай хана",
      "Музей природы Бурабая",
      "Кенесары үңгірі"
    ],
    "beauty": [
      "Озеро Бурабай",
      "Скала Жумбактас",
      "Гора Окжетпес"
    ]
  },
  "Москва": {
    "attractions": [
      "Красная площадь",
      "Московский Кремль",
      "Государственная Третьяковская галерея"
    ],
    "beauty": [
      "Парк Зарядье",
      "Воробьёвы горы",
      "Патриаршие пруды"
    ]
  },
  "Санкт-Петербург": {
    "attractions": [
      "Эрмитаж",
      "Исаакиевский собор",
      "Петропавловская крепость"
    ],
    "beauty": [
      "Дворцовая набережная",
      "Петергофские фонтаны",
      "Елагин остров"
    ]
  },
  "Сочи": {
    "attractions": [
      "Дендрарий Сочи",
      "Олимпийский парк",
      "Морской вокзал Сочи"
    ],
    "beauty": [
      "Роза Хутор",
      "Агурские водопады",
      "Тисо-самшитовая роща"
    ]
  },
  "Казань": {
    "attractions": [
      "Казанский Кремль",
      "Мечеть Кул-Шариф",
      "Дворец земледельцев"
    ],
    "beauty": [
      "Кремлёвская набережная",
      "Озеро Кабан",
      "Остров-град Свияжск"
    ]
  },
  "Калининград": {
    "attractions": [
      "Кафедральный собор",
      "Музей янтаря",
      "Рыбная деревня"
    ],
    "beauty": [
      "Куршская коса",
      "Балтийская коса",
      "Озеро Верхнее"
    ]
  },
  "Ларнака": {
    "attractions": [
      "Церковь Святого Лазаря",
      "Форт Ларнаки",
      "Акведук Камарес"
    ],
    "beauty": [
      "Солёное озеро Ларнаки",
      "Пляж Финикудес",
      "Пляж Маккензи"
    ]
  },
  "Пафос": {
    "attractions": [
      "Археологический парк Пафоса",
      "Гробницы королей",
      "Замок Пафоса"
    ],
    "beauty": [
      "Камень Афродиты",
      "Голубая лагуна Акамаса",
      "Корал Бэй"
    ]
  },
  "Лимассол": {
    "attractions": [
      "Лимассольский замок",
      "Марина Лимассола",
      "Древний Курион"
    ],
    "beauty": [
      "Пляж Дасуди",
      "Белые скалы Governor’s Beach",
      "Набережная Molos"
    ]
  },
  "Никосия": {
    "attractions": [
      "Улица Ледра",
      "Кипрский музей",
      "Венецианские стены Никосии"
    ],
    "beauty": [
      "Старый город Никосии",
      "Парк Аталасса",
      "Пешеходные кварталы Лаики Гитонья"
    ]
  },
  "Айя-Напа": {
    "attractions": [
      "Монастырь Айя-Напы",
      "Музей моря Thalassa",
      "Парк скульптур Айя-Напы"
    ],
    "beauty": [
      "Nissi Beach",
      "Cape Greco",
      "Sea Caves"
    ]
  },
  "Стамбул": {
    "attractions": [
      "Айя-София",
      "Голубая мечеть",
      "Дворец Топкапы"
    ],
    "beauty": [
      "Босфор на закате",
      "Район Балат",
      "Парк Эмирган"
    ]
  },
  "Анталья": {
    "attractions": [
      "Старый город Калеичи",
      "Ворота Адриана",
      "Музей Антальи"
    ],
    "beauty": [
      "Водопады Дюден",
      "Пляж Коньяалты",
      "Каньон Кёпрюлю"
    ]
  },
  "Каппадокия": {
    "attractions": [
      "Музей под открытым небом Гёреме",
      "Подземный город Деринкую",
      "Крепость Учхисар"
    ],
    "beauty": [
      "Долина Любви",
      "Долина Пашабаг",
      "Полёт воздушных шаров над Гёреме"
    ]
  },
  "Измир": {
    "attractions": [
      "Часовая башня Измира",
      "Агора Смирны",
      "Рынок Кемералты"
    ],
    "beauty": [
      "Набережная Кордон",
      "Чешме",
      "Алачаты"
    ]
  },
  "Дубай": {
    "attractions": [
      "Бурдж-Халифа",
      "Dubai Mall",
      "Музей будущего"
    ],
    "beauty": [
      "Dubai Marina",
      "Пляж JBR",
      "Пустыня Аль-Мармум"
    ]
  },
  "Абу-Даби": {
    "attractions": [
      "Мечеть шейха Зайда",
      "Лувр Абу-Даби",
      "Qasr Al Watan"
    ],
    "beauty": [
      "Corniche Beach",
      "Остров Саадият",
      "Мангровый парк Jubail"
    ]
  },
  "Шарджа": {
    "attractions": [
      "Музей исламской цивилизации",
      "Blue Souk",
      "Sharjah Heritage Area"
    ],
    "beauty": [
      "Al Noor Island",
      "Al Majaz Waterfront",
      "Пляж Аль-Хан"
    ]
  },
  "Тбилиси": {
    "attractions": [
      "Крепость Нарикала",
      "Старый Тбилиси",
      "Серные бани Абанотубани"
    ],
    "beauty": [
      "Мтацминда",
      "Мост Мира вечером",
      "Черепашье озеро"
    ]
  },
  "Батуми": {
    "attractions": [
      "Батумский бульвар",
      "Статуя Али и Нино",
      "Площадь Европы"
    ],
    "beauty": [
      "Ботанический сад Батуми",
      "Зелёный мыс",
      "Водопад Махунцети"
    ]
  },
  "Кутаиси": {
    "attractions": [
      "Храм Баграта",
      "Гелатский монастырь",
      "Белый мост"
    ],
    "beauty": [
      "Пещера Прометея",
      "Каньон Мартвили",
      "Заповедник Сатаплия"
    ]
  },
  "Прага": {
    "attractions": [
      "Пражский Град",
      "Карлов мост",
      "Староместская площадь"
    ],
    "beauty": [
      "Петршинский холм",
      "Набережная Влтавы",
      "Летенские сады"
    ]
  },
  "Карловы Вары": {
    "attractions": [
      "Мельничная колоннада",
      "Гейзерная колоннада",
      "Музей Becherovka"
    ],
    "beauty": [
      "Смотровая Диана",
      "Река Тепла",
      "Лесные прогулочные тропы"
    ]
  },
  "Брно": {
    "attractions": [
      "Замок Шпильберк",
      "Собор Святых Петра и Павла",
      "Вилла Тугендхат"
    ],
    "beauty": [
      "Моравский карст",
      "Плотина Брно",
      "Парк Лужанки"
    ]
  },
  "Барселона": {
    "attractions": [
      "Саграда Фамилия",
      "Парк Гуэль",
      "Дом Бальо"
    ],
    "beauty": [
      "Пляж Барселонета",
      "Гора Монжуик",
      "Бункеры Carmel"
    ]
  },
  "Мадрид": {
    "attractions": [
      "Музей Прадо",
      "Королевский дворец Мадрида",
      "Площадь Майор"
    ],
    "beauty": [
      "Парк Ретиро",
      "Храм Дебод на закате",
      "Сады Сабатини"
    ]
  },
  "Валенсия": {
    "attractions": [
      "Город искусств и наук",
      "Кафедральный собор Валенсии",
      "Центральный рынок"
    ],
    "beauty": [
      "Парк Турия",
      "Пляж Мальварроса",
      "Альбуфера"
    ]
  },
  "Севилья": {
    "attractions": [
      "Севильский Алькасар",
      "Севильский кафедральный собор",
      "Площадь Испании"
    ],
    "beauty": [
      "Район Санта-Крус",
      "Парк Марии-Луизы",
      "Набережная Гвадалквивира"
    ]
  },
  "Майорка": {
    "attractions": [
      "Кафедральный собор Пальмы",
      "Замок Бельвер",
      "Старинный поезд Сольер"
    ],
    "beauty": [
      "Мыс Форментор",
      "Бухта Са Калобра",
      "Пляж Эс-Тренк"
    ]
  },
  "Рим": {
    "attractions": [
      "Колизей",
      "Римский форум",
      "Пантеон"
    ],
    "beauty": [
      "Сад апельсинов",
      "Холм Яникул",
      "Фонтан Треви ночью"
    ]
  },
  "Милан": {
    "attractions": [
      "Миланский собор",
      "Галерея Виктора Эммануила II",
      "Театр Ла Скала"
    ],
    "beauty": [
      "Каналы Навильи",
      "Парк Семпионе",
      "Озеро Комо рядом"
    ]
  },
  "Венеция": {
    "attractions": [
      "Площадь Сан-Марко",
      "Дворец дожей",
      "Мост Риальто"
    ],
    "beauty": [
      "Гранд-канал",
      "Остров Бурано",
      "Лагуна Венеции на рассвете"
    ]
  },
  "Флоренция": {
    "attractions": [
      "Санта-Мария-дель-Фьоре",
      "Галерея Уффици",
      "Палаццо Веккьо"
    ],
    "beauty": [
      "Площадь Микеланджело",
      "Сады Боболи",
      "Мост Понте-Веккьо"
    ]
  },
  "Неаполь": {
    "attractions": [
      "Национальный археологический музей",
      "Кастель-дель-Ово",
      "Подземный Неаполь"
    ],
    "beauty": [
      "Вид на Везувий",
      "Побережье Амальфи",
      "Остров Капри"
    ]
  },
  "Париж": {
    "attractions": [
      "Эйфелева башня",
      "Лувр",
      "Собор Парижской Богоматери"
    ],
    "beauty": [
      "Монмартр",
      "Сад Тюильри",
      "Набережные Сены"
    ]
  },
  "Ницца": {
    "attractions": [
      "Английская набережная",
      "Старый город Ниццы",
      "Музей Матисса"
    ],
    "beauty": [
      "Замковый холм",
      "Пляж Castel",
      "Вильфранш-сюр-Мер"
    ]
  },
  "Лион": {
    "attractions": [
      "Базилика Нотр-Дам-де-Фурвьер",
      "Старый Лион",
      "Площадь Белькур"
    ],
    "beauty": [
      "Холм Фурвьер",
      "Набережные Соны",
      "Парк Тет д’Ор"
    ]
  },
  "Марсель": {
    "attractions": [
      "Нотр-Дам-де-ла-Гард",
      "Старый порт Марселя",
      "Музей MuCEM"
    ],
    "beauty": [
      "Каланки",
      "Остров Иф",
      "Пляж Прадо"
    ]
  },
  "Бангкок": {
    "attractions": [
      "Большой дворец",
      "Храм Ват Арун",
      "Храм Ват Пхо"
    ],
    "beauty": [
      "Парк Люмпини",
      "Река Чао Прайя ночью",
      "Рынок цветов Пак Клонг Талат"
    ]
  },
  "Пхукет": {
    "attractions": [
      "Большой Будда Пхукета",
      "Старый город Пхукета",
      "Храм Ват Чалонг"
    ],
    "beauty": [
      "Пляж Най Харн",
      "Острова Пхи-Пхи",
      "Смотровая площадка Карон"
    ]
  },
  "Паттайя": {
    "attractions": [
      "Храм Истины",
      "Nong Nooch Tropical Garden",
      "Большой Будда"
    ],
    "beauty": [
      "Остров Ко Лан",
      "Пляж Джомтьен",
      "Смотровая Pattaya Viewpoint"
    ]
  },
  "Чиангмай": {
    "attractions": [
      "Ват Пхра Тхат Дой Сутхеп",
      "Старый город Чиангмая",
      "Ват Чеди Луанг"
    ],
    "beauty": [
      "Национальный парк Дой Интханон",
      "Sticky Waterfalls",
      "Рисовые поля Mae Rim"
    ]
  },
  "Самуи": {
    "attractions": [
      "Большой Будда Самуи",
      "Wat Plai Laem",
      "Рыбацкая деревня Bophut"
    ],
    "beauty": [
      "Пляж Чавенг",
      "Водопад На Муанг",
      "Ang Thong Marine Park"
    ]
  },
  "Токио": {
    "attractions": [
      "Храм Сэнсо-дзи",
      "Токийская башня",
      "Район Сибуя"
    ],
    "beauty": [
      "Сады Синдзюку-гёэн",
      "Река Мэгуро весной",
      "Одайба вечером"
    ]
  },
  "Киото": {
    "attractions": [
      "Фусими Инари",
      "Кинкаку-дзи",
      "Киёмидзу-дэра"
    ],
    "beauty": [
      "Бамбуковая роща Арасияма",
      "Философская тропа",
      "Район Гион вечером"
    ]
  },
  "Осака": {
    "attractions": [
      "Замок Осаки",
      "Dotonbori",
      "Universal Studios Japan"
    ],
    "beauty": [
      "Парк Наканосима",
      "Tempozan Harbor Village",
      "Ночной Дотонбори"
    ]
  },
  "Саппоро": {
    "attractions": [
      "Часовая башня Саппоро",
      "Парк Одори",
      "Музей пива Саппоро"
    ],
    "beauty": [
      "Гора Мойва",
      "Парк Моэрэнума",
      "Горячие источники Дзёдзанкэй"
    ]
  },
  "Сеул": {
    "attractions": [
      "Дворец Кёнбоккун",
      "Башня N Seoul",
      "Деревня Букчон Ханок"
    ],
    "beauty": [
      "Ручей Чхонгечхон",
      "Парк Ханган",
      "Гора Букхансан"
    ]
  },
  "Пусан": {
    "attractions": [
      "Храм Хэдон Ёнгунса",
      "Gamcheon Culture Village",
      "Рынок Jagalchi"
    ],
    "beauty": [
      "Пляж Хэундэ",
      "Пляж Кваналли ночью",
      "Остров Тонбэк"
    ]
  },
  "Чеджу": {
    "attractions": [
      "Seongsan Ilchulbong",
      "Музей чая O’sulloc",
      "Деревня Seongeup"
    ],
    "beauty": [
      "Водопад Чонбан",
      "Пляж Хёпчже",
      "Лавовые трубки Manjanggul"
    ]
  },
  "Пекин": {
    "attractions": [
      "Запретный город",
      "Храм Неба",
      "Летний дворец"
    ],
    "beauty": [
      "Великая Китайская стена Бадалин",
      "Парк Бэйхай",
      "Озеро Хоухай"
    ]
  },
  "Шанхай": {
    "attractions": [
      "Набережная Вайтань",
      "Сад Юйюань",
      "Шанхайская башня"
    ],
    "beauty": [
      "Район Пудун ночью",
      "Французская концессия",
      "Парк Century"
    ]
  },
  "Гуанчжоу": {
    "attractions": [
      "Canton Tower",
      "Храм Шести баньяновых деревьев",
      "Chen Clan Ancestral Hall"
    ],
    "beauty": [
      "Остров Шамянь",
      "Парк Юэсю",
      "Жемчужная река вечером"
    ]
  },
  "Гонконг": {
    "attractions": [
      "Пик Виктория",
      "Большой Будда Тяньтань",
      "Аллея звёзд"
    ],
    "beauty": [
      "Бухта Виктория",
      "Dragon’s Back Trail",
      "Пляж Repulse Bay"
    ]
  },
  "Нью-Йорк": {
    "attractions": [
      "Статуя Свободы",
      "Метрополитен-музей",
      "Таймс-сквер"
    ],
    "beauty": [
      "Центральный парк",
      "Бруклинский мост",
      "High Line"
    ]
  },
  "Лос-Анджелес": {
    "attractions": [
      "Голливудская аллея славы",
      "Griffith Observatory",
      "Getty Center"
    ],
    "beauty": [
      "Пляж Санта-Моника",
      "Runyon Canyon",
      "Venice Canals"
    ]
  },
  "Майами": {
    "attractions": [
      "Art Deco Historic District",
      "Vizcaya Museum and Gardens",
      "Little Havana"
    ],
    "beauty": [
      "South Beach",
      "Key Biscayne",
      "Wynwood Walls вечером"
    ]
  },
  "Лас-Вегас": {
    "attractions": [
      "Las Vegas Strip",
      "Bellagio Fountains",
      "Fremont Street Experience"
    ],
    "beauty": [
      "Red Rock Canyon",
      "Valley of Fire",
      "Смотровая High Roller"
    ]
  },
  "Сан-Франциско": {
    "attractions": [
      "Golden Gate Bridge",
      "Остров Алькатрас",
      "Fisherman’s Wharf"
    ],
    "beauty": [
      "Twin Peaks",
      "Lands End",
      "Baker Beach"
    ]
  },
  "Лондон": {
    "attractions": [
      "Британский музей",
      "Тауэр",
      "Букингемский дворец"
    ],
    "beauty": [
      "Скай Гарден",
      "Гайд-парк",
      "Набережная Темзы вечером"
    ]
  },
  "Эдинбург": {
    "attractions": [
      "Эдинбургский замок",
      "Королевская миля",
      "Дворец Холирудхаус"
    ],
    "beauty": [
      "Arthur’s Seat",
      "Calton Hill",
      "Dean Village"
    ]
  },
  "Манчестер": {
    "attractions": [
      "Manchester Cathedral",
      "Science and Industry Museum",
      "John Rylands Library"
    ],
    "beauty": [
      "Castlefield Canals",
      "Heaton Park",
      "Salford Quays"
    ]
  },
  "Берлин": {
    "attractions": [
      "Бранденбургские ворота",
      "Рейхстаг",
      "Музейный остров"
    ],
    "beauty": [
      "Тиргартен",
      "East Side Gallery",
      "Темпельхофское поле"
    ]
  },
  "Мюнхен": {
    "attractions": [
      "Мариенплац",
      "Дворец Нимфенбург",
      "Мюнхенская резиденция"
    ],
    "beauty": [
      "Английский сад",
      "Олимпийский парк",
      "Озеро Штарнберг"
    ]
  },
  "Гамбург": {
    "attractions": [
      "Эльбская филармония",
      "Миниатюрная страна чудес",
      "Ратуша Гамбурга"
    ],
    "beauty": [
      "Озеро Альстер",
      "Шпайхерштадт",
      "Парк Planten un Blomen"
    ]
  },
  "Афины": {
    "attractions": [
      "Афинский Акрополь",
      "Музей Акрополя",
      "Агора Афин"
    ],
    "beauty": [
      "Холм Ликавит",
      "Район Плака",
      "Мыс Сунион"
    ]
  },
  "Санторини": {
    "attractions": [
      "Деревня Ия",
      "Археологический объект Акротири",
      "Фира"
    ],
    "beauty": [
      "Кальдера Санторини",
      "Красный пляж",
      "Закат в Ие"
    ]
  },
  "Крит": {
    "attractions": [
      "Кносский дворец",
      "Старый город Ханьи",
      "Крепость Кулес"
    ],
    "beauty": [
      "Лагуна Балос",
      "Пляж Элафониси",
      "Самарийское ущелье"
    ]
  },
  "Салоники": {
    "attractions": [
      "Белая башня",
      "Ротонда Галерия",
      "Арка Галерия"
    ],
    "beauty": [
      "Набережная Салоник",
      "Верхний город Ано Поли",
      "Озеро Керкини"
    ]
  },
  "Каир": {
    "attractions": [
      "Пирамиды Гизы",
      "Египетский музей",
      "Цитадель Саладина"
    ],
    "beauty": [
      "Нил вечером",
      "Парк Аль-Азхар",
      "Хан эль-Халили ночью"
    ]
  },
  "Шарм-эль-Шейх": {
    "attractions": [
      "Старый рынок Шарм-эль-Шейха",
      "Площадь Сохо",
      "Мечеть Аль-Сахаба"
    ],
    "beauty": [
      "Национальный парк Рас-Мохаммед",
      "Бухта Наама",
      "Голубая дыра Дахаба"
    ]
  },
  "Хургада": {
    "attractions": [
      "Hurghada Marina",
      "Sand City Hurghada",
      "Мечеть Эль-Мина"
    ],
    "beauty": [
      "Острова Гифтун",
      "Пляж Mahmya",
      "Пустынное сафари на закате"
    ]
  },
  "Александрия": {
    "attractions": [
      "Библиотека Александрина",
      "Цитадель Кайт-Бей",
      "Катакомбы Ком-эль-Шукафа"
    ],
    "beauty": [
      "Набережная Корниш",
      "Дворец Монтаза",
      "Средиземноморские пляжи"
    ]
  },
  "Ташкент": {
    "attractions": [
      "Комплекс Хаст-Имам",
      "Рынок Чорсу",
      "Музей Амира Тимура"
    ],
    "beauty": [
      "Ташкентская телебашня вечером",
      "Японский сад",
      "Парк Анхор"
    ]
  },
  "Самарканд": {
    "attractions": [
      "Регистан",
      "Шахи-Зинда",
      "Мавзолей Гур-Эмир"
    ],
    "beauty": [
      "Сиабский базар на рассвете",
      "Обсерватория Улугбека",
      "Сады Самарканда"
    ]
  },
  "Бухара": {
    "attractions": [
      "Пои-Калян",
      "Крепость Арк",
      "Ляби-Хауз"
    ],
    "beauty": [
      "Старый город Бухары",
      "Чор-Минор",
      "Караванные улочки вечером"
    ]
  }
};


function getPlacesDestination(city) {
  if (typeof DESTINATIONS === 'undefined') return null;
  return DESTINATIONS.find(d => d.city === city) || DESTINATIONS[0] || null;
}

function getPlacesCityList() {
  if (typeof DESTINATIONS === 'undefined') return Object.keys(CITY_PLACES).sort();
  return DESTINATIONS.map(d => d.city);
}

function placeSlug(value) {
  if (typeof travelplanSlug === 'function') return travelplanSlug(value);
  const map = {'а':'a','б':'b','в':'v','г':'g','д':'d','е':'e','ё':'e','ж':'zh','з':'z','и':'i','й':'y','к':'k','л':'l','м':'m','н':'n','о':'o','п':'p','р':'r','с':'s','т':'t','у':'u','ф':'f','х':'h','ц':'c','ч':'ch','ш':'sh','щ':'sch','ы':'y','э':'e','ю':'yu','я':'ya','ъ':'','ь':''};
  return String(value || 'travel').toLowerCase().split('').map(ch => map[ch] ?? ch).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'travel';
}

function getCityPhoto(city) {
  // Приоритет: 1) явный override из TP_IMAGE_OVERRIDES 2) tpCityImage (правильный slug) 3) photo из DESTINATIONS
  if (typeof tpCityImage === 'function') return tpCityImage(city);
  const dest = getPlacesDestination(city);
  return dest?.photo || `assets/images/cities/${placeSlug(city)}.jpg`;
}

function getCityFallbackPhoto(city = 'world landmarks') {
  return typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(`${city} city travel skyline`, 1600, 900) : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1600&q=80';
}

function getPlacePhoto(placeName, city) {
  return typeof tpPlaceImage === 'function' ? tpPlaceImage(city, placeName) : `assets/images/places/${placeSlug(city)}-${placeSlug(placeName)}.jpg`;
}

function getPlaceFallbackPhoto(placeName = 'landmark', city = '') {
  return typeof tpRemoteImageUrl === 'function' ? tpRemoteImageUrl(`${placeName} ${city} landmark travel`, 1200, 800) : 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80';
}

function placeImageOnError(placeName, city, w = 1200, h = 800) {
  return typeof tpImgOnError === 'function' ? tpImgOnError(`${placeName} ${city} landmark travel`, w, h) : `this.onerror=null;this.src='${getPlaceFallbackPhoto(placeName, city)}';`;
}

function cityImageOnError(city, w = 1600, h = 900) {
  return typeof tpImgOnError === 'function' ? tpImgOnError(`${city} city travel skyline`, w, h) : `this.onerror=null;this.src='${getCityFallbackPhoto(city)}';`;
}


function makePlaceDescription(name, city, countryName, category) {
  const n = String(name || 'это место');
  const lower = n.toLowerCase();

  if (category === 'attractions') {
    if (lower.includes('музей') || lower.includes('галерея')) {
      return `${n} - место для спокойного знакомства с историей, искусством и искусством города. Сюда стоит зайти, если хочется не только красивых фото, но и нормального контекста.`;
    }
    if (lower.includes('собор') || lower.includes('мечеть') || lower.includes('храм') || lower.includes('церковь') || lower.includes('монастыр')) {
      return `${n} - важная культурная точка. Здесь хорошо видны архитектура, местные традиции и детали, которые легко пропустить на бегу.`;
    }
    if (lower.includes('кремль') || lower.includes('замок') || lower.includes('крепость') || lower.includes('форт') || lower.includes('цитадель')) {
      return `${n} - историческое место с мощной архитектурой, видами и ощущением старого города. Хороший вариант для первой прогулки.`;
    }
    if (lower.includes('дворец') || lower.includes('палат')) {
      return `${n} - часть парадной истории города: архитектура, власть, богатые интерьеры и всё то, что явно не собиралось выглядеть скромно.`;
    }
    if (lower.includes('площад') || lower.includes('рынок') || lower.includes('улица') || lower.includes('набереж')) {
      return `${n} - живая городская точка: прогулки, люди, кафе, детали улиц и туристическая атмосфера без ощущения скучной экскурсии.`;
    }
    if (lower.includes('олимпий')) {
      return `${n} - важная достопримечательность. Место связано с крупными спортивными событиями и новым этапом развития города.`;
    }
    if (lower.includes('парк') || lower.includes('сад')) {
      return `${n} - важное место для прогулок. Тут можно выдохнуть, посмотреть на город спокойнее и не превращать отпуск в марафон.`;
    }
    return `${n} - важная достопримечательность. Подойдёт для первой прогулки, фотографий и понимания того, чем город цепляет туристов.`;
  }

  if (lower.includes('пляж') || lower.includes('бухт') || lower.includes('лагун') || lower.includes('море') || lower.includes('остров')) {
    return `${n} - красивое место у воды: свет, прогулки и фотографии, ради которых люди внезапно начинают верить в отпуск.`;
  }
  if (lower.includes('гора') || lower.includes('холм') || lower.includes('смотров') || lower.includes('пик') || lower.includes('скала')) {
    return `${n} - место с хорошими видами. Особенно красиво утром или вечером, когда свет делает за человека половину работы.`;
  }
  if (lower.includes('парк') || lower.includes('сад') || lower.includes('рощ') || lower.includes('лес')) {
    return `${n} - зелёная точка для прогулки, воздуха и тихого побега от городского шума.`;
  }
  if (lower.includes('каньон') || lower.includes('водопад') || lower.includes('озеро') || lower.includes('река') || lower.includes('ущель')) {
    return `${n} - природное место: вода, рельеф, виды и шанс сделать фото, которое не выглядит как обычный будний день.`;
  }
  return `${n} - красивое место для прогулки, фото и короткого маршрута без ощущения, что отпуск превратился в расписание электрички.`;
}

function makePlaceHistory(name, city, category) {
  const n = String(name || 'это место');
  const lower = n.toLowerCase();

  if (category === 'attractions') {
    if (lower.includes('музей') || lower.includes('галерея')) {
      return `${n} хранит коллекции и сюжеты, через которые проще понять город: искусство, быт, эпохи и людей, которые всё это зачем-то создавали, сохраняли и передавали дальше.`;
    }
    if (lower.includes('собор') || lower.includes('церковь') || lower.includes('мечеть') || lower.includes('храм') || lower.includes('монастыр')) {
      return `${n} связан с религиозной и культурной историей города. Такие места переживают смену эпох, ремонт, туристов с камерами и всё равно остаются сильными точками маршрута.`;
    }
    if (lower.includes('кремль') || lower.includes('замок') || lower.includes('крепость') || lower.includes('форт') || lower.includes('цитадель')) {
      return `${n} появился как часть оборонной или правительственной истории. Здесь хорошо видно, как город защищался, рос и превращал камни в достопримечательность.`;
    }
    if (lower.includes('дворец') || lower.includes('палат')) {
      return `${n} связан с парадной историей города: власть, богатые интерьеры, большие решения и архитектура, которая явно не собиралась быть скромной.`;
    }
    if (lower.includes('площад') || lower.includes('улица') || lower.includes('рынок') || lower.includes('набереж')) {
      return `${n} стал частью городской жизни: здесь встречались, торговали, гуляли, спорили и делали всё то, из чего потом складывается история места.`;
    }
    if (lower.includes('олимпий')) {
      return `${n} связан с крупными спортивными событиями и новым этапом развития города. Теперь это не только память о соревнованиях, но и удобное пространство для прогулок.`;
    }
    return `${n} связан с историей города и помогает увидеть место не только как точку на карте, а как пространство с прошлым, архитектурой и характером.`;
  }

  const jokes = [
    `${n} не обязано доказывать свою историческую важность. Оно просто красивое, и, что редкость, этого вполне достаточно.`,
    `${n} - тот случай, когда история может помолчать, а вид всё равно делает работу за всех экскурсоводов сразу.`,
    `${n} любят не за даты и таблички, а за воздух, свет и ощущение, что город на минуту перестал шуметь.`,
    `${n} - место для прогулки без экзамена по истории. Просто красиво, просто приятно, цивилизация иногда справляется.`,
    `${n} выглядит так, будто его добавили в маршрут не по учебнику, а потому что туда реально хочется прийти.`
  ];

  if (lower.includes('роща') || lower.includes('лес') || lower.includes('сад') || lower.includes('парк')) {
    return `${n} стало местом для прогулок, отдыха и тихого побега от города. История тут не кричит с фасадов, зато спокойно шуршит листвой.`;
  }
  if (lower.includes('пляж') || lower.includes('бухт') || lower.includes('лагун') || lower.includes('озеро') || lower.includes('река') || lower.includes('водопад')) {
    return `${n} ценят за воду, свет и вид, а не за громкую историческую драму. Иногда лучший культурный опыт - просто сесть и посмотреть вокруг.`;
  }
  if (lower.includes('гора') || lower.includes('холм') || lower.includes('смотров') || lower.includes('скала')) {
    return `${n} любят за вид. История тут простая: люди поднимаются выше, смотрят вниз и внезапно становятся чуть спокойнее.`;
  }
  return jokes[Math.abs(n.length + String(city || '').length) % jokes.length];
}

function normalizePlaceItem(item, city, category) {
  const dest = getPlacesDestination(city);
  const countryName = dest?.country && PLACES_COUNTRY_NAMES[dest.country] || '';
  if (typeof item === 'object' && item !== null) {
    return {
      name: item.name || item.title || 'Место',
      location: item.location || `${item.name || item.title || 'Место'}, ${city}, ${countryName}`,
      photo: item.photo || getPlacePhoto(item.name || item.title || 'Место', city),
      description: item.description || makePlaceDescription(item.name || item.title || 'Место', city, countryName, category),
      category,
      entry: typeof tpPlaceEntry === 'function' ? tpPlaceEntry(item.name || item.title || 'Место', category) : { price: 0, label: 'Бесплатно' }
    };
  }
  return {
    name: item,
    location: `${item}, ${city}${countryName ? `, ${countryName}` : ''}`,
    photo: getPlacePhoto(item, city),
    description: makePlaceDescription(item, city, countryName, category),
    category,
    entry: typeof tpPlaceEntry === 'function' ? tpPlaceEntry(item, category) : { price: 0, label: 'Бесплатно' }
  };
}

function getPlaceItems(city, category) {
  const data = CITY_PLACES[city] || { attractions: [], beauty: [] };
  return (data[category] || []).map(item => normalizePlaceItem(item, city, category));
}


function renderPlacePills(activeCity) {
  const wrap = document.getElementById('places-city-pills');
  if (!wrap) return;
  const allActive = !activeCity || activeCity === '__all__';
  const allBtn = `<button onclick="openAllPlaces()"
    class="px-3 py-2 rounded-full text-sm whitespace-nowrap transition ${allActive ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-300'}">
    ✨ Все места
  </button>`;
  const cityBtns = getPlacesCityList().map(city => {
    const d = getPlacesDestination(city);
    const active = city === activeCity;
    return `<button onclick="openPlacesForCity('${jsString(city)}')"
      class="px-3 py-2 rounded-full text-sm whitespace-nowrap transition ${active ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white' : 'bg-white/10 hover:bg-white/20 text-slate-300'}">
      ${d?.emoji || '📍'} ${city}
    </button>`;
  }).join('');
  wrap.innerHTML = allBtn + cityBtns;
}

function renderPlacesCategory(title, icon, items, city, category) {
  return `
    <div class="card-gradient rounded-2xl p-5">
      <h3 class="text-xl font-bold mb-4">${icon} ${title}</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
        ${items.map((item, index) => {
          const place = normalizePlaceItem(item, city, category);
          return `
            <button type="button" onclick="openPlaceDetail('${jsString(city)}', '${category}', ${index})"
              class="relative h-40 overflow-hidden rounded-xl border border-white/10 text-left group">
              <img src="${place.photo}" onerror="${placeImageOnError(place.name, city, 900, 650)}" alt="${place.name}" class="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105">
              <div class="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/45 to-slate-950/10"></div>
              <div class="absolute inset-x-0 bottom-0 p-4">
                <div class="text-xs text-slate-300/80 mb-1">${String(index + 1).padStart(2, '0')}</div>
                <div class="font-semibold text-slate-100 mb-1 drop-shadow">${place.name}</div>
                <div class="text-xs text-slate-300 line-clamp-2">📍 ${place.location}</div>
                <div class="text-xs ${place.entry?.price ? 'text-amber-300' : 'text-emerald-300'} mt-1 text-center">${place.entry?.label || 'Бесплатно'}</div>
              </div>
            </button>`;
        }).join('')}
      </div>
    </div>`;
}

function renderAllPlaces() {
  const content = document.getElementById('places-content');
  if (!content) return;
  renderPlacePills('__all__');
  const input = document.getElementById('places-search');
  if (input) input.value = '';
  try { localStorage.removeItem('travelplan_places_city'); } catch {}

  const cities = getPlacesCityList();
  content.innerHTML = `
    <div class="card-gradient rounded-3xl overflow-hidden mb-6">
      <div class="h-56 md:h-72 place-city-hero flex items-end" style="background-image:url('${getCityFallbackPhoto()}')">
        <div class="p-6 md:p-8 w-full">
          <div class="max-w-3xl">
            <div class="text-xs uppercase tracking-widest text-slate-300/80 mb-2">Интересные места</div>
            <h2 class="text-3xl md:text-4xl font-bold">Все интересные места</h2>
            <p class="text-slate-200/90 mt-2">Достопримечательности и красивые места по всем городам. Пиши город сверху или выбирай карточку ниже.</p>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      ${cities.map(city => renderCityPlacePreview(city)).join('')}
    </div>
  `;
}

function renderCityPlacePreview(city) {
  const dest = getPlacesDestination(city);
  const data = CITY_PLACES[city] || { attractions: [], beauty: [] };
  const countryName = dest?.country && PLACES_COUNTRY_NAMES[dest.country] || '';
  const firstAttractions = (data.attractions || []).slice(0, 2).map((name, index) => normalizePlaceItem(name, city, 'attractions'));
  const firstBeauty = (data.beauty || []).slice(0, 2).map((name, index) => normalizePlaceItem(name, city, 'beauty'));
  const all = [...firstAttractions.map((p, i) => ({...p, index: i, category: 'attractions'})), ...firstBeauty.map((p, i) => ({...p, index: i, category: 'beauty'}))];
  return `
    <div class="card-gradient rounded-2xl overflow-hidden">
      <button type="button" onclick="openPlacesForCity('${jsString(city)}')" class="w-full h-36 place-city-hero flex items-end text-left" style="background-image:linear-gradient(180deg,rgba(8,14,26,.05),rgba(8,14,26,.55)),url('${getCityPhoto(city)}'),url('${getCityFallbackPhoto(city)}')">
        <div class="p-4 w-full">
          <h3 class="text-xl font-bold">${city}</h3>
          <p class="text-sm text-slate-200/90">${countryName}</p>
        </div>
      </button>
      <div class="p-4 space-y-2">
        ${all.map(item => `
          <button type="button" onclick="openPlaceDetail('${jsString(city)}', '${item.category}', ${item.index})" class="relative w-full h-24 text-left rounded-xl overflow-hidden border border-white/10 group">
            <img src="${item.photo}" onerror="${placeImageOnError(item.name, city, 600, 400)}" alt="${item.name}" class="absolute inset-0 w-full h-full object-cover transition duration-300 group-hover:scale-105">
            <div class="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20"></div>
            <div class="absolute inset-0 p-3 flex flex-col justify-end">
              <div class="text-sm font-semibold text-slate-100 drop-shadow">${item.category === 'attractions' ? '🏛️' : '✨'} ${item.name}</div>
              <div class="text-xs text-slate-300">${item.category === 'attractions' ? 'Достопримечательность' : 'Красивое место'} · ${item.entry?.label || 'Бесплатно'}</div>
            </div>
          </button>`).join('')}
      </div>
    </div>`;
}

function renderPlaces(city) {
  if (!city || city === '__all__') {
    renderAllPlaces();
    return;
  }
  const content = document.getElementById('places-content');
  if (!content) return;
  const dest = getPlacesDestination(city);
  const selectedCity = dest?.city || city || getPlacesCityList()[0];
  const data = CITY_PLACES[selectedCity] || { attractions: [], beauty: [] };
  const countryName = dest?.country && PLACES_COUNTRY_NAMES[dest.country] || '';
  const cityPhoto = getCityPhoto(selectedCity);

  renderPlacePills(selectedCity);

  content.innerHTML = `
    <div class="card-gradient rounded-3xl overflow-hidden mb-6">
      <div class="h-64 md:h-80 place-city-hero flex items-end" style="background-image:linear-gradient(180deg,rgba(8,14,26,.05),rgba(8,14,26,.55)),url('${cityPhoto}'),url('${getCityFallbackPhoto(selectedCity)}')">
        <div class="p-6 md:p-8 w-full">
          <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <div class="text-xs uppercase tracking-widest text-slate-300/80 mb-2">Интересные места</div>
              <h2 class="text-3xl md:text-4xl font-bold">${selectedCity}</h2>
              <p class="text-slate-200/90 mt-2">${countryName ? `${countryName} · ` : ''}${dest?.desc || 'Достопримечательности и красивые места'}</p>
            </div>
            <div class="flex gap-2">
              <button onclick="selectDestination('${jsString(selectedCity)}', 'flights')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 font-semibold text-sm">✈️ Билеты</button>
              <button onclick="selectDestination('${jsString(selectedCity)}', 'hotels')" class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 font-semibold text-sm">🏨 Отели</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
      ${renderPlacesCategory('Достопримечательности', '🏛️', data.attractions || [], selectedCity, 'attractions')}
      ${renderPlacesCategory('Красивые места', '✨', data.beauty || [], selectedCity, 'beauty')}
    </div>
  `;
}


const PLACE_REVIEWS_KEY = 'travelplan_place_reviews';

function getPlaceReviewKey(city, placeName) {
  return `place_${city}_${placeName}`;
}

function loadPlaceReviews(key) {
  try {
    const raw = localStorage.getItem(PLACE_REVIEWS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    return all[key] || [];
  } catch { return []; }
}

function savePlaceReview(key, review, city, country, placeName) {
  try {
    const raw = localStorage.getItem(PLACE_REVIEWS_KEY);
    const all = raw ? JSON.parse(raw) : {};
    if (!all[key]) all[key] = [];
    all[key].unshift(review);
    localStorage.setItem(PLACE_REVIEWS_KEY, JSON.stringify(all));
  } catch {}
  if (typeof dbAddReview === 'function') {
    dbAddReview({
      entityType: 'place',
      entityId: key,
      city,
      country,
      authorName: review.author || (typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость'),
      rating: review.rating,
      comment: review.text || null,
      imageUrl: review.imageUrl || null
    }).catch(err => console.warn('Отзыв места сохранён локально, но не ушёл в Supabase:', err.message || err));
  }
}

function renderPlaceReviewStars(rating) {
  return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function pickPlaceReviewStar(n) {
  window._placeReviewStarRating = n;
  document.querySelectorAll('.place-review-star-btn').forEach(btn => {
    btn.style.color = parseInt(btn.dataset.star) <= n ? '#fbbf24' : '';
  });
}

function renderPlaceReviewsBlock(key) {
  const reviews = loadPlaceReviews(key);
  const reviewsHtml = reviews.length === 0
    ? '<p class="text-slate-500 text-sm text-center py-3">Пока нет отзывов.</p>'
    : reviews.map(r => `
      <div class="bg-white/5 border border-white/10 rounded-xl p-4 mb-3">
        <div class="flex items-center justify-between gap-3 mb-1">
          <span class="font-semibold text-sm">${r.author}</span>
          <span class="text-amber-400 text-sm">${renderPlaceReviewStars(r.rating)}</span>
        </div>
        ${r.text ? `<p class="text-slate-300 text-sm">${r.text}</p>` : ''}
        ${typeof renderReviewImage === 'function' ? renderReviewImage(r.imageUrl) : ''}
        <p class="text-slate-600 text-xs mt-1">${r.date}</p>
      </div>`).join('');
  return `
    <div class="mt-6 border-t border-white/10 pt-4">
      <h3 class="font-semibold mb-3">✍️ Оставьте отзыв о месте</h3>
      <div class="text-xs text-slate-400 mb-2">Отзыв будет опубликован от имени: <span class="text-sky-300 font-semibold">${typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость'}</span></div>
      <div class="flex gap-1 mb-2">
        ${[1,2,3,4,5].map(n => `<button class="place-review-star-btn text-2xl text-slate-600 hover:text-amber-400 transition" data-star="${n}" onclick="pickPlaceReviewStar(${n})">★</button>`).join('')}
      </div>
      <textarea id="place-review-text" rows="3" placeholder="Комментарий можно не писать"
        class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-sm mb-3 focus:border-sky-500 focus:outline-none resize-none"></textarea>
      <div class="grid grid-cols-1 gap-2 mb-3">
        <input id="place-review-image-file" type="file" accept="image/*" class="w-full text-xs text-slate-400 file:mr-3 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-white/10 file:text-white hover:file:bg-white/20">
        <input id="place-review-image-url" type="url" placeholder="Или ссылка на фото" class="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-xl text-sm focus:border-sky-500 focus:outline-none">
      </div>
      <button onclick="submitPlaceReview('${jsString(key)}')" class="w-full py-2.5 bg-gradient-to-r from-sky-500 to-blue-600 rounded-xl text-sm font-semibold">Опубликовать отзыв</button>
    </div>
    <div class="mt-5 border-t border-white/10 pt-4">
      <h3 class="font-semibold mb-3">💬 Отзывы (${reviews.length})</h3>
      <div id="place-reviews-list">${reviewsHtml}</div>
    </div>`;
}

async function submitPlaceReview(key) {
  if (typeof refreshAuthState === 'function') { try { await refreshAuthState(); } catch {} }
  const ctx = window._currentPlaceReviewContext;
  const rating = window._placeReviewStarRating || 0;
  const text = (document.getElementById('place-review-text')?.value || '').trim();
  if (!rating) return showToast('Выберите оценку', 'error');
  let imageUrl = null;
  try { imageUrl = typeof getReviewImageValue === 'function' ? await getReviewImageValue('place-review-image-file', 'place-review-image-url') : null; }
  catch (error) { showToast(error.message, 'error'); return; }

  const review = {
    author: typeof getReviewAuthorName === 'function' ? getReviewAuthorName() : 'Гость',
    rating,
    text,
    imageUrl,
    date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
  };
  savePlaceReview(key, review, ctx?.city, ctx?.country, ctx?.placeName);
  if (ctx) openPlaceDetail(ctx.city, ctx.category, ctx.index);
  showToast('Отзыв опубликован');
}

function closePlaceDetailModal() {
  const modal = document.getElementById('place-detail-modal');
  if (modal) { modal.style.display = 'none'; modal.classList.add('hidden'); }
}

function openPlaceDetailModal() {
  const modal = document.getElementById('place-detail-modal');
  if (modal) { modal.style.display = 'flex'; modal.classList.remove('hidden'); }
}

function openPlaceDetail(city, category, index) {
  const items = getPlaceItems(city, category);
  const place = items[index];
  const dest = getPlacesDestination(city);
  const countryName = dest?.country && PLACES_COUNTRY_NAMES[dest.country] || '';
  const content = document.getElementById('place-detail-content');
  if (!content || !place) return;
  const categoryName = category === 'attractions' ? 'Достопримечательность' : 'Красивое место';
  const mapsQuery = encodeURIComponent(`${place.name}, ${city}, ${countryName}`);
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;

  content.innerHTML = `
    <div class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 mb-5">
      <img src="${place.photo}" onerror="${placeImageOnError(place.name, city, 1200, 800)}" alt="${place.name}" class="w-full h-64 md:h-80 object-cover">
    </div>
    <div class="flex flex-wrap items-center gap-2 mb-3">
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-sky-500/15 text-sky-300 border border-sky-500/20">${categoryName}</span>
      <span class="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/10 text-slate-300 border border-white/10">${city}${countryName ? `, ${countryName}` : ''}</span>
    </div>
    <h3 class="text-2xl md:text-3xl font-bold mb-3">${place.name}</h3>
    <p class="text-slate-300 mb-3">${place.description}</p>
    <div class="flex flex-wrap gap-2 mb-5"><span class="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 ${place.entry?.price ? 'text-amber-300' : 'text-emerald-300'}">${place.entry?.label || 'Бесплатно'}</span>${typeof tpRenderTags === 'function' ? tpRenderTags({type:'place', city, name:place.name, country:dest?.country, entryPrice:place.entry?.price || 0}) : ''}</div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div class="text-xs uppercase tracking-widest text-slate-500 mb-2">Точное место</div>
        <div class="font-medium text-slate-100">📍 ${place.location}</div>
      </div>
      <div class="bg-white/5 border border-white/10 rounded-2xl p-4">
        <div class="text-xs uppercase tracking-widest text-slate-500 mb-2">История -</div>
        <div class="font-medium text-slate-100">${makePlaceHistory(place.name, city, category)}</div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row gap-3">
      <a href="${mapsUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 font-semibold">🗺️ Открыть на карте</a>
    </div>
    ${renderPlaceReviewsBlock(getPlaceReviewKey(city, place.name))}
  `;
  window._currentPlaceReviewContext = { city, country: countryName, placeName: place.name, category, index };
  window._placeReviewStarRating = 0;
  openPlaceDetailModal();
}

function openAllPlaces() {
  try { localStorage.removeItem('travelplan_places_city'); } catch {}
  window.travelplanPlacesForcedCity = null;
  const input = document.getElementById('places-search');
  if (input) input.value = '';
  hidePlacesSuggestions();
  renderAllPlaces();
  showSection('places');
}

function openPlacesForCity(city) {
  try { localStorage.setItem('travelplan_places_city', city); } catch {}
  window.travelplanPlacesForcedCity = city;
  window.travelplanPlacesOpenedFromCity = true;
  const input = document.getElementById('places-search');
  if (input) input.value = city;
  hidePlacesSuggestions();
  renderPlaces(city);
  showSection('places');
}

function hidePlacesSuggestions() {
  const box = document.getElementById('places-suggestions');
  if (box) box.classList.add('hidden');
}

function renderPlacesSuggestions(query = '') {
  const box = document.getElementById('places-suggestions');
  if (!box) return;
  const q = query.trim().toLowerCase();
  const cities = getPlacesCityList().filter(city => !q || city.toLowerCase().includes(q));
  const items = [
    `<button type="button" class="autocomplete-option" onclick="openAllPlaces()"><span>✨ Все интересные места</span><small>все города</small></button>`,
    ...cities.map(city => {
      const d = getPlacesDestination(city);
      const countryName = d?.country && PLACES_COUNTRY_NAMES[d.country] || '';
      return `<button type="button" class="autocomplete-option" onclick="openPlacesForCity('${jsString(city)}')"><span>${d?.emoji || '📍'} ${city}</span><small>${countryName}</small></button>`;
    })
  ];
  box.innerHTML = items.join('');
  box.classList.remove('hidden');
}

function initPlaces() {
  const forced = window.travelplanPlacesOpenedFromCity ? window.travelplanPlacesForcedCity : null;
  const city = forced && CITY_PLACES[forced] ? forced : null;
  window.travelplanPlacesOpenedFromCity = false;
  window.travelplanPlacesForcedCity = null;
  const input = document.getElementById('places-search');
  if (input && !input.dataset.bound) {
    input.dataset.bound = '1';
    input.addEventListener('input', () => {
      renderPlacesSuggestions(input.value);
    });
    input.addEventListener('focus', () => renderPlacesSuggestions(input.value));
    document.addEventListener('click', (event) => {
      const box = document.getElementById('places-suggestions');
      if (!box || !input) return;
      if (!box.contains(event.target) && event.target !== input) hidePlacesSuggestions();
    });
  }
  if (input) input.value = city || '';
  renderPlaces(city || '__all__');
}

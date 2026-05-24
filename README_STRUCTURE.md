# Структура HTML

Теперь большие куски `index.html` вынесены в отдельные файлы.

## Где что лежит

- `pages/header.html` - шапка и мобильное меню
- `pages/explore.html` - главная страница / топ-направления
- `pages/feed.html` - лента поездок
- `pages/flights.html` - страница поиска билетов
- `pages/hotels.html` - страница поиска отелей
- `pages/places.html` - интересные места
- `pages/bookings.html` - мои бронирования
- `pages/modals.html` - модальные окна
- `pages/footer.html` - футер

## Как редактировать

Редактируй нужный файл в `pages/`.

После изменений собери `index.html`:

```bash
python tools/build_index.py
```

Почему так: сайт остаётся простым статичным проектом без React/Vite/сборщика, но HTML уже не лежит одной гигантской простынёй.

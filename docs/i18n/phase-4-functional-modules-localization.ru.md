# Фаза 4. Перевод функциональных модулей

## Статус

Фаза 4 выполнена: функциональные домены переведены на i18n и заполнены словари `en/ru`.

## Покрытые домены

1. `agents`
2. `checks`
3. `alerts`
4. `scripts`
5. `tasks`
6. `software`
7. `settings`
8. `reporting` + `src/ee/**` (включая SSO)

## Что сделано

- Заменены hardcoded UI-строки на `t/$t/this.$t` в функциональных модулях.
- Для динамических сообщений использована именованная интерполяция (`{name}`, `{count}`, `{hostname}`, `{id}` и т.д.).
- Синхронно обновлены словари:
  - `src/i18n/en/agents.json` и `src/i18n/ru/agents.json`
  - `src/i18n/en/checks.json` и `src/i18n/ru/checks.json`
  - `src/i18n/en/alerts.json` и `src/i18n/ru/alerts.json`
  - `src/i18n/en/scripts.json` и `src/i18n/ru/scripts.json`
  - `src/i18n/en/tasks.json` и `src/i18n/ru/tasks.json`
  - `src/i18n/en/software.json` и `src/i18n/ru/software.json`
  - `src/i18n/en/settings.json` и `src/i18n/ru/settings.json`
  - `src/i18n/en/reporting.json` и `src/i18n/ru/reporting.json`
- Локализованы также уведомления в коде доменов (включая `src/core/settings/api.ts`).

## Проверки

- `npm run lint` — успешно.
- `npm run build` — успешно.
- Проверка паритета ключей для доменов Фазы 4:
  - `agents`: `en=510`, `ru=510`
  - `alerts`: `en=171`, `ru=171`
  - `checks`: `en=111`, `ru=111`
  - `scripts`: `en=124`, `ru=124`
  - `tasks`: `en=164`, `ru=164`
  - `software`: `en=20`, `ru=20`
  - `settings`: `en=317`, `ru=317`
  - `reporting`: `en=287`, `ru=287`
  - расхождений ключей `en/ru`: `0`.

## Результат сканирования остаточных строк

- В целевом scope Фазы 4 остаточных hardcoded пользовательских строк в активном коде не обнаружено.
- Найдены только комментарии/неисполняемые фрагменты и технические литералы.

# Фаза 1. Инвентаризация hardcoded-строк

## Статус

Фаза 1 выполнена: собран реестр строк для миграции в i18n и определен порядок исполнения.

## Область сканирования

- `src/views/**`
- `src/layouts/**`
- `src/components/**`
- `src/core/**`
- `src/ee/**`
- `src/utils/**` (только notify/error/validation контексты)
- `src/stores/**` (фильтр по notify/error/validation)
- `src/store/**` (фильтр по notify/error/validation)
- `src/mixins/**` (только notify/error/validation контексты)

## Методика

- Поиск UI-visible литералов в `.vue/.ts/.js`:
  - текст в template;
  - `label/title/placeholder/hint/caption/error-message/no-data-label`;
  - `Notify/Dialog` и тексты валидации;
  - заголовки таблиц, пункты меню, подписи кнопок.
- Исключения: URL/API пути, CSS-классы, идентификаторы, protocol literals, чисто технические значения.
- Для каждого файла зафиксированы:
  - модуль;
  - приоритет (`critical_path`, `operational`, `admin_rare`);
  - `found_count`;
  - примеры строк.

## Сводка по директориям

- `src/views`: 41
- `src/layouts`: 12
- `src/components`: 968
- `src/core`: 24
- `src/ee`: 147
- `src/utils`: 5
- `src/stores`: 0
- `src/store`: 0
- `src/mixins`: 3

Итого: **1200** потенциально пользовательских hardcoded-строк в **145** файлах.

## Артефакты

- Полный реестр по файлам: `docs/i18n/phase-1-string-registry.csv`
- Строки, требующие интерполяции/плюрализации: `docs/i18n/phase-1-interpolation-pluralization.txt`

## Предлагаемый порядок миграции

1. `critical_path`: `LoginView`, `SessionExpired`, `InitialSetup`, `MainLayout`, ключевые блоки `DashboardView`.
2. Agent operations: `components/agents/**`, `modals/agents/**`, `TakeControl`, `RemoteBackground`, `WebVNC`.
3. Домены `alerts/checks/tasks/scripts` + validation/notify строки из `utils` и `mixins`.
4. `clients`, таблицы и общий UI (`AgentTable`, `TacticalTable`, `core/dashboard/ui/TacticalTable`).
5. Админские/редкие экраны: `accounts`, `coresettings`, `core/settings`, `components/core`.
6. EE-модули после стабилизации base UI: `ee/reporting/**`, `ee/sso/**`.

## Критерий завершения Фазы 1

- Есть реестр строк с файлом, модулем, приоритетом и типизацией миграции.
- Есть выделение строк с interpolation/pluralization.
- Есть согласованный порядок миграции по доменам.

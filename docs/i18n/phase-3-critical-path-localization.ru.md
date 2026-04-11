# Фаза 3. Перевод критического пути

## Статус

Фаза 3 выполнена: критический пользовательский путь локализован и переведен на i18n-ключи.

## Что локализовано

- Экраны аутентификации:
  - `LoginView`
  - `SessionExpired`
  - `InitialSetup`
  - `TOTPSetup`
- Основной layout:
  - `MainLayout` (баннеры, меню профиля, подсказки, счетчики, диалог сброса 2FA)
- Ключевые части dashboard:
  - `DashboardView` (дерево, контекстное меню, табы, фильтры, диалог удаления, предупреждение URL Actions)
  - `AgentTable` (подсказки, статусы, подписи, уведомления)
- Базовые общие диалоги:
  - `ConfirmDialog` (Yes/No/OK)
  - `ResetPass` (модалка сброса пароля)
- Базовые уведомления:
  - `src/boot/axios.js` (network offline notify/caption)

## Измененные namespaces

- `common`
- `auth`
- `navigation`
- `dashboard`
- `notifications`

## Измененные файлы

- `src/views/LoginView.vue`
- `src/views/SessionExpired.vue`
- `src/views/InitialSetup.vue`
- `src/views/TOTPSetup.vue`
- `src/layouts/MainLayout.vue`
- `src/views/DashboardView.vue`
- `src/components/AgentTable.vue`
- `src/components/ui/ConfirmDialog.vue`
- `src/components/accounts/ResetPass.vue`
- `src/boot/axios.js`
- `src/i18n/en/common.json`
- `src/i18n/ru/common.json`
- `src/i18n/en/auth.json`
- `src/i18n/ru/auth.json`
- `src/i18n/en/navigation.json`
- `src/i18n/ru/navigation.json`
- `src/i18n/en/dashboard.json`
- `src/i18n/ru/dashboard.json`
- `src/i18n/en/notifications.json`
- `src/i18n/ru/notifications.json`

## Проверка качества

- `npm run lint` — успешно.
- `npm run build` — успешно.
- Синтаксических и сборочных ошибок после миграции критического пути нет.

## Известные ограничения

- Вне критического пути остаются hardcoded-строки в функциональных и EE-модулях; они покрываются следующими фазами.
- Для части строк с количеством в critical-path пока используется именованная интерполяция без отдельной plural-формы; полноценная унификация pluralization запланирована на последующие домены.

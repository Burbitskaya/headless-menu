# HeadlessMenu – адаптивное меню без стилей

Реализация адаптивного бокового меню с использованием **Headless UI** подхода. Компонент предоставляет только бизнес-логику (открытие/закрытие, управление вложенными дропдаунами, активные состояния) и не содержит стилей, что позволяет легко интегрировать его с любыми дизайн-системами и внешним состоянием (React Router, localStorage, Redux ...).

---

## Установка и запуск

### Требования
- Node.js 
- npm / yarn / pnpm

### Установка

```bash
git clone https://github.com/Burbitskaya/headless-menu.git
cd headless-menu
npm install
```

### Запуск в режиме разработки

```bash
npm run dev
```

Приложение будет доступно по адресу `http://localhost:5173`.

### Сборка для production

```bash
npm run build
```

### Предпросмотр собранного приложения

```bash
npm run preview
```

---

## Структура проекта

```text
src/
├── headless-menu/
│   └── HeadlessMenu.tsx
│
├── router-menu/
│   ├── RouterMenu.tsx
│   ├── RouterMenuContext.tsx
│   ├── RouterMenuItem.tsx
│   ├── RouterMenuGroup.tsx
│   ├── SubMenuContext.tsx
│   ├── useMediaQuery.ts
│   │
│   ├── item/
│   │   ├── DesktopRouterMenuItem.tsx
│   │   └── MobileRouterMenuItem.tsx
│   │
│   └── group/
│       ├── DesktopRouterMenuGroup.tsx
│       └── MobileRouterMenuGroup.tsx
│
├── App.tsx
├── main.tsx
└── index.css
```
---

## Архитектура

Проект разделён на два уровня:

- **HeadlessMenu** — переиспользуемая логика меню без привязки к роутеру, UI и стилям.
- **RouterMenu** — конкретный потребитель `HeadlessMenu`, реализующий навигацию приложения для desktop и mobile.


### HeadlessMenu

`HeadlessMenu` отвечает только за состояние и взаимодействие меню.

Он предоставляет:

- открытие и закрытие основного меню;
- контролируемый и неконтролируемый режим;
- переключение состояния меню;
- управление открытым dropdown;
- автоматическое закрытие dropdown при закрытии основного меню;
- render props для передачи состояния UI-компонентам.

Основные составные части:

```tsx
<HeadlessMenu>
  <HeadlessMenu.Panel>
    ...
  </HeadlessMenu.Panel>

  <HeadlessMenu.Toggle>
    ...
  </HeadlessMenu.Toggle>

  <HeadlessMenu.Item>
    ...
  </HeadlessMenu.Item>

  <HeadlessMenu.Dropdown>
    <HeadlessMenu.DropdownTrigger>
      ...
    </HeadlessMenu.DropdownTrigger>

    <HeadlessMenu.DropdownContent>
      ...
    </HeadlessMenu.DropdownContent>
  </HeadlessMenu.Dropdown>
</HeadlessMenu>
```

### RouterMenu

`RouterMenu` является потребителем `HeadlessMenu` и добавляет прикладную логику навигации.

Он отвечает за:

- определение текущего маршрута;
- определение активного пункта;
- desktop/mobile представление;
- переходы через React Router;
- закрытие меню после выбора пункта;
- работу групп с вложенными пунктами;
- сохранение состояния открытости desktop sidebar.

Для связи компонентов используется `RouterMenuContext`.

Для вложенных пунктов используется отдельный `SubMenuContext`, который позволяет определить, находится ли `RouterMenuItem` внутри `RouterMenuGroup`.

### Desktop

На desktop используется боковая панель:

- открытое состояние — `w-64`;
- закрытое состояние — `w-16`;
- при закрытом sidebar группа может открывать dropdown при наведении;
- при открытом sidebar группа раскрывается кликом;
- активная группа определяется по текущему маршруту.

Пример:

```tsx
<RouterMenu.Group
  label="Отчёты"
  to="/reports"
  icon={<BarChart3 size={20} />}
>
  <RouterMenu.Item
    to="/reports"
    label="Все отчёты"
  />

  <RouterMenu.Item
    to="/reports/sales"
    label="Продажи"
  />

  <RouterMenu.Item
    to="/reports/finance"
    label="Финансы"
  />
</RouterMenu.Group>
```

### Mobile

На mobile используется нижняя навигационная панель.

Для группы:

1. пользователь нажимает на иконку;
2. открывается нижняя панель с подпунктами;
3. после выбора подпункта панель закрывается;
4. активность определяется по текущему маршруту.

При этом родительская группа остаётся активной для всех своих дочерних маршрутов.

---

## Структура состояния

Состояние разделено между несколькими уровнями.

### HeadlessMenu

Хранит:

```ts
open: boolean;
openedDropdownId: string | null;
```

`open` отвечает за основное состояние меню.

`openedDropdownId` определяет, какой dropdown сейчас открыт.

Одновременно может быть открыт только один dropdown.

### RouterMenuContext

Передаёт потребителям:

```ts
{
  pathname,
  closeMenu,
  variant,
}
```

где:

- `pathname` — текущий URL;
- `closeMenu` — закрытие основного меню;
- `variant` — `"desktop"` или `"mobile"`.

### SubMenuContext

Используется внутри группы и передаёт:

```ts
{
  menuOpen,
  close,
}
```

Это позволяет дочернему `RouterMenuItem` корректно закрыть группу после выбора пункта.


## Использование RouterMenu

Пример использования:

```tsx
<RouterMenu>
  <RouterMenu.Item
    to="/"
    label="Главная"
    icon={<Home size={20} />}
  />

  <RouterMenu.Item
    to="/users"
    label="Пользователи"
    icon={<Users size={20} />}
  />

  <RouterMenu.Group
    label="Отчёты"
    to="/reports"
    icon={<BarChart3 size={20} />}
  >
    <RouterMenu.Item
      to="/reports"
      label="Все отчёты"
    />

    <RouterMenu.Item
      to="/reports/sales"
      label="Продажи"
    />

    <RouterMenu.Item
      to="/reports/finance"
      label="Финансы"
    />
  </RouterMenu.Group>

  <RouterMenu.Item
    to="/settings"
    label="Настройки"
    icon={<Settings size={20} />}
  />
</RouterMenu>
```

---

## Адаптивность

Определение desktop/mobile выполняется через `useMediaQuery`:

```ts
const isMobile = useMediaQuery(
  "(max-width: 767px)",
);
```

Если `variant` не передан явно:

```ts
const variant =
  propVariant ??
  (isMobile ? "mobile" : "desktop");
```

Также поддерживается принудительное указание варианта:

```tsx
<RouterMenu variant="desktop">
  ...
</RouterMenu>
```

или:

```tsx
<RouterMenu variant="mobile">
  ...
</RouterMenu>
```

---

## Доступность

В качестве интерактивных элементов используются стандартные HTML-элементы:

- `button`;
- `NavLink`.

Для уникальных ID dropdown используется React `useId()`.

Кнопка закрытия мобильного подменю имеет `aria-label`:

```tsx
aria-label="Закрыть"
```

Headless-слой не навязывает конкретную реализацию accessibility, поэтому дополнительные ARIA-атрибуты и управление focus могут добавляться на уровне конкретного потребителя.

---

## Tailwind CSS

Tailwind CSS используется только на уровне UI-компонентов sidebar.

`HeadlessMenu` не содержит классов и не зависит от Tailwind.

Поэтому headless-логику можно использовать с:

- Tailwind CSS;
- CSS Modules;
- обычным CSS;
- CSS-in-JS;
- другой UI-библиотекой.

Замена стилизации не требует изменения `HeadlessMenu`.

---

## Лицензия

Проект распространяется под лицензией [MIT](./LICENSE).

MIT © 2026 Yana Burbitskaya

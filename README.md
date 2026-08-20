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
├── headless-menu/               # Headless-компонент (вся логика)
│   └── HeadlessMenu.tsx
├── components/
│   └── sidebar/                 # Потребители headless-меню
│       ├── RouterSidebar.tsx    # Контейнер с роутером и localStorage
│       ├── DesktopSidebar.tsx   # Десктопная вёрстка
│       ├── MobileSidebar.tsx    # Мобильная вёрстка (нижняя панель + модалка)
│       ├── NavItem.tsx          # Пункт меню (десктоп)
│       ├── SubNavItem.tsx       # Подпункт (десктоп)
│       ├── MobileNavItem.tsx    # Пункт нижней панели (мобилка)
│       ├── MobileSubNavItem.tsx # Подпункт в модалке
│       └── menuConfig.tsx       # Конфигурация пунктов меню
├── App.tsx
├── main.tsx
└── index.css                    # Tailwind v4 (импорт @import "tailwindcss")
```

---

## Архитектура

- **HeadlessMenu** — независимый от UI компонент, предоставляющий контекст и набор составных частей: `Panel`, `Toggle`, `Item`, `Dropdown`, `DropdownTrigger`, `DropdownContent`.
  Он не знает о роутере, стилях или внешнем состоянии, но поддерживает контролируемый режим через пропсы `open` / `onOpenChange`.
- **Потребители** (папка `sidebar`) используют `HeadlessMenu` для построения двух вариантов интерфейса:
  - **DesktopSidebar** — классическое боковое меню с возможностью сворачивания.
  - **MobileSidebar** — нижняя панель навигации, при клике на пункт с подпунктами открывается модальное окно снизу.
- **React Router** используется только в потребителе (`RouterSidebar`), активный пункт определяется через `useLocation` и передаётся в `HeadlessMenu.Item` через проп `active`.
- **localStorage** синхронизирует состояние открытости меню (контролируемый режим) — при перезагрузке страницы состояние сохраняется.
- **Tailwind CSS v4** используется для стилизации, но может быть заменён на любую другую библиотеку или чистый CSS — headless-часть останется без изменений.

---

## Использование HeadlessMenu

### Базовый пример

```tsx
import { HeadlessMenu } from "./headless-menu/HeadlessMenu";

function MySidebar() {
  return (
    <HeadlessMenu>
      <HeadlessMenu.Panel>
        {({ open }) => (
          <aside className={open ? "w-64" : "w-16"}>
            <HeadlessMenu.Item
              id="home"
              active={pathname === "/"}
            >
              {({ active, closeDropdown }) => (
                <NavLink
                  to="/"
                  onClick={closeDropdown}
                  className={active ? "active" : ""}
                >
                  Домой
                </NavLink>
              )}
            </HeadlessMenu.Item>

            <HeadlessMenu.Dropdown id="reports">
              <HeadlessMenu.DropdownTrigger>
                {({ open, toggle }) => (
                  <button
                    onClick={toggle}
                    className={open ? "opened" : ""}
                  >
                    Отчёты
                  </button>
                )}
              </HeadlessMenu.DropdownTrigger>

              <HeadlessMenu.DropdownContent>
                {({ open }) =>
                  open && (
                    <ul>
                      <li>
                        <NavLink to="/reports">
                          Все отчёты
                        </NavLink>
                      </li>
                      <li>
                        <NavLink to="/reports/sales">
                          Продажи
                        </NavLink>
                      </li>
                    </ul>
                  )
                }
              </HeadlessMenu.DropdownContent>
            </HeadlessMenu.Dropdown>

            <HeadlessMenu.Toggle>
              {({ open: menuOpen, toggle }) => (
                <button onClick={toggle}>
                  {menuOpen ? "Свернуть" : "Развернуть"}
                </button>
              )}
            </HeadlessMenu.Toggle>
          </aside>
        )}
      </HeadlessMenu.Panel>
    </HeadlessMenu>
  );
}
```

### Контролируемый режим (с синхронизацией с localStorage)

```tsx
const [isOpen, setIsOpen] = useState(() => {
  const stored = localStorage.getItem("sidebarOpen");

  return stored ? JSON.parse(stored) : false;
});

useEffect(() => {
  localStorage.setItem(
    "sidebarOpen",
    JSON.stringify(isOpen),
  );
}, [isOpen]);

<HeadlessMenu
  open={isOpen}
  onOpenChange={setIsOpen}
>
  {/* ... */}
</HeadlessMenu>
```

### Интеграция с React Router

```tsx
import { useLocation, NavLink } from "react-router-dom";

function RouterSidebar() {
  const { pathname } = useLocation();

  return (
    <HeadlessMenu>
      <HeadlessMenu.Panel>
        {({ open }) => (
          <aside>
            <HeadlessMenu.Item
              id="home"
              active={pathname === "/"}
            >
              {({ active, closeDropdown }) => (
                <NavLink
                  to="/"
                  onClick={closeDropdown}
                  className={active ? "active" : ""}
                >
                  Домой
                </NavLink>
              )}
            </HeadlessMenu.Item>

            {/* остальные пункты */}
          </aside>
        )}
      </HeadlessMenu.Panel>
    </HeadlessMenu>
  );
}
```

---

## API

### `<HeadlessMenu>` (корневой)

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `children` | `ReactNode` | — | Дочерние элементы (обычно `Panel`). |
| `open` | `boolean` | `undefined` | Если передан — компонент становится **контролируемым**. |
| `onOpenChange` | `(open: boolean) => void` | `undefined` | Колбэк при изменении `open` (используется с `open`). |

> Если `open` не указан, состояние управляется внутри `HeadlessMenu` (неконтролируемый режим).

### `<HeadlessMenu.Panel>`

| Проп | Тип | Описание |
|---|---|---|
| `children` | `({ open: boolean, close: () => void }) => ReactNode` | Функция, получающая состояние открытости и метод закрытия. |

### `<HeadlessMenu.Toggle>`

| Проп | Тип | Описание |
|---|---|---|
| `children` | `({ open, toggle, setOpen }) => ReactNode` | Функция для кнопки переключения. |

### `<HeadlessMenu.Item>`

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `id` | `string` (опционально) | — | Уникальный идентификатор (генерируется автоматически через `useId`). |
| `active` | `boolean` | `false` | Активен ли пункт. |
| `disabled` | `boolean` | `false` | Заблокирован ли пункт. |
| `children` | render prop | — | Получает `id`, `active`, `disabled`, `open` и методы закрытия dropdown, если они предоставлены API. |

### `<HeadlessMenu.Dropdown>`

| Проп | Тип | По умолчанию | Описание |
|---|---|---|---|
| `id` | `string` | — | Уникальный идентификатор dropdown. |
| `active` | `boolean` | `false` | Если `true`, dropdown автоматически открывается при открытии меню. |
| `children` | `ReactNode` | — | Вложенные `DropdownTrigger` и `DropdownContent`. |

### `<HeadlessMenu.DropdownTrigger>`

| Проп | Тип | Описание |
|---|---|---|
| `children` | render prop | Получает `open`, `menuOpen`, `toggle`, `openDropdown`, `closeDropdown`. |

### `<HeadlessMenu.DropdownContent>`

| Проп | Тип | Описание |
|---|---|---|
| `children` | render prop | Получает `open`, `menuOpen` и `close`; содержимое отображается в зависимости от состояния dropdown. |

---

## Адаптивность

В проекте реализована адаптивная логика:

- На экранах шире 768px отображается **DesktopSidebar** — боковая панель с возможностью сворачивания.
- На экранах меньше 768px отображается **MobileSidebar** — нижняя панель с всплывающей панелью для подменю.

Переключение происходит через CSS-классы (`md:flex` и `md:hidden`), но может быть легко заменено на JS-медиа-запросы при необходимости.

---

## Доступность

- Используется `useId()` для генерации уникальных идентификаторов.
- Интерактивные элементы строятся на стандартных `button` и `NavLink`.
- `aria-*` атрибуты добавляются в компонентах-потребителях там, где они необходимы.
- Стандартные интерактивные элементы позволяют использовать навигацию с клавиатуры.
- Для полноценной keyboard-навигации по пунктам меню можно дополнительно реализовать обработку стрелок `ArrowUp` / `ArrowDown`, `Enter`, `Escape` и соответствующие focus management.


---

## Лицензия

Проект распространяется под лицензией [MIT](./LICENSE).

MIT © 2026 Yana Burbitskaya

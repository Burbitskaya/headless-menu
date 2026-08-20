import { HeadlessMenu } from "../headless-menu/HeadlessMenu";
import { menuItems } from "./menuConfig";
import { MobileNavItem } from "./MobileNavItem";
import { MobileSubNavItem } from "./MobileSubNavItem";

type MobileSidebarProps = {
  pathname: string;
};

export function MobileSidebar({ pathname }: MobileSidebarProps) {
  return (
    <div className="md:hidden">
      <nav className="fixed bottom-0 left-0 right-0 z-40 grid grid-cols-4 border-t border-gray-200 bg-white px-2 py-2 shadow-lg">
        {menuItems.map((item) => {
          // Если есть дети –  дропдаун с модалкой
          if (item.children) {
            return (
              <MobileModal
                key={item.id}
                item={item}
                pathname={pathname}
              />
            );
          }
          // Обычный пункт
          return (
            <MobileNavItem
              key={item.id}
              to={item.path!}
              label={item.label}
              icon={item.icon}
              active={pathname === item.path}
            />
          );
        })}
      </nav>
    </div>
  );
}

// Модалка для подпунктов на мобилке
function MobileModal({ item, pathname }: { item: typeof menuItems[0]; pathname: string }) {
  const active = pathname.startsWith(item.path || item.id);

  return (
    <HeadlessMenu.Dropdown id={`mobile-${item.id}`}>
      <HeadlessMenu.DropdownTrigger>
        {({ toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className={`
              flex w-full flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-xs
              ${active ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}
            `}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        )}
      </HeadlessMenu.DropdownTrigger>

      <HeadlessMenu.DropdownContent>
        {({ open, close }) =>
          open ? (
            <div className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl border border-gray-200 bg-white shadow-2xl">
              <div className="flex h-14 items-center justify-between border-b border-gray-200 px-4">
                <span className="font-semibold">{item.label}</span>
                <button
                  type="button"
                  onClick={close}
                  className="flex h-10 w-10 items-center justify-center rounded-md text-gray-500 hover:bg-gray-100"
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-col gap-1 p-2">
                {item.children!.map((child) => (
                  <MobileSubNavItem
                    key={child.id}
                    to={child.path!}
                    label={child.label}
                    icon={child.icon}
                    close={close}
                  />
                ))}
              </div>
            </div>
          ) : null
        }
      </HeadlessMenu.DropdownContent>
    </HeadlessMenu.Dropdown>
  );
}
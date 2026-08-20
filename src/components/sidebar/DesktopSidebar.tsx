import { HeadlessMenu } from "../headless-menu/HeadlessMenu";
import { menuItems } from "./menuConfig";
import { NavItem } from "./NavItem";
import { SubNavItem } from "./SubNavItem";
import { Menu, Building2, ChevronLeft, ChevronRight } from "lucide-react";

type DesktopSidebarProps = {
  pathname: string;
};

export function DesktopSidebar({ pathname }: DesktopSidebarProps) {
  return (
    <HeadlessMenu.Panel>
      {({ open }) => (
        <aside
          className={`
            hidden h-screen shrink-0 flex-col bg-white shadow-lg transition-[width] duration-200 md:flex
            ${open ? "w-64" : "w-16"}
          `}
        >
          <div className="relative flex h-full flex-col">
            {/* Логотип / заголовок */}
            <div className="flex h-16 items-center border-b border-gray-200 px-3">
              <span className="flex w-10 shrink-0 justify-center">
                <Building2 size={24} />
              </span>
              {open && <span className="ml-2 font-semibold">Название</span>}
            </div>

            {/* Навигация */}
            <nav className="flex flex-col gap-2 p-2 pt-8">
              {menuItems.map((item) => {
                // Если есть дети – это дропдаун
                if (item.children) {
                  const isActive = pathname.startsWith(item.path || item.id);
                  return (
                    <div className="relative" key={item.id}>
                      <HeadlessMenu.Dropdown id={item.id} active={isActive}>
                        <HeadlessMenu.DropdownTrigger>
                          {({
                            open: dropdownOpen,
                            menuOpen,
                            toggle,
                            openDropdown,
                            closeDropdown,
                          }) => (
                            <div
                              onMouseEnter={() => {
                                if (!menuOpen) {
                                  openDropdown(); // при закрытом меню – открываем по ховеру
                                }
                              }}
                              onMouseLeave={() => {
                                if (!menuOpen) {
                                  closeDropdown();
                                }
                              }}
                            >
                              <button
                                type="button"
                                onClick={() => {
                                  if (menuOpen) {
                                    toggle(); // при открытом меню – переключаем по клику
                                  }
                                }}
                                className={`
                                  flex h-10 w-full items-center rounded-md px-1 hover:bg-gray-100
                                  ${isActive ? "bg-gray-200 font-semibold" : ""}
                                `}
                              >
                                <span className="flex w-10 shrink-0 justify-center">
                                  {item.icon}
                                </span>
                                {menuOpen && (
                                  <>
                                    <span className="ml-2 flex-1 text-left">{item.label}</span>
                                    {dropdownOpen ? (
                                      <ChevronLeft size={16} />
                                    ) : (
                                      <ChevronRight size={16} />
                                    )}
                                  </>
                                )}
                              </button>

                              <HeadlessMenu.DropdownContent>
                                {({ open: dropdownOpen, menuOpen, close }) =>
                                  dropdownOpen ? (
                                    <div
                                      className={
                                        menuOpen
                                          ? "ml-4 mt-1 flex flex-col gap-1"
                                          : "absolute left-full top-0 w-52 rounded-md bg-white p-1 shadow-lg"
                                      }
                                    >
                                      {item.children!.map((child) => (
                                        <SubNavItem
                                          key={child.id}
                                          to={child.path!}
                                          label={child.label}
                                          icon={child.icon}
                                          active={pathname === child.path}
                                          menuOpen={menuOpen}
                                          close={() => {
                                            if (!menuOpen) close();
                                          }}
                                        />
                                      ))}
                                    </div>
                                  ) : null
                                }
                              </HeadlessMenu.DropdownContent>
                            </div>
                          )}
                        </HeadlessMenu.DropdownTrigger>
                      </HeadlessMenu.Dropdown>
                    </div>
                  );
                }

                // Обычный пункт меню
                return (
                  <HeadlessMenu.Item key={item.id} id={item.id} active={pathname === item.path}>
                    {({ active, open: _open, closeDropdown }) => (
                      <NavItem
                        to={item.path!}
                        label={item.label}
                        icon={item.icon}
                        open={open}
                        active={active}
                        onClick={closeDropdown}
                      />
                    )}
                  </HeadlessMenu.Item>
                );
              })}
            </nav>

            {/* Кнопка сворачивания */}
            <div className="mt-auto">
              <HeadlessMenu.Toggle>
                {({ open: menuOpen, toggle }) => (
                  <button
                    type="button"
                    onClick={toggle}
                    className="flex h-10 w-full items-center rounded-md px-3 hover:bg-gray-100"
                  >
                    <span className="flex w-10 shrink-0 justify-center">
                      {menuOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
                    </span>
                    {menuOpen && <span className="ml-2">Свернуть</span>}
                  </button>
                )}
              </HeadlessMenu.Toggle>
            </div>
          </div>
        </aside>
      )}
    </HeadlessMenu.Panel>
  );
}


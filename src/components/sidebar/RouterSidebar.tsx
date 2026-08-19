import type { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  Home,
  Menu,
  Settings,
  Users,
  Building2,
} from "lucide-react";

import { HeadlessMenu } from "../headless-menu/HeadlessMenu";






export function RouterSidebar() {

  const location = useLocation();
  const pathname = location.pathname;

  return (
    <HeadlessMenu>
      <HeadlessMenu.Panel>
        {({ open }) => (
          <aside
            className={`
              fixed left-0 top-0 z-40
              h-screen
              bg-white shadow-lg
              ${open ? "w-64" : "w-16"}
            `}
          >




            <div className="relative flex h-full flex-col">

              <div
                className="
                  flex h-16
                  items-center
                  border-b border-gray-200
                  px-3
                "
              >
                <span className="flex w-10 shrink-0 justify-center">
                  <Building2 size={24} />
                </span>

                {open && (
                  <span className="ml-2 font-semibold">
                    Название
                  </span>
                )}
              </div>




              <nav className="flex flex-col gap-2 p-2 pt-8">
                <HeadlessMenu.Item
                  id="home"
                  active={pathname === "/"}
                >
                  {({ active, open }) => (
                    <NavItem
                      to="/"
                      label="Домой"
                      icon={<Home size={20} />}
                      open={open}
                      active={active}
                    />
                  )}
                </HeadlessMenu.Item>


                <HeadlessMenu.Item
                  id="users"
                  active={pathname === "/users"}
                >
                  {({ active, open }) => (
                    <NavItem
                      to="/users"
                      label="Пользователи"
                      icon={<Users size={20} />}
                      open={open}
                      active={active}
                    />
                  )}
                </HeadlessMenu.Item>


                <div className="relative">
                  <HeadlessMenu.Dropdown id="reports"  active={pathname.startsWith("/reports")}>

                    <HeadlessMenu.DropdownTrigger>
                      {({
                        open: dropdownOpen,
                        menuOpen,
                        toggle,
                        openDropdown,
                        closeDropdown
                      }) => (
                       <div
                          onMouseEnter={() => {
                            if (!menuOpen) {
                              openDropdown();
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
                                toggle();
                              }
 }}
                            className={`
                            flex h-10 w-full
                            items-center
                            rounded-md
                            px-1
                            hover:bg-gray-100
                            ${pathname.startsWith("/reports")
                                ? "bg-gray-200 font-semibold"
                                : ""
                              }

 `}
                          >
                            <span className="flex w-10 shrink-0 justify-center">
                              <BarChart3 size={20} />
                            </span>

                            {menuOpen && (
                              <>
                                <span className="ml-2 flex-1 text-left">
                                  Отчёты
                                </span>

                                {dropdownOpen ? (
                                  <ChevronLeft size={16} />
                                ) : (
                                  <ChevronRight size={16} />
                                )}
                              </>
                            )}
                          </button>

                          <HeadlessMenu.DropdownContent>
                            {({
                              open: dropdownOpen,
                              menuOpen,
                              close,
                            }) =>
                              dropdownOpen ? (
                                <div
                                  className={
                                    menuOpen
                                      ? "ml-4 mt-1 flex flex-col gap-1"
                                      : "absolute left-full top-0 w-52 rounded-md bg-white p-1 shadow-lg"
                                  }
                                >
                                  <SubNavItem
                                    to="/reports"
                                    label="Все отчеты"
                                    icon={<BarChart3 size={18} />}
                                    active={pathname === "/reports"}
                                    menuOpen={menuOpen}
                                    close={close}
                                  />

                                  <SubNavItem
                                    to="/reports/sales"
                                    label="Продажи"
                                    icon={<BarChart3 size={18} />}
                                    active={
                                      pathname === "/reports/sales"
                                    }
                                    menuOpen={menuOpen}
                                    close={close}
                                  />

                                  <SubNavItem
                                    to="/reports/finance"
                                    label="Финансы"
                                    icon={<BarChart3 size={18} />}
                                    active={
                                      pathname === "/reports/finance"
                                    }
                                    menuOpen={menuOpen}
                                    close={close}
                                  />
                                </div>
                              ) : null
                            }
                          </HeadlessMenu.DropdownContent>
                        </div>
                      )}
                    </HeadlessMenu.DropdownTrigger>

                  </HeadlessMenu.Dropdown>
                </div>

                <HeadlessMenu.Item
                  id="settings"
                  active={pathname === "/settings"}
                >
                  {({ active, open }) => (
                    <NavItem
                      to="/settings"
                      label="Настройки"
                      icon={<Settings size={20} />}
                      open={open}
                      active={active}
                    />
                  )}
                </HeadlessMenu.Item>

              </nav>





              <div className="mt-auto">
                <HeadlessMenu.Toggle>
                  {({ open, toggle }) => (
                    <button
                      type="button"
                      onClick={toggle}
                      className="
                        flex h-10 w-full
                        items-center
                        rounded-md
                        px-3
                        hover:bg-gray-100
                      "
                    >
                      <span className="flex w-10 shrink-0 justify-center">
                        {open ? (
                          <ChevronLeft size={20} />
                        ) : (
                          <Menu size={20} />
                        )}
                      </span>

                      {open && (
                        <span className="ml-2">
                          Свернуть
                        </span>
                      )}
                    </button>
                  )}
                </HeadlessMenu.Toggle>
              </div>

            </div>
          </aside>
        )}
      </HeadlessMenu.Panel>
    </HeadlessMenu>
  );
}





type NavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  open: boolean;
  active: boolean;
};

function NavItem({
  to,
  label,
  icon,
  open,
  active,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={`
        flex h-10 items-center
        rounded-md
        px-1
        hover:bg-gray-100
        ${active ? "bg-gray-200 font-semibold" : ""}
      `}
    >
      <span className="flex w-10 shrink-0 justify-center">
        {icon}
      </span>

      {open && (
        <span className="ml-2">
          {label}
        </span>
      )}
    </NavLink>
  );
}





type SubNavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  active: boolean;
  menuOpen: boolean;
  close: () => void;
};

function SubNavItem({
  to,
  label,
  icon,
  active,
  menuOpen,
  close,
}: SubNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={() => {
        if (!menuOpen) {
          close();
        }
      }}
      className={`
        flex h-10 items-center
        rounded-md
        px-1
        hover:bg-gray-100
        ${active ? "bg-gray-200 font-semibold" : ""}
      `}
    >
      <span className="flex w-10 shrink-0 justify-center">
        {icon}
      </span>

      <span className="ml-2">
        {label}
      </span>
    </NavLink>
  );
}
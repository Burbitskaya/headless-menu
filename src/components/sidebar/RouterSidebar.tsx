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
  const { pathname } = useLocation();

  return (
    <HeadlessMenu>
      <DesktopSidebar pathname={pathname} />
      <MobileSidebar pathname={pathname} />
    </HeadlessMenu>
  );
}

type SidebarProps = {
  pathname: string;
};

function DesktopSidebar({ pathname }: SidebarProps) {
  return (
   <HeadlessMenu.Panel>
        {({ open }) => (
          <aside
            className={`
              hidden
              h-screen
              shrink-0
              flex-col
              bg-white
              shadow-lg
              transition-[width]
              duration-200
              md:flex
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
                  {({ active, open, closeDropdown }) => (
                    <NavItem
                      to="/"
                      label="Домой"
                      icon={<Home size={20} />}
                      open={open}
                      active={active}
                      closeDropdown={closeDropdown}
                    />
                  )}
                </HeadlessMenu.Item>


                <HeadlessMenu.Item
                  id="users"
                  active={pathname === "/users"}
                >
                  {({ active, open, closeDropdown }) => (
                    <NavItem
                      to="/users"
                      label="Пользователи"
                      icon={<Users size={20} />}
                      open={open}
                      active={active}
                      closeDropdown={closeDropdown}
                    />
                  )}
                </HeadlessMenu.Item>


                <div className="relative">
                  <HeadlessMenu.Dropdown id="reports" active={pathname.startsWith("/reports")}>

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
                  {({ active, open, closeDropdown }) => (
                    <NavItem
                      to="/settings"
                      label="Настройки"
                      icon={<Settings size={20} />}
                      open={open}
                      active={active}
                      closeDropdown={closeDropdown}
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
  );
}



type NavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  open: boolean;
  active: boolean;
  closeDropdown: () => void;
};

function NavItem({
  to,
  label,
  icon,
  open,
  active,
  closeDropdown
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={closeDropdown}
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


function MobileSidebar({ pathname }: SidebarProps) {
  return (
    <div className="md:hidden">
      <nav
        className="
          fixed
          bottom-0
          left-0
          right-0
          z-40
          grid
          grid-cols-4
          border-t
          border-gray-200
          bg-white
          px-2
          py-2
          shadow-lg
        "
      >
        <MobileNavItem
          to="/"
          label="Домой"
          icon={<Home size={20} />}
          active={pathname === "/"}
        />

        <MobileNavItem
          to="/users"
          label="Пользователи"
          icon={<Users size={20} />}
          active={pathname === "/users"}
        />

        <MobileReports pathname={pathname} />

        <MobileNavItem
          to="/settings"
          label="Настройки"
          icon={<Settings size={20} />}
          active={pathname === "/settings"}
        />
      </nav>
    </div>
  );
}




type MobileNavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  active: boolean;
};

function MobileNavItem({
  to,
  label,
  icon,
  active,
}: MobileNavItemProps) {
  return (
    <NavLink
      to={to}
      className={`
        flex
        flex-col
        items-center
        justify-center
        gap-1
        rounded-md
        px-1
        py-2
        text-xs
        ${
          active
            ? "bg-gray-200 font-semibold"
            : "hover:bg-gray-100"
        }
      `}
    >
      {icon}

      <span>{label}</span>
    </NavLink>
  );
}




function MobileReports({ pathname }: SidebarProps) {
  const active = pathname.startsWith("/reports");

  return (
    <HeadlessMenu.Dropdown id="mobile-reports">
      <HeadlessMenu.DropdownTrigger>
        {({ open, toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className={`
              flex
              w-full
              flex-col
              items-center
              justify-center
              gap-1
              rounded-md
              px-1
              py-2
              text-xs
              ${
                active
                  ? "bg-gray-200 font-semibold"
                  : "hover:bg-gray-100"
              }
            `}
          >
            <BarChart3 size={20} />

            <span>Отчёты</span>
          </button>
        )}
      </HeadlessMenu.DropdownTrigger>

      <MobileReportsDropdown />
    </HeadlessMenu.Dropdown>
  );
}

function MobileReportsDropdown() {
  return (
    <HeadlessMenu.DropdownContent>
      {({ open, close }) =>
        open ? (
          <div
            className="
              fixed
              bottom-0
              left-0
              right-0
              z-50
              rounded-t-2xl
              border
              border-gray-200
              bg-white
              shadow-2xl
            "
          >
            {/* Заголовок */}
            <div
              className="
                flex
                h-14
                items-center
                justify-between
                border-b
                border-gray-200
                px-4
              "
            >
              <span className="font-semibold">
                Отчёты
              </span>

              <button
                type="button"
                onClick={close}
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-md
                  text-gray-500
                  hover:bg-gray-100
                "
                aria-label="Закрыть"
              >
                ✕
              </button>
            </div>

            {/* Подсписок */}
            <div className="flex flex-col gap-1 p-2">
              <MobileSubNavItem
                to="/reports"
                label="Все отчёты"
                icon={<BarChart3 size={18} />}
                close={close}
              />

              <MobileSubNavItem
                to="/reports/sales"
                label="Продажи"
                icon={<BarChart3 size={18} />}
                close={close}
              />

              <MobileSubNavItem
                to="/reports/finance"
                label="Финансы"
                icon={<BarChart3 size={18} />}
                close={close}
              />
            </div>
          </div>
        ) : null
      }
    </HeadlessMenu.DropdownContent>
  );
}

type MobileSubNavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  close: () => void;
};

function MobileSubNavItem({
  to,
  label,
  icon,
  close,
}: MobileSubNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) => `
        flex
        h-12
        items-center
        gap-3
        rounded-md
        px-3
        hover:bg-gray-100
        ${
          isActive
            ? "bg-gray-200 font-semibold"
            : ""
        }
      `}
    >
      {icon}

      <span>{label}</span>
    </NavLink>
  );
}
import { HeadlessMenu } from "../headless-menu/HeadlessMenu";
import { NavLink } from "react-router-dom";
import {
  Home,
  Users,
  BarChart3,
  Settings,
  Menu,
  ChevronLeft,
  ChevronRight,
  Building2,
} from "lucide-react";

import type { ReactNode } from "react";


export function RouterSidebar() {
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
                <HeadlessMenu.Item>
                  {({ close }) => (
                    <NavItem
                      to="/"
                      label="Home"
                      icon={<Home size={20} />}
                      open={open}
                      close={close}
                    />
                  )}
                </HeadlessMenu.Item>

                <HeadlessMenu.Item>
                  {({ close }) => (
                    <NavItem
                      to="/users"
                      label="Users"
                      icon={<Users size={20} />}
                      open={open}
                      close={close}
                    />
                  )}
                </HeadlessMenu.Item>

                <HeadlessMenu.Dropdown id="reports">
                  <HeadlessMenu.DropdownTrigger>
                    {({ open: dropdownOpen, toggle }) => (
                      <button
                        type="button"
                        onClick={toggle}
                        className="
    flex h-10 w-full
    items-center
    rounded-md
    px-1
    hover:bg-gray-100
  "
                      >
                        <span className="flex w-10 shrink-0 justify-center">
                          <BarChart3 size={20} />
                        </span>

                        {open && (
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
                    )}
                  </HeadlessMenu.DropdownTrigger>

                  <HeadlessMenu.DropdownContent>
                    {({ open: dropdownOpen, close }) =>
                      dropdownOpen ? (
                        <div
                          className={
                            open
                              ? "ml-4 flex flex-col gap-1"
                              : "absolute left-full top-0 ml-2 w-52 rounded-md bg-white p-1 shadow-lg"
                          }
                        >
                          <SubNavItem
                            to="/reports"
                            label="Overview"
                            icon={<BarChart3 size={18} />}
                            close={close}
                          />

                          <SubNavItem
                            to="/reports/sales"
                            label="Sales"
                            icon={<BarChart3 size={18} />}
                            close={close}
                          />
                        </div>
                      ) : null
                    }
                  </HeadlessMenu.DropdownContent>
                </HeadlessMenu.Dropdown>

                <HeadlessMenu.Item>
                  {({ close }) => (
                    <NavItem
                      to="/settings"
                      label="Settings"
                      icon={<Settings size={20} />}
                      open={open}
                      close={close}
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
  close: () => void;
};

function NavItem({
  to,
  label,
  icon,
  open,
  close,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) =>
        `
          flex h-10 items-center
          rounded-md
          px-1
          hover:bg-gray-100
          ${isActive
          ? "bg-gray-200 font-semibold"
          : ""
        }
        `
      }
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
  close: () => void;
};

function SubNavItem({
  to,
  label,
  icon,
  close,
}: SubNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) =>
        `
          flex h-10 items-center
          rounded-md
          px-1
          hover:bg-gray-100
          ${isActive
          ? "bg-gray-200 font-semibold"
          : ""
        }
        `
      }
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
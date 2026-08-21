import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { HeadlessMenu } from "../headless-menu/HeadlessMenu";

import {
  useRouterMenu,
  useIsActive,
} from "./RouterMenuContext";

import {
  SubMenuProvider,
} from "./SubMenuContext";

export type RouterMenuGroupProps = {
  label: string;
  to: string;
  icon?: ReactNode;
  children: ReactNode;
};

export function RouterMenuGroup({
  label,
  to,
  icon,
  children,
}: RouterMenuGroupProps) {
  const {
    pathname,
    variant,
  } = useRouterMenu();

  const navigate = useNavigate();

  const isActive = useIsActive(
    pathname,
    to,
  );

  if (variant === "desktop") {
    return (
      <div className="relative">
        <HeadlessMenu.Dropdown
          id={to}
          active={isActive}
        >
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
                    } else {
                      navigate(to);
                    }
                  }}
                  className={`
                    flex h-10 w-full items-center
                    rounded-md px-1 hover:bg-gray-100
                    ${isActive
                      ? "bg-gray-200 font-semibold"
                      : ""}
                  `}
                >
                  <span className="flex w-10 shrink-0 justify-center">
                    {icon}
                  </span>

                  {menuOpen && (
                    <>
                      <span className="ml-2 flex-1 text-left">
                        {label}
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
                    open: contentOpen,
                    close: closeContent,
                  }) =>
                    contentOpen ? (
                      <div
                        className={
                          menuOpen
                            ? "ml-4 mt-1 flex flex-col gap-1"
                            : "absolute left-full top-0 w-52 rounded-md bg-white p-1 shadow-lg"
                        }
                      >
                        <SubMenuProvider
                          value={{
                            menuOpen,
                            close: closeContent,
                          }}
                        >
                          {children}
                        </SubMenuProvider>
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

  return (
    <HeadlessMenu.Dropdown
      id={`mobile-${to}`}
    >
      <HeadlessMenu.DropdownTrigger>
        {({ toggle }) => (
          <button
            type="button"
            onClick={toggle}
            className={`
              flex w-full flex-col items-center
              justify-center gap-1 rounded-md
              px-1 py-2 text-xs
              ${isActive
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"}
            `}
          >
            {icon}
            <span>{label}</span>
          </button>
        )}
      </HeadlessMenu.DropdownTrigger>

      <HeadlessMenu.DropdownContent>
        {({ open, close }) =>
          open ? (
            <div
              className="
                fixed bottom-0 left-0 right-0 z-50
                rounded-t-2xl border border-gray-200
                bg-white shadow-2xl
              "
            >
              <div
                className="
                  flex h-14 items-center justify-between
                  border-b border-gray-200 px-4
                "
              >
                <span className="font-semibold">
                  {label}
                </span>

                <button
                  type="button"
                  onClick={close}
                  className="
                    flex h-10 w-10 items-center
                    justify-center rounded-md
                    text-gray-500 hover:bg-gray-100
                  "
                  aria-label="Закрыть"
                >
                  ✕
                </button>
              </div>

              <div className="flex flex-col gap-1 p-2">
                <SubMenuProvider
                  value={{
                    menuOpen: true,
                    close,
                  }}
                >
                  {children}
                </SubMenuProvider>
              </div>
            </div>
          ) : null
        }
      </HeadlessMenu.DropdownContent>
    </HeadlessMenu.Dropdown>
  );
}
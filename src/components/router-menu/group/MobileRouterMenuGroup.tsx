import type { ReactNode } from "react";

import { HeadlessMenu } from "../../headless-menu/HeadlessMenu";
import { SubMenuProvider } from "../SubMenuContext";

type MobileRouterMenuGroupProps = {
  label: string;
  to: string;
  icon?: ReactNode;
  active: boolean;
  children: ReactNode;
};

export function MobileRouterMenuGroup({
  label,
  to,
  icon,
  active,
  children,
}: MobileRouterMenuGroupProps) {
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
              ${active
                ? "bg-gray-200 font-semibold"
                : "hover:bg-gray-100"}
            `}
          >
            {icon}
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
import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { useLocation } from "react-router-dom";

import { HeadlessMenu } from "../headless-menu/HeadlessMenu";

import {
  Building2,
  ChevronLeft,
  Menu,
} from "lucide-react";

import { RouterMenuItem } from "./RouterMenuItem";
import { RouterMenuGroup } from "./RouterMenuGroup";

import {
  RouterMenuProvider,
} from "./RouterMenuContext";

import { useMediaQuery } from "./useMediaQuery";

type DesktopMenuProps = {
  children: ReactNode;
  menuOpen: boolean;
};

function DesktopMenu({
  children,
  menuOpen,
}: DesktopMenuProps) {
  return (
    <aside
      className={`
        hidden h-screen shrink-0 flex-col bg-white
        shadow-lg transition-[width] duration-200 md:flex
        ${menuOpen ? "w-64" : "w-16"}
      `}
    >
      <div className="relative flex h-full flex-col">
        <div
          className="
            flex h-16 items-center
            border-b border-gray-200 px-3
          "
        >
          <span
            className="
              flex w-10 shrink-0
              justify-center
            "
          >
            <Building2 size={24} />
          </span>

          {menuOpen && (
            <span className="ml-2 font-semibold">
              Название
            </span>
          )}
        </div>

        <nav
          className="
            flex flex-col gap-2
            p-2 pt-8
          "
        >
          {children}
        </nav>

        <div className="mt-auto">
          <HeadlessMenu.Toggle>
            {({ open, toggle }) => (
              <button
                type="button"
                onClick={toggle}
                className="
                  flex h-10 w-full items-center
                  rounded-md px-3 hover:bg-gray-100
                "
              >
                <span
                  className="
                    flex w-10 shrink-0
                    justify-center
                  "
                >
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
  );
}

type MobileMenuProps = {
  children: ReactNode;
};

function MobileMenu({
  children,
}: MobileMenuProps) {
  return (
    <nav
      className="
        fixed bottom-0 left-0 right-0 z-40
        grid grid-cols-4
        border-t border-gray-200
        bg-white px-2 py-2
        shadow-lg md:hidden
      "
    >
      {children}
    </nav>
  );
}

export interface RouterMenuProps {
  children: ReactNode;
  variant?: "desktop" | "mobile";
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

function RouterMenuRoot({
  children,
  variant: propVariant,
  open,
  onOpenChange,
}: RouterMenuProps) {
  const { pathname } = useLocation();

  const isMobile = useMediaQuery(
    "(max-width: 767px)",
  );

  const variant =
    propVariant ??
    (isMobile ? "mobile" : "desktop");

  const isControlled =
    open !== undefined;

  const [internalOpen, setInternalOpen] =
    useState(() => {
      if (typeof window === "undefined") {
        return false;
      }

      const stored =
        localStorage.getItem("sidebarOpen");

      if (!stored) {
        return false;
      }

      try {
        return JSON.parse(stored);
      } catch {
        return false;
      }
    });

  useEffect(() => {
    if (isControlled) {
      return;
    }

    localStorage.setItem(
      "sidebarOpen",
      JSON.stringify(internalOpen),
    );
  }, [
    internalOpen,
    isControlled,
  ]);

  const currentOpen = isControlled
    ? open
    : internalOpen;

  const setCurrentOpen = (
    value: boolean,
  ) => {
    if (isControlled) {
      onOpenChange?.(value);
      return;
    }

    setInternalOpen(value);
  };

  return (
    <HeadlessMenu
      open={currentOpen}
      onOpenChange={setCurrentOpen}
    >
      <HeadlessMenu.Panel>
        {({ open: menuOpen, close }) => (
          <RouterMenuProvider
            value={{
              pathname,
              closeMenu: close,
              variant,
            }}
          >
            {variant === "desktop" ? (
              <DesktopMenu
                menuOpen={menuOpen}
              >
                {children}
              </DesktopMenu>
            ) : (
              <MobileMenu>
                {children}
              </MobileMenu>
            )}
          </RouterMenuProvider>
        )}
      </HeadlessMenu.Panel>
    </HeadlessMenu>
  );
}

export const RouterMenu = Object.assign(
  RouterMenuRoot,
  {
    Item: RouterMenuItem,
    Group: RouterMenuGroup,
  },
);

export default RouterMenu;
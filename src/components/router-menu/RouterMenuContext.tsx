import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

export type RouterMenuVariant =
  | "desktop"
  | "mobile";

type RouterMenuContextValue = {
  pathname: string;
  closeMenu: () => void;
  variant: RouterMenuVariant;
};

const RouterMenuContext =
  createContext<RouterMenuContextValue | null>(null);

export function RouterMenuProvider({
  value,
  children,
}: {
  value: RouterMenuContextValue;
  children: ReactNode;
}) {
  return (
    <RouterMenuContext.Provider value={value}>
      {children}
    </RouterMenuContext.Provider>
  );
}

export function useRouterMenu() {
  const ctx = useContext(RouterMenuContext);

  if (!ctx) {
    throw new Error(
      "useRouterMenu must be used inside <RouterMenu>",
    );
  }

  return ctx;
}

export function useIsActive(
  pathname: string,
  to: string,
  exact = false,
) {
  if (exact) {
    return pathname === to;
  }

  if (to === "/") {
    return pathname === "/";
  }

  return (
    pathname === to ||
    pathname.startsWith(`${to}/`)
  );
}
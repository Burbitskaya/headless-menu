import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type SubMenuContextValue = {
  menuOpen: boolean;
  close: () => void;
};

const SubMenuContext =
  createContext<SubMenuContextValue | null>(null);

export function useSubMenu() {
  return useContext(SubMenuContext);
}

export function SubMenuProvider({
  value,
  children,
}: {
  value: SubMenuContextValue;
  children: ReactNode;
}) {
  return (
    <SubMenuContext.Provider value={value}>
      {children}
    </SubMenuContext.Provider>
  );
}
import {
  createContext,
  useContext,
  type ReactNode,
} from "react";

type SubMenuContextValue = {
  // Состояние основного меню
  menuOpen: boolean;
  // Закрывает открытое подменю
  close: () => void;
};

const SubMenuContext =
  createContext<SubMenuContextValue | null>(null);

// Возвращает состояние подменю, если Item находится внутри Group
export function useSubMenu() {
  return useContext(SubMenuContext);
}

// Передает дочерним элементам управление подменю
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
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type SubNavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  active: boolean;
  menuOpen: boolean;  
  close: () => void;   // закрыть дропдаун
};

export function SubNavItem({ to, label, icon, active, menuOpen, close }: SubNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={() => {
        if (!menuOpen) {
          close();
        }
      }}
      className={`
        flex h-10 items-center rounded-md px-1 hover:bg-gray-100
        ${active ? "bg-gray-200 font-semibold" : ""}
      `}
    >
      <span className="flex w-10 shrink-0 justify-center">{icon}</span>
      <span className="ml-2">{label}</span>
    </NavLink>
  );
}
import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type NavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  open: boolean;      // открыто ли меню 
  active: boolean;
  onClick?: () => void; // для closeDropdown
};

export function NavItem({ to, label, icon, open, active, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`
        flex h-10 items-center rounded-md px-1 hover:bg-gray-100
        ${active ? "bg-gray-200 font-semibold" : ""}
      `}
    >
      <span className="flex w-10 shrink-0 justify-center">{icon}</span>
      {open && <span className="ml-2">{label}</span>}
    </NavLink>
  );
}
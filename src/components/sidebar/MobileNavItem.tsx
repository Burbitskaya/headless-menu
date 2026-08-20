import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type MobileNavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  active: boolean;
};

export function MobileNavItem({ to, label, icon, active }: MobileNavItemProps) {
  return (
    <NavLink
      to={to}
      className={`
        flex flex-col items-center justify-center gap-1 rounded-md px-1 py-2 text-xs
        ${active ? "bg-gray-200 font-semibold" : "hover:bg-gray-100"}
      `}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
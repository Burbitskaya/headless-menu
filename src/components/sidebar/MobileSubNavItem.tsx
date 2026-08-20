import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type MobileSubNavItemProps = {
  to: string;
  label: string;
  icon: ReactNode;
  close: () => void; // закрыть модалку
};

export function MobileSubNavItem({ to, label, icon, close }: MobileSubNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) => `
        flex h-12 items-center gap-3 rounded-md px-3 hover:bg-gray-100
        ${isActive ? "bg-gray-200 font-semibold" : ""}
      `}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}
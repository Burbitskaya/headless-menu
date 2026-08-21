import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

import { HeadlessMenu } from "../../headless-menu/HeadlessMenu";

type DesktopRouterMenuItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  active: boolean;
  isInsideGroup: boolean;
  onClick: () => void;
};

type NavItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  active: boolean;
  open: boolean;
  onClick: () => void;
};

function NavItem({
  to,
  label,
  icon,
  active,
  open,
  onClick,
}: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`
        flex h-10 items-center rounded-md px-1
        hover:bg-gray-100
        ${active ? "bg-gray-200 font-semibold" : ""}
      `}
    >
      <span className="flex w-10 shrink-0 justify-center">
        {icon}
      </span>

      {open && (
        <span className="ml-2">
          {label}
        </span>
      )}
    </NavLink>
  );
}

type SubNavItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  active: boolean;
  onClick: () => void;
};

function SubNavItem({
  to,
  label,
  icon,
  active,
  onClick,
}: SubNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={`
        flex h-10 items-center rounded-md px-1
        hover:bg-gray-100
        ${active ? "bg-gray-200 font-semibold" : ""}
      `}
    >
      <span className="flex w-10 shrink-0 justify-center">
        {icon}
      </span>

      <span className="ml-2">
        {label}
      </span>
    </NavLink>
  );
}

export function DesktopRouterMenuItem({
  to,
  label,
  icon,
  active,
  isInsideGroup,
  onClick,
}: DesktopRouterMenuItemProps) {
  if (isInsideGroup) {
    return (
      <SubNavItem
        to={to}
        label={label}
        icon={icon}
        active={active}
        onClick={onClick}
      />
    );
  }

  return (
    <HeadlessMenu.Item active={active}>
      {({
        active: headlessActive,
        open,
        closeDropdown,
      }) => (
        <NavItem
          to={to}
          label={label}
          icon={icon}
          active={headlessActive}
          open={open}
          onClick={() => {
            closeDropdown();
            onClick();
          }}
        />
      )}
    </HeadlessMenu.Item>
  );
}
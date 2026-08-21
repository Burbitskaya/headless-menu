import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { HeadlessMenu } from "../headless-menu/HeadlessMenu";

import {
  useRouterMenu,
  useIsActive,
} from "./RouterMenuContext";

import {
  useSubMenu,
} from "./SubMenuContext";

type NavItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  open?: boolean;
  active?: boolean;
  onClick?: () => void;
};

function NavItem({
  to,
  label,
  icon,
  open,
  active,
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
  active?: boolean;
  menuOpen: boolean;
  close: () => void;
};

function SubNavItem({
  to,
  label,
  icon,
  active,
  menuOpen,
  close,
}: SubNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={() => {
        if (!menuOpen) {
          close();
        }
      }}
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

type MobileNavItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  active?: boolean;
};

function MobileNavItem({
  to,
  label,
  icon,
  active,
}: MobileNavItemProps) {
  return (
    <NavLink
      to={to}
      className={`
        flex flex-col items-center justify-center
        gap-1 rounded-md px-1 py-2 text-xs
        ${active
          ? "bg-gray-200 font-semibold"
          : "hover:bg-gray-100"}
      `}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

type MobileSubNavItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  close: () => void;
};

function MobileSubNavItem({
  to,
  label,
  icon,
  close,
}: MobileSubNavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={close}
      className={({ isActive }) => `
        flex h-12 items-center gap-3 rounded-md px-3
        hover:bg-gray-100
        ${isActive ? "bg-gray-200 font-semibold" : ""}
      `}
    >
      {icon}
      <span>{label}</span>
    </NavLink>
  );
}

export type RouterMenuItemProps = {
  to: string;
  label: string;
  icon?: ReactNode;
  exact?: boolean;
};

export function RouterMenuItem({
  to,
  label,
  icon,
  exact,
}: RouterMenuItemProps) {
  const {
    pathname,
    closeMenu,
    variant,
  } = useRouterMenu();

  const subMenu = useSubMenu();
  const isInsideGroup = subMenu !== null;

  const effectiveExact = isInsideGroup
    ? exact ?? true
    : exact ?? false;

  const isActive = useIsActive(
    pathname,
    to,
    effectiveExact,
  );

  if (variant === "desktop") {
    if (isInsideGroup) {
      return (
        <SubNavItem
          to={to}
          label={label}
          icon={icon}
          active={isActive}
          menuOpen={subMenu.menuOpen}
          close={() => {
            subMenu.close();
            closeMenu();
          }}
        />
      );
    }

    return (
      <HeadlessMenu.Item
        id={to}
        active={isActive}
      >
        {({
          active,
          open,
          closeDropdown,
        }) => (
          <NavItem
            to={to}
            label={label}
            icon={icon}
            active={active}
            open={open}
            onClick={() => {
              closeDropdown?.();
              closeMenu();
            }}
          />
        )}
      </HeadlessMenu.Item>
    );
  }

  if (isInsideGroup) {
    return (
      <MobileSubNavItem
        to={to}
        label={label}
        icon={icon}
        close={() => {
          subMenu.close();
          closeMenu();
        }}
      />
    );
  }

  return (
    <MobileNavItem
      to={to}
      label={label}
      icon={icon}
      active={isActive}
    />
  );
}
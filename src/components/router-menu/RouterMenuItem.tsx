import type { ReactNode } from "react";
import {
  useRouterMenu,
  useIsActive,
} from "./RouterMenuContext";
import { useSubMenu } from "./SubMenuContext";
import { DesktopRouterMenuItem } from "./item/DesktopRouterMenuItem";
import { MobileRouterMenuItem } from "./item/MobileRouterMenuItem";

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

  const active = useIsActive(
    pathname,
    to,
    effectiveExact,
  );

  const handleClick = () => {
    if (isInsideGroup) {
      subMenu.close();
    }

    closeMenu();
  };

  if (variant === "desktop") {
    return (
      <DesktopRouterMenuItem
        to={to}
        label={label}
        icon={icon}
        active={active}
        isInsideGroup={isInsideGroup}
        onClick={handleClick}
      />
    );
  }

  return (
    <MobileRouterMenuItem
      to={to}
      label={label}
      icon={icon}
      active={active}
      isInsideGroup={isInsideGroup}
      onClick={handleClick}
    />
  );
}
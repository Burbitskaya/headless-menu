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

  // Для пунктов внутри группы по умолчанию используем точное совпадение
  const effectiveExact = isInsideGroup
    ? exact ?? true
    : exact ?? false;

  const active = useIsActive(
    pathname,
    to,
    effectiveExact,
  );

  // После перехода закрываем подменю и основное меню
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
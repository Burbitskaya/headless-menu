import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

import {
  useRouterMenu,
  useIsActive,
} from "./RouterMenuContext";

import { DesktopRouterMenuGroup } from "./group/DesktopRouterMenuGroup";
import { MobileRouterMenuGroup } from "./group/MobileRouterMenuGroup";

export type RouterMenuGroupProps = {
  label: string;
  to: string;
  icon?: ReactNode;
  children: ReactNode;
};

export function RouterMenuGroup({
  label,
  to,
  icon,
  children,
}: RouterMenuGroupProps) {
  const {
    pathname,
    variant,
  } = useRouterMenu();

  const navigate = useNavigate();

  // Группа считается активной, если текущий путь совпадает с еём или находится внутри него
  const active = useIsActive(
    pathname,
    to,
  );

  const handleNavigate = () => {
    navigate(to);
  };

  if (variant === "desktop") {
    return (
      <DesktopRouterMenuGroup
        label={label}
        icon={icon}
        active={active}
        onNavigate={handleNavigate}
      >
        {children}
      </DesktopRouterMenuGroup>
    );
  }

  return (
    <MobileRouterMenuGroup
      label={label}
      icon={icon}
      active={active}
    >
      {children}
    </MobileRouterMenuGroup>
  );
}
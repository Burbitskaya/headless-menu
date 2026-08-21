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
  const { pathname, variant } = useRouterMenu();
  const navigate = useNavigate();

  const isActive = useIsActive(pathname, to);

  const handleNavigate = () => {
    navigate(to);
  };

  if (variant === "desktop") {
    return (
      <DesktopRouterMenuGroup
        label={label}
        to={to}
        icon={icon}
        active={isActive}
        onNavigate={handleNavigate}
      >
        {children}
      </DesktopRouterMenuGroup>
    );
  }

  return (
    <MobileRouterMenuGroup
      label={label}
      to={to}
      icon={icon}
      active={isActive}
    >
      {children}
    </MobileRouterMenuGroup>
  );
}
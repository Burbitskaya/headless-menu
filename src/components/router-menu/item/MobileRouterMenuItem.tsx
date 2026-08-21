import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type MobileRouterMenuItemProps = {
    to: string;
    label: string;
    icon?: ReactNode;
    active: boolean;
    isInsideGroup: boolean;
    onClick: () => void;
};

type MobileNavItemProps = {
    to: string;
    label: string;
    icon?: ReactNode;
    active: boolean;
};

function MobileNavItem({
    to,
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
                    : "hover:bg-gray-100"
                }
      `}
        >
            {icon}
        </NavLink>
    );
}

type MobileSubNavItemProps = {
    to: string;
    label: string;
    icon?: ReactNode;
    active: boolean;
    onClick: () => void;
};

function MobileSubNavItem({
    to,
    label,
    icon,
    active,
    onClick,
}: MobileSubNavItemProps) {
    return (
        <NavLink
            to={to}
            onClick={onClick}
            className={`
        flex h-12 items-center gap-3
        rounded-md px-3
        hover:bg-gray-100
        ${active
                    ? "bg-gray-200 font-semibold"
                    : ""
                }
      `}
        >
            {icon}

            <span>
                {label}
            </span>
        </NavLink>
    );
}

export function MobileRouterMenuItem({
    to,
    label,
    icon,
    active,
    isInsideGroup,
    onClick,
}: MobileRouterMenuItemProps) {
    if (isInsideGroup) {
        return (
            <MobileSubNavItem
                to={to}
                label={label}
                icon={icon}
                active={active}
                onClick={onClick}
            />
        );
    }

    return (
        <MobileNavItem
            to={to}
            label={label}
            icon={icon}
            active={active}
        />
    );
}
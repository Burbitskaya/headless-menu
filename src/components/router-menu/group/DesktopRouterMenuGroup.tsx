import type { ReactNode } from "react";
import {
    ChevronLeft,
    ChevronRight,
} from "lucide-react";

import { HeadlessMenu } from "../../headless-menu/HeadlessMenu";
import { SubMenuProvider } from "../SubMenuContext";

type DesktopRouterMenuGroupProps = {
    label: string;
    icon?: ReactNode;
    active: boolean;
    onNavigate: () => void;
    children: ReactNode;
};

export function DesktopRouterMenuGroup({
    label,
    icon,
    active,
    onNavigate,
    children,
}: DesktopRouterMenuGroupProps) {
    return (
        <div className="relative">
            <HeadlessMenu.Dropdown
                active={active}
            >
                <HeadlessMenu.DropdownTrigger>
                    {({
                        dropdownOpen,
                        menuOpen,
                        toggle,
                        openDropdown,
                        closeDropdown,
                    }) => (
                        <div
                            onMouseEnter={() => {
                                // В свернутом меню dropdown открывается при наведении
                                if (!menuOpen) {
                                    openDropdown();
                                }
                            }}
                            onMouseLeave={() => {
                                if (!menuOpen) {
                                    closeDropdown();
                                }
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => {
                                    if (menuOpen) {
                                        toggle();
                                    } else {
                                        onNavigate();
                                    }
                                }}
                                className={`
                  flex h-10 w-full items-center
                  rounded-md px-1 hover:bg-gray-100
                  ${active
                                        ? "bg-gray-200 font-semibold"
                                        : ""}
                `}
                            >
                                <span className="flex w-10 shrink-0 justify-center">
                                    {icon}
                                </span>

                                {menuOpen && (
                                    <>
                                        <span className="ml-2 flex-1 text-left">
                                            {label}
                                        </span>

                                        {dropdownOpen ? (
                                            <ChevronLeft size={16} />
                                        ) : (
                                            <ChevronRight size={16} />
                                        )}
                                    </>
                                )}
                            </button>

                            <HeadlessMenu.DropdownContent>
                                {({ dropdownOpen: contentOpen, close }) =>
                                    contentOpen ? (
                                        <div
                                            className={
                                                menuOpen
                                                    ? "ml-4 mt-1 flex flex-col gap-1"
                                                    : "absolute left-full top-0 w-52 rounded-md bg-white p-1 shadow-lg"
                                            }
                                        >
                                            <SubMenuProvider
                                                value={{
                                                    menuOpen,
                                                    close,
                                                }}
                                            >
                                                {children}
                                            </SubMenuProvider>
                                        </div>
                                    ) : null
                                }
                            </HeadlessMenu.DropdownContent>
                        </div>
                    )}
                </HeadlessMenu.DropdownTrigger>
            </HeadlessMenu.Dropdown>
        </div>
    );
}
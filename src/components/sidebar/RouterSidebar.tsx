import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { HeadlessMenu } from "../headless-menu/HeadlessMenu";
import { DesktopSidebar } from "./DesktopSidebar";
import { MobileSidebar } from "./MobileSidebar";

export function RouterSidebar() {
  const { pathname } = useLocation();

  // Внешнее состояние для управления открытостью меню + localStorage
  const [isOpen, setIsOpen] = useState(() => {
    const stored = localStorage.getItem("sidebarOpen");
    return stored ? JSON.parse(stored) : false;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isOpen));
  }, [isOpen]);

  return (
    <HeadlessMenu open={isOpen} onOpenChange={setIsOpen}>
      <DesktopSidebar pathname={pathname} />
      <MobileSidebar pathname={pathname} />
    </HeadlessMenu>
  );
}
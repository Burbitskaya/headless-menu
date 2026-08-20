import type { ReactNode } from "react";
import { Home, Users, BarChart3, Settings } from "lucide-react";

export type MenuItem = {
  id: string;
  label: string;
  path?: string;
  icon: ReactNode;
  children?: Omit<MenuItem, "children">[]; // только один уровень вложенности
};

export const menuItems: MenuItem[] = [
  {
    id: "home",
    label: "Домой",
    path: "/",
    icon: <Home size={20} />,
  },
  {
    id: "users",
    label: "Пользователи",
    path: "/users",
    icon: <Users size={20} />,
  },
  {
    id: "reports",
    label: "Отчёты",
    icon: <BarChart3 size={20} />,
    children: [
      { id: "reports-all", label: "Все отчёты", path: "/reports", icon: <BarChart3 size={18} /> },
      { id: "reports-sales", label: "Продажи", path: "/reports/sales", icon: <BarChart3 size={18} /> },
      { id: "reports-finance", label: "Финансы", path: "/reports/finance", icon: <BarChart3 size={18} /> },
    ],
  },
  {
    id: "settings",
    label: "Настройки",
    path: "/settings",
    icon: <Settings size={20} />,
  },
];
import { Route, Routes } from "react-router-dom";
import { RouterMenu } from "./components/router-menu/RouterMenu";
import { HomePage } from "./pages/HomePage";
import { UsersPage } from "./pages/UsersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { FinancePage } from "./pages/FinancePage";
import { SalesPage } from "./pages/SalesPage";
import { BarChart3, Home, Settings, Users } from "lucide-react";

export default function App() {
  return (
     <div className="flex min-h-screen bg-gray-50">
      <RouterMenu>
      <RouterMenu.Item to="/" label="Главная" icon={<Home size={20} />} />
      <RouterMenu.Item to="/users" label="Пользователи" icon={<Users size={20} />} />
      <RouterMenu.Group label="Отчёты" to="/reports" icon={<BarChart3 size={20} />}>
        <RouterMenu.Item to="/reports" label="Все отчёты" />
        <RouterMenu.Item to="/reports/sales" label="Продажи" />
        <RouterMenu.Item to="/reports/finance" label="Финансы" />
      </RouterMenu.Group>

      <RouterMenu.Item to="/settings" label="Настройки" icon={<Settings size={20} />} />
    </RouterMenu>
        <main className="min-w-0 flex-1 p-6 pb-20 md:pb-6">
        <Routes>
     
          <Route path="/" element={<HomePage />} />

          <Route path="/users" element={<UsersPage />} />

          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/sales" element={<SalesPage />} />
          <Route path="/reports/finance" element={<FinancePage />} />

          <Route path="/settings" element={<SettingsPage />} />
    
        </Routes>
      </main>
    </div>
  );
}
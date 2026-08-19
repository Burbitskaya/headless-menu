import { Route, Routes } from "react-router-dom";
import { RouterSidebar } from "./components/sidebar/RouterSidebar";
import { HomePage } from "./pages/HomePage";
import { UsersPage } from "./pages/UsersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { FinancePage } from "./pages/FinancePage";
import { SalesPage } from "./pages/SalesPage";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <RouterSidebar />
      <main className="p-6 md:pl-72">
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
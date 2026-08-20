import { BrowserRouter, Route } from "react-router-dom";
import { RouterSidebar } from "./components/sidebar/RouterSidebar";
import { HomePage } from "./pages/HomePage";
import { UsersPage } from "./pages/UsersPage";
import { SettingsPage } from "./pages/SettingsPage";
import { ReportsPage } from "./pages/ReportsPage";
import { FinancePage } from "./pages/FinancePage";
import { SalesPage } from "./pages/SalesPage";

const basename = import.meta.env.PROD ? '/headless-menu/' : '/';

export default function App() {
  return (
     <div className="flex min-h-screen bg-gray-50">
      <RouterSidebar />
        <main className="min-w-0 flex-1 p-6 pb-20 md:pb-6">
          <BrowserRouter basename={basename}>
     
          <Route path="/" element={<HomePage />} />

          <Route path="/users" element={<UsersPage />} />

          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/reports/sales" element={<SalesPage />} />
          <Route path="/reports/finance" element={<FinancePage />} />

          <Route path="/settings" element={<SettingsPage />} />
    
        </BrowserRouter>
      </main>
    </div>
  );
}
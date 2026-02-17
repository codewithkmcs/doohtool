import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { BillboardProvider } from "@/contexts/BillboardContext";
import { CampaignProvider } from "@/contexts/CampaignContext";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Campaigns from "./pages/Campaigns";
import CampaignCreate from "./pages/CampaignCreate";
import Compliance from "./pages/Compliance";
import Registry from "./pages/Registry";
import Notifications from "./pages/Notifications";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <BillboardProvider>
        <CampaignProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/campaigns" element={<Campaigns />} />
              <Route path="/campaigns/new" element={<CampaignCreate />} />
              <Route path="/compliance" element={<Compliance />} />
              <Route path="/registry" element={<Registry />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/user-management" element={<UserManagement />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CampaignProvider>
      </BillboardProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

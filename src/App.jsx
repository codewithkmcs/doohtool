import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { PersonaProvider, usePersona, PERSONAS } from './context/PersonaContext';
import { CampaignProvider } from './context/CampaignContext';
import Layout from './components/Layout';
import Login from './components/Login';
import AgencyDashboard from './components/dashboard/AgencyDashboard';
import MediaOwnerDashboard from './components/dashboard/MediaOwnerDashboard';
import InventoryList from './components/inventory/InventoryList';
import CampaignBuilder from './components/planning/CampaignBuilder';
import MeasurementReport from './components/measurement/MeasurementReport';
import CampaignManager from './components/campaigns/CampaignManager';

import CompliancePage from './pages/CompliancePage';

const DashboardRouter = () => {
  const { persona } = usePersona();
  return persona === PERSONAS.AGENCY ? <AgencyDashboard /> : <MediaOwnerDashboard />;
};

const ProtectedRoute = ({ children }) => {
  const { user } = usePersona();
  if (!user) return <Navigate to="/login" replace />;
  return children;
};

const AppContent = () => {
  const { user } = usePersona();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" replace /> : <Login />} />

        <Route path="/" element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }>
          <Route index element={<DashboardRouter />} />
          <Route path="inventory" element={<InventoryList />} />
          <Route path="planning" element={<CampaignBuilder />} />
          <Route path="campaigns" element={<CampaignManager />} />
          <Route path="measurement" element={<MeasurementReport />} />
          <Route path="compliance" element={<CompliancePage />} />
          <Route path="proposals" element={<div style={{ padding: '40px', textAlign: 'center' }}><h2 className="text-2xl font-bold">Proposal Management</h2><p className="text-slate-500 mt-2">Module under development for next sprint.</p></div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

function App() {
  return (
    <PersonaProvider>
      <CampaignProvider>
        <AppContent />
      </CampaignProvider>
    </PersonaProvider>
  );
}

export default App;

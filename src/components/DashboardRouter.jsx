import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import InvestorDashboard from '@/pages/InvestorDashboard';
import SponsorDashboard from '@/pages/SponsorDashboard';
import GovernmentDashboard from '@/pages/GovernmentDashboard';
import EPCDashboard from '@/pages/EPCDashboard';

const DashboardRouter = () => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  switch (currentUser.userType) {
    case 'institutional_investor':
    case 'investor': // Backward compatibility
      return <InvestorDashboard />;
    case 'project_sponsor':
    case 'owner': // Backward compatibility
      return <SponsorDashboard />;
    case 'government_ppp':
      return <GovernmentDashboard />;
    case 'epc_contractor':
      return <EPCDashboard />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default DashboardRouter;
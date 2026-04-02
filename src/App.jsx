import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '@/contexts/AuthContext';
import { UserTypeProvider } from '@/contexts/UserTypeContext';
import { FormModalProvider } from '@/contexts/FormModalContext';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { Toaster } from '@/components/ui/toaster';
import ProtectedRoute from '@/components/ProtectedRoute';
import ProtectedAdminRoute from '@/components/ProtectedAdminRoute';
import DashboardRouter from '@/components/DashboardRouter';
import { ScrollToTop } from '@/components/ScrollToTop';

// Components
import ConsentBanner from '@/components/ConsentBanner';

// Pages
import PublicHomePage from '@/pages/PublicHomePage';
import LoginPage from '@/pages/LoginPage';
import RegisterPage from '@/pages/RegisterPage';
import SectorsPage from '@/pages/SectorsPage';
import SectorProjectsPage from '@/pages/SectorProjectsPage';
import AboutPage from '@/pages/AboutPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import InsightsPage from '@/pages/InsightsPage';
import InsightDetailPage from '@/pages/InsightDetailPage';
import BlogArticlePage from '@/pages/BlogArticlePage'; 
import PodcastPage from '@/pages/PodcastPage';
import ServicesPage from '@/pages/ServicesPage';
import ContactPage from '@/pages/ContactPage';
import EmailLoginPage from '@/pages/EmailLoginPage'; 
import ProjectsDataPage from '@/pages/ProjectsDataPage';
import AccessDataPage from '@/pages/AccessDataPage';
import GetStartedPage from '@/pages/GetStartedPage';
import RequestDemoPage from '@/pages/RequestDemoPage';
import GroundTruthPage from '@/pages/GroundTruthPage';
import AuthCallback from '@/pages/AuthCallback';

// Legal Pages
import PrivacyPolicyPage from '@/pages/PrivacyPolicyPage';
import TermsOfServicePage from '@/pages/TermsOfServicePage';
import CookiePolicyPage from '@/pages/CookiePolicyPage';

// Admin Pages
import AdminDashboard from '@/pages/AdminDashboard';
import AdminContactSubmissions from '@/pages/AdminContactSubmissions';
import AdminSectorsManager from '@/pages/AdminSectorsManager';
import AdminServicesManager from '@/pages/AdminServicesManager';
import AdminInsightsManager from '@/pages/AdminInsightsManager';
import AdminPodcastManager from '@/pages/AdminPodcastManager';

// Dashboards
import InvestorDashboard from '@/pages/InvestorDashboard';
import SponsorDashboard from '@/pages/SponsorDashboard';
import GovernmentDashboard from '@/pages/GovernmentDashboard';
import EPCDashboard from '@/pages/EPCDashboard';

// Modals
import SubscribeForAccessModal from '@/components/SubscribeForAccessModal';
import RequestCustomBriefModal from '@/components/RequestCustomBriefModal';
import RequestConsultationModal from '@/components/RequestConsultationModal';
import ExplorePlatformAccessModal from '@/components/ExplorePlatformAccessModal';
import ProposeGuestModal from '@/components/ProposeGuestModal';
import RequestDemoModal from '@/components/RequestDemoModal';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <UserTypeProvider>
          <FormModalProvider>
            <Router>
              <ScrollToTop />
              <ConsentBanner />
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<PublicHomePage />} />
                <Route path="/sectors" element={<SectorsPage />} />
                <Route path="/sectors/:sectorSlug/projects" element={<SectorProjectsPage />} />
                <Route path="/services" element={<ServicesPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/insights" element={<InsightsPage />} />
                <Route path="/insight/:slug" element={<InsightDetailPage />} />
                <Route path="/blog/:slug" element={<BlogArticlePage />} /> 
                <Route path="/insights/podcast" element={<PodcastPage />} />
                <Route path="/ground-truth-podcast" element={<GroundTruthPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/mail" element={<EmailLoginPage />} />
                <Route path="/projects-data" element={<ProjectsDataPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/access-data" element={<AccessDataPage />} />
                
                {/* Legal Routes */}
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                
                {/* New Routes */}
                <Route path="/get-started" element={<GetStartedPage />} />
                <Route path="/request-demo" element={<RequestDemoPage />} />
                <Route path="/auth/callback" element={<AuthCallback />} />
                
                {/* Admin Routes */}
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminDashboard />
                    </ProtectedAdminRoute>
                  } 
                />
                <Route 
                  path="/admin/contact-submissions" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminContactSubmissions />
                    </ProtectedAdminRoute>
                  } 
                />
                <Route 
                  path="/admin/sectors" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminSectorsManager />
                    </ProtectedAdminRoute>
                  } 
                />
                <Route 
                  path="/admin/services" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminServicesManager />
                    </ProtectedAdminRoute>
                  } 
                />
                 <Route 
                  path="/admin/insights" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminInsightsManager />
                    </ProtectedAdminRoute>
                  } 
                />
                 <Route 
                  path="/admin/podcast" 
                  element={
                    <ProtectedAdminRoute>
                      <AdminPodcastManager />
                    </ProtectedAdminRoute>
                  } 
                />

                {/* Dashboard Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute allowedUserTypes={['institutional_investor', 'investor', 'project_sponsor', 'owner', 'government_ppp', 'epc_contractor']}>
                      <DashboardRouter />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/investor-dashboard"
                  element={
                    <ProtectedRoute allowedUserTypes={['institutional_investor', 'investor']}>
                      <InvestorDashboard />
                    </ProtectedRoute>
                  }
                />
                 <Route
                  path="/owner-dashboard" 
                  element={
                    <ProtectedRoute allowedUserTypes={['project_sponsor', 'owner']}>
                      <SponsorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/sponsor-dashboard"
                  element={
                    <ProtectedRoute allowedUserTypes={['project_sponsor', 'owner']}>
                      <SponsorDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/government-dashboard"
                  element={
                    <ProtectedRoute allowedUserTypes={['government_ppp']}>
                      <GovernmentDashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/epc-dashboard"
                  element={
                    <ProtectedRoute allowedUserTypes={['epc_contractor']}>
                      <EPCDashboard />
                    </ProtectedRoute>
                  }
                />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              
              {/* Global Modals */}
              <SubscribeForAccessModal />
              <RequestCustomBriefModal />
              <RequestConsultationModal />
              <ExplorePlatformAccessModal />
              <ProposeGuestModal />
              <RequestDemoModal />
              
              <Toaster />
            </Router>
          </FormModalProvider>
        </UserTypeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;
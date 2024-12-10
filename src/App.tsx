import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PageManager from './components/PageManager';
import { AuthProvider } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import DemoPage from './components/DemoPage';
import DashboardLayout from './layouts/DashboardLayout';
import PublicLayout from './layouts/PublicLayout';
import TeamManagement from './components/TeamManagement';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import ContactForm from './components/ContactForm';
import DomainSettings from './components/DomainSettings';
import MessageList from './components/MessageList';
import ProfileSettings from './components/ProfileSettings';
import ThemePage from './pages/ThemePage';
import { useAuth } from './contexts/AuthContext';

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>;
  }
  
  return user ? <>{children}</> : <Navigate to="/login" />;
}

export default function App() {
  const [currentTheme, setCurrentTheme] = React.useState('ecommerce');

  return (
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/demo" element={<DemoPage />} />
          <Route path="/contact" element={<ContactForm />} />
        </Route>

        {/* Protected Routes */}
        <Route
          element={
            <PrivateRoute>
              <DashboardLayout
                currentTheme={currentTheme}
                onThemeChange={setCurrentTheme}
              />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<AnalyticsDashboard />} />
          <Route path="/dashboard/messages" element={<MessageList />} />
          <Route path="/dashboard/pages" element={
            <div className="space-y-8">
              <PageManager />
            </div>
          } />
          <Route path="/dashboard/team" element={<TeamManagement />} />
          <Route path="/dashboard/settings" element={<DomainSettings />} />
          <Route path="/dashboard/profile" element={<ProfileSettings />} />
          <Route 
            path="/dashboard/theme" 
            element={
              <ThemePage 
                currentTheme={currentTheme} 
                onThemeChange={setCurrentTheme} 
              />
            } 
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}
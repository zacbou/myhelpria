import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardLayoutProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

export default function DashboardLayout({
  currentTheme,
  onThemeChange,
}: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const handleCollapse = (collapsed: boolean) => {
    setIsCollapsed(collapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        {/* Collapsible Sidebar */}
        <div 
          className={`fixed left-0 top-16 h-[calc(100vh-4rem)] bg-white border-r border-gray-200 shadow-sm z-20 transition-all duration-300 ${
            isCollapsed ? 'w-16' : 'w-64'
          }`}
        >
          <Sidebar
            currentTheme={currentTheme}
            onThemeChange={onThemeChange}
            isCollapsed={isCollapsed}
            onCollapse={handleCollapse}
          />
        </div>

        {/* Main content area that adjusts with sidebar width */}
        <div 
          className="flex-1 transition-all duration-300"
          style={{ marginLeft: isCollapsed ? '4rem' : '16rem' }}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
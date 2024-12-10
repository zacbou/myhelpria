import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { 
  ChevronLeft,
  ChevronRight,
  BarChart2, 
  BookOpen, 
  Users,
  MessageSquare, 
  Settings, 
  User,
  Palette
} from 'lucide-react';

interface SidebarProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
  isCollapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

export default function Sidebar({ currentTheme, onThemeChange, isCollapsed, onCollapse }: SidebarProps) {
  const { t } = useTranslation();
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: BarChart2, label: t('nav.dashboard') },
    { path: '/dashboard/pages', icon: BookOpen, label: 'Pages' },
    { path: '/dashboard/team', icon: Users, label: t('nav.team') },
    { path: '/dashboard/messages', icon: MessageSquare, label: t('nav.messages') },
    { path: '/dashboard/settings', icon: Settings, label: t('nav.settings') },
    { path: '/dashboard/profile', icon: User, label: t('nav.profile') },
    { path: '/dashboard/theme', icon: Palette, label: t('nav.theme') },
  ];

  return (
    <div className="h-full py-6 relative">
      {/* Toggle Button */}
      <div className="absolute -right-3 top-4">
        <button
          onClick={() => {
            onCollapse(!isCollapsed);
          }}
          className="bg-blue-500 hover:bg-blue-600 border border-blue-400 rounded-full p-1.5 shadow-md hover:shadow-lg transition-all group z-30"
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4 text-white" />
          ) : (
            <ChevronLeft className="h-4 w-4 text-white" />
          )}
        </button>
      </div>

      <div className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center px-4 py-2.5 text-gray-700 hover:bg-gray-100 rounded-md ${
              location.pathname === item.path ? 'bg-gray-100 font-medium' : ''
            }`}
          >
            <div className={`flex-shrink-0 ${isCollapsed ? 'mx-auto' : 'mr-3'}`}>
              <item.icon className="h-5 w-5 text-gray-400" />
            </div>
            {!isCollapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </div>
    </div>
  );
}
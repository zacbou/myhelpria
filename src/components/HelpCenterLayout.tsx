import React from 'react';
import { Search } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import * as Icons from 'lucide-react';
import { HelpCenterTheme } from '../types';

interface HelpCenterLayoutProps {
  theme: HelpCenterTheme;
}

export default function HelpCenterLayout({ theme }: HelpCenterLayoutProps) {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section with Search */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-8">{theme.name}</h1>
            <div className="max-w-xl mx-auto">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-600 focus:ring-white bg-white"
                  placeholder={theme.searchPlaceholder}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Help Center Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {theme.sections.map((section) => {
            const IconComponent = Icons[section.icon as keyof typeof Icons];
            return (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-primary-50 rounded-lg">
                      <IconComponent className="h-6 w-6 text-primary-600" />
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900">
                      {section.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                      {section.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-100 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {t('helpCenter.needMoreHelp')}
            </h2>
            <div className="space-y-2">
              <p className="text-gray-600">
                Email: <a href={`mailto:${theme.contactInfo.email}`} className="text-primary-600 hover:text-primary-700">
                  {theme.contactInfo.email}
                </a>
              </p>
              {theme.contactInfo.phone && (
                <p className="text-gray-600">
                  Phone: <a href={`tel:${theme.contactInfo.phone}`} className="text-primary-600 hover:text-primary-700">
                    {theme.contactInfo.phone}
                  </a>
                </p>
              )}
              {theme.contactInfo.hours && (
                <p className="text-gray-600">
                  Hours: {theme.contactInfo.hours}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
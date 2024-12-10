import React from 'react';
import { useTranslation } from 'react-i18next';
import { BarChart2, Users, Clock, Globe, ArrowUp, BookOpen, Search, TrendingUp } from 'lucide-react';

export default function AnalyticsDashboard() {
  const { t } = useTranslation();
  const mockAnalytics = {
    totalViews: 12500,
    popularArticles: [
      { 
        id: '1', 
        title: 'Getting Started Guide', 
        content: 'Learn how to get started with our platform.',
        category: 'Getting Started', 
        lastUpdated: '2024-03-10', 
        views: 2500 
      },
      { 
        id: '2', 
        title: 'API Documentation', 
        content: 'Complete API reference documentation.',
        category: 'API', 
        lastUpdated: '2024-03-09', 
        views: 1800 
      }
    ],
    searchTerms: [
      { term: 'api keys', count: 450 },
      { term: 'billing', count: 320 },
      { term: 'custom domain', count: 280 },
    ],
    dailyStats: [
      { date: '2024-03-10', views: 500 },
      { date: '2024-03-09', views: 480 },
    ],
    geoStats: [
      { country: 'United States', visitors: 5000, percentage: 40 },
      { country: 'United Kingdom', visitors: 2500, percentage: 20 },
      { country: 'Germany', visitors: 1875, percentage: 15 },
    ],
    activeUsers: 250,
    avgTimeOnPage: 185,
  };

  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-2 bg-blue-50 rounded-lg">
                  <Users className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{t('dashboard.totalViews')}</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{mockAnalytics.totalViews.toLocaleString()}</dd>
                </dl>
              </div>
            </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-2 bg-green-50 rounded-lg">
                  <Clock className="h-6 w-6 text-green-500" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{t('dashboard.avgTime')}</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{Math.round(mockAnalytics.avgTimeOnPage / 60)} mins</dd>
                </dl>
              </div>
            </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-2 bg-purple-50 rounded-lg">
                  <Users className="h-6 w-6 text-purple-500" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{t('dashboard.activeUsers')}</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{mockAnalytics.activeUsers}</dd>
                </dl>
              </div>
            </div>
        </div>

        <div className="bg-white overflow-hidden shadow-sm rounded-xl p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="p-2 bg-indigo-50 rounded-lg">
                  <Globe className="h-6 w-6 text-indigo-500" />
                </div>
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">{t('dashboard.countries')}</dt>
                  <dd className="text-2xl font-semibold text-gray-900">{mockAnalytics.geoStats.length}</dd>
                </dl>
              </div>
            </div>
        </div>
      </div>

      {/* Popular Articles Grid */}
      <div className="bg-white shadow-sm rounded-xl p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
          <BookOpen className="h-5 w-5 mr-2 text-blue-500" />
          {t('dashboard.popularArticles')}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {mockAnalytics.popularArticles.map((article) => (
            <div key={article.id} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
              <h4 className="text-lg font-medium text-gray-900 mb-3">{article.title}</h4>
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  {article.category}
                </span>
                <div className="flex items-center">
                  <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
                  {article.views.toLocaleString()} views
                </div>
              </div>
              <div className="mt-3 text-xs text-gray-400">
                Last updated: {new Date(article.lastUpdated).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
            <Search className="h-5 w-5 mr-2 text-blue-500" />
            Top Search Terms
          </h3>
          <div className="space-y-4">
            {mockAnalytics.searchTerms.map(({ term, count }) => (
              <div key={term} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center">
                  <Search className="h-4 w-4 text-gray-400 mr-3" />
                  <span className="font-medium text-gray-700">{term}</span>
                </div>
                <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                  {count} searches
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow-sm rounded-xl p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-6 flex items-center">
            <BarChart2 className="h-5 w-5 mr-2 text-blue-500" />
            Daily Traffic
          </h3>
          <div className="space-y-4">
            {mockAnalytics.dailyStats.map(({ date, views }) => (
              <div key={date} className="bg-gray-50 rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-700">
                    {new Date(date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                  </span>
                  <div className="flex items-center">
                    <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium">
                      {views.toLocaleString()} views
                    </span>
                  </div>
                </div>
                <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(views / mockAnalytics.totalViews) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
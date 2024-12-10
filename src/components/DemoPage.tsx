import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  Globe,
  Settings,
  Users,
  FileText,
  Search,
  MessageSquare,
  Palette,
  ArrowRight,
} from 'lucide-react';

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard Demo</h1>
          <p className="text-lg text-gray-600">
            Experience the powerful features of our help center management platform
          </p>
        </div>

        {/* Dashboard Preview */}
        <div className="bg-white rounded-lg shadow-xl overflow-hidden mb-12">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900">Dashboard Overview</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-center">
                <Users className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-blue-600">Total Visitors</p>
                  <p className="text-2xl font-semibold text-blue-900">12.5K</p>
                </div>
              </div>
            </div>
            <div className="bg-green-50 rounded-lg p-6">
              <div className="flex items-center">
                <FileText className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-green-600">Articles</p>
                  <p className="text-2xl font-semibold text-green-900">48</p>
                </div>
              </div>
            </div>
            <div className="bg-purple-50 rounded-lg p-6">
              <div className="flex items-center">
                <Globe className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-purple-600">Countries</p>
                  <p className="text-2xl font-semibold text-purple-900">32</p>
                </div>
              </div>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <div className="flex items-center">
                <MessageSquare className="h-8 w-8 text-orange-600" />
                <div className="ml-4">
                  <p className="text-sm font-medium text-orange-600">Responses</p>
                  <p className="text-2xl font-semibold text-orange-900">92%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Analytics Chart Preview */}
          <div className="p-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-medium text-gray-900">Visitor Analytics</h3>
              <div className="flex space-x-2">
                <button className="px-3 py-1 text-sm bg-blue-100 text-blue-600 rounded-md">
                  Daily
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                  Weekly
                </button>
                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded-md">
                  Monthly
                </button>
              </div>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <BarChart2 className="h-32 w-32 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Settings className="h-6 w-6 text-blue-500" />
              <h3 className="ml-3 text-lg font-medium">Custom Domain</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Configure your own domain name and SSL certificates with just a few clicks.
            </p>
            <div className="bg-gray-50 rounded-md p-4">
              <code className="text-sm text-gray-700">help.yourdomain.com</code>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Palette className="h-6 w-6 text-blue-500" />
              <h3 className="ml-3 text-lg font-medium">Theme Customization</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Choose from multiple themes or customize colors to match your brand.
            </p>
            <div className="flex space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500"></div>
              <div className="w-8 h-8 rounded-full bg-purple-500"></div>
              <div className="w-8 h-8 rounded-full bg-green-500"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-4">
              <Search className="h-6 w-6 text-blue-500" />
              <h3 className="ml-3 text-lg font-medium">Smart Search</h3>
            </div>
            <p className="text-gray-600 mb-4">
              Powerful search functionality with analytics and popular terms tracking.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md"
                disabled
              />
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to get started?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of companies using our platform to manage their help centers.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/signup"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
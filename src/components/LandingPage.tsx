import React from 'react';
import { Link } from 'react-router-dom';
import { Globe2, Zap, Users, Settings, Shield, BarChart2 } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Modern Help Center</span>
                  <span className="block text-blue-600">for Modern Teams</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Empower your customers with a beautiful, customizable help center. Reduce support tickets and improve customer satisfaction.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <Link
                      to="/demo"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                    >
                      Live Demo
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <a
                      href="#pricing"
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg md:px-10"
                    >
                      Pricing
                    </a>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to support your customers
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Globe2 className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Custom Domain</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Use your own domain name for a seamless brand experience.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <BarChart2 className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Advanced Analytics</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Track visitor behavior, popular content, and geographic data.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Settings className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Customizable</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Match your brand with custom themes and styling.
                </p>
              </div>

              <div className="relative">
                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-blue-500 text-white">
                  <Shield className="h-6 w-6" />
                </div>
                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Secure</p>
                <p className="mt-2 ml-16 text-base text-gray-500">
                  Enterprise-grade security with SSL encryption.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing */}
      <div id="pricing" className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
          </div>

          <div className="mt-10 space-y-4 sm:space-y-0 sm:grid sm:grid-cols-3 sm:gap-6 lg:max-w-4xl lg:mx-auto">
            {/* Basic Plan */}
            <div className="border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">Basic</h3>
              <p className="mt-4 text-sm text-gray-500">Perfect for small teams getting started</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$29</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Zap className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Up to 5,000 visitors/mo</span>
                </li>
                <li className="flex space-x-3">
                  <Users className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">3 team members</span>
                </li>
              </ul>
            </div>

            {/* Pro Plan */}
            <div className="border border-blue-500 rounded-lg shadow-sm p-6 relative">
              <div className="absolute top-0 right-0 -translate-y-1/2 px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full">
                Popular
              </div>
              <h3 className="text-lg font-medium text-gray-900">Pro</h3>
              <p className="mt-4 text-sm text-gray-500">For growing businesses</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">$79</span>
                <span className="text-base font-medium text-gray-500">/mo</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Zap className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Up to 50,000 visitors/mo</span>
                </li>
                <li className="flex space-x-3">
                  <Users className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">10 team members</span>
                </li>
              </ul>
            </div>

            {/* Enterprise Plan */}
            <div className="border border-gray-200 rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-medium text-gray-900">Enterprise</h3>
              <p className="mt-4 text-sm text-gray-500">For large organizations</p>
              <p className="mt-8">
                <span className="text-4xl font-extrabold text-gray-900">Custom</span>
              </p>
              <ul className="mt-6 space-y-4">
                <li className="flex space-x-3">
                  <Zap className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Unlimited visitors</span>
                </li>
                <li className="flex space-x-3">
                  <Users className="flex-shrink-0 h-5 w-5 text-green-500" />
                  <span className="text-sm text-gray-500">Unlimited team members</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
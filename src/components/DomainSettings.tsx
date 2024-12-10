import React, { useState, useEffect } from 'react';
import { Globe, Save } from 'lucide-react';
import { updateDomainSettings, getDomainSettings } from '../lib/firebase/settings';
import type { ThemeConfig } from '../types';

export default function DomainSettings() {
  const [domain, setDomain] = useState('');
  const [isConfiguring, setIsConfiguring] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    const { settings, error } = await getDomainSettings();
    if (settings) {
      setDomain(settings.domain || '');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfiguring(true);
    setError(null);
    setSuccess(false);

    const { error } = await updateDomainSettings({ domain });

    if (error) {
      setError(error);
    } else {
      setSuccess(true);
    }
    setIsConfiguring(false);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow-sm rounded-xl">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Custom Domain</h3>
          <div className="mt-2 max-w-xl text-sm text-gray-500">
            <p>Configure your custom domain for a seamless brand experience.</p>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 border-l-4 border-red-400 rounded-md">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}
          
          {success && (
            <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400 rounded-md">
              <p className="text-sm text-green-700">Settings saved successfully!</p>
            </div>
          )}
          <form onSubmit={handleSubmit} className="mt-5 sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="domain" className="sr-only">
                Domain
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 sm:text-sm">
                  <Globe className="h-4 w-4" />
                </span>
                <input
                  type="text"
                  name="domain"
                  id="domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-blue-500 focus:border-blue-500 sm:text-sm border-gray-300"
                  placeholder="help.yourdomain.com"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isConfiguring}
              className="mt-3 w-full inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            >
              <Save className="h-4 w-4 mr-2" />
              {isConfiguring ? 'Configuring...' : 'Save'}
            </button>
          </form>
        </div>
        <div className="px-4 py-4 sm:px-6 border-t border-gray-200">
          <div className="text-sm">
            <h4 className="font-medium text-gray-900">DNS Configuration</h4>
            <p className="mt-1 text-gray-500">Add these records to your DNS provider:</p>
            <div className="mt-3 bg-gray-50 rounded-md p-4">
              <code className="text-sm text-gray-700">
                CNAME help.yourdomain.com help.ourservice.com
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import React, { useState } from 'react';
import { Building2, CreditCard, Settings, Mail, Phone } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { updateUserProfile } from '../lib/firebase/users';
import { updateCompanyProfile, getCompanyProfile } from '../lib/firebase/company';
import { updateUserDisplayName } from '../lib/firebase/auth';
import ImageUpload from './ImageUpload';
import { updateProfilePhoto, updateCompanyLogo } from '../lib/firebase/storage';

export default function ProfileSettings() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  
  // Load company profile on mount
  React.useEffect(() => {
    const loadCompanyProfile = async () => {
      const { profile, error } = await getCompanyProfile();
      if (profile) {
        setFormData(prev => ({
          ...prev,
          companyName: profile.name,
          companyLogo: profile.logo,
          industry: profile.industry,
          website: profile.website,
          address: profile.address
        }));
      }
    };
    loadCompanyProfile();
  }, []);

  // Form data state
  const [formData, setFormData] = useState({
    displayName: user?.displayName || '',
    email: user?.email || '',
    phone: user?.phoneNumber || '',
    timeZone: 'PT',
    companyName: 'Acme Corp',
    companyLogo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop',
    industry: 'Technology',
    website: 'www.acmecorp.com',
    address: '123 Business Ave'
  });

  const handleProfilePhotoUpload = async (url: string) => {
    const { error } = await updateProfilePhoto(url);
    if (error) {
      setError(error);
    }
  };

  const handleCompanyLogoUpload = async (url: string) => {
    const { error } = await updateCompanyLogo(url);
    if (error) {
      setError(error);
    } else {
      setFormData(prev => ({ ...prev, companyLogo: url }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSuccess(false);

    try {
      // Update display name in Firebase Auth
      if (user && formData.displayName !== user.displayName) {
        await updateUserDisplayName(formData.displayName);
      }

      // Update profile in Firestore
      const { error: updateError } = await updateUserProfile({
        displayName: formData.displayName,
        email: formData.email,
        phone: formData.phone,
        timeZone: formData.timeZone,
        companyName: formData.companyName,
        companyLogo: formData.companyLogo,
        industry: formData.industry,
        website: formData.website,
        address: formData.address
      });

      if (updateError) {
        throw new Error(updateError);
      } else if (activeTab === 'company') {
        // Update company profile in Firestore
        const { error: companyError } = await updateCompanyProfile({
          name: formData.companyName,
          logo: formData.companyLogo,
          industry: formData.industry,
          website: formData.website,
          address: formData.address
        });

        if (companyError) {
          throw new Error(companyError);
        }
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update profile');
    }
    setSaving(false);
  };

  return (
    <div className="bg-white shadow rounded-lg">
      {/* Profile Header */}
      <div className="border-b border-gray-200">
        <div className="p-6">
          <div className="flex items-center space-x-5">
            <ImageUpload
              currentImage={user?.photoURL}
              onUpload={handleProfilePhotoUpload}
              type="profile"
            />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{formData.displayName || 'User Name'}</h2>
              <div className="mt-1 flex items-center space-x-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Mail className="h-4 w-4 mr-1" />
                  {formData.email}
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <Building2 className="h-4 w-4 mr-1" />
                  {formData.companyName}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="px-6">
          <nav className="-mb-px flex space-x-6">
            {['profile', 'company', 'billing'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`
                  border-b-2 py-4 px-1 text-sm font-medium ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                  }
                `}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {error && (
        <div className="m-6 p-4 bg-red-50 border-l-4 border-red-400 rounded-md flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="m-6 p-4 bg-green-50 border-l-4 border-green-400 rounded-md flex items-center">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="ml-3 text-sm font-medium text-green-700">Profile updated successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="p-6">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Profile Information</h3>
                <p className="mt-1 text-sm text-gray-500">Update your personal information.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input
                    type="text"
                    value={formData.displayName}
                    onChange={e => setFormData(prev => ({ ...prev, displayName: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Time Zone</label>
                  <select 
                    value={formData.timeZone}
                    onChange={e => setFormData(prev => ({ ...prev, timeZone: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="PT">Pacific Time (PT)</option>
                    <option value="MT">Mountain Time (MT)</option>
                    <option value="CT">Central Time (CT)</option>
                    <option value="ET">Eastern Time (ET)</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'company' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Company Details</h3>
                <p className="mt-1 text-sm text-gray-500">Manage your company information.</p>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Company Logo</label>
                  <div className="mt-1 flex items-center space-x-4">
                    <ImageUpload
                      currentImage={formData.companyLogo}
                      onUpload={handleCompanyLogoUpload}
                      type="company"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Company Name</label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={e => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Industry</label>
                  <input
                    type="text"
                    value={formData.industry}
                    onChange={e => setFormData(prev => ({ ...prev, industry: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={e => setFormData(prev => ({ ...prev, website: e.target.value }))}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <textarea
                    value={formData.address}
                    onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'billing' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Billing Information</h3>
                <p className="mt-1 text-sm text-gray-500">Manage your subscription and payment details.</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-medium text-gray-900">Current Plan: Professional</h4>
                    <p className="mt-1 text-sm text-gray-500">Next billing date: April 1, 2024</p>
                  </div>
                  <button type="button" className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Change Plan
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-4">Payment Method</h4>
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Visa ending in 4242</p>
                      <p className="text-sm text-gray-500">Expires 12/2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Save Button */}
          <div className="mt-6 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Settings className="h-4 w-4 mr-2" />
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
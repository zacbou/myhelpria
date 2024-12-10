import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { addArticle } from '../lib/firebase/db';
import type { Article } from '../types';

export default function ArticleEditor() {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    category: '',
    lastUpdated: new Date().toISOString(),
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      lastUpdated: new Date().toISOString(),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      // Validate form data
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (!formData.category.trim()) {
        throw new Error('Category is required');
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }

      // Submit the article
      const { id, error } = await addArticle(formData);
      
      if (error) {
        throw new Error(error);
      }

      // Reset form after successful submission
      setFormData({
        title: '',
        content: '',
        category: '',
        lastUpdated: new Date().toISOString(),
      });
      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save article');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow rounded-lg p-6 space-y-6">
      <h2 className="text-lg font-medium text-gray-900">Create New Article</h2>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">{error}</h3>
            </div>
          </div>
        </div>
      )}

      {success && (
        <div className="rounded-md bg-green-50 p-4">
          <div className="flex">
            <div className="ml-3">
              <h3 className="text-sm font-medium text-green-800">
                Article created successfully!
              </h3>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">
          Category
        </label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        >
          <option value="">Select a category</option>
          <option value="getting-started">Getting Started</option>
          <option value="features">Features</option>
          <option value="troubleshooting">Troubleshooting</option>
          <option value="api">API Documentation</option>
          <option value="security">Security</option>
          <option value="billing">Billing</option>
        </select>
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows={10}
          value={formData.content}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          required
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-500">
          Last updated: {new Date(formData.lastUpdated).toLocaleString()}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="h-4 w-4 mr-2" />
          {isSubmitting ? 'Saving...' : 'Save Article'}
        </button>
      </div>
    </form>
  );
}
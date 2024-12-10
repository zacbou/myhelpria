import React, { useState, useEffect } from 'react';
import { FileText, Shield, Book, HelpCircle, FileCode, Settings, ScrollText, Phone, Building2, ArrowRight, Loader, Search, Filter, Plus, X, Eye, Edit2, Trash2 } from 'lucide-react';
import { getPages, createPage, deletePage } from '../lib/firebase/pages';
import type { Page } from '../types';
import PagePreview from './PagePreview';

const PAGE_TEMPLATES = [
  {
    id: 'privacy-policy',
    title: 'Privacy Policy',
    description: 'Legal document that discloses how customer data is collected and used',
    icon: Shield,
    content: `# Privacy Policy\n\nLast updated: ${new Date().toLocaleDateString()}\n\n## Introduction\n\nThis Privacy Policy describes how we collect, use, and handle your information...`
  },
  {
    id: 'terms',
    title: 'Terms of Service',
    description: 'Legal agreement between a service provider and a person who wants to use that service',
    icon: ScrollText,
    content: `# Terms of Service\n\nLast updated: ${new Date().toLocaleDateString()}\n\n## Agreement to Terms\n\nBy accessing our service, you agree to be bound by these Terms...`
  },
  {
    id: 'faq',
    title: 'FAQ',
    description: 'Frequently asked questions and their answers',
    icon: HelpCircle,
    content: `# Frequently Asked Questions\n\n## General Questions\n\n### Question 1?\nAnswer to question 1...\n\n### Question 2?\nAnswer to question 2...`
  },
  {
    id: 'api-docs',
    title: 'API Documentation',
    description: 'Technical documentation for your API endpoints',
    icon: FileCode,
    content: `# API Documentation\n\n## Getting Started\n\nThis documentation will help you get started with our API...`
  },
  {
    id: 'about',
    title: 'About Us',
    description: 'Information about your company or organization',
    icon: Building2,
    content: `# About Us\n\n## Our Story\n\nShare your company's journey and mission here...`
  },
  {
    id: 'contact',
    title: 'Contact',
    description: 'Contact information and support details',
    icon: Phone,
    content: `# Contact Us\n\n## Get in Touch\n\nWe'd love to hear from you! Here's how you can reach us...`
  }
];

export default function PageManager() {
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showTemplates, setShowTemplates] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [previewPage, setPreviewPage] = useState<Page | null>(null);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setLoading(true);
    const { pages, error } = await getPages();
    if (error) {
      setError(error);
    } else {
      setPages(pages);
    }
    setLoading(false);
  };

  const handleCreateFromTemplate = async (template: typeof PAGE_TEMPLATES[0]) => {
    setLoading(true);
    const { error } = await createPage({
      title: template.title,
      content: template.content,
      status: 'draft',
      type: template.id,
      lastUpdated: new Date().toISOString()
    });

    if (error) {
      setError(error);
    } else {
      await loadPages();
    }
    setLoading(false);
  };

  const handleDeletePage = async (pageId: string) => {
    if (!window.confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
      return;
    }

    const { error } = await deletePage(pageId);
    if (error) {
      setError(error);
    } else {
      await loadPages();
    }
  };

  const handlePreview = (page: Page) => {
    setPreviewPage(page);
  };

  const handleSavePreview = async (title: string, content: string) => {
    if (!previewPage) return;
    
    const updatedPage = {
      ...previewPage,
      title,
      content,
      lastUpdated: new Date().toISOString()
    };

    const { error } = await updatePage(previewPage.id, updatedPage);
    if (error) {
      setError(error);
    } else {
      await loadPages();
      setPreviewPage(null);
    }
  };

  const filteredPages = pages
    .filter(page => 
      (filterStatus === 'all' || page.status === filterStatus) &&
      (searchQuery === '' || 
        page.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        page.type.toLowerCase().includes(searchQuery.toLowerCase())
      )
    )
    .sort((a, b) => new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime());

  if (loading) {
    return (
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex items-center justify-center h-32 animate-pulse">
          <Loader className="h-8 w-8 text-blue-500 animate-spin" />
          <span className="ml-3 text-sm text-gray-500">Loading pages...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <FileText className="h-6 w-6 text-blue-500 mr-2" />
            Pages
          </h2>
          <button
            onClick={() => setShowTemplates(true)}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-2" />
            Create Page
          </button>
        </div>

        {/* Search and Filter */}
        <div className="flex items-center space-x-4 px-6 pb-6">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search pages..."
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Filter className="h-5 w-5 text-gray-400" />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
              className="block rounded-md text-sm border-gray-300 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Pages</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>
        </div>

        {/* Page List */}
        <div className="border-t border-gray-100">
          {filteredPages.length > 0 ? (
            filteredPages.map((page) => (
              <div
                key={page.id}
                className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <h3 className="text-lg font-medium text-gray-900">{page.title}</h3>
                  <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                    <span className="capitalize">{page.type}</span>
                    <span>•</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      page.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {page.status}
                    </span>
                    <span>•</span>
                    <span>Updated {new Date(page.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handlePreview(page)}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Eye className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => {/* Handle edit */}}
                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
              {PAGE_TEMPLATES.map((template) => (
                <button
                  key={template.id}
                  onClick={() => handleCreateFromTemplate(template)}
                  className="text-left p-6 bg-white rounded-xl border border-gray-200 hover:border-blue-500 hover:shadow-md transition-all group"
                >
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-blue-50 rounded-lg">
                      <template.icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <h3 className="ml-3 text-lg font-medium text-gray-900">{template.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{template.description}</p>
                  <div className="mt-4 flex items-center text-sm text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span>Use this template</span>
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Template Selection Modal */}
      {showTemplates && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-gray-900">Choose a Template</h3>
                <button
                  onClick={() => setShowTemplates(false)}
                  className="text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">Close</span>
                  <X className="h-6 w-6" />
                </button>
              </div>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PAGE_TEMPLATES.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleCreateFromTemplate(template)}
                    className="text-left p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  >
                    <h4 className="text-lg font-medium text-gray-900 mb-2">{template.title}</h4>
                    <p className="text-sm text-gray-500">{template.description}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Page Preview Modal */}
      {previewPage && (
        <PagePreview
          title={previewPage.title}
          content={previewPage.content}
          onClose={() => setPreviewPage(null)}
          onSave={handleSavePreview}
        />
      )}
    </div>
  );
}
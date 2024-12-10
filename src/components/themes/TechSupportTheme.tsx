import React from 'react';
import { Zap, FileText, AlertTriangle, Monitor, Download, Code, Shield, HelpCircle, Terminal } from 'lucide-react';

interface ThemeProps {
  sections: Array<{
    id: string;
    title: string;
    content: string;
    visible: boolean;
  }>;
}

export default function TechSupportTheme({ sections }: ThemeProps) {
  const getSectionContent = (id: string) => {
    const section = sections.find(s => s.id === id);
    return section?.visible ? section : null;
  };

  return (
    <div className="min-h-screen bg-[#f0fdff]">
      {/* Hero Section */}
      {getSectionContent('header') && (
        <div className="bg-gradient-to-r from-[#2563eb] to-[#1e40af] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-8">Developer Documentation</h1>
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#3b82f6]"
                    placeholder="Search documentation, API references, guides..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Categories */}
      {getSectionContent('categories') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: Zap, title: 'Getting Started', description: 'Quick start guides and basic setup instructions' },
              { icon: FileText, title: 'Technical Specifications', description: 'Detailed technical documentation and specifications' },
              { icon: AlertTriangle, title: 'Troubleshooting', description: 'Common issues and their solutions' },
              { icon: Monitor, title: 'System Requirements', description: 'Hardware and software requirements' },
              { icon: Download, title: 'Software Updates', description: 'Latest releases, changelogs, and update guides' },
              { icon: Code, title: 'API Documentation', description: 'API references, endpoints, and integration guides' },
              { icon: Shield, title: 'Security Guidelines', description: 'Security best practices and compliance information' },
              { icon: HelpCircle, title: 'FAQs', description: 'Frequently asked questions and answers' },
              { icon: Terminal, title: 'Developer Resources', description: 'SDKs, tools, and developer documentation' }
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#3b82f6]/10 rounded-lg">
                    <category.icon className="h-6 w-6 text-[#2563eb]" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-[#164e63]">{category.title}</h3>
                </div>
                <p className="text-[#0e7490] text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      {getSectionContent('contact') && (
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-[#164e63] mb-4">Need Technical Support?</h2>
              <div className="space-y-2">
                <p className="text-[#0e7490]">
                  Email: <a href="mailto:developers@techsupport.com" className="text-[#2563eb] hover:text-[#1e40af]">
                    developers@techsupport.com
                  </a>
                </p>
                <p className="text-[#0e7490]">
                  Hours: Mon-Fri 9AM-6PM EST
                </p>
                <div className="mt-6 flex justify-center space-x-4">
                  <a href="#" className="text-[#2563eb] hover:text-[#1e40af] flex items-center">
                    <Code className="h-5 w-5 mr-2" />
                    API Reference
                  </a>
                  <a href="#" className="text-[#2563eb] hover:text-[#1e40af] flex items-center">
                    <Terminal className="h-5 w-5 mr-2" />
                    Developer Portal
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
import React from 'react';
import * as Icons from 'lucide-react';

interface Section {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Icons;
}

interface TechStackThemeProps {
  sections: Section[];
}

export const techStackSections = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Quick start guides and installation instructions',
    icon: 'Zap'
  },
  {
    id: 'api-docs',
    title: 'API Documentation',
    description: 'Complete API reference and endpoints',
    icon: 'Code'
  },
  {
    id: 'sdk',
    title: 'SDKs & Tools',
    description: 'Official SDKs and development tools',
    icon: 'Box'
  },
  {
    id: 'tutorials',
    title: 'Tutorials',
    description: 'Step-by-step guides and examples',
    icon: 'BookOpen'
  },
  {
    id: 'authentication',
    title: 'Authentication',
    description: 'Security and authentication guides',
    icon: 'Shield'
  },
  {
    id: 'deployment',
    title: 'Deployment',
    description: 'Deployment guides and best practices',
    icon: 'Cloud'
  },
  {
    id: 'troubleshooting',
    title: 'Troubleshooting',
    description: 'Common issues and solutions',
    icon: 'AlertCircle'
  },
  {
    id: 'integrations',
    title: 'Integrations',
    description: 'Third-party integrations and plugins',
    icon: 'Puzzle'
  },
  {
    id: 'changelog',
    title: 'Changelog',
    description: 'Latest updates and version history',
    icon: 'GitBranch'
  }
];

export const techStackStyle = {
  header: {
    backgroundColor: 'from-indigo-600 to-purple-600',
    textColor: 'text-white'
  },
  search: {
    placeholder: 'Search API docs, tutorials, guides...'
  },
  section: {
    backgroundColor: 'bg-white',
    hoverBackgroundColor: 'hover:bg-gray-50',
    iconBackgroundColor: 'bg-indigo-50',
    iconColor: 'text-indigo-600',
    textColor: 'text-gray-900',
    descriptionColor: 'text-gray-600'
  }
};

export default function TechStackTheme({ sections }: TechStackThemeProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sections.map((section) => {
            const IconComponent = Icons[section.icon];
            return (
              <div
                key={section.id}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-indigo-50 rounded-lg">
                    <IconComponent className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">
                    {section.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm">{section.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
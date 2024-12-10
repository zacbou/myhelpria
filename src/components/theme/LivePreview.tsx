import React from 'react';
import { PreviewHeader } from './PreviewHeader';
import { PreviewSearch } from './PreviewSearch';
import { PreviewSection } from './PreviewSection';
import * as Icons from 'lucide-react';

interface LivePreviewProps {
  theme: 'ecommerce' | 'tech-stack';
  sections: Array<{
    id: string;
    title: string;
    icon: string;
  }>;
  onEditHeader: () => void;
}

const themeStyles = {
  ecommerce: {
    header: {
      bgColor: 'bg-gradient-to-r from-blue-600 to-blue-700',
      textColor: 'text-white'
    },
    search: {
      bgColor: 'bg-white',
      textColor: 'text-gray-700'
    },
    section: {
      bgColor: 'bg-white',
      iconColor: 'text-blue-600',
      textColor: 'text-gray-900'
    }
  },
  'tech-stack': {
    header: {
      bgColor: 'bg-gradient-to-r from-indigo-600 to-purple-600',
      textColor: 'text-white'
    },
    search: {
      bgColor: 'bg-white',
      textColor: 'text-gray-700'
    },
    section: {
      bgColor: 'bg-white',
      iconColor: 'text-indigo-600',
      textColor: 'text-gray-900'
    }
  }
};

export function LivePreview({ theme, sections, onEditHeader }: LivePreviewProps) {
  const styles = themeStyles[theme];
  
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
      <PreviewHeader
        title="How can we help you?"
        onEdit={onEditHeader}
        style={styles.header}
      />
      
      <PreviewSearch
        placeholder="Search for help articles..."
        style={styles.search}
      />
      
      <div className="p-4 grid grid-cols-2 sm:grid-cols-3 gap-3">
        {sections.slice(0, 6).map((section) => (
          <PreviewSection
            key={section.id}
            icon={section.icon as keyof typeof Icons}
            title={section.title}
            style={styles.section}
          />
        ))}
      </div>
    </div>
  );
}
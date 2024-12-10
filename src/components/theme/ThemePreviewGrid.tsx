import React from 'react';
import { Check } from 'lucide-react';

interface Theme {
  id: string;
  name: string;
  description: string;
  preview: {
    header: {
      bgColor: string;
      textColor: string;
    };
    sections: {
      bgColor: string;
      iconColor: string;
    };
  };
}

const themes: Theme[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce',
    description: 'Perfect for online stores and customer support',
    preview: {
      header: {
        bgColor: 'bg-gradient-to-r from-blue-600 to-blue-700',
        textColor: 'text-white'
      },
      sections: {
        bgColor: 'bg-white',
        iconColor: 'text-blue-600'
      }
    }
  },
  {
    id: 'tech-stack',
    name: 'Tech Stack',
    description: 'Developer documentation and API reference',
    preview: {
      header: {
        bgColor: 'bg-gradient-to-r from-indigo-600 to-purple-600',
        textColor: 'text-white'
      },
      sections: {
        bgColor: 'bg-white',
        iconColor: 'text-indigo-600'
      }
    }
  }
];

interface ThemePreviewGridProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export function ThemePreviewGrid({ currentTheme, onThemeChange }: ThemePreviewGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {themes.map((theme) => (
        <button
          key={theme.id}
          onClick={() => onThemeChange(theme.id)}
          className={`relative group rounded-md overflow-hidden border transition-all ${
            currentTheme === theme.id
              ? 'border-blue-500 ring-2 ring-blue-100 shadow-md'
              : 'border-gray-200 hover:border-gray-300 hover:shadow-sm'
          }`}
        >
          {/* Theme Preview */}
          <div className="aspect-[3/2] p-3">
            {/* Mini Header */}
            <div className={`${theme.preview.header.bgColor} rounded-md p-2 mb-2`}>
              <div className={`h-2 w-20 ${theme.preview.header.textColor} bg-current rounded opacity-50`} />
            </div>

            {/* Mini Sections Grid */}
            <div className="grid grid-cols-2 gap-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`${theme.preview.sections.bgColor} rounded-md p-2 shadow-sm border border-gray-50`}
                >
                  <div className={`h-1.5 w-6 ${theme.preview.sections.iconColor} bg-current rounded mb-1 opacity-50`} />
                  <div className="h-1.5 w-10 bg-gray-200 rounded" />
                </div>
              ))}
            </div>
          </div>

          {/* Theme Info */}
          <div className="p-3 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between mb-1">
              <h3 className="text-sm font-medium text-gray-900">{theme.name}</h3>
              {currentTheme === theme.id && (
                <Check className="h-4 w-4 text-blue-500" />
              )}
            </div>
            <p className="text-xs text-gray-500 line-clamp-1">{theme.description}</p>
          </div>

          {/* Selection Overlay */}
          <div className={`absolute inset-0 bg-blue-500 bg-opacity-0 flex items-center justify-center transition-opacity ${
            currentTheme === theme.id ? 'group-hover:bg-opacity-10' : 'group-hover:bg-opacity-5'
          }`}>
            {currentTheme !== theme.id && (
              <span className="px-3 py-1 bg-white rounded-full text-sm font-medium text-gray-900 shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all">
                Select Theme
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
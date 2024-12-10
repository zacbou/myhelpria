import React from 'react';
import { useTranslation } from 'react-i18next';
import type { ThemeConfig } from '../types';

interface StyleEditorProps {
  config: ThemeConfig;
  onChange: (key: string, value: any) => void;
}

export function StyleEditor({ config, onChange }: StyleEditorProps) {
  const { t } = useTranslation();

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">
        Theme Style Settings
      </h3>

      <div className="space-y-6">
        {/* Colors */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Colors
          </h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Primary Color
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="color"
                  value={config.primaryColor}
                  onChange={(e) => onChange('primaryColor', e.target.value)}
                  className="h-8 w-8 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={config.primaryColor}
                  onChange={(e) => onChange('primaryColor', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Secondary Color
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="color"
                  value={config.secondaryColor}
                  onChange={(e) => onChange('secondaryColor', e.target.value)}
                  className="h-8 w-8 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={config.secondaryColor}
                  onChange={(e) => onChange('secondaryColor', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Background Color
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="color"
                  value={config.backgroundColor}
                  onChange={(e) => onChange('backgroundColor', e.target.value)}
                  className="h-8 w-8 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={config.backgroundColor}
                  onChange={(e) => onChange('backgroundColor', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Text Color
              </label>
              <div className="mt-1 flex items-center space-x-2">
                <input
                  type="color"
                  value={config.textColor}
                  onChange={(e) => onChange('textColor', e.target.value)}
                  className="h-8 w-8 rounded border border-gray-300"
                />
                <input
                  type="text"
                  value={config.textColor}
                  onChange={(e) => onChange('textColor', e.target.value)}
                  className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Typography */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Typography
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Font Family
              </label>
              <select
                value={config.fontFamily}
                onChange={(e) => onChange('fontFamily', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              >
                <option value="system-ui">System UI</option>
                <option value="sans-serif">Sans Serif</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
              </select>
            </div>
          </div>
        </div>

        {/* Layout */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 mb-4">
            Layout
          </h4>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Border Radius
              </label>
              <input
                type="text"
                value={config.borderRadius}
                onChange={(e) => onChange('borderRadius', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="0.5rem"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Spacing
              </label>
              <input
                type="text"
                value={config.spacing}
                onChange={(e) => onChange('spacing', e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                placeholder="1rem"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-4">Colors</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={config.backgroundColor}
                onChange={(e) => onChange('backgroundColor', e.target.value)}
                className="h-8 w-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={config.backgroundColor}
                onChange={(e) => onChange('backgroundColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm text-gray-700 mb-2">
              Text Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={config.textColor}
                onChange={(e) => onChange('textColor', e.target.value)}
                className="h-8 w-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={config.textColor}
                onChange={(e) => onChange('textColor', e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
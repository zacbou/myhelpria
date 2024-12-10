import React from 'react';
import { Settings, Palette } from 'lucide-react';
import type { ThemeConfig } from '../types';

interface ComponentEditorProps {
  component: {
    id: string;
    type: string;
    title: string;
    config: Record<string, any>;
  };
  themeConfig: ThemeConfig;
  onConfigChange: (config: Record<string, any>) => void;
  editMode: 'layout' | 'style';
}

export function ComponentEditor({
  component,
  themeConfig,
  onConfigChange,
  editMode
}: ComponentEditorProps) {
  const handleStyleChange = (key: string, value: string) => {
    onConfigChange({ ...component.config, [key]: value });
  };

  return (
    <div className="bg-gray-50 rounded-xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 flex items-center">
          {editMode === 'layout' ? (
            <Settings className="h-5 w-5 mr-2 text-gray-400" />
          ) : (
            <Palette className="h-5 w-5 mr-2 text-gray-400" />
          )}
          {component.title} Settings
        </h3>
      </div>

      {editMode === 'style' ? (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Background Color</label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="color"
                value={component.config.backgroundColor || themeConfig.backgroundColor}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="h-8 w-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={component.config.backgroundColor || themeConfig.backgroundColor}
                onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Text Color</label>
            <div className="mt-1 flex items-center space-x-2">
              <input
                type="color"
                value={component.config.textColor || themeConfig.textColor}
                onChange={(e) => handleStyleChange('textColor', e.target.value)}
                className="h-8 w-8 rounded border border-gray-300"
              />
              <input
                type="text"
                value={component.config.textColor || themeConfig.textColor}
                onChange={(e) => handleStyleChange('textColor', e.target.value)}
                className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Border Radius</label>
            <input
              type="text"
              value={component.config.borderRadius || themeConfig.borderRadius}
              onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="0.5rem"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Padding</label>
            <input
              type="text"
              value={component.config.padding || themeConfig.spacing}
              onChange={(e) => handleStyleChange('padding', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="1rem"
            />
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Layout-specific settings */}
          <div>
            <label className="block text-sm font-medium text-gray-700">Width</label>
            <select
              value={component.config.width || 'full'}
              onChange={(e) => handleStyleChange('width', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="full">Full Width</option>
              <option value="contained">Contained</option>
              <option value="narrow">Narrow</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Alignment</label>
            <select
              value={component.config.alignment || 'left'}
              onChange={(e) => handleStyleChange('alignment', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="left">Left</option>
              <option value="center">Center</option>
              <option value="right">Right</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Spacing</label>
            <select
              value={component.config.spacing || 'normal'}
              onChange={(e) => handleStyleChange('spacing', e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            >
              <option value="compact">Compact</option>
              <option value="normal">Normal</option>
              <option value="relaxed">Relaxed</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Layout, Save, Move, Palette, Settings } from 'lucide-react';
import { SortableItem } from './SortableItem';
import { ComponentEditor } from './ComponentEditor';
import type { ThemeConfig } from '../types';

interface LayoutComponent {
  id: string;
  type: string;
  title: string;
  visible: boolean;
  config: Record<string, any>;
}

interface LayoutCustomizerProps {
  themeConfig: ThemeConfig;
  onSave: (config: ThemeConfig) => void;
}

export default function LayoutCustomizer({ themeConfig, onSave }: LayoutCustomizerProps) {
  const [components, setComponents] = useState<LayoutComponent[]>([
    { id: 'header', type: 'header', title: 'Header', visible: true, config: {} },
    { id: 'navigation', type: 'nav', title: 'Navigation', visible: true, config: {} },
    { id: 'search', type: 'search', title: 'Search Bar', visible: true, config: {} },
    { id: 'content', type: 'content', title: 'Main Content', visible: true, config: {} },
    { id: 'sidebar', type: 'sidebar', title: 'Sidebar', visible: true, config: {} },
    { id: 'footer', type: 'footer', title: 'Footer', visible: true, config: {} },
  ]);

  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [editMode, setEditMode] = useState<'layout' | 'style'>('layout');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const toggleComponentVisibility = (id: string) => {
    setComponents(items =>
      items.map(item =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const updateComponentConfig = (id: string, config: Record<string, any>) => {
    setComponents(items =>
      items.map(item =>
        item.id === id ? { ...item, config: { ...item.config, ...config } } : item
      )
    );
  };

  const handleSave = () => {
    const updatedConfig = {
      ...themeConfig,
      layout: {
        components: components.reduce((acc, component) => ({
          ...acc,
          [component.id]: {
            visible: component.visible,
            config: component.config,
            order: components.findIndex(c => c.id === component.id)
          }
        }), {})
      }
    };
    onSave(updatedConfig);
  };

  return (
    <div className="bg-white shadow-sm rounded-xl overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900 flex items-center">
            <Layout className="h-6 w-6 text-blue-500 mr-2" />
            Layout Customization
          </h2>
          <div className="flex items-center space-x-4">
            <div className="flex rounded-lg overflow-hidden border border-gray-200">
              <button
                onClick={() => setEditMode('layout')}
                className={`px-4 py-2 text-sm font-medium ${
                  editMode === 'layout'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Move className="h-4 w-4 inline-block mr-1" />
                Layout
              </button>
              <button
                onClick={() => setEditMode('style')}
                className={`px-4 py-2 text-sm font-medium ${
                  editMode === 'style'
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Palette className="h-4 w-4 inline-block mr-1" />
                Style
              </button>
            </div>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Layout Components */}
          <div className="col-span-1">
            <div className="bg-gray-50 rounded-xl p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-4">Components</h3>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                modifiers={[restrictToVerticalAxis]}
              >
                <SortableContext
                  items={components}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {components.map((component) => (
                      <SortableItem
                        key={component.id}
                        id={component.id}
                        title={component.title}
                        visible={component.visible}
                        onToggle={() => toggleComponentVisibility(component.id)}
                        onClick={() => setSelectedComponent(component.id)}
                        isSelected={selectedComponent === component.id}
                      />
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>
          </div>

          {/* Component Editor */}
          <div className="col-span-2">
            {selectedComponent && (
              <ComponentEditor
                component={components.find(c => c.id === selectedComponent)!}
                themeConfig={themeConfig}
                onConfigChange={(config) => updateComponentConfig(selectedComponent, config)}
                editMode={editMode}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
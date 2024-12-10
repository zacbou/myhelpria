import React, { useState } from 'react';
import { Palette, Check, ShoppingCart, Code, Layout, Save, Edit2 } from 'lucide-react';
import { DndContext, closestCenter, DragEndEvent } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { SortableSection } from './SortableSection';
import EcommerceTheme from './themes/EcommerceTheme';
import TechSupportTheme from './themes/TechSupportTheme';

interface ThemeSectionContent {
  id: string;
  title: string;
  content: string;
  visible: boolean;
  order: number;
}

interface ThemeSelectorProps {
  currentTheme: string;
  onThemeChange: (themeId: string) => void;
}

export default function ThemeSelector({ currentTheme, onThemeChange }: ThemeSelectorProps) {
  const [activeTab, setActiveTab] = useState<'layout' | 'style'>('layout');
  const [editingSection, setEditingSection] = useState<string | null>(null);
  
  const [sections, setSections] = useState<ThemeSectionContent[]>([
    { id: 'header', title: 'Header', content: 'Welcome to our help center', visible: true, order: 0 },
    { id: 'search', title: 'Search Bar', content: 'Search for help articles...', visible: true, order: 1 },
    { id: 'categories', title: 'Categories', content: 'Browse help topics', visible: true, order: 2 },
    { id: 'featured', title: 'Featured Content', content: 'Popular articles and guides', visible: true, order: 3 },
    { id: 'content', title: 'Main Content', content: 'Help center articles and resources', visible: true, order: 4 },
    { id: 'contact', title: 'Contact Section', content: 'Get in touch with our support team', visible: true, order: 5 },
    { id: 'footer', title: 'Footer', content: 'Additional resources and links', visible: true, order: 6 }
  ]);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setSections(prev => {
        const activeIndex = prev.findIndex(s => s.id === active.id);
        const overIndex = prev.findIndex(s => s.id === over.id);
        
        const newSections = [...prev];
        const [movedSection] = newSections.splice(activeIndex, 1);
        newSections.splice(overIndex, 0, movedSection);
        
        return newSections.map((section, index) => ({
          ...section,
          order: index
        }));
      });
    }
  };

  const toggleSectionVisibility = (sectionId: string) => {
    setSections(prev => 
      prev.map(section => 
        section.id === sectionId 
          ? { ...section, visible: !section.visible }
          : section
      )
    );
  };

  const updateSectionContent = (sectionId: string, content: string) => {
    setSections(prev =>
      prev.map(section =>
        section.id === sectionId
          ? { ...section, content }
          : section
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Theme Selection */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        {/* ... existing theme selection code ... */}
      </div>

      {/* Theme Preview with Customization */}
      <div className="bg-white shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Theme Preview</h3>
            <div className="flex items-center space-x-4">
              <div className="flex rounded-lg overflow-hidden border border-gray-200">
                <button
                  onClick={() => setActiveTab('layout')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'layout'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Layout className="h-4 w-4 inline-block mr-1" />
                  Layout
                </button>
                <button
                  onClick={() => setActiveTab('style')}
                  className={`px-4 py-2 text-sm font-medium ${
                    activeTab === 'style'
                      ? 'bg-blue-50 text-blue-600'
                      : 'bg-white text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <Palette className="h-4 w-4 inline-block mr-1" />
                  Style
                </button>
              </div>
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Customization Panel */}
            <div className="bg-gray-50 rounded-xl p-4">
              <DndContext
                modifiers={[restrictToVerticalAxis]}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={sections}
                  strategy={verticalListSortingStrategy}
                >
                  <div className="space-y-2">
                    {sections
                      .sort((a, b) => a.order - b.order)
                      .map((section) => (
                        <div key={section.id}>
                          <SortableSection
                            id={section.id}
                            title={section.title}
                            visible={section.visible}
                            onToggle={() => toggleSectionVisibility(section.id)}
                            onEdit={() => setEditingSection(section.id)}
                            isEditing={editingSection === section.id}
                          />
                          {editingSection === section.id && (
                            <div className="mt-2 p-3 bg-white rounded-lg border border-gray-200">
                              <textarea
                                value={section.content}
                                onChange={(e) => updateSectionContent(section.id, e.target.value)}
                                className="w-full min-h-[100px] p-2 text-sm border border-gray-300 rounded-md focus:border-blue-500 focus:ring-blue-500"
                                placeholder="Enter section content..."
                              />
                              <div className="mt-2 flex justify-end">
                                <button
                                  onClick={() => setEditingSection(null)}
                                  className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded-md"
                                >
                                  Done
                                </button>
                              </div>
                            </div>
                          )}
                        </div>
                    ))}
                  </div>
                </SortableContext>
              </DndContext>
            </div>

            {/* Live Preview */}
            <div className="lg:col-span-2 border rounded-lg overflow-hidden">
              {currentTheme === 'ecommerce' ? (
                <EcommerceTheme sections={sections} />
              ) : (
                <TechSupportTheme sections={sections} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
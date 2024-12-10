import React, { useState } from 'react';
import {
  DndContext,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay
} from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import DraggableThemeSection from './DraggableThemeSection';
import { LivePreview } from './theme/LivePreview';
import { ThemeSidebar } from './ThemeSidebar';
import * as Icons from 'lucide-react';
import { ThemeHeader } from './theme/ThemeHeader';
import { ThemeSearch } from './theme/ThemeSearch';
import { techStackStyle } from './theme/TechStackTheme';

interface Section {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Icons;
}

interface ThemePreviewProps {
  sections: Section[];
  onSectionsChange: (sections: Section[]) => void;
  theme?: string;
}

const defaultStyle = {
  header: {
    backgroundColor: 'from-blue-600 to-blue-700',
    textColor: 'text-white'
  },
  search: {
    placeholder: 'Search for help articles...'
  },
  section: {
    backgroundColor: 'bg-white',
    hoverBackgroundColor: 'hover:bg-gray-50',
    iconBackgroundColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
    textColor: 'text-gray-900',
    descriptionColor: 'text-gray-600'
  }
};

export default function ThemePreview({ sections, onSectionsChange, theme = 'ecommerce' }: ThemePreviewProps) {
  const style = theme === 'tech-stack' ? techStackStyle : defaultStyle;
  const [headerText, setHeaderText] = useState(
    theme === 'tech-stack' ? 'Developer Documentation' : 'How can we help you?'
  );
  const [isEditingHeader, setIsEditingHeader] = useState(false);
  const [editedHeaderText, setEditedHeaderText] = useState(headerText);
  const [searchPlaceholder, setSearchPlaceholder] = useState(style.search.placeholder);
  const [editingSection, setEditingSection] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 8,
        tolerance: 5,
        delay: 0
      },
    }),
    useSensor(TouchSensor)
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = sections.findIndex(section => section.id === active.id);
      const newIndex = sections.findIndex(section => section.id === over.id);
      
      const newSections = [...sections];
      const [movedSection] = newSections.splice(oldIndex, 1);
      newSections.splice(newIndex, 0, movedSection);
      
      onSectionsChange(newSections);
    }
    
    setActiveId(null);
  };

  const handleSectionEdit = (sectionId: string) => {
    setEditingSection(sectionId);
  };

  const handleSectionSave = (id: string, title: string, description: string) => {
    onSectionsChange(
      sections.map(section => 
        section.id === id && title !== section.title || description !== section.description
          ? { ...section, title, description }
          : section
      )
    );
    setEditingSection(null);
  };

  const handleRemoveSection = (id: string) => {
    onSectionsChange(sections.filter(section => section.id !== id));
  };

  const handleAddSection = (section: Section) => {
    onSectionsChange([...sections, section]);
  };

  const activeSection = activeId ? sections.find(section => section.id === activeId) : null;

  return (
    <div className="flex gap-8">
      <ThemeSidebar 
        onAddSection={handleAddSection}
        availableSections={sections}
        theme={theme}
      />

      <div className="flex-1 space-y-8">
        <LivePreview
          theme={theme}
          sections={sections}
          onEditHeader={() => setIsEditingHeader(true)}
        />
        
        <ThemeHeader
          text={headerText}
          isEditing={isEditingHeader}
          editedText={editedHeaderText}
          onEdit={() => setIsEditingHeader(true)}
          onSave={() => {
            setHeaderText(editedHeaderText);
            setIsEditingHeader(false);
          }}
          onCancel={() => setIsEditingHeader(false)}
          onTextChange={setEditedHeaderText}
          style={style.header}
        />

        <ThemeSearch placeholder={searchPlaceholder} />

        <div className="relative min-h-[500px] bg-gray-50/50 rounded-xl p-6 border border-gray-100">
          <DndContext
            sensors={sensors}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis]}
          >
            <SortableContext items={sections} strategy={rectSortingStrategy}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 min-h-[200px]">
                {sections.map((section) => {
                  const IconComponent = Icons[section.icon];
                  return (
                    <DraggableThemeSection
                      key={section.id}
                      id={section.id}
                      title={section.title}
                      description={section.description}
                      icon={<IconComponent className={`h-6 w-6 ${style.section.iconColor}`} />}
                      onRemove={() => handleRemoveSection(section.id)}
                      onSave={(title, description) => handleSectionSave(section.id, title, description)}
                      customStyle={style.section}
                      isEditing={editingSection === section.id}
                      onEdit={() => setEditingSection(section.id)}
                    />
                  );
                })}
              </div>
            </SortableContext>

            <DragOverlay>
              {activeSection && (
                <div className={`${style.section.backgroundColor} rounded-lg shadow-lg p-6 opacity-90`}>
                  <div className="flex items-center">
                    <div className={`p-2 ${style.section.iconBackgroundColor} rounded-lg mr-3`}>
                      {Icons[activeSection.icon] && 
                        React.createElement(Icons[activeSection.icon], {
                          className: `h-6 w-6 ${style.section.iconColor}`
                        })
                      }
                    </div>
                    <h3 className={`text-lg font-medium ${style.section.textColor}`}>
                      {activeSection.title}
                    </h3>
                  </div>
                  <p className={`${style.section.descriptionColor} text-sm mt-2`}>
                    {activeSection.description}
                  </p>
                </div>
              )}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </div>
  );
}
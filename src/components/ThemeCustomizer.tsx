import React, { useState } from 'react';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { ThemePreview } from './ThemePreview';
import { DraggableSection } from './DraggableSection';
import { Layout, Save, Palette } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  content: string;
  visible: boolean;
  order: number;
  styles: {
    backgroundColor?: string;
    color?: string;
    padding?: string;
    borderRadius?: string;
  };
}

export default function ThemeCustomizer() {
  const [sections, setSections] = useState<Section[]>([
    {
      id: 'header',
      title: 'Header',
      content: 'Welcome to our help center',
      visible: true,
      order: 0,
      styles: {
        backgroundColor: '#4F46E5',
        color: '#FFFFFF',
        padding: '2rem'
      }
    },
    // Add more sections...
  ]);

  const [activeId, setActiveId] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<string | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setSections((items) => {
        const oldIndex = items.findIndex((i) => i.id === active.id);
        const newIndex = items.findIndex((i) => i.id === over.id);

        const newOrder = [...items];
        const [movedItem] = newOrder.splice(oldIndex, 1);
        newOrder.splice(newIndex, 0, movedItem);

        return newOrder.map((item, index) => ({
          ...item,
          order: index
        }));
      });
    }

    setActiveId(null);
  };

  const handleVisibilityToggle = (id: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, visible: !section.visible } : section
      )
    );
  };

  const handleContentEdit = (id: string, content: string) => {
    setSections((prev) =>
      prev.map((section) =>
        section.id === id ? { ...section, content } : section
      )
    );
  };

  return (
    <div className="grid grid-cols-2 gap-8">
      <div className="space-y-4">
        <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {sections
            .sort((a, b) => a.order - b.order)
            .map((section) => (
              <DraggableSection
                key={section.id}
                id={section.id}
                title={section.title}
                visible={section.visible}
                onToggle={() => handleVisibilityToggle(section.id)}
                onEdit={() => setEditingSection(section.id)}
                isEditing={editingSection === section.id}
              />
            ))}
        </DndContext>
      </div>

      <div className="sticky top-0">
        <ThemePreview sections={sections} theme="ecommerce" />
      </div>
    </div>
  );
}
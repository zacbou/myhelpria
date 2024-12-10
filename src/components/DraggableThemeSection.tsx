import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Edit2, Move, Check, X, Trash2 } from 'lucide-react';
import type { CSSProperties } from 'react';

interface CustomStyle {
  backgroundColor?: string;
  textColor?: string;
  iconBackgroundColor?: string;
  iconColor?: string;
  descriptionColor?: string;
}

interface DraggableThemeSectionProps {
  id: string;
  title: string;
  customStyle?: CustomStyle;
  onRemove: () => void;
  onSave: (title: string, description: string) => void;
  isEditing: boolean;
  onEdit: () => void;
}

export default function DraggableThemeSection({
  id,
  title,
  description,
  icon,
  customStyle = {},
  onRemove,
  onSave,
  isEditing: isEditingProp,
  onEdit,
}: DraggableThemeSectionProps) {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging
  } = useSortable({ id });

  const elementStyle: CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 'auto',
  };

  const handleSave = () => {
    onSave(editedTitle, editedDescription);
  };

  const handleCancel = () => {
    setEditedTitle(title);
    setEditedDescription(description);
    onSave(title, description); // Keep original values
  };

  return (
    <div
      ref={setNodeRef}
      style={{ 
        ...elementStyle, 
        touchAction: 'none',
        backgroundColor: customStyle.backgroundColor,
        color: customStyle.textColor 
      }}
      className={`bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-all group cursor-move ${
        isDragging ? 'opacity-75 shadow-lg scale-105' : ''
      }`}
      {...attributes}
      {...listeners}
    >
      <div>
        {isEditingProp ? (
          <div className="space-y-4">
            <div>
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => {
                  e.stopPropagation();
                  setEditedTitle(e.target.value);
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
                placeholder="Section Title"
              />
            </div>
            <div>
              <textarea
                value={editedDescription}
                onChange={(e) => {
                  e.stopPropagation();
                  setEditedDescription(e.target.value);
                }}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white resize-none shadow-sm"
                placeholder="Section Description"
                rows={2}
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={handleCancel}
                className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
              <button
                onClick={handleSave}
                className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded-md transition-all"
                type="button"
              >
                <Check className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`p-1.5 ${customStyle.iconBackgroundColor || 'bg-blue-50'} rounded-md mr-2 transition-colors`}>
                  {icon}
                </div>
                <h3 className={`text-base font-medium ${customStyle.textColor || 'text-gray-900'}`}>{title}</h3>
              </div>
              <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={onEdit}
                  className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={onRemove}
                  className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <p className={`${customStyle.descriptionColor || 'text-gray-600'} text-xs`}>{description}</p>
          </div>
        )}
      </div>
    </div>
  );
}
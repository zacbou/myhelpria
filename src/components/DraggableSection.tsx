import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import { Move, Eye, EyeOff, Edit2 } from 'lucide-react';

interface DraggableSectionProps {
  id: string;
  title: string;
  visible: boolean;
  onToggle: () => void;
  onEdit: () => void;
  isEditing: boolean;
}

export function DraggableSection({
  id,
  title,
  visible,
  onToggle,
  onEdit,
  isEditing
}: DraggableSectionProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id
  });

  const style = transform ? {
    transform: CSS.Translate.toString(transform)
  } : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-4 bg-white rounded-lg border ${
        isEditing ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      } cursor-move hover:shadow-sm transition-shadow`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center">
        <Move className="h-5 w-5 text-gray-400 mr-3" />
        <span className="font-medium text-gray-700">{title}</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={onEdit}
          className={`p-2 rounded-md ${
            isEditing ? 'text-blue-500 bg-blue-50' : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          <Edit2 className="h-4 w-4" />
        </button>
        <button
          onClick={onToggle}
          className={`p-2 rounded-md ${
            visible ? 'text-green-500 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-100'
          }`}
        >
          {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Move, Eye, EyeOff, Edit2 } from 'lucide-react';

interface SortableSectionProps {
  id: string;
  title: string;
  visible: boolean;
  onToggle: () => void;
  onEdit: () => void;
  isEditing: boolean;
}

export function SortableSection({
  id,
  title,
  visible,
  onToggle,
  onEdit,
  isEditing
}: SortableSectionProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`flex items-center justify-between p-3 bg-white rounded-lg border ${
        isEditing ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      } hover:shadow-sm transition-shadow`}
    >
      <div className="flex items-center">
        <button
          className="p-2 hover:bg-gray-100 rounded-md cursor-move"
          {...attributes}
          {...listeners}
        >
          <Move className="h-4 w-4 text-gray-400" />
        </button>
        <span className="ml-3 text-sm font-medium text-gray-700">{title}</span>
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
          {visible ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
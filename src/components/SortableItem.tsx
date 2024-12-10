import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Move, Eye, EyeOff } from 'lucide-react';

interface SortableItemProps {
  id: string;
  title: string;
  visible: boolean;
  onToggle: () => void;
  onClick: () => void;
  isSelected: boolean;
}

export function SortableItem({
  id,
  title,
  visible,
  onToggle,
  onClick,
  isSelected
}: SortableItemProps) {
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
        isSelected ? 'border-blue-500 ring-2 ring-blue-200' : 'border-gray-200'
      } cursor-pointer hover:bg-gray-50`}
      onClick={onClick}
    >
      <div className="flex items-center">
        <button
          className="p-1 hover:bg-gray-100 rounded-md mr-2 cursor-move"
          {...attributes}
          {...listeners}
        >
          <Move className="h-4 w-4 text-gray-400" />
        </button>
        <span className="text-sm font-medium text-gray-700">{title}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggle();
        }}
        className={`p-1 rounded-md ${
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
  );
}
import React from 'react';
import { Edit2 } from 'lucide-react';

interface PreviewHeaderProps {
  title: string;
  onEdit: () => void;
  style: {
    bgColor: string;
    textColor: string;
  };
}

export function PreviewHeader({ title, onEdit, style }: PreviewHeaderProps) {
  return (
    <div className={`${style.bgColor} p-4 rounded-t-lg relative group`}>
      <h3 className={`text-sm font-medium ${style.textColor} text-center`}>
        {title}
      </h3>
      <button
        onClick={onEdit}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded-md bg-white/0 hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all"
      >
        <Edit2 className="h-3 w-3 text-white" />
      </button>
    </div>
  );
}
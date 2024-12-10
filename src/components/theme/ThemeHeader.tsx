import React from 'react';
import { Edit2, Check, X } from 'lucide-react';

interface ThemeHeaderProps {
  text: string;
  isEditing: boolean;
  editedText: string;
  onEdit: () => void;
  onSave: () => void;
  onCancel: () => void;
  onTextChange: (text: string) => void;
  style?: {
    backgroundColor?: string;
    textColor?: string;
  };
}

export function ThemeHeader({
  text,
  isEditing,
  editedText,
  onEdit,
  onSave,
  onCancel,
  onTextChange,
  style = {
    backgroundColor: 'from-blue-600 to-blue-700',
    textColor: 'text-white'
  }
}: ThemeHeaderProps) {
  return (
    <div 
      className={`bg-gradient-to-r ${style.backgroundColor} p-16 rounded-xl mb-8 text-center relative group transition-colors duration-200`}
    >
      {isEditing ? (
        <div className="space-y-4">
          <input
            type="text"
            value={editedText}
            onChange={(e) => onTextChange(e.target.value)}
            className="w-full max-w-xl mx-auto px-4 py-2 text-3xl font-bold text-gray-900 bg-white rounded-lg border-0 focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          <div className="flex justify-center space-x-2">
            <button
              onClick={onCancel}
              className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <button
              onClick={onSave}
              className="p-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            >
              <Check className="h-5 w-5" />
            </button>
          </div>
        </div>
      ) : (
        <>
          <h1 className={`text-4xl font-bold ${style.textColor} mb-8`}>{text}</h1>
          <button
            onClick={onEdit}
            className="absolute top-4 right-4 p-2 text-white/0 group-hover:text-white/50 hover:text-white rounded-lg transition-colors"
          >
            <Edit2 className="h-5 w-5" />
          </button>
        </>
      )}
    </div>
  );
}
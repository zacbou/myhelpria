import React, { useState } from 'react';
import { X, Save } from 'lucide-react';

interface PagePreviewProps {
  title: string;
  content: string;
  onClose: () => void;
  onSave: (title: string, content: string) => void;
}

export default function PagePreview({ title, content, onClose, onSave }: PagePreviewProps) {
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedContent, setEditedContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSave(editedTitle, editedContent);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl mx-4 h-[90vh] flex flex-col">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="text-lg font-medium text-gray-900 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full max-w-xl"
            />
          ) : (
            <h3 className="text-lg font-medium text-gray-900">{editedTitle}</h3>
          )}
          <div className="flex items-center space-x-2">
            {isEditing ? (
              <button
                onClick={handleSave}
                className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                Edit
              </button>
            )}
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-1 rounded-md hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          {isEditing ? (
            <textarea
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="w-full h-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            />
          ) : (
            <div className="prose max-w-none">
              {editedContent.split('\n').map((line, index) => (
                <p key={index} className="mb-4">{line}</p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
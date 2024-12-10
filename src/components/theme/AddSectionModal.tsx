import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { X } from 'lucide-react';

interface AddSectionModalProps {
  onClose: () => void;
  onAdd: (section: {
    id: string;
    title: string;
    description: string;
    icon: string;
  }) => void;
}

export function AddSectionModal({ onClose, onAdd }: AddSectionModalProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<string>('Layout');

  const iconList = Object.keys(Icons).filter(
    key => typeof Icons[key as keyof typeof Icons] === 'function' && key !== 'createLucideIcon'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd({
      id: `custom-${Date.now()}`,
      title,
      description,
      icon: selectedIcon
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-medium text-gray-900">Add Custom Section</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Icon
            </label>
            <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto p-2 border border-gray-200 rounded-md">
              {iconList.map((iconName) => {
                const IconComponent = Icons[iconName as keyof typeof Icons];
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setSelectedIcon(iconName)}
                    className={`p-2 rounded-lg flex items-center justify-center ${
                      selectedIcon === iconName
                        ? 'bg-blue-50 text-blue-600 ring-2 ring-blue-500'
                        : 'hover:bg-gray-50 text-gray-600'
                    }`}
                  >
                    {React.createElement(IconComponent, { className: "h-5 w-5" })}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
            >
              {React.createElement(Icons[selectedIcon], { className: "h-4 w-4 mr-2" })}
              Add Section
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
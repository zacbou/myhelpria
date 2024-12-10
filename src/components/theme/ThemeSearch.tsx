import React from 'react';

interface ThemeSearchProps {
  placeholder: string;
}

export function ThemeSearch({ placeholder }: ThemeSearchProps) {
  return (
    <div className="max-w-2xl mx-auto mb-8">
      <input
        type="text"
        placeholder={placeholder}
        className="w-full px-6 py-4 rounded-lg text-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
      />
    </div>
  );
}
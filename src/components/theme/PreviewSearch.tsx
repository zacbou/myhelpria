import React from 'react';
import { Search } from 'lucide-react';

interface PreviewSearchProps {
  placeholder: string;
  style: {
    bgColor: string;
    textColor: string;
  };
}

export function PreviewSearch({ placeholder, style }: PreviewSearchProps) {
  return (
    <div className="px-4 py-2">
      <div className={`${style.bgColor} rounded-md p-2 relative`}>
        <Search className="h-3 w-3 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400" />
        <div className="h-2 w-3/4 bg-gray-200 rounded ml-6" />
      </div>
    </div>
  );
}
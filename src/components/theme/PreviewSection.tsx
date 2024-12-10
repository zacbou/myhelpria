import React from 'react';
import * as Icons from 'lucide-react';

interface PreviewSectionProps {
  icon: keyof typeof Icons;
  title: string;
  style: {
    bgColor: string;
    iconColor: string;
    textColor: string;
  };
}

export function PreviewSection({ icon, title, style }: PreviewSectionProps) {
  const IconComponent = Icons[icon];
  
  return (
    <div className={`${style.bgColor} p-3 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors`}>
      <div className="flex items-center space-x-2">
        <div className="p-1.5 rounded-md bg-blue-50">
          <IconComponent className={`h-4 w-4 ${style.iconColor}`} />
        </div>
        <div className="space-y-1">
          <div className="h-2.5 w-20 bg-gray-200 rounded" />
          <div className="h-2 w-28 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  );
}
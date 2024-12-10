import React, { useState } from 'react';
import * as Icons from 'lucide-react';
import { Plus } from 'lucide-react';
import { AddSectionModal } from './theme/AddSectionModal';

interface Section {
  id: string;
  title: string;
  description: string;
  icon: string;
}

interface ThemeSidebarProps {
  onAddSection: (section: Section) => void;
  availableSections: Section[];
}

const availableSectionTemplates = [
  {
    id: 'orders-template',
    title: 'Orders & Shipping',
    description: 'Track orders, shipping information, and delivery status',
    icon: 'ShoppingCart'
  },
  {
    id: 'returns-template',
    title: 'Returns & Refunds',
    description: 'Return policies, refund process, and exchange information',
    icon: 'RefreshCw'
  },
  {
    id: 'payment-template',
    title: 'Payment Methods',
    description: 'Accepted payment methods, billing issues, and payment security',
    icon: 'CreditCard'
  },
  {
    id: 'products-template',
    title: 'Product Information',
    description: 'Product details, specifications, and availability',
    icon: 'Package'
  },
  {
    id: 'account-template',
    title: 'Account Management',
    description: 'Account settings, profile updates, and preferences',
    icon: 'User'
  },
  {
    id: 'size-guides-template',
    title: 'Size Guides',
    description: 'Size charts, measurement guides, and fitting advice',
    icon: 'Ruler'
  }
];

export function ThemeSidebar({ onAddSection, availableSections }: ThemeSidebarProps) {
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddSection = (template: typeof availableSectionTemplates[0]) => {
    const newId = `${template.id}-${Date.now()}`;
    onAddSection({
      ...template,
      id: newId
    });
  };

  return (
    <>
      <div className="w-64 bg-white rounded-xl shadow-sm p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-medium text-gray-900">Available Sections</h3>
          <button
            onClick={() => setShowAddModal(true)}
            className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
          >
            <Plus className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-2">
          {availableSectionTemplates.map((template) => {
            const IconComponent = Icons[template.icon as keyof typeof Icons];
            return (
              <button
                key={template.id}
                onClick={() => handleAddSection(template)}
                className="w-full flex items-center p-3 text-left text-sm hover:bg-gray-50 rounded-lg group transition-colors"
              >
                <div className="flex-1 flex items-center">
                  <div className="p-2 bg-blue-50 rounded-lg mr-3">
                    {React.createElement(IconComponent, { className: "h-4 w-4 text-blue-600" })}
                  </div>
                  <span className="text-gray-900">{template.title}</span>
                </div>
                <Plus className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>
            );
          })}
        </div>
      </div>

      {showAddModal && (
        <AddSectionModal
          onClose={() => setShowAddModal(false)}
          onAdd={onAddSection}
        />
      )}
    </>
  );
}
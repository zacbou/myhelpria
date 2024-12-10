import { useState } from 'react';
import ThemePreview from '../components/ThemePreview';
import { Layout, Palette } from 'lucide-react';
import { techStackSections } from '../components/theme/TechStackTheme';
import { ThemePreviewGrid } from '../components/theme/ThemePreviewGrid';

interface ThemePageProps {
  currentTheme: string;
  onThemeChange: (theme: string) => void;
}

const ecommerceThemeSections = [
  {
    id: 'orders',
    title: 'Orders & Shipping',
    description: 'Track orders, shipping information, and delivery status',
    icon: 'ShoppingCart'
  },
  {
    id: 'returns',
    title: 'Returns & Refunds',
    description: 'Return policies, refund process, and exchange information',
    icon: 'RefreshCw'
  },
  {
    id: 'payment',
    title: 'Payment Methods',
    description: 'Accepted payment methods, billing issues, and payment security',
    icon: 'CreditCard'
  },
  {
    id: 'products',
    title: 'Product Information',
    description: 'Product details, specifications, and availability',
    icon: 'Package'
  },
  {
    id: 'account',
    title: 'Account Management',
    description: 'Account settings, profile updates, and preferences',
    icon: 'User'
  },
  {
    id: 'size-guides',
    title: 'Size Guides',
    description: 'Size charts, measurement guides, and fitting advice',
    icon: 'Ruler'
  }
];

export default function ThemePage({ currentTheme, onThemeChange }: ThemePageProps) {
  const [sections, setSections] = useState(
    currentTheme === 'tech-stack' ? techStackSections : ecommerceThemeSections
  );
  const [activeTab, setActiveTab] = useState<'layout' | 'style'>('layout');

  const handleThemeChange = (theme: string) => {
    onThemeChange(theme);
    setSections(theme === 'tech-stack' ? techStackSections : ecommerceThemeSections);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Theme Settings</h1>
        <div className="flex rounded-lg overflow-hidden border border-gray-200">
          <button
            onClick={() => setActiveTab('layout')}
            className={`px-4 py-2 text-sm font-medium flex items-center ${
              activeTab === 'layout'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Layout className="h-4 w-4 mr-2" />
            Layout
          </button>
          <button
            onClick={() => setActiveTab('style')}
            className={`px-4 py-2 text-sm font-medium flex items-center ${
              activeTab === 'style'
                ? 'bg-blue-50 text-blue-600'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Palette className="h-4 w-4 mr-2" />
            Style
          </button>
        </div>
      </div>

      <ThemePreviewGrid 
        currentTheme={currentTheme} 
        onThemeChange={handleThemeChange} 
      />

      <ThemePreview
        sections={sections}
        onSectionsChange={setSections}
        theme={currentTheme}
      />
    </div>
  );
}
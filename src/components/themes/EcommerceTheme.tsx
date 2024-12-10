import React from 'react';
import { ShoppingCart, RefreshCw, CreditCard, Package, User, Ruler, Truck, MessageSquare, Phone } from 'lucide-react';

interface ThemeProps {
  sections: Array<{
    id: string;
    title: string;
    content: string;
    visible: boolean;
  }>;
}

export default function EcommerceTheme({ sections }: ThemeProps) {
  const getSectionContent = (id: string) => {
    const section = sections.find(s => s.id === id);
    return section?.visible ? section : null;
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Hero Section */}
      {getSectionContent('header') && (
        <div className="bg-gradient-to-r from-[#4f46e5] to-[#4338ca] py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl font-bold text-white mb-8">How can we help you?</h1>
              <div className="max-w-xl mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border-0 focus:ring-2 focus:ring-[#818cf8]"
                    placeholder="Search for order help, shipping info, returns..."
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Categories */}
      {getSectionContent('categories') && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { icon: ShoppingCart, title: 'Orders & Shipping', description: 'Track orders, shipping information, and delivery status' },
              { icon: RefreshCw, title: 'Returns & Refunds', description: 'Return policies, refund process, and exchange information' },
              { icon: CreditCard, title: 'Payment Methods', description: 'Accepted payment methods, billing issues, and payment security' },
              { icon: Package, title: 'Product Information', description: 'Product details, specifications, and availability' },
              { icon: User, title: 'Account Management', description: 'Account settings, profile updates, and preferences' },
              { icon: Ruler, title: 'Size Guides', description: 'Size charts, measurement guides, and fitting advice' },
              { icon: Truck, title: 'Delivery Tracking', description: 'Track your package and delivery updates' },
              { icon: MessageSquare, title: 'Customer Reviews', description: 'How to leave reviews and rating guidelines' },
              { icon: Phone, title: 'Contact Support', description: 'Get in touch with our customer service team' }
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 cursor-pointer"
              >
                <div className="flex items-center mb-4">
                  <div className="p-2 bg-[#818cf8]/10 rounded-lg">
                    <category.icon className="h-6 w-6 text-[#4f46e5]" />
                  </div>
                  <h3 className="ml-3 text-lg font-medium text-gray-900">{category.title}</h3>
                </div>
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact Section */}
      {getSectionContent('contact') && (
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need More Help?</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Email: <a href="mailto:support@shop.com" className="text-[#4f46e5] hover:text-[#4338ca]">
                    support@shop.com
                  </a>
                </p>
                <p className="text-gray-600">
                  Phone: <a href="tel:1-800-SHOP-HELP" className="text-[#4f46e5] hover:text-[#4338ca]">
                    1-800-SHOP-HELP
                  </a>
                </p>
                <p className="text-gray-600">
                  Hours: 24/7
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
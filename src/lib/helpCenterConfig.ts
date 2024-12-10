import { HelpCenterTheme } from '../types';
import {
  ShoppingCart,
  RefreshCw,
  CreditCard,
  Package,
  User,
  Ruler,
  Truck,
  MessageSquare,
  Phone,
  Zap,
  FileText,
  AlertTriangle,
  Monitor,
  Download,
  Code,
  Shield,
  HelpCircle,
  BookOpen,
  Terminal
} from 'lucide-react';

export const HELP_CENTER_THEMES: Record<string, HelpCenterTheme> = {
  ecommerce: {
    id: 'ecommerce',
    name: 'E-commerce Help Center',
    searchPlaceholder: 'Search for order help, shipping info, returns...',
    sections: [
      {
        id: 'orders-shipping',
        title: 'Orders & Shipping',
        description: 'Track orders, shipping information, and delivery status',
        icon: ShoppingCart.name,
        articles: []
      },
      {
        id: 'returns-refunds',
        title: 'Returns & Refunds',
        description: 'Return policies, refund process, and exchange information',
        icon: RefreshCw.name,
        articles: []
      },
      {
        id: 'payment',
        title: 'Payment Methods',
        description: 'Accepted payment methods, billing issues, and payment security',
        icon: CreditCard.name,
        articles: []
      },
      {
        id: 'products',
        title: 'Product Information',
        description: 'Product details, specifications, and availability',
        icon: Package.name,
        articles: []
      },
      {
        id: 'account',
        title: 'Account Management',
        description: 'Account settings, profile updates, and preferences',
        icon: User.name,
        articles: []
      },
      {
        id: 'size-guides',
        title: 'Size Guides',
        description: 'Size charts, measurement guides, and fitting advice',
        icon: Ruler.name,
        articles: []
      },
      {
        id: 'delivery',
        title: 'Delivery Tracking',
        description: 'Track your package and delivery updates',
        icon: Truck.name,
        articles: []
      },
      {
        id: 'reviews',
        title: 'Customer Reviews',
        description: 'How to leave reviews and rating guidelines',
        icon: MessageSquare.name,
        articles: []
      },
      {
        id: 'contact',
        title: 'Contact Support',
        description: 'Get in touch with our customer service team',
        icon: Phone.name,
        articles: []
      }
    ],
    contactInfo: {
      email: 'support@shop.com',
      phone: '1-800-SHOP-HELP',
      hours: '24/7'
    }
  },
  
  techSupport: {
    id: 'tech-support',
    name: 'Tech Support Center',
    searchPlaceholder: 'Search documentation, API references, guides...',
    sections: [
      {
        id: 'getting-started',
        title: 'Getting Started',
        description: 'Quick start guides and basic setup instructions',
        icon: Zap.name,
        articles: []
      },
      {
        id: 'technical-specs',
        title: 'Technical Specifications',
        description: 'Detailed technical documentation and specifications',
        icon: FileText.name,
        articles: []
      },
      {
        id: 'troubleshooting',
        title: 'Troubleshooting',
        description: 'Common issues and their solutions',
        icon: AlertTriangle.name,
        articles: []
      },
      {
        id: 'system-requirements',
        title: 'System Requirements',
        description: 'Hardware and software requirements',
        icon: Monitor.name,
        articles: []
      },
      {
        id: 'updates',
        title: 'Software Updates',
        description: 'Latest releases, changelogs, and update guides',
        icon: Download.name,
        articles: []
      },
      {
        id: 'api-docs',
        title: 'API Documentation',
        description: 'API references, endpoints, and integration guides',
        icon: Code.name,
        articles: []
      },
      {
        id: 'security',
        title: 'Security Guidelines',
        description: 'Security best practices and compliance information',
        icon: Shield.name,
        articles: []
      },
      {
        id: 'faqs',
        title: 'FAQs',
        description: 'Frequently asked questions and answers',
        icon: HelpCircle.name,
        articles: []
      },
      {
        id: 'developer',
        title: 'Developer Resources',
        description: 'SDKs, tools, and developer documentation',
        icon: Terminal.name,
        articles: []
      }
    ],
    contactInfo: {
      email: 'developers@techsupport.com',
      hours: 'Mon-Fri 9AM-6PM EST'
    }
  }
};
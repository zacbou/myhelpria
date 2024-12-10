import type { Theme } from '../types';

export const THEMES: Theme[] = [
  {
    id: 'ecommerce',
    name: 'E-commerce Help Center',
    description: 'Customer-focused layout for shopping and order support',
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80',
    colors: {
      primary: '#4f46e5',
      secondary: '#4338ca',
      accent: '#818cf8',
      background: '#f8fafc',
      text: '#1e293b'
    },
    components: {
      header: {
        backgroundColor: '#ffffff',
        textColor: '#1e293b',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        visible: true,
        width: 'full',
        alignment: 'left',
        spacing: 'normal'
      },
      navigation: {
        backgroundColor: '#ffffff',
        textColor: '#1e293b',
        borderRadius: '0.5rem',
        padding: '1rem',
        visible: true,
        width: 'contained',
        alignment: 'left',
        spacing: 'compact'
      },
      search: {
        backgroundColor: '#f8fafc',
        textColor: '#1e293b',
        borderRadius: '0.5rem',
        padding: '1rem',
        visible: true,
        width: 'contained',
        alignment: 'center',
        spacing: 'normal'
      },
      content: {
        backgroundColor: '#ffffff',
        textColor: '#1e293b',
        borderRadius: '0.5rem',
        padding: '2rem',
        visible: true,
        width: 'contained',
        alignment: 'left',
        spacing: 'relaxed'
      },
      sidebar: {
        backgroundColor: '#ffffff',
        textColor: '#64748b',
        borderRadius: '0.5rem',
        padding: '1rem',
        visible: true,
        width: 'narrow',
        alignment: 'left',
        spacing: 'compact'
      },
      footer: {
        backgroundColor: '#f8fafc',
        textColor: '#64748b',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        visible: true,
        width: 'full',
        alignment: 'center',
        spacing: 'normal'
      }
    }
  },
  {
    id: 'tech-support',
    name: 'Tech Support Center',
    description: 'Developer-focused layout for technical documentation',
    preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#f0fdff',
      text: '#164e63'
    },
    components: {
      header: {
        backgroundColor: '#ffffff',
        textColor: '#164e63',
        borderRadius: '1rem',
        padding: '1.5rem',
        visible: true,
        width: 'full',
        alignment: 'left',
        spacing: 'normal'
      },
      navigation: {
        backgroundColor: '#ffffff',
        textColor: '#164e63',
        borderRadius: '1rem',
        padding: '1rem',
        visible: true,
        width: 'contained',
        alignment: 'center',
        spacing: 'normal'
      },
      search: {
        backgroundColor: '#f0fdff',
        textColor: '#164e63',
        borderRadius: '1rem',
        padding: '1.5rem',
        visible: true,
        width: 'contained',
        alignment: 'center',
        spacing: 'relaxed'
      },
      content: {
        backgroundColor: '#ffffff',
        textColor: '#164e63',
        borderRadius: '1rem',
        padding: '2rem',
        visible: true,
        width: 'contained',
        alignment: 'left',
        spacing: 'relaxed'
      },
      sidebar: {
        backgroundColor: '#ffffff',
        textColor: '#0e7490',
        borderRadius: '1rem',
        padding: '1.5rem',
        visible: true,
        width: 'narrow',
        alignment: 'left',
        spacing: 'normal'
      },
      footer: {
        backgroundColor: '#f0fdff',
        textColor: '#0e7490',
        borderRadius: '1rem',
        padding: '2rem',
        visible: true,
        width: 'full',
        alignment: 'center',
        spacing: 'relaxed'
      }
    }
  }
  {
    id: 'ecommerce',
    name: 'E-commerce Help Center',
    description: 'Customer-focused layout for shopping and order support',
    preview: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=300&q=80',
    colors: {
      primary: '#4f46e5',
      secondary: '#4338ca',
      accent: '#818cf8',
      background: '#f8fafc',
      text: '#1e293b'
    },
    components: {
      header: {
        backgroundColor: '#ffffff',
        textColor: '#1e293b',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        visible: true,
        width: 'full',
        alignment: 'left',
        spacing: 'normal'
      },
      navigation: {
        backgroundColor: '#ffffff',
        textColor: '#1e293b',
        borderRadius: '0.5rem',
        padding: '1rem',
        visible: true,
        width: 'contained',
        alignment: 'left',
        spacing: 'compact'
      },
      search: {
        backgroundColor: '#f8fafc',
        textColor: '#1e293b',
        borderRadius: '0.5rem',
        padding: '1rem',
        visible: true,
        width: 'contained',
        alignment: 'center',
        spacing: 'normal'
      },
      content: {
        backgroundColor: '#ffffff',
        textColor: '#1e293b',
        borderRadius: '0.5rem',
        padding: '2rem',
        visible: true,
        width: 'contained',
        alignment: 'left',
        spacing: 'relaxed'
      },
      sidebar: {
        backgroundColor: '#ffffff',
        textColor: '#64748b',
        borderRadius: '0.5rem',
        padding: '1rem',
        visible: true,
        width: 'narrow',
        alignment: 'left',
        spacing: 'compact'
      },
      footer: {
        backgroundColor: '#f8fafc',
        textColor: '#64748b',
        borderRadius: '0.5rem',
        padding: '1.5rem',
        visible: true,
        width: 'full',
        alignment: 'center',
        spacing: 'normal'
      }
    }
  },
  {
    id: 'tech-support',
    name: 'Tech Support Center',
    description: 'Developer-focused layout for technical documentation',
    preview: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=300&q=80',
    colors: {
      primary: '#2563eb',
      secondary: '#1e40af',
      accent: '#3b82f6',
      background: '#f0fdff',
      text: '#164e63'
    },
    components: {
      header: {
        backgroundColor: '#ffffff',
        textColor: '#164e63',
        borderRadius: '1rem',
        padding: '1.5rem',
        visible: true,
        width: 'full',
        alignment: 'left',
        spacing: 'normal'
      },
      navigation: {
        backgroundColor: '#ffffff',
        textColor: '#164e63',
        borderRadius: '1rem',
        padding: '1rem',
        visible: true,
        width: 'contained',
        alignment: 'center',
        spacing: 'normal'
      },
      search: {
        backgroundColor: '#f0fdff',
        textColor: '#164e63',
        borderRadius: '1rem',
        padding: '1.5rem',
        visible: true,
        width: 'contained',
        alignment: 'center',
        spacing: 'relaxed'
      },
      content: {
        backgroundColor: '#ffffff',
        textColor: '#164e63',
        borderRadius: '1rem',
        padding: '2rem',
        visible: true,
        width: 'contained',
        alignment: 'left',
        spacing: 'relaxed'
      },
      sidebar: {
        backgroundColor: '#ffffff',
        textColor: '#0e7490',
        borderRadius: '1rem',
        padding: '1.5rem',
        visible: true,
        width: 'narrow',
        alignment: 'left',
        spacing: 'normal'
      },
      footer: {
        backgroundColor: '#f0fdff',
        textColor: '#0e7490',
        borderRadius: '1rem',
        padding: '2rem',
        visible: true,
        width: 'full',
        alignment: 'center',
        spacing: 'relaxed'
      }
    }
  }
];
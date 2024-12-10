export interface Page {
  id: string;
  title: string;
  content: string;
  type: string;
  status: 'draft' | 'published';
  lastUpdated: string;
  createdAt: string;
}

export interface ThemeConfig {
  theme: string;
  sections: {
    [key: string]: {
      visible: boolean;
      order: number;
    };
  };
  styles: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    typography: {
      fontFamily: string;
      headingSize: string;
      bodySize: string;
      lineHeight: string;
    };
    spacing: {
      container: string;
      padding: string;
      gap: string;
    };
    borderRadius: string;
  };
}
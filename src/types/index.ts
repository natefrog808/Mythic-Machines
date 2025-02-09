export interface Theme {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
  stages: string[];
}

export interface Insight {
  id: number;
  content: string;
  theme: string;
  timestamp: string;
  tags?: string[];
  isFeatured?: boolean;
  collectionId?: number;
}

export interface Collection {
  id: number;
  title: string;
  description?: string;
  insights: Insight[];
  timestamp: string;
}

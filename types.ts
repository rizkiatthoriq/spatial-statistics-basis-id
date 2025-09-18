
import type React from 'react';

export interface Module {
  id: string;
  title: string;
  description: string;
  content: ContentSection[];
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

export interface ContentSection {
  type: 'paragraph' | 'heading' | 'interactive' | 'list';
  text?: string;
  items?: string[];
  component?: React.FC;
}

export interface Point {
  x: number;
  y: number;
}

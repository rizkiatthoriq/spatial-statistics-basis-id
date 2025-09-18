import React from 'react';
import type { Module } from '../types';
import { Card } from './Card';

interface InteractiveContentProps {
  module: Module;
}

export const InteractiveContent: React.FC<InteractiveContentProps> = ({ module }) => {
  return (
    <div className="space-y-10">
      {module.content.map((section, index) => {
        switch (section.type) {
          case 'heading':
            return (
              <h2 key={index} className="text-3xl font-bold text-neutral-800 pt-4 border-b border-neutral-200 pb-4">
                {section.text}
              </h2>
            );
          case 'paragraph':
            return (
              <p key={index} className="text-neutral-600 leading-relaxed max-w-prose text-lg">
                {section.text}
              </p>
            );
          case 'list':
            return (
              <ul key={index} className="list-disc list-inside space-y-2 text-neutral-600 max-w-prose pl-4 text-lg">
                {section.items?.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
              </ul>
            );
          case 'interactive':
            if (section.component) {
              const InteractiveComponent = section.component;
              return (
                <Card key={index}>
                  <InteractiveComponent />
                </Card>
              );
            }
            return null;
          default:
            return null;
        }
      })}
    </div>
  );
};
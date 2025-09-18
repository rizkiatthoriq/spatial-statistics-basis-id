import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white rounded-2xl border border-neutral-200/80 shadow-lg shadow-neutral-100 overflow-hidden p-6 sm:p-8 ${className}`}>
      {children}
    </div>
  );
};
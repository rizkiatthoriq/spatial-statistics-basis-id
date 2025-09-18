import React from 'react';

interface HeaderProps {
  title: string;
  description: string;
}

export const Header: React.FC<HeaderProps> = ({ title, description }) => {
  return (
    <header className="border-b border-neutral-200 pb-6">
      <h1 className="text-4xl font-extrabold tracking-tight text-neutral-900 sm:text-5xl">{title}</h1>
      <p className="mt-3 text-lg text-neutral-500 max-w-3xl">{description}</p>
    </header>
  );
};
import React from 'react';
import type { Module } from '../types';

interface SidebarProps {
  modules: Module[];
  activeModule: Module;
  setActiveModule: (module: Module) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ modules, activeModule, setActiveModule }) => {
  return (
    <aside className="fixed top-0 left-0 w-72 h-full bg-white border-r border-neutral-200 p-6 shadow-sm">
      <div className="flex items-center gap-3 mb-12">
        <div className="bg-primary-600 text-white p-2.5 rounded-lg">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20V16"/></svg>
        </div>
        <h1 className="text-xl font-bold text-neutral-800">Statistika Interaktif</h1>
      </div>
      <nav>
        <ul className="space-y-2">
          {modules.map((module) => (
            <li key={module.id}>
              <button
                onClick={() => setActiveModule(module)}
                className={`w-full text-left flex items-center gap-4 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeModule.id === module.id
                    ? 'bg-primary-50 text-primary-600 font-semibold'
                    : 'text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900'
                }`}
              >
                <module.icon className="w-6 h-6 flex-shrink-0" />
                <span className="leading-tight">{module.title}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
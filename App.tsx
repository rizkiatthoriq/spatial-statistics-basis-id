import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Header } from './components/Header';
import { InteractiveContent } from './components/InteractiveContent';
import { contentModules } from './constants';
import type { Module } from './types';

const App: React.FC = () => {
  const [activeModule, setActiveModule] = useState<Module>(contentModules[0]);

  return (
    <div className="min-h-screen font-sans text-neutral-800">
      <div className="flex">
        <Sidebar modules={contentModules} activeModule={activeModule} setActiveModule={setActiveModule} />
        <main className="flex-1 p-6 sm:p-8 lg:p-12 ml-72">
          <Header title={activeModule.title} description={activeModule.description} />
          <div className="mt-10">
            <InteractiveContent module={activeModule} />
          </div>
           <footer className="mt-12 border-t border-neutral-200 pt-6 text-center text-sm text-neutral-500">
            Dibangun dengan React & Tailwind CSS untuk Pembelajaran Statistik yang Menarik.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default App;
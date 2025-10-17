import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 bg-gray-900/70 backdrop-blur-sm sticky top-0 z-10 border-b border-purple-800/50">
      <div className="container mx-auto text-center">
        <h1 className="text-3xl md:text-4xl font-extrabold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-cyan-400">
            Nano Banana
          </span> 
          <span className="text-slate-300"> Photo Editor</span>
        </h1>
        <p className="text-slate-400 mt-2">AI-powered image editing at your fingertips.</p>
      </div>
    </header>
  );
};
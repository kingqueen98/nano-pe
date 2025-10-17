import React from 'react';
import { Spinner } from './Spinner';

interface ResultDisplayProps {
  editedImageUrl: string | null;
  isLoading: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ editedImageUrl, isLoading }) => {
  return (
    <div className="relative w-full aspect-square bg-gray-950/70 rounded-lg flex items-center justify-center border border-purple-800/50 overflow-hidden">
      {isLoading && (
        <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm flex flex-col items-center justify-center z-10">
          <Spinner />
          <p className="text-slate-300 mt-4 text-lg">AI is working its magic...</p>
          <p className="text-slate-400 text-sm">This may take a moment.</p>
        </div>
      )}
      {editedImageUrl ? (
        <img src={editedImageUrl} alt="Edited result" className="object-contain w-full h-full animate-fade-in" />
      ) : (
        !isLoading && (
          <div className="text-center text-slate-500 p-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 mx-auto mb-4 text-purple-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-xl font-semibold">Your Edited Image Will Appear Here</h3>
            <p className="mt-2">Upload an image and provide a prompt to get started.</p>
          </div>
        )
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
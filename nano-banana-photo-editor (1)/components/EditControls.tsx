import React from 'react';
import { Spinner } from './Spinner';

interface EditControlsProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: (promptOverride?: string) => void;
  isLoading: boolean;
  isImageUploaded: boolean;
}

export const EditControls: React.FC<EditControlsProps> = ({ prompt, onPromptChange, onSubmit, isLoading, isImageUploaded }) => {
  const handleRemoveBackground = () => {
    const removeBgPrompt = 'remove the background, make the background transparent';
    onPromptChange(removeBgPrompt);
    onSubmit(removeBgPrompt);
  };

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="e.g., 'make the sky a vibrant sunset', 'turn the cat into a robot', 'add a pirate hat'..."
        className="w-full h-32 p-3 bg-gray-950/70 border border-purple-800/50 rounded-lg focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 transition-colors duration-200 placeholder-slate-600 resize-none"
        disabled={!isImageUploaded || isLoading}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={handleRemoveBackground}
          disabled={!isImageUploaded || isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold rounded-lg shadow-lg disabled:bg-gray-800 disabled:text-slate-500 disabled:border-slate-700 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100 bg-transparent border border-purple-600 text-purple-300 hover:bg-purple-600/20"
          aria-label="Remove image background"
        >
          <span role="img" aria-hidden="true">🪄</span>
          Remove Background
        </button>
        <button
          onClick={() => onSubmit()}
          disabled={!isImageUploaded || !prompt.trim() || isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 text-lg font-semibold text-white bg-gradient-to-br from-fuchsia-600 to-purple-600 rounded-lg shadow-lg hover:from-fuchsia-500 hover:to-purple-500 disabled:bg-gray-800 disabled:from-gray-800 disabled:to-gray-800 disabled:text-slate-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 disabled:scale-100"
        >
          {isLoading ? (
            <>
              <Spinner />
              Editing...
            </>
          ) : (
            'Apply AI Edit'
          )}
        </button>
      </div>
    </div>
  );
};
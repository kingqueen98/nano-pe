import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { EditControls } from './components/EditControls';
import { ResultDisplay } from './components/ResultDisplay';
import { editImageWithNanoBanana } from './services/geminiService';

export default function App() {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageSelect = (file: File) => {
    setOriginalImage(file);
    setEditedImage(null);
    setError(null);
    setOriginalImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = useCallback(async (promptOverride?: string) => {
    const finalPrompt = typeof promptOverride === 'string' ? promptOverride : prompt;

    if (!originalImage || !finalPrompt.trim()) {
      setError('Please upload an image and provide an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const resultBase64 = await editImageWithNanoBanana(originalImage, finalPrompt);
      setEditedImage(`data:image/png;base64,${resultBase64}`);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen font-sans text-slate-200 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="flex flex-col gap-8 bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg ring-1 ring-purple-500/20">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
              <span className="bg-purple-500/20 text-purple-300 rounded-lg px-3 py-1.5 text-lg font-mono">1</span>
              Upload Your Image
            </h2>
            <ImageUpload onImageSelect={handleImageSelect} previewUrl={originalImagePreview} />
          </div>
          <div className="flex flex-col gap-4">
             <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
               <span className="bg-purple-500/20 text-purple-300 rounded-lg px-3 py-1.5 text-lg font-mono">2</span>
              Describe Your Edit
            </h2>
            <EditControls
              prompt={prompt}
              onPromptChange={setPrompt}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              isImageUploaded={!!originalImage}
            />
          </div>
        </div>
        <div className="flex flex-col gap-4 bg-gray-900/60 backdrop-blur-sm p-6 rounded-2xl shadow-lg ring-1 ring-purple-500/20 sticky top-28">
            <h2 className="text-2xl font-bold text-purple-400 flex items-center gap-2">
               <span className="bg-purple-500/20 text-purple-300 rounded-lg px-3 py-1.5 text-lg font-mono">3</span>
              View Result
            </h2>
            {error && (
              <div className="bg-pink-500/20 border border-pink-500 text-pink-300 p-4 rounded-lg text-center">
                <p className="font-semibold">Error</p>
                <p>{error}</p>
              </div>
            )}
          <ResultDisplay editedImageUrl={editedImage} isLoading={isLoading} />
        </div>
      </main>
    </div>
  );
}
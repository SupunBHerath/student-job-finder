
import React, { useState, useMemo } from 'react';
import { generateImage } from '../services/geminiService';
import { AspectRatio } from '../types';
import Input from './common/Input';
import Select from './common/Select';
import Button from './common/Button';
import Spinner from './common/Spinner';

const ASPECT_RATIOS: AspectRatio[] = ["1:1", "3:4", "4:3", "9:16", "16:9"];
const LOADING_MESSAGES = [
    "Our AI artist is warming up...",
    "Painting your digital masterpiece...",
    "Mixing the cyber-paints...",
    "Reticulating splines...",
    "Asking the digital muse for inspiration...",
    "Generating creative sparks...",
];

const ImageGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState<string>('A photorealistic image of a university student working on a laptop in a modern cafe in Colombo.');
  const [aspectRatio, setAspectRatio] = useState<AspectRatio>('16:9');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const loadingMessage = useMemo(() => LOADING_MESSAGES[Math.floor(Math.random() * LOADING_MESSAGES.length)], [isLoading]);

  const handleGenerate = async () => {
    if (!prompt) {
      setError('Please enter a prompt.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const imageUrl = await generateImage(prompt, aspectRatio);
      setGeneratedImage(imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    const safePrompt = prompt.substring(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    link.download = `ai_image_${safePrompt || 'download'}.jpeg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-dark mb-4 text-center">AI Image Generator</h2>
        <p className="text-center text-secondary mb-8">Create stunning visuals for job postings, presentations, or just for fun. Describe what you want to see!</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            <div className="md:col-span-2">
                <Input
                    label="Image Description (Prompt)"
                    id="prompt"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="e.g., A student happily receiving a job offer"
                />
            </div>
            <Select
                label="Aspect Ratio"
                id="aspect-ratio"
                options={ASPECT_RATIOS}
                value={aspectRatio}
                onChange={(e) => setAspectRatio(e.target.value as AspectRatio)}
            />
            <Button onClick={handleGenerate} disabled={isLoading} className="w-full h-[42px]">
                {isLoading ? <Spinner/> : 'Generate Image'}
            </Button>
        </div>
      </div>
      
      {isLoading && (
        <div className="mt-8 text-center">
            <Spinner />
            <p className="mt-2 text-secondary italic">{loadingMessage}</p>
        </div>
        )}

      {error && (
        <div className="mt-8 bg-red-100 border border-danger text-danger px-4 py-3 rounded-xl text-center" role="alert">
          <strong className="font-bold">Error: </strong>
          <span className="block sm:inline ml-1">{error}</span>
        </div>
      )}

      {generatedImage && (
        <div className="mt-10">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <img 
              src={generatedImage} 
              alt={prompt} 
              className="rounded-lg w-full h-auto object-contain" 
            />
          </div>
          <div className="text-center mt-4">
            <Button onClick={handleDownload} variant="success">
                Download Image
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGenerator;

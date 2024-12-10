import React, { useRef, useState } from 'react';
import { Camera, Loader } from 'lucide-react';
import { uploadFile } from '../lib/firebase/storage';

interface ImageUploadProps {
  currentImage?: string | null;
  onUpload: (url: string) => void;
  type: 'profile' | 'company';
}

export default function ImageUpload({ currentImage, onUpload, type }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setUploading(true);
    setError(null);

    const { url, error } = await uploadFile(file, type === 'profile' ? 'profiles' : 'companies');
    
    if (error) {
      setError(error);
    } else if (url) {
      onUpload(url);
    }

    setUploading(false);
  };

  return (
    <div className="relative">
      <div className="h-20 w-20 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
        {currentImage ? (
          <img src={currentImage} alt="Upload preview" className="h-full w-full object-cover" />
        ) : (
          <Camera className="h-8 w-8 text-gray-400" />
        )}
      </div>
      
      <button
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
        className="absolute bottom-0 right-0 rounded-full bg-white p-2 shadow-lg hover:bg-gray-50 disabled:opacity-50"
      >
        {uploading ? (
          <Loader className="h-4 w-4 text-gray-500 animate-spin" />
        ) : (
          <Camera className="h-4 w-4 text-gray-500" />
        )}
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
}
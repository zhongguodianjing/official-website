import React, { useState } from 'react';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, className, imageClassName }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {/* Placeholder with pulse effect */}
      <div 
        className={`absolute inset-0 bg-slate-200 dark:bg-slate-800/50 animate-pulse transition-opacity duration-700 z-10 ${
          loaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`} 
      />
      {/* Image with blur transition */}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className={`w-full h-full transition-all duration-700 ease-out ${imageClassName || ''} ${
          loaded ? 'opacity-100 blur-0 scale-100' : 'opacity-0 blur-xl scale-105'
        }`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
};

export default LazyImage;
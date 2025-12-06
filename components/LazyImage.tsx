import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface LazyImageProps {
  src?: string;
  cid?: string;
  alt?: string;
  className?: string;
  imageClassName?: string;
  gateway?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  cid, 
  alt = '', 
  className = '',
  imageClassName = '',
  gateway = import.meta.env.VITE_PINATA_GATEWAY || 'example.mypinata.cloud'
}) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    // 优先使用 CID 构建 IPFS URL，如果没有 CID 则使用 src
    if (cid) {
      // 构建 IPFS 图片 URL
      // 对于公开资源，直接使用网关 URL，不包含认证信息
      const baseUrl = gateway.startsWith('http') ? gateway : `https://${gateway}`;
      const url = `${baseUrl}/ipfs/${cid}`;
      setImageUrl(url);
    } else if (src) {
      // 使用直接提供的 URL
      setImageUrl(src);
    } else {
      // 如果都没有提供，则清空 imageUrl
      setImageUrl('');
    }
  }, [cid, src, gateway]);

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    // 修复：使用 t.image.loadError 而不是 t('image.loadError')
    setError(t.image?.loadError || 'Failed to load image');
  };

  // 如果既没有 src 也没有 cid，则显示占位符
  if (!src && !cid) {
    return (
      <div className={`bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center ${className}`}>
        <span className="text-slate-400 dark:text-slate-500 text-sm">
          {/* 修复：使用 t.image.noImage 而不是 t('image.noImage') */}
          {t.image?.noImage || 'No image'}
        </span>
      </div>
    );
  }

  // 如果没有有效的 imageUrl，则显示占位符
  if (!imageUrl) {
    return (
      <div className={`bg-slate-100 dark:bg-slate-800 border border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center ${className}`}>
        <span className="text-slate-400 dark:text-slate-500 text-sm">
          {/* 修复：使用 t.image.noImage 而不是 t('image.noImage') */}
          {t.image?.noImage || 'No image'}
        </span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className || ''}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 animate-pulse flex items-center justify-center">
          <div className="text-slate-400 dark:text-slate-500">
            {/* 修复：使用 t.image.loading 而不是 t('image.loading') */}
            {t.image?.loading || 'Loading...'}
          </div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
          <div className="text-red-500 dark:text-red-400 text-sm">
            {error}
          </div>
        </div>
      )}
      
      <img
        src={imageUrl}
        alt={alt}
        loading="lazy"
        className={`w-full h-full transition-all duration-700 ease-out ${imageClassName || ''} ${
          isLoading || error ? 'opacity-0' : 'opacity-100'
        }`}
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
};

export default LazyImage;
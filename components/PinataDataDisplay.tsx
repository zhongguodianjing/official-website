import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';

interface PinataDataDisplayProps {
  cid: string;
  className?: string;
  gateway?: string;
}

const PinataDataDisplay: React.FC<PinataDataDisplayProps> = ({ 
  cid, 
  className = '',
  gateway = import.meta.env.VITE_PINATA_GATEWAY || 'example.mypinata.cloud'
}) => {
  const { t } = useLanguage();
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!cid) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const url = `https://${gateway}/ipfs/${cid}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch data: ${response.statusText}`);
        }
        
        // 尝试解析为 JSON，如果失败则返回文本
        let result;
        try {
          result = await response.json();
        } catch {
          result = await response.text();
        }
        
        setData(result);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
        setError(errorMessage);
        console.error('Error fetching data from Pinata:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cid, gateway]);

  if (!cid) {
    return (
      <div className={`p-4 bg-slate-50 dark:bg-slate-800/50 border border-dashed border-slate-200 dark:border-slate-700 rounded ${className}`}>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          {t('image.noImage')}
        </p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className={`p-4 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded animate-pulse ${className}`}>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/50 rounded ${className}`}>
        <p className="text-red-700 dark:text-red-300 text-sm">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div className={`p-4 bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded ${className}`}>
      {typeof data === 'string' ? (
        <p className="text-slate-700 dark:text-slate-300">{data}</p>
      ) : (
        <pre className="text-slate-700 dark:text-slate-300 text-sm overflow-x-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
};

export default PinataDataDisplay;
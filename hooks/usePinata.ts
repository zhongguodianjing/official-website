import { useState, useCallback } from 'react';
import { fetchFromPinata } from '../utils/pinata';
import { PinataFetchResult } from '../types';

/**
 * usePinata Hook (只读版本)
 * 提供 Pinata/IPFS 只读功能的 React Hook
 */
export const usePinata = () => {
  const [fetching, setFetching] = useState(false);
  const [fetchResult, setFetchResult] = useState<PinataFetchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  /**
   * 从 Pinata 获取数据 (只读操作)
   * @param cid 内容标识符
   */
  const fetchData = useCallback(async (cid: string) => {
    setFetching(true);
    setError(null);
    
    try {
      const result = await fetchFromPinata(cid);
      setFetchResult(result);
      
      if (!result.success) {
        setError(result.error || 'Fetch failed');
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      setError(errorMessage);
      setFetchResult({ success: false, error: errorMessage });
      return { success: false, error: errorMessage };
    } finally {
      setFetching(false);
    }
  }, []);

  /**
   * 清除状态
   */
  const clearState = useCallback(() => {
    setFetching(false);
    setFetchResult(null);
    setError(null);
  }, []);

  return {
    // 状态
    fetching,
    fetchResult,
    error,
    
    // 方法
    fetchData,
    clearState,
  };
};

export default usePinata;
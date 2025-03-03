'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

interface LoadingContextType {
  loading: boolean;
  setLoading: (isLoading: boolean) => void;
  progress: number;
}

const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => {},
  progress: 0,
});

/**
 * 로딩 상태 관리 콘텍스트 제공자
 */
export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 페이지 전환 시 로딩 상태 초기화
  useEffect(() => {
    setLoading(true);
    
    // 점진적 로딩 진행 효과
    const timer = setTimeout(() => {
      setLoading(false);
      setProgress(0);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [pathname, searchParams]);
  
  // 로딩 진행 효과
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (loading) {
      setProgress(10);
      
      const simulateProgress = () => {
        setProgress(prev => {
          if (prev >= 90) {
            clearInterval(timer);
            return prev;
          }
          return prev + Math.floor(Math.random() * 15);
        });
      };
      
      timer = setInterval(simulateProgress, 300);
    } else {
      setProgress(100);
      timer = setTimeout(() => setProgress(0), 500);
    }
    
    return () => {
      clearInterval(timer);
      clearTimeout(timer);
    };
  }, [loading]);
  
  const value = {
    loading,
    setLoading,
    progress
  };
  
  return (
    <LoadingContext.Provider value={value}>
      {children}
    </LoadingContext.Provider>
  );
}

/**
 * 로딩 상태 관리 훅
 */
export function useLoading() {
  const context = useContext(LoadingContext);
  
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  
  return context;
} 
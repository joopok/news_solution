'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useLoading } from '../context/LoadingContext';

/**
 * 페이지 이동 시 로딩 상태를 관리하는 훅
 * Next.js의 라우터 이벤트를 활용하여 페이지 이동 시작과 종료 시 로딩 상태를 관리합니다.
 */
export default function useNavigationLoading() {
  const router = useRouter();
  const pathname = usePathname();
  const { setLoading } = useLoading();
  const [isNavigating, setIsNavigating] = useState(false);
  
  // 페이지 이동 시작 처리
  const startLoading = useCallback(() => {
    setIsNavigating(true);
    setLoading(true);
  }, [setLoading]);
  
  // 페이지 이동 종료 처리
  const stopLoading = useCallback(() => {
    setIsNavigating(false);
    setLoading(false);
  }, [setLoading]);
  
  // 라우터 이벤트 리스너
  useEffect(() => {
    // 페이지 변경 시 로딩 상태 관리
    const handleStart = () => startLoading();
    const handleComplete = () => stopLoading();
    
    // 이전 페이지로 돌아갈 때 로딩 처리
    const handlePopState = () => {
      startLoading();
      setTimeout(stopLoading, 300);
    };
    
    // 이벤트 리스너 등록
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [startLoading, stopLoading, pathname]);
  
  // 페이지 이동 함수 제공
  const navigateTo = useCallback(
    (href: string) => {
      startLoading();
      router.push(href);
    },
    [router, startLoading]
  );
  
  return {
    isNavigating,
    startLoading,
    stopLoading,
    navigateTo,
  };
} 
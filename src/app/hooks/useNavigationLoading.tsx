'use client';

import { useEffect, useCallback, useState, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '../context/LoadingContext';

/**
 * 페이지 이동 시 로딩 상태를 자동으로 관리하는 훅
 * 링크 클릭 및 경로 변경을 감지하여 로딩 상태를 조절합니다.
 */
export default function useNavigationLoading() {
  const { setLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  // 타임아웃 관리를 위한 ref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 경로 변경 감지
  useEffect(() => {
    // 경로가 변경되었을 때 로딩 상태 해제
    setLoading(false);
    
    // 이전 타임아웃 정리
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [pathname, searchParams, setLoading]);

  // 고객센터 페이지 특별 처리
  useEffect(() => {
    if (pathname.includes('/customer')) {
      setLoading(false);
    }
  }, [pathname, setLoading]);

  // 링크 클릭 처리
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      const button = target.closest('button');
      
      // 내부 링크 클릭 시 로딩 시작
      if (link && link.getAttribute('href')?.startsWith('/')) {
        const href = link.getAttribute('href');
        
        // 고객센터 페이지는 로딩 표시 제외
        if (href?.includes('/customer')) {
          return;
        }
        
        setLoading(true);
        
        // 안전장치: 3초 후 자동 로딩 해제
        timeoutRef.current = setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
      
      // 네비게이션 버튼 클릭 시 로딩 시작
      if (button && button.getAttribute('data-navigation') === 'true') {
        setLoading(true);
        
        // 안전장치: 3초 후 자동 로딩 해제
        timeoutRef.current = setTimeout(() => {
          setLoading(false);
        }, 3000);
      }
    };

    document.addEventListener('click', handleLinkClick);
    return () => document.removeEventListener('click', handleLinkClick);
  }, [setLoading]);

  // 수동 제어 함수들
  const startLoading = useCallback(() => {
    setLoading(true);
    
    // 안전장치: 3초 후 자동 로딩 해제
    timeoutRef.current = setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, [setLoading]);

  const stopLoading = useCallback(() => {
    setLoading(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, [setLoading]);

  // 컴포넌트에서 사용할 수 있는 함수들 반환
  return { startLoading, stopLoading };
}

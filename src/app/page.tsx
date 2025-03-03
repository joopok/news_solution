'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import SkeletonLoading from './components/SkeletonLoading';
import { useLoading } from './context/LoadingContext';

// Main 컴포넌트 지연 로딩
const Main = lazy(() => import('./layout/Main'));

/**
 * 홈 페이지 컴포넌트
 * 메인 컴포넌트를 동적으로 로드하고 로딩 상태를 관리합니다.
 */
export default function Home() {
  const { setLoading } = useLoading();
  const [isMounted, setIsMounted] = useState(false);
  
  // 컴포넌트 마운트 시 로딩 상태 처리
  useEffect(() => {
    setIsMounted(true);
    setLoading(true);
    
    // 페이지 로드 완료 시 로딩 상태 해제
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // 짧은 지연으로 로딩 인디케이터가 깜빡이는 것 방지
    
    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [setLoading]);
  
  return (
    <div className="min-h-screen">
      {isMounted && (
        <Suspense fallback={
          <div className="container mx-auto px-4 py-6">
            <div className="mb-8">
              <SkeletonLoading type="banner" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <SkeletonLoading type="content" rows={6} />
              </div>
              <div>
                <SkeletonLoading type="trending" />
              </div>
            </div>
          </div>
        }>
          <Main />
        </Suspense>
      )}
    </div>
  );
}
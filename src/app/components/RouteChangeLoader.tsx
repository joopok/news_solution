'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useLoading } from '../context/LoadingContext';

export default function RouteChangeLoader() {
  const { setIsLoading } = useLoading();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 라우트 변경 감지
  useEffect(() => {
    // 페이지 로드가 완료되면 로딩 상태 해제
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [pathname, searchParams, setIsLoading]);

  return null;
} 
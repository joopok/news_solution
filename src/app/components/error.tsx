'use client';

import { useEffect } from 'react';
import ErrorComponent from './components/ErrorComponent';

export interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

/**
 * Next.js 앱의 글로벌 에러 페이지
 * 
 * 애플리케이션에서 처리되지 않은 오류가 발생했을 때 표시됩니다.
 * error.tsx는 Next.js에서 자동으로 에러 경계로 작동합니다.
 */
export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // 에러 로깅 또는 에러 추적 서비스로 에러 보내기
    console.error('Global Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <ErrorComponent
        title="문제가 발생했습니다"
        message="애플리케이션에서 예기치 않은 오류가 발생했습니다. 이 문제에 대해 인지하고 있으며 해결을 위해 노력하고 있습니다."
        code={error.digest}
        action={reset}
        actionText="다시 시도"
      />
    </div>
  );
} 
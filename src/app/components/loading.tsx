'use client';

import SkeletonLoading from './SkeletonLoading';

/**
 * Next.js 앱의 글로벌 로딩 화면
 * 
 * 페이지 또는 레이아웃이 로드되는 동안 표시됩니다.
 * loading.tsx는 Next.js에서 자동으로 로딩 상태로 인식됩니다.
 */
export default function Loading() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="w-full max-w-3xl px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">콘텐츠를 불러오고 있습니다</h2>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
        
        <div className="space-y-8">
          <SkeletonLoading type="banner" count={1} rows={1} />
          <SkeletonLoading type="news" count={3} rows={1} />
          <SkeletonLoading type="grid" count={4} rows={1} />
        </div>
      </div>
    </div>
  );
} 
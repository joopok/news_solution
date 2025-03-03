'use client';

import React, { ReactNode } from 'react';
import SkeletonLoading from './SkeletonLoading';
import ErrorComponent from './ErrorComponent';

interface LoadingErrorHandlerProps {
  isLoading: boolean;
  isError: any;
  isEmpty?: boolean;
  children: ReactNode;
  loadingType?: 'content' | 'news' | 'card' | 'grid' | 'banner';
  loadingRows?: number;
  loadingCount?: number;
  loadingMessage?: string;
  errorTitle?: string;
  errorMessage?: string;
  emptyTitle?: string;
  emptyMessage?: string;
  retry?: () => void;
}

/**
 * 로딩, 에러, 빈 상태를 처리하는 컴포넌트
 * 
 * 데이터 로딩 중, 에러 발생 시, 데이터가 없는 경우에 대한 UI를 처리합니다.
 * SWR 또는 기타 데이터 페칭 라이브러리와 함께 사용하기 적합합니다.
 */
const LoadingErrorHandler: React.FC<LoadingErrorHandlerProps> = ({
  isLoading,
  isError,
  isEmpty = false,
  children,
  loadingType = 'content',
  loadingRows = 3,
  loadingCount = 1,
  loadingMessage = '데이터를 불러오고 있습니다...',
  errorTitle = '데이터를 불러올 수 없습니다',
  errorMessage = '데이터를 불러오는 중 오류가 발생했습니다. 나중에 다시 시도해주세요.',
  emptyTitle = '표시할 내용이 없습니다',
  emptyMessage = '현재 표시할 데이터가 없습니다. 나중에 다시 확인해주세요.',
  retry,
}) => {
  // 로딩 중인 경우
  if (isLoading) {
    return (
      <SkeletonLoading 
        type={loadingType}
        rows={loadingRows}
        count={loadingCount}
        showMessage={true}
        message={loadingMessage}
      />
    );
  }

  // 에러가 발생한 경우
  if (isError) {
    return (
      <ErrorComponent 
        title={errorTitle}
        message={errorMessage}
        action={retry}
        actionText="다시 시도"
        showRefresh={true}
      />
    );
  }

  // 데이터가 비어있는 경우
  if (isEmpty) {
    return (
      <div className="w-full py-8 px-4 flex flex-col items-center justify-center text-center">
        <svg className="w-12 h-12 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
        </svg>
        <h3 className="text-lg font-medium text-gray-800 mb-2">{emptyTitle}</h3>
        <p className="text-gray-600 max-w-md">{emptyMessage}</p>
      </div>
    );
  }

  // 정상 데이터가 있는 경우
  return <>{children}</>;
};

export default LoadingErrorHandler; 
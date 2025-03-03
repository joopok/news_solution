'use client';

import React from 'react';

type SkeletonType = 'banner' | 'news' | 'trending' | 'content' | 'grid' | 'carousel' | 'card' | 'profile';

interface SkeletonLoadingProps {
  type: SkeletonType;
  count?: number; // 개수 (news 타입에서 사용)
  rows?: number; // 행 수 (content 타입에서 사용)
  message?: string; // 사용자에게 표시할 커스텀 메시지
  showMessage?: boolean; // 메시지 표시 여부
  className?: string; // 컴포넌트에 적용할 추가 클래스
}

/**
 * 스켈레톤 로딩 컴포넌트
 * 다양한 유형의 콘텐츠에 대한 로딩 상태를 표시합니다.
 */
export default function SkeletonLoading({ 
  type, 
  count = 5, 
  rows = 3,
  message = "데이터를 불러오고 있습니다...",
  showMessage = false,
  className
}: SkeletonLoadingProps): JSX.Element {
  // 공통 스켈레톤 아이템 컴포넌트
  const SkeletonItem = ({ className }: { className?: string }) => (
    <div className={`bg-gray-200 animate-pulse rounded-md ${className}`}></div>
  );

  // 뉴스 아이템 스켈레톤
  const NewsItemSkeleton = () => (
    <div className="flex gap-4 mb-4">
      <SkeletonItem className="w-24 h-16 flex-shrink-0" />
      <div className="flex-grow">
        <SkeletonItem className="h-4 w-full mb-2" />
        <SkeletonItem className="h-4 w-2/3" />
        <div className="flex gap-2 mt-2">
          <SkeletonItem className="h-3 w-16" />
          <SkeletonItem className="h-3 w-16" />
        </div>
      </div>
    </div>
  );

  // 트렌딩 뉴스 스켈레톤
  const TrendingNewsSkeleton = () => (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <SkeletonItem className="h-6 w-32" />
        <SkeletonItem className="h-4 w-16" />
      </div>
      <div>
        {Array(8).fill(0).map((_, i) => (
          <div key={i} className="py-2 border-b last:border-b-0">
            <div className="flex justify-between">
              <div className="flex gap-2 items-center">
                <SkeletonItem className="h-5 w-5 rounded-full" />
                <SkeletonItem className="h-4 w-48" />
              </div>
              <SkeletonItem className="h-3 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // 배너 스켈레톤
  const BannerSkeleton = () => (
    <div className="relative rounded-lg overflow-hidden">
      <SkeletonItem className="w-full aspect-[16/9]" />
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <SkeletonItem className="h-6 w-3/4 mb-2" />
        <SkeletonItem className="h-4 w-1/2" />
      </div>
    </div>
  );

  // 콘텐츠 영역 스켈레톤
  const ContentSkeleton = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SkeletonItem className="h-6 w-32" />
        <SkeletonItem className="h-4 w-20" />
      </div>
      {Array(rows).fill(0).map((_, i) => (
        <div key={i} className="py-2">
          <SkeletonItem className="h-5 w-full mb-2" />
          <SkeletonItem className="h-5 w-3/4 mb-2" />
          <div className="flex gap-2">
            <SkeletonItem className="h-3 w-16" />
            <SkeletonItem className="h-3 w-16" />
          </div>
        </div>
      ))}
    </div>
  );

  // 그리드 스켈레톤
  const GridSkeleton = () => (
    <div className="grid grid-cols-2 gap-4">
      {Array(4).fill(0).map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonItem className="w-full aspect-video" />
          <SkeletonItem className="h-4 w-full" />
          <SkeletonItem className="h-4 w-2/3" />
        </div>
      ))}
    </div>
  );

  // 캐러셀 스켈레톤
  const CarouselSkeleton = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <SkeletonItem className="h-6 w-32" />
        <div className="flex space-x-2">
          <SkeletonItem className="h-8 w-8 rounded-full" />
          <SkeletonItem className="h-8 w-8 rounded-full" />
        </div>
      </div>
      <div className="flex space-x-4 overflow-hidden">
        {Array(3).fill(0).map((_, i) => (
          <div key={i} className="flex-shrink-0 w-64">
            <SkeletonItem className="w-full aspect-video mb-2" />
            <SkeletonItem className="h-4 w-full mb-1" />
            <SkeletonItem className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );

  // 카드 스켈레톤
  const CardSkeleton = () => (
    <div className="bg-white p-4 rounded-lg shadow-md space-y-3">
      <SkeletonItem className="w-full aspect-video" />
      <SkeletonItem className="h-5 w-3/4" />
      <SkeletonItem className="h-4 w-full" />
      <SkeletonItem className="h-4 w-2/3" />
      <div className="flex justify-between pt-2">
        <SkeletonItem className="h-3 w-20" />
        <SkeletonItem className="h-3 w-20" />
      </div>
    </div>
  );

  // 프로필 스켈레톤
  const ProfileSkeleton = () => (
    <div className="flex items-center space-x-4">
      <SkeletonItem className="w-12 h-12 rounded-full" />
      <div className="space-y-2">
        <SkeletonItem className="h-4 w-32" />
        <SkeletonItem className="h-3 w-48" />
      </div>
    </div>
  );

  // 메시지 컴포넌트
  const Message = () => (
    <div className="py-4 text-center text-gray-500 text-sm">
      {message}
    </div>
  );

  // 스켈레톤 컴포넌트 렌더링
  const renderSkeleton = () => {
    switch (type) {
      case 'banner':
        return <BannerSkeleton />;
      case 'news':
        return (
          <div>
            {Array(count).fill(0).map((_, i) => (
              <NewsItemSkeleton key={i} />
            ))}
          </div>
        );
      case 'trending':
        return <TrendingNewsSkeleton />;
      case 'content':
        return <ContentSkeleton />;
      case 'grid':
        return <GridSkeleton />;
      case 'carousel':
        return <CarouselSkeleton />;
      case 'card':
        return <CardSkeleton />;
      case 'profile':
        return <ProfileSkeleton />;
      default:
        return <SkeletonItem className="w-full h-16" />;
    }
  };

  return (
    <div className={`relative ${className || ''}`}>
      {renderSkeleton()}
      {showMessage && <Message />}
    </div>
  );
} 
'use client';

import React from 'react';
import { PageHeaderProps } from '@/app/types/types';

/**
 * 페이지 헤더 컴포넌트
 * 
 * 페이지 상단에 제목과 설명을 표시합니다.
 * 
 * @param title 페이지 제목
 * @param description 페이지 설명 (선택 사항)
 * @param className 추가 CSS 클래스 (선택 사항)
 * @param centerAlign 텍스트 중앙 정렬 여부 (선택 사항)
 */
export default function PageHeader({ 
  title, 
  description, 
  className = '', 
  centerAlign = false 
}: PageHeaderProps) {
  return (
    <div className={`mb-8 ${centerAlign ? 'text-center' : ''} ${className}`}>
      <h1 className={`${centerAlign ? 'text-3xl' : 'text-2xl'} font-bold text-gray-800 mb-2`}>
        {title}
      </h1>
      {description && (
        <p className="text-gray-600">
          {description}
        </p>
      )}
    </div>
  );
} 
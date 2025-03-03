'use client';

import React from 'react';
import Link from 'next/link';

interface CardProps {
  title: string;
  description?: string;
  link?: string;
  linkText?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
}

/**
 * 카드 컴포넌트
 * 
 * 제목, 설명, 아이콘, 링크 등을 포함할 수 있는 카드 UI 컴포넌트입니다.
 * 
 * @param title 카드 제목
 * @param description 카드 설명 (선택)
 * @param link 이동할 링크 주소 (선택)
 * @param linkText 링크 텍스트 (선택)
 * @param icon 아이콘 컴포넌트 (선택)
 * @param className 추가 스타일 클래스 (선택)
 * @param children 추가 자식 요소 (선택)
 * @param onClick 클릭 이벤트 핸들러 (선택)
 */
export default function Card({
  title,
  description,
  link,
  linkText,
  icon,
  className = '',
  children,
  onClick,
}: CardProps) {
  const cardContent = (
    <>
      {icon && (
        <div className="bg-emerald-100 rounded-full p-3 inline-flex items-center justify-center mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
      {description && (
        <p className="text-gray-600 mb-4">{description}</p>
      )}
      {children}
      {link && linkText && (
        <div className="mt-auto">
          <Link href={link} className="text-sm font-medium text-emerald-600 hover:text-emerald-700">
            {linkText} <span aria-hidden="true">→</span>
          </Link>
        </div>
      )}
    </>
  );

  const cardClasses = `bg-white rounded-lg shadow-sm p-6 text-center hover:shadow-md transition-shadow ${className}`;

  if (onClick) {
    return (
      <button onClick={onClick} className={`${cardClasses} w-full text-left`}>
        {cardContent}
      </button>
    );
  }

  if (link && !linkText) {
    return (
      <Link href={link} className={cardClasses}>
        {cardContent}
      </Link>
    );
  }

  return (
    <div className={cardClasses}>
      {cardContent}
    </div>
  );
} 
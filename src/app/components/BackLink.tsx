'use client';

import Link from 'next/link';
import { FiArrowLeft } from 'react-icons/fi';

interface BackLinkProps {
  href: string;
  label?: string;
  className?: string;
}

/**
 * 뒤로가기 링크 컴포넌트
 * 
 * 화살표 아이콘과 함께 이전 페이지로 돌아가는 링크를 제공합니다.
 * 
 * @param href 이동할 링크 경로
 * @param label 표시할 텍스트 (선택, 기본값: '돌아가기')
 * @param className 추가 스타일 클래스 (선택)
 */
export default function BackLink({ 
  href, 
  label = '돌아가기', 
  className = '' 
}: BackLinkProps) {
  return (
    <div className={`mb-6 ${className}`}>
      <Link 
        href={href} 
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
      >
        <FiArrowLeft className="mr-2" />
        {label}
      </Link>
    </div>
  );
} 
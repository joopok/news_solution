'use client';

import React, { useState } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  initialValue?: string;
  className?: string;
  buttonText?: string;
  showButton?: boolean;
}

/**
 * 검색 바 컴포넌트
 * 
 * 검색 입력창과 버튼을 제공합니다.
 * 
 * @param placeholder 입력창 placeholder 텍스트 (선택, 기본값: '검색...')
 * @param onSearch 검색 버튼 클릭 시 호출될 콜백 함수
 * @param initialValue 초기 검색어 (선택)
 * @param className 추가 스타일 클래스 (선택)
 * @param buttonText 버튼 텍스트 (선택, 기본값: '검색')
 * @param showButton 버튼 표시 여부 (선택, 기본값: true)
 */
export default function SearchBar({
  placeholder = '검색...',
  onSearch,
  initialValue = '',
  className = '',
  buttonText = '검색',
  showButton = true,
}: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full ${className}`}>
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </div>
      {showButton && (
        <button
          type="submit"
          className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
        >
          {buttonText}
        </button>
      )}
    </form>
  );
} 
'use client';

import Link from 'next/link';
import { FaHome, FaSearch, FaArrowLeft } from 'react-icons/fa';

/**
 * Next.js 앱의 404 페이지
 * 
 * 사용자가 존재하지 않는 페이지에 접근했을 때 표시됩니다.
 * not-found.tsx는 Next.js에서 자동으로 404 페이지로 인식됩니다.
 */
export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center">
      <div className="text-center max-w-lg px-4">
        <h1 className="text-9xl font-bold text-blue-600 mb-4">404</h1>
        
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          페이지를 찾을 수 없습니다
        </h2>
        
        <p className="text-gray-600 mb-8">
          찾으시는 페이지가 삭제되었거나, 이름이 변경되었거나, 일시적으로 사용할 수 없습니다.
        </p>
        
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md flex items-center">
            <FaHome className="mr-2" />
            홈으로 이동
          </Link>
          
          <Link href="/search" className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-6 rounded-md flex items-center">
            <FaSearch className="mr-2" />
            검색하기
          </Link>
          
          <button 
            onClick={() => window.history.back()} 
            className="bg-white border border-gray-300 hover:bg-gray-50 text-gray-800 font-medium py-2 px-6 rounded-md flex items-center"
          >
            <FaArrowLeft className="mr-2" />
            이전 페이지
          </button>
        </div>
      </div>
    </div>
  );
} 
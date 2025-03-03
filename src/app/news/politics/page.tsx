import React from 'react';
import { FaLandmark } from 'react-icons/fa';
import NewsCard from '@/app/layout/NewsCard';

export default function PoliticsPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 flex items-center">
        <FaLandmark className="mr-2" />
        정치 뉴스
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* 뉴스 카드 내용 */}
      </div>
    </div>
  );
} 
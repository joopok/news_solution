import React from 'react';
import Image from 'next/image';
import { FaCalendarAlt, FaEye, FaShare } from 'react-icons/fa';

interface PoliticsDetailPageProps {
  params: {
    id: string;
  };
}

export default function PoliticsDetailPage({ params }: PoliticsDetailPageProps) {
  const { id } = params;
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">정치</span>
        </div>
        
        <h1 className="text-3xl font-bold mb-4">정치 뉴스 상세 페이지 (ID: {id})</h1>
        
        <div className="flex items-center text-gray-500 mb-6">
          <span className="mr-4">홍길동 기자</span>
          <span className="flex items-center mr-4"><FaCalendarAlt className="mr-1" />2023.11.15</span>
          <span className="flex items-center"><FaEye className="mr-1" />1,234</span>
        </div>
        
        <div className="relative w-full h-[400px] mb-6">
          <Image
            src="https://placehold.co/800x400/0066cc/white?text=정치뉴스이미지"
            alt="뉴스 이미지"
            fill
            className="object-cover rounded"
          />
        </div>
        
        <div className="prose max-w-none mb-8">
          <p>여기에 뉴스 내용이 들어갑니다.</p>
        </div>
        
        <div className="flex justify-end">
          <button className="flex items-center text-gray-500 hover:text-blue-600">
            <FaShare className="mr-1" />공유하기
          </button>
        </div>
      </div>
    </div>
  );
} 
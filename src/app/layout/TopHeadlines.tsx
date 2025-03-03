'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { NewsItem, TopHeadlinesProps } from '../types/types';

// 카테고리별 색상 클래스
const categoryColors: Record<string, string> = {
  경제: 'text-blue-600 border-blue-600',
  사회: 'text-emerald-600 border-emerald-600',
  정치: 'text-red-600 border-red-600',
  세계: 'text-purple-600 border-purple-600',
  스포츠: 'text-orange-600 border-orange-600',
  문화: 'text-pink-600 border-pink-600',
  기타: 'text-gray-600 border-gray-600',
};

/**
 * 탑 헤드라인 컴포넌트
 */
export default function TopHeadlines({ headlines }: TopHeadlinesProps) {
  const [displayedHeadlines, setDisplayedHeadlines] = useState<NewsItem[]>([]);
  
  useEffect(() => {
    if (headlines && headlines.length > 0) {
      setDisplayedHeadlines(headlines.slice(0, 4)); // 상위 4개 헤드라인만 표시
    }
  }, [headlines]);
  
  // 데이터가 없을 때 메시지 표시
  if (!headlines || headlines.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4 border-b pb-2">주요 헤드라인</h2>
        <div className="py-12 text-center">
          <p className="text-gray-500">표시할 헤드라인이 없습니다</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-bold mb-4 border-b pb-2">주요 헤드라인</h2>
      
      <div className="grid gap-4">
        {displayedHeadlines.map((headline) => (
          <Link key={headline.id} href={`/news/${headline.id}`}>
            <div className="flex gap-3 group hover:bg-gray-50 p-2 rounded-md transition-colors">
              {headline.image && (
                <div className="w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={headline.image}
                    alt={headline.title}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              
              <div className="flex-1">
                <h3 className="font-medium text-gray-900 line-clamp-2 group-hover:text-blue-700 transition-colors mb-1">
                  {headline.title}
                </h3>
                
                <div className="flex items-center justify-between mt-1">
                  {headline.category && (
                    <span className={`text-xs font-medium ${categoryColors[headline.category] || 'text-gray-600 border-gray-600'} border-b`}>
                      {headline.category}
                    </span>
                  )}
                  
                  {headline.date && (
                    <span className="text-xs text-gray-500">
                      {new Date(headline.date).toLocaleDateString('ko-KR', {
                        month: 'short',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      
      {headlines.length > 4 && (
        <div className="mt-4 pt-3 border-t">
          <Link
            href="/news/headlines"
            className="text-sm text-blue-600 hover:text-blue-800 flex justify-center"
          >
            모든 헤드라인 보기
          </Link>
        </div>
      )}
    </div>
  );
} 
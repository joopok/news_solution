'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiBarChart2, FiEye, FiArrowRight } from 'react-icons/fi';
import { NewsItem, BestClickNewsProps } from '../types/types';

// 인기 순위 스타일 (1-3위 강조)
const getRankStyle = (index: number) => {
  const styles = [
    'bg-green-500 text-white', // 1위
    'bg-green-400 text-white', // 2위
    'bg-green-300 text-white', // 3위
  ];
  
  return index < 3 
    ? styles[index] 
    : 'bg-gray-200 text-gray-700';
};

/**
 * 베스트 클릭 뉴스 컴포넌트
 */
export default function BestClickNews({ news, period = 'day' }: BestClickNewsProps) {
  const [activePeriod, setActivePeriod] = useState<'day' | 'week' | 'month'>(period);
  const [displayNews, setDisplayNews] = useState<NewsItem[]>([]);
  
  // 기간별 데이터 필터링
  useEffect(() => {
    if (!news || news.length === 0) return;
    
    // 실제 구현에서는 API를 통해 기간별 데이터를 가져오거나 기존 데이터를 필터링합니다.
    // 여기서는 샘플 데이터를 기간별로 다르게 정렬하여 보여줍니다.
    const sortedNews = [...news].sort((a, b) => {
      // 일간 - 조회수 기준 내림차순
      if (activePeriod === 'day') return (b.views || 0) - (a.views || 0);
      // 주간 - 날짜 기준 내림차순 후 조회수 내림차순
      else if (activePeriod === 'week') {
        if (a.date === b.date) return (b.views || 0) - (a.views || 0);
        return a.date > b.date ? -1 : 1;
      }
      // 월간 - 카테고리 기준 오름차순 후 조회수 내림차순
      else {
        if (a.category === b.category) return (b.views || 0) - (a.views || 0);
        return (a.category || '') < (b.category || '') ? -1 : 1;
      }
    });
    
    setDisplayNews(sortedNews.slice(0, 5)); // 상위 5개만 표시
  }, [news, activePeriod]);
  
  // 기간 변경 처리
  const handlePeriodChange = (newPeriod: 'day' | 'week' | 'month') => {
    setActivePeriod(newPeriod);
  };
  
  // 데이터가 없을 때 메시지 표시
  if (!news || news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <h2 className="text-xl font-bold mb-4 pb-2 border-b">베스트 클릭 뉴스</h2>
        <div className="py-8 text-center">
          <p className="text-gray-500">표시할 베스트 클릭 뉴스가 없습니다</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-4 pb-2 border-b">
        <h2 className="text-xl font-bold text-green-700">베스트 클릭 뉴스</h2>
        <Link href="/news/best" className="text-sm text-green-600 hover:underline flex items-center">
          전체보기 <FiArrowRight className="ml-1" />
        </Link>
      </div>
      
      <div className="flex space-x-1 mb-4">
        <button
          onClick={() => handlePeriodChange('day')}
          className={`text-xs px-3 py-1 rounded ${
            activePeriod === 'day'
              ? 'bg-green-100 text-green-700 font-medium'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          일간
        </button>
        <button
          onClick={() => handlePeriodChange('week')}
          className={`text-xs px-3 py-1 rounded ${
            activePeriod === 'week'
              ? 'bg-green-100 text-green-700 font-medium'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          주간
        </button>
        <button
          onClick={() => handlePeriodChange('month')}
          className={`text-xs px-3 py-1 rounded ${
            activePeriod === 'month'
              ? 'bg-green-100 text-green-700 font-medium'
              : 'bg-gray-100 hover:bg-gray-200'
          }`}
        >
          월간
        </button>
      </div>
      
      {displayNews.length > 0 ? (
        <div>
          {displayNews.map((item, index) => (
            <Link key={item.id} href={`/news/${item.id}`}>
              <div className="flex items-center py-2 border-b last:border-b-0 hover:bg-gray-50 transition-colors">
                <div className={`w-6 h-6 flex items-center justify-center rounded-full ${getRankStyle(index)} mr-3 font-medium text-sm`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium line-clamp-1 group-hover:text-green-600">
                    {item.title}
                  </h3>
                  <div className="flex items-center text-xs text-gray-500 mt-1">
                    <span className="flex items-center">
                      <FiEye className="mr-1" size={12} />
                      {item.views?.toLocaleString() || 0}
                    </span>
                    {item.category && (
                      <>
                        <span className="mx-2">•</span>
                        <span>{item.category}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="py-6 text-center">
          <p className="text-gray-500">선택한 기간에 데이터가 없습니다</p>
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiEye, FiClock, FiArrowRight, FiTrendingUp } from 'react-icons/fi';
import { NewsItem, TrendingNewsProps } from '../types/types';

// 인기 순위 스타일 (1-3위 강조)
const getRankStyle = (index: number) => {
  const styles = [
    'bg-red-500 text-white', // 1위
    'bg-red-400 text-white', // 2위
    'bg-red-300 text-white', // 3위
  ];
  
  return index < 3 
    ? styles[index] 
    : 'bg-gray-200 text-gray-700';
};

/**
 * 실시간 인기 뉴스 컴포넌트
 */
export default function TrendingNews({ news }: TrendingNewsProps) {
  const [visibleNews, setVisibleNews] = useState<NewsItem[]>([]);
  const [fadeState, setFadeState] = useState<'in' | 'out'>('in');
  
  // 뉴스 데이터 설정
  useEffect(() => {
    if (!news || news.length === 0) return;
    
    // 조회수 기준 상위 10개 정렬
    const sortedNews = [...news]
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 10);
    
    setVisibleNews(sortedNews);
  }, [news]);
  
  // 10초마다 뉴스 순서 변경 (실제로는 새로운 데이터 패치)
  useEffect(() => {
    if (!visibleNews.length) return;
    
    const intervalId = setInterval(() => {
      // 페이드 아웃
      setFadeState('out');
      
      setTimeout(() => {
        // 뉴스 순서 변경 (실제로는 새 데이터 패치)
        setVisibleNews(prev => {
          const newList = [...prev];
          // 임의로 순서 변경 또는 실제 API 호출 결과 반영
          const temp = newList[0];
          newList[0] = newList[1];
          newList[1] = temp;
          return newList;
        });
        
        // 페이드 인
        setFadeState('in');
      }, 500);
    }, 10000);
    
    return () => clearInterval(intervalId);
  }, [visibleNews.length]);
  
  // 데이터가 없을 때 메시지 표시
  if (!news || news.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex items-center justify-between mb-4 pb-2 border-b">
          <h2 className="text-xl font-bold text-red-600 flex items-center">
            <FiTrendingUp className="mr-2" />
            실시간 인기 뉴스
          </h2>
        </div>
        <div className="py-8 text-center">
          <p className="text-gray-500">표시할 인기 뉴스가 없습니다</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <h2 className="text-xl font-bold text-red-600 flex items-center">
          <FiTrendingUp className="mr-2" />
          실시간 인기 뉴스
        </h2>
        <Link href="/news/trending" className="text-sm text-red-600 hover:underline flex items-center">
          전체보기 <FiArrowRight className="ml-1" />
        </Link>
      </div>
      
      <div className={`transition-opacity duration-500 ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}`}>
        {visibleNews.length > 0 ? (
          <div className="space-y-3">
            {visibleNews.slice(0, 7).map((item, index) => (
              <Link key={item.id} href={`/news/${item.id}`}>
                <div className="flex items-center hover:bg-gray-50 p-2 rounded-md transition-colors">
                  <div className={`w-6 h-6 flex items-center justify-center rounded-full ${getRankStyle(index)} mr-3 font-medium text-sm`}>
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium line-clamp-1 group-hover:text-red-600">
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
            <p className="text-gray-500">인기 뉴스 데이터를 로드 중입니다...</p>
          </div>
        )}
      </div>
    </div>
  );
} 
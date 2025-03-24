'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiArrowRight, FiClock } from 'react-icons/fi';
import { NewsItem } from '../types/types';

interface TrendingNewsProps {
  trendingNews?: any[];
}

const TrendingNews: React.FC<TrendingNewsProps> = ({ trendingNews = [] }) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  
  // 시간 업데이트 콜백 메모이제이션
  const updateTime = useCallback(() => {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    setCurrentTime(`${hours}:${minutes}`);
  }, []);
  
  // 컴포넌트 마운트 시 시간 업데이트 및 인터벌 설정
  useEffect(() => {
    updateTime();
    const interval = setInterval(updateTime, 60000); // 1분마다 업데이트
    
    return () => clearInterval(interval); // 클린업
  }, [updateTime]);
  
  // 뉴스 아이템 메모이제이션
  const newsItems = useMemo(() => {
    // 데이터가 없을 경우 더미 데이터 사용
    if (!trendingNews || trendingNews.length === 0) {
      return Array.from({ length: 10 }).map((_, idx) => ({
        id: idx,
        title: `트렌딩 뉴스 ${idx + 1}`,
        views: Math.floor(Math.random() * 1000) + 500
      }));
    }
    
    // 실제 뉴스 데이터 가공
    return trendingNews.slice(0, 10).map((news, idx) => ({
      id: news.id || idx,
      title: news.title || `트렌딩 뉴스 ${idx + 1}`,
      views: news.views || Math.floor(Math.random() * 1000) + 500
    }));
  }, [trendingNews]);
  
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden h-full">
      <div className="p-3 border-b border-gray-100 flex justify-between items-center">
        <h2 className="text-sm font-bold text-gray-800">실시간 트렌드</h2>
        <div className="flex items-center text-xs text-gray-500">
          <FiClock className="mr-1" size={12} />
          <span>{currentTime} 기준</span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-100">
        {newsItems.map((item, idx) => (
          <Link 
            href={`/news/${item.id}`} 
            key={`trend-${idx}`} 
            className="block p-3 hover:bg-blue-50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center 
                ${idx === 0 ? 'bg-red-500' : 
                 idx === 1 ? 'bg-orange-500' : 
                 idx === 2 ? 'bg-yellow-500' : 
                 'bg-gray-400'}`}
              >
                <span className="text-white text-xs font-bold">{idx + 1}</span>
              </div>
              <div className="flex-1 truncate">
                <p className="text-sm font-medium leading-tight truncate">{item.title}</p>
              </div>
              <div className="text-xs text-gray-500">{item.views.toLocaleString()}명</div>
            </div>
          </Link>
        ))}
      </div>
      
      <div className="p-3 border-t border-gray-100">
        <Link 
          href="/trending" 
          className="flex items-center justify-center text-xs text-blue-600 hover:text-blue-800 transition-colors"
        >
          더보기 <FiArrowRight className="ml-1" size={12} />
        </Link>
      </div>
    </div>
  );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(TrendingNews); 
'use client';

import Link from 'next/link';
import { FiBarChart2 } from 'react-icons/fi';
import { useMainDataQuery } from '../hooks/useMainDataQuery';
import SkeletonLoading from './SkeletonLoading';

export default function TrendingNewsClient() {
  const { data, isLoading, isError } = useMainDataQuery();
  const trendingNews = data?.data?.trendingNews || [];

  // 로딩 중일 때 스켈레톤 표시
  if (isLoading) return <SkeletonLoading type="trending" />;
  if (isError || !trendingNews.length) return null;

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="flex items-center justify-between mb-4 pb-2 border-b">
        <div className="flex items-center">
          <FiBarChart2 className="text-blue-600 mr-2" size={20} />
          <h2 className="text-lg font-bold">인기 뉴스</h2>
        </div>
      </div>

      <div className="space-y-2">
        {trendingNews.map((news, index) => (
          <Link href={`/news/${news.id}`} key={news.id} className="block">
            <div className="flex items-center group py-1 hover:bg-gray-50 rounded transition-colors">
              <div className="w-6 h-6 flex items-center justify-center rounded-full mr-3 bg-gray-200 text-sm font-medium">
                {index + 1}
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-medium line-clamp-1 group-hover:text-blue-600 transition-colors">
                  {news.title}
                  {news.hot && (
                    <span className="ml-2 bg-red-100 text-red-600 text-xs px-1 py-0.5 rounded">HOT</span>
                  )}
                </h3>
                <div className="flex items-center text-xs text-gray-500">
                  <span>조회 {news.views?.toLocaleString() || 0}</span>
                  <span className="mx-1">•</span>
                  <span>{news.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
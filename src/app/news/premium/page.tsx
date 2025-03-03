'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaCrown, FaClock, FaEye } from 'react-icons/fa';

// 더미 프리미엄 뉴스 데이터
const premiumNews = [
  {
    id: 1,
    category: '경제분석',
    title: '2024년 글로벌 경제 전망: AI 시대의 새로운 기회',
    summary: '세계 경제 전문가들이 전망하는 2024년 글로벌 경제 동향과 AI 산업의 영향력 분석',
    imageUrl: 'https://placehold.co/600x400/0066cc/white?text=경제분석',
    date: '2024-02-26',
    views: 5678,
  },
  {
    id: 2,
    category: '심층보도',
    title: '기후변화와 신재생에너지: 대한민국의 도전과 과제',
    summary: '기후변화 대응을 위한 한국의 신재생에너지 정책과 산업 현황에 대한 심층 분석',
    imageUrl: 'https://placehold.co/600x400/00cc66/white?text=심층보도',
    date: '2024-02-26',
    views: 4567,
  },
  {
    id: 3,
    category: '특별기획',
    title: '미래교육 혁신: 메타버스와 AI의 결합',
    summary: '교육 분야에서의 메타버스와 AI 기술 활용 현황과 미래 전망',
    imageUrl: 'https://placehold.co/600x400/cc6600/white?text=특별기획',
    date: '2024-02-26',
    views: 3456,
  },
  {
    id: 4,
    category: '전문가칼럼',
    title: '디지털 전환 시대의 기업 생존 전략',
    summary: '산업 전문가가 제시하는 디지털 전환 시대의 기업 혁신 방안',
    imageUrl: 'https://placehold.co/600x400/6600cc/white?text=전문가칼럼',
    date: '2024-02-26',
    views: 2345,
  },
  {
    id: 5,
    category: '글로벌리포트',
    title: '실리콘밸리 최신 트렌드: 테크 기업들의 새로운 도전',
    summary: '실리콘밸리 현지 취재를 통해 본 테크 기업들의 최신 동향과 미래 전략',
    imageUrl: 'https://placehold.co/600x400/cc0066/white?text=글로벌리포트',
    date: '2024-02-26',
    views: 1234,
  },
];

export default function PremiumNews() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '경제분석', '심층보도', '특별기획', '전문가칼럼', '글로벌리포트'];

  const filteredNews = selectedCategory === '전체' 
    ? premiumNews 
    : premiumNews.filter(news => news.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-4">
          <FaCrown className="mr-2 text-yellow-500" />
          프리미엄 뉴스
        </h1>
        <p className="text-gray-600">
          깊이 있는 분석과 전문가의 통찰력이 담긴 프리미엄 콘텐츠를 만나보세요.
        </p>
      </div>

      {/* 카테고리 필터 */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full transition-colors ${
              selectedCategory === category
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* 뉴스 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredNews.map((news) => (
          <div 
            key={news.id} 
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative h-48">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-0 left-0 bg-yellow-500 text-white px-3 py-1 m-2 rounded-full text-sm">
                {news.category}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 line-clamp-2">
                {news.title}
              </h2>
              <p className="text-gray-600 mb-4 line-clamp-2">
                {news.summary}
              </p>
              <div className="flex items-center text-sm text-gray-500">
                <FaClock className="mr-1" />
                <span className="mr-4">{news.date}</span>
                <FaEye className="mr-1" />
                <span>조회수 {news.views.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 
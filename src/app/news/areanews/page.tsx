'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaMapMarkerAlt, FaClock, FaEye } from 'react-icons/fa';

// 더미 지역 뉴스 데이터
const areaNews = [
  {
    id: 1,
    category: '서울',
    title: '서울시, 2024년 도시재생 프로젝트 본격 시작',
    summary: '서울시가 올해 도시재생 뉴딜사업을 통해 노후 주거지역 개선에 나섭니다.',
    imageUrl: 'https://placehold.co/600x400/0066cc/white?text=서울뉴스',
    date: '2024-02-26',
    views: 5678,
  },
  {
    id: 2,
    category: '부산',
    title: '부산 북항 재개발 사업 순항... 해양관광 중심지로 도약',
    summary: '부산 북항 재개발 사업이 순조롭게 진행되며 새로운 해양관광 중심지로 부상하고 있습니다.',
    imageUrl: 'https://placehold.co/600x400/00cc66/white?text=부산뉴스',
    date: '2024-02-26',
    views: 4567,
  },
  {
    id: 3,
    category: '대구',
    title: '대구 신청사 건립 본격화... 시민 편의시설 대폭 확충',
    summary: '대구시 신청사 건립이 본격화되면서 다양한 시민 편의시설이 들어설 예정입니다.',
    imageUrl: 'https://placehold.co/600x400/cc6600/white?text=대구뉴스',
    date: '2024-02-26',
    views: 3456,
  },
  {
    id: 4,
    category: '인천',
    title: '인천공항 제3터미널 개장... 여객 수용능력 대폭 증가',
    summary: '인천국제공항 제3터미널이 개장하며 연간 여객 수용능력이 크게 증가했습니다.',
    imageUrl: 'https://placehold.co/600x400/6600cc/white?text=인천뉴스',
    date: '2024-02-26',
    views: 2345,
  },
  {
    id: 5,
    category: '광주',
    title: '광주 인공지능 산업단지 조성 순항... IT기업 유치 활발',
    summary: '광주 인공지능 산업단지 조성이 순조롭게 진행되며 국내외 IT기업 유치가 활발히 이루어지고 있습니다.',
    imageUrl: 'https://placehold.co/600x400/cc0066/white?text=광주뉴스',
    date: '2024-02-26',
    views: 1234,
  },
];

export default function AreaNews() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '서울', '부산', '대구', '인천', '광주'];

  const filteredNews = selectedCategory === '전체' 
    ? areaNews 
    : areaNews.filter(news => news.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-4">
          <FaMapMarkerAlt className="mr-2 text-blue-600" />
          지역뉴스
        </h1>
        <p className="text-gray-600">
          전국 각 지역의 생생한 소식을 전해드립니다.
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
                ? 'bg-blue-600 text-white'
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
              <div className="absolute top-0 left-0 bg-blue-600 text-white px-3 py-1 m-2 rounded-full text-sm">
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
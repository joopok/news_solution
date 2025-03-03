'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaFilm, FaClock, FaEye } from 'react-icons/fa';

// 더미 연예 뉴스 데이터
const entertainmentNews = [
  {
    id: 1,
    category: '영화',
    title: '마블, 새로운 어벤져스 시리즈 제작 계획 발표',
    summary: '마블 스튜디오가 새로운 어벤져스 시리즈를 제작할 계획을 발표했습니다.',
    imageUrl: 'https://placehold.co/600x400/0066cc/white?text=영화뉴스',
    date: '2024-02-26',
    views: 5678,
  },
  {
    id: 2,
    category: '음악',
    title: '빌보드, 2024년 상반기 최고의 음악상 수상자 발표',
    summary: '빌보드가 2024년 상반기 최고의 음악상 수상자를 발표했습니다.',
    imageUrl: 'https://placehold.co/600x400/00cc66/white?text=음악뉴스',
    date: '2024-02-26',
    views: 4567,
  },
  {
    id: 3,
    category: 'TV/드라마',
    title: '넷플릭스, 새로운 한국 드라마 제작 계획 발표',
    summary: '넷플릭스가 새로운 한국 드라마를 제작할 계획을 발표했습니다.',
    imageUrl: 'https://placehold.co/600x400/cc6600/white?text=TV/드라마뉴스',
    date: '2024-02-26',
    views: 3456,
  },
  {
    id: 4,
    category: '연예인',
    title: '블랙핑크 제니, 새로운 솔로 앨범 발매 계획 발표',
    summary: '블랙핑크의 제니가 새로운 솔로 앨범을 발매할 계획을 발표했습니다.',
    imageUrl: 'https://placehold.co/600x400/6600cc/white?text=연예인뉴스',
    date: '2024-02-26',
    views: 2345,
  },
  {
    id: 5,
    category: '연예계',
    title: '한국 연예계, 새로운 윤리강령 발표',
    summary: '한국 연예계가 새로운 윤리강령을 발표했습니다.',
    imageUrl: 'https://placehold.co/600x400/cc0066/white?text=연예계뉴스',
    date: '2024-02-26',
    views: 1234,
  },
];

export default function EntertainmentNews() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '영화', '음악', 'TV/드라마', '연예인', '연예계'];

  const filteredNews = selectedCategory === '전체' 
    ? entertainmentNews 
    : entertainmentNews.filter(news => news.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-4">
          <FaFilm className="mr-2 text-blue-600" />
          연예뉴스
        </h1>
        <p className="text-gray-600">
          국내외 주요 연예 소식을 실시간으로 전달해드립니다.
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
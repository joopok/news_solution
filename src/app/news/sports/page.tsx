'use client';

import { useState } from 'react';
import { FaRunning, FaFootballBall, FaBasketballBall, FaBaseballBall, FaVolleyballBall, FaGolfBall } from 'react-icons/fa';
import Image from 'next/image';

// 더미 스포츠 뉴스 데이터
const sportsNews = [
  {
    id: 1,
    category: '축구',
    title: '손흥민, 프리미어리그 이달의 선수상 수상',
    summary: '토트넘의 손흥민이 맹활약을 펼치며 2월 프리미어리그 이달의 선수로 선정되었습니다.',
    imageUrl: 'https://placehold.co/600x400/0066cc/white?text=축구뉴스',
    date: '2024-02-26',
    views: 5678,
  },
  {
    id: 2,
    category: '야구',
    title: 'KBO 시범경기 개막, 각 구단 전력 점검 돌입',
    summary: '2024 KBO 시범경기가 시작되었습니다. 각 구단은 정규시즌을 앞두고 전력 점검에 나섭니다.',
    imageUrl: 'https://placehold.co/600x400/cc6600/white?text=야구뉴스',
    date: '2024-02-26',
    views: 4321,
  },
  {
    id: 3,
    category: '농구',
    title: 'KBL, 플레이오프 진출 경쟁 치열',
    summary: 'KBL 정규리그가 막바지로 향하는 가운데, 플레이오프 진출을 위한 각 팀의 경쟁이 치열해지고 있습니다.',
    imageUrl: 'https://placehold.co/600x400/00cc66/white?text=농구뉴스',
    date: '2024-02-26',
    views: 3456,
  }
];

// 스포츠 카테고리
const categories = [
  { icon: <FaFootballBall />, name: '축구' },
  { icon: <FaBaseballBall />, name: '야구' },
  { icon: <FaBasketballBall />, name: '농구' },
  { icon: <FaVolleyballBall />, name: '배구' },
  { icon: <FaGolfBall />, name: '골프' }
];

export default function SportsPage() {
  const [activeCategory, setActiveCategory] = useState('전체');

  return (
    <div className="container mx-auto px-4 py-6">
      {/* 헤더 */}
      <h1 className="text-2xl font-bold mb-6 pb-2 border-b border-gray-200 flex items-center">
        <FaRunning className="mr-2" />
        스포츠 뉴스
      </h1>

      {/* 카테고리 네비게이션 */}
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-full ${
            activeCategory === '전체' ? 'bg-blue-600 text-white' : 'bg-gray-100'
          }`}
          onClick={() => setActiveCategory('전체')}
        >
          전체
        </button>
        {categories.map((category) => (
          <button
            key={category.name}
            className={`px-4 py-2 rounded-full flex items-center space-x-2 ${
              activeCategory === category.name ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
            onClick={() => setActiveCategory(category.name)}
          >
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </button>
        ))}
      </div>

      {/* 뉴스 그리드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sportsNews.map((news) => (
          <div key={news.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="relative h-48">
              <Image
                src={news.imageUrl}
                alt={news.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded">
                {news.category}
              </div>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{news.title}</h2>
              <p className="text-gray-600 mb-4">{news.summary}</p>
              <div className="flex justify-between text-sm text-gray-500">
                <span>{news.date}</span>
                <span>조회수: {news.views}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

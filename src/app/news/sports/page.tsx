'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaRunning, FaClock, FaEye } from 'react-icons/fa';

// 더미 스포츠 뉴스 데이터
const sportsNews = [
  {
    id: 1,
    category: '축구',
    title: '손흥민, 프리미어리그 이달의 선수상 수상',
    summary: '토트넘 홋스퍼의 손흥민이 프리미어리그 2월 이달의 선수로 선정되었습니다.',
    imageUrl: 'https://placehold.co/600x400/0066cc/white?text=축구뉴스',
    date: '2024-02-26',
    views: 5678,
  },
  {
    id: 2,
    category: '야구',
    title: '류현진, MLB 복귀전서 5이닝 무실점 호투',
    summary: '토론토 블루제이스의 류현진이 복귀전에서 5이닝 무실점으로 호투하며 승리를 이끌었습니다.',
    imageUrl: 'https://placehold.co/600x400/00cc66/white?text=야구뉴스',
    date: '2024-02-26',
    views: 4567,
  },
  {
    id: 3,
    category: '농구',
    title: 'KBL, 올스타전 개최... 팬들과 함께하는 축제',
    summary: '한국프로농구(KBL) 올스타전이 성황리에 개최되었습니다. 다양한 이벤트로 팬들과 소통하는 시간을 가졌습니다.',
    imageUrl: 'https://placehold.co/600x400/cc6600/white?text=농구뉴스',
    date: '2024-02-26',
    views: 3456,
  },
  {
    id: 4,
    category: '배구',
    title: '여자배구 국가대표팀, 아시아선수권 금메달 획득',
    summary: '한국 여자배구 국가대표팀이 아시아선수권대회에서 우승을 차지했습니다.',
    imageUrl: 'https://placehold.co/600x400/6600cc/white?text=배구뉴스',
    date: '2024-02-26',
    views: 2345,
  },
  {
    id: 5,
    category: '골프',
    title: '김XX, LPGA 투어 시즌 첫 우승... 세계 랭킹 3위 도약',
    summary: '한국의 김XX 선수가 LPGA 투어에서 시즌 첫 우승을 차지하며 세계 랭킹 3위로 올라섰습니다.',
    imageUrl: 'https://placehold.co/600x400/cc0066/white?text=골프뉴스',
    date: '2024-02-26',
    views: 1234,
  },
];

export default function SportsNews() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '축구', '야구', '농구', '배구', '골프'];

  const filteredNews = selectedCategory === '전체' 
    ? sportsNews 
    : sportsNews.filter(news => news.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-4">
          <FaRunning className="mr-2 text-blue-600" />
          스포츠뉴스
        </h1>
        <p className="text-gray-600">
          국내외 주요 스포츠 소식을 실시간으로 전달해드립니다.
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
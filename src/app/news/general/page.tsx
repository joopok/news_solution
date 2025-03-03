'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaNewspaper, FaClock, FaEye } from 'react-icons/fa';

// 더미 뉴스 데이터
const newsItems = [
  {
    id: 1,
    category: '정치',
    title: '국회, 민생법안 처리 본격화... 여야 협력 모드',
    summary: '여야가 민생법안 처리를 위한 협력 모드에 돌입했습니다. 물가안정과 일자리 창출을 위한 주요 법안들이 논의될 예정입니다.',
    imageUrl: 'https://placehold.co/600x400/0066cc/white?text=정치뉴스',
    date: '2024-02-26',
    views: 1234,
  },
  {
    id: 2,
    category: '경제',
    title: '한국은행, 기준금리 동결 결정... 경기회복 기대감',
    summary: '한국은행 금융통화위원회가 기준금리를 현행 수준에서 동결하기로 결정했습니다. 물가안정과 경기회복의 균형을 고려한 결정으로 평가됩니다.',
    imageUrl: 'https://placehold.co/600x400/00cc66/white?text=경제뉴스',
    date: '2024-02-26',
    views: 2345,
  },
  {
    id: 3,
    category: '사회',
    title: '전국 미세먼지 저감 조치 시행... 시민 건강 보호 강화',
    summary: '환경부가 전국적으로 미세먼지 저감 조치를 시행합니다. 차량 2부제와 사업장 조업 단축 등 강화된 대책이 적용됩니다.',
    imageUrl: 'https://placehold.co/600x400/cc6600/white?text=사회뉴스',
    date: '2024-02-26',
    views: 3456,
  },
  {
    id: 4,
    category: '국제',
    title: '글로벌 기후변화 대응 정상회의 개최... 주요국 참여',
    summary: '전 세계 주요국 정상들이 참여하는 기후변화 대응 정상회의가 개최됩니다. 탄소중립 목표 달성을 위한 구체적 방안이 논의될 예정입니다.',
    imageUrl: 'https://placehold.co/600x400/6600cc/white?text=국제뉴스',
    date: '2024-02-26',
    views: 4567,
  },
  {
    id: 5,
    category: 'IT/과학',
    title: '차세대 인공지능 기술 개발 성공... 상용화 앞당겨',
    summary: '국내 연구진이 차세대 인공지능 기술 개발에 성공했습니다. 기존 대비 처리속도와 정확도가 크게 향상되어 다양한 산업 분야에 적용될 전망입니다.',
    imageUrl: 'https://placehold.co/600x400/cc0066/white?text=IT뉴스',
    date: '2024-02-26',
    views: 5678,
  },
];

export default function GeneralNews() {
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const categories = ['전체', '정치', '경제', '사회', '국제', 'IT/과학'];

  const filteredNews = selectedCategory === '전체' 
    ? newsItems 
    : newsItems.filter(news => news.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-4">
          <FaNewspaper className="mr-2 text-blue-600" />
          종합뉴스
        </h1>
        <p className="text-gray-600">
          정치, 경제, 사회 등 다양한 분야의 주요 뉴스를 한눈에 확인하세요.
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
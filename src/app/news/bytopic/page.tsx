'use client';

import { useState } from 'react';
import { FaNewspaper, FaGlobe, FaLandmark, FaChartLine, FaUsers, FaTheaterMasks, FaMicrochip, FaBell } from 'react-icons/fa';

// 주제별 뉴스 카테고리 데이터
const categories = [
  { id: 1, icon: <FaLandmark />, name: '정치', count: 127 },
  { id: 2, icon: <FaChartLine />, name: '경제', count: 156 },
  { id: 3, icon: <FaUsers />, name: '사회', count: 342 },
  { id: 4, icon: <FaGlobe />, name: '국제', count: 234 },
  { id: 5, icon: <FaTheaterMasks />, name: '문화', count: 78 },
  { id: 6, icon: <FaMicrochip />, name: 'IT/과학', count: 567 },
  { id: 7, icon: <FaBell />, name: '라이프', count: 89 },
];

// 더미 뉴스 데이터
const newsItems = [
  {
    id: 1,
    category: '정치',
    title: '국회, 주요 법안 처리 본격화... 여야 협상 진행 중',
    summary: '여야가 주요 민생법안 처리를 위한 협상을 진행하고 있습니다.',
    date: '2024-02-26',
    views: 1234,
  },
  {
    id: 2,
    category: '경제',
    title: '한국은행, 기준금리 동결 결정... 시장 반응은?',
    summary: '한국은행 금융통화위원회가 기준금리를 현행 수준에서 동결했습니다.',
    date: '2024-02-26',
    views: 2345,
  },
  {
    id: 3,
    category: '사회',
    title: '교육부, 새 학기 학교 안전대책 발표',
    summary: '새 학기를 맞아 학교 안전을 강화하기 위한 종합대책이 발표되었습니다.',
    date: '2024-02-26',
    views: 3456,
  },
];

export default function TopicNewsPage() {
  const [selectedCategory, setSelectedCategory] = useState('전체');

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-4">
          <FaNewspaper className="mr-2 text-blue-600" />
          주제별 뉴스
        </h1>
        <p className="text-gray-600">
          관심 있는 주제의 뉴스를 한눈에 확인하세요.
        </p>
      </div>

      {/* 카테고리 그리드 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`p-6 rounded-lg shadow-lg cursor-pointer transition-all ${
              selectedCategory === category.name
                ? 'bg-blue-600 text-white'
                : 'bg-white hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl">{category.icon}</span>
              <span className="text-sm font-medium">{category.count}건</span>
            </div>
            <h3 className="text-lg font-bold">{category.name}</h3>
          </div>
        ))}
      </div>

      {/* 뉴스 목록 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">최신 뉴스</h2>
          <select 
            className="border rounded-lg px-4 py-2"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="전체">전체</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {newsItems.map((news) => (
            <div key={news.id} className="border-b pb-6 last:border-b-0">
              <div className="flex justify-between items-start mb-2">
                <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm">
                  {news.category}
                </span>
                <span className="text-sm text-gray-500">
                  조회수 {news.views.toLocaleString()}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-2 hover:text-blue-600 cursor-pointer">
                {news.title}
              </h3>
              <p className="text-gray-600 mb-2">{news.summary}</p>
              <span className="text-sm text-gray-500">{news.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

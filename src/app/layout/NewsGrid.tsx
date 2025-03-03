'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiCalendar, FiEye } from 'react-icons/fi';
import { FaAngleRight } from 'react-icons/fa';
import { NewsItem, NewsGridProps } from '../types/types';
import { useMainData } from '../hooks/useMainData';
import SkeletonLoading from '../components/SkeletonLoading';

// 카테고리별 뉴스 샘플 데이터
const sampleNewsData: Record<string, NewsItem[]> = {
  "주요뉴스": [
    {
      id: 1,
      title: '뉴질랜드서 5억년전 장미모양 해양동물 발견 지금까지 보지 못한 구조',
      summary: '뉴질랜드 한 섬의 고생대암석층에서 장미모양 해양동물 화석발견해외 사이언스지에 따르면, 뉴질랜드 한 섬에서 4억년전 바다에서 살았던 기이한 장미모양의 해양동물화석을 발견했다고 보고했다.',
      category: '과학',
      image: 'https://placehold.co/400x250/0066cc/white?text=뉴스이미지1',
      date: '2025.02.24',
      views: 1245,
      reporter: '김과학 기자'
    },
    {
      id: 2,
      title: '대박의 꿈~ 라스베가스~',
      summary: '욕망의 도시 라스베가스...대박의 꿈을 꾸다...성수기를 앞두고 있지만, 항공권을 낮추어 고객유치를 올리고 있다.',
      category: '세계',
      image: 'https://placehold.co/400x250/cc3300/white?text=뉴스이미지2',
      date: '2025.02.23',
      views: 932,
      reporter: '홍여행 기자'
    },
    {
      id: 3,
      title: '물속에서 헤엄치는 로봇물고기',
      summary: '시대가 시대이니 만큼 물속에서 헤엄치는 물고기 로봇도 나왔습니다. 형태나 움직임도 거의 물고기와 흡사하며 물밖에선 가만히 있지만 물속에 넣으면 자동으로 움직입니다.',
      category: 'IT.과학',
      image: 'https://placehold.co/400x250/9900cc/white?text=뉴스이미지3',
      date: '2025.02.22',
      views: 1754,
      reporter: '정테크 기자'
    },
    {
      id: 4,
      title: '미국의 캘리포니아 주 샌프란시스코의 서쪽 해안에 위치한 오션 비치를 찾아서',
      summary: '미국 캘리포니아 주 샌프란시스코의 서쪽 해안에 위치한 오션 비치는 차가운 심해수가 흐르는 해안으로 연안류가 빠르게 움직인다.',
      category: '여행/레져',
      image: 'https://placehold.co/400x250/006633/white?text=뉴스이미지4',
      date: '2025.02.21',
      views: 843,
      reporter: '이여행 기자'
    },
    {
      id: 5,
      title: '국내 반도체 산업 호황, 수출 실적 2년 만에 최고치 기록',
      summary: '국내 반도체 산업이 지난해 4분기부터 회복세를 보이며 수출 실적이 2년 만에 최고치를 기록했다.',
      category: '경제',
      image: 'https://placehold.co/400x250/009999/white?text=뉴스이미지5',
      date: '2025.02.20',
      views: 1122,
      reporter: '박경제 기자'
    },
    {
      id: 6,
      title: '새로운 배터리 기술 개발, 전기차 주행거리 2배 늘어날 전망',
      summary: '국내 연구진이 개발한 신소재를 활용한 배터리 기술로 전기차 주행거리가 현재보다 2배 가량 늘어날 것으로 전망된다.',
      category: '기술',
      image: 'https://placehold.co/400x250/3366cc/white?text=뉴스이미지6',
      date: '2025.02.19',
      views: 967,
      reporter: '최기술 기자'
    }
  ],
  "사회": [
    {
      id: 101,
      title: '환경부, 탄소중립 실현 위한 신규 정책 발표',
      category: '사회',
      image: 'https://placehold.co/400x250/006633/white?text=사회뉴스1',
      date: '2025.02.24',
      views: 546,
      reporter: '김사회 기자'
    },
    {
      id: 102,
      title: '교육부, 디지털 리터러시 교육 강화 계획 발표',
      category: '사회',
      image: 'https://placehold.co/400x250/006633/white?text=사회뉴스2',
      date: '2025.02.23',
      views: 432,
      reporter: '이교육 기자'
    },
    {
      id: 103,
      title: '도시재생 프로젝트, 지역경제 활성화에 기여',
      category: '사회',
      image: 'https://placehold.co/400x250/006633/white?text=사회뉴스3',
      date: '2025.02.22',
      views: 389,
      reporter: '박도시 기자'
    }
  ],
  "경제": [
    {
      id: 201,
      title: '국내 반도체 산업 호황, 수출 실적 2년 만에 최고치 기록',
      category: '경제',
      image: 'https://placehold.co/400x250/0066cc/white?text=경제뉴스1',
      date: '2025.02.24',
      views: 876,
      reporter: '김경제 기자'
    },
    {
      id: 202,
      title: '2025년 부동산 시장 전망, 전문가들이 예측하는 가격 변화',
      category: '경제',
      image: 'https://placehold.co/400x250/0066cc/white?text=경제뉴스2',
      date: '2025.02.23',
      views: 765,
      reporter: '이부동산 기자'
    },
    {
      id: 203,
      title: '신흥국 경제 성장세, 글로벌 투자자들 주목',
      category: '경제',
      image: 'https://placehold.co/400x250/0066cc/white?text=경제뉴스3',
      date: '2025.02.22',
      views: 542,
      reporter: '박투자 기자'
    }
  ]
};

// 카테고리별 색상 매핑
const categoryColors: Record<string, string> = {
  "과학": "bg-purple-600",
  "세계": "bg-blue-600",
  "IT.과학": "bg-purple-600",
  "여행/레져": "bg-green-600",
  "경제": "bg-yellow-600",
  "기술": "bg-indigo-600",
  "사회": "bg-red-600",
  "정치": "bg-orange-600",
  "문화": "bg-pink-600",
  "스포츠": "bg-green-600"
};

// 카테고리별 헤더 색상
const headerColors: Record<string, string> = {
  "주요뉴스": "text-blue-700 border-blue-600",
  "사회": "text-red-700 border-red-600",
  "경제": "text-yellow-700 border-yellow-600",
  "정치": "text-orange-700 border-orange-600",
  "문화": "text-pink-700 border-pink-600",
  "스포츠": "text-green-700 border-green-600"
};

/**
 * 카테고리별 뉴스 그리드 컴포넌트
 */
export default function NewsGrid({ 
  category, 
  limit = 6,
  emptyMessage 
}: NewsGridProps) {
  const { data, isLoading, error } = useMainData();
  const [news, setNews] = useState<NewsItem[]>([]);
  
  // 카테고리별 뉴스 데이터 설정
  useEffect(() => {
    if (data?.categoryNews && data.categoryNews[category]) {
      setNews(data.categoryNews[category].slice(0, limit));
    }
  }, [data, category, limit]);
  
  // 로딩 중일 때 스켈레톤 표시
  if (isLoading) {
    return <SkeletonLoading 
      type="content" 
      rows={3} 
      message={`${category} 뉴스를 불러오고 있습니다...`}
      showMessage={true}
    />;
  }
  
  // 에러 발생 시 메시지 표시
  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
        <h3 className="text-lg font-bold mb-2">{category}</h3>
        <p className="text-red-600">데이터를 불러오는데 실패했습니다.</p>
      </div>
    );
  }
  
  // 데이터가 없을 때 메시지 표시
  if (!news || news.length === 0) {
    const defaultEmptyMessage = `${category} 카테고리에 뉴스가 없습니다.`;
    
    return (
      <div className="bg-gray-50 border border-gray-200 rounded-md p-4 text-center">
        <h3 className="text-lg font-bold mb-2">{category}</h3>
        <p className="text-gray-600">{emptyMessage || defaultEmptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className={`text-xl font-bold ${headerColors[category] || 'text-gray-800'}`}>{category}</h3>
        <Link href={`/news/category/${category.toLowerCase()}`} className="text-blue-600 hover:underline flex items-center text-sm">
          더보기 <FaAngleRight className="ml-1" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {news.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} className="group">
            <div className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
              {item.imageUrl && (
                <div className="w-20 h-16 overflow-hidden rounded flex-shrink-0">
                  <img 
                    src={item.imageUrl} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div>
                <h4 className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h4>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  {item.date && <span className="mr-2">{item.date}</span>}
                  {item.views && <span>조회 {item.views.toLocaleString()}</span>}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
} 
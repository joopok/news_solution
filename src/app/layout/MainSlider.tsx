'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { SlideItem, MainSliderProps } from '../types/types';

// 샘플 슬라이드 데이터
const defaultSlides: SlideItem[] = [
  {
    id: 1,
    title: '뉴질랜드서 5억년전 장미모양 해양동물 발견 지금까지 보지 못한 구조',
    summary: '뉴질랜드 한 섬의 고생대암석층에서 장미모양 해양동물 화석발견...',
    image: 'https://placehold.co/1200x600/0066cc/white?text=메인+슬라이드+1',
    category: '과학',
    link: '/news/1'
  },
  {
    id: 2,
    title: '대박의 꿈~ 라스베가스~',
    summary: '욕망의 도시 라스베가스...대박의 꿈을 꾸다...성수기를 앞두고 있지만, 항공권을 낮추어 고객유치를 올리고 있다.',
    image: 'https://placehold.co/1200x600/cc3300/white?text=메인+슬라이드+2',
    category: '세계',
    link: '/news/2'
  },
  {
    id: 3,
    title: '물속에서 헤엄치는 로봇물고기',
    summary: '시대가 시대이니 만큼 물속에서 헤엄치는 물고기 로봇도 나왔습니다. 형태나 움직임도 거의 물고기와 흡사하며 물밖에선 가만히 있지만 물속에 넣으면 자동으로 움직입니다.',
    image: 'https://placehold.co/1200x600/9900cc/white?text=메인+슬라이드+3',
    category: 'IT.과학',
    link: '/news/3'
  },
  {
    id: 4,
    title: '미국의 캘리포니아 주 샌프란시스코의 서쪽 해안에 위치한 오션 비치를 찾아서',
    summary: '미국 캘리포니아 주 샌프란시스코의 서쪽 해안에 위치한 오션 비치는 차가운 심해수가 흐르는 해안으로 연안류가 빠르게 움직인다.',
    image: 'https://placehold.co/1200x600/006633/white?text=메인+슬라이드+4',
    category: '여행/레져',
    link: '/news/4'
  },
  {
    id: 5,
    title: '국내 반도체 산업 호황, 수출 실적 2년 만에 최고치 기록',
    summary: '국내 반도체 산업이 지난해 4분기부터 회복세를 보이며 수출 실적이 2년 만에 최고치를 기록했다.',
    image: 'https://placehold.co/1200x600/009999/white?text=메인+슬라이드+5',
    category: '경제',
    link: '/news/5'
  }
];

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

export default function MainSlider({ slides = defaultSlides }: MainSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // 다음 슬라이드로 이동
  const nextSlide = useCallback(() => {
    setActiveIndex((current) => (current === slides.length - 1 ? 0 : current + 1));
  }, [slides.length]);
  
  // 이전 슬라이드로 이동
  const prevSlide = useCallback(() => {
    setActiveIndex((current) => (current === 0 ? slides.length - 1 : current - 1));
  }, [slides.length]);
  
  // 특정 슬라이드로 이동
  const goToSlide = (index: number) => {
    setActiveIndex(index);
    setAutoplay(false); // 수동 이동 시 자동 재생 중지
  };
  
  // 자동 슬라이드 설정
  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // 5초마다 슬라이드 변경
    
    return () => clearInterval(interval);
  }, [nextSlide, autoplay]);
  
  // 마우스 이벤트 핸들러 (마우스 오버 시 자동 재생 중지)
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  // 데이터가 없을 때 메시지 표시
  if (!slides || slides.length === 0) {
    return (
      <div className="relative w-full h-[400px] bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
        <div className="text-center p-6">
          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17l4-4-4-4m6 8l4-4-4-4" />
          </svg>
          <h3 className="mt-2 text-lg font-medium text-gray-900">표시할 슬라이드가 없습니다</h3>
          <p className="mt-1 text-sm text-gray-500">현재 표시할 슬라이드 콘텐츠가 없습니다. 나중에 다시 확인해주세요.</p>
        </div>
      </div>
    );
  }
  
  // 현재 활성화된 슬라이드
  const activeSlide = slides[activeIndex];
  
  return (
    <div 
      className="relative w-full h-[400px] bg-black rounded-lg overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* 현재 슬라이드 */}
      <div className="absolute inset-0 transition-opacity duration-500 z-10">
        <div className="relative w-full h-full">
          <Image
            src={activeSlide.image}
            alt={activeSlide.title}
            priority
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 75vw"
            className="object-cover object-center opacity-80"
          />
          
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-10" />
          
          {/* 슬라이드 컨텐츠 */}
          <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
            {activeSlide.category && (
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-3 ${categoryColors[activeSlide.category] || 'bg-gray-600'}`}>
                {activeSlide.category}
              </span>
            )}
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 line-clamp-2">{activeSlide.title}</h2>
            <p className="text-gray-200 text-sm sm:text-base mb-4 line-clamp-2">{activeSlide.summary}</p>
            <Link 
              href={activeSlide.link || '#'}
              className="inline-block bg-white hover:bg-gray-100 text-gray-900 font-medium px-4 py-2 rounded-md transition-colors"
            >
              자세히 보기
            </Link>
          </div>
        </div>
      </div>
      
      {/* 네비게이션 버튼 */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center z-30 backdrop-blur-sm transition-colors"
        onClick={prevSlide}
        aria-label="이전 슬라이드"
      >
        <FiChevronLeft size={24} className="text-white" />
      </button>
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-white/30 hover:bg-white/50 rounded-full flex items-center justify-center z-30 backdrop-blur-sm transition-colors"
        onClick={nextSlide}
        aria-label="다음 슬라이드"
      >
        <FiChevronRight size={24} className="text-white" />
      </button>
      
      {/* 인디케이터 */}
      <div className="absolute bottom-4 right-6 flex space-x-2 z-30">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === activeIndex ? 'bg-white' : 'bg-white/40 hover:bg-white/60'
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`${index + 1}번 슬라이드로 이동`}
          />
        ))}
      </div>
    </div>
  );
} 
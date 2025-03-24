'use client';

import React, { useState, useCallback, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { NewsItem } from '../types/types';

interface MainSliderProps {
  news: NewsItem[];
}

const MainSlider: React.FC<MainSliderProps> = ({ news }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const totalSlides = news?.length || 0;

  // 슬라이드 변경 핸들러 메모이제이션
  const handleSlideChange = useCallback((swiper: any) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  // 배너 데이터 메모이제이션
  const sliderItems = useMemo(() => {
    // 데이터가 없을 경우 더미 데이터
    if (!news || news.length === 0) {
      return Array.from({ length: 3 }).map((_, idx) => ({
        id: idx,
        imageUrl: `/placeholder-${idx + 1}.jpg`,
        title: `배너 ${idx + 1}`,
        description: '배너 설명이 여기에 표시됩니다.',
        url: '#'
      }));
    }
    
    // 실제 배너 데이터 반환
    return news;
  }, [news]);

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isAutoPlay && totalSlides > 0) {
      timer = setInterval(nextSlide, 5000);
    }
    return () => clearInterval(timer);
  }, [isAutoPlay, nextSlide, totalSlides]);

  if (!news || news.length === 0) return null;

  return (
    <div className="relative bg-white rounded-lg shadow-sm overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onSlideChange={handleSlideChange}
        className="mainSlider"
      >
        {sliderItems.map((item, idx) => (
          <SwiperSlide key={`slide-${idx}`}>
            <Link href={item.url || '#'}>
              <div className="relative aspect-[16/9] w-full">
                <Image
                  src={item.imageUrl || `/placeholder-${idx + 1}.jpg`}
                  alt={item.title || `슬라이드 ${idx + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority={idx < 2} // 처음 두 개 이미지는 우선 로드
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex flex-col justify-end p-4">
                  <h2 className="text-white text-base sm:text-lg font-bold mb-1">{item.title}</h2>
                  <p className="text-white/90 text-sm line-clamp-2">{item.description}</p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* 슬라이드 카운터 */}
      <div className="absolute top-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-10">
        <span className="font-bold">{activeIndex + 1}</span>
        <span className="mx-1">/</span>
        <span>{sliderItems.length}</span>
      </div>

      {/* 컨트롤 버튼 */}
      <div className="absolute bottom-4 right-4 flex items-center space-x-2 bg-black/50 rounded-full px-3 py-1">
        <button
          onClick={() => setIsAutoPlay(!isAutoPlay)}
          className="text-white text-sm px-2"
        >
          {isAutoPlay ? '■' : '▶'}
        </button>
        <div className="text-white text-sm">
          {activeIndex + 1} / {totalSlides}
        </div>
        <button
          onClick={prevSlide}
          className="text-white hover:text-gray-300 p-1"
        >
          <FiChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="text-white hover:text-gray-300 p-1"
        >
          <FiChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(MainSlider); 
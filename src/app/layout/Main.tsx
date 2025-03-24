'use client';

import React, { useRef, useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMainData } from '../hooks/useMainData';
import { FiChevronRight, FiHeart, FiMessageCircle, FiBookmark } from 'react-icons/fi';
// Swiper 관련 import
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// 동적 임포트로 변경
const TrendingNews = dynamic(() => import('./TrendingNews'), {
  loading: () => <div className="bg-white rounded-lg shadow-sm p-3 h-[300px] animate-pulse"></div>,
  ssr: false
});

const MainSlider = dynamic(() => import('./MainSlider'), {
  loading: () => <div className="bg-white rounded-lg shadow-sm p-3 h-[300px] animate-pulse"></div>,
  ssr: false
});

const PollContents = dynamic(() => import('./PollContents'), {
  loading: () => <div className="bg-white rounded-lg shadow-sm p-3 h-[200px] animate-pulse"></div>,
  ssr: true
});

// 로딩 스켈레톤 컴포넌트
const NewsSkeleton = () => (
  <div className="animate-pulse bg-white rounded-lg shadow-sm overflow-hidden">
    <div className="h-32 bg-gray-200"></div>
    <div className="p-3">
      <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const pressLogos = {
  '헤럴드경제': '/press/placeholder.svg',
  '조선일보': '/press/placeholder.svg',
  '매일경제': '/press/placeholder.svg',
  '파이낸셜뉴스': '/press/placeholder.svg',
  '아시아경제': '/press/placeholder.svg',
  '한국경제': '/press/placeholder.svg',
  '조선비즈': '/press/placeholder.svg',
  '머니투데이': '/press/placeholder.svg',
  '서울경제': '/press/placeholder.svg'
};

// 메인 컴포넌트
const Main = () => {
  const { data, isLoading, error } = useMainData();

  // 데이터 메모이제이션
  const mainData = useMemo(() => {
    if (!data) return null;
    return data.data;
  }, [data]);

  // 에러 핸들링 콜백 메모이제이션
  const handleRetry = useCallback(() => {
    window.location.reload();
  }, []);

  // 로딩 상태 렌더링
  if (isLoading) {
    return (
      <div className="bg-[#f7f7f7] py-3">
        <div className="container mx-auto max-w-[1200px] px-2">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
            {Array(3).fill(0).map((_, idx) => (
              <NewsSkeleton key={`skeleton-${idx}`} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 에러 상태 렌더링
  if (error || !mainData) {
    return (
      <div className="bg-[#f7f7f7] py-3">
        <div className="container mx-auto max-w-[1200px] px-2">
          <div className="bg-white rounded-lg shadow-sm p-6 text-center">
            <h2 className="text-lg font-bold text-red-600 mb-2">오류가 발생했습니다</h2>
            <p className="text-gray-600 mb-4">데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
            <button 
              onClick={handleRetry}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              다시 시도
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* 메인 컨텐츠 영역 */}
      <div className="bg-[#f7f7f7] py-3">
        <div className="container mx-auto max-w-[1200px] px-2">
          {/* 메인 컨텐츠 */}
          <div className="flex flex-row flex-wrap gap-3">
            {/* 헤럴드경제 뉴스 카드, 실시간 TV 뉴스, 헤드라인 뉴스를 가로로 배치 */}
            <div className="flex flex-row flex-wrap justify-between w-full">
              {/* 헤럴드경제 뉴스 카드 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[calc(33.333%-0.5rem)]">
                <div className="p-3">
                  {/* 헤더 부분 */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden border border-gray-100 flex items-center justify-center bg-white">
                        <Image 
                          src="/press/herald_logo.png" 
                          alt="헤럴드경제" 
                          width={36} 
                          height={36} 
                          className="object-contain"
                        />
                      </div>
                      <div>
                        <h2 className="font-bold text-lg">헤럴드경제</h2>
                        <div className="flex items-center">
                          <div className="bg-pink-500 text-white text-xs px-2 py-0.5 rounded-full flex items-center mr-2">
                            <span className="mr-0.5">★</span>
                            <span>400만</span>
                          </div>
                          <span className="text-xs text-gray-500">03월 23일 22:47</span>
                        </div>
                      </div>
                    </div>
                    <button className="text-gray-400 p-1">
                      <div className="flex flex-col items-center justify-center gap-0.5">
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                        <div className="w-1 h-1 rounded-full bg-gray-400"></div>
                      </div>
                    </button>
                  </div>
                  
                  {/* 탭 메뉴 */}
                  <div className="flex border-b border-gray-200 mb-4">
                    <button className="text-lg font-bold pb-2 border-b-2 border-black flex-1 text-center">
                      주요뉴스
                    </button>
                    <button className="text-lg text-gray-400 pb-2 flex-1 text-center">
                      헤럴드뷰
                    </button>
                  </div>
                  
                  {/* 뉴스 리스트 */}
                  <div className="space-y-4 mb-5">
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-base font-bold mb-1">"홀플러스로 먹고 살았는데"...철수 공포에 숨죽인 'Z'들</h3>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-base font-bold mb-1">세탁기에 빨간 '37분간의 성폭행'...범행 부인 20대, 결국</h3>
                    </div>
                    <div className="border-b border-gray-100 pb-4">
                      <h3 className="text-base font-bold mb-1">"엄마 때문에 여장" 배우금 마초맨의 충격 비밀...위대한 유산도</h3>
                    </div>
                    <div className="pb-4">
                      <h3 className="text-base font-bold mb-1">최여진, 7세 연상 등신과 결혼...오랜 친구서 부부로</h3>
                    </div>
                  </div>
                  
                  {/* 썸네일 뉴스 */}
                  <div className="grid grid-cols-2 gap-4 mb-5">
                    <div>
                      <div className="aspect-[4/3] bg-gray-100 rounded-md overflow-hidden mb-2">
                        <Image 
                          src="/news/article1.jpg" 
                          alt="뉴스 이미지" 
                          width={120} 
                          height={90} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-sm font-bold leading-tight">"100% 망할 줄 알았는데" 쓸아지는 '소름' 충격......</h3>
                    </div>
                    <div>
                      <div className="aspect-[4/3] bg-gray-100 rounded-md overflow-hidden mb-2">
                        <Image 
                          src="/news/article2.jpg" 
                          alt="뉴스 이미지" 
                          width={120} 
                          height={90} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="text-sm font-bold leading-tight">"10초라니" 男선기 달고 여자육상 1등... "말도 안...</h3>
                    </div>
                  </div>
                  
                  {/* 카테고리 뉴스 */}
                  <div className="mb-5">
                    <Swiper
                      modules={[Navigation, Pagination]}
                      spaceBetween={10}
                      slidesPerView={2}
                      navigation
                      pagination={{ clickable: true }}
                      className="category-news-swiper"
                    >
                      <SwiperSlide>
                        <div className="bg-gray-50 rounded-lg p-2 w-[200px] h-[80px] flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium px-1 py-0.5 rounded-sm bg-blue-100 text-blue-600">이슈</span>
                            <span className="text-sm font-bold">탄핵정국</span>
                            <FiChevronRight size={16} className="text-gray-400 ml-auto" />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                              <Image 
                                src="/news/article3.jpg" 
                                alt="뉴스 이미지" 
                                width={32} 
                                height={32} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold line-clamp-2">박찬대 "쌀대행 탄핵정치 개시..."</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      
                      <SwiperSlide>
                        <div className="bg-gray-50 rounded-lg p-2 w-[200px] h-[80px] flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium px-1 py-0.5 rounded-sm bg-blue-100 text-blue-600">이슈</span>
                            <span className="text-sm font-bold">트럼프</span>
                            <FiChevronRight size={16} className="text-gray-400 ml-auto" />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                              <Image 
                                src="/news/article4.jpg" 
                                alt="뉴스 이미지" 
                                width={32} 
                                height={32} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold line-clamp-2">트럼프 "미국 제조업 회해..."</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      
                      <SwiperSlide>
                        <div className="bg-gray-50 rounded-lg p-2 w-[200px] h-[80px] flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium px-1 py-0.5 rounded-sm bg-green-100 text-green-600">경제</span>
                            <span className="text-sm font-bold">증시</span>
                            <FiChevronRight size={16} className="text-gray-400 ml-auto" />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                              <Image 
                                src="/news/article5.jpg" 
                                alt="뉴스 이미지" 
                                width={32} 
                                height={32} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold line-clamp-2">코스피, 외국인 매수에 상승...</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      
                      <SwiperSlide>
                        <div className="bg-gray-50 rounded-lg p-2 w-[200px] h-[80px] flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium px-1 py-0.5 rounded-sm bg-green-100 text-green-600">경제</span>
                            <span className="text-sm font-bold">부동산</span>
                            <FiChevronRight size={16} className="text-gray-400 ml-auto" />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                              <Image 
                                src="/news/article6.jpg" 
                                alt="뉴스 이미지" 
                                width={32} 
                                height={32} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold line-clamp-2">서울 아파트값 8개월 만에...</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      
                      <SwiperSlide>
                        <div className="bg-gray-50 rounded-lg p-2 w-[200px] h-[80px] flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium px-1 py-0.5 rounded-sm bg-amber-100 text-amber-600">사회</span>
                            <span className="text-sm font-bold">의료</span>
                            <FiChevronRight size={16} className="text-gray-400 ml-auto" />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                              <Image 
                                src="/news/article7.jpg" 
                                alt="뉴스 이미지" 
                                width={32} 
                                height={32} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold line-clamp-2">의대 정원 갈등, 전공의들...</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                      
                      <SwiperSlide>
                        <div className="bg-gray-50 rounded-lg p-2 w-[200px] h-[80px] flex flex-col">
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-xs font-medium px-1 py-0.5 rounded-sm bg-amber-100 text-amber-600">사회</span>
                            <span className="text-sm font-bold">교육</span>
                            <FiChevronRight size={16} className="text-gray-400 ml-auto" />
                          </div>
                          <div className="flex items-center gap-2 flex-1">
                            <div className="w-8 h-8 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                              <Image 
                                src="/news/article8.jpg" 
                                alt="뉴스 이미지" 
                                width={32} 
                                height={32} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs font-bold line-clamp-2">교육부, 내년 교사 증원...</p>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    </Swiper>
                    
                    <style jsx global>{`
                      .category-news-swiper {
                        --swiper-navigation-size: 20px;
                        --swiper-theme-color: #3b82f6;
                        --swiper-navigation-sides-offset: 5px;
                        padding: 0 20px;
                        margin: 0 -10px;
                      }
                      .category-news-swiper .swiper-pagination {
                        position: relative;
                        margin-top: 10px;
                        bottom: 0;
                      }
                      .category-news-swiper .swiper-pagination-bullet {
                        width: 6px;
                        height: 6px;
                      }
                    `}</style>
                  </div>
                  
                  {/* 푸터 */}
                  <div className="mt-auto pt-3 border-t border-gray-200">
                    <div className="flex justify-between items-center">
                      <div className="font-bold text-sm">헤럴드경제</div>
                      <div className="flex gap-2 text-xs text-gray-500">
                        <span>경제</span>
                        <span>|</span>
                        <span>랭킹</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 실시간 TV 뉴스 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[calc(33.333%-0.5rem)]">
                <div className="p-3 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-800">실시간 TV 뉴스</h2>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-3 gap-2">
                    <div className="bg-black rounded-md overflow-hidden aspect-video relative flex items-center justify-center group">
                      <Image src="/news/kbs_logo.png" alt="KBS" width={40} height={20} className="z-10" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <span className="absolute top-1 left-1 text-white text-xs font-bold bg-red-600 px-1 rounded">LIVE</span>
                      <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-r-0 border-solid border-transparent border-l-white ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-orange-500 rounded-md overflow-hidden aspect-video relative flex items-center justify-center group">
                      <span className="text-white text-xs font-bold z-10">채널A</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute inset-0 bg-orange-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-r-0 border-solid border-transparent border-l-white ml-1"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-blue-600 rounded-md overflow-hidden aspect-video relative flex items-center justify-center group">
                      <span className="text-white text-xs font-bold z-10">MBC</span>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <div className="absolute inset-0 bg-indigo-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
                          <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-r-0 border-solid border-transparent border-l-white ml-1"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* 헤드라인 뉴스 */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden w-[calc(33.333%-0.5rem)]">
                <div className="p-3 border-b border-gray-100">
                  <h2 className="text-sm font-bold text-gray-800">헤드라인 뉴스</h2>
                </div>
                <div className="p-3">
                  <div className="grid grid-cols-1 gap-3">
                    {/* 메인 헤드라인 */}
                    <div className="bg-gradient-to-r from-blue-50 to-white p-3 rounded-md">
                      <div className="flex items-center mb-1.5">
                        <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center mr-2">
                          <span className="text-white text-xs font-bold">1</span>
                        </div>
                        <div className="text-xs text-gray-500 flex items-center">
                          <span className="font-medium">한겨레</span>
                          <span className="mx-1">·</span>
                          <span>5분 전</span>
                        </div>
                      </div>
                      <h3 className="text-base font-bold leading-tight mb-2">"윤석열만 믿는다"...군 복무 중 방위비 증액?</h3>
                      <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                        정부가 미군 주둔 비용을 늘리는 '방위비 분담협정'에 합의한 가운데, 국방부는 상세한 협상 내용 공개를 미루고 있어 비판이 제기되고 있습니다.
                      </p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <button className="flex items-center text-xs text-gray-500 hover:text-blue-500">
                            <FiHeart className="mr-1" size={12} />
                            <span>123</span>
                          </button>
                          <button className="flex items-center text-xs text-gray-500 hover:text-blue-500">
                            <FiMessageCircle className="mr-1" size={12} />
                            <span>89</span>
                          </button>
                        </div>
                        <Link href="#" className="text-xs text-blue-600 hover:underline">자세히 보기</Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 주요 뉴스 */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <div className="p-3 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-sm font-bold text-gray-800">주요 뉴스</h2>
                <div className="flex text-xs space-x-2">
                  <button className="text-blue-600 font-medium">전체</button>
                  <button className="text-gray-400">정치</button>
                  <button className="text-gray-400">경제</button>
                  <button className="text-gray-400">사회</button>
                  <button className="text-gray-400">세계</button>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y divide-gray-100">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div key={`top-${idx}`} className="p-3 hover:bg-blue-50 transition-colors">
                    <div className="mb-1.5 flex items-center">
                      <span className={`text-xs font-semibold px-1.5 py-0.5 rounded-sm ${
                        idx % 4 === 0 ? "bg-blue-100 text-blue-600" : 
                        idx % 4 === 1 ? "bg-green-100 text-green-600" : 
                        idx % 4 === 2 ? "bg-amber-100 text-amber-600" : 
                        "bg-purple-100 text-purple-600"
                      }`}>
                        {idx % 4 === 0 ? "정치" : idx % 4 === 1 ? "경제" : idx % 4 === 2 ? "사회" : "문화"}
                      </span>
                    </div>
                    <h3 className="text-sm font-bold leading-tight mb-2 line-clamp-2 min-h-[2.5rem]">
                      {idx % 4 === 0 ? "윤석열 대통령 \"평창올림픽 남북단일팀, 일방적 지시\"" : 
                      idx % 4 === 1 ? "코스피, 외국인 매수에 상승...2,750선 회복" : 
                      idx % 4 === 2 ? "의대 정원 갈등, 전공의들 \"철회 없으면 복귀 없다\"" :
                      "국힙 원탑 뉴진스, 신곡으로 글로벌 차트 석권"}
                    </h3>
                    <div className="aspect-video rounded-md overflow-hidden bg-gray-100 mb-2">
                      <Image 
                        src={`/news/thumb${idx + 1}.jpg`} 
                        alt="뉴스 썸네일" 
                        width={240} 
                        height={135} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                      <div className="flex items-center">
                        <span className="font-medium">
                          {idx % 5 === 0 ? "매일경제" : idx % 5 === 1 ? "한국경제" : idx % 5 === 2 ? "조선일보" : idx % 5 === 3 ? "중앙일보" : "한겨레"}
                        </span>
                      </div>
                      <span>{idx % 3 === 0 ? "1시간 전" : idx % 3 === 1 ? "30분 전" : "10분 전"}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 푸터 */}
      <div className="bg-white border-t py-4">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-xs text-gray-500 space-y-2">
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              <Link href="#" className="hover:underline">공지사항</Link>
              <Link href="#" className="hover:underline">서비스 약관</Link>
              <Link href="#" className="hover:underline">개인정보처리방침</Link>
              <Link href="#" className="hover:underline">청소년보호정책</Link>
              <Link href="#" className="hover:underline">고객센터</Link>
            </div>
            <div>
              <p>© NAVER Corp. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// React.memo로 감싸서 불필요한 리렌더링 방지
export default React.memo(Main);
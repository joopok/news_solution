'use client';

import useSWR from 'swr';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { NewsItem, MainDataResponse, ApiResponse, MainData } from '../types/types';

interface MenuItem {
  id: number;
  name: string;
  url: string;
}

interface FeaturedNews {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  date: string;
  views: number;
}

interface CategoryNewsSection {
  title: string;
  list: NewsItem[];
  featured: FeaturedNews;
}

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

// 기본 데이터 (로딩 또는 오류 시 표시할 데이터)
const defaultData: MainDataResponse = {
  success: true,
  data: {
    menus: [
      { id: 1, name: '정치', url: '/politics' },
      { id: 2, name: '경제', url: '/economy' },
      { id: 3, name: '사회', url: '/society' },
      { id: 4, name: '문화', url: '/culture' },
      { id: 5, name: '스포츠', url: '/sports' }
    ],
    latestNews: [
      {
        id: 1,
        title: '최근 소식 1',
        summary: '최근 소식에 대한 내용입니다.',
        thumbnail: 'https://via.placeholder.com/300x200',
        category: '정치',
        date: '2023-09-20',
        views: 1000,
        link: '/news/1'
      },
      {
        id: 2,
        title: '최근 소식 2',
        summary: '최근 소식에 대한 내용입니다.',
        thumbnail: 'https://via.placeholder.com/300x200',
        category: '경제',
        date: '2023-09-19',
        views: 800,
        link: '/news/2'
      }
    ],
    trendingNews: [
      {
        id: 1,
        title: '인기 소식 1',
        category: '정치',
        date: '2023-09-20',
        views: 1000,
        link: '/news/1'
      },
      {
        id: 2,
        title: '인기 소식 2',
        category: '경제',
        date: '2023-09-19',
        views: 800,
        link: '/news/2'
      }
    ],
    banners: [
      {
        id: 1,
        title: '특집 기사 1',
        description: '특집 기사 1에 대한 설명입니다.',
        image: 'https://via.placeholder.com/1200x500',
        link: '/featured/1'
      },
      {
        id: 2,
        title: '특집 기사 2',
        description: '특집 기사 2에 대한 설명입니다.',
        image: 'https://via.placeholder.com/1200x500',
        link: '/featured/2'
      }
    ],
    categoryNews: {
      politics: {
        title: '정치',
        list: [],
        featured: {
          id: 1,
          title: '정치 관련 특집 기사',
          content: '정치 관련 특집 기사 내용입니다.',
          thumbnail: 'https://via.placeholder.com/300x200',
          category: '정치',
          date: '2023-09-20',
          views: 1000
        }
      },
      economy: {
        title: '경제',
        list: [],
        featured: {
          id: 2,
          title: '경제 관련 특집 기사',
          content: '경제 관련 특집 기사 내용입니다.',
          thumbnail: 'https://via.placeholder.com/300x200',
          category: '경제',
          date: '2023-09-20',
          views: 800
        }
      },
      society: {
        title: '사회',
        list: [],
        featured: {
          id: 3,
          title: '사회 관련 특집 기사',
          content: '사회 관련 특집 기사 내용입니다.',
          thumbnail: 'https://via.placeholder.com/300x200',
          category: '사회',
          date: '2023-09-20',
          views: 1000
        }
      },
      tech: {
        title: '기술',
        list: [],
        featured: {
          id: 4,
          title: '기술 관련 특집 기사',
          content: '기술 관련 특집 기사 내용입니다.',
          thumbnail: 'https://via.placeholder.com/300x200',
          category: '기술',
          date: '2023-09-20',
          views: 800
        }
      }
    }
  }
};

// 글로벌 캐시 설정
const GLOBAL_CACHE_KEY = 'main_data_cache';
const CACHE_TTL = 5 * 60 * 1000; // 5분

// 브라우저에서만 작동하는 캐시 설정
let browserCache: {
  data: MainDataResponse | null;
  timestamp: number;
} = {
  data: null,
  timestamp: 0
};

/**
 * 데이터 페칭 함수 - SWR 및 React Query에서 공통으로 사용
 */
export async function fetchMainData(url: string = '/data/main.json'): Promise<MainDataResponse> {
  // 캐시 체크 (브라우저 환경에서만)
  if (typeof window !== 'undefined' && browserCache.data) {
    const now = Date.now();
    if (now - browserCache.timestamp < CACHE_TTL) {
      return browserCache.data;
    }
  }
  
  try {
    console.log('데이터 불러오는 중...', url);
    const response = await axios.get(url);
    
    // 데이터 유효성 검사
    if (!response.data || typeof response.data !== 'object') {
      console.error('유효하지 않은 데이터 형식:', response.data);
      return defaultData;
    }
    
    // 브라우저 캐시 업데이트
    if (typeof window !== 'undefined') {
      browserCache = {
        data: response.data,
        timestamp: Date.now()
      };
      
      // 로컬 스토리지에도 저장
      try {
        localStorage.setItem(
          GLOBAL_CACHE_KEY, 
          JSON.stringify({ data: response.data, timestamp: Date.now() })
        );
      } catch (e) {
        console.error('로컬 스토리지 캐싱 오류:', e);
      }
    }
    
    return response.data;
  } catch (error) {
    console.error('데이터 로딩 오류:', error);
    
    // 에러 발생 시 로컬 스토리지 캐시 사용 시도
    if (typeof window !== 'undefined') {
      try {
        const cachedData = localStorage.getItem(GLOBAL_CACHE_KEY);
        if (cachedData) {
          const parsed = JSON.parse(cachedData);
          // 캐시가 유효한 경우에만 사용
          if (Date.now() - parsed.timestamp < CACHE_TTL * 2) { // 두 배 유효기간 적용
            console.log('캐시된 데이터 사용');
            return parsed.data;
          }
        }
      } catch (e) {
        console.error('로컬 스토리지 읽기 오류:', e);
      }
    }
    
    // 모든 시도 실패 시 기본 데이터 반환
    console.log('기본 데이터 사용');
    return defaultData;
  }
}

/**
 * 초기 캐시 로드 함수 - 앱 시작 시 한 번 호출
 */
export function loadInitialCache() {
  if (typeof window !== 'undefined' && !browserCache.data) {
    try {
      const cachedData = localStorage.getItem(GLOBAL_CACHE_KEY);
      if (cachedData) {
        const parsed = JSON.parse(cachedData);
        if (Date.now() - parsed.timestamp < CACHE_TTL) {
          browserCache = {
            data: parsed.data,
            timestamp: parsed.timestamp
          };
        }
      }
    } catch (e) {
      console.error('초기 캐시 로드 오류:', e);
    }
  }
}

// 앱 시작 시 초기 캐시 로드
loadInitialCache();

const fetcher = async (url: string) => {
  const mockData: ApiResponse<MainData> = {
    success: true,
    data: {
      latestNews: [
        {
          source: '조선일보',
          title: '與 "의대 증원 강행"…野 "국정조사 추진"',
          content: '여야가 의대 정원 확대를 둘러싸고 대립각을 세우고 있다. 여당은 의대 정원 확대 정책을 강행하겠다는 입장인 반면, 야당은 국정조사를 추진하겠다고 밝혔다.',
          image: '/news/placeholder.jpg',
          category: '정치',
          time: '1시간 전'
        },
        {
          source: '매일경제',
          title: '코스피, 외국인 매수세에 상승 마감',
          content: '코스피가 외국인 투자자들의 매수세에 힘입어 상승 마감했다. 특히 반도체와 2차전지 관련 종목들이 강세를 보였다.',
          image: '/news/placeholder.jpg',
          category: '경제',
          time: '2시간 전'
        },
        {
          source: '한국경제',
          title: '전국 날씨, 미세먼지 농도 높아',
          content: '내일은 전국이 대체로 맑겠으나, 미세먼지 농도가 높아 외출 시 마스크 착용이 권장된다.',
          image: '/news/placeholder.jpg',
          category: '날씨',
          time: '30분 전'
        }
      ],
      trendingNews: [
        {
          source: '연합뉴스',
          title: '삼성전자, 신형 스마트폰 공개',
          content: '삼성전자가 새로운 플래그십 스마트폰을 공개했다. AI 기능이 대폭 강화되었다.',
          category: 'IT',
          time: '1시간 전'
        }
      ],
      broadcastNews: [
        {
          title: 'KBS NEWS 24',
          url: '#',
          isLive: true
        },
        {
          title: 'YTN LIVE',
          url: '#',
          isLive: true
        }
      ]
    }
  };

  // 실제 API 호출 대신 목업 데이터 반환
  return mockData;
};

export const useMainData = () => {
  const { data, error, isLoading, mutate } = useSWR<MainDataResponse>(
    '/data/main.json',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      refreshInterval: 300000,
      dedupingInterval: 60000,
      shouldRetryOnError: true,
      errorRetryCount: 3,
      errorRetryInterval: 5000,
      fallbackData: defaultData,
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        if (error.status === 404) return;
        
        if (retryCount >= 3) return;
        
        setTimeout(() => revalidate({ retryCount }), 5000);
      }
    }
  );

  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const [processedData, setProcessedData] = useState<MainDataResponse>(defaultData);
  
  useEffect(() => {
    if (data && isMounted.current) {
      setProcessedData(data);
    }
  }, [data]);

  return {
    data: data || defaultData,
    error,
    isLoading,
    mutate,
    refresh: () => mutate()
  };
};

/**
 * React Query를 사용하는 메인 데이터 훅
 */
export function useMainDataQuery() {
  return useQuery({
    queryKey: ['mainData'],
    queryFn: () => fetchMainData('/data/main.json'),
    staleTime: CACHE_TTL,
    refetchOnWindowFocus: false,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
} 
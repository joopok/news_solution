'use client';

import useSWR from 'swr';
import axios from 'axios';
import { NewsItem } from '../types/types';

// 메인 데이터 타입 정의
export interface MainDataResponse {
  success: boolean;
  data?: {
    menus: Array<{
      id: number;
      name: string;
      url: string;
    }>;
    latestNews: NewsItem[];
    trendingNews: NewsItem[];
    banners: Array<{
      id: number;
      imageUrl: string;
      link: string;
      title: string;
    }>;
  };
  error?: string;
}

/**
 * 메인 페이지 데이터를 가져오는 훅
 * SWR을 사용하여 데이터 캐싱 및 재검증을 구현
 */
export function useMainData() {
  const fetcher = async (url: string) => {
    const response = await axios.get(url);
    return response.data;
  };
  
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    '/api/main',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      revalidateOnReconnect: true,
      dedupingInterval: 60000, // 1분 동안 동일한 요청 중복 방지
      focusThrottleInterval: 10000, // 10초 내에 포커스 이벤트 제한
      loadingTimeout: 3000, // 3초 후에도 데이터가 없으면 타임아웃
      onErrorRetry: (error, key, config, revalidate, { retryCount }) => {
        // 404 에러는 재시도하지 않음
        if (error.response && error.response.status === 404) return;
        
        // 최대 3번까지만 재시도
        if (retryCount >= 3) return;
        
        // 지수 백오프를 사용한 재시도
        setTimeout(() => revalidate({ retryCount }), 5000 * (retryCount + 1));
      },
    }
  );
  
  return {
    data,
    error,
    isLoading,
    isValidating,
    mutate,
    isEmpty: !isLoading && data && (
      !data.data || 
      (data.data.latestNews && data.data.latestNews.length === 0) &&
      (data.data.trendingNews && data.data.trendingNews.length === 0) &&
      (data.data.banners && data.data.banners.length === 0)
    ),
  };
} 
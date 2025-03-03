import api from './apiClient';
import { NewsItem } from '../types/types';

// 뉴스 서비스 타입 정의
export interface NewsListParams {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}

export interface NewsDetailParams {
  id: string;
}

// 뉴스 관련 API 서비스
const newsService = {
  // 최신 뉴스 목록 가져오기
  getLatestNews: async (params?: NewsListParams) => {
    return api.get<NewsItem[]>('/news/latest', { params });
  },
  
  // 인기 뉴스 목록 가져오기
  getTrendingNews: async (params?: NewsListParams) => {
    return api.get<NewsItem[]>('/news/trending', { params });
  },
  
  // 뉴스 상세 정보 가져오기
  getNewsDetail: async ({ id }: NewsDetailParams) => {
    return api.get<NewsItem>(`/news/${id}`);
  },
  
  // 뉴스 검색
  searchNews: async (params: NewsListParams) => {
    return api.get<NewsItem[]>('/news/search', { params });
  },
  
  // 카테고리별 뉴스 가져오기
  getNewsByCategory: async (category: string, params?: Omit<NewsListParams, 'category'>) => {
    return api.get<NewsItem[]>(`/news/category/${category}`, { params });
  },
  
  // 많이 본 뉴스 목록 가져오기
  getMostViewedNews: async (period: 'day' | 'week' | 'month' = 'day', params?: Omit<NewsListParams, 'category'>) => {
    return api.get<NewsItem[]>('/news/most-viewed', { 
      params: { ...params, period } 
    });
  }
};

export default newsService; 
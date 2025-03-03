import api from '../apiService';

/**
 * 뉴스 아이템 인터페이스
 */
export interface NewsItem {
  id: string;
  title: string;
  content: string;
  summary?: string;
  author?: string;
  category?: string;
  tags?: string[];
  publishedAt: string;
  updatedAt?: string;
  thumbnail?: string;
  views?: number;
}

/**
 * 뉴스 목록 응답 인터페이스
 */
export interface NewsListResponse {
  items: NewsItem[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
}

/**
 * 뉴스 검색 요청 파라미터
 */
export interface NewsSearchParams {
  query?: string;
  category?: string;
  tags?: string[];
  page?: number;
  limit?: number;
  sort?: 'latest' | 'popular' | 'relevant';
}

/**
 * 뉴스 관련 API 서비스
 */
const newsService = {
  /**
   * 뉴스 목록 가져오기
   * @param params 검색 파라미터
   * @returns 뉴스 목록 응답
   */
  getNewsList: async (params: NewsSearchParams = {}) => {
    return await api.get<NewsListResponse>('/news', { params });
  },

  /**
   * 특정 뉴스 상세 정보 가져오기
   * @param id 뉴스 ID
   * @returns 뉴스 상세 정보
   */
  getNewsDetail: async (id: string) => {
    return await api.get<NewsItem>(`/news/${id}`);
  },

  /**
   * 핫 뉴스 목록 가져오기
   * @param limit 가져올 항목 수
   * @returns 인기 뉴스 목록
   */
  getHotNews: async (limit: number = 5) => {
    return await api.get<{ items: NewsItem[] }>('/news/hot', { params: { limit } });
  },

  /**
   * 카테고리별 뉴스 목록 가져오기
   * @param category 카테고리 명
   * @param params 추가 검색 파라미터
   * @returns 카테고리별 뉴스 목록
   */
  getNewsByCategory: async (category: string, params: Omit<NewsSearchParams, 'category'> = {}) => {
    return await api.get<NewsListResponse>(`/news/category/${category}`, { 
      params: { ...params }
    });
  },

  /**
   * 뉴스 검색
   * @param query 검색어
   * @param params 추가 검색 파라미터
   * @returns 검색 결과 뉴스 목록
   */
  searchNews: async (query: string, params: Omit<NewsSearchParams, 'query'> = {}) => {
    return await api.get<NewsListResponse>('/news/search', { 
      params: { query, ...params }
    });
  }
};

export default newsService; 
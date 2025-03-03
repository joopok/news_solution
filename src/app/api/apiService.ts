import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, AxiosInstance } from 'axios';
import { store } from '../redux/store';
import { refreshTokens, clearCredentials } from '../redux/features/authSlice';

// 환경 변수에서 API 설정 가져오기
const API_HOST = process.env.NEXT_PUBLIC_API_HOST || 'http://192.168.0.110:8081';
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 10000);
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
const ENV = process.env.NODE_ENV || 'development';

// 타입 정의
export interface ApiResponse<T=unknown> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
  };
}

// axios 인스턴스 생성
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_HOST}/api/${API_VERSION}`,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    // Redux 스토어에서 토큰 가져오기
    const state = store.getState();
    const token = state.auth.accessToken;
    
    // 토큰이 있으면 Authorization 헤더에 추가
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 개발 환경에서 로깅
    if (ENV === 'development') {
      console.log(`API 요청: ${config.method?.toUpperCase()} ${config.url}`, config);
    }
    
    return config;
  },
  (error) => {
    if (ENV === 'development') {
      console.error('API 요청 오류:', error);
    }
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // 개발 환경에서 로깅
    if (ENV === 'development') {
      console.log(`API 응답: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
    }
    
    return response;
  },
  async (error: AxiosError) => {
    // 개발 환경에서 로깅
    if (ENV === 'development') {
      console.error('API 응답 오류:', error);
    }
    
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // 401 에러(토큰 만료)이고 재시도하지 않은 요청이면 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 토큰 갱신 액션 디스패치
        const result = await store.dispatch(refreshTokens()).unwrap();
        
        // 토큰 갱신 성공 시 원래 요청 재시도
        if (result && result.accessToken) {
          // 헤더에 새 토큰 설정
          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] = `Bearer ${result.accessToken}`;
          }
          
          // 원래 요청 재시도
          return apiClient(originalRequest);
        }
      } catch (refreshError) {
        // 토큰 갱신 실패 시 로그아웃 처리
        store.dispatch(clearCredentials());
        return Promise.reject(refreshError);
      }
    }
    
    // 다른 오류는 그대로 반환
    return Promise.reject(error);
  }
);

// API 함수들
export const api = {
  /**
   * GET 요청을 보냅니다.
   * @template T 응답 데이터 타입
   * @param url API 엔드포인트
   * @param config Axios 요청 설정
   * @returns Promise<ApiResponse<T>>
   */
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  /**
   * POST 요청을 보냅니다.
   * @template T 응답 데이터 타입
   * @template D 요청 데이터 타입
   * @param url API 엔드포인트
   * @param data 요청 본문 데이터
   * @param config Axios 요청 설정
   * @returns Promise<ApiResponse<T>>
   */
  post: async <T, D=unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  /**
   * PUT 요청을 보냅니다.
   * @template T 응답 데이터 타입
   * @template D 요청 데이터 타입
   * @param url API 엔드포인트
   * @param data 요청 본문 데이터
   * @param config Axios 요청 설정
   * @returns Promise<ApiResponse<T>>
   */
  put: async <T, D=unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  /**
   * DELETE 요청을 보냅니다.
   * @template T 응답 데이터 타입
   * @param url API 엔드포인트
   * @param config Axios 요청 설정
   * @returns Promise<ApiResponse<T>>
   */
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  /**
   * PATCH 요청을 보냅니다.
   * @template T 응답 데이터 타입
   * @template D 요청 데이터 타입
   * @param url API 엔드포인트
   * @param data 요청 본문 데이터
   * @param config Axios 요청 설정
   * @returns Promise<ApiResponse<T>>
   */
  patch: async <T, D=unknown>(url: string, data?: D, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  /**
   * 인증이 필요한 API 엔드포인트에 접근하기 위한 헤더를 반환합니다.
   * @returns 인증 헤더가 포함된 객체
   */
  getAuthHeader: () => {
    const state = store.getState();
    const token = state.auth.accessToken;
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
};

/**
 * API 오류를 처리하는 유틸리티 함수
 * @param error Axios 오류 객체
 */
const handleApiError = (error: AxiosError): void => {
  if (error.response) {
    // 서버에서 응답이 왔지만 에러 상태 코드인 경우
    console.error('응답 에러:', error.response.data);
  } else if (error.request) {
    // 요청은 보냈지만 응답이 없는 경우
    console.error('요청 에러: 서버로부터 응답이 없습니다.');
  } else {
    // 요청 설정 중에 오류 발생
    console.error('에러:', error.message);
  }
};

// 기본 export
export default api; 
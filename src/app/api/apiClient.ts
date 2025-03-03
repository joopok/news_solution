import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

// 환경 변수에서 API 설정 가져오기
const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
const API_TIMEOUT = Number(process.env.NEXT_PUBLIC_API_TIMEOUT || 10000);
const API_VERSION = process.env.NEXT_PUBLIC_API_VERSION || 'v1';
const ENV = process.env.NEXT_PUBLIC_ENV || 'development';

// 타입 정의
export interface ApiResponse<T=any> {
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
    // 토큰 가져오기 (localStorage는 클라이언트 사이드에서만 동작)
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
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
  (error: AxiosError) => {
    // 개발 환경에서 로깅
    if (ENV === 'development') {
      console.error('❌ API 응답 오류:', error);
    }
    
    // 401 Unauthorized 오류 처리
    if (error.response?.status === 401) {
      // 토큰 만료 처리 등
      if (typeof window !== 'undefined') {
        localStorage.removeItem('auth_token');
        // 로그인 페이지로 리다이렉트 등의 처리가 필요한 경우
        // window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API 함수들
export const api = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.get<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  post: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.post<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  put: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.put<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.delete<ApiResponse<T>>(url, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  },
  
  patch: async <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> => {
    try {
      const response = await apiClient.patch<ApiResponse<T>>(url, data, config);
      return response.data;
    } catch (error) {
      handleApiError(error as AxiosError);
      throw error;
    }
  }
};

// 에러 처리 함수
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

export default api; 
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { store } from '../redux/store';
import { refreshTokens, clearCredentials } from '../redux/features/authSlice';

// API 기본 URL
const API_URL = process.env.NEXT_PUBLIC_API_HOST;

// axios 인스턴스 생성
const apiClient = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.auth.accessToken;
    
    // 토큰이 있으면 Authorization 헤더에 추가
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };
    
    // 401 에러(토큰 만료)이고 재시도하지 않은 요청이면 토큰 갱신 시도
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 현재 리프레시 토큰 가져오기
        const state = store.getState();
        const refreshToken = state.auth.refreshToken;
        
        // refreshToken이 없으면 오류 발생
        if (!refreshToken) {
          throw new Error('Refresh token not available');
        }
        
        // 토큰 갱신 액션 디스패치
        const result = await store.dispatch(refreshTokens({ refreshToken })).unwrap();
        
        // 토큰 갱신 성공 시 원래 요청 재시도
        if (result && result.accessToken) {
          // 헤더에 새 토큰 설정
          axios.defaults.headers.common['Authorization'] = `Bearer ${result.accessToken}`;
          
          // 원래 요청 설정에도 새 토큰 적용
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

export default apiClient; 
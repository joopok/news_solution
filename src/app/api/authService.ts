import api from './apiClient';

// 사용자 타입 정의
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  name: string;
}

// 인증 관련 API 서비스
const authService = {
  // 로그인
  login: async (params: LoginParams) => {
    const response = await api.post<{ token: string; user: User }>('/login', params);
    
    if (response.success && response.data) {
      // 토큰을 로컬 스토리지에 저장
      if (typeof window !== 'undefined') {
        localStorage.setItem('auth_token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }
    }
    
    return response;
  },
  
  // 회원가입
  register: async (params: RegisterParams) => {
    return api.post<{ token: string; user: User }>('/auth/register', params);
  },
  
  // 로그아웃
  logout: async () => {
    // 로컬 스토리지에서 토큰 제거
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
    }
    
    return api.post('/auth/logout');
  },
  
  // 현재 사용자 정보 가져오기
  getCurrentUser: async () => {
    return api.get<User>('/auth/me');
  },
  
  // 토큰 갱신
  refreshToken: async () => {
    return api.post<{ token: string }>('/auth/refresh-token');
  },
  
  // 비밀번호 재설정 요청
  forgotPassword: async (email: string) => {
    return api.post('/auth/forgot-password', { email });
  },
  
  // 비밀번호 재설정
  resetPassword: async (token: string, password: string) => {
    return api.post('/auth/reset-password', { token, password });
  },
  
  // 사용자 정보 업데이트
  updateUserProfile: async (data: Partial<User>) => {
    return api.put<User>('/auth/profile', data);
  },
  
  // 이메일 인증
  verifyEmail: async (token: string) => {
    return api.post('/auth/verify-email', { token });
  },
  
  // 로컬 스토리지에서 현재 사용자 가져오기 (클라이언트 사이드 전용)
  getStoredUser: (): User | null => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
    return null;
  },
  
  // 로그인 여부 확인 (클라이언트 사이드 전용)
  isAuthenticated: (): boolean => {
    if (typeof window !== 'undefined') {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }
};

export default authService; 
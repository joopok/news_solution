import api from '../apiService';

/**
 * 로그인 요청 파라미터
 */
export interface LoginParams {
  username: string;
  password: string;
}

/**
 * 회원가입 요청 파라미터
 */
export interface RegisterParams {
  username: string;
  password: string;
  email: string;
  name?: string;
}

/**
 * 인증 요청의 응답 데이터 타입
 */
export interface AuthResponse {
  user: {
    id: string;
    username: string;
    email: string;
    name?: string;
  };
  accessToken: string;
  refreshToken: string;
}

/**
 * 인증 관련 API 서비스
 */
const authService = {
  /**
   * 로그인 API
   * @param params 로그인 요청 파라미터
   * @returns 인증 응답 데이터 (유저 정보, 토큰)
   */
  login: async (params: LoginParams) => {
    return await api.post<AuthResponse>('/auth/login', params);
  },

  /**
   * 회원가입 API
   * @param params 회원가입 요청 파라미터
   * @returns 인증 응답 데이터 (유저 정보, 토큰)
   */
  register: async (params: RegisterParams) => {
    return await api.post<AuthResponse>('/auth/register', params);
  },

  /**
   * 토큰 갱신 API
   * @param refreshToken 리프레시 토큰
   * @returns 새로운 액세스 토큰과 (선택적으로) 새로운 리프레시 토큰
   */
  refreshToken: async (refreshToken: string) => {
    return await api.post<{ accessToken: string; refreshToken?: string }>(
      '/auth/refresh', 
      { refreshToken }
    );
  },

  /**
   * 로그아웃 API
   * @param refreshToken 리프레시 토큰
   * @returns 로그아웃 성공 여부
   */
  logout: async (refreshToken: string) => {
    return await api.post<{ success: boolean }>('/auth/logout', { refreshToken });
  },

  /**
   * 현재 로그인된 사용자 정보 조회 API
   * @returns 현재 로그인된 사용자 정보
   */
  getCurrentUser: async () => {
    return await api.get<{ user: AuthResponse['user'] }>('/auth/me');
  }
};

export default authService; 
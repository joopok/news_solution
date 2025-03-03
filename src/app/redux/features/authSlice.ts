import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 사용자 타입 정의 (확장된 사용자 정보)
export interface User {
  id: string;
  username: string;
  email: string;
  name: string;
  role?: string;
  phoneNumber?: string;
  address?: string;
  profileImage?: string;
  department?: string;
  position?: string;
  lastLoginDate?: string;
  createdDate?: string;
  updatedDate?: string;
  // 추가 필드는 서버 응답에 따라 확장 가능
  [key: string]: string | number | boolean | object | undefined; // 동적 필드를 위한 인덱스 시그니처 추가
}

// 로그인 자격증명 인터페이스 추가
export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
}

// 서버 응답 데이터 인터페이스
export interface UserData {
  user: User;
  accessToken: string;
  refreshToken: string;
  [key: string]: unknown;
}

// 인증 상태 타입 정의
export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  userData: UserData | null; // 서버 응답 데이터 전체를 저장
}

// 초기 상태
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  refreshToken: null,
  loading: false,
  error: null,
  userData: null, // 초기값은 null
};

// 로그인 Thunk
export const login = createAsyncThunk(
  '/login',
  async ({ username, password, rememberMe = false }: LoginCredentials, { rejectWithValue }) => {
    try {
      // API 호출 전 로그
      const apiUrl = '/api/auth/login';
      //console.log('로그인 API URL:', apiUrl);
      // API 서버 URL 설정 (환경 변수 또는 기본값)
      const API_SERVER = process.env.NEXT_PUBLIC_API_HOST|| 'http://192.168.0.110:8081';
      //console.log(`API 서버 URL: ${API_SERVER}/api/auth/login`);
      // API 요청 시작 - 타임아웃 설정
      const response = await axios.post(API_SERVER + apiUrl, { username, password }, {
        headers: {'Content-Type': 'application/json'},
        timeout: 10000 // 10초 타임아웃 설정
      });
      
      // 응답 로그
      console.log('API 응답 상태:', response.status);
      
      const result = response.data;
      
      if (process.env.NODE_ENV === 'development') {
        console.log('로그인 결과:', result);
      }
      
      if (!result.success || !result.data) {
        console.error('로그인 실패:', result.error);
        return rejectWithValue(result.error?.message || '로그인에 실패했습니다.');
      }
      
      // 로그인 성공 시 필요한 데이터 추가
      const { accessToken, refreshToken, user } = result.data;
      
      // 아이디 저장 처리
      if (rememberMe) {
        localStorage.setItem('savedUsername', username);
      } else {
        localStorage.removeItem('savedUsername');
      }
      
      // 서버 응답의 모든 데이터를 반환
      return { 
        user,  // 기본 사용자 정보
        accessToken, 
        refreshToken,
        userData: result.data // 전체 응답 데이터를 그대로 저장
      };
    } catch (error) {
      console.error('로그인 중 오류 발생:', error);
      
      // axios 오류인 경우
      if (axios.isAxiosError(error)) {
        // API 서버가 응답을 반환한 경우
        if (error.response) {
          console.error('API 서버 오류:', error.response.status, error.response.data);
          
          // API 서버에서 반환한 오류 메시지가 있으면 사용
          if (error.response.data?.error?.message) {
            return rejectWithValue(error.response.data.error.message);
          }
        }
        
        // 타임아웃 오류인 경우
        if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
          return rejectWithValue('로그인 요청 시간이 초과되었습니다. 인터넷 연결을 확인하고 다시 시도해주세요.');
        }
        
        // 인증 실패인 경우 (401 오류)
        if (error.response?.status === 401) {
          return rejectWithValue(
            '로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.'
          );
        }
        
        // 네트워크 오류인 경우
        if (error.code === 'ERR_NETWORK') {
          return rejectWithValue('서버 연결에 실패했습니다. 인터넷 연결을 확인하거나 잠시 후 다시 시도해주세요.');
        }
        
        return rejectWithValue(error.message || '서버 연결에 실패했습니다.');
      }
      
      return rejectWithValue('로그인 과정에서 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
    }
  }
);

// 토큰 갱신 Thunk
export const refreshTokens = createAsyncThunk(
  '/refreshToken',
  async ({ refreshToken }: { refreshToken: string }, { rejectWithValue }) => {
    try {
      console.log('토큰 갱신 시도', { refreshToken });
      
      // 간단한 상대 경로 사용 (Next.js API Route)
      const apiUrl = '/api/auth/refresh';
      console.log('토큰 갱신 API URL:', apiUrl);
      
      // API 요청 시작
      const response = await axios.post(apiUrl, { refreshToken }, {
        headers: {'Content-Type': 'application/json'},
        timeout: 10000 // 10초 타임아웃 설정
      });
      
      console.log('토큰 갱신 응답:', response.status);
      
      const result = response.data;
      console.log('토큰 갱신 결과:', result);
      
      if (!result.success || !result.data) {
        console.error('토큰 갱신 실패:', result.error);
        return rejectWithValue(result.error?.message || '토큰 갱신에 실패했습니다.');
      }
      
      // 서버에서 user 정보도 함께 제공하는 경우
      const { accessToken, refreshToken: newRefreshToken, user } = result.data;
      
      // 서버 응답의 모든 데이터를 반환
      return { 
        accessToken, 
        refreshToken: newRefreshToken,
        user, // 사용자 정보가 있는 경우 업데이트
        userData: result.data // 전체 응답 데이터 저장
      };
    } catch (error) {
      console.error('토큰 갱신 중 오류 발생:', error);
      
      // 오류 처리 (login과 유사)
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.error('API 서버 오류:', error.response.status, error.response.data);
          if (error.response.data?.error?.message) {
            return rejectWithValue(error.response.data.error.message);
          }
        }
        
        if (error.code === 'ETIMEDOUT' || error.code === 'ECONNABORTED') {
          return rejectWithValue('토큰 갱신 요청 시간이 초과되었습니다.');
        }
        
        return rejectWithValue(error.message || '서버 연결에 실패했습니다.');
      }
      
      return rejectWithValue('토큰 갱신 과정에서 오류가 발생했습니다.');
    }
  }
);

// 로그아웃 Thunk
export const logout = createAsyncThunk(
  '/logout',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { auth: AuthState };
      const { refreshToken } = state.auth;
      
      if (!refreshToken) {
        console.log('로그아웃: 리프레시 토큰이 없습니다. 로컬 로그아웃만 수행합니다.');
        return null;
      }
      
      // 간단한 상대 경로 사용 (Next.js API Route)
      const apiUrl = '/auth/logout';
      console.log('로그아웃 API URL:', apiUrl);
      
      // 서버에 로그아웃 요청
      await axios.post(apiUrl, { refreshToken }, {
        headers: {'Content-Type': 'application/json'},
        timeout: 10000
      });
      
      console.log('로그아웃 성공');
      return null;
    } catch (error) {
      console.error('로그아웃 중 오류 발생:', error);
      
      // 로그아웃은 서버 오류가 발생해도 클라이언트에서는 로그아웃 처리됨
      console.log('서버 로그아웃 실패, 로컬에서만 로그아웃합니다.');
      return rejectWithValue('로그아웃 과정에서 오류가 발생했습니다.');
    }
  }
);

// 자격 증명 초기화 액션 (강제 로그아웃)
export const clearCredentials = createSlice({
  name: 'authClear',
  initialState,
  reducers: {
    logout: () => initialState,
  },
}).actions.logout;

// Auth 슬라이스
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // 로그인 시작
    builder.addCase(login.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    // 로그인 성공
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.userData = action.payload.userData; // 응답 데이터 전체 저장
      state.error = null;
    });
    
    // 로그인 실패
    builder.addCase(login.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '로그인에 실패했습니다.';
    });
    
    // 토큰 갱신 시작
    builder.addCase(refreshTokens.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    // 토큰 갱신 성공
    builder.addCase(refreshTokens.fulfilled, (state, action) => {
      state.loading = false;
      state.isAuthenticated = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      
      // 사용자 정보가 함께 제공된 경우 업데이트
      if (action.payload.user) {
        state.user = action.payload.user;
      }
      
      // 전체 응답 데이터 저장 
      if (action.payload.userData) {
        state.userData = action.payload.userData;
      }
      
      state.error = null;
    });
    
    // 토큰 갱신 실패
    builder.addCase(refreshTokens.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '토큰 갱신에 실패했습니다.';
      // 토큰 갱신 실패 시 로그아웃 처리하지 않음 (인터셉터에서 처리)
    });
    
    // 로그아웃 시작
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    
    // 로그아웃 성공
    builder.addCase(logout.fulfilled, () => {
      return initialState; // 초기 상태로 리셋
    });
    
    // 로그아웃 실패
    builder.addCase(logout.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string || '로그아웃에 실패했습니다.';
      
      // 로그아웃 실패 시 상태 초기화 (클라이언트 측 로그아웃)
      Object.assign(state, initialState);
    });
  },
});

export const { clearError } = authSlice.actions;

export default authSlice.reducer; 
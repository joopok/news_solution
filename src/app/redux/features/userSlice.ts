import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// 사용자 설정 데이터 타입 정의
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  fontSize: 'small' | 'medium' | 'large';
  notifications: boolean;
}

// 사용자 상태 인터페이스
export interface UserState {
  preferences: UserPreferences;
  lastActivity: string | null;
}

// 초기 상태
const initialState: UserState = {
  preferences: {
    theme: 'system',
    fontSize: 'medium',
    notifications: true
  },
  lastActivity: null
};

// User 슬라이스
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // 테마 설정 변경
    setTheme: (state, action: PayloadAction<'light' | 'dark' | 'system'>) => {
      state.preferences.theme = action.payload;
    },
    
    // 글꼴 크기 설정 변경
    setFontSize: (state, action: PayloadAction<'small' | 'medium' | 'large'>) => {
      state.preferences.fontSize = action.payload;
    },
    
    // 알림 설정 변경
    setNotifications: (state, action: PayloadAction<boolean>) => {
      state.preferences.notifications = action.payload;
    },
    
    // 마지막 활동 시간 업데이트
    updateLastActivity: (state) => {
      state.lastActivity = new Date().toISOString();
    },
    
    // 사용자 설정 일괄 업데이트
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      state.preferences = { ...state.preferences, ...action.payload };
    }
  }
});

// 액션 생성자 내보내기
export const { 
  setTheme, 
  setFontSize, 
  setNotifications, 
  updateLastActivity,
  updatePreferences
} = userSlice.actions;

// 리듀서 내보내기
export default userSlice.reducer; 
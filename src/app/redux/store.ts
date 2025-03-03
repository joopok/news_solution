import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
// localStorage 직접 사용
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import authReducer from './features/authSlice';

// Next.js SSR에서 localStorage를 안전하게 처리하기 위한 createNoopStorage
const createNoopStorage = () => {
  return {
    getItem() {
      return Promise.resolve(null);
    },
    setItem(_key: string, value: unknown) {
      return Promise.resolve(value);
    },
    removeItem() {
      return Promise.resolve();
    }
  };
};

// 환경에 따라 적절한 스토리지 선택
const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage();

// 루트 리듀서 설정
const rootReducer = combineReducers({
  auth: authReducer,
  // 추가 리듀서들을 여기에 등록
});

// Redux Persist 설정
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whitelist: ['auth'], // 'auth' 슬라이스만 localStorage에 저장
};

// Persisted Reducer 생성
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Redux 스토어 생성
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Redux Persistor 생성
export const persistor = persistStore(store);

// RootState 타입 추출
export type RootState = ReturnType<typeof store.getState>;
// AppDispatch 타입 추출
export type AppDispatch = typeof store.dispatch;

// 타입이 지정된 useDispatch와 useSelector 훅 생성
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector; 
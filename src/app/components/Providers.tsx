'use client';

import React, { ReactNode } from 'react';
import { LoadingProvider } from '../context/LoadingContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '../redux/store';

interface ProvidersProps {
  children: ReactNode;
}

/**
 * 전역 프로바이더를 제공하는 컴포넌트
 * 앱에 필요한 모든 컨텍스트 프로바이더를 중첩하여 제공합니다.
 * @param {Object} props 컴포넌트 속성
 * @param {ReactNode} props.children 자식 요소
 */
export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LoadingProvider>
          {children}
        </LoadingProvider>
      </PersistGate>
    </Provider>
  );
} 
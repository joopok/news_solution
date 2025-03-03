'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import ErrorComponent from './ErrorComponent';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

/**
 * 에러 경계 컴포넌트
 * 
 * 자식 컴포넌트에서 발생하는 JavaScript 오류를 캐치하고
 * 대체 UI를 표시하는 React 컴포넌트입니다.
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // 다음 렌더링에서 대체 UI가 보이도록 상태 업데이트
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // 에러 로깅이나 에러 리포팅 서비스에 에러 정보 보내기
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // 사용자 정의 에러 핸들러 호출
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  resetError = (): void => {
    this.setState({ hasError: false, error: undefined });
  }

  render(): ReactNode {
    if (this.state.hasError) {
      // 사용자 정의 fallback이 있는 경우 표시
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // 기본 ErrorComponent 표시
      return (
        <ErrorComponent
          title="컴포넌트 오류"
          message="이 부분에서 오류가 발생했습니다. 새로고침하거나 나중에 다시 시도해주세요."
          action={this.resetError}
          actionText="오류 초기화"
        />
      );
    }

    // 오류가 없으면 정상적으로 자식 컴포넌트 렌더링
    return this.props.children;
  }
}

export default ErrorBoundary; 
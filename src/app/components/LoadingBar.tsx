'use client';

import React, { useEffect, useState } from 'react';
import { useLoading } from '../context/LoadingContext';
import { FaSpinner } from 'react-icons/fa';

/**
 * 로딩 진행 상태를 표시하는 상단 고정 로딩 바 컴포넌트
 */
export default function LoadingBar() {
  const { loading, progress } = useLoading();
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    // 로딩 상태가 변경될 때 가시성 처리
    if (loading) {
      setVisible(true);
    } else {
      // 완료 애니메이션 후 숨기기
      const hideTimer = setTimeout(() => {
        setVisible(false);
      }, 500);
      
      return () => clearTimeout(hideTimer);
    }
  }, [loading]);
  
  // 로딩 바 표시 조건 및 스타일 처리
  if (!visible && progress === 0) {
    return null;
  }
  
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200 overflow-hidden">
      <div 
        className={`h-full bg-blue-600 transition-all duration-300 ease-out`}
        style={{ 
          width: `${progress}%`,
          opacity: loading || progress < 100 ? 1 : 0,
          transition: loading 
            ? 'width 0.3s ease-out' 
            : 'width 0.3s ease-out, opacity 0.3s ease-out'
        }}
      />
    </div>
  );
} 
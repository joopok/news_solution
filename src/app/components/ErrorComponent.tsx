'use client';

import React from 'react';
import { FaExclamationTriangle, FaRedoAlt } from 'react-icons/fa';

export interface ErrorComponentProps {
  title?: string;
  message?: string;
  code?: string | number;
  action?: () => void;
  actionText?: string;
  showRefresh?: boolean;
}

/**
 * 범용 에러 컴포넌트
 * 
 * 애플리케이션 전체에서 사용 가능한 일관된 에러 UI를 제공합니다.
 * 커스텀 메시지, 액션 버튼, 새로고침 버튼 등을 지원합니다.
 */
const ErrorComponent: React.FC<ErrorComponentProps> = ({
  title = '오류가 발생했습니다',
  message = '요청을 처리하는 중 문제가 발생했습니다. 나중에 다시 시도해주세요.',
  code,
  action,
  actionText = '다시 시도',
  showRefresh = true,
}) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="w-full py-8 px-4 flex flex-col items-center justify-center text-center">
      <div className="text-red-500 mb-4">
        <FaExclamationTriangle size={48} />
      </div>
      
      <h2 className="text-xl font-bold text-gray-800 mb-2">
        {title}
        {code && <span className="ml-2 text-gray-600">({code})</span>}
      </h2>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {message}
      </p>
      
      <div className="flex flex-wrap gap-4 justify-center">
        {action && (
          <button
            onClick={action}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md flex items-center"
          >
            <FaRedoAlt className="mr-2" />
            {actionText}
          </button>
        )}
        
        {showRefresh && (
          <button
            onClick={handleRefresh}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-md flex items-center"
          >
            <FaRedoAlt className="mr-2" />
            새로고침
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorComponent; 
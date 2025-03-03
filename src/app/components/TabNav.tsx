'use client';

import { useState } from 'react';

interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
}

interface TabNavProps {
  tabs: TabItem[];
  defaultActiveTab?: string;
  className?: string;
  onChange?: (activeTabId: string) => void;
}

/**
 * 탭 네비게이션 컴포넌트
 * 
 * 여러 탭을 전환할 수 있는 네비게이션 UI를 제공합니다.
 * 
 * @param tabs 탭 아이템 배열
 * @param defaultActiveTab 기본 활성화 탭 ID (선택)
 * @param className 추가 스타일 클래스 (선택)
 * @param onChange 탭 변경 시 호출될 콜백 함수 (선택)
 */
export default function TabNav({ 
  tabs, 
  defaultActiveTab, 
  className = '',
  onChange
}: TabNavProps) {
  const [activeTab, setActiveTab] = useState(defaultActiveTab || tabs[0]?.id || '');

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    if (onChange) {
      onChange(tabId);
    }
  };

  // 현재 활성화된 탭 콘텐츠 찾기
  const activeContent = tabs.find(tab => tab.id === activeTab)?.content;

  return (
    <div className={className}>
      {/* 탭 메뉴 */}
      <div className="mb-8 border-b border-gray-200">
        <div className="flex flex-wrap -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`mr-8 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-emerald-500 text-emerald-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        {activeContent}
      </div>
    </div>
  );
} 
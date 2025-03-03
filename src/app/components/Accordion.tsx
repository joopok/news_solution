'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

interface AccordionItemProps {
  id: string | number;
  title: string;
  children: React.ReactNode;
  isExpanded: boolean;
  onToggle: (id: string | number) => void;
  className?: string;
}

/**
 * 아코디언 아이템 컴포넌트
 */
export function AccordionItem({
  id,
  title,
  children,
  isExpanded,
  onToggle,
  className = '',
}: AccordionItemProps) {
  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
      <button
        className="flex justify-between items-center w-full p-4 text-left bg-gray-50 hover:bg-gray-100"
        onClick={() => onToggle(id)}
      >
        <span className="font-medium text-gray-800">{title}</span>
        {isExpanded ? (
          <FiChevronUp className="text-gray-500" />
        ) : (
          <FiChevronDown className="text-gray-500" />
        )}
      </button>
      {isExpanded && (
        <div className="p-4 bg-white text-gray-600">
          {children}
        </div>
      )}
    </div>
  );
}

interface AccordionProps {
  items: {
    id: string | number;
    title: string;
    content: React.ReactNode;
  }[];
  className?: string;
  allowMultiple?: boolean;
  defaultExpanded?: (string | number)[];
}

/**
 * 아코디언 컴포넌트
 * 
 * 접고 펼칠 수 있는 패널 목록을 제공합니다.
 * 
 * @param items 아코디언 아이템 배열
 * @param className 추가 스타일 클래스 (선택)
 * @param allowMultiple 여러 패널을 동시에 열 수 있는지 여부 (선택, 기본값: false)
 * @param defaultExpanded 기본적으로 펼쳐진 아이템 ID 배열 (선택)
 */
export default function Accordion({
  items,
  className = '',
  allowMultiple = false,
  defaultExpanded = [],
}: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<(string | number)[]>(defaultExpanded);

  const handleToggle = (id: string | number) => {
    if (expandedItems.includes(id)) {
      // 이미 열려있는 항목 닫기
      setExpandedItems(expandedItems.filter(item => item !== id));
    } else {
      // 새 항목 열기
      if (allowMultiple) {
        setExpandedItems([...expandedItems, id]);
      } else {
        setExpandedItems([id]);
      }
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {items.map(item => (
        <AccordionItem
          key={item.id}
          id={item.id}
          title={item.title}
          isExpanded={expandedItems.includes(item.id)}
          onToggle={handleToggle}
        >
          {item.content}
        </AccordionItem>
      ))}
    </div>
  );
} 
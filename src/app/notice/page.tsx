'use client';

import { useState, FormEvent } from 'react';
import CustomLink from '../components/CustomLink';
import PageHeader from '../components/PageHeader';
import Pagination from '../components/Pagination';
import { FiSearch } from 'react-icons/fi';

// SearchBar 래퍼 컴포넌트
function SearchBarWrapper({ 
  placeholder, 
  onSearch, 
  initialValue, 
  className 
}: { 
  placeholder: string; 
  onSearch: (query: string) => void; 
  initialValue: string; 
  className?: string;
}) {
  const [searchQuery, setSearchQuery] = useState(initialValue);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className={`flex w-full ${className || ''}`}>
      <div className="relative flex-grow">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={placeholder}
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm"
        />
      </div>
      <button
        type="submit"
        className="ml-3 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
      >
        검색
      </button>
    </form>
  );
}

// 공지사항 데이터 타입
interface NoticeItem {
  id: number;
  category: string;
  title: string;
  content: string;
  date: string;
  views: number;
  isImportant: boolean;
}

// 샘플 공지사항 데이터
const noticeData: NoticeItem[] = [
  {
    id: 1,
    category: '서비스',
    title: '개인정보처리방침 개정 안내',
    content: '안녕하세요. 해피뉴스 서비스를 이용해 주시는 고객님께 감사드립니다. 해피뉴스는 개인정보보호법 관련 법령 준수를 위해 2024년 3월 1일부로 개인정보처리방침을 개정할 예정입니다. 주요 변경사항은 다음과 같습니다...',
    date: '2024-02-25',
    views: 1248,
    isImportant: true
  },
  {
    id: 2,
    category: '시스템',
    title: '시스템 점검에 따른 서비스 일시 중단 안내',
    content: '안녕하세요. 해피뉴스입니다. 보다 안정적인 서비스 제공을 위한 시스템 점검을 실시합니다. 점검 시간 동안에는 서비스 이용이 일시 중단되오니 이용에 참고하시기 바랍니다. 점검 일시: 2024년 3월 5일(화) 02:00 ~ 05:00 (3시간)...',
    date: '2024-02-20',
    views: 987,
    isImportant: true
  },
  {
    id: 3,
    category: '기능',
    title: '뉴스레터 서비스 오픈 안내',
    content: '안녕하세요. 해피뉴스입니다. 회원님들께 매일 아침 주요 뉴스를 요약해서 보내드리는 뉴스레터 서비스를 시작합니다. 관심 분야를 설정하시면 맞춤형 뉴스를 받아보실 수 있습니다...',
    date: '2024-02-15',
    views: 1563,
    isImportant: false
  },
  {
    id: 4,
    category: '앱',
    title: '모바일 앱 업데이트 안내',
    content: '안녕하세요. 해피뉴스입니다. 모바일 앱 버전 2.5.0이 출시되었습니다. 이번 업데이트에서는 성능 개선 및 버그 수정, 새로운 기능이 추가되었습니다. 자세한 내용은 본문을 참고해주세요...',
    date: '2024-02-10',
    views: 892,
    isImportant: false
  },
  {
    id: 5,
    category: '서비스',
    title: '설 연휴 고객센터 운영 안내',
    content: '안녕하세요. 해피뉴스입니다. 다가오는 설 연휴 기간 동안 고객센터 운영 시간이 조정됩니다. 2024년 2월 9일(금)~2월 12일(월)은 휴무이며, 2월 13일(화)부터 정상 운영됩니다...',
    date: '2024-02-05',
    views: 654,
    isImportant: false
  },
  {
    id: 6,
    category: '결제',
    title: '카카오페이 결제 서비스 추가 안내',
    content: '안녕하세요. 해피뉴스입니다. 회원님들의 편의를 위해 카카오페이 결제 서비스를 추가하였습니다. 이제 프리미엄 구독 결제 시 카카오페이로도 간편하게 결제하실 수 있습니다...',
    date: '2024-01-28',
    views: 1124,
    isImportant: false
  },
  {
    id: 7,
    category: '이벤트',
    title: '신규 회원 가입 혜택 안내',
    content: '안녕하세요. 해피뉴스입니다. 새로운 회원 가입 혜택이 업데이트되었습니다. 신규 가입 시 프리미엄 뉴스 1개월 무료 이용권을 드립니다. 지금 바로 가입하고 혜택을 누려보세요...',
    date: '2024-01-20',
    views: 2358,
    isImportant: false
  },
  {
    id: 8,
    category: '서비스',
    title: '회원 등급 혜택 개편 안내',
    content: '안녕하세요. 해피뉴스입니다. 보다 나은 서비스 제공을 위해 회원 등급 혜택을 개편합니다. 실버, 골드, 플래티넘 등급별로 차별화된 혜택을 제공하며, 이용 실적에 따라 등급이 상승합니다...',
    date: '2024-01-15',
    views: 1736,
    isImportant: false
  },
  {
    id: 9,
    category: '기능',
    title: '댓글 기능 개선 안내',
    content: '안녕하세요. 해피뉴스입니다. 더 나은 소통 환경을 위해 댓글 기능을 개선하였습니다. 이제 댓글에 이미지를 첨부할 수 있으며, 대댓글 알림 기능이 추가되었습니다...',
    date: '2024-01-10',
    views: 864,
    isImportant: false
  },
  {
    id: 10,
    category: '서비스',
    title: '개인정보처리방침 개정 안내 (2023년 12월)',
    content: '안녕하세요. 해피뉴스 서비스를 이용해 주시는 고객님께 감사드립니다. 해피뉴스는 개인정보보호법 관련 법령 준수를 위해 2023년 12월 31일부로 개인정보처리방침을 개정하였습니다...',
    date: '2023-12-28',
    views: 1046,
    isImportant: false
  },
];

export default function NoticePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // 검색 기능
  const filteredNotices = noticeData
    .filter(notice => 
      notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      notice.content.toLowerCase().includes(searchQuery.toLowerCase())
    )
    // 등록일 기준 최신순 정렬
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 페이지네이션 관련 변수
  const totalPages = Math.ceil(filteredNotices.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredNotices.slice(indexOfFirstItem, indexOfLastItem);

  // 검색 핸들러
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="공지사항"
        description="해피뉴스의 중요한 소식과 업데이트 정보를 확인하세요."
        className="mb-6"
      />

      {/* 검색 */}
      <div className="mb-6">
        <SearchBarWrapper
          placeholder="공지사항 검색..."
          onSearch={handleSearch}
          initialValue={searchQuery}
          className="max-w-md"
        />
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white shadow rounded-lg overflow-hidden mb-6">
        <div className="min-w-full divide-y divide-gray-200">
          <div className="bg-gray-50">
            <div className="grid grid-cols-12 py-3.5 px-4 text-sm font-medium text-gray-500">
              <div className="col-span-1 text-center">번호</div>
              <div className="col-span-2 text-center">분류</div>
              <div className="col-span-6">제목</div>
              <div className="col-span-2 text-center">등록일</div>
              <div className="col-span-1 text-center">조회</div>
            </div>
          </div>
          <div className="bg-white divide-y divide-gray-200">
            {currentItems.length > 0 ? (
              currentItems.map((notice) => (
                <CustomLink
                  key={notice.id}
                  href={`/notice/${notice.id}`}
                  className="grid grid-cols-12 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                >
                  <div className="col-span-1 py-4 px-4 text-center text-sm text-gray-500">
                    {notice.isImportant ? (
                      <span className="font-medium text-red-600">공지</span>
                    ) : (
                      notice.id
                    )}
                  </div>
                  <div className="col-span-2 py-4 px-4 text-center text-sm">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {notice.category}
                    </span>
                  </div>
                  <div className="col-span-6 py-4 px-4 text-sm font-medium text-gray-900 truncate">
                    {notice.title}
                    {notice.isImportant && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        중요
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 py-4 px-4 text-center text-sm text-gray-500">
                    {notice.date}
                  </div>
                  <div className="col-span-1 py-4 px-4 text-center text-sm text-gray-500">
                    {notice.views.toLocaleString()}
                  </div>
                </CustomLink>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500 col-span-12">
                검색 결과가 없습니다.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 페이지네이션 */}
      {filteredNotices.length > 0 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          maxVisiblePages={5}
        />
      )}
    </div>
  );
} 
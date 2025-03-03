'use client';

import { useState } from 'react';
import CustomLink from '../../components/CustomLink';
import { FiSearch } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import BackLink from '../../components/BackLink';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';

// 공지사항 데이터
const noticeData = [
  {
    id: 1,
    category: '서비스',
    title: '개인정보처리방침 개정 안내',
    date: '2024-02-25',
    views: 1248,
    important: true,
    link: '/customer/notice/1'
  },
  {
    id: 2,
    category: '시스템',
    title: '시스템 점검에 따른 서비스 일시 중단 안내',
    date: '2024-02-20',
    views: 987,
    important: true,
    link: '/customer/notice/2'
  },
  {
    id: 3,
    category: '기능',
    title: '뉴스레터 서비스 오픈 안내',
    date: '2024-02-15',
    views: 1563,
    important: false,
    link: '/customer/notice/3'
  },
  {
    id: 4,
    category: '앱',
    title: '모바일 앱 업데이트 안내',
    date: '2024-02-10',
    views: 892,
    important: false,
    link: '/customer/notice/4'
  },
  {
    id: 5,
    category: '서비스',
    title: '설 연휴 고객센터 운영 안내',
    date: '2024-02-05',
    views: 654,
    important: false,
    link: '/customer/notice/5'
  },
  {
    id: 6,
    category: '결제',
    title: '카카오페이 결제 서비스 추가 안내',
    date: '2024-01-28',
    views: 1124,
    important: false,
    link: '/customer/notice/6'
  },
  {
    id: 7,
    category: '이벤트',
    title: '신규 회원 가입 혜택 안내',
    date: '2024-01-20',
    views: 2358,
    important: false,
    link: '/customer/notice/7'
  },
  {
    id: 8,
    category: '서비스',
    title: '회원 등급 혜택 개편 안내',
    date: '2024-01-15',
    views: 1736,
    important: false,
    link: '/customer/notice/8'
  },
  {
    id: 9,
    category: '기능',
    title: '댓글 기능 개선 안내',
    date: '2024-01-10',
    views: 864,
    important: false,
    link: '/customer/notice/9'
  },
  {
    id: 10,
    category: '서비스',
    title: '개인정보처리방침 개정 안내 (2023년 12월)',
    date: '2023-12-28',
    views: 1046,
    important: false,
    link: '/customer/notice/10'
  },
];

export default function NoticePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 검색 기능
  const filteredNotices = noticeData.filter(notice => 
    notice.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    notice.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
      {/* 뒤로가기 링크 */}
      <BackLink href="/customer" label="고객센터로 돌아가기" />
      
      {/* 헤더 */}
      <PageHeader
        title="공지사항"
        description="뉴스 서비스의 중요한 소식과 업데이트 정보를 확인하세요."
      />

      {/* 검색 */}
      <div className="mb-6">
        <SearchBar
          placeholder="공지사항 검색..."
          onSearch={handleSearch}
          initialValue={searchQuery}
          className="max-w-md"
        />
      </div>

      {/* 공지사항 목록 */}
      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
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
                  href={notice.link}
                  className="grid grid-cols-12 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                >
                  <div className="col-span-1 py-4 px-4 text-center text-sm text-gray-500">
                    {notice.important ? (
                      <span className="font-medium text-red-600">공지</span>
                    ) : (
                      notice.id
                    )}
                  </div>
                  <div className="col-span-2 py-4 px-4 text-center text-sm text-gray-500">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                      {notice.category}
                    </span>
                  </div>
                  <div className="col-span-6 py-4 px-4 text-sm font-medium text-gray-900 truncate">
                    {notice.title}
                    {notice.important && (
                      <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800">
                        중요
                      </span>
                    )}
                  </div>
                  <div className="col-span-2 py-4 px-4 text-center text-sm text-gray-500">
                    {notice.date}
                  </div>
                  <div className="col-span-1 py-4 px-4 text-center text-sm text-gray-500">
                    {notice.views}
                  </div>
                </CustomLink>
              ))
            ) : (
              <div className="py-8 text-center text-gray-500">
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
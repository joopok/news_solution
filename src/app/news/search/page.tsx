'use client';

import { useState, useEffect } from 'react';
import CustomLink from '../../components/CustomLink';
import { FiSearch, FiCalendar, FiEye, FiClock, FiChevronRight } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import TabNav from '../../components/TabNav';
import SearchBar from '../../components/SearchBar';
import Pagination from '../../components/Pagination';
import { NewsItem, Section } from '../../types/types';

// 샘플 검색 결과 데이터
const sampleNewsData: NewsItem[] = [
  {
    id: 1,
    title: '정부, 신재생에너지 지원 확대 예산 발표',
    summary: '정부가 내년도 신재생에너지 관련 지원 예산을 20% 증액하기로 결정했다. 이는 탄소중립 정책의 일환으로...',
    category: '경제',
    section: 'economy',
    date: '2024-02-28',
    views: 1543,
    link: '/news/economy/1',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 2,
    title: '여야, 주요 민생법안 처리 합의...국회 정상화 전망',
    summary: '여야가 그동안 쟁점이 되었던 민생법안 처리에 합의하면서 국회 정상화가 가능해질 전망이다. 양당은...',
    category: '정치',
    section: 'politics',
    date: '2024-02-27',
    views: 2132,
    link: '/news/politics/2',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 3,
    title: '식약처, 고혈압 치료제 3종 품목 허가 취소',
    summary: '식품의약품안전처가 불순물 함유 우려가 있는 고혈압 치료제 3종의 품목 허가를 취소했다고 밝혔다. 해당 제품은...',
    category: '사회',
    section: 'society',
    date: '2024-02-28',
    views: 1876,
    link: '/news/society/3',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 4,
    title: '미-중 무역갈등 심화...글로벌 공급망 비상',
    summary: '미국과 중국 간 무역갈등이 심화되면서 글로벌 공급망에 비상이 걸렸다. 전문가들은 이번 갈등이 장기화될 경우...',
    category: '국제',
    section: 'world',
    date: '2024-02-26',
    views: 1432,
    link: '/news/world/4',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 5,
    title: '국내 인공지능 스타트업, 120억 규모 투자 유치',
    summary: '국내 인공지능 스타트업 A사가 120억 규모의 투자를 유치했다고 발표했다. 이번 투자는 실리콘밸리의 유명 벤처캐피탈이...',
    category: 'IT/과학',
    section: 'tech',
    date: '2024-02-28',
    views: 1987,
    link: '/news/tech/5',
    isPremium: true,
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 6,
    title: '올림픽 금메달리스트 인터뷰: "끝까지 포기하지 않았다"',
    summary: '최근 동계올림픽에서 금메달을 따낸 국가대표 선수와의 인터뷰에서 그는 "끝까지 포기하지 않은 것이 성공 비결"이라고 밝혔다...',
    category: '스포츠',
    section: 'sports',
    date: '2024-02-25',
    views: 2435,
    link: '/news/sports/6',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 7,
    title: '부산국제영화제, 올해의 라인업 발표...역대 최다 출품',
    summary: '부산국제영화제 조직위원회가 올해 행사의 공식 라인업을 발표했다. 이번 영화제는 역대 최다 출품작을 선보일 예정으로...',
    category: '문화',
    section: 'culture',
    date: '2024-02-27',
    views: 1254,
    link: '/news/culture/7',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 8,
    title: '인기 아이돌 그룹, 신곡으로 음원차트 석권',
    summary: '인기 아이돌 그룹이 발매한 신곡이 각종 음원차트를 석권하며 화제다. 발매 직후 멜론, 지니뮤직 등 주요 음원사이트에서...',
    category: '연예',
    section: 'entertainment',
    date: '2024-02-28',
    views: 3241,
    link: '/news/entertainment/8',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 9,
    title: '교육부, 새학기 학교 안전 대책 발표',
    summary: '교육부가 새학기를 맞아 학교 안전 종합 대책을 발표했다. 이번 대책은 학교폭력 예방과 안전한 교육환경 조성에 초점을...',
    category: '사회',
    section: 'society',
    date: '2024-02-25',
    views: 1132,
    link: '/news/society/9',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 10,
    title: '우주탐사선, 새로운 행성 탐사 이미지 공개',
    summary: '국제우주기구가 최근 발사한 우주탐사선이 보내온 새로운 행성 탐사 이미지가 공개되었다. 이 이미지에는 기존에 발견되지 않았던...',
    category: 'IT/과학',
    section: 'tech',
    date: '2024-02-24',
    views: 1876,
    link: '/news/tech/10',
    isPremium: true,
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 11,
    title: '중앙은행, 기준금리 동결 결정... 시장 예상과 부합',
    summary: '중앙은행 금융통화위원회가 기준금리를 현 수준에서 동결하기로 결정했다. 이는 시장의 예상과 일치하는 결과로...',
    category: '경제',
    section: 'economy',
    date: '2024-02-23',
    views: 1432,
    link: '/news/economy/11',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
  {
    id: 12,
    title: '한국 IT 기업들, 글로벌 인공지능 시장 점유율 높여',
    summary: '국내 주요 IT 기업들의 인공지능 분야 글로벌 시장 점유율이 지속적으로 높아지고 있다는 조사 결과가 발표됐다. 특히 자연어 처리와...',
    category: 'IT/과학',
    section: 'tech',
    date: '2024-02-22',
    views: 1678,
    link: '/news/tech/12',
    thumbnail: 'https://placehold.co/100x70/dddddd/333333',
  },
];

// 섹션별 검색 결과 집계 함수
const getSectionCounts = (data: NewsItem[], query: string): Section[] => {
  // 검색어가 있는 경우에만 필터링
  const filteredData = query
    ? data.filter(
        item =>
          item.title.toLowerCase().includes(query.toLowerCase()) ||
          item.summary.toLowerCase().includes(query.toLowerCase())
      )
    : data;

  // 전체 섹션 정의
  const allSections: Section[] = [
    { id: 'all', label: '전체', count: 0 },
    { id: 'politics', label: '정치', count: 0 },
    { id: 'economy', label: '경제', count: 0 },
    { id: 'society', label: '사회', count: 0 },
    { id: 'world', label: '국제', count: 0 },
    { id: 'culture', label: '문화', count: 0 },
    { id: 'sports', label: '스포츠', count: 0 },
    { id: 'entertainment', label: '연예', count: 0 },
    { id: 'tech', label: 'IT/과학', count: 0 },
  ];

  // 전체 개수 설정
  allSections[0].count = filteredData.length;

  // 각 섹션별 개수 계산
  filteredData.forEach(item => {
    const sectionItem = allSections.find(section => section.id === item.section);
    if (sectionItem) {
      sectionItem.count += 1;
    }
  });

  return allSections;
};

export default function NewsSearchPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSection, setActiveSection] = useState('all');
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [sections, setSections] = useState<Section[]>([]);
  const itemsPerPage = 5;

  // URL에서 검색어 가져오기
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q') || '';
      setSearchQuery(query);
    }
  }, []);

  // 검색어가 변경될 때 결과 업데이트
  useEffect(() => {
    performSearch();
  }, [searchQuery, activeSection]);

  // 검색 수행 함수
  const performSearch = () => {
    // 전체 섹션 카운트 계산
    const sectionCounts = getSectionCounts(sampleNewsData, searchQuery);
    setSections(sectionCounts);

    // 검색어에 따라 필터링
    let results = sampleNewsData;
    
    // 검색어 필터링
    if (searchQuery) {
      results = results.filter(
        item => 
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.summary.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // 섹션 필터링
    if (activeSection !== 'all') {
      results = results.filter(item => item.section === activeSection);
    }
    
    // 날짜 순으로 정렬 (최신순)
    results = [...results].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setSearchResults(results);
    setCurrentPage(1); // 검색 결과가 바뀌면 1페이지로 이동
  };

  // 검색 핸들러
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // URL 업데이트
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('q', query);
      window.history.pushState({}, '', url.toString());
    }
  };

  // 탭 변경 핸들러
  const handleTabChange = (tabId: string) => {
    setActiveSection(tabId);
  };

  // 페이지네이션 관련 변수
  const totalPages = Math.ceil(searchResults.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = searchResults.slice(indexOfFirstItem, indexOfLastItem);

  // 탭 아이템 생성
  const tabItems = sections.map(section => ({
    id: section.id,
    label: `${section.label} (${section.count})`,
    content: (
      <div className="space-y-6">
        {currentItems.length > 0 ? (
          <>
            <div className="space-y-5">
              {currentItems.map((news) => (
                <CustomLink 
                  key={news.id} 
                  href={news.link}
                  className="block bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-col md:flex-row">
                    {news.thumbnail && (
                      <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-4">
                        <div className="relative h-[70px] w-[100px] bg-gray-200 rounded">
                          <img 
                            src={news.thumbnail} 
                            alt={news.title} 
                            className="object-cover rounded h-full w-full"
                          />
                        </div>
                      </div>
                    )}
                    <div className="flex-grow">
                      <div className="flex items-center mb-2">
                        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded mr-2">
                          {news.category}
                        </span>
                        {news.isPremium && (
                          <span className="px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                            프리미엄
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{news.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{news.summary}</p>
                      <div className="flex items-center text-xs text-gray-500 space-x-4">
                        <span className="flex items-center">
                          <FiCalendar className="mr-1" /> {news.date}
                        </span>
                        <span className="flex items-center">
                          <FiEye className="mr-1" /> 조회 {news.views}
                        </span>
                      </div>
                    </div>
                  </div>
                </CustomLink>
              ))}
            </div>
            {/* 페이지네이션 */}
            <Pagination 
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        ) : (
          <div className="py-16 text-center">
            <div className="inline-block p-6 bg-gray-100 rounded-full mb-4">
              <FiSearch className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">검색 결과가 없습니다</h3>
            <p className="text-gray-500">
              다른 검색어를 입력하시거나 필터를 변경해보세요.
            </p>
          </div>
        )}
      </div>
    ),
  }));

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="뉴스 검색"
        description={searchQuery ? `'${searchQuery}' 검색 결과` : "원하시는 뉴스를 검색해보세요"}
      />

      {/* 검색창 */}
      <div className="mb-8">
        <SearchBar
          placeholder="검색어를 입력하세요"
          onSearch={handleSearch}
          initialValue={searchQuery}
          buttonText="검색"
        />
      </div>

      {/* 검색 결과 요약 */}
      {searchQuery && (
        <div className="mb-6 p-4 bg-blue-50 rounded-lg">
          <p className="text-blue-700">
            <strong>'{searchQuery}'</strong>에 대한 검색 결과 총 <strong>{searchResults.length}</strong>건이 검색되었습니다.
            <span className="text-sm text-gray-500 ml-2">
              <FiClock className="inline mr-1" /> 최신순으로 정렬됨
            </span>
          </p>
        </div>
      )}

      {/* 섹션 탭 */}
      <TabNav 
        tabs={tabItems} 
        defaultActiveTab="all" 
        onTabChange={handleTabChange}
      />
    </div>
  );
} 
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useLoading } from '../context/LoadingContext';
import TopHeadlines from './TopHeadlines';
import MainSlider from './MainSlider';
import AdBanner from './AdBanner';
import NewsGrid from '@/app/layout/NewsGrid';
import useNavigationLoading from '../hooks/useNavigationLoading';
import { FaAngleRight } from 'react-icons/fa';
import PollContents from './PollContents';
import { useMainData } from '../hooks/useMainData';
import SkeletonLoading from '../components/SkeletonLoading';

// 지연 로딩할 컴포넌트들
const TrendingNews = dynamic(() => import('./TrendingNews'), {
  loading: () => <SkeletonLoading type="trending" />,
  ssr: true
});

const BestClickNews = dynamic(() => import('./BestClickNews'), {
  loading: () => <SkeletonLoading type="news" count={3} />,
  ssr: true
});

// 샘플 슬라이더 데이터
const sampleSlides = [
  {
    id: 1,
    title: '뉴질랜드서 5억년전 장미모양 해양동물 발견 지금까지 보지 못한 구조',
    summary: '뉴질랜드 한 섬의 고생대암석층에서 장미모양 해양동물 화석발견해외 사이언스지에 따르면, 뉴질랜드 한 섬에서 4억년전 바다에서 살았던 기이한 장미모양의 해양동물화석을 발견했다고 보고했다.',
    image: 'https://placehold.co/1200x600/0066cc/white?text=메인+슬라이드+1',
    category: '과학',
    link: '/news/1'
  },
  {
    id: 2,
    title: '대박의 꿈~ 라스베가스~',
    summary: '욕망의 도시 라스베가스...대박의 꿈을 꾸다...성수기를 앞두고 있지만, 항공권을 낮추어 고객유치를 올리고 있다.',
    image: 'https://placehold.co/1200x600/cc3300/white?text=메인+슬라이드+2',
    category: '세계',
    link: '/news/2'
  },
  {
    id: 3,
    title: '물속에서 헤엄치는 로봇물고기',
    summary: '시대가 시대이니 만큼 물속에서 헤엄치는 물고기 로봇도 나왔습니다. 형태나 움직임도 거의 물고기와 흡사하며 물밖에선 가만히 있지만 물속에 넣으면 자동으로 움직입니다.',
    image: 'https://placehold.co/1200x600/9900cc/white?text=메인+슬라이드+3',
    category: 'IT.과학',
    link: '/news/3'
  }
];

// 샘플 헤드라인 데이터
const sampleHeadlines = [
  {
    id: 1,
    title: '국내 최대 규모 AI 컨퍼런스 개최, 전국 개발자 5천명 참가',
    summary: '국내 최대 규모의 인공지능 컨퍼런스가 이번 주말 서울 코엑스에서 개최되어 전국에서 5천명의 개발자들이 참가했다.',
    category: 'IT/과학',
    image: 'https://placehold.co/600x300/0066cc/white?text=헤드라인+1',
    date: '2025.02.24',
    views: 3250,
    reporter: '김테크 기자'
  },
  {
    id: 2,
    title: '세계보건기구, 신종 바이러스 확산에 대응 방안 발표',
    summary: '세계보건기구(WHO)가 최근 발견된 신종 바이러스의 확산을 막기 위한 글로벌 대응 방안을 발표했다.',
    category: '세계',
    image: 'https://placehold.co/600x300/cc3300/white?text=헤드라인+2',
    date: '2025.02.23',
    views: 2840,
    reporter: '박국제 기자'
  },
  {
    id: 3,
    title: '중앙은행, 기준금리 0.25%p 인하 결정',
    summary: '중앙은행 금융통화위원회가 경기 둔화 우려에 대응하기 위해 기준금리를 0.25%p 인하하기로 결정했다.',
    category: '경제',
    image: 'https://placehold.co/600x300/009933/white?text=헤드라인+3',
    date: '2025.02.22',
    views: 2510,
    reporter: '정경제 기자'
  },
  {
    id: 4,
    title: '국내 첫 수소전기 선박 진수, 친환경 해운 시대 개막',
    summary: '국내 조선업계가 개발한 첫 수소전기 추진 선박이 오늘 진수식을 갖고 친환경 해운 시대의 개막을 알렸다.',
    category: '산업',
    image: 'https://placehold.co/600x300/9900cc/white?text=헤드라인+4',
    date: '2025.02.21',
    views: 1965,
    reporter: '한산업 기자'
  }
];

// 실시간 인기 뉴스
const sampleTrendingNews = [
  {
    id: 1,
    title: "뉴질랜드서 5억년전 장미모양 해양동물 발견",
    views: 12840,
    date: "2025.02.24",
    hot: true,
    category: "과학"
  },
  {
    id: 2,
    title: "세계보건기구, 신종 바이러스 확산에 대응 방안 발표",
    views: 10254,
    date: "2025.02.23", 
    hot: true,
    category: "세계"
  },
  {
    id: 3,
    title: "물속에서 헤엄치는 로봇물고기",
    views: 9620,
    date: "2025.02.22",
    hot: true,
    category: "IT"
  },
  {
    id: 4,
    title: "중앙은행, 기준금리 0.25%p 인하 결정",
    views: 8540,
    date: "2025.02.22",
    hot: false,
    category: "경제"
  },
  {
    id: 5,
    title: "국내 첫 수소전기 선박 진수, 친환경 해운 시대 개막",
    views: 7895,
    date: "2025.02.21",
    hot: false,
    category: "산업"
  },
  {
    id: 6,
    title: "대체육 시장 성장세, 지속가능한 식품 산업의 미래",
    views: 7254,
    date: "2025.02.21",
    hot: false,
    category: "경제"
  },
  {
    id: 7,
    title: "국내 반도체 산업 호황, 수출 실적 2년 만에 최고치 기록",
    views: 6825,
    date: "2025.02.20",
    hot: false,
    category: "경제"
  },
  {
    id: 8,
    title: "우주탐사선 '호라이즌', 명왕성 근처 새로운 위성 발견",
    views: 6410,
    date: "2025.02.20",
    hot: false,
    category: "과학"
  },
  {
    id: 9,
    title: "새로운 배터리 기술 개발, 전기차 주행거리 2배 늘어날 전망",
    views: 5936,
    date: "2025.02.19",
    hot: false,
    category: "과학"
  },
  {
    id: 10,
    title: "인공지능 기반 개인 맞춤형 학습 시스템 공교육 도입 시작",
    views: 5378,
    date: "2025.02.19",
    hot: false,
    category: "IT"
  }
];

/**
 * 메인 페이지 컴포넌트
 * 헤드라인, 슬라이더, 뉴스 그리드 등을 포함합니다.
 */
export default function Main() {
  const { setLoading } = useLoading();
  const { startLoading, stopLoading } = useNavigationLoading();
  const [isSimulatingLoading, setIsSimulatingLoading] = useState(false);
  
  // API 데이터 호출 (캐싱됨)
  const { data, isLoading: isDataLoading, error, isEmpty } = useMainData();
  
  // 초기 로딩 효과
  useEffect(() => {
    setLoading(isDataLoading);
    
    return () => {
      setLoading(false);
    };
  }, [setLoading, isDataLoading]);
  
  // 데이터가 없거나 에러가 발생한 경우 메시지 표시
  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 flex items-center justify-center min-h-[50vh]">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">오류가 발생했습니다</h2>
          <p className="text-gray-700">데이터를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.</p>
          <div className="mt-4">
            <button 
              onClick={() => window.location.reload()} 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              새로고침
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  if (isEmpty || (!isDataLoading && !data)) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-bold text-gray-700 mb-2">데이터가 없습니다</h2>
          <p className="text-gray-600">표시할 뉴스 콘텐츠가 없습니다. 나중에 다시 확인해주세요.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="w-full">
      <div className="container mx-auto px-4">
        {/* 메인 슬라이더 + 주요 헤드라인 영역 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <Suspense fallback={<SkeletonLoading type="banner" />}>
              <MainSlider slides={data?.banners ? data.banners.map(b => ({
                id: b.id,
                title: b.title,
                summary: b.title,
                image: b.imageUrl,
                link: b.link,
                category: '뉴스'
              })) : sampleSlides} />
            </Suspense>
          </div>
          <div className="lg:col-span-1">
            <Suspense fallback={<SkeletonLoading type="news" count={4} />}>
              <TopHeadlines headlines={data?.latestNews || sampleHeadlines} />
            </Suspense>
          </div>
        </div>
        
        {/* 중간 배너 광고 */}
        <div className="my-8">
          <AdBanner type="horizontal" />
        </div>
        
        {/* 3열 뉴스 그리드 영역 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
          <div className="col-span-1 md:col-span-2">
            <Suspense fallback={<SkeletonLoading type="content" showMessage={true} message="주요 뉴스를 불러오고 있습니다..." />}>
              <NewsGrid category="주요뉴스" limit={6} emptyMessage="표시할 주요 뉴스가 없습니다." />
            </Suspense>
          </div>
          <div className="col-span-1">
            <Suspense fallback={<SkeletonLoading type="trending" showMessage={true} message="인기 뉴스를 불러오고 있습니다..." />}>
              <TrendingNews news={data?.trendingNews || sampleTrendingNews} />
            </Suspense>
            
            {/* 베스트 클릭 뉴스 추가 */}
            <div className="mt-6">
              <Suspense fallback={<SkeletonLoading type="news" count={3} showMessage={true} message="베스트 클릭 뉴스를 불러오고 있습니다..." />}>
                <BestClickNews news={data?.trendingNews || sampleTrendingNews} />
              </Suspense>
            </div>
          </div>
        </div>
        
        {/* 아래쪽 추가 뉴스 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          <div>
            <Suspense fallback={<SkeletonLoading type="news" count={3} showMessage={true} message="사회 뉴스를 불러오고 있습니다..." />}>
              <NewsGrid category="사회" limit={3} emptyMessage="표시할 사회 뉴스가 없습니다." />
            </Suspense>
          </div>
          <div>
            <Suspense fallback={<SkeletonLoading type="news" count={3} showMessage={true} message="경제 뉴스를 불러오고 있습니다..." />}>
              <NewsGrid category="경제" limit={3} emptyMessage="표시할 경제 뉴스가 없습니다." />
            </Suspense>
          </div>
        </div>
        
        {/* 하단 배너 광고 */}
        <div className="my-8">
          <AdBanner type="horizontal" />
        </div>
        
        {/* 추천 포토 뉴스 섹션 */}
        <div className="bg-gray-800 p-6 rounded-lg my-8">
          <h3 className="text-xl font-bold mb-6 text-white">추천 포토 뉴스</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <Link href={`/news/${item}`} key={item} className="block group">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={`https://placehold.co/400x225/333333/ffffff?text=포토뉴스+${item}`} 
                    alt={`포토 뉴스 ${item}`} 
                    className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    loading="lazy" // 지연 로딩 추가
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-3">
                    <h4 className="text-white text-sm font-medium line-clamp-2">
                      흥미로운 포토 기사 제목 {item}
                    </h4>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* 생활.문화 & 별난뉴스 섹션 (가로 배치) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* 생활.문화 섹션 */}
          <div>
            <div className="border-b-2 border-blue-500 pb-2 mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">생활.문화</h3>
              <Link href="/category/culture" className="text-sm text-gray-500 hover:text-blue-500 flex items-center">
                더보기 <FaAngleRight className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {/* 대표 뉴스 */}
              <div>
                <Link href="/news/culture/1" className="block group">
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0 w-1/3">
                      <img 
                        src="https://placehold.co/400x225/006633/white?text=생활문화+대표" 
                        alt="생활문화 뉴스" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="w-2/3">
                      <h4 className="font-bold mb-1 text-gray-800 group-hover:text-blue-600 line-clamp-2">
                        &apos;심리적 거리 줄이는 대화법&apos; 활용한 따뜻한 인간관계 만들기
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">2025.02.24</div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* 리스트 뉴스 */}
              <ul className="space-y-2 mt-2">
                {[
                  '한국 책 읽은 인구가 겨우 0.2% 뿐',
                  '미술관에서 즐기는 주말, 3월 주목할만한 전시회 5선',
                  '발효음식의 건강학: 전통 장 담그기부터 현대적 활용법까지',
                ].map((title, idx) => (
                  <li key={idx} className="text-sm">
                    <Link href={`/news/culture/${idx + 2}`} className="group">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 mt-1.5 mr-2 flex-shrink-0"></div>
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600">{title}</h4>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 별난뉴스 섹션 */}
          <div>
            <div className="border-b-2 border-purple-500 pb-2 mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">별난뉴스</h3>
              <Link href="/category/odd" className="text-sm text-gray-500 hover:text-purple-500 flex items-center">
                더보기 <FaAngleRight className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {/* 대표 뉴스 */}
              <div>
                <Link href="/news/odd/1" className="block group">
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0 w-1/3">
                      <img 
                        src="https://placehold.co/400x225/9900cc/white?text=별난뉴스+대표" 
                        alt="별난뉴스 대표" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="w-2/3">
                      <h4 className="font-bold mb-1 text-gray-800 group-hover:text-purple-600 line-clamp-2">
                        일본의 정체성 &apos;화&apos; 정신
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">2025.02.24</div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* 리스트 뉴스 */}
              <ul className="space-y-2 mt-2">
                {[
                  '별난음식 "토마토의 젤리"',
                  '감사카메라가 당신을 촬영본다',
                  '여행기중 장난으로 머리 굳히질 하구선',
                ].map((title, idx) => (
                  <li key={idx} className="text-sm">
                    <Link href={`/news/odd/${idx + 2}`} className="group">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-purple-500 mt-1.5 mr-2 flex-shrink-0"></div>
                        <h4 className="font-medium text-gray-800 group-hover:text-purple-600">{title}</h4>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* IT.과학 & 뷰티/리빙 섹션 (가로 배치) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
          {/* IT.과학 섹션 */}
          <div>
            <div className="border-b-2 border-blue-600 pb-2 mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">IT.과학</h3>
              <Link href="/category/tech" className="text-sm text-gray-500 hover:text-blue-600 flex items-center">
                더보기 <FaAngleRight className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {/* 대표 뉴스 */}
              <div>
                <Link href="/news/tech/1" className="block group">
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0 w-1/3">
                      <img 
                        src="https://placehold.co/400x225/0066cc/white?text=IT과학+대표" 
                        alt="IT과학 뉴스" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="w-2/3">
                      <h4 className="font-bold mb-1 text-gray-800 group-hover:text-blue-600 line-clamp-2">
                        LOR 챔피언스 리그 결승전
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">2025.02.24</div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* 리스트 뉴스 */}
              <ul className="space-y-2 mt-2">
                {[
                  '강원지역 멸종위기어류 불법포획',
                  '기상천외 아이디어 발명!',
                  '물속에서 헤엄치는 로봇물고기'
                ].map((title, idx) => (
                  <li key={idx} className="text-sm">
                    <Link href={`/news/tech/${idx + 2}`} className="group">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-blue-600 mt-1.5 mr-2 flex-shrink-0"></div>
                        <h4 className="font-medium text-gray-800 group-hover:text-blue-600">{title}</h4>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* 뷰티/리빙 섹션 */}
          <div>
            <div className="border-b-2 border-pink-500 pb-2 mb-4 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">뷰티/리빙</h3>
              <Link href="/category/beauty" className="text-sm text-gray-500 hover:text-pink-500 flex items-center">
                더보기 <FaAngleRight className="ml-1" />
              </Link>
            </div>
            
            <div className="space-y-4">
              {/* 대표 뉴스 */}
              <div>
                <Link href="/news/beauty/1" className="block group">
                  <div className="flex">
                    <div className="mr-4 flex-shrink-0 w-1/3">
                      <img 
                        src="https://placehold.co/400x225/cc3366/white?text=뷰티리빙+대표" 
                        alt="뷰티/리빙 뉴스" 
                        className="w-full h-auto object-cover"
                      />
                    </div>
                    <div className="w-2/3">
                      <h4 className="font-bold mb-1 text-gray-800 group-hover:text-pink-500 line-clamp-2">
                        세계에서 2번째로 큰 수족관 오키나와 추라우미
                      </h4>
                      <div className="text-xs text-gray-500 mt-1">2025.02.24</div>
                    </div>
                  </div>
                </Link>
              </div>
              
              {/* 리스트 뉴스 */}
              <ul className="space-y-2 mt-2">
                {[
                  '비슬라프 하올리브의 리빙선데이',
                  '[네이버지도사다함] 매화 식당의 인기가 하늘을 치솟는다.',
                  '겨울에도 딸기가 딸기가 좋아!!'
                ].map((title, idx) => (
                  <li key={idx} className="text-sm">
                    <Link href={`/news/beauty/${idx + 2}`} className="group">
                      <div className="flex items-start">
                        <div className="w-2 h-2 bg-pink-500 mt-1.5 mr-2 flex-shrink-0"></div>
                        <h4 className="font-medium text-gray-800 group-hover:text-pink-500">{title}</h4>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* PDF 월간발행 섹션 (단독 배치) */}
        <div className="my-8">
          <div className="border-b-2 border-green-500 pb-2 mb-4 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">PDF 월간발행</h3>
            <Link href="/publications/monthly" className="text-sm text-gray-500 hover:text-green-500 flex items-center">
              더보기 <FaAngleRight className="ml-1" />
            </Link>
          </div>

          <div className="flex flex-wrap">
            <div className="w-full mb-3">
              <div className="bg-gray-100 p-3">
                <p className="text-sm">본 PDF 지면 내용을 보시려면 <span className="text-red-500">아크로뱃리더를 설치하셔야 합니다.</span></p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
              {['15년 1월 24일자 지면', '15년 1월 22일자 지면', '15년 1월 20일자 지면', '15년 1월 18일자 지면'].map((issue, idx) => (
                <div key={idx} className="group">
                  <Link href={`/publications/monthly/${idx + 1}`}>
                    <div className="mb-2">
                      <img 
                        src={`https://placehold.co/250x350/009933/white?text=${issue}`}
                        alt={issue}
                        className="w-full h-auto"
                      />
                    </div>
                    <div className="text-center text-sm">
                      {issue} {idx < 2 && <span className="ml-1 text-blue-500 font-bold">NEW</span>}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>

        <PollContents />
      </div>
    </div>
  );
}
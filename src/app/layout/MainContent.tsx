import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import { MainContentProps, NewsSectionProps, ArticlePreviewProps, ViewCountProps, TabItemProps } from '@/app/types/types';

export default function MainContent({ children }: MainContentProps) {
  const isLoading = true;

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 py-6">
        <Skeleton count={5} height={100} />
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-6">
      {children}
      
      <div className="contents_typed">
        <div className="flex flex-col md:flex-row w-full">
          {/* 메인 컨텐츠 영역 */}
          <div className="w-full md:w-2/3 md:pr-5">
            {/* 골프/일반 뉴스 섹션 */}
            <NewsSection 
              category="골프/일반"
              title="활성화된 종목은 스케이트보드, 어그레시브 인라인스케이트 익스트림 스포츠종류와 역사"
              date="2023-11-02"
            />

            {/* 해외축구 뉴스 섹션 */}
            <NewsSection
              category="해외축구"
              title="밀란, 카카를 등에 업고 승리를 향해 달린다."
              date="2024-11-13"
            />

            {/* 추가 컨텐츠 영역 */}
            <div className="mt-8">
              <div className="flex flex-col md:flex-row w-full">
                {/* 왼쪽 기사 */}
                <div className="w-full md:w-1/2 md:pr-5 mb-6 md:mb-0">
                  <ArticlePreview
                    title="가볍게 살아가는 생활 이야기를 시작합니다~"
                    author="test7 기자"
                    date="2023-10-17"
                  />
                </div>

                {/* 오른쪽 이미지 */}
                <div className="w-full md:w-1/2">
                  <div className="relative h-[100px] w-full">
                    <Image
                      src="https://placehold.co/135x100/0066cc/white?text=뉴스이미지"
                      alt="뉴스 이미지"
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 사이드바 */}
          <aside className="w-full md:w-1/3 mt-8 md:mt-0">
            <div className="sticky top-4">
              <Banner />
              <NewsRanking />
              <ReporterProfile />
              <NewsTabs />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

const NewsSection = ({ category, title, date }: NewsSectionProps) => (
  <div className="w-full border-b border-gray-200 py-6">
    <div className="p-6">
      <div className="w-full">
        <div className="text-blue-600 text-sm mb-1">{category}</div>
        <div>
          <a href="#" className="text-lg font-medium line-clamp-2 hover:text-blue-600">
            {title}
          </a>
        </div>
        <div className="mt-2 text-gray-500 text-sm">{date}</div>
      </div>
    </div>
  </div>
);

const ArticlePreview = ({ title, author, date }: ArticlePreviewProps) => (
  <div className="border-b border-gray-200 pb-4">
    <div className="text-xl font-medium line-clamp-2 mb-2">
      <a href="#" className="hover:text-blue-600">{title}</a>
    </div>
    <div className="text-gray-500 text-sm">
      <span>{author}</span>
      <span className="ml-3">{date}</span>
    </div>
  </div>
);

const Banner = () => (
  <div className="mb-4">
    <div className="bg-gray-200 h-[300px] w-full flex items-center justify-center text-gray-500">
      배너 영역
    </div>
  </div>
);

const NewsRanking = () => (
  <div className="mb-6">
    <h2 className="text-lg font-medium pb-4 border-b border-gray-200 mb-4 relative">
      뉴스 <span className="text-teal-600">랭킹</span>
      <span className="text-sm font-normal text-gray-600 ml-2">
        다양한 상황별 점수가 집계된 랭킹순 뉴스
      </span>
      <a href="#" className="absolute right-0 top-0 text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
        </svg>
      </a>
    </h2>
    <RankingItem />
  </div>
);

const RankingItem = () => (
  <div className="flex items-center py-2">
    <div className="flex-shrink-0 mr-3">
      <span className="bg-teal-600 text-white text-sm font-bold w-6 h-6 flex items-center justify-center rounded">
        1
      </span>
    </div>
    <div className="flex-grow">
      <a href="#" className="text-base font-medium line-clamp-1 hover:text-blue-600">
        프로게이머들의 만만치 않은 전력.아마추어 팀에서 새로운 전략을 찾아내
      </a>
    </div>
    <ViewCount count="7001" />
  </div>
);

const ViewCount = ({ count }: ViewCountProps) => (
  <div className="flex-shrink-0 text-gray-400 text-sm">
    <span className="flex items-center">
      <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
      </svg>
      {count}
    </span>
  </div>
);

const ReporterProfile = () => (
  <div className="bg-gray-800 text-white p-4 rounded">
    <div className="flex mb-4">
      <div className="w-[70px] h-[75px] mr-4">
        <Image
          src="https://placehold.co/70x75/cccccc/333333?text=기자"
          alt="기자 프로필"
          width={70}
          height={75}
          className="object-cover"
        />
      </div>
      <div>
        <div className="text-lg font-medium">test6</div>
        <div className="text-sm mb-2">test@happycgi.com</div>
        <button className="text-xs border border-teal-400 text-teal-400 px-2 py-1 rounded hover:bg-teal-400 hover:text-white transition-colors">
          기자의 기사보기
        </button>
      </div>
    </div>
    <div>
      <a href="#" className="text-sm line-clamp-3 hover:text-teal-400">
        토마토의 젤리를 만들어봤습니다.토마토캔과 리큐어류(흰색와인) 설탕 젤라틴이 재료입니다토마토캔을 그릇에 담고 전라렌지로 가열한열로 설탕을 녹입니다 조금 식으면 리큐어를 더합니다.젤라틴을 뜨거운 물 250ml...
      </a>
    </div>
  </div>
);

const NewsTabs = () => (
  <div className="mt-6">
    <h2 className="text-lg font-medium mb-4 relative">한줄뉴스</h2>
    <div className="flex border-t border-b border-gray-200">
      <TabItem text="경제" isActive={true} />
      <TabItem text="사회" />
      <TabItem text="정치" />
      <TabItem text="세계" />
      <TabItem text="만평" />
    </div>
  </div>
);

const TabItem = ({ text, isActive = false }: TabItemProps) => (
  <div className={`py-3 px-4 ${isActive ? 'font-medium text-blue-600 border-b-2 border-blue-600' : 'text-gray-600 hover:text-blue-600'}`}>
    {text}
  </div>
);
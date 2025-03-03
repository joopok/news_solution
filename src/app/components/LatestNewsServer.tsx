import Link from 'next/link';
import { NewsItem } from '../types/types';

// ISR을 사용하여 최신 뉴스 데이터를 가져오는 함수
async function getLatestNews(): Promise<NewsItem[]> {
  // 실제 API 호출
  // const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/news/latest?limit=5`, {
  //   next: { revalidate: 60 } // 60초마다 재검증
  // });
  
  // 샘플 데이터 반환
  const latestNews = [
    { id: 'news1', title: '경제 회복세 뚜렷, 2분기 성장률 전망 밝아', category: '경제', date: '2023-06-15', views: 1250 },
    { id: 'news2', title: '정부, 신재생에너지 정책 발표', category: '정치', date: '2023-06-14', views: 980 },
    { id: 'news3', title: '올해 장마 평년보다 길어질 전망', category: '사회', date: '2023-06-14', views: 875 },
    { id: 'news4', title: '글로벌 기업 국내 투자 확대', category: '경제', date: '2023-06-13', views: 1100 },
    { id: 'news5', title: '코로나 신규 변이 주의보', category: '사회', date: '2023-06-13', views: 1360 }
  ];
  
  // 샘플 데이터이므로 성공했다고 가정
  return latestNews;
}

export default async function LatestNewsServer() {
  // ISR로 데이터 가져오기
  const news = await getLatestNews();
  
  return (
    <div className="bg-white rounded shadow-sm p-4">
      <h2 className="text-xl font-bold mb-4">최신 뉴스</h2>
      <div className="space-y-3">
        {news.map((item) => (
          <Link href={`/news/${item.id}`} key={item.id} className="block">
            <div className="flex gap-3 hover:bg-gray-50 p-2 rounded transition-colors">
              <div className="flex-1">
                <h3 className="font-medium line-clamp-2 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center mt-1 text-xs text-gray-500">
                  {item.category && <span className="mr-2">{item.category}</span>}
                  <span>조회 {item.views?.toLocaleString() || 0}</span>
                  <span className="mx-1">•</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="mt-4 text-right">
        <Link href="/news" className="text-sm text-blue-600 hover:underline">
          모든 뉴스 보기
        </Link>
      </div>
    </div>
  );
} 
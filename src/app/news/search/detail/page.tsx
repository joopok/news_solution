'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiCalendar, FiEye, FiShare2, FiPrinter, FiThumbsUp, FiMessageSquare } from 'react-icons/fi';
import PageHeader from '../../../components/PageHeader';
import BackLink from '../../../components/BackLink';
import CustomLink from '../../../components/CustomLink';
import { NewsDetail } from '../../../types/types';

// 샘플 뉴스 상세 데이터
const sampleNewsDetail: NewsDetail = {
  id: 1,
  title: '정부, 신재생에너지 지원 확대 예산 발표... 내년 20% 증액',
  content: `
    <p>정부가 내년도 신재생에너지 관련 지원 예산을 20% 증액하기로 결정했다. 이는 탄소중립 정책의 일환으로, 2030년까지 재생에너지 발전 비중을 30%까지 높이겠다는 목표 달성을 위한 조치다.</p>
    
    <p>산업통상자원부는 22일 발표한 '2025년 신재생에너지 예산안'에서 총 2조 5천억원의 예산을 편성했다고 밝혔다. 이는 올해 예산 2조 1천억원보다 4천억원(19.8%) 증가한 규모다.</p>
    
    <p>특히 태양광·풍력 등 재생에너지 보급 지원에 1조 3천억원, 수소경제 활성화에 6천억원이 투입된다. 나머지는 에너지 저장 기술(ESS) 개발과 재생에너지 통합 관제 시스템 구축 등에 사용될 예정이다.</p>
    
    <h3>민간투자 확대 유도</h3>
    
    <p>정부는 또한 민간 투자를 유도하기 위해 신재생에너지 발전사업자에 대한 세제 혜택과 금융 지원도 확대할 방침이다. 대규모 태양광·풍력 발전단지 조성 시 투자금액의 최대 10%까지 세액공제 혜택을 받을 수 있도록 했다.</p>
    
    <p>산업부 관계자는 "이번 예산안은 정부의 그린 뉴딜 정책과 2050 탄소중립 목표 달성을 위한 핵심 사업들에 중점 투자하는 방향으로 편성됐다"며 "특히 재생에너지 확대와 함께 관련 산업 생태계를 강화하는 데 역점을 두었다"고 설명했다.</p>
    
    <p>그러나 일부 전문가들은 여전히 부족한 예산 규모를 지적하고 있다. 에너지경제연구원 김○○ 연구위원은 "주요 선진국들의 신재생에너지 투자 규모와 비교하면 여전히 격차가 크다"며 "2030년 목표 달성을 위해서는 현재보다 더 과감한 재정 투입이 필요하다"고 강조했다.</p>
    
    <h3>지역 갈등 해소 방안도 마련</h3>
    
    <p>한편, 정부는 재생에너지 시설 설치에 따른 지역 갈등 문제 해소를 위해 '이익공유형 발전사업 모델'도 확대 추진한다. 발전 수익의 일부를 지역 주민과 공유하거나, 주민참여형 발전소 건설을 장려하는 방식이다.</p>
    
    <p>산업부는 이달 말 예산안을 확정해 국회에 제출할 예정이며, 국회 심의를 거쳐 12월 초 최종 예산이 확정될 전망이다.</p>
  `,
  category: '경제',
  section: 'economy',
  date: '2024-02-28',
  author: '김기자',
  views: 3254,
  likes: 42,
  comments: 18,
  image: 'https://placehold.co/800x450/dddddd/333333',
  tags: ['신재생에너지', '예산', '탄소중립', '태양광', '풍력'],
  isPremium: false,
  relatedNews: [
    {
      id: 11,
      title: '태양광 발전시설 설치비용 30% 하락...국내 보급 확대 기대',
      link: '/news/economy/11'
    },
    {
      id: 15,
      title: 'ESG 경영 확산...기업들 신재생에너지 투자 급증',
      link: '/news/economy/15'
    },
    {
      id: 22,
      title: '유럽연합, 2030년까지 재생에너지 비중 45%로 상향 조정',
      link: '/news/world/22'
    }
  ]
};

export default function NewsDetailPage() {
  const [newsData, setNewsData] = useState<NewsDetail | null>(null);
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  // 데이터 로드 (실제로는 API 호출)
  useEffect(() => {
    // URL에서 ID 파라미터를 가져와서 해당 뉴스를 로드하는 로직이 들어갈 수 있음
    // 여기서는 샘플 데이터 사용
    setNewsData(sampleNewsDetail);
    setLikeCount(sampleNewsDetail.likes);
  }, []);

  // 좋아요 처리
  const handleLike = () => {
    if (!isLiked) {
      setLikeCount(prevCount => prevCount + 1);
      setIsLiked(true);
    } else {
      setLikeCount(prevCount => prevCount - 1);
      setIsLiked(false);
    }
    // 여기에 좋아요 API 호출 로직 추가
  };

  // 공유 처리
  const handleShare = () => {
    // 공유 기능 구현
    if (navigator.share) {
      navigator.share({
        title: newsData?.title,
        text: newsData?.title,
        url: window.location.href,
      }).catch(err => {
        console.error('공유 실패:', err);
      });
    } else {
      // 공유 API가 지원되지 않는 경우
      alert('현재 브라우저에서는 공유 기능을 지원하지 않습니다.');
    }
  };

  // 인쇄 처리
  const handlePrint = () => {
    window.print();
  };

  if (!newsData) {
    return <div className="text-center py-20">로딩 중...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* 뒤로가기 링크 */}
      <BackLink href="/news/search" label="검색 결과로 돌아가기" />
      
      {/* 카테고리 */}
      <div className="mb-6">
        <CustomLink 
          href={`/news/${newsData.section}`}
          className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
        >
          {newsData.category}
        </CustomLink>
        
        {newsData.isPremium && (
          <span className="ml-2 inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            프리미엄
          </span>
        )}
      </div>
      
      {/* 제목 */}
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
        {newsData.title}
      </h1>
      
      {/* 메타 정보 */}
      <div className="flex flex-wrap items-center text-sm text-gray-500 mb-6 space-x-6">
        <div className="flex items-center">
          <span className="font-medium">{newsData.author}</span>
          <span className="mx-2">|</span>
          <FiCalendar className="mr-1" />
          <span>{newsData.date}</span>
        </div>
        <div className="flex items-center">
          <FiEye className="mr-1" />
          <span>조회 {newsData.views.toLocaleString()}</span>
        </div>
        <div className="flex items-center">
          <FiMessageSquare className="mr-1" />
          <span>댓글 {newsData.comments.toLocaleString()}</span>
        </div>
      </div>
      
      {/* 기사 이미지 */}
      {newsData.image && (
        <div className="mb-8 rounded-lg overflow-hidden shadow-md">
          <img
            src={newsData.image}
            alt={newsData.title}
            className="w-full h-auto"
          />
        </div>
      )}
      
      {/* 액션 버튼 */}
      <div className="flex justify-end space-x-2 mb-8">
        <button 
          onClick={handleLike}
          className={`flex items-center px-3 py-1 rounded-md text-sm ${
            isLiked 
              ? 'bg-red-100 text-red-700' 
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <FiThumbsUp className={`mr-1 ${isLiked ? 'fill-current' : ''}`} />
          <span>{likeCount}</span>
        </button>
        <button 
          onClick={handleShare}
          className="flex items-center px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <FiShare2 className="mr-1" />
          <span>공유</span>
        </button>
        <button 
          onClick={handlePrint}
          className="flex items-center px-3 py-1 rounded-md text-sm bg-gray-100 text-gray-700 hover:bg-gray-200"
        >
          <FiPrinter className="mr-1" />
          <span>인쇄</span>
        </button>
      </div>
      
      {/* 기사 본문 */}
      <div 
        className="prose max-w-none mb-10"
        dangerouslySetInnerHTML={{ __html: newsData.content }}
      />
      
      {/* 태그 */}
      {newsData.tags.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-medium text-gray-900 mb-3">관련 태그</h3>
          <div className="flex flex-wrap gap-2">
            {newsData.tags.map((tag, index) => (
              <CustomLink 
                key={index}
                href={`/news/search?q=${encodeURIComponent(tag)}`}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200"
              >
                #{tag}
              </CustomLink>
            ))}
          </div>
        </div>
      )}
      
      {/* 관련 기사 */}
      {newsData.relatedNews.length > 0 && (
        <div className="mb-10">
          <h3 className="text-lg font-medium text-gray-900 mb-3">관련 기사</h3>
          <div className="space-y-4">
            {newsData.relatedNews.map((news) => (
              <CustomLink 
                key={news.id}
                href={news.link}
                className="block p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
              >
                <h4 className="text-gray-900 font-medium">{news.title}</h4>
              </CustomLink>
            ))}
          </div>
        </div>
      )}
      
      {/* 댓글 섹션 (실제 구현은 별도로 필요) */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="text-lg font-medium text-gray-900 mb-6">댓글 {newsData.comments}개</h3>
        <div className="bg-gray-50 p-6 rounded-lg text-center">
          <p className="text-gray-500">댓글 기능은 준비 중입니다.</p>
        </div>
      </div>
    </div>
  );
} 
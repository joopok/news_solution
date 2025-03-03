'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaHandHoldingHeart, FaClock, FaEye } from 'react-icons/fa';

// 더미 기부 뉴스 데이터
const donationNews = [
  {
    id: 1,
    category: '아동',
    title: '저소득층 아동을 위한 교육 지원 캠페인',
    summary: '교육의 기회를 잃은 저소득층 아동들을 위한 교육 지원 캠페인이 시작되었습니다. 많은 시민들의 관심과 참여가 이어지고 있습니다.',
    imageUrl: 'https://placehold.co/600x400/0066cc/white?text=아동지원',
    date: '2024-02-26',
    views: 5678,
  },
  {
    id: 2,
    category: '노인',
    title: '독거노인 겨울나기 지원 사업 성과',
    summary: '한파로 어려움을 겪는 독거노인을 위한 겨울나기 지원 사업이 큰 성과를 거두고 있습니다. 시민들의 따뜻한 마음이 모여 희망을 전달했습니다.',
    imageUrl: 'https://placehold.co/600x400/00cc66/white?text=노인지원',
    date: '2024-02-26',
    views: 4567,
  },
  {
    id: 3,
    category: '장애인',
    title: '장애인 직업 재활 훈련 센터 개소',
    summary: '장애인들의 자립을 돕기 위한 직업 재활 훈련 센터가 새롭게 문을 열었습니다. 전문적인 교육과 훈련을 통해 취업의 기회를 제공합니다.',
    imageUrl: 'https://placehold.co/600x400/cc6600/white?text=장애인지원',
    date: '2024-02-26',
    views: 3890,
  },
  {
    id: 4,
    category: '환경',
    title: '해양 환경 보호를 위한 기부 캠페인',
    summary: '해양 생태계 보호를 위한 시민 참여형 기부 캠페인이 시작되었습니다. 해양 쓰레기 수거와 생태계 복원 활동을 지원합니다.',
    imageUrl: 'https://placehold.co/600x400/009933/white?text=환경보호',
    date: '2024-02-25',
    views: 4120,
  },
  {
    id: 5,
    category: '의료',
    title: '저소득층 의료 지원 사업 확대',
    summary: '의료 사각지대에 있는 저소득층을 위한 의료 지원 사업이 확대됩니다. 종합 검진과 수술비 지원으로 건강한 삶을 돕습니다.',
    imageUrl: 'https://placehold.co/600x400/ff3366/white?text=의료지원',
    date: '2024-02-25',
    views: 3567,
  }
];

// 기부뉴스 목록 데이터
const donationNewsList = [
  {
    id: 1,
    title: '시민들의 작은 기부가 만드는 큰 변화, 우리 동네 기부 이야기',
    content: '지역 주민들의 자발적인 참여로 시작된 작은 기부 운동이 지역사회에 큰 변화를 가져오고 있습니다. 주민들의 따뜻한 마음이 모여...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스1',
    date: '2024-02-26',
  },
  {
    id: 2,
    title: '기업의 사회공헌활동, 지속가능한 미래를 위한 투자',
    content: '국내 주요 기업들의 사회공헌활동이 단순한 기부를 넘어 지속가능한 미래를 위한 투자로 진화하고 있습니다. ESG 경영의 일환으로...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스2',
    date: '2024-02-25',
  },
  {
    id: 3,
    title: '청년 창업가들의 사회공헌 프로젝트 성공사례',
    content: '젊은 창업가들이 주도하는 혁신적인 사회공헌 프로젝트들이 주목받고 있습니다. 기술을 활용한 새로운 기부 문화를 만들어가고 있습니다...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스3',
    date: '2024-02-24',
  },
  {
    id: 4,
    title: '국제구호단체, 글로벌 재난지역 긴급구호 활동 전개',
    content: '최근 발생한 자연재해 피해 지역에서 국제구호단체들의 긴급구호 활동이 활발히 진행되고 있습니다. 전 세계 시민들의 도움의 손길이...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스4',
    date: '2024-02-23',
  },
  {
    id: 5,
    title: '문화예술 분야 기부 플랫폼 출시, 예술가 지원 확대',
    content: '문화예술계 종사자들을 위한 새로운 기부 플랫폼이 출시되었습니다. 크라우드펀딩 방식으로 예술가들의 창작활동을 지원합니다...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스5',
    date: '2024-02-22',
  },
  {
    id: 6,
    title: '푸드뱅크 기부 캠페인, 식품 낭비 줄이고 나눔 실천',
    content: '남은 식자재와 식품을 기부받아 필요한 이웃에게 전달하는 푸드뱅크 캠페인이 확대됩니다. 식품 낭비를 줄이고 나눔을 실천하는...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스6',
    date: '2024-02-21',
  },
  {
    id: 7,
    title: '반려동물 보호소 지원을 위한 온라인 기부 행사 개최',
    content: '유기동물 보호소의 열악한 환경 개선을 위한 온라인 기부 행사가 개최됩니다. 반려동물들의 더 나은 삶을 위한 시민들의 참여가...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스7',
    date: '2024-02-20',
  },
  {
    id: 8,
    title: '디지털 소외계층 지원을 위한 IT기기 기부 캠페인',
    content: '디지털 정보격차 해소를 위한 IT기기 기부 캠페인이 시작되었습니다. 중고 노트북과 태블릿을 수리하여 필요한 이웃에게...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스8',
    date: '2024-02-19',
  },
  {
    id: 9,
    title: '지역 도서관 발전을 위한 도서 기부 운동 확산',
    content: '작은 도서관들의 장서 확충을 위한 도서 기부 운동이 확산되고 있습니다. 시민들의 자발적인 참여로 지역 독서문화가 풍성해지고...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스9',
    date: '2024-02-18',
  },
  {
    id: 10,
    title: '청소년 멘토링 프로그램, 재능기부로 미래 인재 양성',
    content: '전문가들의 재능기부로 운영되는 청소년 멘토링 프로그램이 큰 호응을 얻고 있습니다. 다양한 분야의 전문가들이 청소년들의...',
    imageUrl: 'https://placehold.co/300x200/cccccc/white?text=기부뉴스10',
    date: '2024-02-17',
  }
];

export default function DonationNews() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* 페이지 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold flex items-center mb-4">
          <FaHandHoldingHeart className="mr-2 text-red-500" />
          기부뉴스
        </h1>
        <p className="text-gray-600">
          나눔의 가치를 전하는 기부 소식을 전해드립니다.
        </p>
      </div>

      {/* 주요 기부 뉴스 카드 섹션 */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">주요 기부 소식</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donationNews.map((news) => (
            <div 
              key={news.id} 
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-red-500 text-white px-3 py-1 m-2 rounded-full text-sm">
                  {news.category}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2 line-clamp-2">
                  {news.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {news.summary}
                </p>
                <div className="flex items-center text-sm text-gray-500">
                  <FaClock className="mr-1" />
                  <span className="mr-4">{news.date}</span>
                  <FaEye className="mr-1" />
                  <span>조회수 {news.views.toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 기부 뉴스 목록 섹션 */}
      <section>
        <h2 className="text-2xl font-bold mb-6">기부뉴스 목록</h2>
        <div className="space-y-6">
          {donationNewsList.map((news) => (
            <div 
              key={news.id}
              className="flex gap-6 bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex-shrink-0 w-48 h-32 relative">
                <Image
                  src={news.imageUrl}
                  alt={news.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-xl font-bold mb-2">{news.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{news.content}</p>
                <div className="text-sm text-gray-500">
                  <FaClock className="inline-block mr-1" />
                  {news.date}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
} 
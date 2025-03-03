'use client';

import { FiUsers, FiAward, FiMap, FiCalendar } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import Image from 'next/image';

export default function CompanyPage() {
  // 회사 연혁 데이터
  const historyItems = [
    { year: '2023', description: '해피뉴스 모바일 앱 출시' },
    { year: '2022', description: '구독자 100만 명 달성' },
    { year: '2022', description: '해피뉴스 프리미엄 서비스 시작' },
    { year: '2021', description: '법인 설립 및 서비스 정식 런칭' },
    { year: '2020', description: '해피뉴스 베타 서비스 시작' },
    { year: '2019', description: '해피뉴스 서비스 기획 및 개발 착수' }
  ];

  // 핵심 가치 데이터
  const coreValues = [
    {
      title: '신뢰성',
      description: '정확하고 검증된 뉴스만을 제공합니다.',
      icon: <FiAward className="h-10 w-10 text-blue-600" />,
    },
    {
      title: '중립성',
      description: '편향되지 않은 균형 잡힌 시각을 유지합니다.',
      icon: <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>,
    },
    {
      title: '혁신성',
      description: '새로운 미디어 경험을 끊임없이 발굴합니다.',
      icon: <svg className="h-10 w-10 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>,
    },
    {
      title: '다양성',
      description: '다양한 의견과 관점을 존중합니다.',
      icon: <FiUsers className="h-10 w-10 text-blue-600" />,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="회사소개"
        description="해피뉴스는 정확하고 신뢰할 수 있는 뉴스를 제공하기 위해 노력합니다."
        className="mb-12"
      />

      {/* 회사 소개 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">미디어의 새로운 방향을 제시합니다</h2>
            <p className="text-gray-600 mb-4">
              해피뉴스는 2019년 설립된 디지털 미디어 기업으로, 변화하는 미디어 환경 속에서 
              독자들에게 신뢰할 수 있는 정보와 새로운 뉴스 경험을 제공하기 위해 노력하고 있습니다.
            </p>
            <p className="text-gray-600 mb-4">
              기존 언론사들의 틀에서 벗어나 투명하고 편향되지 않은 뉴스를 제공하는 것을 목표로 하며,
              독자들이 다양한 관점에서 세상을 바라볼 수 있도록 돕고 있습니다.
            </p>
            <p className="text-gray-600">
              해피뉴스는 기술과 콘텐츠의 조화를 통해 최적의 뉴스 소비 경험을 설계하고,
              독자와 함께 성장하는 미디어 플랫폼으로 발전해 나가고 있습니다.
            </p>
          </div>
          <div className="relative h-80 md:h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/800x600/blue/white?text=HAPPY+NEWS"
              alt="해피뉴스 사옥"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">해피뉴스의 핵심 가치</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center hover:shadow-lg transition-shadow">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 회사 비전 */}
      <section className="mb-16 bg-blue-50 rounded-lg p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">우리의 비전</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            누구나 쉽게 접근할 수 있는 신뢰할 수 있는 뉴스 플랫폼을 구축하여 
            더 투명하고 정보에 기반한 사회를 만드는 데 기여합니다.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">독자 중심</h3>
            <p className="text-gray-600">
              독자의 필요와 관심사를 최우선으로 생각하며, 독자들이 원하는 방식으로 뉴스를 소비할 수 있도록 지원합니다.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">기술 혁신</h3>
            <p className="text-gray-600">
              최신 기술을 활용하여 뉴스 소비 경험을 혁신하고, 데이터에 기반한 개인화된 서비스를 제공합니다.
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">사회적 책임</h3>
            <p className="text-gray-600">
              사회 구성원으로서 책임감을 가지고, 진실된 정보 전달을 통해 더 나은 사회 형성에 기여합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 회사 연혁 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">해피뉴스의 발자취</h2>
        <div className="relative border-l-2 border-blue-200 pl-10 ml-6">
          {historyItems.map((item, index) => (
            <div key={index} className="mb-10 relative">
              <div className="absolute -left-16 flex items-center justify-center w-10 h-10 bg-blue-600 rounded-full text-white">
                <FiCalendar />
              </div>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="text-lg font-bold text-blue-600 mb-2">{item.year}</div>
                <div className="text-gray-700">{item.description}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 오시는 길 */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">오시는 길</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative h-64 md:h-80 rounded-lg overflow-hidden">
            <Image
              src="https://placehold.co/800x600/blue/white?text=MAP"
              alt="해피뉴스 위치 지도"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <div className="flex items-start mb-4">
              <FiMap className="h-6 w-6 text-blue-600 mt-0.5 mr-3" />
              <div>
                <h3 className="text-lg font-semibold mb-1">주소</h3>
                <p className="text-gray-600">서울특별시 강남구 테헤란로 123 해피뉴스빌딩 4층</p>
              </div>
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">교통편</h3>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-medium">지하철:</span> 2호선 강남역 3번 출구에서 도보 5분
                </p>
                <p className="text-gray-600">
                  <span className="font-medium">버스:</span> 강남역 정류장 하차 (146, 301, 342, 740번)
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">주차 안내</h3>
              <p className="text-gray-600">
                해피뉴스빌딩 지하 주차장 이용 가능 (방문 시 주차권 제공)
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
} 
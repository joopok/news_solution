'use client';

import { useState } from 'react';
import Image from 'next/image';
import PageHeader from '../components/PageHeader';
import { FiUsers, FiAward, FiSmile, FiCoffee, FiHeart, FiBook, FiPieChart, FiSun, FiBriefcase, FiSearch } from 'react-icons/fi';

export default function CareersPage() {
  // 현재 열려있는 아코디언 아이템 상태
  const [openJobId, setOpenJobId] = useState<number | null>(null);
  
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState('');

  // 아코디언 토글
  const toggleJob = (id: number) => {
    setOpenJobId(openJobId === id ? null : id);
  };

  // 채용 공고 데이터
  const jobOpenings = [
    {
      id: 1,
      title: '정치 전문 기자',
      department: '취재팀',
      type: '정규직',
      location: '서울',
      deadline: '2024-03-31',
      requirements: [
        '정치학, 언론학 또는 관련 분야 학사 이상',
        '정치 분야 취재 경험 3년 이상',
        '뛰어난 문장력과 취재력',
        '정치 현안에 대한 깊은 이해와 분석력',
      ],
      responsibilities: [
        '정치 분야 뉴스 취재 및 기사 작성',
        '정치인 및 유관 단체 인터뷰',
        '정치 관련 이슈 심층 분석',
        '팩트체크 및 검증 보도',
      ],
    },
    {
      id: 2,
      title: '프론트엔드 개발자',
      department: '디지털개발팀',
      type: '정규직',
      location: '서울',
      deadline: '2024-03-15',
      requirements: [
        'React, Next.js 경험 3년 이상',
        'TypeScript 활용 능력',
        'UI/UX에 대한 이해와 구현 경험',
        '반응형 웹 개발 경험',
      ],
      responsibilities: [
        '뉴스 웹 서비스 프론트엔드 개발',
        '사용자 경험 개선',
        '웹 성능 최적화',
        '구독 서비스 및 결제 시스템 개발',
      ],
    },
    {
      id: 3,
      title: '데이터 분석가',
      department: '데이터팀',
      type: '정규직',
      location: '서울',
      deadline: '2024-03-20',
      requirements: [
        '통계학, 컴퓨터 공학 관련 학위',
        'Python, R 등 데이터 분석 도구 활용 능력',
        '데이터 시각화 경험',
        '머신러닝 기초 지식',
      ],
      responsibilities: [
        '뉴스 소비 패턴 분석',
        '사용자 행동 인사이트 도출',
        '데이터 기반 콘텐츠 전략 수립',
        '분석 리포트 작성 및 발표',
      ],
    },
    {
      id: 4,
      title: '콘텐츠 마케팅 매니저',
      department: '마케팅팀',
      type: '정규직',
      location: '서울',
      deadline: '2024-03-25',
      requirements: [
        '마케팅 관련 학위 또는 이에 준하는 경력',
        '콘텐츠 마케팅 경험 3년 이상',
        'SNS 채널 운영 경험',
        '기획력과 창의력',
      ],
      responsibilities: [
        '콘텐츠 마케팅 전략 수립',
        '디지털 캠페인 기획 및 실행',
        '마케팅 성과 분석 및 개선',
        '브랜드 인지도 향상 활동',
      ],
    },
  ];

  // 검색 결과 필터링
  const filteredJobs = jobOpenings.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // 회사 핵심 가치
  const coreValues = [
    {
      title: '정확성',
      icon: <FiAward className="h-10 w-10 text-orange-500 mb-4" />,
      description: '철저한 팩트 체크와 검증으로 정확한 정보를 전달합니다.',
    },
    {
      title: '독립성',
      icon: <FiPieChart className="h-10 w-10 text-orange-500 mb-4" />,
      description: '어떠한 외부 영향에도 흔들리지 않는 독립적인 보도 원칙을 지킵니다.',
    },
    {
      title: '혁신',
      icon: <FiSun className="h-10 w-10 text-orange-500 mb-4" />,
      description: '디지털 환경에 맞는 새로운 뉴스 경험을 끊임없이 개발합니다.',
    },
    {
      title: '다양성',
      icon: <FiUsers className="h-10 w-10 text-orange-500 mb-4" />,
      description: '다양한 관점과 배경을 존중하며 포용적인 문화를 지향합니다.',
    },
  ];

  // 복지 혜택 데이터
  const benefits = [
    {
      title: '유연한 근무환경',
      icon: <FiSmile className="h-6 w-6 text-orange-500" />,
      description: '자율 출퇴근제, 재택근무 지원, 집중 업무 시간제 운영',
    },
    {
      title: '성장 지원',
      icon: <FiBook className="h-6 w-6 text-orange-500" />,
      description: '교육비 지원, 도서 구매 지원, 컨퍼런스 참가비 지원',
    },
    {
      title: '생활 지원',
      icon: <FiHeart className="h-6 w-6 text-orange-500" />,
      description: '경조사비, 건강검진, 퇴직연금, 4대 보험',
    },
    {
      title: '근무 환경',
      icon: <FiCoffee className="h-6 w-6 text-orange-500" />,
      description: '카페테리아, 휴게실, 최신 장비 지원',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="인재채용"
        description="해피뉴스와 함께 미래의 미디어를 만들어갈 인재를 찾습니다."
        className="mb-12"
      />

      {/* 회사 문화 소개 */}
      <section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">함께 성장하는 문화</h2>
            <p className="text-gray-600 mb-4">
              해피뉴스는 구성원들이 자유롭게 의견을 나누고 협업하며 함께 성장할 수 있는 문화를 만들어가고 있습니다.
              수평적인 소통 문화와 자율적인 업무 환경 속에서 개인의 역량을 최대한 발휘할 수 있도록 지원합니다.
            </p>
            <p className="text-gray-600">
              끊임없이 변화하는 미디어 환경 속에서 새로운 도전을 두려워하지 않고, 실패를 통해 배우며 성장하는 
              조직이 되고자 합니다. 해피뉴스와 함께 미래의 미디어를 만들어갈 열정적인 인재를 기다립니다.
            </p>
          </div>
          <div className="relative h-96 w-full rounded-lg overflow-hidden shadow-xl">
            <Image
              src="https://placehold.co/800x600/orange/white?text=HAPPY+NEWS+TEAM"
              alt="해피뉴스 팀"
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
              <div className="flex justify-center">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 채용 공고 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">채용 공고</h2>
        
        {/* 검색 */}
        <div className="mb-6">
          <div className="relative max-w-md mx-auto">
            <input
              type="text"
              placeholder="직무, 부서 등으로 검색"
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
        
        {/* 채용 공고 목록 */}
        <div className="space-y-4">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div 
                  className="p-6 cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleJob(job.id)}
                >
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <div className="flex mt-2">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 mr-2">
                          {job.department}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 mr-2">
                          {job.type}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <div className="text-gray-500 text-sm">
                      <FiBriefcase className="inline mr-1" />
                      마감일: {job.deadline}
                    </div>
                  </div>
                </div>
                
                {openJobId === job.id && (
                  <div className="p-6 bg-gray-50 border-t border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">자격요건</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {job.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 mb-3">주요업무</h4>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {job.responsibilities.map((resp, index) => (
                            <li key={index}>{resp}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <div className="mt-6 flex justify-center">
                      <button className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors">
                        지원하기
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-md">
              <p className="text-gray-500">검색 결과가 없습니다.</p>
            </div>
          )}
        </div>
      </section>

      {/* 복지 혜택 */}
      <section className="mb-16 bg-orange-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">복지 혜택</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex items-start">
              <div className="bg-white p-3 rounded-full mr-4 shadow-sm">
                {benefit.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 지원 방법 */}
      <section className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">지원 방법</h2>
        <div className="max-w-2xl mx-auto">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">지원 절차</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>채용 공고 확인 및 지원서 제출</li>
              <li>서류 심사 (1-2주 소요)</li>
              <li>1차 인터뷰 (직무 적합성 평가)</li>
              <li>2차 인터뷰 (조직 적합성 평가)</li>
              <li>최종 합격 통보</li>
              <li>입사</li>
            </ol>
          </div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">지원시 유의사항</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              <li>제출된 서류는 반환되지 않습니다.</li>
              <li>허위 사실이 발견될 경우 합격이 취소될 수 있습니다.</li>
              <li>각 전형 단계에서 불합격 시 다른 직무로 지원 가능합니다.</li>
              <li>채용 절차는 상황에 따라 변경될 수 있습니다.</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-2">문의 안내</h3>
            <p className="text-gray-700">채용과 관련한 문의사항은 <a href="mailto:recruit@happynews.com" className="text-orange-600 underline">recruit@happynews.com</a>으로 보내주시기 바랍니다.</p>
          </div>
        </div>
      </section>
    </div>
  );
} 
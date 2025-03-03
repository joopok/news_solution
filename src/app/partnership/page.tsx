'use client';

import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiGrid, FiBookOpen, FiRss, FiShare2, FiUsers, FiPieChart, FiCheckCircle, FiSend } from 'react-icons/fi';

export default function PartnershipPage() {
  // 제휴 유형 데이터
  const partnershipTypes = [
    {
      title: '콘텐츠 제휴',
      icon: <FiBookOpen className="h-12 w-12 text-teal-600 mb-4" />,
      description: '해피뉴스의 양질의 콘텐츠를 귀사의 서비스에 제공합니다.',
      features: [
        '실시간 뉴스 API 제공',
        '카테고리별 맞춤 콘텐츠',
        '자동 콘텐츠 업데이트',
        '이미지 및 멀티미디어 콘텐츠 포함',
      ],
    },
    {
      title: '기술 제휴',
      icon: <FiGrid className="h-12 w-12 text-teal-600 mb-4" />,
      description: '해피뉴스의 기술과 인프라를 활용한 협업 기회를 제공합니다.',
      features: [
        '검색 엔진 최적화',
        '데이터 분석 및 인사이트',
        '맞춤형 알고리즘 개발',
        '플랫폼 통합 솔루션',
      ],
    },
    {
      title: '마케팅 제휴',
      icon: <FiPieChart className="h-12 w-12 text-teal-600 mb-4" />,
      description: '해피뉴스와 함께 시너지를 창출할 수 있는 마케팅 협력을 제안합니다.',
      features: [
        '공동 이벤트 개최',
        '크로스 프로모션',
        '공동 브랜드 캠페인',
        '타겟 오디언스 마케팅',
      ],
    },
    {
      title: '미디어 제휴',
      icon: <FiRss className="h-12 w-12 text-teal-600 mb-4" />,
      description: '미디어 채널 간 협력을 통해 더 넓은 독자층에게 콘텐츠를 제공합니다.',
      features: [
        '콘텐츠 공유 및 교환',
        '공동 취재 및 기획',
        '멀티 플랫폼 협력',
        '디지털 미디어 전략 협업',
      ],
    },
  ];

  // 제휴 프로세스 데이터
  const partnershipProcess = [
    {
      step: 1,
      title: '문의 접수',
      description: '원하시는 제휴 유형과 목적을 알려주세요.',
    },
    {
      step: 2,
      title: '협의 및 검토',
      description: '양사의 니즈에 맞는 최적의 제휴 방안을 협의합니다.',
    },
    {
      step: 3,
      title: '제안서 교환',
      description: '구체적인 제휴 조건과 범위를 담은, 제안서를 교환합니다.',
    },
    {
      step: 4,
      title: '계약 체결',
      description: '최종 합의된 내용으로 제휴 계약을 체결합니다.',
    },
    {
      step: 5,
      title: '제휴 실행',
      description: '협의된 일정에 따라 제휴를 시작합니다.',
    },
  ];

  // 성공 사례 데이터
  const successCases = [
    {
      title: 'A 포털 사이트',
      type: '콘텐츠 제휴',
      description:
        '해피뉴스의 콘텐츠를 A 포털에 제공하여 월간 200만 페이지뷰 증가 및 사용자 체류 시간 15% 향상 효과를 가져왔습니다.',
    },
    {
      title: 'B 금융 앱',
      type: '기술 제휴',
      description:
        '해피뉴스의 경제 뉴스 분석 기술을 B 금융 앱에 적용하여 사용자 만족도 20% 상승 및 앱 사용 빈도 25% 증가 효과를 얻었습니다.',
    },
    {
      title: 'C 대학교',
      type: '미디어 제휴',
      description:
        'C 대학교 미디어학과와 공동 연구 및 교육 프로그램을 운영하여 인재 육성 및 최신 미디어 트렌드 연구에 기여하고 있습니다.',
    },
  ];

  // 문의 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    position: '',
    email: '',
    phone: '',
    partnershipType: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  // 폼 입력 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 폼 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 실제 구현 시 API 호출하여 데이터 전송
    console.log('제출된 데이터:', formData);
    setSubmitted(true);
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="제휴문의"
        description="해피뉴스와 함께 성장할 파트너를 찾고 있습니다."
        className="mb-12"
      />

      {/* 제휴 유형 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">제휴 유형</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partnershipTypes.map((type, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className="text-center mb-4">{type.icon}</div>
              <h3 className="text-xl font-semibold text-center mb-2">{type.title}</h3>
              <p className="text-gray-600 text-center mb-4">{type.description}</p>
              <ul className="space-y-2">
                {type.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <FiCheckCircle className="text-teal-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* 제휴 프로세스 */}
      <section className="mb-16 bg-teal-50 py-12 px-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-10 text-center">제휴 프로세스</h2>
        <div className="max-w-3xl mx-auto">
          {partnershipProcess.map((process, index) => (
            <div key={index} className="flex mb-8 last:mb-0">
              <div className="mr-6 flex-shrink-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-600 text-white text-lg font-semibold">
                  {process.step}
                </div>
                {index < partnershipProcess.length - 1 && (
                  <div className="w-0.5 h-16 bg-teal-200 mx-auto my-2"></div>
                )}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{process.title}</h3>
                <p className="text-gray-600">{process.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 성공 사례 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">성공 사례</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {successCases.map((caseItem, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-1">{caseItem.title}</h3>
              <p className="text-teal-600 text-sm mb-4">{caseItem.type}</p>
              <p className="text-gray-600">{caseItem.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 제휴 문의 폼 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">제휴 문의하기</h2>
        <div className="bg-white rounded-lg shadow-md p-8">
          {submitted ? (
            <div className="text-center py-10">
              <div className="flex justify-center mb-4">
                <div className="rounded-full bg-green-100 p-4">
                  <FiSend className="h-10 w-10 text-green-600" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">문의가 접수되었습니다.</h3>
              <p className="text-gray-600">
                담당자가 검토 후 빠른 시일 내에 연락드리겠습니다. 감사합니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                    회사명 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-1">
                    직책
                  </label>
                  <input
                    type="text"
                    id="position"
                    name="position"
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    value={formData.position}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    연락처 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label htmlFor="partnershipType" className="block text-sm font-medium text-gray-700 mb-1">
                    제휴 유형 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="partnershipType"
                    name="partnershipType"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    value={formData.partnershipType}
                    onChange={handleChange}
                  >
                    <option value="">선택해주세요</option>
                    <option value="content">콘텐츠 제휴</option>
                    <option value="tech">기술 제휴</option>
                    <option value="marketing">마케팅 제휴</option>
                    <option value="media">미디어 제휴</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    제휴 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    placeholder="제휴 목적, 기대 효과, 희망 사항 등을 자유롭게 작성해주세요."
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-teal-500 focus:border-teal-500"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
                >
                  문의하기
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 추가 문의 정보 */}
      <div className="mt-8 text-center text-gray-600">
        <p>
          추가 문의사항은 제휴팀(<a href="mailto:partnership@happynews.com" className="text-teal-600">partnership@happynews.com</a>, 02-123-4567)으로 연락주세요.
        </p>
      </div>
    </div>
  );
} 
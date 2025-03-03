'use client';

import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiMonitor, FiSmartphone, FiMail, FiCheckCircle, FiFileText, FiSend } from 'react-icons/fi';

export default function AdvertisePage() {
  // 광고 상품 데이터
  const adProducts = [
    {
      title: '메인 배너',
      icon: <FiMonitor className="h-8 w-8 text-indigo-600" />,
      description: '웹사이트 메인 페이지 상단에 노출되는 프리미엄 배너 광고',
      options: ['PC/모바일 동시 노출', '높은 전환율', '다양한 사이즈 옵션'],
      isPopular: true,
    },
    {
      title: '기사 내 배너',
      icon: <FiFileText className="h-8 w-8 text-indigo-600" />,
      description: '뉴스 기사 중간에 자연스럽게 노출되어 높은 주목도를 제공하는 광고',
      options: ['관련 기사 타겟팅', '네이티브 광고 형태', '다양한 컨텐츠 포맷'],
      isPopular: false,
    },
    {
      title: '모바일 전용 광고',
      icon: <FiSmartphone className="h-8 w-8 text-indigo-600" />,
      description: '모바일 앱 및 모바일 웹에 최적화된 광고 상품',
      options: ['높은 모바일 사용자 도달률', '다양한 인터랙션', '지역 타겟팅 옵션'],
      isPopular: false,
    },
  ];

  // 광고 집행 프로세스
  const adProcess = [
    {
      step: 1,
      title: '문의 및 상담',
      description: '원하시는 광고 상품과 예산, 기간 등에 대해 문의해주세요.',
    },
    {
      step: 2,
      title: '광고 제안',
      description: '귀사의 요구사항에 맞는 최적의 광고 상품과 전략을 제안해 드립니다.',
    },
    {
      step: 3,
      title: '계약 체결',
      description: '광고 집행에 관한 계약을 체결합니다.',
    },
    {
      step: 4,
      title: '소재 전달',
      description: '광고 소재를 전달해 주시면 검수 후 게재합니다.',
    },
    {
      step: 5,
      title: '광고 집행',
      description: '약속된 기간 동안 광고가 노출됩니다.',
    },
    {
      step: 6,
      title: '결과 보고',
      description: '광고 집행 결과 리포트를 제공해 드립니다.',
    },
  ];

  // 문의 폼 상태
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    adType: '',
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
        title="광고안내"
        description="해피뉴스의 다양한 광고 상품을 소개합니다."
        className="mb-12"
      />

      {/* 광고 상품 소개 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">광고 상품 안내</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {adProducts.map((product, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-md overflow-hidden relative ${
                product.isPopular ? 'ring-2 ring-indigo-500' : ''
              }`}
            >
              {product.isPopular && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white px-3 py-1 text-xs font-semibold rounded-bl">
                  인기상품
                </div>
              )}
              <div className="p-6">
                <div className="flex justify-center mb-4">{product.icon}</div>
                <h3 className="text-xl font-semibold text-center mb-3">{product.title}</h3>
                <p className="text-gray-600 text-center mb-6">{product.description}</p>
                <div className="space-y-2">
                  {product.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center">
                      <FiCheckCircle className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{option}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 text-center">
                <button className="text-indigo-600 font-medium hover:text-indigo-800">
                  자세히 보기
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 광고 집행 프로세스 */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">광고 집행 절차</h2>
        <div className="relative">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-indigo-100 -translate-y-1/2 z-0"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {adProcess.slice(0, 3).map((process, index) => (
              <div key={index} className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{process.title}</h3>
                  <p className="text-gray-600 text-center">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {adProcess.slice(3).map((process, index) => (
              <div key={index} className="relative z-10">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center mb-4">
                    {process.step}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-center">{process.title}</h3>
                  <p className="text-gray-600 text-center">{process.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 문의 양식 */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">광고 문의</h2>
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
                광고 담당자가 검토 후 빠른 시일 내에 연락드리겠습니다. 감사합니다.
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
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.company}
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
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
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
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="adType" className="block text-sm font-medium text-gray-700 mb-1">
                    관심 광고 상품 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="adType"
                    name="adType"
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.adType}
                    onChange={handleChange}
                  >
                    <option value="">선택해주세요</option>
                    <option value="mainBanner">메인 배너</option>
                    <option value="articleBanner">기사 내 배너</option>
                    <option value="mobileAd">모바일 전용 광고</option>
                    <option value="other">기타</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm py-2 px-3 border focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    value={formData.message}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="inline-flex justify-center py-3 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
          추가 문의사항은 광고팀(<a href="mailto:ad@happynews.com" className="text-indigo-600">ad@happynews.com</a>, 02-123-4567)으로 연락주세요.
        </p>
      </div>
    </div>
  );
} 
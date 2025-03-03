'use client';

import { useState, useMemo } from 'react';
import PageHeader from '../components/PageHeader';
import { FiChevronDown, FiChevronUp, FiSearch, FiUser, FiCreditCard, FiSettings, FiHelpCircle, FiInfo } from 'react-icons/fi';

export default function FaqPage() {
  // 현재 선택된 카테고리
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // 검색어
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // 열린 FAQ 항목 상태
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});
  
  // FAQ 항목 토글 함수
  const toggleItem = (itemId: string) => {
    setOpenItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // FAQ 카테고리 데이터
  const categories = [
    { id: 'all', name: '전체', icon: <FiHelpCircle className="h-5 w-5 mr-2" /> },
    { id: 'account', name: '계정', icon: <FiUser className="h-5 w-5 mr-2" /> },
    { id: 'payment', name: '결제', icon: <FiCreditCard className="h-5 w-5 mr-2" /> },
    { id: 'service', name: '서비스', icon: <FiSettings className="h-5 w-5 mr-2" /> },
    { id: 'etc', name: '기타', icon: <FiInfo className="h-5 w-5 mr-2" /> }
  ];

  // FAQ 항목 데이터
  const faqItems = [
    {
      id: 'faq-1',
      category: 'account',
      question: '회원가입은 어떻게 하나요?',
      answer: '해피뉴스 메인 페이지 우측 상단의 "회원가입" 버튼을 클릭하시면 회원가입 페이지로 이동합니다. 이메일, 비밀번호, 닉네임 등 필요한 정보를 입력하시고 약관에 동의하신 후 가입 버튼을 클릭하시면 회원가입이 완료됩니다.'
    },
    {
      id: 'faq-2',
      category: 'account',
      question: '비밀번호를 잊어버렸어요.',
      answer: '로그인 페이지 하단의 "비밀번호 찾기" 링크를 클릭하시면 비밀번호 재설정을 위한 안내가 나옵니다. 가입 시 등록한 이메일 주소를 입력하시면 비밀번호 재설정 링크가 포함된 이메일을 보내드립니다.'
    },
    {
      id: 'faq-3',
      category: 'account',
      question: '회원 탈퇴는 어떻게 하나요?',
      answer: '로그인 후 "마이페이지 > 회원정보 수정 > 회원 탈퇴" 메뉴를 통해 탈퇴하실 수 있습니다. 탈퇴 시 회원님의 모든 개인정보는 즉시 파기되며, 작성하신 게시글이나 댓글은 삭제되지 않으니 필요한 경우 탈퇴 전에 직접 삭제해주시기 바랍니다.'
    },
    {
      id: 'faq-4',
      category: 'payment',
      question: '구독료 결제 방법은 어떻게 되나요?',
      answer: '해피뉴스의 프리미엄 서비스 구독은 "구독하기" 메뉴에서 신청하실 수 있습니다. 신용카드, 계좌이체, 휴대폰 결제 등 다양한 결제 수단을 지원하고 있으며, 월간 또는 연간 구독 중 선택하실 수 있습니다. 연간 구독 시 할인 혜택이 제공됩니다.'
    },
    {
      id: 'faq-5',
      category: 'payment',
      question: '구독 취소는 언제든지 가능한가요?',
      answer: '네, 언제든지 구독을 취소하실 수 있습니다. "마이페이지 > 구독 관리" 메뉴에서 구독 취소 버튼을 클릭하시면 됩니다. 취소 시 다음 결제일부터 구독이 중단되며, 이미 결제된 기간 동안은 서비스를 계속 이용하실 수 있습니다. 단, 연간 구독의 환불은 구독 시작 후 7일 이내에만 가능합니다.'
    },
    {
      id: 'faq-6',
      category: 'payment',
      question: '영수증은 어디서 확인할 수 있나요?',
      answer: '"마이페이지 > 결제 내역" 메뉴에서 각 결제 항목별로 영수증 발급이 가능합니다. 필요한 경우 이메일로 영수증을 발송해드리거나 PDF 파일로 다운로드 받으실 수 있습니다. 사업자 증빙용 세금계산서가 필요하신 경우 고객센터로 문의해 주시기 바랍니다.'
    },
    {
      id: 'faq-7',
      category: 'service',
      question: '뉴스 알림 설정은 어떻게 하나요?',
      answer: '로그인 후 "마이페이지 > 알림 설정" 메뉴에서 원하시는 카테고리나 키워드에 대한 알림을 설정하실 수 있습니다. 실시간 속보, 일일 요약 등 알림 유형과 시간대도 설정 가능합니다. 웹 브라우저를 사용하시는 경우 알림 권한을 허용해 주셔야 정상적으로 알림을 받으실 수 있습니다.'
    },
    {
      id: 'faq-8',
      category: 'service',
      question: '기사에 오류를 발견했어요. 어디에 신고하면 되나요?',
      answer: '각 기사 하단의 "오류 신고" 버튼을 클릭하시거나, "고객문의 > 기사 오류 신고" 메뉴를 통해 신고해 주시면 됩니다. 구체적인 오류 내용과 함께 정확한 정보를 알려주시면 신속하게 확인 후 수정하겠습니다. 해피뉴스는 정확한 정보 전달을 위해 항상 최선을 다하고 있습니다.'
    },
    {
      id: 'faq-9',
      category: 'service',
      question: '뉴스레터는 어떻게 구독할 수 있나요?',
      answer: '메인 페이지 하단의 뉴스레터 구독 영역에서 이메일 주소를 입력하시고 구독 버튼을 클릭하시면 됩니다. 회원가입 없이도 구독 가능하며, 언제든지 수신 거부하실 수 있습니다. 주제별로 다양한 뉴스레터가 준비되어 있으니 관심 있는 분야를 선택해 보세요.'
    },
    {
      id: 'faq-10',
      category: 'etc',
      question: '해피뉴스 모바일 앱은 어디서 다운로드 받나요?',
      answer: '해피뉴스 모바일 앱은 애플 앱스토어와 구글 플레이스토어에서 "해피뉴스"를 검색하여 다운로드 받으실 수 있습니다. 모바일 앱을 이용하시면 푸시 알림, 오프라인 읽기 모드 등 더 편리한 기능을 이용하실 수 있습니다.'
    },
    {
      id: 'faq-11',
      category: 'etc',
      question: '광고 문의는 어디로 하면 되나요?',
      answer: '광고 문의는 "광고안내" 페이지를 참고하시거나, ad@happynews.com으로 연락주시기 바랍니다. 배너 광고, 네이티브 광고, 뉴스레터 광고 등 다양한 광고 상품이 준비되어 있으며, 담당자가 상세한 안내를 도와드립니다.'
    },
    {
      id: 'faq-12',
      category: 'etc',
      question: '취재 제보는 어떻게 하나요?',
      answer: '취재 제보는 report@happynews.com으로 보내주시거나, 메인 페이지 상단의 "제보하기" 버튼을 통해 가능합니다. 제보하신 내용은 철저히 검토 후 취재가 이루어지며, 필요한 경우 기자가 직접 연락드릴 수 있습니다. 중요한 제보의 경우 제보자의 신원을 철저히 보호해 드립니다.'
    }
  ];

  // 필터링된 FAQ 목록
  const filteredFaqs = useMemo(() => {
    return faqItems.filter(item => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch = searchQuery === '' || 
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.answer.toLowerCase().includes(searchQuery.toLowerCase());
      
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="자주 묻는 질문 (FAQ)"
        description="해피뉴스 서비스 이용에 관한 자주 묻는 질문들을 모았습니다."
        className="mb-8"
      />
      
      {/* 검색 */}
      <div className="mb-8">
        <div className="relative max-w-lg mx-auto">
          <input
            type="text"
            placeholder="질문을 검색해보세요..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </div>
      
      {/* 카테고리 필터 */}
      <div className="mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <button
              key={category.id}
              className={`flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                selectedCategory === category.id 
                  ? 'bg-green-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      {/* FAQ 목록 */}
      <div className="space-y-4">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => (
            <div key={faq.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* 질문 (아코디언 헤더) */}
              <button
                className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
                onClick={() => toggleItem(faq.id)}
              >
                <h3 className="text-lg font-medium text-gray-900 text-left">{faq.question}</h3>
                <span>
                  {openItems[faq.id] ? (
                    <FiChevronUp className="h-5 w-5 text-gray-500" />
                  ) : (
                    <FiChevronDown className="h-5 w-5 text-gray-500" />
                  )}
                </span>
              </button>
              
              {/* 답변 (아코디언 콘텐츠) */}
              {openItems[faq.id] && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{faq.answer}</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <FiInfo className="h-10 w-10 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-lg mb-2">검색 결과가 없습니다.</p>
            <p className="text-gray-500">다른 키워드로 검색하거나 다른 카테고리를 선택해 보세요.</p>
          </div>
        )}
      </div>
      
      {/* 추가 도움말 */}
      <div className="mt-12 bg-green-50 rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">원하는 답변을 찾지 못하셨나요?</h2>
        <p className="text-gray-700 text-center mb-6">
          더 자세한 문의사항은 고객센터로 문의해 주세요. 24시간 이내에 답변 드리겠습니다.
        </p>
        <div className="flex justify-center">
          <a 
            href="/inquiry"
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            고객문의 바로가기
          </a>
        </div>
      </div>
    </div>
  );
} 
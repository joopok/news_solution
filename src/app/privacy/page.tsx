'use client';

import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiChevronDown, FiChevronUp, FiShield, FiLock, FiTrash2, FiClock, FiGlobe, FiFileText } from 'react-icons/fi';

export default function PrivacyPage() {
  // 현재 열려있는 아코디언 아이템 상태
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({
    'section-1': true, // 첫 번째 섹션은 기본적으로 열림
  });

  // 아코디언 토글 함수
  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  };

  // 개인정보처리방침 섹션 데이터
  const privacySections = [
    {
      id: 'section-1',
      title: '1. 개인정보의 수집 및 이용 목적',
      icon: <FiShield className="h-6 w-6 text-indigo-600" />,
      content: [
        '해피뉴스는 다음과 같은 목적으로 개인정보를 수집하고 이용합니다:',
        '\n1) 서비스 제공 및 계정 관리',
        '- 회원가입, 서비스 이용, 콘텐츠 제공, 맞춤형 서비스 제공',
        '- 회원 식별 및 본인 확인, 부정 이용 방지',
        '- 서비스 이용 기록 및 통계 분석',
        '\n2) 고객 관리',
        '- 문의사항이나 불만 처리, 공지사항 전달',
        '- 이용자 서비스 만족도 조사',
        '\n3) 마케팅 및 광고',
        '- 이벤트, 프로모션 안내 및 참여 기회 제공',
        '- 접속 빈도 파악, 서비스 이용에 대한 통계'
      ]
    },
    {
      id: 'section-2',
      title: '2. 수집하는 개인정보 항목',
      icon: <FiFileText className="h-6 w-6 text-indigo-600" />,
      content: [
        '해피뉴스는 서비스 제공을 위해 다음과 같은 개인정보를 수집합니다:',
        '\n1) 필수 수집 항목',
        '- 회원 가입 시: 이메일 주소, 비밀번호, 닉네임, 이름',
        '- 자동 수집 항목: IP 주소, 쿠키, 방문 일시, 서비스 이용 기록, 기기 정보',
        '\n2) 선택 수집 항목',
        '- 프로필 이미지, 관심 분야(카테고리), 직업, 연령대',
        '- 마케팅 정보 수신 동의 시: 휴대전화 번호',
        '\n3) 결제 관련 정보 (유료 서비스 이용 시)',
        '- 신용카드 정보, 은행계좌 정보, 결제 기록'
      ]
    },
    {
      id: 'section-3',
      title: '3. 개인정보의 보유 및 이용 기간',
      icon: <FiClock className="h-6 w-6 text-indigo-600" />,
      content: [
        '해피뉴스는 원칙적으로 개인정보의 수집 및 이용 목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다. 다만, 다음의 정보에 대해서는 관련 법령에 따라 명시한 기간 동안 보관합니다:',
        '\n1) 회사 내부 방침에 의한 정보 보유',
        '- 회원 탈퇴 시: 부정 이용 방지를 위해 30일간 보관',
        '\n2) 관련 법령에 의한 정보 보유',
        '- 계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)',
        '- 대금 결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서의 소비자 보호에 관한 법률)',
        '- 소비자 불만 또는 분쟁 처리에 관한 기록: 3년 (전자상거래 등에서의 소비자 보호에 관한 법률)',
        '- 웹사이트 방문 기록: 3개월 (통신비밀보호법)'
      ]
    },
    {
      id: 'section-4',
      title: '4. 개인정보의 파기 절차 및 방법',
      icon: <FiTrash2 className="h-6 w-6 text-indigo-600" />,
      content: [
        '해피뉴스는 개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가 불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다. 파기 절차 및 방법은 다음과 같습니다:',
        '\n1) 파기 절차',
        '- 이용자가 입력한 정보는 목적이 달성된 후 별도의 데이터베이스로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 관련 법령에 따라 일정 기간 저장된 후 파기됩니다.',
        '- 별도 데이터베이스로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 다른 목적으로 이용되지 않습니다.',
        '\n2) 파기 방법',
        '- 전자적 파일 형태로 저장된 개인정보는 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제합니다.',
        '- 종이에 출력된 개인정보는 분쇄기로 분쇄하거나 소각을 통하여 파기합니다.'
      ]
    },
    {
      id: 'section-5',
      title: '5. 개인정보의 안전성 확보 조치',
      icon: <FiLock className="h-6 w-6 text-indigo-600" />,
      content: [
        '해피뉴스는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다:',
        '\n1) 관리적 조치',
        '- 개인정보 취급 직원 최소화 및 교육 실시',
        '- 개인정보 처리 관련 안정성 확보를 위한 정기적 자체 감사 실시',
        '\n2) 기술적 조치',
        '- 개인정보 처리시스템에 대한 접근 권한 관리',
        '- 개인정보의 암호화 및 네트워크 보안',
        '- 백신 소프트웨어 등 보안 프로그램 설치 및 주기적 갱신',
        '- 침입차단시스템 등을 이용한 외부로부터의 무단 접근 통제',
        '\n3) 물리적 조치',
        '- 전산실, 자료보관실 등 개인정보를 보관하는 장소에 대한 출입통제'
      ]
    },
    {
      id: 'section-6',
      title: '6. 이용자 및 법정대리인의 권리와 그 행사 방법',
      icon: <FiGlobe className="h-6 w-6 text-indigo-600" />,
      content: [
        '이용자 및 법정대리인은 언제든지 등록되어 있는 자신 혹은 당해 만 14세 미만 아동의 개인정보를 조회하거나 수정할 수 있으며, 회원탈퇴를 통해 개인정보 이용 및 제공에 대한 동의를 철회할 수 있습니다.',
        '\n이용자의 개인정보에 대한 권리 행사는 개인정보보호법에 따라 서면, 전자우편, 모사전송(FAX) 등을 통하여 하실 수 있으며, 해피뉴스는 이에 대해 지체 없이 조치하겠습니다.',
        '\n이용자가 개인정보의 오류 등에 대한 정정을 요청한 경우에는 정정을 완료할 때까지 당해 개인정보를 이용하거나 제공하지 않습니다.',
        '\n만 14세 미만 아동의 개인정보 수집 시 법정대리인의 동의를 받고 있으며, 법정대리인의 요청이 있을 경우 해당 개인정보의 열람, 정정, 삭제, 처리정지를 요구할 권리가 있습니다.'
      ]
    },
    {
      id: 'section-7',
      title: '7. 개인정보 보호책임자 및 연락처',
      content: [
        '해피뉴스는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 이용자의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다:',
        '\n▶ 개인정보 보호책임자',
        '- 성명: 홍길동',
        '- 직위: 개인정보보호팀장',
        '- 연락처: privacy@happynews.com',
        '\n▶ 개인정보 보호 담당부서',
        '- 부서명: 개인정보보호팀',
        '- 연락처: 02-123-4567',
        '\n기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다:',
        '- 개인정보침해신고센터 (privacy.kisa.or.kr / 국번없이 118)',
        '- 대검찰청 사이버수사과 (www.spo.go.kr / 국번없이 1301)',
        '- 경찰청 사이버안전국 (www.police.go.kr/www/security/cyber.jsp / 국번없이 182)'
      ]
    }
  ];

  // 개인정보처리방침 시행일 정보
  const privacyEffectiveDate = '2024년 01월 01일';
  const privacyLastUpdated = '2024년 01월 01일';

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="개인정보처리방침"
        description="해피뉴스는 이용자의 개인정보를 소중히 다루고 있습니다."
        className="mb-8"
      />

      {/* 개인정보처리방침 시행일 정보 */}
      <div className="mb-8 text-sm text-gray-600">
        <p>시행일: {privacyEffectiveDate}</p>
        <p>최종 개정일: {privacyLastUpdated}</p>
      </div>

      {/* 소개 */}
      <div className="mb-8 bg-indigo-50 rounded-lg p-6">
        <p className="text-gray-700">
          해피뉴스(이하 '회사')는 「개인정보 보호법」 제30조에 따라 정보주체의 개인정보를 보호하고 
          이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 
          수립하여 공개합니다.
        </p>
      </div>

      {/* 방침 내용 */}
      <div className="mb-8 space-y-6">
        {privacySections.map((section) => (
          <div key={section.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* 섹션 제목 (클릭 가능한 아코디언 헤더) */}
            <button
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
              onClick={() => toggleSection(section.id)}
            >
              <div className="flex items-center">
                {section.icon && <span className="mr-3">{section.icon}</span>}
                <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
              </div>
              <span>
                {openSections[section.id] ? (
                  <FiChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <FiChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </span>
            </button>

            {/* 섹션 내용 (아코디언 콘텐츠) */}
            {openSections[section.id] && (
              <div className="px-6 py-4 bg-gray-50">
                <div className="space-y-3 text-gray-700">
                  {Array.isArray(section.content) ? (
                    section.content.map((paragraph, i) => (
                      <p key={i} className="whitespace-pre-line">{paragraph}</p>
                    ))
                  ) : (
                    <p className="whitespace-pre-line">{section.content}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 권리 행사 방법 안내 */}
      <div className="bg-indigo-50 rounded-lg p-6 text-center mb-8">
        <p className="text-gray-700 mb-2">개인정보에 관한 문의사항이나 권리 행사는 아래 연락처로 문의해주세요.</p>
        <a href="mailto:privacy@happynews.com" className="text-indigo-600 font-medium hover:underline">
          privacy@happynews.com
        </a>
      </div>
    </div>
  );
} 
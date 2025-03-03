'use client';

import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';

export default function TermsPage() {
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

  // 약관 섹션 데이터
  const termsSections = [
    {
      id: 'section-1',
      title: '제1장 총칙',
      subsections: [
        {
          title: '제1조 (목적)',
          content: '이 약관은 해피뉴스(이하 "회사"라 함)가 제공하는 서비스(이하 "서비스"라 함)를 이용함에 있어 회사와 이용자의 권리, 의무 및 책임사항을 규정함을 목적으로 합니다.'
        },
        {
          title: '제2조 (정의)',
          content: [
            '① "서비스"라 함은 PC, 모바일 기기 등 단말기의 종류와 관계없이 이용자가 이용할 수 있는 해피뉴스 관련 제반 서비스를 의미합니다.',
            '② "이용자"라 함은 이 약관에 따라 회사가 제공하는 서비스를 이용하는 회원 및 비회원을 말합니다.',
            '③ "회원"이라 함은 회사에 개인정보를 제공하여 회원등록을 한 자로서, 회사의 정보를 지속적으로 제공받으며, 회사가 제공하는 서비스를 계속적으로 이용할 수 있는 자를 말합니다.',
            '④ "비회원"이라 함은 회원으로 가입하지 않고 회사가 제공하는 서비스를 이용하는 자를 말합니다.'
          ]
        },
        {
          title: '제3조 (약관의 게시와 개정)',
          content: [
            '① 회사는 이 약관의 내용을 이용자가 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.',
            '② 회사는 필요한 경우 관련법령을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.',
            '③ 회사가 약관을 개정할 경우에는 적용일자 및 개정사유를 명시하여 현행 약관과 함께 서비스 초기화면에 그 적용일자 7일 이전부터 적용일자 전일까지 공지합니다. 다만, 이용자에게 불리한 약관의 개정의 경우에는 30일 이전부터 공지합니다.',
            '④ 이용자는 개정된 약관에 동의하지 않을 경우 회원 탈퇴를 요청할 수 있으며, 개정된 약관의 효력 발생일 이후에도 서비스를 계속 이용할 경우 약관의 변경사항에 동의한 것으로 간주됩니다.'
          ]
        }
      ]
    },
    {
      id: 'section-2',
      title: '제2장 서비스 이용',
      subsections: [
        {
          title: '제4조 (서비스의 제공)',
          content: [
            '① 회사는 다음과 같은 서비스를 제공합니다.',
            '  1. 뉴스 및 콘텐츠 제공 서비스',
            '  2. 검색 서비스',
            '  3. 커뮤니티 서비스',
            '  4. 기타 회사가 정하는 서비스',
            '② 회사는 서비스의 내용, 이용방법, 이용시간에 대하여 변경이 있는 경우에는 변경사유, 변경될 서비스의 내용 및 제공일자 등을 그 변경 전에 해당 서비스 초기화면에 게시합니다.'
          ]
        },
        {
          title: '제5조 (서비스의 중단)',
          content: [
            '① 회사는 컴퓨터 등 정보통신설비의 보수점검, 교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 서비스의 제공을 일시적으로 중단할 수 있습니다.',
            '② 회사는 제1항의 사유로 서비스의 제공이 일시적으로 중단됨으로 인하여 이용자 또는 제3자가 입은 손해에 대하여 배상하지 않습니다. 단, 회사의 고의 또는 중과실이 있는 경우에는 그러하지 아니합니다.'
          ]
        }
      ]
    },
    {
      id: 'section-3',
      title: '제3장 회원정보 및 개인정보보호',
      subsections: [
        {
          title: '제6조 (회원가입)',
          content: [
            '① 이용자는 회사가 정한 가입 양식에 따라, 개인정보를 정확하게 기재하여 회원가입을 신청하여야 합니다.',
            '② 회사는 회원가입 신청자가 다음 각 호에 해당하는 경우에 회원가입을 거부할 수 있습니다.',
            '  1. 이미 가입된 회원과 이메일 주소나 연락처가 동일한 경우',
            '  2. 실명이 아니거나 타인의 명의를 이용한 경우',
            '  3. 허위의 정보를 기재하거나, 회사가 필수적으로 입력을 요구하는 정보를 입력하지 않은 경우',
            '  4. 기타 관련법령에 위배되거나 세부지침 등 회사가 정한 기준에 반하는 경우'
          ]
        },
        {
          title: '제7조 (개인정보보호)',
          content: [
            '① 회사는 관련 법령이 정하는 바에 따라 이용자의 개인정보를 보호하기 위해 노력합니다.',
            '② 개인정보의 보호 및 이용에 대해서는 관련 법령 및 회사의 개인정보처리방침이 적용됩니다. 다만, 회사의 공식 사이트 이외의 링크된 사이트에서는 회사의 개인정보처리방침이 적용되지 않습니다.'
          ]
        }
      ]
    },
    {
      id: 'section-4',
      title: '제4장 의무 및 책임',
      subsections: [
        {
          title: '제8조 (회사의 의무)',
          content: [
            '① 회사는 관련 법령과 이 약관이 금지하거나 미풍양속에 반하는 행위를 하지 않으며, 계속적이고 안정적으로 서비스를 제공하기 위하여 최선을 다하여 노력합니다.',
            '② 회사는 이용자가 안전하게 서비스를 이용할 수 있도록 개인정보보호를 위한 보안시스템을 갖추어야 하며 개인정보처리방침을 공시하고 준수합니다.'
          ]
        },
        {
          title: '제9조 (이용자의 의무)',
          content: [
            '① 이용자는 다음 행위를 하여서는 안 됩니다.',
            '  1. 서비스에 게시된 정보의 허가 받지 않은 변경',
            '  2. 회사가 정한 정보 이외의 정보(컴퓨터 프로그램 등) 등의 송신 또는 게시',
            '  3. 회사와 기타 제3자의 저작권 등 지적재산권에 대한 침해',
            '  4. 회사와 기타 제3자의 명예를 손상시키거나 업무를 방해하는 행위',
            '  5. 외설 또는 폭력적인 메시지, 화상, 음성, 기타 공서양속에 반하는 정보를 서비스에 공개 또는 게시하는 행위',
            '  6. 기타 불법적이거나 부당한 행위'
          ]
        }
      ]
    },
    {
      id: 'section-5',
      title: '제5장 기타',
      subsections: [
        {
          title: '제10조 (재판권 및 준거법)',
          content: '① 회사와 이용자 간에 발생한 분쟁에 관한 소송은 회사의 본사 소재지를 관할하는 법원을 관할법원으로 합니다. \n② 회사와 이용자 간에 제기된 소송에는 대한민국 법을 적용합니다.'
        },
        {
          title: '제11조 (기타)',
          content: '이 약관에 명시되지 않은 사항은 관련 법령 및 회사가 정한 서비스의 세부이용지침 등의 규정에 따릅니다.'
        }
      ]
    }
  ];

  // 약관 시행일 정보
  const termsEffectiveDate = '2024년 01월 01일';
  const termsLastUpdated = '2024년 01월 01일';

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="이용약관"
        description="해피뉴스 서비스 이용에 관한 약관입니다."
        className="mb-8"
      />

      {/* 약관 시행일 정보 */}
      <div className="mb-8 text-sm text-gray-600">
        <p>시행일: {termsEffectiveDate}</p>
        <p>최종 개정일: {termsLastUpdated}</p>
      </div>

      {/* 약관 내용 */}
      <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
        {termsSections.map(section => (
          <div key={section.id} className="border-b border-gray-200 last:border-b-0">
            {/* 섹션 제목 (클릭 가능한 아코디언 헤더) */}
            <button
              className="w-full px-6 py-4 flex justify-between items-center hover:bg-gray-50 transition-colors focus:outline-none"
              onClick={() => toggleSection(section.id)}
            >
              <h2 className="text-lg font-semibold text-gray-900">{section.title}</h2>
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
                {section.subsections.map((subsection, index) => (
                  <div key={index} className="mb-6 last:mb-0">
                    <h3 className="text-base font-medium text-gray-900 mb-2">{subsection.title}</h3>
                    <div className="space-y-2 text-sm text-gray-700">
                      {Array.isArray(subsection.content) ? (
                        subsection.content.map((paragraph, i) => (
                          <p key={i} className="whitespace-pre-line">{paragraph}</p>
                        ))
                      ) : (
                        <p className="whitespace-pre-line">{subsection.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* 문의 안내 */}
      <div className="bg-blue-50 rounded-lg p-6 text-center">
        <p className="text-gray-700 mb-2">이용약관에 대한 문의사항은 아래 이메일로 연락주시기 바랍니다.</p>
        <a href="mailto:terms@happynews.com" className="text-blue-600 font-medium hover:underline">
          terms@happynews.com
        </a>
      </div>
    </div>
  );
} 
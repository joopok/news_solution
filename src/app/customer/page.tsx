'use client';

import { useState } from 'react';
import CustomLink from '../components/CustomLink';
import { FiPhone, FiMail, FiMessageSquare, FiFileText, FiInfo, FiChevronRight } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import Card from '../components/Card';
import TabNav from '../components/TabNav';
import Accordion from '../components/Accordion';

// FAQ 데이터
const faqData = [
  {
    id: 1,
    title: '구독 신청은 어떻게 하나요?',
    content: '상단 메뉴의 [구독신청] 버튼을 클릭하여 신청하실 수 있습니다. 다양한 구독 상품이 준비되어 있으니 원하시는 상품을 선택하여 이용해 주세요.'
  },
  {
    id: 2,
    title: '아이디와 비밀번호를 잊어버렸어요.',
    content: '로그인 페이지에서 [아이디/비밀번호 찾기] 메뉴를 통해 찾으실 수 있습니다. 가입 시 등록한 이메일 또는 휴대폰 번호로 인증 후 확인하실 수 있습니다.'
  },
  {
    id: 3,
    title: '결제 내역은 어디서 확인하나요?',
    content: '마이페이지 > 결제내역에서 확인하실 수 있습니다. 결제 영수증 발급도 해당 페이지에서 가능합니다.'
  },
  {
    id: 4,
    title: '구독 해지는 어떻게 하나요?',
    content: '마이페이지 > 구독관리에서 [구독해지] 버튼을 클릭하여 진행하실 수 있습니다. 구독기간 종료일까지는 서비스 이용이 가능합니다.'
  },
  {
    id: 5,
    title: '기사 제보는 어떻게 하나요?',
    content: '고객센터 > 1:1 문의하기에서 [제보하기] 카테고리를 선택하여 제보해 주시면 담당 기자가 검토 후 연락드립니다.'
  },
];

// 공지사항 데이터
const noticeData = [
  {
    id: 1,
    title: '개인정보처리방침 개정 안내',
    date: '2024-02-25',
    link: '/customer/notice/1'
  },
  {
    id: 2,
    title: '시스템 점검에 따른 서비스 일시 중단 안내',
    date: '2024-02-20',
    link: '/customer/notice/2'
  },
  {
    id: 3,
    title: '뉴스레터 서비스 오픈 안내',
    date: '2024-02-15',
    link: '/customer/notice/3'
  },
  {
    id: 4,
    title: '모바일 앱 업데이트 안내',
    date: '2024-02-10',
    link: '/customer/notice/4'
  },
];

export default function CustomerPage() {
  // 탭 콘텐츠 정의
  const tabItems = [
    {
      id: 'faq',
      label: '자주 묻는 질문',
      content: (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">자주 묻는 질문</h2>
          <Accordion 
            items={faqData.map(faq => ({
              id: faq.id,
              title: faq.title,
              content: faq.content
            }))}
          />
        </div>
      )
    },
    {
      id: 'notice',
      label: '공지사항',
      content: (
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-6">공지사항</h2>
          <div className="border-t border-gray-200">
            {noticeData.map((notice) => (
              <CustomLink 
                key={notice.id} 
                href={notice.link}
                className="flex justify-between items-center py-4 border-b border-gray-200 hover:bg-gray-50 px-4"
              >
                <span className="font-medium text-gray-800">{notice.title}</span>
                <div className="flex items-center">
                  <span className="text-sm text-gray-500 mr-4">{notice.date}</span>
                  <FiChevronRight className="text-gray-400" />
                </div>
              </CustomLink>
            ))}
          </div>
          <div className="mt-6 text-center">
            <CustomLink 
              href="/customer/notice" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-emerald-700 bg-emerald-100 hover:bg-emerald-200"
            >
              공지사항 더보기
            </CustomLink>
          </div>
        </div>
      )
    },
  ];

  // 바로가기 카드 아이템 정의
  const quickLinks = [
    {
      icon: <FiMessageSquare className="text-emerald-600 text-xl" />,
      title: '1:1 문의하기',
      description: '궁금한 사항을 1:1 문의로 남겨주시면 빠르게 답변해 드립니다.',
      link: '/customer/inquiry',
      linkText: '문의하기'
    },
    {
      icon: <FiFileText className="text-emerald-600 text-xl" />,
      title: '공지사항',
      description: '서비스 변경점, 점검 일정 등 중요한 소식을 확인하세요.',
      link: '/customer/notice',
      linkText: '공지사항 보기'
    },
    {
      icon: <FiInfo className="text-emerald-600 text-xl" />,
      title: '이용 가이드',
      description: '서비스 이용 방법과 유용한 팁을 확인하실 수 있습니다.',
      link: '/customer/guide',
      linkText: '가이드 보기'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 타이틀 */}
      <PageHeader
        title="고객센터"
        description="궁금하신 점이 있으시면 아래의 자주 묻는 질문을 확인하시거나 1:1 문의를 통해 문의해 주세요."
        centerAlign={true}
        className="mb-10"
      />

      {/* 빠른 링크 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {quickLinks.map((item, index) => (
          <Card
            key={index}
            title={item.title}
            description={item.description}
            icon={item.icon}
            link={item.link}
            linkText={item.linkText}
          />
        ))}
      </div>

      {/* 탭 메뉴 */}
      <TabNav tabs={tabItems} defaultActiveTab="faq" />

      {/* 고객센터 정보 */}
      <div className="bg-gray-50 rounded-lg p-6 mt-10">
        <h2 className="text-lg font-bold text-gray-800 mb-4">고객센터 운영 안내</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center mb-3">
              <FiPhone className="text-emerald-600 mr-2" />
              <span className="font-medium text-gray-700">전화 문의</span>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-1">1500-1234</p>
            <p className="text-gray-600 text-sm">
              평일 09:00 - 18:00 (점심시간 12:00 - 13:00)<br />
              토/일/공휴일 휴무
            </p>
          </div>
          <div>
            <div className="flex items-center mb-3">
              <FiMail className="text-emerald-600 mr-2" />
              <span className="font-medium text-gray-700">이메일 문의</span>
            </div>
            <p className="text-gray-800 mb-1">happynews@cgmail.com</p>
            <p className="text-gray-600 text-sm">
              24시간 접수 가능<br />
              평일 기준 24시간 내 답변 드립니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 
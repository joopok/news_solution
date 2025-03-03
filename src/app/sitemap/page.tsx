'use client';

import CustomLink from '../components/CustomLink';
import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import PageHeader from '../components/PageHeader';
import Accordion from '../components/Accordion';
import { SitemapItem } from '../types/types';

// 사이트맵 데이터
const sitemapData: SitemapItem[] = [
  {
    title: '메인',
    url: '/',
    description: '뉴스 홈페이지',
  },
  {
    title: '뉴스',
    url: '/news',
    description: '모든 뉴스 콘텐츠',
    children: [
      { title: '정치', url: '/news/politics', description: '정치 뉴스 모음' },
      { title: '경제', url: '/news/economy', description: '경제 뉴스 모음' },
      { title: '사회', url: '/news/society', description: '사회 뉴스 모음' },
      { title: '국제', url: '/news/world', description: '국제 뉴스 모음' },
      { title: '문화', url: '/news/culture', description: '문화 뉴스 모음' },
      { title: 'IT/과학', url: '/news/tech', description: 'IT/과학 뉴스 모음' },
      { title: '스포츠', url: '/news/sports', description: '스포츠 뉴스 모음' },
    ],
  },
  {
    title: '회원서비스',
    url: '/member',
    description: '회원 관련 서비스',
    children: [
      { title: '로그인', url: '/member/login', description: '로그인 페이지' },
      { title: '회원가입', url: '/member/register', description: '회원가입 페이지' },
      { title: '아이디/비밀번호 찾기', url: '/member/find', description: '계정 찾기 페이지' },
      { title: '마이페이지', url: '/member/mypage', description: '개인정보 및 이용내역' },
    ],
  },
  {
    title: '구독',
    url: '/subscription',
    description: '구독 서비스',
    children: [
      { title: '구독 안내', url: '/subscription/info', description: '구독 서비스 소개' },
      { title: '구독 신청', url: '/subscription/apply', description: '구독 신청 페이지' },
      { title: '구독 혜택', url: '/subscription/benefits', description: '구독 혜택 안내' },
    ],
  },
  {
    title: '고객센터',
    url: '/customer',
    description: '고객 지원 서비스',
    children: [
      { title: '공지사항', url: '/customer/notice', description: '공지사항 목록' },
      { title: '1:1 문의', url: '/customer/inquiry', description: '1:1 문의하기' },
      { title: '이용가이드', url: '/customer/guide', description: '서비스 이용 가이드' },
    ],
  },
  {
    title: '회사 소개',
    url: '/about',
    description: '회사 정보',
    children: [
      { title: '회사 정보', url: '/about/company', description: '회사 소개' },
      { title: '오시는 길', url: '/about/location', description: '회사 위치 안내' },
      { title: '채용 정보', url: '/about/careers', description: '채용 공고 및 지원' },
    ],
  },
  {
    title: '기타',
    url: '#',
    description: '기타 정보',
    children: [
      { title: '이용약관', url: '/terms', description: '서비스 이용약관' },
      { title: '개인정보처리방침', url: '/privacy', description: '개인정보 처리방침' },
      { title: '사이트맵', url: '/sitemap', description: '사이트맵' },
    ],
  },
];

// 사이트맵 그룹의 콘텐츠 컴포넌트 (Accordion에 전달할 콘텐츠)
function SitemapGroupContent({ item }: { item: SitemapItem }) {
  if (!item.children || item.children.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {item.children.map((child, index) => (
        <CustomLink 
          key={index} 
          href={child.url}
          className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <h3 className="font-medium text-gray-800 mb-1">{child.title}</h3>
          {child.description && (
            <p className="text-sm text-gray-500">{child.description}</p>
          )}
        </CustomLink>
      ))}
    </div>
  );
}

export default function Sitemap() {
  return (
    <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6">
      <PageHeader
        title="사이트맵"
        description="뉴스 웹사이트의 모든 페이지를 한눈에 볼 수 있는 사이트맵입니다."
        className="mb-10"
      />
      
      <div className="space-y-6 divide-y divide-gray-200">
        <Accordion
          items={sitemapData.map(item => ({
            id: item.url,
            title: item.title, 
            content: <SitemapGroupContent item={item} />
          }))}
          allowMultiple={true}
          defaultExpanded={sitemapData.map(item => item.url)}
        />
      </div>
    </div>
  );
} 
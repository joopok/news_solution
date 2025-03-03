'use client';

import { useState } from 'react';
import Image from 'next/image';
import { FaVideo, FaClock, FaEye, FaYoutube } from 'react-icons/fa';

// 더미 동영상 뉴스 데이터
const videoNews = [
  {
    id: 1,
    category: '정치',
    title: '국회 본회의 주요 법안 처리 현장',
    summary: '오늘 국회 본회의에서 처리된 주요 법안들과 여야 의원들의 토론 내용을 정리했습니다.',
    videoUrl: 'https://placehold.co/600x400/0066cc/white?text=정치뉴스',
    date: '2024-02-26',
    views: 15678,
  },
  {
    id: 2,
    category: '경제',
    title: '한국은행 기준금리 동결 발표',
    summary: '한국은행 금융통화위원회가 기준금리 동결을 결정한 배경과 향후 전망을 분석합니다.',
    videoUrl: 'https://placehold.co/600x400/00cc66/white?text=경제뉴스',
    date: '2024-02-26',
    views: 14567,
  },
  {
    id: 3,
    category: '사회',
    title: '서울 도심 새 교통체계 도입 현장',
    summary: '서울 도심에 새롭게 도입된 교통체계의 현장을 취재했습니다.',
    videoUrl: 'https://placehold.co/600x400/cc6600/white?text=사회뉴스',
    date: '2024-02-26',
    views: 13456,
  },
  {
    id: 4,
    category: '국제',
    title: '미중 정상회담 주요 합의 내용',
    summary: '미중 정상회담에서 도출된 주요 합의 내용과 향후 전망을 분석합니다.',
    videoUrl: 'https://placehold.co/600x400/6600cc/white?text=국제뉴스',
    date: '2024-02-26',
    views: 12345,
  },
  {
    id: 5,
    category: '문화',
    title: '국립중앙박물관 특별전 개막',
    summary: '국립중앙박물관에서 개최되는 특별전의 주요 전시 내용을 소개합니다.',
    videoUrl: 'https://placehold.co/600x400/cc0066/white?text=문화뉴스',
    date: '2024-02-26',
    views: 11234,
  },
  {
    id: 6,
    category: 'IT',
    title: '삼성전자 신제품 발표회 현장',
    summary: '삼성전자가 공개한 새로운 스마트폰의 주요 기능을 살펴봅니다.',
    videoUrl: 'https://placehold.co/600x400/66cc00/white?text=IT뉴스',
    date: '2024-02-26',
    views: 10123,
  },
  {
    id: 7,
    category: '스포츠',
    title: '프로야구 개막 특집 중계',
    summary: '2024 프로야구 시즌 개막전 하이라이트와 전문가 분석을 전해드립니다.',
    videoUrl: 'https://placehold.co/600x400/cc3300/white?text=스포츠뉴스',
    date: '2024-02-26',
    views: 9876,
  },
  {
    id: 8,
    category: '과학',
    title: '한국형 발사체 나로호 발사 성공',
    summary: '한국형 발사체 나로호의 성공적인 발사 장면과 의미를 전합니다.',
    videoUrl: 'https://placehold.co/600x400/0099cc/white?text=과학뉴스',
    date: '2024-02-26',
    views: 8765,
  },
  {
    id: 9,
    category: '교육',
    title: '2025 대입제도 개편안 설명회',
    summary: '교육부가 발표한 2025 대입제도 개편안의 주요 내용을 설명합니다.',
    videoUrl: 'https://placehold.co/600x400/cc9900/white?text=교육뉴스',
    date: '2024-02-26',
    views: 7654,
  },
  {
    id: 10,
    category: '환경',
    title: '탄소중립 실천 현장 르포',
    summary: '기업과 시민들의 탄소중립 실천 현장을 취재했습니다.',
    videoUrl: 'https://placehold.co/600x400/009966/white?text=환경뉴스',
    date: '2024-02-26',
    views: 6543,
  },
];

// 인기 유튜브 채널 데이터
const popularYoutubeChannels = [
  {
    id: 1,
    name: '뉴스A',
    subscribers: '100만',
    description: '24시간 속보와 심층분석',
    thumbnailUrl: 'https://placehold.co/300x300/ff0000/white?text=뉴스A',
  },
  {
    id: 2,
    name: '경제야놀자',
    subscribers: '80만',
    description: '알기쉬운 경제 분석',
    thumbnailUrl: 'https://placehold.co/300x300/00ff00/white?text=경제야놀자',
  },
  {
    id: 3,
    name: '월드리포트',
    subscribers: '60만',
    description: '글로벌 뉴스 전문',
    thumbnailUrl: 'https://placehold.co/300x300/0000ff/white?text=월드리포트',
  },
];

export default function VideoNewsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 flex items-center">
        <FaVideo className="mr-2 text-red-600" />
        동영상 뉴스
      </h1>

      {/* 동영상 뉴스 섹션 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {videoNews.map((news) => (
          <div key={news.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-48">
              <Image
                src={news.videoUrl}
                alt={news.title}
                layout="fill"
                objectFit="cover"
                className="hover:opacity-75 transition-opacity"
              />
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-sm">
                <FaEye className="inline mr-1" />{news.views.toLocaleString()}
              </div>
            </div>
            <div className="p-4">
              <span className="text-sm text-blue-600 font-semibold">{news.category}</span>
              <h3 className="text-lg font-bold mt-2 mb-2">{news.title}</h3>
              <p className="text-gray-600 text-sm mb-3">{news.summary}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <FaClock className="mr-1" />
                {news.date}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 인기 유튜브 채널 섹션 */}
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <FaYoutube className="mr-2 text-red-600" />
        인기 유튜브 채널
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {popularYoutubeChannels.map((channel) => (
          <div key={channel.id} className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center mb-4">
              <Image
                src={channel.thumbnailUrl}
                alt={channel.name}
                width={60}
                height={60}
                className="rounded-full"
              />
              <div className="ml-4">
                <h3 className="font-bold text-lg">{channel.name}</h3>
                <p className="text-red-600">구독자 {channel.subscribers}</p>
              </div>
            </div>
            <p className="text-gray-600">{channel.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

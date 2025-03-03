'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AdBannerProps, AdBannerByIdProps } from '../types/types';


/**
 * 광고 배너 컴포넌트
 * 가로형(horizontal)과 정사각형(square) 두 가지 타입을 지원합니다.
 */
export default function AdBanner({ 
  type = 'horizontal', 
  link = '#', 
  imageSrc 
}: AdBannerProps) {
  // 기본 이미지 소스 설정
  const defaultImageSrc = type === 'horizontal' 
    ? 'https://placehold.co/1200x120/cccccc/808080?text=광고배너' 
    : 'https://placehold.co/300x300/cccccc/808080?text=광고';
  
  const finalImageSrc = imageSrc || defaultImageSrc;
  
  // 배너 스타일 설정
  const bannerStyle = {
    horizontal: "w-full h-[120px] relative rounded-md overflow-hidden",
    square: "w-full aspect-square max-w-[300px] relative rounded-md overflow-hidden"
  };
  
  return (
    <div className="w-full flex justify-center -mt-[1px]">
      <div className={bannerStyle[type as keyof typeof bannerStyle]}>
        <Link href={link} target="_blank" rel="noopener noreferrer" className="block w-full h-full">
          <div className="relative w-full h-full">
            <Image
              src={finalImageSrc}
              alt="광고"
              fill
              className="object-cover"
              priority={false}
            />
            <div className="absolute top-1 right-1 bg-black/30 text-white text-xs px-1 rounded">
              광고
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

// 광고 ID와 광고 배너 데이터를 매핑하는 개념의 컴포넌트
export function AdBannerById({ id, className = '' }: AdBannerByIdProps) {
  // 실제 서비스에서는 ID에 따라 서버에서 광고 데이터를 가져오거나
  // 광고 서비스 API를 호출할 수 있습니다.
  const adData = {
    'main-top': {
      image: 'https://placehold.co/1200x200/2563eb/ffffff?text=해피뉴스+TOP+AD',
      link: '/ads/main-top',
      size: 'medium',
      position: 'top',
    },
    'main-middle': {
      image: 'https://placehold.co/1200x200/2563eb/ffffff?text=해피뉴스+MIDDLE+AD',
      link: '/ads/main-middle',
      size: 'medium',
      position: 'middle',
    },
    'sidebar': {
      image: 'https://placehold.co/300x250/2563eb/ffffff?text=SIDE+AD',
      link: '/ads/sidebar',
      size: 'small',
      position: 'sidebar',
    },
    'full-banner': {
      image: 'https://placehold.co/1200x300/2563eb/ffffff?text=해피뉴스+FULL+BANNER+AD',
      link: '/ads/full-banner',
      size: 'full',
      position: 'middle',
    },
  };

  const ad = adData[id as keyof typeof adData];
  if (!ad) return null;

  return (
    <div className={className}>
      <AdBanner
        type={ad.size === 'full' ? 'horizontal' : 'square'}
        link={ad.link}
        imageSrc={ad.image}
      />
    </div>
  );
} 
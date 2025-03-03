'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useMainData } from '../hooks/useMainData';
import SkeletonLoading from './SkeletonLoading';

export default function BannerClient() {
  const { data, isLoading, isError } = useMainData();
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = data?.banners || [];

  // 자동 슬라이드 효과
  useEffect(() => {
    if (banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  // 배너 클릭 처리
  const handleBannerChange = (index: number) => {
    setCurrentBanner(index);
  };

  if (isLoading) return <SkeletonLoading type="banner" />;
  if (isError || !banners.length) return null;

  return (
    <div className="relative overflow-hidden rounded-md">
      <div className="relative h-40 md:h-60">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentBanner ? 'opacity-100 z-10' : 'opacity-0 z-0'
            }`}
          >
            <Link href={banner.link}>
              <Image
                src={banner.imageUrl}
                alt={banner.title}
                fill
                style={{ objectFit: 'cover' }}
                priority={index === 0}
                sizes="(max-width: 768px) 100vw, 1200px"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <h3 className="text-white font-bold text-lg">{banner.title}</h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* 배너 인디케이터 */}
      <div className="absolute bottom-3 left-0 right-0 z-20">
        <div className="flex justify-center gap-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => handleBannerChange(index)}
              className={`w-2 h-2 rounded-full ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`배너 ${index + 1}번으로 이동`}
            />
          ))}
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';

// 더미 이미지 URL
const FALLBACK_IMAGE = "https://placehold.co/600x400/cccccc/808080?text=이미지+없음";

interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc?: string;
}

export default function ImageWithFallback({
  src,
  alt,
  fallbackSrc = FALLBACK_IMAGE,
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState<string>(src);
  
  // 초기 src가 빈 문자열이거나 undefined인 경우 대체 이미지 사용
  useEffect(() => {
    if (!src || src === '') {
      setImgSrc(fallbackSrc);
    } else {
      setImgSrc(src);
    }
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc}
      alt={alt || '이미지'}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
} 
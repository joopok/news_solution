'use client';

import Image from 'next/image';
import { NewsCardProps } from '../types/types';

export default function NewsCard({ news }: NewsCardProps) {
  return (
    <div className="news-card">
      <div className="relative h-40 w-full">
        <Image
          src="https://placehold.co/400x200/009688/white?text=뉴스+이미지"
          alt={news.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="news-card-content">
        <div className="news-card-title">{news.title}</div>
        <div className="news-card-summary">{news.summary}</div>
        <div className="text-xs text-gray-500 mt-2">
          {news.category} | {news.date}
        </div>
      </div>
    </div>
  );
}

export function SmallNewsCard({ news }: NewsCardProps) {
  return (
    <div className="flex border-b pb-4">
      <div className="relative h-24 w-24 shrink-0">
        <Image
          src={`https://placehold.co/200x200/009688/white?text=${news.category}`}
          alt={news.title}
          fill
          sizes="(max-width: 768px) 96px, 96px"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div className="ml-4">
        <div className="font-bold">{news.title}</div>
        <div className="text-sm text-gray-600 mt-1">{news.summary}</div>
        <div className="text-xs text-gray-500 mt-2">{news.date}</div>
      </div>
    </div>
  );
} 
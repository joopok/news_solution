# API 클라이언트 사용 가이드

이 디렉토리는 백엔드 API와의 통신을 위한 API 클라이언트를 포함하고 있습니다.

## 환경 설정

다음 환경 파일들이 프로젝트 루트 디렉토리에 있어야 합니다:

- `.env`: 공통 환경 변수
- `.env.development`: 개발 환경 변수
- `.env.test`: 테스트 환경 변수
- `.env.production`: 운영 환경 변수

## 주요 파일

- `apiClient.ts`: axios 기반 API 클라이언트 설정
- `newsService.ts`: 뉴스 관련 API 엔드포인트
- `index.ts`: 모든 API 서비스를 내보내는 파일

## 사용 예시

### 컴포넌트에서 API 호출하기

```tsx
'use client';

import { useEffect, useState } from 'react';
import { newsService } from '../api';
import { NewsItem } from '../types/types';

export default function LatestNews() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await newsService.getLatestNews({ limit: 5 });
        
        if (response.success && response.data) {
          setNews(response.data);
        } else {
          setError('뉴스를 불러오는데 실패했습니다.');
        }
      } catch (err) {
        setError('서버 연결에 실패했습니다.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;

  return (
    <div>
      <h2>최신 뉴스</h2>
      <ul>
        {news.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
```

### 서버 컴포넌트에서 API 호출하기

Next.js 서버 컴포넌트에서 API를 호출할 때는 다음과 같이 직접 백엔드 API를 호출하는 것을 권장합니다:

```tsx
import { NewsItem } from '../types/types';

async function getLatestNews(): Promise<NewsItem[]> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/news/latest?limit=5`, {
    next: { revalidate: 60 } // 60초마다 재검증
  });
  
  if (!res.ok) {
    throw new Error('Failed to fetch news');
  }
  
  const data = await res.json();
  return data.data;
}

export default async function LatestNewsServer() {
  const news = await getLatestNews();
  
  return (
    <div>
      <h2>최신 뉴스</h2>
      <ul>
        {news.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  );
}
``` 
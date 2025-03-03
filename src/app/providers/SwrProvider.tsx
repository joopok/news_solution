'use client';

import { SWRConfig } from 'swr';
import { ReactNode } from 'react';

interface SwrProviderProps {
  children: ReactNode;
}

export default function SwrProvider({ children }: SwrProviderProps) {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) => fetch(url).then(res => res.json()),
        revalidateOnFocus: false,
        revalidateOnReconnect: true,
        dedupingInterval: 60000, // 1분 동안 동일 요청 중복 방지
        errorRetryCount: 2,
      }}
    >
      {children}
    </SWRConfig>
  );
} 
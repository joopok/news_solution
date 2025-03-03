'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { MainDataResponse } from './useMainData';

async function fetchMainData(): Promise<MainDataResponse> {
  const response = await axios.get('/api/main-data');
  return response.data;
}

export function useMainDataQuery() {
  return useQuery({
    queryKey: ['mainData'],
    queryFn: fetchMainData,
    staleTime: 5 * 60 * 1000, // 5분 동안 신선한 상태로 유지
    refetchOnWindowFocus: false,
  });
} 
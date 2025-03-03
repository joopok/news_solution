'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

// 메뉴 인터페이스 정의
export interface MenuItem {
  id: string | number;
  title: string;
  url: string;
  submenu?: MenuItem[];
}

export interface MenuData {
  mainMenus: MenuItem[];
  utilityMenus: MenuItem[];
  footerMenus: MenuItem[];
}

// JSON 파일에서 받는 메뉴 아이템 타입 (재사용)
interface JsonMenuItem {
  id: number;
  name: string;
  url: string;
  submenu?: JsonMenuItem[];
}

interface MenuResponse {
  success: boolean;
  data: {
    mainMenus: JsonMenuItem[];
    utilityMenus: JsonMenuItem[];
    footerMenus: JsonMenuItem[];
  };
  error?: string;
}

/**
 * 메뉴 데이터를 가져오는 훅
 * @returns 메인 메뉴, 푸터 메뉴, 유틸리티 메뉴를 포함한 메뉴 데이터와 로딩/에러 상태
 */
export default function useMenuData() {
  const [menus, setMenus] = useState<MenuData>({
    mainMenus: [],
    utilityMenus: [],
    footerMenus: []
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchMenus = async () => {
      try {
        const response = await axios.get<MenuResponse>('/api/menus');
        
        if (!response.data.success) {
          throw new Error(response.data.error || '메뉴 데이터를 불러오는데 실패했습니다');
        }
        
        const data = response.data.data;
        
        // JSON 필드명 변환 (name → title)
        const formattedData = {
          mainMenus: data.mainMenus.map((menu: JsonMenuItem) => ({
            id: menu.id,
            title: menu.name,
            url: menu.url,
            submenu: menu.submenu ? menu.submenu.map((sub: JsonMenuItem) => ({
              id: sub.id,
              title: sub.name,
              url: sub.url
            })) : undefined
          })),
          utilityMenus: data.utilityMenus.map((menu: JsonMenuItem) => ({
            id: menu.id,
            title: menu.name,
            url: menu.url
          })),
          footerMenus: data.footerMenus.map((menu: JsonMenuItem) => ({
            id: menu.id,
            title: menu.name,
            url: menu.url
          }))
        };
        
        setMenus(formattedData);
        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('메뉴 데이터를 불러오는데 실패했습니다'));
        setIsLoading(false);
      }
    };

    fetchMenus();
  }, []);

  return { menus, isLoading, error };
} 
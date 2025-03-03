import api from '../apiService';
import { MenuItem } from '@/app/hooks/useMenuData';

/**
 * 메뉴 데이터 응답 인터페이스
 */
export interface MenuDataResponse {
  mainMenus: MenuItem[];
  footerMenus: MenuItem[];
  utilityMenus: MenuItem[];
}

/**
 * 메뉴 관련 API 서비스
 */
const menuService = {
  /**
   * 모든 메뉴 데이터 가져오기
   * @returns 메인 메뉴, 푸터 메뉴, 유틸리티 메뉴를 포함한 전체 메뉴 데이터
   */
  getAllMenus: async () => {
    return await api.get<MenuDataResponse>('/menus');
  },
  
  /**
   * 메인 메뉴 가져오기
   * @returns 메인 메뉴 데이터
   */
  getMainMenus: async () => {
    return await api.get<{ items: MenuItem[] }>('/menus/main');
  },
  
  /**
   * 푸터 메뉴 가져오기
   * @returns 푸터 메뉴 데이터
   */
  getFooterMenus: async () => {
    return await api.get<{ items: MenuItem[] }>('/menus/footer');
  },
  
  /**
   * 유틸리티 메뉴 가져오기
   * @returns 유틸리티 메뉴 데이터
   */
  getUtilityMenus: async () => {
    return await api.get<{ items: MenuItem[] }>('/menus/utility');
  }
};

export default menuService; 
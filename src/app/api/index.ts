/**
 * API 서비스 모듈
 */
import api from './apiService';
import type { ApiResponse } from './apiService';

// 도메인별 서비스 
import authService from './services/authService';
import newsService from './services/newsService';
import menuService from './services/menuService';

export { api, authService, newsService, menuService };
export type { ApiResponse };

export default api; 
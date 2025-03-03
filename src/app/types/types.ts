import { ImageProps } from 'next/image';
import { ReactNode } from 'react';

// 뉴스 관련 인터페이스
export interface NewsItem {
  id: number;
  title: string;
  summary?: string;
  category?: string;
  image?: string;
  date: string;
  views?: number;
  reporter?: string;
  section?: string;
  link?: string;
  thumbnail?: string;
  isPremium?: boolean;
  hot?: boolean;
}

// 공지사항 관련 인터페이스
export interface NoticeItem {
  id: number;
  title: string;
  content: string;
  date: string;
  views: number;
}

// 뉴스 검색 섹션 타입 정의
export interface Section {
  id: string;
  label: string;
  count: number;
}

// 뉴스 상세 데이터 타입
export interface NewsDetail {
  id: number;
  title: string;
  content: string;
  category: string;
  section: string;
  date: string;
  author: string;
  views: number;
  likes: number;
  comments: number;
  image?: string;
  tags: string[];
  isPremium?: boolean;
  relatedNews: {
    id: number;
    title: string;
    link: string;
  }[];
}

// 슬라이드 아이템 타입
export interface SlideItem {
  id: number;
  title: string;
  summary?: string;
  image: string;
  category: string;
  link: string;
}

// 사이트맵 데이터 구조
export interface SitemapItem {
  title: string;
  url: string;
  description?: string;
  children?: SitemapItem[];
}

// 헤드라인 아이템 타입
export interface HeadlineItem {
  id: number;
  title: string;
  summary?: string;
  category: string;
  image?: string;
  date: string;
  views?: number;
  reporter?: string;
}

// 아이콘 관련 타입 및 인터페이스
export type IconName = 
  | 'chart'
  | 'users'
  | 'tasks'
  | 'calendar'
  | 'money'
  | 'trending-up'
  | 'trending-down'
  | 'upload'
  | 'folder-plus'
  | 'eye'
  | 'download'
  | 'trash'
  | 'search'
  | 'edit'
  | 'share'
  | 'more-vertical'
  | 'chevron-left'
  | 'chevron-right'
  | 'chevrons-left'
  | 'chevrons-right'
  | 'close'
  | 'check'
  | 'zoom-in'
  | 'zoom-out'
  | 'x'
  | 'plus'
  | 'minus'
  | 'settings'
  | 'bell'
  | 'arrow-up'
  | 'arrow-down';

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

// 컴포넌트 Props 인터페이스
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  maxVisiblePages?: number;
}

export interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
  centerAlign?: boolean;
}

export interface BackLinkProps {
  href: string;
  label?: string;
  className?: string;
}

export interface CustomLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}

export interface AccordionItemProps {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}

export interface AccordionProps {
  items: {
    title: string;
    content: ReactNode;
  }[];
  defaultOpenIndex?: number;
}

export interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export interface ImageWithFallbackProps extends Omit<ImageProps, 'src'> {
  src: string;
  fallbackSrc: string;
}

export interface TabItem {
  id: string;
  label: string;
}

export interface TabNavProps {
  tabs: TabItem[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  className?: string;
}

// 레이아웃 관련 인터페이스
export interface MainContentProps {
  children: ReactNode;
}

export interface NewsSectionProps {
  category: string;
  title: string;
  date: string;
}

export interface ArticlePreviewProps {
  title: string;
  author: string;
  date: string;
}

export interface ViewCountProps {
  count: string;
}

export interface TabItemProps {
  text: string;
  isActive?: boolean;
}

export interface NewsCardProps {
  news: NewsItem;
}

export interface ContentsProps {
  children: ReactNode;
}

export interface WeatherData {
  location: string;
  temperature: number;
  description: string;
  icon: ReactNode;
  precipitation?: number;
  wind?: number;
}

// 뉴스그리드 Props
export interface NewsGridProps {
  category: string;
  limit?: number;
  news?: NewsItem[];
  loading?: boolean;
  emptyMessage?: string;
}

// 상위 헤드라인 Props
export interface TopHeadlinesProps {
  headlines?: NewsItem[];
}

// 메인 슬라이더 Props
export interface MainSliderProps {
  slides?: Slide[];
}

// 인기 뉴스 Props
export interface TrendingNewsProps {
  news?: NewsItem[];
}

// 베스트 클릭 뉴스 Props
export interface BestClickNewsProps {
  news?: NewsItem[];
  period?: 'day' | 'week' | 'month';
}

// 컨텍스트 관련 인터페이스
export interface LoadingContextType {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
}

// 페이지 Props 인터페이스
export interface PoliticsDetailPageProps {
  params: {
    id: string;
  };
}

export interface AdBannerByIdProps {
  id: string;
  className?: string;
}

export type AdBannerProps = {
  type: 'horizontal' | 'square';
  link?: string;
  imageSrc?: string;
};

// 슬라이드 타입
export interface Slide {
  id: string | number;
  title: string;
  summary?: string;
  image: string;
  category?: string;
  link?: string;
}

// 스켈레톤 로딩 Props
export interface SkeletonLoadingProps {
  type?: 'banner' | 'news' | 'trending' | 'content' | 'grid' | 'carousel' | 'card' | 'profile';
  count?: number;
  rows?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
  message?: string;
  showMessage?: boolean;
}
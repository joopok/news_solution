'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaUser, FaUserPlus, FaUserCircle, FaHeadset, FaCloudSun, FaChartLine, FaDollarSign, FaSitemap, FaBars, FaTemperatureHigh, FaSignOutAlt } from 'react-icons/fa';
import useMenuData, { MenuItem } from '@/app/hooks/useMenuData';
import CustomLink from '../components/CustomLink';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { WeatherData } from '../types/types';
import { useAppSelector, useAppDispatch } from '../redux/store';
import { logout } from '../redux/features/authSlice';

// 유틸리티 메뉴 아이콘 매핑
const utilityIcons: Record<string, React.ReactElement> = {
  '로그인': <FaUser className="mr-1" />,
  '회원가입': <FaUserPlus className="mr-1" />,
  '고객센터': <FaHeadset className="mr-1" />
};

// 기본 유틸리티 메뉴 - API 호출 실패 시 사용
const defaultUtilityMenus: MenuItem[] = [
  { id: '1', title: '로그인', url: '/member/login' },
  { id: '2', title: '회원가입', url: '/member/register' },
  { id: '3', title: '고객센터', url: '/customer' }
];

const Header: React.FC = () => {
  const { menus, error } = useMenuData();
  const [searchQuery, setSearchQuery] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // 인증 상태 가져오기
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  
  // 로그인 정보 콘솔에 출력
  useEffect(() => {
    console.log('로그인 상태:', isAuthenticated);
    console.log('사용자 정보:', JSON.stringify(user));
    if (user) {
      console.log('사용자 ID:', user.id);
      console.log('사용자 이름:', user.name);
      console.log('사용자 이메일:', user.email);
      console.log('사용자 역할:', user.role);
      console.log('사용자 부서:', user.department);
      console.log('사용자 직책:', user.position);
    }
    console.log('액세스 토큰 존재 여부:', !!user?.accessToken);
  }, [isAuthenticated, user]);
  
  // 로그인 상태에 따라 유틸리티 메뉴 필터링
  const getUtilityMenus = () => {
    const baseMenus = error ? defaultUtilityMenus : 
                   (menus.utilityMenus.length > 0 ? menus.utilityMenus : defaultUtilityMenus);
    
    // 로그인 상태라면 로그인/회원가입 메뉴를 숨김
    if (isAuthenticated) {
      return baseMenus.filter((menu: MenuItem) => 
        menu.title !== '로그인' && menu.title !== '회원가입'
      );
    }
    
    return baseMenus;
  };
  
  const utilityMenus = getUtilityMenus();
  
  // 날씨 데이터 상태
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);
  const [currentWeatherIndex, setCurrentWeatherIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  
  // 날씨 API 호출
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setIsLoading(true);
        
        // API 호출 대신 샘플 데이터 사용 (실제 구현 시 API 호출로 변경)
        // 여러 지역 데이터 샘플
        const sampleData = [
          {
            location: '서울',
            temperature: 20.5,
            description: '맑음',
            icon: <FaCloudSun />,
            precipitation: 0,
            wind: 2.5
          },
          {
            location: '부산',
            temperature: 22.3,
            description: '구름 조금',
            icon: <FaCloudSun />,
            precipitation: 10,
            wind: 3.2
          },
          {
            location: '제주',
            temperature: 23.8,
            description: '비',
            icon: <FaCloudSun />,
            precipitation: 60,
            wind: 5.1
          },
          {
            location: '대구',
            temperature: 25.2,
            description: '맑음',
            icon: <FaTemperatureHigh />,
            precipitation: 0,
            wind: 1.8
          }
        ];
        
        setWeatherData(sampleData);
        setIsLoading(false);
      } catch (error) {
        console.error('날씨 데이터를 가져오는 중 오류 발생:', error);
        setIsLoading(false);
      }
    };
    
    fetchWeatherData();
  }, []);
  
  // 날씨 롤링 효과
  useEffect(() => {
    if (weatherData.length === 0) return;
    
    const intervalId = setInterval(() => {
      setCurrentWeatherIndex((prevIndex) => 
        prevIndex === weatherData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 5초마다 변경
    
    return () => clearInterval(intervalId);
  }, [weatherData]);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // 검색 결과 페이지로 이동
      router.push(`/news/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  // 로그아웃 처리
  const handleLogout = async () => {
    try {
      await dispatch(logout()).unwrap();
      router.push('/');
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  // 현재 표시할 날씨 데이터
  const currentWeather = weatherData[currentWeatherIndex];

  // 날씨 렌더링 함수
  const renderWeather = () => {
    if (isLoading) {
      return (
        <span className="flex items-center">
          <FaCloudSun className="mr-1" />
          <span>날씨 로딩 중...</span>
        </span>
      );
    }

    if (!currentWeather) {
      return (
        <span className="flex items-center">
          <FaCloudSun className="mr-1" />
          <span>날씨 정보 없음</span>
        </span>
      );
    }

    return (
      <span className="flex items-center whitespace-nowrap">
        {currentWeather.icon}
        <span className="ml-1">
          {currentWeather.location} {currentWeather.temperature.toFixed(1)}°C
        </span>
      </span>
    );
  };

  return (
    <header className="w-full">
      {/* 상단 유틸리티 메뉴 */}
      <div className="bg-gray-100 border-b border-gray-200 hidden sm:block" style={{ height: '40px' }}>
        <div className="container mx-auto px-4 py-0">
          <div className="flex justify-between items-center h-[40px] text-xs text-gray-600">
            <div className="flex space-x-4">
              {/* 로그인 상태에 따른 메뉴 표시 */}
              {isAuthenticated ? (
                // 로그인 상태일 때
                <>
                  <span className="flex items-center h-[40px] text-blue-600 font-semibold">
                    <FaUserCircle className="mr-1" />
                    {user?.name || user?.username || user?.email || '사용자'} 님 환영합니다! {user?.department && `(${user?.department}${user?.position ? ` ${user?.position}` : ''})`}
                  </span>
                  <span className="flex items-center h-[40px]">|</span>
                  <CustomLink href="/member/mypage" className="hover:text-blue-600 h-[40px] flex items-center px-1">
                    <FaUserCircle className="mr-1" />
                    마이페이지
                  </CustomLink>
                  <span className="flex items-center h-[40px]">|</span>
                  <button
                    onClick={handleLogout}
                    className="hover:text-blue-600 h-[40px] flex items-center px-1 cursor-pointer"
                  >
                    <FaSignOutAlt className="mr-1" />
                    로그아웃
                  </button>
                </>
              ) : (
                // 로그아웃 상태일 때
                <>
                  {/* JSON에서 가져온 유틸리티 메뉴 */}
                  {utilityMenus.map((item, index) => (
                    <React.Fragment key={item.id}>
                      <CustomLink href={item.url} className="hover:text-blue-600 h-[40px] flex items-center px-1">
                        {utilityIcons[item.title] || <FaUser className="mr-1" />}
                        {item.title}
                      </CustomLink>
                      {index < utilityMenus.length - 1 && (
                        <span className="flex items-center h-[40px]">|</span>
                      )}
                    </React.Fragment>
                  ))}
                  {utilityMenus.length > 0 && (
                    <span className="flex items-center h-[40px]">|</span>
                  )}
                  <CustomLink href="/member/mypage" className="hover:text-blue-600 h-[40px] flex items-center px-1">
                    <FaUserCircle className="mr-1" />
                    마이페이지
                  </CustomLink>
                </>
              )}
            </div>
            <div className="flex space-x-4">
              <CustomLink href="/weather" className="hover:text-blue-600 h-[40px] flex items-center px-1">
                {renderWeather()}
              </CustomLink>
              <span className="flex items-center h-[40px]">|</span>
              <CustomLink href="/stock" className="hover:text-blue-600 h-[40px] flex items-center px-1">
                <FaChartLine className="mr-1" />
                코스피 2, 450.25
              </CustomLink>
              <span className="flex items-center h-[40px]">|</span>
              <CustomLink href="/exchange" className="hover:text-blue-600 h-[40px] flex items-center px-1">
                <FaDollarSign className="mr-1" />
                원 / 달러 1, 350.50
              </CustomLink>
              <span className="flex items-center h-[40px]">|</span>
              <CustomLink href="/sitemap" className="hover:text-blue-600 h-[40px] flex items-center px-1">
                <FaSitemap className="mr-1" />
                사이트맵
              </CustomLink>
            </div>
          </div>
        </div>
      </div>

      {/* 메인 헤더 */}
      <div className="bg-white py-5 border-b border-gray-200" style={{ height: '140px' }}>
        <div className="container mx-auto px-4 flex justify-between items-center h-full">
          <div className="flex items-center">
            <button
              className="menu-toggle mr-4 text-gray-600 focus:outline-none md:hidden"
              onClick={toggleMobileMenu}
            >
              <FaBars className="h-6 w-6" />
            </button>
            <CustomLink href="/" className="mr-4 md:mr-8">
              <div className="relative w-40 md:w-52 h-12 md:h-14">
                <Image
                  src="https://placehold.co/200x50/0066cc/white?text=해피뉴스"
                  alt="해피뉴스 로고"
                  fill
                  sizes="(max-width: 768px) 160px, 208px"
                  className="object-contain"
                  priority
                />
              </div>
            </CustomLink>
            <div className="text-sm md:text-base text-gray-500 hidden sm:block">2025년 2월 24일 일요일</div>
          </div>
          <div className="flex-1 max-w-md hidden md:block ml-4">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                placeholder="뉴스 검색"
                className="flex-1 border border-gray-300 rounded-l-md px-4 py-3 focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                type="submit"
                className="bg-blue-600 text-white rounded-r-md px-4 flex items-center hover:bg-blue-700 transition"
              >
                <FaSearch className="mr-2" />
                검색
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* 모바일 검색 */}
      <div className="md:hidden bg-white border-b border-gray-200 py-2 px-4">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            placeholder="뉴스 검색"
            className="flex-1 border border-gray-300 rounded-l-md px-3 py-2 focus:outline-none"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-r-md px-3 py-2 flex items-center justify-center"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {/* 모바일 메뉴 */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-100 border-b border-gray-200">
          <div className="container mx-auto py-2 px-4">
            <ul className="space-y-2">
              {/* 로그인 상태에 따른 메뉴 표시 (모바일) */}
              {isAuthenticated ? (
                // 로그인 상태일 때
                <>
                  <li className="py-2 text-blue-600 font-semibold flex items-center">
                    <FaUserCircle className="mr-2" />
                    {user?.name || user?.username || '사용자'} 님
                  </li>
                  <li>
                    <CustomLink href="/member/mypage" className="flex items-center py-2 text-gray-700">
                      <FaUserCircle className="mr-2" />
                      마이페이지
                    </CustomLink>
                  </li>
                  <li>
                    <button
                      onClick={handleLogout}
                      className="flex items-center py-2 text-gray-700 w-full text-left"
                    >
                      <FaSignOutAlt className="mr-2" />
                      로그아웃
                    </button>
                  </li>
                </>
              ) : (
                // 로그아웃 상태일 때
                <>
                  {utilityMenus.map((item) => (
                    <li key={item.id}>
                      <CustomLink href={item.url} className="flex items-center py-2 text-gray-700">
                        {utilityIcons[item.title] || <FaUser className="mr-2" />}
                        {item.title}
                      </CustomLink>
                    </li>
                  ))}
                  <li>
                    <CustomLink href="/member/mypage" className="flex items-center py-2 text-gray-700">
                      <FaUserCircle className="mr-2" />
                      마이페이지
                    </CustomLink>
                  </li>
                </>
              )}
              <li>
                <CustomLink href="/sitemap" className="flex items-center py-2 text-gray-700">
                  <FaSitemap className="mr-2" />
                  사이트맵
                </CustomLink>
              </li>
            </ul>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 
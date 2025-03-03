'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/app/components/ui/button';
import useMenuData from '@/app/hooks/useMenuData';
import SkeletonLoading from '@/app/components/SkeletonLoading';

const Navigation: React.FC = () => {
  const { menus, isLoading, error } = useMenuData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  console.log("WLRDJWNJ - 메뉴 데이터 로드됨:", menus);
  // 콘솔에 메뉴 데이터 로그 출력
  useEffect(() => {
    console.log("WLRDJWNJ - 메뉴 데이터 로드됨:", menus);
  }, [menus]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const renderSkeletonMenuItems = () => {
    return Array(5).fill(0).map((_, index) => (
      <li key={`skeleton-${index}`} className="py-2">
        <SkeletonLoading className="h-8 w-32" type="text" />
      </li>
    ));
  };

  return (
    <nav className="bg-primary text-white py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="font-bold text-xl">
          MyApp
        </Link>

        {/* 모바일 메뉴 토글 버튼 */}
        <Button
          variant="ghost"
          className="lg:hidden text-white"
          onClick={toggleMenu}
          aria-label="메뉴 토글"
        >
          {isMenuOpen ? '✕' : '☰'}
        </Button>

        {/* 데스크톱 메뉴 */}
        <div className="hidden lg:flex items-center space-x-6">
          {isLoading ? (
            <ul className="flex space-x-6">
              {renderSkeletonMenuItems()}
            </ul>
          ) : error ? (
            <div className="text-red-300">메뉴를 불러오는데 실패했습니다</div>
          ) : (
            <ul className="flex space-x-6">
              {menus.mainMenus.map((item) => (
                <li key={item.id} className="relative group">
                  <Link 
                    href={item.url} 
                    className="hover:text-secondary transition-colors py-2 block"
                  >
                    {item.title}
                  </Link>
                  
                  {/* 서브메뉴 */}
                  {item.submenu && item.submenu.length > 0 && (
                    <div className="absolute left-0 mt-1 w-48 bg-white text-gray-800 rounded-md shadow-lg py-2 z-10 hidden group-hover:block">
                      {item.submenu.map((subitem) => (
                        <Link 
                          key={subitem.id}
                          href={subitem.url}
                          className="block px-4 py-2 hover:bg-gray-100 transition-colors"
                        >
                          {subitem.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>
          )}
          
          {/* 유틸리티 메뉴 */}
          {!isLoading && !error && (
            <div className="ml-6 flex space-x-2">
              {menus.utilityMenus.map((item) => (
                <Button key={item.id} variant="outline" size="sm" asChild>
                  <Link href={item.url}>{item.title}</Link>
                </Button>
              ))}
            </div>
          )}
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-16 left-0 right-0 bg-primary p-4 z-50">
            {isLoading ? (
              <ul className="space-y-3">
                {renderSkeletonMenuItems()}
              </ul>
            ) : error ? (
              <div className="text-red-300">메뉴를 불러오는데 실패했습니다</div>
            ) : (
              <>
                <ul className="space-y-1">
                  {menus.mainMenus.map((item) => (
                    <li key={item.id} className="py-1">
                      <Link 
                        href={item.url} 
                        className="block py-2 hover:text-secondary transition-colors font-medium"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                      
                      {/* 모바일 서브메뉴 */}
                      {item.submenu && item.submenu.length > 0 && (
                        <ul className="pl-4 space-y-1 border-l border-white/20 mt-1">
                          {item.submenu.map((subitem) => (
                            <li key={subitem.id}>
                              <Link 
                                href={subitem.url}
                                className="block py-1 hover:text-secondary transition-colors text-white/80"
                                onClick={() => setIsMenuOpen(false)}
                              >
                                {subitem.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
                
                {/* 모바일 유틸리티 메뉴 */}
                {menus.utilityMenus.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/20 grid grid-cols-2 gap-2">
                    {menus.utilityMenus.map((item) => (
                      <Button 
                        key={item.id} 
                        variant="outline" 
                        size="sm" 
                        className="w-full justify-center"
                        asChild
                      >
                        <Link href={item.url}>{item.title}</Link>
                      </Button>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
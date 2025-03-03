'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import useMenuData from '@/app/hooks/useMenuData';
import SkeletonLoading from '@/app/components/SkeletonLoading';

const Navigation: React.FC = () => {
  const { menus, isLoading, error } = useMenuData();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<number | null>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuHover = (id: number | string) => {
    setActiveMenu(Number(id));
  };

  const renderSkeletonMenuItems = () => {
    return Array(5).fill(0).map((_, index) => (
      <li key={`skeleton-${index}`} className="py-2">
        <SkeletonLoading type="content" className="h-8 w-32" />
      </li>
    ));
  };

  // 서브메뉴 아이템 렌더링
  const renderSubMenuItems = () => {
    if (!menus.mainMenus || menus.mainMenus.length === 0 || activeMenu === null) {
      return null;
    }

    const activeItem = menus.mainMenus.find(item => Number(item.id) === activeMenu);
    if (!activeItem || !activeItem.submenu || activeItem.submenu.length === 0) {
      return null;
    }

    return (
      <ul className="flex space-x-6 py-2">
        {activeItem.submenu.map((subitem) => (
          <li key={subitem.id}>
            <Link
              href={subitem.url}
              className="text-white hover:text-gray-200 transition-colors font-medium"
            >
              {subitem.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <>
      <nav className="bg-primary text-white py-3">
        <div className="container mx-auto px-4 flex justify-start items-center">
          <Link href="/" className="font-bold text-xl text-[#000000]">
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              전체
            </span>
          </Link>

          {/* 데스크톱 메뉴 */}
          <div className="hidden lg:flex items-center space-x-6 justify-start ml-20">
            {isLoading ? (
              <ul className="flex space-x-6">
                {renderSkeletonMenuItems()}
              </ul>
            ) : error ? (
              <div className="text-red-300">메뉴를 불러오는데 실패했습니다</div>
            ) : (
              <ul className="flex space-x-6 h-[40px] ml-0">
                {menus.mainMenus.map((item) => (
                  <li 
                    key={item.id} 
                    className="min-w-[100px] flex items-center h-full justify-center"
                    onMouseEnter={() => handleMenuHover(item.id)}
                  >
                    <Link 
                      href={item.url} 
                      className={`text-[#000000] hover:text-secondary hover:bg-gray-200 transition-colors font-extrabold font-[800] flex items-center h-[80px] block relative group min-w-[100px] justify-center text-center ${Number(item.id) === activeMenu ? 'border-b-2 border-[#28a69c]' : ''}`}
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
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
                  <ul className="space-y-3">
                    {menus.mainMenus.map((item) => (
                      <li key={item.id}>
                        <Link 
                          href={item.url} 
                          className="block py-2 text-[#000000] hover:text-secondary transition-colors font-extrabold font-[800]"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                        {/* 모바일 서브메뉴 */}
                        {item.submenu && item.submenu.length > 0 && (
                          <ul className="pl-4 space-y-1 border-l border-[#28a69c] mt-1">
                            {item.submenu.map((subitem) => (
                              <li key={subitem.id}>
                                <Link 
                                  href={subitem.url}
                                  className="block py-1 text-[#000000] hover:text-secondary transition-colors"
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
                </>
              )}
            </div>
          )}
        </div>
      </nav>
      
      {/* 서브 메뉴 영역 */}
      {!isLoading && !error && (
        <div className="bg-[#28a69c] text-white py-1 hidden lg:block h-[60px] flex items-center">
          <div className="container mx-auto px-4">
            {activeMenu === null && menus.mainMenus && menus.mainMenus.length > 0 ? (
              (() => {
                // 첫 번째 메뉴 아이템의 서브메뉴 렌더링
                const firstItem = menus.mainMenus[0];
                if (firstItem && firstItem.submenu && firstItem.submenu.length > 0) {
                  return (
                    <ul className="flex space-x-6 py-2">
                      {firstItem.submenu.map((subitem) => (
                        <li key={subitem.id}>
                          <Link
                            href={subitem.url}
                            className="text-white hover:text-gray-200 transition-colors font-medium"
                          >
                            {subitem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  );
                }
                return null;
              })()
            ) : (
              renderSubMenuItems()
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
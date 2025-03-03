'use client';

import React from 'react';
import { FaBuilding, FaHandshake, FaUsers, FaHeadset, FaQuestion, FaFileAlt, FaLock, FaUser, FaMapMarkerAlt, FaIdCard, FaPhone } from 'react-icons/fa';
import CustomLink from '../components/CustomLink';
import useMenuData, { MenuItem } from '../hooks/useMenuData';

// 메뉴 항목별 아이콘 매핑
const menuIcons: Record<string, React.ReactElement> = {
  '회사소개': <FaBuilding className="mr-2 text-sm" />,
  '이용약관': <FaFileAlt className="mr-2 text-sm" />,
  '개인정보처리방침': <FaLock className="mr-2 text-sm" />,
  '광고/제휴': <FaHandshake className="mr-2 text-sm" />,
  '고객센터': <FaHeadset className="mr-2 text-sm" />
};

// 기본 푸터 메뉴 - API 호출 실패 시 사용
const defaultFooterMenus: MenuItem[] = [
  { id: '1', title: '회사소개', url: '/about' },
  { id: '2', title: '이용약관', url: '/terms' },
  { id: '3', title: '개인정보처리방침', url: '/privacy' },
  { id: '4', title: '광고/제휴', url: '/advertise' },
  { id: '5', title: '고객센터', url: '/customer' }
];

export default function Footer() {
  // JSON 파일에서 메뉴 데이터 가져오기
  const { menus, error } = useMenuData();

  // API 호출에 실패하면 기본 메뉴를 사용
  const footerMenus = error || !menus.footerMenus ? defaultFooterMenus : 
                     (menus.footerMenus.length > 0 ? menus.footerMenus : defaultFooterMenus);

  return (
    <footer className="bg-gray-800 text-white py-8 mt-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaBuilding className="mr-2" />
              회사 소개
            </h3>
            <ul className="space-y-2">
              {/* JSON 파일에서 가져온 푸터 메뉴 */}
              {footerMenus.slice(0, 2).map((item) => (
                <li key={item.id}>
                  <CustomLink href={item.url} className="hover:text-blue-400 flex items-center">
                    {menuIcons[item.title] || <FaBuilding className="mr-2 text-sm" />}
                    {item.title}
                  </CustomLink>
                </li>
              ))}
              <li>
                <CustomLink href="/partnership" className="hover:text-blue-400 flex items-center">
                  <FaHandshake className="mr-2 text-sm" />
                  제휴문의
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/careers" className="hover:text-blue-400 flex items-center">
                  <FaUsers className="mr-2 text-sm" />
                  인재채용
                </CustomLink>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaHeadset className="mr-2" />
              고객센터
            </h3>
            <ul className="space-y-2">
              <li>
                <CustomLink href="/inquiry" className="hover:text-blue-400 flex items-center">
                  <FaHeadset className="mr-2 text-sm" />
                  고객문의
                </CustomLink>
              </li>
              <li>
                <CustomLink href="/faq" className="hover:text-blue-400 flex items-center">
                  <FaQuestion className="mr-2 text-sm" />
                  FAQ
                </CustomLink>
              </li>
              {/* JSON 파일에서 가져온 나머지 푸터 메뉴 */}
              {footerMenus.slice(2).map((item) => (
                <li key={item.id}>
                  <CustomLink href={item.url} className="hover:text-blue-400 flex items-center">
                    {menuIcons[item.title] || <FaFileAlt className="mr-2 text-sm" />}
                    {item.title}
                  </CustomLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FaIdCard className="mr-2" />
              해피뉴스 정보
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <FaUser className="mr-2 text-sm" />
                대표: 홍길동
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-sm" />
                주소: 서울시 강남구 테헤란로
              </li>
              <li className="flex items-center">
                <FaIdCard className="mr-2 text-sm" />
                사업자등록번호: 123 - 45 - 67890
              </li>
              <li className="flex items-center">
                <FaPhone className="mr-2 text-sm" />
                전화: 1500 - 1234
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          © 2025 해피뉴스.All rights reserved.
        </div>
      </div>
    </footer>
  );
} 
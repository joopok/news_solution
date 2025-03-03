import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Providers from './components/Providers';
import LoadingBar from './components/LoadingBar';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Navigation from './layout/Navigation';
// 폰트 설정
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// 메타데이터 설정
export const metadata: Metadata = {
  title: '뉴스 포털 - 최신 뉴스 및 정보',
  description: '다양한 분야의 최신 뉴스와 정보를 제공하는 뉴스 포털 사이트입니다.',
  keywords: '뉴스, 정치, 경제, 사회, 문화, 스포츠, 국제',
};

/**
 * 루트 레이아웃 컴포넌트
 * 전체 앱의 공통 레이아웃을 정의합니다.
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="flex flex-col min-h-screen bg-gray-50">
        <Providers>
          <LoadingBar />
          <Header />
          <Navigation />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}

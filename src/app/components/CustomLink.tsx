'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLoading } from '../context/LoadingContext';

interface CustomLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function CustomLink({ href, children, className, onClick }: CustomLinkProps) {
  const { setIsLoading } = useLoading();
  const pathname = usePathname();

  const handleClick = () => {
    // 현재 경로와 다른 경우에만 로딩 상태 활성화
    if (href !== pathname && !href.startsWith('#')) {
      setIsLoading(true);
    }
    
    if (onClick) onClick();
  };

  return (
    <Link href={href} className={className} onClick={handleClick}>
      {children}
    </Link>
  );
} 
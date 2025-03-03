'use client';

import React, { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '@/app/redux/store';
import { login, clearError } from '@/app/redux/features/authSlice';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  
  const router = useRouter();
  const dispatch = useAppDispatch();
  
  // Redux 상태 가져오기
  const { loading, error, isAuthenticated} = useAppSelector((state) => state.auth);
  
  // 컴포넌트 마운트 시 저장된 아이디 있으면 로드
  useEffect(() => {
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      setUsername(savedUsername);
      setRememberMe(true);
    }
    
    // 컴포넌트 언마운트 시 에러 상태 초기화
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);
  
  // 인증 상태가 변경되면 메인 페이지로 리다이렉션
  useEffect(() => {
    if (isAuthenticated) {
      setRedirecting(true);
      
      const redirectTimer = setTimeout(() => {
        router.replace('/');
      }, 1500);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [isAuthenticated, router]);
  
  // 폼 제출 핸들러
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!username.trim() || !password.trim()) {
      return;
    }
    
    try {
      // 로그인 액션 디스패치
      await dispatch(login({ username, password })).unwrap();
      
    } catch (err) {
      // 에러는 Redux 상태에서 처리됨
      console.error('로그인 실패:', err);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-10">
      {redirecting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <FaSpinner className="animate-spin text-blue-600 text-4xl mx-auto mb-4" />
            <h2 className="text-xl font-bold text-gray-800 mb-2">로그인 성공!</h2>
            <p className="text-gray-600">메인 화면으로 이동중입니다...</p>
          </div>
        </div>
      )}
      
      <div className="w-full max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-blue-600 px-6 py-4">
          <h1 className="text-white text-center text-2xl font-bold">로그인</h1>
        </div>
        
        <div className="p-6">
          {/* 로그인 폼 */}
          <form onSubmit={handleSubmit}>
            {/* 아이디 입력 필드 */}
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-medium mb-2">아이디</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaUser className="text-gray-500" />
                </div>
                <input
                  type="text"
                  id="username"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="아이디를 입력하세요"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={loading || redirecting}
                  required
                />
              </div>
            </div>
            
            {/* 비밀번호 입력 필드 */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 font-medium mb-2">비밀번호</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FaLock className="text-gray-500" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading || redirecting}
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={loading || redirecting}
                >
                  {showPassword ? '숨기기' : '보기'}
                </button>
              </div>
            </div>
            
            {/* 아이디 저장 체크박스 */}
            <div className="mb-6 flex items-center">
              <input
                type="checkbox"
                id="rememberMe"
                className="mr-2"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                disabled={loading || redirecting}
              />
              <label htmlFor="rememberMe" className="text-gray-700">아이디 저장</label>
            </div>
            
            {/* 에러 메시지 */}
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
                {error}
              </div>
            )}
            
            {/* 로그인 버튼 */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-md transition duration-300 flex items-center justify-center"
              disabled={loading || redirecting}
            >
              {loading ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  로그인 중...
                </>
              ) : redirecting ? (
                <>
                  <FaSpinner className="animate-spin mr-2" />
                  이동 중...
                </>
              ) : (
                '로그인'
              )}
            </button>
          </form>
          
          {/* 회원가입 링크 */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">계정이 없으신가요?</span>
            {' '}
            <a href="/member/register" className="text-blue-600 hover:underline">회원가입</a>
          </div>
          
          {/* 아이디/비밀번호 찾기 */}
          <div className="mt-3 text-center">
            <a href="/member/find-account" className="text-gray-600 hover:underline text-sm">아이디/비밀번호 찾기</a>
          </div>
        </div>
      </div>
    </div>
  );
}
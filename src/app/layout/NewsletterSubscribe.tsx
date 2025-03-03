'use client';

import { useState } from 'react';
import { FiMail, FiCheck } from 'react-icons/fi';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // 실제 구현에서는 API 호출 코드가 들어갑니다
      await new Promise(resolve => setTimeout(resolve, 1000)); // 1초 지연 (API 호출 시뮬레이션)
      
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      setError('구독 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 px-4 sm:px-6 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">해피뉴스 뉴스레터 구독하기</h2>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            매일 아침, 가장 중요한 뉴스와 이슈를 이메일로 받아보세요.
            주요 뉴스를 선별하여 간결하게 전달해드립니다.
          </p>
        </div>
        
        <div className="max-w-lg mx-auto">
          {subscribed ? (
            <div className="bg-white bg-opacity-10 p-6 rounded-lg text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-500 mb-4">
                <FiCheck className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">구독 신청이 완료되었습니다!</h3>
              <p className="text-blue-100">
                해피뉴스 뉴스레터를 구독해주셔서 감사합니다. 곧 확인 이메일을 보내드리겠습니다.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-blue-300" />
                </div>
                <input
                  type="email"
                  className="block w-full pl-12 pr-4 py-4 bg-white bg-opacity-10 border border-blue-300 border-opacity-40 rounded-lg placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white focus:border-transparent"
                  placeholder="이메일 주소를 입력하세요"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  aria-label="뉴스레터 구독용 이메일"
                />
              </div>
              
              {error && (
                <div className="text-red-300 text-sm">
                  {error}
                </div>
              )}
              
              <div className="flex items-center">
                <input
                  id="privacy-agree"
                  type="checkbox"
                  required
                  className="h-4 w-4 border-blue-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="privacy-agree" className="ml-2 block text-sm text-blue-100">
                  <span>개인정보 수집 및 이용에 동의합니다. </span>
                  <a href="/privacy" className="underline hover:text-white">개인정보처리방침</a>
                </label>
              </div>
              
              <button
                type="submit"
                className={`w-full py-4 px-6 bg-white text-blue-700 rounded-lg font-semibold transition-colors ${
                  loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-50'
                }`}
                disabled={loading}
              >
                {loading ? '처리 중...' : '뉴스레터 구독하기'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
} 
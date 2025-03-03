'use client';

import { useState, useRef } from 'react';
import PageHeader from '../components/PageHeader';
import { FiSend, FiPhone, FiMail, FiAlertCircle, FiInfo, FiCheckCircle, FiFile, FiX, FiPaperclip } from 'react-icons/fi';

export default function InquiryPage() {
  // 문의 양식 상태
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: '',
    agreePrivacy: false
  });

  // 첨부 파일 상태
  const [files, setFiles] = useState<File[]>([]);
  
  // 파일 입력 참조
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // 제출 상태
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // 입력 변경 핸들러
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // 체크박스 변경 핸들러
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  // 파일 변경 핸들러
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      
      // 파일 크기 제한 (10MB)
      const oversizedFiles = newFiles.filter(file => file.size > 10 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setErrorMessage('10MB를 초과하는 파일은 첨부할 수 없습니다.');
        return;
      }
      
      // 파일 개수 제한 (최대 3개)
      if (files.length + newFiles.length > 3) {
        setErrorMessage('첨부 파일은 최대 3개까지 가능합니다.');
        return;
      }
      
      setFiles(prev => [...prev, ...newFiles]);
      setErrorMessage(null);
      
      // 파일 입력 필드 초기화
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  // 파일 삭제 핸들러
  const handleRemoveFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  // 파일 크기 포맷팅
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  // 양식 제출 핸들러
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // 필수 필드 검증
    if (!formData.name || !formData.email || !formData.inquiryType || !formData.subject || !formData.message) {
      setErrorMessage('필수 항목을 모두 입력해주세요.');
      return;
    }
    
    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('유효한 이메일 주소를 입력해주세요.');
      return;
    }
    
    // 개인정보 동의 검증
    if (!formData.agreePrivacy) {
      setErrorMessage('개인정보 수집 및 이용에 동의해주세요.');
      return;
    }
    
    setErrorMessage(null);
    setIsSubmitting(true);
    
    // 실제로는 서버에 데이터를 전송하는 API 호출이 들어갑니다.
    // 여기서는 간단히 타이머로 처리
    setTimeout(() => {
      console.log('제출된 데이터:', { formData, files });
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  // 문의 유형 옵션
  const inquiryTypes = [
    { value: '', label: '문의 유형 선택', disabled: true },
    { value: 'general', label: '일반 문의' },
    { value: 'article', label: '기사 문의/제보' },
    { value: 'error', label: '오류 신고' },
    { value: 'account', label: '계정 문의' },
    { value: 'payment', label: '결제/환불 문의' },
    { value: 'suggestion', label: '서비스 제안' }
  ];

  // 제출 완료 메시지
  if (isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
        <div className="text-center">
          <div className="bg-green-100 rounded-full p-3 inline-block mb-4">
            <FiCheckCircle className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">문의가 접수되었습니다</h1>
          <p className="text-gray-600 mb-8">
            접수하신 문의 내용은 담당자 검토 후 <b>{formData.email}</b>로 답변드리겠습니다.
            일반적으로 문의 답변은 1~2영업일 내에 이루어집니다.
          </p>
          <a 
            href="/"
            className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            홈으로 이동
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* 헤더 */}
      <PageHeader
        title="고객문의"
        description="궁금한 점이나 건의사항을 남겨주시면 빠르게 답변 드리겠습니다."
        className="mb-8"
      />
      
      {/* 문의 방법 안내 */}
      <div className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-purple-100 rounded-full p-3 inline-block mb-4">
            <FiPhone className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">전화 문의</h3>
          <p className="text-gray-600">02-123-4567</p>
          <p className="text-gray-500 text-sm">월-금 09:00-18:00</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-purple-100 rounded-full p-3 inline-block mb-4">
            <FiMail className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">이메일 문의</h3>
          <p className="text-gray-600">support@happynews.com</p>
          <p className="text-gray-500 text-sm">24시간 접수 가능</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <div className="bg-purple-100 rounded-full p-3 inline-block mb-4">
            <FiInfo className="h-6 w-6 text-purple-600" />
          </div>
          <h3 className="text-lg font-semibold mb-2">FAQ 확인</h3>
          <p className="text-gray-600">자주 묻는 질문 확인하기</p>
          <a href="/faq" className="text-purple-600 text-sm underline">FAQ 바로가기</a>
        </div>
      </div>
      
      {/* 문의 양식 */}
      <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">문의하기</h2>
        
        {/* 오류 메시지 */}
        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-red-700 flex items-start">
            <FiAlertCircle className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
            <p>{errorMessage}</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* 개인 정보 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                이름 <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일 <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                연락처 (선택)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={formData.phone}
                onChange={handleChange}
                placeholder="예: 010-1234-5678"
              />
            </div>
            
            <div>
              <label htmlFor="inquiryType" className="block text-sm font-medium text-gray-700 mb-1">
                문의 유형 <span className="text-red-600">*</span>
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                value={formData.inquiryType}
                onChange={handleChange}
                required
              >
                {inquiryTypes.map(type => (
                  <option key={type.value} value={type.value} disabled={type.disabled}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* 문의 내용 */}
          <div className="mb-6">
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
              제목 <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              문의 내용 <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          
          {/* 파일 첨부 */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              파일 첨부 (선택, 최대 3개, 파일당 10MB 이하)
            </label>
            
            <div className="mb-2">
              <button
                type="button"
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                onClick={() => fileInputRef.current?.click()}
              >
                <FiPaperclip className="mr-2 h-5 w-5" />
                파일 선택
              </button>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                multiple
              />
            </div>
            
            {/* 첨부 파일 목록 */}
            {files.length > 0 && (
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div key={index} className="flex items-center bg-gray-50 p-2 rounded-lg">
                    <FiFile className="h-5 w-5 text-gray-500 mr-2" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                      <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                    </div>
                    <button
                      type="button"
                      className="ml-2 text-gray-400 hover:text-gray-600"
                      onClick={() => handleRemoveFile(index)}
                    >
                      <FiX className="h-5 w-5" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* 개인정보 수집 동의 */}
          <div className="mb-8">
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="agreePrivacy"
                  name="agreePrivacy"
                  type="checkbox"
                  className="h-4 w-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  checked={formData.agreePrivacy}
                  onChange={handleCheckboxChange}
                  required
                />
              </div>
              <label htmlFor="agreePrivacy" className="ml-2 text-sm text-gray-700">
                개인정보 수집 및 이용에 동의합니다. <span className="text-red-600">*</span>
                <a href="/privacy" className="text-purple-600 hover:underline ml-1" target="_blank">
                  (개인정보처리방침)
                </a>
              </label>
            </div>
          </div>
          
          {/* 제출 버튼 */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  제출 중...
                </>
              ) : (
                <>
                  <FiSend className="mr-2 h-5 w-5" />
                  문의 제출하기
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
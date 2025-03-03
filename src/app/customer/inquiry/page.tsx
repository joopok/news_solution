'use client';

import { useState } from 'react';
import CustomLink from '../../components/CustomLink';
import { FiAlertCircle } from 'react-icons/fi';
import PageHeader from '../../components/PageHeader';
import BackLink from '../../components/BackLink';

// 문의 유형 데이터
const inquiryTypes = [
  { id: 'account', label: '계정 문의' },
  { id: 'payment', label: '결제/환불 문의' },
  { id: 'article', label: '기사 관련 문의' },
  { id: 'report', label: '제보하기' },
  { id: 'suggestion', label: '서비스 제안' },
  { id: 'error', label: '오류 신고' },
  { id: 'other', label: '기타 문의' },
];

export default function InquiryPage() {
  const [formData, setFormData] = useState({
    type: '',
    title: '',
    content: '',
    name: '',
    email: '',
    phone: '',
    attachments: [] as File[],
    agreePrivacy: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const target = e.target as HTMLInputElement;
      setFormData({
        ...formData,
        [name]: target.checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    
    // 오류 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      // 이미 4개 이상의 파일이 첨부된 경우
      if (formData.attachments.length + files.length > 4) {
        setErrors({
          ...errors,
          attachments: '파일은 최대 4개까지 첨부 가능합니다.',
        });
        return;
      }
      
      // 파일 크기 체크 (10MB 제한)
      for (let i = 0; i < files.length; i++) {
        if (files[i].size > 10 * 1024 * 1024) {
          setErrors({
            ...errors,
            attachments: '파일 크기는 10MB 이하만 가능합니다.',
          });
          return;
        }
      }
      
      setFormData({
        ...formData,
        attachments: [...formData.attachments, ...Array.from(files)],
      });
      
      // 파일 첨부 성공 시 오류 메시지 초기화
      if (errors.attachments) {
        setErrors({
          ...errors,
          attachments: '',
        });
      }
    }
  };

  const removeFile = (index: number) => {
    const newAttachments = [...formData.attachments];
    newAttachments.splice(index, 1);
    setFormData({
      ...formData,
      attachments: newAttachments,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // 필수 필드 검증
    if (!formData.type) newErrors.type = '문의 유형을 선택해주세요.';
    if (!formData.title) newErrors.title = '제목을 입력해주세요.';
    if (!formData.content) newErrors.content = '내용을 입력해주세요.';
    if (!formData.name) newErrors.name = '이름을 입력해주세요.';
    
    // 이메일 유효성 검사
    if (!formData.email) {
      newErrors.email = '이메일을 입력해주세요.';
    } else {
      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = '유효한 이메일 주소를 입력해주세요.';
      }
    }
    
    // 휴대폰 번호 유효성 검사 (선택 필드지만 입력된 경우에만 검사)
    if (formData.phone) {
      const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
      if (!phoneRegex.test(formData.phone)) {
        newErrors.phone = '올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)';
      }
    }
    
    // 개인정보 수집 동의 체크
    if (!formData.agreePrivacy) {
      newErrors.agreePrivacy = '개인정보 수집 및 이용에 동의해주세요.';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      // 폼 유효성 검사 실패
      return;
    }
    
    setIsSubmitting(true);
    
    // 실제 서버로 데이터 전송하는 로직
    // 여기서는 예시로 타이머 추가
    try {
      await new Promise(resolve => setTimeout(resolve, 1500)); // 서버 요청 시뮬레이션
      setIsSubmitted(true);
      
      // 폼 초기화
      setFormData({
        type: '',
        title: '',
        content: '',
        name: '',
        email: '',
        phone: '',
        attachments: [],
        agreePrivacy: false,
      });
    } catch (error) {
      console.error('문의 제출 실패:', error);
      setErrors({
        ...errors,
        submit: '문의 제출 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 sm:px-6">
      {/* 뒤로가기 링크 */}
      <BackLink href="/customer" label="고객센터로 돌아가기" />
      
      {/* 헤더 */}
      <PageHeader
        title="1:1 문의하기"
        description="궁금하신 점이나 건의사항을 남겨주시면 신속하게 답변해 드리겠습니다."
      />

      {isSubmitted ? (
        /* 문의 제출 완료 메시지 */
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-emerald-100 p-3">
              <svg 
                className="h-6 w-6 text-emerald-600" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">문의가 성공적으로 접수되었습니다.</h2>
          <p className="text-gray-600 mb-6">
            접수하신 문의는 순차적으로 검토 후 답변 드리겠습니다.<br />
            빠른 시일 내에 이메일로 답변 드리겠습니다.
          </p>
          <div className="mt-6">
            <CustomLink
              href="/customer"
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700"
            >
              고객센터로 돌아가기
            </CustomLink>
          </div>
        </div>
      ) : (
        /* 문의 폼 */
        <div className="bg-white rounded-lg shadow-sm p-6">
          {errors.submit && (
            <div className="mb-6 flex items-center p-4 text-red-800 border border-red-300 rounded-lg bg-red-50">
              <FiAlertCircle className="text-red-500 mr-2" />
              <span>{errors.submit}</span>
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                문의 유형 <span className="text-red-500">*</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`block w-full h-[45px] border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-md px-4`}
                required
              >
                <option value="">-- 선택해주세요 --</option>
                {inquiryTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.type && <p className="mt-1 text-sm text-red-500">{errors.type}</p>}
            </div>
            
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                제목 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="제목을 입력해주세요"
                className={`block w-full h-[45px] border ${errors.title ? 'border-red-500' : 'border-gray-300'} rounded-md px-4`}
                required
              />
              {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                내용 <span className="text-red-500">*</span>
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="문의 내용을 자세히 작성해주세요"
                rows={5}
                className={`block w-full border ${errors.content ? 'border-red-500' : 'border-gray-300'} rounded-md p-4`}
                required
              />
              {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">고객 정보</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="이름"
                    className={`block w-full h-[45px] border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md px-4`}
                    required
                  />
                  {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="이메일"
                    className={`block w-full h-[45px] border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md px-4`}
                    required
                  />
                  {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  <p className="mt-1 text-xs text-gray-500">답변은 입력하신 이메일로 발송됩니다.</p>
                </div>
                
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    휴대폰 번호 <span className="text-gray-400">(선택)</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="'-'없이 입력"
                    className={`block w-full h-[45px] border ${errors.phone ? 'border-red-500' : 'border-gray-300'} rounded-md px-4`}
                  />
                  {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                첨부파일 <span className="text-gray-400">(선택, 최대 4개, 각 10MB)</span>
              </label>
              <div className="mt-1 flex items-center">
                <label
                  htmlFor="file-upload"
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                >
                  파일 선택
                </label>
                <input
                  id="file-upload"
                  name="attachments"
                  type="file"
                  className="sr-only"
                  onChange={handleFileChange}
                  multiple
                />
                <span className="ml-3 text-sm text-gray-600">
                  {formData.attachments.length > 0 ? `${formData.attachments.length}개 파일 선택됨` : '파일을 선택해주세요'}
                </span>
              </div>
              {errors.attachments && (
                <p className="mt-1 text-sm text-red-500">{errors.attachments}</p>
              )}
              
              {formData.attachments.length > 0 && (
                <div className="mt-3 space-y-2">
                  {formData.attachments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-2 border border-gray-200 rounded-md">
                      <div className="flex items-center overflow-hidden">
                        <svg className="h-5 w-5 text-gray-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm truncate">{file.name}</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFile(index)}
                        className="ml-2 text-sm text-red-500 hover:text-red-700"
                      >
                        삭제
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <p className="mt-2 text-xs text-gray-500">
                지원 파일 형식: JPG, PNG, GIF, PDF, DOC, DOCX, XLS, XLSX (최대 10MB)
              </p>
            </div>
            
            <div className="border-t border-gray-200 pt-6">
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="agreePrivacy"
                    name="agreePrivacy"
                    type="checkbox"
                    checked={formData.agreePrivacy}
                    onChange={handleChange}
                    className={`w-4 h-4 ${errors.agreePrivacy ? 'border-red-500' : 'border-gray-300'}`}
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="agreePrivacy" className="font-medium text-gray-700">
                    개인정보 수집 및 이용 동의 <span className="text-red-500">*</span>
                  </label>
                  <p className="text-gray-500">
                    고객님의 문의를 처리하기 위해 위와 같이 개인정보를 수집 및 이용합니다.
                    <button type="button" className="ml-1 text-blue-500 underline">자세히 보기</button>
                  </p>
                  {errors.agreePrivacy && (
                    <p className="mt-1 text-sm text-red-500">{errors.agreePrivacy}</p>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex justify-center pt-4">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                disabled={isSubmitting}
              >
                {isSubmitting ? '제출 중...' : '문의 제출하기'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
} 
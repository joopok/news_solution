'use client';

import { useState } from 'react';
import CustomLink from '../../components/CustomLink';
import Script from 'next/script';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    userId: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    detailAddress: '',
    zipCode: '',
    agreeTerms: false,
    agreePrivacy: false,
    agreeMarketing: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isIdChecked, setIsIdChecked] = useState(false);
  const [isPhoneVerified, setIsPhoneVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    // 아이디 변경 시 중복확인 상태 초기화
    if (name === 'userId') {
      setIsIdChecked(false);
      
      // 한글 입력 방지
      if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(value)) {
        setErrors({
          ...errors,
          userId: '한글은 입력할 수 없습니다.',
        });
        return;
      }
      
      // 길이 체크
      if (value.length > 12) {
        setErrors({
          ...errors,
          userId: '아이디는 최대 12자까지 입력 가능합니다.',
        });
        return;
      }
    }
    
    // 비밀번호 길이 체크
    if (name === 'password' && value.length > 16) {
      setErrors({
        ...errors,
        password: '비밀번호는 최대 16자까지 입력 가능합니다.',
      });
      return;
    }
    
    // 전화번호 변경 시 인증 상태 초기화
    if (name === 'phone') {
      setIsPhoneVerified(false);
    }
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
    
    // 입력 필드 변경 시 해당 필드의 오류 메시지 초기화
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: '',
      });
    }
  };

  const validateUserId = (userId: string) => {
    const userIdRegex = /^[a-z0-9]{5,12}$/;
    if (!userId) return '아이디를 입력해주세요.';
    if (/[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(userId)) return '한글은 입력할 수 없습니다.';
    if (userId.length < 5) return '아이디는 최소 5자 이상이어야 합니다.';
    if (userId.length > 12) return '아이디는 최대 12자까지 입력 가능합니다.';
    if (!userIdRegex.test(userId)) return '아이디는 5~12자의 영문 소문자, 숫자만 사용 가능합니다.';
    if (!isIdChecked) return '아이디 중복확인이 필요합니다.';
    return '';
  };

  const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;
    if (!password) return '비밀번호를 입력해주세요.';
    if (password.length < 8) return '비밀번호는 최소 8자 이상이어야 합니다.';
    if (password.length > 16) return '비밀번호는 최대 16자까지 입력 가능합니다.';
    if (!passwordRegex.test(password)) return '비밀번호는 영문, 숫자, 특수문자를 조합하여 8~16자로 입력해주세요.';
    return '';
  };

  const validatePasswordConfirm = (password: string, passwordConfirm: string) => {
    if (!passwordConfirm) return '비밀번호 확인을 입력해주세요.';
    if (password !== passwordConfirm) return '비밀번호가 일치하지 않습니다.';
    return '';
  };

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) return '이메일을 입력해주세요.';
    if (!emailRegex.test(email)) return '유효한 이메일 주소를 입력해주세요.';
    return '';
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!phone) return '휴대폰 번호를 입력해주세요.';
    if (!phoneRegex.test(phone)) return '올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)';
    if (!isPhoneVerified) return '휴대폰 인증이 필요합니다.';
    return '';
  };

  const validateName = (name: string) => {
    if (!name) return '이름을 입력해주세요.';
    if (name.length < 2) return '이름은 2자 이상 입력해주세요.';
    return '';
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    // 필수 입력 필드 검증
    const userIdError = validateUserId(formData.userId);
    if (userIdError) newErrors.userId = userIdError;
    
    const passwordError = validatePassword(formData.password);
    if (passwordError) newErrors.password = passwordError;
    
    const passwordConfirmError = validatePasswordConfirm(formData.password, formData.passwordConfirm);
    if (passwordConfirmError) newErrors.passwordConfirm = passwordConfirmError;
    
    const nameError = validateName(formData.name);
    if (nameError) newErrors.name = nameError;
    
    const emailError = validateEmail(formData.email);
    if (emailError) newErrors.email = emailError;
    
    const phoneError = validatePhone(formData.phone);
    if (phoneError) newErrors.phone = phoneError;
    
    // 필수 약관 동의 검증
    if (!formData.agreeTerms) newErrors.agreeTerms = '서비스 이용약관 동의는 필수입니다.';
    if (!formData.agreePrivacy) newErrors.agreePrivacy = '개인정보 수집 및 이용 동의는 필수입니다.';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleIdCheck = () => {
    // 아이디 유효성 검사
    const userIdError = validateUserId(formData.userId);
    if (userIdError && userIdError !== '아이디 중복확인이 필요합니다.') {
      setErrors({
        ...errors,
        userId: userIdError,
      });
      return;
    }
    
    // 실제로는 서버에 중복 확인 요청을 보내야 함
    // 여기서는 예시로 항상 사용 가능하다고 가정
    setIsIdChecked(true);
    setErrors({
      ...errors,
      userId: '',
    });
    alert('사용 가능한 아이디입니다.');
  };

  const handlePhoneVerification = () => {
    // 전화번호 유효성 검사
    const phoneRegex = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    if (!formData.phone) {
      setErrors({
        ...errors,
        phone: '휴대폰 번호를 입력해주세요.',
      });
      return;
    }
    if (!phoneRegex.test(formData.phone)) {
      setErrors({
        ...errors,
        phone: '올바른 휴대폰 번호를 입력해주세요. (예: 01012345678)',
      });
      return;
    }
    
    // 실제로는 서버에 인증 요청을 보내야 함
    // 여기서는 예시로 항상 인증 성공으로 가정
    setIsPhoneVerified(true);
    setErrors({
      ...errors,
      phone: '',
    });
    alert('인증번호가 발송되었습니다. (예시이므로 실제로 발송되지 않음)');
  };

  const resetForm = () => {
    setFormData({
      userId: '',
      password: '',
      passwordConfirm: '',
      name: '',
      email: '',
      phone: '',
      address: '',
      detailAddress: '',
      zipCode: '',
      agreeTerms: false,
      agreePrivacy: false,
      agreeMarketing: false,
    });
    setErrors({});
    setIsIdChecked(false);
    setIsPhoneVerified(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // 회원가입 처리 로직
      console.log('회원가입 데이터:', formData);
      alert('회원가입이 완료되었습니다.');
      // 여기서 실제 회원가입 API 호출
    } else {
      // 첫 번째 오류 필드로 스크롤
      const firstErrorField = Object.keys(errors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        if (element) element.focus();
      }
    }
  };

  // 다음 주소 검색 API 호출 함수
  const openPostcode = () => {
    // 팝업 창 크기 정의
    const width = 500;
    const height = 600;
    
    new (window as any).daum.Postcode({
      oncomplete: function(data: any) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분
        setFormData({
          ...formData,
          zipCode: data.zonecode,
          address: data.address,
          detailAddress: '',
        });
        
        // 상세주소 입력 필드로 포커스 이동
        document.getElementById('detailAddress')?.focus();
      },
      // 팝업 창이 화면 중앙에 위치하도록 설정
      width: '100%',
      height: '100%',
      maxSuggestItems: 5,
      popupTitle: '주소 검색',
      theme: {
        bgColor: "#FFFFFF", // 배경색
        searchBgColor: "#4B9EFF", // 검색창 배경색
        contentBgColor: "#FFFFFF", // 본문 배경색
        pageBgColor: "#FAFAFA", // 페이지 배경색
        textColor: "#333333", // 기본 글자색
        queryTextColor: "#FFFFFF", // 검색창 글자색
        postcodeTextColor: "#FA4256" // 우편번호 글자색
      }
    }).open({
      // 팝업 창이 화면 가운데 오도록 위치 설정
      left: (window.screen.width / 2) - (width / 2),
      top: (window.screen.height / 2) - (height / 2),
      popupName: '주소검색'
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* 다음 주소 검색 API 스크립트 */}
      <Script 
        src="//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js" 
        strategy="lazyOnload"
      />
      
      <div className="bg-white p-8 rounded shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">회원가입</h1>
          <p className="text-gray-500">뉴스 서비스 이용을 위한 회원가입 페이지입니다....</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-6">
            <div className="border-b border-gray-300 pb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">기본 정보</h2>
              
              <div className="grid gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="userId" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">아이디 <span className="text-red-500">*</span></label>
                  <div className="flex-1">
                    <div className="flex">
                      <input
                        type="text"
                        id="userId"
                        name="userId"
                        value={formData.userId}
                        onChange={handleChange}
                        placeholder="영문, 숫자 5~12자"
                        className={`w-full sm:w-2/3 h-[45px] border ${errors.userId ? 'border-red-500' : 'border-gray-300'} px-4`}
                        required
                        maxLength={12}
                      />
                      <button
                        type="button"
                        className="ml-2 h-[45px] px-4 bg-gray-100 border border-gray-300 text-gray-700"
                        onClick={handleIdCheck}
                      >
                        중복확인
                      </button>
                    </div>
                    {errors.userId ? (
                      <p className="mt-1 text-sm text-red-500">{errors.userId}</p>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">아이디는 5~12자의 영문 소문자, 숫자만 사용 가능합니다.</p>
                    )}
                    {isIdChecked && (
                      <p className="mt-1 text-sm text-green-500">사용 가능한 아이디입니다.</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="password" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">비밀번호 <span className="text-red-500">*</span></label>
                  <div className="flex-1">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="영문, 숫자, 특수문자 조합 8~16자"
                      className={`w-full sm:w-2/3 h-[45px] border ${errors.password ? 'border-red-500' : 'border-gray-300'} px-4`}
                      required
                      maxLength={16}
                    />
                    {errors.password ? (
                      <p className="mt-1 text-sm text-red-500">{errors.password}</p>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">영문, 숫자, 특수문자를 조합하여 8~16자로 입력해주세요.</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="passwordConfirm" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">비밀번호 확인 <span className="text-red-500">*</span></label>
                  <div className="flex-1">
                    <input
                      type="password"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      value={formData.passwordConfirm}
                      onChange={handleChange}
                      placeholder="비밀번호 재입력"
                      className={`w-full sm:w-2/3 h-[45px] border ${errors.passwordConfirm ? 'border-red-500' : 'border-gray-300'} px-4`}
                      required
                      maxLength={16}
                    />
                    {errors.passwordConfirm && (
                      <p className="mt-1 text-sm text-red-500">{errors.passwordConfirm}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="name" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">이름 <span className="text-red-500">*</span></label>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="이름"
                      className={`w-full sm:w-2/3 h-[45px] border ${errors.name ? 'border-red-500' : 'border-gray-300'} px-4`}
                      required
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="email" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">이메일 <span className="text-red-500">*</span></label>
                  <div className="flex-1">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="이메일"
                      className={`w-full sm:w-2/3 h-[45px] border ${errors.email ? 'border-red-500' : 'border-gray-300'} px-4`}
                      required
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="phone" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">휴대폰 번호 <span className="text-red-500">*</span></label>
                  <div className="flex-1">
                    <div className="flex">
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="'-'없이 입력"
                        className={`w-full sm:w-2/3 h-[45px] border ${errors.phone ? 'border-red-500' : 'border-gray-300'} px-4`}
                        required
                      />
                      <button
                        type="button"
                        className="ml-2 h-[45px] px-4 bg-gray-100 border border-gray-300 text-gray-700"
                        onClick={handlePhoneVerification}
                      >
                        인증요청
                      </button>
                    </div>
                    {errors.phone ? (
                      <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">휴대폰 번호는 '-' 없이 숫자만 입력해주세요.</p>
                    )}
                    {isPhoneVerified && (
                      <p className="mt-1 text-sm text-green-500">인증이 완료되었습니다.</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-b border-gray-300 pb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">주소 정보</h2>
              
              <div className="grid gap-4">
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="zipCode" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">우편번호</label>
                  <div className="flex-1">
                    <div className="flex">
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        placeholder="우편번호"
                        className="w-40 h-[45px] border border-gray-300 px-4"
                        readOnly
                      />
                      <button
                        type="button"
                        className="ml-2 h-[45px] px-4 bg-gray-100 border border-gray-300 text-gray-700"
                        onClick={openPostcode}
                      >
                        주소검색
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="address" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">주소</label>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder="주소"
                      className="w-full h-[45px] border border-gray-300 px-4"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label htmlFor="detailAddress" className="w-32 font-medium text-gray-700 mb-2 sm:mb-0">상세주소</label>
                  <div className="flex-1">
                    <input
                      type="text"
                      id="detailAddress"
                      name="detailAddress"
                      value={formData.detailAddress}
                      onChange={handleChange}
                      placeholder="상세주소"
                      className="w-full h-[45px] border border-gray-300 px-4"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="pb-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">약관 동의</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeAll"
                    name="agreeAll"
                    className="w-4 h-4 mr-2"
                    onChange={() => {
                      const allChecked = formData.agreeTerms && formData.agreePrivacy && formData.agreeMarketing;
                      setFormData({
                        ...formData,
                        agreeTerms: !allChecked,
                        agreePrivacy: !allChecked,
                        agreeMarketing: !allChecked,
                      });
                      if (!allChecked) {
                        setErrors({
                          ...errors,
                          agreeTerms: '',
                          agreePrivacy: '',
                        });
                      }
                    }}
                    checked={formData.agreeTerms && formData.agreePrivacy && formData.agreeMarketing}
                  />
                  <label htmlFor="agreeAll" className="font-medium">전체 약관에 동의합니다.</label>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="agreeTerms"
                      name="agreeTerms"
                      className={`w-4 h-4 mr-2 ${errors.agreeTerms ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      checked={formData.agreeTerms}
                      required
                    />
                  </div>
                  <div className="ml-2">
                    <label htmlFor="agreeTerms" className="text-sm">
                      <span className="text-red-500">[필수]</span> 서비스 이용약관에 동의합니다.
                      <button type="button" className="ml-2 text-blue-500 underline">보기</button>
                    </label>
                    {errors.agreeTerms && (
                      <p className="mt-1 text-sm text-red-500">{errors.agreeTerms}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      type="checkbox"
                      id="agreePrivacy"
                      name="agreePrivacy"
                      className={`w-4 h-4 mr-2 ${errors.agreePrivacy ? 'border-red-500' : ''}`}
                      onChange={handleChange}
                      checked={formData.agreePrivacy}
                      required
                    />
                  </div>
                  <div className="ml-2">
                    <label htmlFor="agreePrivacy" className="text-sm">
                      <span className="text-red-500">[필수]</span> 개인정보 수집 및 이용에 동의합니다.
                      <button type="button" className="ml-2 text-blue-500 underline">보기</button>
                    </label>
                    {errors.agreePrivacy && (
                      <p className="mt-1 text-sm text-red-500">{errors.agreePrivacy}</p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="agreeMarketing"
                    name="agreeMarketing"
                    className="w-4 h-4 mr-2"
                    onChange={handleChange}
                    checked={formData.agreeMarketing}
                  />
                  <label htmlFor="agreeMarketing" className="text-sm">
                    <span className="text-gray-500">[선택]</span> 마케팅 정보 수신에 동의합니다.
                  </label>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 pt-4">
            <button
              type="submit"
              className="w-40 h-[50px] bg-emerald-600 text-white font-medium"
              onClick={handleSubmit}
            >
              가입하기
            </button>
            <button
              type="button"
              className="flex items-center justify-center w-40 h-[50px] border border-gray-300 text-gray-700 font-medium"
              onClick={resetForm}
            >
              취소
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 
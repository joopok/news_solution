'use client';

import { useState } from 'react';
import CustomLink from '../../components/CustomLink';

export default function MyPage() {
  const [userInfo, setUserInfo] = useState({
    userId: 'user123',
    name: '홍길동',
    email: 'user123@example.com',
    phone: '01012345678',
    address: '서울특별시 강남구 테헤란로 123',
    addressDetail: '456호',
    joinDate: '2023-01-15',
    membershipLevel: '일반회원',
    point: 3500,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: userInfo.name,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
    addressDetail: userInfo.addressDetail,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditForm({
      ...editForm,
      [name]: value,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    // 정규식을 변수로 추출하여 타입 오류 해결
    const emailRegex = /\S+@\S+\.\S+/;

    if (!editForm.name) newErrors.name = '이름을 입력해주세요';
    
    if (!editForm.email) newErrors.email = '이메일을 입력해주세요';
    else if (!emailRegex.test(editForm.email)) newErrors.email = '유효한 이메일 주소를 입력해주세요';
    
    if (!editForm.phone) newErrors.phone = '전화번호를 입력해주세요';
    
    if (editForm.newPassword) {
      if (!editForm.currentPassword) newErrors.currentPassword = '현재 비밀번호를 입력해주세요';
      if (editForm.newPassword.length < 8) newErrors.newPassword = '비밀번호는 8자 이상이어야 합니다';
      if (editForm.newPassword !== editForm.confirmPassword) {
        newErrors.confirmPassword = '비밀번호가 일치하지 않습니다';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // 회원정보 수정 처리 로직
      setUserInfo({
        ...userInfo,
        name: editForm.name,
        email: editForm.email,
        phone: editForm.phone,
        address: editForm.address,
        addressDetail: editForm.addressDetail,
      });
      setIsEditing(false);
      alert('회원정보가 수정되었습니다.');
    }
  };

  const handlePostcodeSearch = () => {
    // 우편번호 검색 로직
    alert('우편번호 검색 기능이 구현될 예정입니다.');
  };

  const handleEditToggle = () => {
    if (isEditing) {
      // 취소 시 원래 정보로 복원
      setEditForm({
        name: userInfo.name,
        email: userInfo.email,
        phone: userInfo.phone,
        address: userInfo.address,
        addressDetail: userInfo.addressDetail,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setErrors({});
    }
    setIsEditing(!isEditing);
  };

  // 버튼 레이블을 위한 함수 추가
  const getEditButtonLabel = (): string => {
    if (isEditing) {
      return '취소';
    }
    return '정보 수정';
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-8 text-center text-emerald-700 border-b pb-4">마이페이지</h2>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-emerald-600 border-l-4 border-emerald-500 pl-3">
              회원 정보
            </h3>
            <button
              type="button"
              onClick={handleEditToggle}
              className="px-4 py-2 bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors rounded"
            >
              {getEditButtonLabel()}
            </button>
          </div>
          
          {!isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="flex">
                  <span className="block w-32 text-gray-500 font-medium">아이디</span>
                  <span className="font-medium">{userInfo.userId}</span>
                </div>
                <div className="flex">
                  <span className="block w-32 text-gray-500 font-medium">이름</span>
                  <span>{userInfo.name}</span>
                </div>
                <div className="flex">
                  <span className="block w-32 text-gray-500 font-medium">이메일</span>
                  <span>{userInfo.email}</span>
                </div>
                <div className="flex">
                  <span className="block w-32 text-gray-500 font-medium">연락처</span>
                  <span>{userInfo.phone}</span>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex">
                  <span className="block w-32 text-gray-500 font-medium">주소</span>
                  <div>
                    <p>{userInfo.address}</p>
                    <p>{userInfo.addressDetail}</p>
                  </div>
                </div>
                <div className="flex">
                  <span className="block w-32 text-gray-500 font-medium">가입일</span>
                  <span>{userInfo.joinDate}</span>
                </div>
                <div className="flex">
                  <span className="block w-32 text-gray-500 font-medium">회원등급</span>
                  <span className="font-medium text-emerald-600">{userInfo.membershipLevel}</span>
                </div>
                <div className="flex">
                  <span className="block w-32 text-gray-500 font-medium">보유 포인트</span>
                  <span className="font-medium text-emerald-600">{userInfo.point.toLocaleString()}P</span>
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <label htmlFor="userId" className="block w-32 text-gray-700 font-medium">아이디</label>
                    <input
                      type="text"
                      id="userId"
                      value={userInfo.userId}
                      className="flex-1 h-[45px] border border-gray-300 px-4 bg-gray-100"
                      disabled
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label htmlFor="name" className="block w-32 text-gray-700 font-medium">이름 <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        className="flex-1 h-[45px] border border-gray-300 px-4 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm ml-32">{errors.name}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label htmlFor="email" className="block w-32 text-gray-700 font-medium">이메일 <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        className="flex-1 h-[45px] border border-gray-300 px-4 focus:border-emerald-500 focus:outline-none"
                      />
                    </div>
                    {errors.email && <p className="text-red-500 text-sm ml-32">{errors.email}</p>}
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <label htmlFor="phone" className="block w-32 text-gray-700 font-medium">연락처 <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={editForm.phone}
                        onChange={handleChange}
                        className="flex-1 h-[45px] border border-gray-300 px-4 focus:border-emerald-500 focus:outline-none"
                        placeholder="- 없이 입력"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm ml-32">{errors.phone}</p>}
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start">
                    <label htmlFor="address" className="block w-32 text-gray-700 font-medium mt-2">주소</label>
                    <div className="flex-1 space-y-2">
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={editForm.address}
                          onChange={handleChange}
                          className="flex-1 h-[45px] border border-gray-300 px-4 focus:border-emerald-500 focus:outline-none"
                          readOnly
                        />
                        <button
                          type="button"
                          onClick={handlePostcodeSearch}
                          className="h-[45px] px-4 bg-gray-200 text-gray-700 font-medium hover:bg-gray-300"
                        >
                          우편번호 검색
                        </button>
                      </div>
                      <input
                        type="text"
                        id="addressDetail"
                        name="addressDetail"
                        value={editForm.addressDetail}
                        onChange={handleChange}
                        className="w-full h-[45px] border border-gray-300 px-4 focus:border-emerald-500 focus:outline-none"
                        placeholder="상세주소"
                      />
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-gray-700 mb-2">비밀번호 변경 (변경 시에만 입력)</h4>
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <label htmlFor="currentPassword" className="block w-32 text-gray-700">현재 비밀번호</label>
                          <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={editForm.currentPassword}
                            onChange={handleChange}
                            className="flex-1 h-[45px] border border-gray-300 px-4 focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                        {errors.currentPassword && <p className="text-red-500 text-sm ml-32">{errors.currentPassword}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <label htmlFor="newPassword" className="block w-32 text-gray-700">새 비밀번호</label>
                          <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={editForm.newPassword}
                            onChange={handleChange}
                            className="flex-1 h-[45px] border border-gray-300 px-4 focus:border-emerald-500 focus:outline-none"
                            placeholder="8자 이상"
                          />
                        </div>
                        {errors.newPassword && <p className="text-red-500 text-sm ml-32">{errors.newPassword}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <label htmlFor="confirmPassword" className="block w-32 text-gray-700">비밀번호 확인</label>
                          <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={editForm.confirmPassword}
                            onChange={handleChange}
                            className="flex-1 h-[45px] border border-gray-300 px-4 focus:border-emerald-500 focus:outline-none"
                          />
                        </div>
                        {errors.confirmPassword && <p className="text-red-500 text-sm ml-32">{errors.confirmPassword}</p>}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center mt-8">
                <button
                  type="submit"
                  className="w-40 h-[50px] bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition-colors"
                >
                  정보 수정 완료
                </button>
              </div>
            </form>
          )}
        </div>
        
        <div className="mt-12">
          <h3 className="text-lg font-semibold mb-6 text-emerald-600 border-l-4 border-emerald-500 pl-3">
            나의 활동
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <CustomLink href="/member/orders">
              <div className="border border-gray-200 p-6 text-center hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer">
                <div className="text-4xl text-emerald-600 mb-2">0</div>
                <div className="font-medium">주문 내역</div>
              </div>
            </CustomLink>
            
            <CustomLink href="/member/reviews">
              <div className="border border-gray-200 p-6 text-center hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer">
                <div className="text-4xl text-emerald-600 mb-2">0</div>
                <div className="font-medium">작성 리뷰</div>
              </div>
            </CustomLink>
            
            <CustomLink href="/member/inquiries">
              <div className="border border-gray-200 p-6 text-center hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer">
                <div className="text-4xl text-emerald-600 mb-2">0</div>
                <div className="font-medium">문의 내역</div>
              </div>
            </CustomLink>
          </div>
        </div>
        
        <div className="mt-12 flex justify-center">
          <CustomLink href="/">
            <button
              type="button"
              className="px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition-colors"
            >
              홈으로 돌아가기
            </button>
          </CustomLink>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { FiCalendar, FiEye, FiClock, FiPrinter, FiShare2, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import BackLink from '../../../components/BackLink';
import CustomLink from '../../../components/CustomLink';

// 공지사항 데이터 타입
interface NoticeItem {
  id: number;
  category: string;
  title: string;
  content: string;
  date: string;
  views: number;
  isImportant: boolean;
}

// 샘플 공지사항 데이터
const noticeData: NoticeItem[] = [
  {
    id: 1,
    category: '서비스',
    title: '개인정보처리방침 개정 안내',
    content: '<h3>개인정보처리방침 개정 안내</h3><p>안녕하세요. 해피뉴스 서비스를 이용해 주시는 고객님께 감사드립니다.</p><p>해피뉴스는 개인정보보호법 관련 법령 준수를 위해 2024년 3월 1일부로 개인정보처리방침을 개정할 예정입니다.</p><h4>주요 변경사항</h4><ul><li>개인정보 수집항목 변경: 선택적 수집 항목에서 \'관심 분야\' 추가</li><li>개인정보 이용 목적 변경: 맞춤형 뉴스 콘텐츠 제공 목적 추가</li><li>개인정보 보유기간 명확화: 회원 탈퇴 후 90일 이내 파기</li><li>개인정보 제3자 제공 관련 내용 명확화</li></ul><p>개정된 개인정보처리방침은 2024년 3월 1일부터 적용되며, 개정 이전의 개인정보처리방침은 홈페이지 하단의 \'이전 개인정보처리방침\'에서 확인하실 수 있습니다.</p><p>앞으로도 회원님의 개인정보 보호를 위해 최선을 다하겠습니다.</p><p>감사합니다.</p>',
    date: '2024-02-25',
    views: 1248,
    isImportant: true
  },
  {
    id: 2,
    category: '시스템',
    title: '시스템 점검에 따른 서비스 일시 중단 안내',
    content: '<h3>시스템 점검에 따른 서비스 일시 중단 안내</h3><p>안녕하세요. 해피뉴스입니다.</p><p>보다 안정적인 서비스 제공을 위한 시스템 점검을 실시합니다. 점검 시간 동안에는 서비스 이용이 일시 중단되오니 이용에 참고하시기 바랍니다.</p><h4>점검 일정</h4><ul><li>점검 일시: 2024년 3월 5일(화) 02:00 ~ 05:00 (3시간)</li><li>점검 영향: 웹사이트 및 모바일 앱 서비스 전체 이용 불가</li></ul><h4>점검 내용</h4><ul><li>서버 인프라 업그레이드</li><li>보안 시스템 강화</li><li>데이터베이스 최적화</li></ul><p>이번 점검을 통해 서비스 안정성 및 보안 강화가 이루어질 예정입니다. 이용자분들의 너그러운 이해를 부탁드립니다.</p><p>감사합니다.</p>',
    date: '2024-02-20',
    views: 987,
    isImportant: true
  },
  {
    id: 3,
    category: '기능',
    title: '뉴스레터 서비스 오픈 안내',
    content: '<h3>뉴스레터 서비스 오픈 안내</h3><p>안녕하세요. 해피뉴스입니다.</p><p>회원님들께 매일 아침 주요 뉴스를 요약해서 보내드리는 뉴스레터 서비스를 시작합니다. 관심 분야를 설정하시면 맞춤형 뉴스를 받아보실 수 있습니다.</p><h4>서비스 특징</h4><ul><li>평일 오전 7시 발송</li><li>관심 분야 맞춤 뉴스 제공 (정치, 경제, 사회, 문화, IT 등)</li><li>주요 뉴스 요약 및 심층 분석</li><li>모바일에 최적화된 레이아웃</li></ul><h4>이용 방법</h4><ol><li>마이페이지 > 뉴스레터 설정 메뉴 접속</li><li>관심 분야 및 수신 여부 설정</li><li>설정 저장</li></ol><p>뉴스레터는 회원님의 이메일로 발송되며, 언제든지 수신 설정을 변경하실 수 있습니다.</p><p>해피뉴스 뉴스레터와 함께 하루를 시작해보세요!</p>',
    date: '2024-02-15',
    views: 1563,
    isImportant: false
  },
  {
    id: 4,
    category: '앱',
    title: '모바일 앱 업데이트 안내',
    content: '<h3>모바일 앱 업데이트 안내</h3><p>안녕하세요. 해피뉴스입니다.</p><p>모바일 앱 버전 2.5.0이 출시되었습니다. 이번 업데이트에서는 성능 개선 및 버그 수정, 새로운 기능이 추가되었습니다.</p><h4>주요 업데이트 내용</h4><ul><li>다크 모드 지원</li><li>사용자 맞춤 뉴스 피드 개선</li><li>오프라인 읽기 기능 추가</li><li>동영상 재생 성능 향상</li><li>알림 설정 기능 개편</li></ul><h4>다운로드 방법</h4><p>App Store 또는 Google Play Store에서 자동 업데이트를 설정하셨다면 자동으로 업데이트됩니다. 수동으로 업데이트를 원하시면 앱 스토어에서 직접 업데이트해 주세요.</p><p>더 나은 서비스를 제공하기 위해 노력하겠습니다.</p><p>감사합니다.</p>',
    date: '2024-02-10',
    views: 892,
    isImportant: false
  },
  {
    id: 5,
    category: '서비스',
    title: '설 연휴 고객센터 운영 안내',
    content: '<h3>설 연휴 고객센터 운영 안내</h3><p>안녕하세요. 해피뉴스입니다.</p><p>다가오는 설 연휴 기간 동안 고객센터 운영 시간이 조정됩니다.</p><h4>고객센터 운영 일정</h4><ul><li>2024년 2월 9일(금) ~ 2월 12일(월): 휴무</li><li>2월 13일(화)부터 정상 운영</li></ul><h4>휴무 기간 중 문의 안내</h4><p>휴무 기간 중에는 이메일(support@happynews.com)로 문의 접수가 가능하며, 정상 운영일인 2월 13일(화)부터 순차적으로 답변 드리겠습니다.</p><p>설 연휴 기간 동안 뉴스 서비스는 정상적으로 제공됩니다.</p><p>새해 복 많이 받으세요.</p><p>감사합니다.</p>',
    date: '2024-02-05',
    views: 654,
    isImportant: false
  },
  {
    id: 6,
    category: '결제',
    title: '카카오페이 결제 서비스 추가 안내',
    content: '<h3>카카오페이 결제 서비스 추가 안내</h3><p>안녕하세요. 해피뉴스입니다.</p><p>회원님들의 편의를 위해 카카오페이 결제 서비스를 추가하였습니다. 이제 프리미엄 구독 결제 시 카카오페이로도 간편하게 결제하실 수 있습니다.</p><h4>카카오페이 결제 방법</h4><ol><li>프리미엄 구독 신청 페이지 접속</li><li>원하는 구독 상품 선택</li><li>결제 수단 선택에서 \'카카오페이\' 선택</li><li>카카오페이 인증 완료 후 결제</li></ol><h4>혜택 안내</h4><p>카카오페이 결제 론칭 기념으로 3월 31일까지 카카오페이로 결제 시 5% 할인 혜택을 제공합니다.</p><p>더 편리한 서비스 이용을 위해 계속해서 노력하겠습니다.</p><p>감사합니다.</p>',
    date: '2024-01-28',
    views: 1124,
    isImportant: false
  },
  {
    id: 7,
    category: '이벤트',
    title: '신규 회원 가입 혜택 안내',
    content: '<h3>신규 회원 가입 혜택 안내</h3><p>안녕하세요. 해피뉴스입니다.</p><p>새로운 회원 가입 혜택이 업데이트되었습니다. 신규 가입 시 프리미엄 뉴스 1개월 무료 이용권을 드립니다.</p><h4>혜택 내용</h4><ul><li>프리미엄 뉴스 1개월 무료 이용권</li><li>프리미엄 콘텐츠 모두 열람 가능</li><li>광고 없는 뉴스 보기</li><li>전문가 분석 기사 이용</li></ul><h4>이용 방법</h4><ol><li>회원가입 완료 후 마이페이지 접속</li><li>\'프리미엄 이용권\' 메뉴에서 무료 이용권 확인</li><li>\'이용권 활성화\' 버튼 클릭</li></ol><p>무료 이용 기간 종료 후에는 자동 결제되지 않으니 안심하고 이용하세요.</p><p>해피뉴스의 다양한 프리미엄 서비스를 경험해보세요!</p><p>감사합니다.</p>',
    date: '2024-01-20',
    views: 2358,
    isImportant: false
  },
  {
    id: 8,
    category: '서비스',
    title: '회원 등급 혜택 개편 안내',
    content: '<h3>회원 등급 혜택 개편 안내</h3><p>안녕하세요. 해피뉴스입니다.</p><p>보다 나은 서비스 제공을 위해 회원 등급 혜택을 개편합니다.</p><h4>등급별 혜택 안내</h4><ul><li><strong>실버 등급</strong>: 기본 뉴스 이용, 댓글 작성</li><li><strong>골드 등급</strong>: 프리미엄 콘텐츠 50% 할인, 무료 이벤트 참여 우선권</li><li><strong>플래티넘 등급</strong>: 프리미엄 콘텐츠 무제한 이용, 전문가 칼럼 무료 이용, 이벤트 우선 참여권</li></ul><h4>등급 산정 기준</h4><p>등급은 최근 6개월간의 활동 내역을 기준으로 매월 1일에 갱신됩니다.</p><ul><li><strong>실버 등급</strong>: 기본 회원 등급</li><li><strong>골드 등급</strong>: 최근 6개월간 프리미엄 콘텐츠 10건 이상 열람 또는 댓글 50개 이상 작성</li><li><strong>플래티넘 등급</strong>: 프리미엄 구독 회원 또는 최근 6개월간 프리미엄 콘텐츠 30건 이상 열람</li></ul><p>현재 등급 및 활동 내역은 마이페이지에서 확인하실 수 있습니다.</p><p>앞으로도 회원님들께 더 나은 서비스를 제공하기 위해 노력하겠습니다.</p><p>감사합니다.</p>',
    date: '2024-01-15',
    views: 1736,
    isImportant: false
  },
  {
    id: 9,
    category: '기능',
    title: '댓글 기능 개선 안내',
    content: '<h3>댓글 기능 개선 안내</h3><p>안녕하세요. 해피뉴스입니다.</p><p>더 나은 소통 환경을 위해 댓글 기능을 개선하였습니다.</p><h4>주요 개선 사항</h4><ul><li>댓글에 이미지 첨부 기능 추가 (최대 3개, 각 5MB 이하)</li><li>대댓글 알림 기능 추가</li><li>댓글 작성자의 선택에 따라 답글 허용 여부 설정 가능</li><li>댓글 정렬 옵션 추가 (인기순, 최신순)</li><li>댓글 신고 기능 개선</li></ul><h4>이용 방법</h4><p>뉴스 기사 하단의 댓글 작성 영역에서 새로운 기능들을 이용하실 수 있습니다. 이미지 첨부는 댓글 작성 상자 하단의 이미지 아이콘을 클릭하여 이용하세요.</p><p>더 나은 커뮤니티를 만들기 위해 지속적으로 노력하겠습니다.</p><p>감사합니다.</p>',
    date: '2024-01-10',
    views: 864,
    isImportant: false
  },
  {
    id: 10,
    category: '서비스',
    title: '개인정보처리방침 개정 안내 (2023년 12월)',
    content: '<h3>개인정보처리방침 개정 안내 (2023년 12월)</h3><p>안녕하세요. 해피뉴스 서비스를 이용해 주시는 고객님께 감사드립니다.</p><p>해피뉴스는 개인정보보호법 관련 법령 준수를 위해 2023년 12월 31일부로 개인정보처리방침을 개정하였습니다.</p><h4>주요 변경사항</h4><ul><li>개인정보 수집 및 이용 동의 항목 세분화</li><li>개인정보 제3자 제공 및 위탁 항목 현행화</li><li>개인정보 보호책임자 변경</li></ul><p>개정된 개인정보처리방침은 2023년 12월 31일부터 적용되며, 개정 이전의 개인정보처리방침은 홈페이지 하단의 \'이전 개인정보처리방침\'에서 확인하실 수 있습니다.</p><p>앞으로도 회원님의 개인정보 보호를 위해 최선을 다하겠습니다.</p><p>감사합니다.</p>',
    date: '2023-12-28',
    views: 1046,
    isImportant: false
  },
];

export default function NoticeDetailPage({ params }: { params: { id: string } }) {
  const [notice, setNotice] = useState<NoticeItem | null>(null);
  const [prevNotice, setPrevNotice] = useState<NoticeItem | null>(null);
  const [nextNotice, setNextNotice] = useState<NoticeItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // URL에서 ID 파라미터 가져오기
    const noticeId = Number(params.id);

    // 현재 공지사항 찾기
    const currentNotice = noticeData.find(item => item.id === noticeId) || null;
    setNotice(currentNotice);

    if (currentNotice) {
      // 이전 공지사항 찾기
      const prevIndex = noticeData.findIndex(item => item.id === noticeId) + 1;
      setPrevNotice(prevIndex < noticeData.length ? noticeData[prevIndex] : null);

      // 다음 공지사항 찾기
      const nextIndex = noticeData.findIndex(item => item.id === noticeId) - 1;
      setNextNotice(nextIndex >= 0 ? noticeData[nextIndex] : null);
    }

    setIsLoading(false);
  }, [params.id]);

  // 날짜 포맷팅 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 공유 기능
  const handleShare = () => {
    if (navigator.share && notice) {
      navigator.share({
        title: notice.title,
        text: `해피뉴스 공지사항: ${notice.title}`,
        url: window.location.href,
      }).catch(err => {
        console.error('공유 실패:', err);
      });
    } else {
      // 클립보드에 복사 (공유 API 미지원 시)
      navigator.clipboard.writeText(window.location.href);
      alert('링크가 클립보드에 복사되었습니다.');
    }
  };

  // 인쇄 기능
  const handlePrint = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
        <div className="flex justify-center">
          <div className="animate-pulse flex flex-col w-full">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3 mb-8"></div>
            <div className="h-64 bg-gray-200 rounded mb-4"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
        <BackLink href="/notice" label="공지사항 목록으로 돌아가기" />
        <div className="mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">공지사항을 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-6">요청하신 공지사항이 존재하지 않거나 삭제되었습니다.</p>
          <CustomLink 
            href="/notice"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
          >
            공지사항 목록으로 돌아가기
          </CustomLink>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-10 px-4 sm:px-6">
      {/* 뒤로가기 */}
      <BackLink href="/notice" label="공지사항 목록으로 돌아가기" />
      
      {/* 공지사항 헤더 */}
      <div className="mt-6 border-b border-gray-200 pb-6">
        <div className="flex flex-wrap items-center mb-2">
          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 mr-2">
            {notice.category}
          </span>
          {notice.isImportant && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
              중요
            </span>
          )}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
          {notice.title}
        </h1>
        <div className="flex flex-wrap items-center text-sm text-gray-500 space-x-4">
          <div className="flex items-center">
            <FiCalendar className="mr-1" />
            <span>{formatDate(notice.date)}</span>
          </div>
          <div className="flex items-center">
            <FiEye className="mr-1" />
            <span>조회 {notice.views.toLocaleString()}</span>
          </div>
        </div>
      </div>
      
      {/* 공지사항 내용 */}
      <div className="py-6">
        <div 
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: notice.content }}
        />
      </div>
      
      {/* 액션 버튼 */}
      <div className="border-t border-gray-200 pt-4 mb-8">
        <div className="flex justify-end space-x-2">
          <button 
            onClick={handleShare}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiShare2 className="mr-1" />
            공유하기
          </button>
          <button 
            onClick={handlePrint}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded text-gray-700 bg-white hover:bg-gray-50"
          >
            <FiPrinter className="mr-1" />
            인쇄하기
          </button>
        </div>
      </div>
      
      {/* 이전/다음 공지사항 */}
      <div className="border-t border-gray-200 pt-8">
        <div className="space-y-4">
          {nextNotice && (
            <CustomLink 
              href={`/notice/${nextNotice.id}`} 
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center text-gray-600">
                <FiChevronLeft className="mr-2" />
                <span className="text-sm">다음 공지사항</span>
              </div>
              <div className="flex-1 ml-4">
                <p className="text-gray-900 font-medium truncate">{nextNotice.title}</p>
              </div>
            </CustomLink>
          )}
          
          {prevNotice && (
            <CustomLink 
              href={`/notice/${prevNotice.id}`}
              className="flex justify-between items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex-1 mr-4">
                <p className="text-gray-900 font-medium truncate">{prevNotice.title}</p>
              </div>
              <div className="flex items-center text-gray-600">
                <span className="text-sm">이전 공지사항</span>
                <FiChevronRight className="ml-2" />
              </div>
            </CustomLink>
          )}
        </div>
      </div>
      
      {/* 목록으로 버튼 */}
      <div className="flex justify-center mt-8">
        <CustomLink 
          href="/notice"
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
        >
          공지사항 목록으로
        </CustomLink>
      </div>
    </div>
  );
} 
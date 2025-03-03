'use client';

import {
  FaHeadset, FaQuestionCircle, FaFilePdf, FaMapMarkerAlt,
  FaVideo, FaCommentAlt, FaList, FaHandHoldingHeart, 
  FaBullhorn, FaIdCard, FaRegCalendarAlt
} from 'react-icons/fa';

export default function PollContents() {
  const serviceItems = [
    {
      icon: <FaBullhorn className="text-2xl text-gray-600" />,
      title: "독자투고",
      link: "#"
    },
    {
      icon: <FaIdCard className="text-2xl text-gray-600" />,
      title: "기자회원신청",
      link: "#"
    },
    {
      icon: <FaFilePdf className="text-2xl text-gray-600" />,
      title: "PDF 월간발행",
      link: "#"
    },
    {
      icon: <FaMapMarkerAlt className="text-2xl text-gray-600" />,
      title: "지역별뉴스",
      link: "#"
    },
    {
      icon: <FaVideo className="text-2xl text-gray-600" />,
      title: "동영상뉴스",
      link: "#"
    },
    {
      icon: <FaCommentAlt className="text-2xl text-gray-600" />,
      title: "뉴스 댓글보기",
      link: "#"
    },
    {
      icon: <FaList className="text-2xl text-gray-600" />,
      title: "전체뉴스보기",
      link: "#"
    },
    {
      icon: <FaHandHoldingHeart className="text-2xl text-gray-600" />,
      title: "기부뉴스",
      link: "#"
    },
    {
      icon: <FaRegCalendarAlt className="text-2xl text-gray-600" />,
      title: "주요행사일정",
      link: "#"
    }
  ];

  return (
    <div className="bg-white p-6 rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        {/* 왼쪽: 설문조사 */}
        <div className="md:w-7/12">
          <div className="bg-white">
            <h2 className="text-xl font-bold mb-4">설문조사</h2>
            <div className="mb-6">
              <h3 className="text-lg font-medium mb-3">
                PC와 앱의 연계되는 부분에 대해 앞으로의 미래는 어떻게 발전하는것이 좋을까요?
              </h3>
              <form className="space-y-3">
                <div className="flex items-center">
                  <input 
                    type="radio"
                    id="option1"
                    name="poll"
                    className="mr-3"
                  />
                  <label htmlFor="option1">구글 앱스의 알고리즘을 활용한다</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio"
                    id="option2"
                    name="poll"
                    className="mr-3"
                  />
                  <label htmlFor="option2">PC와 모바일앱은 친환적으로 연경되어야 한다</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio"
                    id="option3"
                    name="poll"
                    className="mr-3"
                  />
                  <label htmlFor="option3">PC화면도 모바일에 맞춰서 UI/UX가 마련되어야 한다</label>
                </div>
                <div className="flex items-center">
                  <input 
                    type="radio"
                    id="option4"
                    name="poll"
                    className="mr-3"
                  />
                  <label htmlFor="option4">앱에서 지원되는 기타기능들이 PC에서도 다른 UI로도 제공되어야 한다</label>
                </div>
              </form>
            </div>
            <div className="flex space-x-4">
              <button className="bg-teal-600 text-white px-6 py-2 hover:bg-teal-700">
                참여하기
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-2 hover:bg-gray-300">
                결과보기
              </button>
              <button className="bg-gray-200 text-gray-700 px-6 py-2 hover:bg-gray-300">
                모두보기
              </button>
            </div>
          </div>
        </div>

        {/* 중앙: 서비스 아이콘 그리드 */}
        <div className="md:w-5/12">
          <div className="grid grid-cols-3 gap-3">
            {serviceItems.map((item, index) => (
              <a
                key={index}
                href={item.link}
                className="flex flex-col items-center justify-center bg-white shadow-sm hover:shadow-md transition-shadow"
                style={{
                  width: '130px',
                  height: '115px',
                  border: '1px solid #e5e7eb',
                  fontSize: '18px'
                }}
              >
                <div className="flex flex-col items-center">
                  <div className="text-gray-600 mb-1">
                    {item.icon}
                  </div>
                  <span className="text-gray-700 text-center">
                    {item.title}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* 오른쪽: 고객지원 섹션 */}
        <div className="md:w-3/12">
          <div className="bg-white">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <FaHeadset className="mr-2 text-blue-500" />
              고객지원
            </h2>
            <div className="flex flex-col space-y-4">
              <div className="p4">
                <h3 className="font-semibold mb-3 flex items-center">
                  <FaQuestionCircle className="mr-2" />
                  자주 묻는 질문
                </h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      - 회원가입은 어떻게 하나요?
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      - 비밀번호를 잊어버렸어요
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:text-blue-500">
                      - 구독 신청 방법 안내
                    </a>
                  </li>
                </ul>
              </div>
              <div className="p-4">
                <div className="space-y-3">
                  <p className="flex items-center justify-left text-[25px]">
                    고객센터 
                  </p>
                  <p className="flex items-center justify-left text-[35px] font-weight:bold">
                     1588-1234
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

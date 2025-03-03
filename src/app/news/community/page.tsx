'use client';

import { useState } from 'react';
import { FaBullhorn, FaPen, FaNewspaper, FaLaugh, FaUtensils, FaCalendarAlt, FaComments, FaUsers, FaClock, FaHeart } from 'react-icons/fa';

// 더미 게시판 데이터
const boards = [
  { id: 1, icon: <FaBullhorn />, name: '알립니다', count: 127 },
  { id: 2, icon: <FaPen />, name: '독자투고', count: 89 },
  { id: 3, icon: <FaNewspaper />, name: '기사제보', count: 156 },
  { id: 4, icon: <FaLaugh />, name: '유머마당', count: 342 },
  { id: 5, icon: <FaUtensils />, name: '맛집이야기', count: 234 },
  { id: 6, icon: <FaCalendarAlt />, name: '행사/이벤트', count: 78 },
  { id: 7, icon: <FaComments />, name: '자유게시판', count: 567 },
];

// 더미 커뮤니티 데이터
const communityPosts = [
    {
        id: 1,
        category: '자유게시판',
        title: '오늘의 뉴스 어떻게 보시나요?',
        content: '최근 이슈가 되고 있는 뉴스에 대해 여러분의 의견을 들려주세요.',
        author: '뉴스팬',
        date: '2024-02-26',
        comments: 15,
        likes: 23,
        views: 234,
    },
    {
        id: 2,
        category: '토론방',
        title: '기후변화 대응, 우리는 무엇을 해야 할까요?',
        content: '기후변화가 심각해지고 있는 가운데, 시민들이 실천할 수 있는 방안에 대해 이야기해봅시다.',
        author: '환경지킴이',
        date: '2024-02-26',
        comments: 28,
        likes: 45,
        views: 567,
    },
];

// 더미 게시글 데이터
const posts = [
  {
    id: 1,
    board: '독자투고',
    title: '우리 동네 숨은 영웅을 소개합니다',
    author: '시민기자',
    date: '2024-02-26',
    views: 234,
    comments: 12,
  },
  {
    id: 2,
    board: '맛집이야기',
    title: '30년 전통 할머니 국수 맛집 리뷰',
    author: '맛집탐험가',
    date: '2024-02-26',
    views: 567,
    comments: 23,
  },
  {
    id: 3,
    board: '유머마당',
    title: '직장인들이 공감할 수 있는 일상 이야기',
    author: '월요병',
    date: '2024-02-26',
    views: 890,
    comments: 45,
  },
  {
    id: 4,
    board: '기사제보',
    title: '횡단보도 앞 위험한 불법주차 신고합니다',
    author: '안전지킴이',
    date: '2024-02-26',
    views: 345,
    comments: 18,
  },
  {
    id: 5,
    board: '행사/이벤트',
    title: '이번 주말 시민공원 벚꽃축제 안내',
    author: '축제준비위',
    date: '2024-02-26',
    views: 678,
    comments: 34,
  },
];

export default function CommunityPage() {
    const [selectedCategory, setSelectedCategory] = useState('전체');
    const categories = ['전체', '자유게시판', '토론방', '제보', '칼럼', '독자투고'];

    const filteredPosts = selectedCategory === '전체'
        ? communityPosts
        : communityPosts.filter(post => post.category === selectedCategory);

    return (
        <div className="container mx-auto px-4 py-8">
            {/* 페이지 헤더 */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold flex items-center mb-4">
                    <FaUsers className="mr-2 text-blue-600" />
                    커뮤니티
                </h1>
                <p className="text-gray-600">
                    독자들과 함께 만들어가는 소통의 공간입니다.
                </p>
            </div>

            {/* 카테고리 필터 */}
            <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                    <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-full transition-colors ${
                            selectedCategory === category
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                    >
                        {category}
                    </button>
                ))}
            </div>

            <div className="flex flex-col md:flex-row gap-8">
                {/* 왼쪽: 게시판 목록 */}
                <div className="md:w-4/12">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-6">커뮤니티 게시판</h2>
                        <ul className="space-y-4">
                            {boards.map((board) => (
                                <li key={board.id} className="flex items-center justify-between hover:bg-gray-50 p-3 rounded cursor-pointer">
                                    <div className="flex items-center">
                                        <span className="text-blue-500 mr-3">{board.icon}</span>
                                        <span className="font-medium">{board.name}</span>
                                    </div>
                                    <span className="text-gray-500 text-sm">{board.count}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* 오른쪽: 게시글 목록 */}
                <div className="md:w-8/12">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-xl font-bold mb-6">최신 게시글</h2>
                        <div className="space-y-4">
                            {posts.map((post) => (
                                <div key={post.id} className="border-b pb-4 last:border-b-0">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <span className="text-sm text-blue-500 font-semibold">[{post.board}]</span>
                                            <h3 className="text-lg font-medium mt-1">{post.title}</h3>
                                        </div>
                                    </div>
                                    <div className="flex items-center text-sm text-gray-500">
                                        <span>{post.author}</span>
                                        <span className="mx-2">•</span>
                                        <span>{post.date}</span>
                                        <span className="mx-2">•</span>
                                        <span>조회 {post.views}</span>
                                        <span className="mx-2">•</span>
                                        <span>댓글 {post.comments}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* 게시물 목록 */}
            <div className="space-y-4 mt-8">
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                                {post.category}
                            </span>
                            <div className="text-sm text-gray-500">
                                <FaClock className="inline-block mr-1" />
                                {post.date}
                            </div>
                        </div>
                        <h2 className="text-xl font-bold mb-3">{post.title}</h2>
                        <p className="text-gray-600 mb-4">{post.content}</p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                            <div className="flex items-center space-x-4">
                                <span>작성자: {post.author}</span>
                                <span className="flex items-center">
                                    <FaComments className="mr-1" />
                                    댓글 {post.comments}
                                </span>
                                <span className="flex items-center">
                                    <FaHeart className="mr-1 text-red-500" />
                                    좋아요 {post.likes}
                                </span>
                            </div>
                            <span>조회 {post.views}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

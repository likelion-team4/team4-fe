import { useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Search from './pages/Search';
import SavedList from './pages/SavedList';
import MyPage from './pages/MyPage';
import CardNewsDetail from './pages/CardNewsDetail';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  // 현재 페이지에 따라 컴포넌트 렌더링
  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <CardNewsDetail title="제목입니다." date="24.12.31" summary="여기는 이런 가게야.바고고고고고곡고고고고고고곡고고바고고곡고고고고고고고고곡고바고고곡고고고고고" 
        body="문단을 \n 로 구분\n ss 안녕 \n d\nd\nd\nd\nd\nd\nd\nd\nd\n" />;
      case 'search':
        return <Search />;
      case 'saved':
        return <SavedList />;
      case 'mypage':
        return <MyPage />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="app">
      {/* ===== 고정 헤더 ===== */}
      <header className="header">
        <div className="header-content">
          <h1 className="header-title">우리동네착한가게</h1>
        </div>
      </header>

      {/* ===== 메인 콘텐츠 영역 ===== */}
      <main className="main-content">
        <div className="scrollable-content no-scrollbar">
          {renderPage()}
        </div>
      </main>

      {/* ===== 하단 네비게이션 바 ===== */}
      <nav className="bottom-nav">
        {/* 홈 메뉴 */}
        <div 
          className={`nav-item ${currentPage === 'home' ? 'active' : ''}`}
          onClick={() => setCurrentPage('home')}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
          </svg>
          <span className="nav-label">홈</span>
        </div>
        {/* 검색 메뉴 */}
        <div 
          className={`nav-item ${currentPage === 'search' ? 'active' : ''}`}
          onClick={() => setCurrentPage('search')}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
          <span className="nav-label">검색</span>
        </div>
        {/* 저장 목록 메뉴 */}
        <div 
          className={`nav-item ${currentPage === 'saved' ? 'active' : ''}`}
          onClick={() => setCurrentPage('saved')}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>
          </svg>
          <span className="nav-label">저장 목록</span>
        </div>
        {/* 마이페이지 메뉴 */}
        <div 
          className={`nav-item ${currentPage === 'mypage' ? 'active' : ''}`}
          onClick={() => setCurrentPage('mypage')}
        >
          <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
            <circle cx="12" cy="7" r="4"/>
          </svg>
          <span className="nav-label">마이페이지</span>
        </div>
      </nav>
    </div>
  );
}

export default App;

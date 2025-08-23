import "./App.css";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Search from "./pages/Search";
import SavedList from "./pages/SavedList";
import MyPage from "./pages/MyPage";
import StoreDetail from "./pages/StoreDetail";
import CardNewsDetail from "./pages/CardNewsDetail";
import BadgesPage from "./pages/BadgesPage";
import Logo from "./assets/logo.png";

function BottomNav() {
  const { pathname } = useLocation();
  const isActive = (path: string) => (pathname === path ? "active" : "");

  return (
    <nav className="bottom-nav">
      <Link to="/" className={`nav-item ${isActive("/")}`}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
        </svg>
        <span className="nav-label">홈</span>
      </Link>

      <Link to="/search" className={`nav-item ${isActive("/search")}`}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span className="nav-label">검색</span>
      </Link>

      <Link to="/saved" className={`nav-item ${isActive("/saved")}`}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
        </svg>
        <span className="nav-label">저장 목록</span>
      </Link>

      <Link to="/mypage" className={`nav-item ${isActive("/mypage")}`}>
        <svg className="nav-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
        <span className="nav-label">마이페이지</span>
      </Link>
    </nav>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        {/* 고정 헤더 */}
        <header className="header">
          <div className="header-content flex items-center justify-start gap-2 ml-3">
            {/* 로고 */}
            <img 
              src={Logo}
              alt="로고" 
              className="h-6 w-6" 
            />

            {/* 타이틀 */}
            <h1 className="text-[22px] font-bold text-black">
              우리동네착한가게
            </h1>
          </div>
        </header>

        {/* 메인 */}
        <main className="main-content">
          <div className="scrollable-content no-scrollbar">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/search" element={<Search />} />
              <Route path="/saved" element={<SavedList />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/badges" element={<BadgesPage />} />
              <Route path="/store/:storeId" element={<StoreDetail />} />
              <Route path="/news/:newsId" element={<CardNewsDetail />} />
            </Routes>
          </div>
        </main>

        {/* 하단 탭 */}
        <BottomNav />
      </div>
    </BrowserRouter>
  );
}
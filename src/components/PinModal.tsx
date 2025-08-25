// src/components/PinModal.tsx
import React, { useEffect, useRef, useState} from "react";
import SuccessNotice from "./SuccessNotice";
import FailureNotice from "./FailureNotice";
import PlaceCard from "./PlaceCard";
import NewsCard from "./NewsCard";
import { mockNewsData } from "../data/mockData";
import type { StoreData } from "../data/mockData";
import store1 from "../assets/store1.png";
import store2 from "../assets/store2.png";
import store3 from "../assets/store3.png";

// API에서 받아오는 가게 데이터 타입
interface ApiStoreData {
  id: number;
  name: string;
  lat: number;
  lon: number;
  score: number;
  categories: string[];
}

interface PinModalProps {
  open: boolean;
  onClose: () => void;
  selectedStore?: StoreData | ApiStoreData;
  children?: React.ReactNode;
}

const PinModal: React.FC<PinModalProps> = ({ open, onClose, selectedStore, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  const [showVerifyNotice, setshowVerifyNotice] = useState(false); // 방문 인증
  const verifyTimerRef = useRef<number | null>(null);

  const handleVerify = () => {
    setshowVerifyNotice(true);
    if (verifyTimerRef.current) window.clearTimeout(verifyTimerRef.current);
    // 1초 후 숨김 (transition-opacity 300ms로 자연스런 페이드아웃)
    verifyTimerRef.current = window.setTimeout(() => setshowVerifyNotice(false), 1000);
  };

  const [showSaveNotice, setShowSaveNotice] = useState(false); // 저장
  const saveTimerRef = useRef<number | null>(null);

  const handleSave = () => {
    setShowSaveNotice(true);
    if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    saveTimerRef.current = window.setTimeout(() => setShowSaveNotice(false), 1000);
  };

  // API 카테고리를 UI 카테고리로 매핑
  const mapApiCategoryToUICategory = (apiCategory: string): "착한 가격" | "친환경" | "복지 실천" => {
    switch (apiCategory) {
      case "good-price": return "착한 가격";
      case "eco-friendly": return "친환경";
      case "welfare": return "복지 실천";
      default: return "착한 가격";
    }
  };

  // 가게 이미지 매핑
  const getStoreImage = (storeId: string) => {
    switch (storeId) {
      case "store1": return store1;
      case "store2": return store2;
      case "store3": return store3;
      default: return store1;
    }
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    return () => {
      if (verifyTimerRef.current) window.clearTimeout(verifyTimerRef.current);
      if (saveTimerRef.current) window.clearTimeout(saveTimerRef.current);
    };
  }, []);

  return (
    <div
      className={`absolute inset-0 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={open ? "false" : "true"}
    >
      {/* 오버레이 (부모 영역만 덮음) */}
      <div
        className={`absolute inset-0 duration-300 z-10 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* 패널: 부모 영역의 70% */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // 내부 클릭은 닫힘 방지
        className={`
          absolute left-0 right-0 bottom-0 z-20
          h-[70%] bg-white rounded-t-2xl shadow-xl
          transition-transform duration-300 ease-out
          ${open ? "translate-y-0" : "translate-y-full"}
          flex flex-col 
        `}
      >
        {/* 핸들 */}
        <div className="w-full flex justify-center pt-3 pb-2 shrink-0">
          <span className="block h-1.5 w-12 rounded-full bg-gray-300" />
        </div>

        {/* 내용: 남은 영역 스크롤 */}
        <div className="flex-1 overflow-auto px-4 pb-6">
          {selectedStore ? (
            <div className="space-y-4">
              {/* API 데이터인지 기존 StoreData인지 확인 */}
              {'lat' in selectedStore ? (
                // API 데이터인 경우
                <PlaceCard
                  id={`store${selectedStore.id}`}
                  name={selectedStore.name}
                  address={`${selectedStore.lat}, ${selectedStore.lon}`}
                  category={mapApiCategoryToUICategory(selectedStore.categories[0])}
                  imageUrl={getStoreImage(`store${selectedStore.id}`)}
                />
              ) : (
                // 기존 StoreData인 경우
                <PlaceCard
                  id={selectedStore.id}
                  name={selectedStore.name}
                  address={selectedStore.address}
                  category={selectedStore.category}
                  imageUrl={getStoreImage(selectedStore.id)}
                />
              )}
              
              {/* 뉴스 카드들 - API 데이터의 경우 임시 뉴스 표시 */}
              {'lat' in selectedStore ? (
                // API 데이터인 경우 임시 뉴스 표시
                <div className="space-y-4">
                  <NewsCard
                    id="temp-news-1"
                    title="착한가게 인증 완료"
                    content={`${selectedStore.name}이(가) 착한가게로 인증되었습니다.`}
                    postDate="2024.01.15"
                    imageUrl="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop"
                  />
                  <NewsCard
                    id="temp-news-2"
                    title="평점 정보"
                    content={`현재 평점: ${'⭐'.repeat(Math.floor(selectedStore.score))} ${selectedStore.score}`}
                    postDate="2024.01.10"
                    imageUrl="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop"
                  />
                </div>
              ) : (
                // 기존 StoreData인 경우 기존 뉴스 표시
                mockNewsData[selectedStore.id]?.map((news) => (
                  <NewsCard
                    key={news.id}
                    id={news.id}
                    title={news.title}
                    content={news.content}
                    postDate={news.postDate}
                    imageUrl={news.imageUrl}
                  />
                ))
              )}
            </div>
          ) : (
            children
          )}
        </div>

        {/* '방문 인증하기' 버튼 바로 위에 */}
        <div
          className={`
            pointer-events-none absolute mb-15 left-2 right-4 z-30
            bottom-[calc(80px+env(safe-area-inset-bottom))]
            transition-opacity duration-300
            ${showVerifyNotice ? "opacity-100" : "opacity-0"}
          `}
        >
          <SuccessNotice title="방문 인증" />
        </div>

        {/* '저장하기' 버튼 바로 위에 출력/미출력.
        데이터를 제대로 받아왔다면 SuccessNotice 컴포넌트 렌더링. 제대로 못 받아왔다면 FailuteNotice 컴포넌트 렌더링. */}
        <div
          className={`
            pointer-events-none absolute mb-3 left-2 right-4 z-30
            bottom-[calc(68px+env(safe-area-inset-bottom))]  /* 12(하단) + 56(저장버튼) */
            transition-opacity duration-300
            ${showSaveNotice ? "opacity-100" : "opacity-0"} z-[1120] 
          `}
        >
          <FailureNotice title="저장" /> 
        </div>

        {/* 플로팅 버튼 */}
        <div className="pointer-events-auto absolute left-4 right-4 bottom-[calc(12px+env(safe-area-inset-bottom))] z-[1100]">
          <div className="flex flex-col space-y-3">
            <button
              className="w-full h-14 rounded-2xl bg-cyan-500 text-white font-semibold shadow-lg hover:bg-cyan-600 active:scale-[0.99] transition"
              onClick={handleVerify}
            >
              방문 인증하기
            </button>
            <button
              className="w-full h-14 rounded-2xl bg-gray-100 text-gray-900 font-semibold shadow-md hover:bg-gray-200 active:scale-[0.99] transition"
              onClick={handleSave}
            >
              저장하기
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PinModal;

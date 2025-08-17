// src/components/PinModal.tsx
import React, { useEffect, useRef, useState} from "react";
import SuccessNotice from "./SuccessNotice";

interface PinModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PinModal: React.FC<PinModalProps> = ({ open, onClose, children }) => {
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

      {/* 패널: 부모 높이의 70% */}
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
          {children}
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

        {/* '저장하기' 버튼 바로 위에 */}
        <div
          className={`
            pointer-events-none absolute mb-3 left-2 right-4 z-30
            bottom-[calc(68px+env(safe-area-inset-bottom))]  /* 12(하단) + 56(저장버튼) */
            transition-opacity duration-300
            ${showSaveNotice ? "opacity-100" : "opacity-0"} z-[1120]
          `}
        >
          <SuccessNotice title="저장" />
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

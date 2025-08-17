// src/components/PinModal.tsx
import React, { useEffect, useRef } from "react";

interface PinModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const PinModal: React.FC<PinModalProps> = ({ open, onClose, children }) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    // 부모(.page-content)가 relative 여야 inset-0가 그 부모에 맞습니다.
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
      </div>
    </div>
  );
};

export default PinModal;

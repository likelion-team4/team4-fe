// src/components/FailureNotice.tsx
import React from "react";

type FailureNoticeProps = {
  title: string; // 제목은 외부에서 받음
};

const DEFAULT_MESSAGE = "일시적인 오류가 발생했습니다. 다시 시도해주세요."; // 실패 메시지

const FailureNotice: React.FC<FailureNoticeProps> = ({ title }) => {
  return (
    <div
      className="relative w-full rounded-2xl bg-white shadow-md p-4 pl-6 h-[120px]"
      role="status"
      aria-live="polite"
    >
      {/* 좌측 포인트 바 */}
      <div className="absolute left-2 top-2 bottom-2 w-1.5 bg-red-500 rounded-full" />

      <div className="flex h-full items-center gap-3">
        {/* X 아이콘 */}
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-200">
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6 text-red-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </div>

        {/* 텍스트 */}
        <div className="flex-1">
          <div className="text-[25px] font-semibold text-gray-900 text-left">
            {title} 실패
          </div>
          <div className="mt-0.5 text-sm text-gray-500 text-left">
            {DEFAULT_MESSAGE}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FailureNotice;

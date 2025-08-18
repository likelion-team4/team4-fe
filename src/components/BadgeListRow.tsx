import React from "react";
import { ChevronRight, CircleStar } from "lucide-react";

type Props = { onClick?: () => void };

const BadgeListRow: React.FC<Props> = ({ onClick }) => {
    return (
        <div
            role="button"
            onClick={onClick}
            className="flex w-full items-center justify-between px-4 py-3 cursor-pointer"
        >
            {/* 왼쪽: 아이콘 + 라벨 */}
            <div className="flex items-center gap-2 min-w-0">
                <span className="grid h-10 w-10 place-items-center rounded-md bg-gray-100 shrink-0">
                    <CircleStar className="h-5 w-5 text-black" />
                </span>
                <span className="text-[16px] text-black whitespace-nowrap">뱃지 목록</span>
            </div>

            {/* 오른쪽: 화살표 (왼쪽 그룹 밖!) */}
            <ChevronRight className="h-5 w-5 text-black shrink-0" />
        </div>
    );
};

export default BadgeListRow;
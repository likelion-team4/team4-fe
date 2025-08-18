import React from "react";
import { CalendarHeart } from "lucide-react";

type Props = { count: number };

const VisitCountRow: React.FC<Props> = ({ count }) => {
  return (
    <div className="self-stretch min-w-0 flex w-full items-center gap-3 px-4 py-3 text-left">
      <span className="grid h-10 w-10 place-items-center rounded-md bg-gray-100 shrink-0">
        <CalendarHeart className="h-5 w-5 text-black" />
      </span>
      <p className="text-[16px] text-black truncate">방문 인증 횟수 : {count}</p>
    </div>
  );
};

export default VisitCountRow;
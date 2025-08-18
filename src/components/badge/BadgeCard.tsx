import React from "react";
import { Lock } from "lucide-react";

type Props = {
  title: string;
  icon?: React.ReactNode;
  locked?: boolean;
  bgClassName?: string;
  onClick?: () => void; // 상위에서 이벤트 받음
};

const BadgeCard: React.FC<Props> = ({
  title,
  icon,
  locked = false,
  bgClassName = "bg-gray-50",
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={locked ? undefined : onClick}
      className={[
        "group flex flex-col items-center gap-2 text-center focus:outline-none",
        locked ? "cursor-default" : "cursor-pointer",
      ].join(" ")}
    >
      <div
        className={[
          "relative w-40 h-40 rounded-2xl", 
          "shadow-[0_6px_20px_rgba(0,0,0,0.08)]",
          "transition-all duration-200 ease-out will-change-transform",
          locked
            ? "grayscale opacity-70"
            : "group-hover:-translate-y-0.5 group-hover:shadow-lg group-hover:scale-[1.02] group-hover:bg-[rgba(0,120,248,0.3)]",
          bgClassName,
        ].join(" ")}
      >
        <div className="absolute inset-0 grid place-items-center">
          {icon}
        </div>

        {locked && (
          <div className="absolute inset-0 grid place-items-center">
            <div className="grid h-11 w-11 place-items-center rounded-2xl bg-white/85 shadow">
              <Lock className="h-6 w-6 text-gray-400" />
            </div>
          </div>
        )}
      </div>

      <span className="text-[14px] leading-5 text-black">{title}</span>
    </button>
  );
};

export default BadgeCard;
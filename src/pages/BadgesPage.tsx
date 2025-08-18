import React from "react";
import BadgeCard from "../components/badge/BadgeCard";
import {
  ShoppingBag,
  Heart,
  Trophy,
  CheckCircle,
  Home,
  Store,
} from "lucide-react";

const badges = [
  { title: "착한 가격 1회", locked: true },
  { title: "착한 가격 3회", locked: true },
  { title: "착한 가격 5회", locked: true },
  { title: "친환경 1회", icon: <ShoppingBag className="h-10 w-10 text-green-500" /> },
  { title: "친환경 3회", locked: true },
  { title: "친환경 5회", locked: true },
  { title: "복지 실천 1회", icon: <Heart className="h-10 w-10 text-pink-500" /> },
  { title: "복지 실천 3회", icon: <CheckCircle className="h-10 w-10 text-blue-500" /> },
  { title: "복지 실천 5회", icon: <Trophy className="h-10 w-10 text-amber-500" /> },
  { title: "동네 토박이", icon: <Home className="h-10 w-10 text-yellow-600" />, bgClassName: "bg-yellow-50" },
  { title: "동네 주민", locked: true },
  { title: "착한 가게 첫 방문", icon: <Store className="h-10 w-10 text-indigo-500" /> },
];

const BadgesPage: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-[720px] px-12 pt-6 pb-10">
      <h2 className="mb-4 mt-4 text-[18px] font-semibold text-black">나의 뱃지</h2>

      <div className="grid grid-cols-3 gap-x-4 gap-y-6">
        {badges.map((b) => (
          <BadgeCard
            key={b.title}
            title={b.title}
            icon={b.icon}
            locked={!!b.locked}
            bgClassName={b.bgClassName}
          />
        ))}
      </div>
    </div>
  );
};

export default BadgesPage;
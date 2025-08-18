import React from "react";
import goodPriceIcon from "../assets/착한가격.png";
import ecoIcon from "../assets/친환경.png";
import welfareIcon from "../assets/복지실천.png";

interface PlaceCardProps {
  name: string;
  address: string;
  category: "착한 가격" | "친환경" | "복지 실천";
  imageUrl: string;
  onClick?: () => void;
}

const categoryIcons: Record<PlaceCardProps["category"], string> = {
  "착한 가격": goodPriceIcon,
  "친환경": ecoIcon,
  "복지 실천": welfareIcon,
};

const PlaceCard: React.FC<PlaceCardProps> = ({
  name,
  address,
  category,
  imageUrl,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-none bg-white px-4 py-3 h-36
                  transition-all duration-200  hover:bg-gray-100 hover:scale-[1.01] cursor-pointer"
    >
      {/* 왼쪽 텍스트 */}
      <div className="min-w-0 flex-1 text-left">
        <h2 className="text-[25px] font-extrabold text-gray-900 truncate">{name}</h2>
        <p className="mt-2 text-[17px] text-gray-500 truncate">{address}</p>

        <div className="mt-4 flex items-center">
          <img
            src={categoryIcons[category]}
            alt={`${category} 아이콘`}
            className="h-8 w-8 rounded-full object-contain"
          />
          <span className="ml-3 text-[15px] font-medium text-gray-800">{category}</span>
        </div>
      </div>

      {/* 오른쪽 가게 이미지 */}
      <div className="ml-6 h-28 w-40 flex-shrink-0 translate-x-2">
        <img
          src={imageUrl}
          alt={name}
          className="h-full w-full rounded-lg object-cover"
        />
      </div>
    </div>
  );
};

export default PlaceCard;
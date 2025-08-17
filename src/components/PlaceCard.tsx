import React from "react";
import goodPriceIcon from "../assets/착한가격.png";
import ecoIcon from "../assets/친환경.png";
import welfareIcon from "../assets/복지실천.png";

interface PlaceCardProps {
  name: string;
  address: string;
  category: string;
  imageUrl: string;
}

const PlaceCard: React.FC<PlaceCardProps> = ({ name, address, category, imageUrl }) => {
  // 카테고리 → 아이콘 매핑
  const categoryIcons: Record<string, string> = {
    "착한 가격": goodPriceIcon,
    "친환경": ecoIcon,
    "복지실천": welfareIcon,
  };
  
  return (
    <div className="flex items-center justify-between bg-white rounded-none shadow-md w-full h-40 px-15 
    transition-all duration-300 hover:shadow-lg hover:bg-gray-50 hover:scale-[1.01] cursor-pointer">
      {/* 왼쪽 텍스트 영역 (padding-left 추가) */}
      <div className="flex-1 min-w-0 text-left">
        <h1 className="text-[25px] font-bold text-gray-900">{name}</h1>
        <p className="text-[17px] text-sm text-gray-500 mt-2">{address}</p>
        <div className="flex items-center mt-4 w-50">
          {categoryIcons[category] && (
            <div className="w-12 h-12 rounded-4xl">
              <img src={categoryIcons[category]} alt={`${category} 아이콘`}></img>
            </div>
          )}

          <span className="text-[15px] inline-block text-gray-800 text-xs font-medium px-2 py-1">
            {category}
          </span>
        </div>
      </div>

      {/* 오른쪽 가게 이미지 */}
      <div className="w-40 h-35 flex-shrink-0 translate-x-10">
        <img
          src={imageUrl}
          alt={name}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default PlaceCard;

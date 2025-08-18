import React from "react";

interface NewsCardProps {
  title: string;
  content: string;
  postDate: string;
  imageUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ title, content, postDate, imageUrl }) => {

  return (
    <div className="flex items-center justify-between bg-white rounded-none shadow-md w-full h-40 px-15 border-t
    transition-all duration-300 hover:shadow-lg hover:bg-gray-50 hover:scale-[1.01] cursor-pointer" style={{borderTopColor: "#64748B", borderTopWidth: "2px"}}>
      
      {/* 왼쪽 텍스트 영역 (padding-left 추가) */}
      <div className="flex-1 min-w-0 text-left">
        <h1 className="text-[25px] font-bold text-gray-900 whitespace-nowrap w-full">{title}</h1>
        <p className="text-[17px] text-sm text-gray-500 mt-2 truncate whitespace-nowrap overflow-hidden w-full">{content}</p>
        <div className="flex items-center mt-4 w-50">
          <span className="text-[15px] inline-block text-gray-800 text-xs font-medium py-1 truncate whitespcae-nowrap overflow-hidden w-full">
            {postDate}
          </span>
        </div>
      </div>

      {/* 오른쪽 가게 이미지 */}
      <div className="w-40 h-35 flex-shrink-0 translate-x-10">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default NewsCard;

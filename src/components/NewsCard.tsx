import React from "react";
import { useNavigate } from "react-router-dom";

interface NewsCardProps {
  id: string;
  title: string;
  content: string;
  postDate: string;
  imageUrl: string;
}

const NewsCard: React.FC<NewsCardProps> = ({ id, title, content, postDate, imageUrl }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/news/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="flex w-full items-center justify-between rounded-none bg-white px-4 py-3 h-36
                  transition-all duration-200  hover:bg-gray-100 hover:scale-[1.01] cursor-pointer" style={{borderTopColor: "#64748B", borderTopWidth: "1px"}}>
      
      {/* 왼쪽 텍스트 영역 (padding-left 추가) */}
      <div className="min-w-0 flex-1 text-left">
        <h1 className="text-[25px] font-extrabold text-gray-900 truncate">{title}</h1>
        <p className="mt-2 text-[17px] text-gray-500 truncate">{content}</p>
        <div className="flex items-center mt-4 w-50">
          <span className="text-[15px] inline-block text-gray-800 text-xs font-medium py-1 truncate whitespcae-nowrap overflow-hidden w-full">
            {postDate}
          </span>
        </div>
      </div>

      {/* 오른쪽 가게 이미지 */}
      <div className="ml-6 h-28 w-40 flex-shrink-0 translate-x-2">
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

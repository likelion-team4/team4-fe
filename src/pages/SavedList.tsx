import React from "react";
import PlaceCard from "../components/PlaceCard";
import store1 from "../assets/store1.png";
import store2 from "../assets/store2.png";
import store3 from "../assets/store3.png";

// 저장된 가게 더미 데이터 (추후 서버/로컬스토리지 연동)
const savedPlaces = [
  {
    name: "신호등 찜닭",
    address: "대구 북구 대현동 OO로 12",
    category: "착한 가격" as const,
    imageUrl: store1,
  },
  {
    name: "맛있닭 치킨",
    address: "대구 북구 대현동 OO로 20",
    category: "친환경" as const,
    imageUrl: store2,
  },
  {
    name: "썬더 닭강정",
    address: "대구 북구 대현동 OO로 125",
    category: "복지 실천" as const,
    imageUrl: store3,
  },
];

const SavedList: React.FC = () => {
  return (
    <div className="mx-auto w-full max-w-[720px] px-6 pt-6 pb-24">
      <h2 className="mb-6 text-xl font-bold text-gray-900">저장 목록</h2>

      {savedPlaces.length > 0 ? (
        <div className="flex flex-col gap-6">
          {savedPlaces.map((place) => (
            <PlaceCard
              key={place.name}
              name={place.name}
              address={place.address}
              category={place.category}
              imageUrl={place.imageUrl}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">저장한 가게가 없습니다.</p>
      )}
    </div>
  );
};

export default SavedList;
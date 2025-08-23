
import React, { useState } from "react";

import PlaceCard from "../components/PlaceCard";
import PinModal from "../components/PinModal";
import type { StoreData } from "../data/mockData";

import store1 from "../assets/store1.png";
import store2 from "../assets/store2.png";
import store3 from "../assets/store3.png";

// 저장된 가게 더미 데이터 (추후 서버/로컬스토리지 연동)
const savedPlaces = [
  {
    id: "saved1", // id 추가
    name: "화랑 찜닭",
    address: "대구 북구 대현동 OO로 12",
    category: "착한 가격" as const,
    imageUrl: store1,
  },
  {
    id: "saved2",
    name: "맛있닭 치킨",
    address: "대구 북구 대현동 OO로 20",
    category: "친환경" as const,
    imageUrl: store2,
  },
  {
    id: "saved3",
    name: "썬더 닭강정",
    address: "대구 북구 대현동 OO로 125",
    category: "복지 실천" as const,
    imageUrl: store3,
  },
];

// PinModal 쪽에서 기대하는 키로 매핑 (mockNewsData, 이미지 매핑과 맞추기)
const idAlias: Record<string, string> = {
  saved1: "store1",
  saved2: "store2",
  saved3: "store3",
};

const SavedList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>(undefined);

  const openModalWith = (p: typeof savedPlaces[number]) => {
    const mappedId = idAlias[p.id] ?? p.id;
    const store: StoreData = {
      id: mappedId,                
      name: p.name,
      address: p.address,
      category: p.category,        // "착한 가격" | "친환경" | "복지 실천"
      imageUrl: p.imageUrl,        

    };
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto w-full max-w-[720px] px-6 pt-6 pb-24">
      <h2 className="mb-6 text-xl font-bold text-gray-900">저장 목록</h2>

      {savedPlaces.length > 0 ? (
        <div className="flex flex-col gap-6">
          {savedPlaces.map((place) => (
            <PlaceCard
              key={place.id}
              id={place.id}
              name={place.name}
              address={place.address}
              category={place.category}
              imageUrl={place.imageUrl}
              onClick={() => openModalWith(place)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">저장한 가게가 없습니다.</p>
      )}

      {/* 카드 클릭 시 뜨는 모달 */}
      <PinModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStore(undefined);
        }}
        selectedStore={selectedStore}
      />
    </div>
  );
};

export default SavedList;
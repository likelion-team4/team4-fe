import React, { useState } from "react";
import PlaceCard from "../components/PlaceCard";
import PinModal from "../components/PinModal";
import { mockStoreData, type StoreData } from "../data/mockData";

// 로컬 썸네일을 쓰고 싶으면 아래처럼 별도 매핑 (선택)
import store1 from "../assets/store1.png";
import store2 from "../assets/store2.png";
import store3 from "../assets/store3.png";

// 저장된 가게 id 목록 (임시)
const savedIds = ["store1", "store2", "store3"] as const;

// 화면에 보여줄 카드 데이터 구성
const savedPlaces: Array<StoreData & { imageUrl?: string }> = savedIds
  .map((id) => mockStoreData[id])
  .map((s, idx) => ({
    ...s,
    // PlaceCard는 imageUrl을 쓰고, mock은 heroUrl이므로 매핑
    imageUrl: [store1, store2, store3][idx] ?? s.heroUrl, // 로컬 이미지 우선, 없으면 heroUrl
  }));

const SavedList: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>(undefined);

  const openModalWith = (store: StoreData) => {
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
              imageUrl={place.imageUrl ?? place.heroUrl}
              onClick={() => openModalWith(place)}
            />
          ))}
        </div>
      ) : (
        <p className="text-gray-500">저장한 가게가 없습니다.</p>
      )}

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
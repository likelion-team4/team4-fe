import React, { useState } from 'react';
import PinModal from '../components/PinModal';
import PlaceCard from '../components/PlaceCard';
import { mockStoreData } from '../data/mockData';
import type { StoreData } from '../data/mockData';
import store1 from '../assets/store1.png';
import store2 from '../assets/store2.png';
import store3 from '../assets/store3.png';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>(undefined);

  const storeData = [
    {
      id: "store1",
      name: "신호등 찜닭",
      address: "대구 북구 대현동 OO로 12",
      category: "착한 가격" as const,
      imageUrl: store1
    }
  ];

  const handleStoreClick = (storeId: string) => {
    const store = mockStoreData[storeId];
    if (store) {
      setSelectedStore(store);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="page-content p-4">
      <h2 className="text-2xl font-bold mb-4">홈 페이지</h2>
      <p className="mb-6">우리동네착한가게 홈 페이지입니다.</p>
      
      {/* 가게 목록 */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">주변 착한가게</h3>
        {storeData.map((store) => (
          <PlaceCard
            key={store.id}
            id={store.id}
            name={store.name}
            address={store.address}
            category={store.category}
            imageUrl={store.imageUrl}
            onClick={() => handleStoreClick(store.id)}
          />
        ))}
      </div>

      {/* PinModal */}
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

export default Home;

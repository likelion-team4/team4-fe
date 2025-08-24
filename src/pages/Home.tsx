import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import StoreList from '../components/StoreList';

const Home: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // 사용자 위치 가져오기
  const getUserLocation = (): Promise<{ lat: number; lng: number }> => {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser.'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          resolve({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
          reject(error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5분
        }
      );
    });
  };

  useEffect(() => {
    const loadUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        console.log('사용자 위치:', location);
      } catch (error) {
        console.log('위치 정보를 가져올 수 없습니다.');
        setUserLocation(null);
      }
    };

    loadUserLocation();
  }, []);

  return (
    <div className="page-content">
      {/* 지도 컴포넌트 */}
      <div className="map-section">
        <Map 
          center={userLocation || { lat: 37.5665, lng: 126.9780 }}
          zoom={15}
          selectedCategory={selectedCategory}
        />
      </div>
      
      {/* 착한가게 목록 컴포넌트 */}
      <StoreList 
        userLocation={userLocation || undefined} 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
=======
import React, { useState } from 'react';
import PinModal from '../components/PinModal';
import PlaceCard from '../components/PlaceCard';
import { mockStoreData } from '../data/mockData';
import type { StoreData } from '../data/mockData';
import store1 from '../assets/store1.png';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>(undefined);

  const storeData = [
    {
      id: "store1",
      name: "화랑 찜닭",
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

import React, { useState, useEffect } from 'react';
import Map from '../components/Map';
import StoreList from '../components/StoreList';
import PinModal from '../components/PinModal';
import type { StoreData } from '../data/mockData';

// API에서 받아오는 가게 데이터 타입
interface ApiStoreData {
  id: number;
  name: string;
  lat: number;
  lon: number;
  score: number;
  categories: string[];
}

const Home: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isPinModalOpen, setIsPinModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | ApiStoreData | undefined>(undefined);

  // PinModal 열기 핸들러
  const handlePinModalOpen = (store: StoreData | ApiStoreData) => {
    console.log('🏪 PinModal 열기:', store);
    setSelectedStore(store);
    setIsPinModalOpen(true);
  };

  // PinModal 닫기 핸들러
  const handlePinModalClose = () => {
    setIsPinModalOpen(false);
    setSelectedStore(undefined);
  };

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
          maximumAge: 300000, // 5분
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
      } catch {
        console.log('위치 정보를 가져올 수 없습니다.');
        setUserLocation(null);
      }
    };

    loadUserLocation();
  }, []);

  return (
    <div className="w-full">
      {/* 지도 영역 */}
      <div className="w-full h-[50vh] min-h-[300px]">
        <Map
          center={userLocation || { lat: 37.5665, lng: 126.9780 }}
          zoom={15}
          selectedCategory={selectedCategory}
          onPinModalOpen={handlePinModalOpen}
        />
      </div>

      {/* 착한가게 목록 */}
      <StoreList
        userLocation={userLocation || undefined}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* PinModal */}
      <PinModal
        open={isPinModalOpen}
        onClose={handlePinModalClose}
        selectedStore={selectedStore}
      />
    </div>
  );
};

export default Home;
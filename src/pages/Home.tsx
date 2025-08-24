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
      />
    </div>
  );
};

export default Home;

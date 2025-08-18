import React, { useState } from 'react';
import Map from '../components/Map';
import StoreList from '../components/StoreList';

const Home: React.FC = () => {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  return (
    <div className="page-content">
      {/* 지도 컴포넌트 */}
      <div className="map-section">
        <Map 
          center={{ lat: 37.5665, lng: 126.9780 }} // 서울 시청
          zoom={15}
        />
      </div>
      
      {/* 착한가게 목록 컴포넌트 */}
      <StoreList userLocation={userLocation || undefined} />
    </div>
  );
};

export default Home;

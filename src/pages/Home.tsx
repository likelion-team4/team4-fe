import React from 'react';
import Map from '../components/Map';

const Home: React.FC = () => {
  return (
    <div className="page-content">
      {/* 지도 컴포넌트만 표시 */}
      <Map 
        center={{ lat: 37.5665, lng: 126.9780 }} // 서울 시청
        zoom={15}
      />
    </div>
  );
};

export default Home;

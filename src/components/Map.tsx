import React, { useEffect, useRef, useState } from 'react';

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ 
  center = { lat: 37.5665, lng: 126.9780 }, // 서울 시청 기본 위치
  zoom = 15 
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    // 사용자 위치 가져오기
    const loadUserLocation = async () => {
      try {
        const location = await getUserLocation();
        setUserLocation(location);
        console.log('사용자 위치:', location);
      } catch (error) {
        console.log('기본 위치(서울 시청)를 사용합니다.');
        setUserLocation(center);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserLocation();
  }, [center]);

  useEffect(() => {
    if (isLoading) return; // 위치 로딩 중이면 지도 초기화하지 않음

    // 새로운 네이버 Maps API v3 스크립트 로드
    const loadNaverMap = () => {
      if (window.naver && window.naver.maps) {
        initializeMap();
      } else {
        const script = document.createElement('script');
        script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${import.meta.env.VITE_NAVER_CLIENT_ID}`;
        script.onload = () => {
          if (window.naver && window.naver.maps) {
            initializeMap();
          }
        };
        script.onerror = () => {
          console.error('네이버 지도 API 로드 실패');
        };
        document.head.appendChild(script);
      }
    };

    // 지도 초기화
    const initializeMap = () => {
      if (!mapRef.current || !window.naver || !window.naver.maps) return;

      // 사용자 위치 또는 기본 위치 사용
      const mapCenter = userLocation || center;

      const mapOptions = {
        center: new window.naver.maps.LatLng(mapCenter.lat, mapCenter.lng),
        zoom: zoom,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.DROPDOWN
        },
        zoomControl: true,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.SMALL,
          position: window.naver.maps.Position.TOP_RIGHT
        },
        scaleControl: true,
        logoControl: false,
        mapDataControl: false,
        clickableIcon: true
      };

      try {
        mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, mapOptions);
        
        // 사용자 위치에 마커 추가
        if (userLocation) {
          const marker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(userLocation.lat, userLocation.lng),
            map: mapInstanceRef.current,
            title: '내 위치'
          });
        }
      } catch (error) {
        console.error('지도 초기화 실패:', error);
      }
    };

    loadNaverMap();

    // 컴포넌트 언마운트 시 정리
    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (error) {
          console.error('지도 정리 실패:', error);
        }
      }
    };
  }, [userLocation, center.lat, center.lng, zoom, isLoading]);

  return (
    <div className="map-container">
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-text">위치 정보를 가져오는 중...</div>
        </div>
      )}
      <div 
        ref={mapRef} 
        className="naver-map"
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

// TypeScript를 위한 전역 타입 선언
declare global {
  interface Window {
    naver: {
      maps: {
        Map: any;
        LatLng: any;
        Marker: any;
        MapTypeControlStyle: any;
        ZoomControlStyle: any;
        Position: any;
      };
    };
  }
}

export default Map;

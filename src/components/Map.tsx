import React, { useEffect, useRef } from 'react';

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

  useEffect(() => {
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

      const mapOptions = {
        center: new window.naver.maps.LatLng(center.lat, center.lng),
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
  }, [center.lat, center.lng, zoom]);

  return (
    <div className="map-container">
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
        MapTypeControlStyle: any;
        ZoomControlStyle: any;
        Position: any;
      };
    };
  }
}

export default Map;

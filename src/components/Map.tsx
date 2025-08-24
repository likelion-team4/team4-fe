import React, { useEffect, useRef, useState } from 'react';

interface Store {
  id: number;
  name: string;
  lat: number;
  lon: number;
  score: number;
  categories: string[];
}

interface MapProps {
  center?: { lat: number; lng: number };
  zoom?: number;
  selectedCategory?: string;
}

const Map: React.FC<MapProps> = ({ 
  center = { lat: 37.5665, lng: 126.9780 }, // 서울 시청 기본 위치
  zoom = 15,
  selectedCategory = 'all'
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [stores, setStores] = useState<Store[]>([]);
  const markersRef = useRef<any[]>([]);

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

  // API에서 가게 데이터 가져오기
  const fetchStores = async (category: string = 'all') => {
    try {
      // 실제 API 서버가 없으므로 더미 데이터 사용
      // TODO: 실제 API 서버 연동 시 아래 주석 해제
      /*
      const url = category === 'all' 
        ? '/api/stores' 
        : `/api/stores?categories=${category}`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('가게 데이터를 가져올 수 없습니다.');
      }
      
      const data = await response.json();
      setStores(data);
      addStoreMarkers(data);
      return;
      */

      // 더미 데이터 생성
      const dummyStores: Store[] = [
        {
          id: 1,
          name: "종이밥",
          lat: 37.5665,
          lon: 126.9780,
          score: 4.5,
          categories: ["good-price"]
        },
        {
          id: 2,
          name: "덤브치킨",
          lat: 37.5668,
          lon: 126.9785,
          score: 4.2,
          categories: ["eco-friendly"]
        },
        {
          id: 3,
          name: "신호등찜닭",
          lat: 37.5662,
          lon: 126.9775,
          score: 4.7,
          categories: ["welfare"]
        },
        {
          id: 4,
          name: "맛있닭",
          lat: 37.5670,
          lon: 126.9790,
          score: 4.3,
          categories: ["good-price", "eco-friendly"]
        },
        {
          id: 5,
          name: "행컵",
          lat: 37.5660,
          lon: 126.9770,
          score: 4.6,
          categories: ["welfare", "eco-friendly"]
        },
        {
          id: 6,
          name: "착한카페",
          lat: 37.5672,
          lon: 126.9788,
          score: 4.4,
          categories: ["good-price", "welfare"]
        }
      ];

      // 카테고리 필터링
      const filteredStores = category === 'all' 
        ? dummyStores 
        : dummyStores.filter(store => store.categories.includes(category));

      setStores(filteredStores);
      addStoreMarkers(filteredStores);
      
    } catch (error) {
      console.error('가게 데이터 로드 실패:', error);
      // 에러 발생 시에도 더미 데이터 사용
      const fallbackStores: Store[] = [
        {
          id: 1,
          name: "종이밥",
          lat: 37.5665,
          lon: 126.9780,
          score: 4.5,
          categories: ["good-price"]
        }
      ];
      setStores(fallbackStores);
      addStoreMarkers(fallbackStores);
    }
  };

  // 지도에 가게 핀 추가
  const addStoreMarkers = (storeData: Store[]) => {
    if (!mapInstanceRef.current || !window.naver || !window.naver.maps) return;

    // 기존 마커들 제거
    markersRef.current.forEach(marker => {
      marker.setMap(null);
    });
    markersRef.current = [];

    // 새로운 마커들 추가
    storeData.forEach(store => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(store.lat, store.lon),
        map: mapInstanceRef.current,
        title: store.name,
        icon: {
          content: `
            <div style="
              background: #4CAF50; 
              color: white; 
              padding: 8px 12px; 
              border-radius: 20px; 
              font-size: 12px; 
              font-weight: bold;
              box-shadow: 0 2px 4px rgba(0,0,0,0.3);
              white-space: nowrap;
            ">
              ${store.name}
            </div>
          `,
          size: new window.naver.maps.Size(0, 0),
          anchor: new window.naver.maps.Point(0, 0)
        }
      });

      // 마커 클릭 이벤트
      window.naver.maps.Event.addListener(marker, 'click', () => {
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `
            <div style="padding: 10px; min-width: 200px;">
              <h3 style="margin: 0 0 8px 0; color: #333;">${store.name}</h3>
              <p style="margin: 0 0 5px 0; color: #666;">평점: ${'⭐'.repeat(Math.floor(store.score))} ${store.score}</p>
              <p style="margin: 0; color: #666;">카테고리: ${store.categories.join(', ')}</p>
            </div>
          `
        });
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
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
          const userMarker = new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(userLocation.lat, userLocation.lng),
            map: mapInstanceRef.current,
            title: '내 위치',
            icon: {
              content: `
                <div style="
                  background: #2196F3; 
                  color: white; 
                  padding: 8px 12px; 
                  border-radius: 50%; 
                  font-size: 12px; 
                  font-weight: bold;
                  box-shadow: 0 2px 4px rgba(0,0,0,0.3);
                ">
                  📍
                </div>
              `,
              size: new window.naver.maps.Size(0, 0),
              anchor: new window.naver.maps.Point(0, 0)
            }
          });
        }

        // 가게 데이터 로드
        fetchStores(selectedCategory);
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
  }, [userLocation, center.lat, center.lng, zoom, isLoading, selectedCategory]);

  // 카테고리 변경 시 가게 데이터 다시 로드
  useEffect(() => {
    if (mapInstanceRef.current) {
      fetchStores(selectedCategory);
    }
  }, [selectedCategory]);

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
        InfoWindow: any;
        Event: any;
        Size: any;
        Point: any;
        MapTypeControlStyle: any;
        ZoomControlStyle: any;
        Position: any;
      };
    };
  }
}

export default Map;

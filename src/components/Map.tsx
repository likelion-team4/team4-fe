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
  selectedCategory = 'all',
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
        ({ coords }) => resolve({ lat: coords.latitude, lng: coords.longitude }),
        (error) => {
          console.error('위치 정보를 가져올 수 없습니다:', error);
          reject(error);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 300000 },
      );
    });
  };

  // API에서 가게 데이터 가져오기 (더미)
  const fetchStores = async (category: string = 'all') => {
    try {
      const dummyStores: Store[] = [
        { id: 1, name: '종이밥',     lat: 37.5665, lon: 126.9780, score: 4.5, categories: ['good-price'] },
        { id: 2, name: '덤브치킨',   lat: 37.5668, lon: 126.9785, score: 4.2, categories: ['eco-friendly'] },
        { id: 3, name: '신호등찜닭', lat: 37.5662, lon: 126.9775, score: 4.7, categories: ['welfare'] },
        { id: 4, name: '맛있닭',     lat: 37.5670, lon: 126.9790, score: 4.3, categories: ['good-price', 'eco-friendly'] },
        { id: 5, name: '행컵',       lat: 37.5660, lon: 126.9770, score: 4.6, categories: ['welfare', 'eco-friendly'] },
        { id: 6, name: '착한카페',   lat: 37.5672, lon: 126.9788, score: 4.4, categories: ['good-price', 'welfare'] },
      ];

      const filtered = category === 'all'
        ? dummyStores
        : dummyStores.filter(s => s.categories.includes(category));

      setStores(filtered);
      addStoreMarkers(filtered);
    } catch (e) {
      console.error('가게 데이터 로드 실패:', e);
      const fallback: Store[] = [
        { id: 1, name: '종이밥', lat: 37.5665, lon: 126.9780, score: 4.5, categories: ['good-price'] },
      ];
      setStores(fallback);
      addStoreMarkers(fallback);
    }
  };

  // 지도에 가게 핀 추가
  const addStoreMarkers = (data: Store[]) => {
    if (!mapInstanceRef.current || !window.naver || !window.naver.maps) return;

    // 기존 마커 제거
    markersRef.current.forEach(m => m.setMap(null));
    markersRef.current = [];

    data.forEach(store => {
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(store.lat, store.lon),
        map: mapInstanceRef.current,
        title: store.name,
        icon: {
          content: `
            <div style="
              background:#4CAF50;color:#fff;padding:8px 12px;border-radius:20px;
              font-size:12px;font-weight:700;box-shadow:0 2px 4px rgba(0,0,0,.3);
              white-space:nowrap;">
              ${store.name}
            </div>
          `,
          size: new window.naver.maps.Size(0, 0),
          anchor: new window.naver.maps.Point(0, 0),
        },
      });

      window.naver.maps.Event.addListener(marker, 'click', () => {
        const infoWindow = new window.naver.maps.InfoWindow({
          content: `
            <div style="padding:10px;min-width:200px;">
              <h3 style="margin:0 0 8px;color:#333;">${store.name}</h3>
              <p style="margin:0 0 5px;color:#666;">평점: ${'⭐'.repeat(Math.floor(store.score))} ${store.score}</p>
              <p style="margin:0;color:#666;">카테고리: ${store.categories.join(', ')}</p>
            </div>
          `,
        });
        infoWindow.open(mapInstanceRef.current, marker);
      });

      markersRef.current.push(marker);
    });
  };

  // 사용자 위치 먼저
  useEffect(() => {
    const run = async () => {
      try {
        const loc = await getUserLocation();
        setUserLocation(loc);
      } catch {
        setUserLocation(center); // 실패 시 기본 위치
      } finally {
        setIsLoading(false);
      }
    };
    run();
  }, [center]);

  // 네이버 지도 로드 & 초기화
  useEffect(() => {
    if (isLoading) return;

    const initMap = () => {
      if (!mapRef.current || !window.naver || !window.naver.maps) return;

      const mapCenter = userLocation || center;
      const mapOptions = {
        center: new window.naver.maps.LatLng(mapCenter.lat, mapCenter.lng),
        zoom,
        mapTypeControl: true,
        mapTypeControlOptions: { style: window.naver.maps.MapTypeControlStyle.DROPDOWN },
        zoomControl: true,
        zoomControlOptions: { style: window.naver.maps.ZoomControlStyle.SMALL, position: window.naver.maps.Position.TOP_RIGHT },
        scaleControl: true,
        logoControl: false,
        mapDataControl: false,
        clickableIcon: true,
      };

      try {
        mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, mapOptions);

        // 내 위치 마커
        if (userLocation) {
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(userLocation.lat, userLocation.lng),
            map: mapInstanceRef.current,
            title: '내 위치',
            icon: {
              content: `
                <div style="
                  background:#2196F3;color:#fff;padding:8px 12px;border-radius:50%;
                  font-size:12px;font-weight:700;box-shadow:0 2px 4px rgba(0,0,0,.3);
                  display:grid;place-items:center;">
                  📍
                </div>
              `,
              size: new window.naver.maps.Size(0, 0),
              anchor: new window.naver.maps.Point(0, 0),
            },
          });
        }

        // 매장 로드
        fetchStores(selectedCategory);
      } catch (e) {
        console.error('지도 초기화 실패:', e);
      }
    };

    const loadScript = () => {
      if (window.naver && window.naver.maps) {
        initMap();
        return;
      }
      const script = document.createElement('script');
      // NOTE: ncpClientId 사용
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${import.meta.env.VITE_NAVER_CLIENT_ID}`;
      script.async = true;
      script.onload = () => (window.naver && window.naver.maps ? initMap() : null);
      script.onerror = () => console.error('네이버 지도 API 로드 실패');
      document.head.appendChild(script);
    };

    loadScript();

    return () => {
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
        } catch (e) {
          console.error('지도 정리 실패:', e);
        }
      }
    };
  }, [userLocation, center.lat, center.lng, zoom, isLoading, selectedCategory]);

  // 카테고리 변경 시 재로딩 (지도 이미 있고 나서)
  useEffect(() => {
    if (mapInstanceRef.current) {
      fetchStores(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <div className="relative h-full w-full">
      {isLoading && (
        <div className="absolute inset-0 z-10 grid place-items-center bg-white/90">
          <div className="rounded-lg bg-green-500 px-5 py-3 text-sm font-medium text-white shadow">
            위치 정보를 가져오는 중...
          </div>
        </div>
      )}
      <div ref={mapRef} className="h-full w-full" />
    </div>
  );
};

// 전역 타입 선언
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
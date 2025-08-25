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
  // 컴포넌트 시작 시 환경 변수 확인
  console.log('🗺️ Map 컴포넌트 시작');
  console.log('🔍 VITE_NAVER_CLIENT_ID:', import.meta.env.VITE_NAVER_CLIENT_ID);
  console.log('🔍 import.meta.env:', import.meta.env);
  
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
    console.log('🔍 Map 컴포넌트 useEffect 시작');
    console.log('🔍 isLoading 상태:', isLoading);
    
    if (isLoading) {
      console.log('⏳ 위치 정보 로딩 중이므로 지도 초기화 건너뜀');
      return;
    }

    const initMap = () => {
      console.log('🗺️ initMap 함수 시작');
      console.log('🔍 mapRef.current:', mapRef.current);
      console.log('🔍 window.naver:', window.naver);
      console.log('🔍 window.naver.maps:', window.naver?.maps);
      
      if (!mapRef.current || !window.naver || !window.naver.maps) {
        console.error('❌ 지도 초기화 실패: mapRef 또는 naver maps가 없음');
        console.error('❌ mapRef.current:', mapRef.current);
        console.error('❌ window.naver:', window.naver);
        console.error('❌ window.naver.maps:', window.naver?.maps);
        return;
      }

      const mapCenter = userLocation || center;
      console.log('📍 지도 중심점:', mapCenter);
      
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
        console.log('🗺️ 지도 인스턴스 생성 시도...');
        console.log('🔍 mapOptions:', mapOptions);
        mapInstanceRef.current = new window.naver.maps.Map(mapRef.current, mapOptions);
        console.log('✅ 지도 인스턴스 생성 성공!');
        console.log('🔍 mapInstanceRef.current:', mapInstanceRef.current);

        // 내 위치 마커
        if (userLocation) {
          console.log('📍 내 위치 마커 추가:', userLocation);
          new window.naver.maps.Marker({
            position: new window.naver.maps.LatLng(userLocation.lat, userLocation.lng),
            map: mapInstanceRef.current,
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
        console.log('🏪 매장 데이터 로드 시작');
        fetchStores(selectedCategory);
      } catch (e) {
        console.error('❌ 지도 초기화 실패:', e);
        console.error('❌ 에러 상세:', (e as Error).message);
        console.error('❌ 에러 스택:', (e as Error).stack);
      }
    };

    const loadScript = () => {
      console.log('📜 loadScript 함수 시작');
      
      if (window.naver && window.naver.maps) {
        console.log('✅ 네이버 지도 API 이미 로드됨');
        initMap();
        return;
      }
      
      console.log('📥 네이버 지도 API 스크립트 로드 시작...');
      const script = document.createElement('script');
      
      // 실제 환경 변수에서 API 키 읽기
      const apiKey = import.meta.env.VITE_NAVER_CLIENT_ID || 'g9fajjfgo5';
      console.log('🔑 === API 키 디버깅 ===');
      console.log('🔑 import.meta.env.VITE_NAVER_CLIENT_ID:', import.meta.env.VITE_NAVER_CLIENT_ID);
      console.log('🔑 최종 사용할 API 키:', apiKey);
      console.log('🔑 API 키 확인:', apiKey ? '설정됨' : '설정되지 않음');
      console.log('🔑 ======================');
      
      // 직접 API 키 사용
      const finalApiKey = 'g9fajjfgo5';
      console.log('🔑 최종 사용할 API 키 (Client ID):', finalApiKey);
      
      // 지도 로딩 직전 VITE_NAVER_CLIENT_ID 로그
      console.log('🔍 === 지도 로딩 직전 환경 변수 확인 ===');
      console.log('🔍 VITE_NAVER_CLIENT_ID:', import.meta.env.VITE_NAVER_CLIENT_ID);
      console.log('🔍 VITE_NAVER_CLIENT_ID 타입:', typeof import.meta.env.VITE_NAVER_CLIENT_ID);
      console.log('🔍 VITE_NAVER_CLIENT_ID 길이:', import.meta.env.VITE_NAVER_CLIENT_ID?.length);
      console.log('🔍 VITE_NAVER_CLIENT_ID === undefined:', import.meta.env.VITE_NAVER_CLIENT_ID === undefined);
      console.log('🔍 VITE_NAVER_CLIENT_ID === null:', import.meta.env.VITE_NAVER_CLIENT_ID === null);
      console.log('🔍 VITE_NAVER_CLIENT_ID === ""', import.meta.env.VITE_NAVER_CLIENT_ID === "");
      console.log('🔍 ======================================');
      
      if (!finalApiKey) {
        console.log('⚠️ API 키가 없습니다.');
        return;
      }
      
      const scriptUrl = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${finalApiKey}`;
      console.log('🔗 스크립트 URL:', scriptUrl);
      script.src = scriptUrl;
      script.async = true;
      
      script.onload = () => {
        console.log('✅ 네이버 지도 API 스크립트 로드 성공');
        console.log('🔍 window.naver:', window.naver);
        console.log('🔍 window.naver.maps:', window.naver?.maps);
        
        if (window.naver && window.naver.maps) {
          console.log('✅ window.naver.maps 확인됨, initMap 호출');
          initMap();
        } else {
          console.error('❌ 네이버 지도 API 로드 후에도 window.naver.maps가 없음');
          console.error('❌ window.naver:', window.naver);
        }
      };
      
      script.onerror = (error) => {
        console.error('❌ 네이버 지도 API 로드 실패:', error);
        console.error('❌ 에러 상세:', error);
        // API 로드 실패 시 대체 UI 표시
        if (mapRef.current) {
          mapRef.current.innerHTML = `
            <div style="
              display: flex; 
              align-items: center; 
              justify-content: center; 
              height: 100%; 
              background: #f0f0f0; 
              color: #666;
              font-size: 14px;
              text-align: center;
              padding: 20px;
            ">
              <div>
                <div style="font-size: 24px; margin-bottom: 10px;">🗺️</div>
                <div>지도를 불러올 수 없습니다.</div>
                <div style="font-size: 12px; margin-top: 5px; color: #ff6b6b;">
                  .env 파일에 VITE_NAVER_CLIENT_ID를 설정해주세요.
                </div>
                <div style="font-size: 10px; margin-top: 5px; color: #999;">
                  현재 API 키: ${finalApiKey}
                </div>
              </div>
            </div>
          `;
        }
      };
      
      console.log('📜 스크립트를 DOM에 추가');
      document.head.appendChild(script);
    };

    console.log('🚀 loadScript 호출');
    loadScript();

    return () => {
      console.log('🧹 Map 컴포넌트 정리');
      if (mapInstanceRef.current) {
        try {
          mapInstanceRef.current.destroy();
          console.log('✅ 지도 인스턴스 정리 완료');
        } catch (e) {
          console.error('❌ 지도 정리 실패:', e);
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
import React, { useState, useEffect, useRef, useCallback } from 'react';

interface Store {
  id: number;
  name: string;
  category: 'good-price' | 'eco-friendly' | 'welfare';
  address: string;
  distance: string;
  rating: number;
  imageUrl?: string;
}

interface StoreListProps {
  userLocation?: { lat: number; lng: number };
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const StoreList: React.FC<StoreListProps> = ({
  userLocation,
  selectedCategory = 'all',
  onCategoryChange,
}) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [userAddress, setUserAddress] = useState('위치 정보를 가져오는 중...');
  const observer = useRef<IntersectionObserver | null>(null);

  // 카테고리 아이콘
  const categoryIcons = {
    'good-price': '💰',
    'eco-friendly': '🌱',
    'welfare': '🤝',
  } as const;

  // 좌표 → 주소 (카카오 지도 API)
  const getAddressFromCoords = async (lat: number, lng: number): Promise<string> => {
    try {
      // @ts-ignore
      if (!window.kakao) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&libraries=services`;
        script.async = true;
        return new Promise((resolve) => {
          script.onload = () => {
            // @ts-ignore
            window.kakao.maps.load(() => {
              // @ts-ignore
              const geocoder = new window.kakao.maps.services.Geocoder();
              // @ts-ignore
              const coord = new window.kakao.maps.LatLng(lat, lng);
              // @ts-ignore
              geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
                // @ts-ignore
                if (status === window.kakao.maps.services.Status.OK) resolve(result[0].address.address_name);
                else resolve('알 수 없음');
              });
            });
          };
          script.onerror = () => resolve('알 수 없음');
          document.head.appendChild(script);
        });
      } else {
        return new Promise((resolve) => {
          // @ts-ignore
          window.kakao.maps.load(() => {
            // @ts-ignore
            const geocoder = new window.kakao.maps.services.Geocoder();
            // @ts-ignore
            const coord = new window.kakao.maps.LatLng(lat, lng);
            // @ts-ignore
            geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
              // @ts-ignore
              if (status === window.kakao.maps.services.Status.OK) resolve(result[0].address.address_name);
              else resolve('알 수 없음');
            });
          });
        });
      }
    } catch (e) {
      console.error('주소 변환 오류:', e);
      return '알 수 없음';
    }
  };

  // 사용자 위치 → 주소
  useEffect(() => {
    if (userLocation) {
      getAddressFromCoords(userLocation.lat, userLocation.lng)
        .then(setUserAddress)
        .catch(() => setUserAddress('알 수 없음'));
    }
  }, [userLocation]);

  // 더미 데이터
  const generateDummyStores = (pageNum: number): Store[] => {
    const names = [
      '종이밥', '덤브치킨', '신호등찜닭', '맛있닭', '행컵', '착한카페',
      '친환경마트', '복지식당', '착한분식', '친환경치킨', '복지카페', '착한마트',
    ];
    const categories: Array<'good-price' | 'eco-friendly' | 'welfare'> = [
      'good-price', 'eco-friendly', 'welfare',
    ];
    const images = [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a87c3?w=400&h=200&fit=crop',
    ];

    return Array.from({ length: 6 }, (_, i) => {
      const idx = pageNum * 6 + i;
      return {
        id: idx,
        name: names[idx % names.length],
        category: categories[idx % categories.length],
        address: `${userAddress} ${Math.floor(Math.random() * 100) + 1}길`,
        distance: `${Math.floor(Math.random() * 5) + 1}km`,
        rating: Math.floor(Math.random() * 2) + 4,
        imageUrl: images[idx % images.length],
      };
    });
  };

  // 로드
  const loadStores = useCallback(async (pageNum: number) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 600));
    const newStores = generateDummyStores(pageNum);

    const filtered =
      selectedCategory === 'all'
        ? newStores
        : newStores.filter((s) => s.category === selectedCategory);

    setStores((prev) => (pageNum === 1 ? filtered : [...prev, ...filtered]));
    setHasMore(pageNum < 5);
    setPage(pageNum);
    setLoading(false);
  }, [selectedCategory, userAddress]);

  // 카테고리 변경 시 리셋
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadStores(1);
  }, [selectedCategory, loadStores]);

  // 무한 스크롤
  const lastStoreElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore) {
            loadStores(page + 1);
          }
        },
        { root: null, rootMargin: '200px 0px', threshold: 0.01 }
      );

      if (node) observer.current.observe(node);
    },
    [loading, hasMore, page, loadStores]
  );

  // 초기 로드
  useEffect(() => {
    loadStores(1);
  }, [loadStores]);

  // 액티브 스타일 헬퍼
  const catBtn = (active: boolean) =>
    `flex flex-col items-center rounded-xl px-4 py-3 shadow transition
     ${active ? 'bg-[#00B6F8] text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`;

  return (
    <div className="px-5 py-5 bg-gray-50">
      {/* 위치 정보 */}
      <div className="mb-5 text-center">
        <div className="text-lg font-semibold text-gray-900">나의 위치: {userAddress}</div>
        <div className="mt-1 text-sm text-gray-500">사용자 근처의 착한 가게들을 소개합니다.</div>
      </div>

      {/* 카테고리 필터 */}
      <div className="mb-5 flex justify-around px-2">
        <button
          className={catBtn(selectedCategory === 'all')}
          onClick={() => onCategoryChange?.('all')}
        >
          <div className="text-2xl">🏠</div>
          <span className="mt-1 text-xs font-medium">전체</span>
        </button>
        <button
          className={catBtn(selectedCategory === 'good-price')}
          onClick={() => onCategoryChange?.('good-price')}
        >
          <div className="text-2xl">💰</div>
          <span className="mt-1 text-xs font-medium">착한 가격</span>
        </button>
        <button
          className={catBtn(selectedCategory === 'eco-friendly')}
          onClick={() => onCategoryChange?.('eco-friendly')}
        >
          <div className="text-2xl">🌱</div>
          <span className="mt-1 text-xs font-medium">친환경</span>
        </button>
        <button
          className={catBtn(selectedCategory === 'welfare')}
          onClick={() => onCategoryChange?.('welfare')}
        >
          <div className="text-2xl">🤝</div>
          <span className="mt-1 text-xs font-medium">나눔 실천</span>
        </button>
      </div>

      {/* 스토어 목록 */}
      <div className="grid grid-cols-2 gap-4">
        {stores.map((store, index) => (
          <div
            key={store.id}
            ref={index === stores.length - 1 ? lastStoreElementRef : null}
            className="relative h-52 w-full cursor-pointer overflow-hidden rounded-xl bg-cover bg-center shadow-md transition
                       hover:-translate-y-0.5 hover:shadow-xl"
            style={{ backgroundImage: `url(${store.imageUrl})` }}
          >
            {/* 오버레이 그라디언트 */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/10 via-black/30 to-black/70" />

            {/* 카테고리 아이콘 (우상단) */}
            <div className="absolute right-3 top-3 z-10 grid h-8 w-8 place-items-center rounded-full bg-white/90 text-base shadow">
              {categoryIcons[store.category]}
            </div>

            {/* 가게명 (좌하단) */}
            <div className="absolute inset-x-0 bottom-0 z-10 flex items-end justify-between p-4">
              <div className="m-0 text-lg font-semibold text-white drop-shadow">
                {store.name}
              </div>
            </div>

            {/* 평점 (우하단) */}
            <div className="absolute bottom-3 right-3 z-10 text-xs text-white drop-shadow">
              {'⭐'.repeat(store.rating/20)}
            </div>
          </div>
        ))}
      </div>

      {/* 로딩 인디케이터 */}
      {loading && (
        <div className="mt-5 flex flex-col items-center justify-center text-gray-500">
          <div className="mb-2 h-6 w-6 animate-spin rounded-full border-2 border-gray-200 border-t-[#00B6F8]" />
          <span className="text-sm">가게 정보를 불러오는 중...</span>
        </div>
      )}

      {/* 더 이상 데이터 없음 */}
      {!hasMore && stores.length > 0 && (
        <div className="py-5 text-center text-sm text-gray-500">모든 착한가게를 불러왔습니다.</div>
      )}
    </div>
  );
};

// TypeScript를 위한 전역 타입 선언
declare global {
  interface Window {
    kakao: {
      maps: {
        load: (callback: () => void) => void;
        LatLng: any;
        services: {
          Geocoder: any;
          Status: any;
        };
      };
    };
  }
}

export default StoreList;
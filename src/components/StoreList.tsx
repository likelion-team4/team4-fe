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
  onCategoryChange 
}) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [userAddress, setUserAddress] = useState('위치 정보를 가져오는 중...');
  const observer = useRef<IntersectionObserver>();
  const loadingRef = useRef<HTMLDivElement>(null);

  // 카테고리별 색상 매핑
  const categoryColors = {
    'good-price': '#4CAF50',
    'eco-friendly': '#FF9800',
    'welfare': '#2196F3'
  };

  // 카테고리별 아이콘
  const categoryIcons = {
    'good-price': '💰',
    'eco-friendly': '🌱',
    'welfare': '🤝'
  };

  // 카테고리별 한글 이름
  const categoryNames = {
    'good-price': '착한 가격',
    'eco-friendly': '친환경',
    'welfare': '복지 실천'
  };

  // 카테고리 선택 핸들러
  const handleCategoryClick = (category: string) => {
    if (onCategoryChange) {
      onCategoryChange(category);
    }
  };

  // 좌표를 주소로 변환 (카카오 지도 API 사용)
  const getAddressFromCoords = async (lat: number, lng: number): Promise<string> => {
    try {
      // 카카오 지도 API 스크립트 로드
      if (!window.kakao) {
        const script = document.createElement('script');
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${import.meta.env.VITE_KAKAO_APP_KEY}&libraries=services`;
        script.async = true;
        
        return new Promise((resolve, reject) => {
          script.onload = () => {
            window.kakao.maps.load(() => {
              const geocoder = new window.kakao.maps.services.Geocoder();
              const coord = new window.kakao.maps.LatLng(lat, lng);
              
              geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
                if (status === window.kakao.maps.services.Status.OK) {
                  const address = result[0].address.address_name;
                  resolve(address);
                } else {
                  resolve('알 수 없음');
                }
              });
            });
          };
          script.onerror = () => resolve('알 수 없음');
          document.head.appendChild(script);
        });
      } else {
        return new Promise((resolve) => {
          window.kakao.maps.load(() => {
            const geocoder = new window.kakao.maps.services.Geocoder();
            const coord = new window.kakao.maps.LatLng(lat, lng);
            
            geocoder.coord2Address(coord.getLng(), coord.getLat(), (result: any, status: any) => {
              if (status === window.kakao.maps.services.Status.OK) {
                const address = result[0].address.address_name;
                resolve(address);
              } else {
                resolve('알 수 없음');
              }
            });
          });
        });
      }
    } catch (error) {
      console.error('주소 변환 오류:', error);
      return '알 수 없음';
    }
  };

  // 사용자 위치 기반 주소 설정
  useEffect(() => {
    if (userLocation) {
      getAddressFromCoords(userLocation.lat, userLocation.lng)
        .then(address => {
          setUserAddress(address);
        })
        .catch(() => {
          setUserAddress('알 수 없음');
        });
    }
  }, [userLocation]);

  // 더미 데이터 생성 (실제로는 API에서 받아올 데이터)
  const generateDummyStores = (pageNum: number): Store[] => {
    const dummyNames = [
      '종이밥', '덤브치킨', '신호등찜닭', '맛있닭', '행컵', '착한카페',
      '친환경마트', '복지식당', '착한분식', '친환경치킨', '복지카페', '착한마트'
    ];
    
    const categories: Array<'good-price' | 'eco-friendly' | 'welfare'> = [
      'good-price', 'eco-friendly', 'welfare'
    ];

    // 더미 이미지 URL들 (실제로는 API에서 받아올 이미지)
    const dummyImages = [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=200&fit=crop',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a87c3?w=400&h=200&fit=crop'
    ];

    return Array.from({ length: 6 }, (_, index) => ({
      id: pageNum * 6 + index,
      name: dummyNames[(pageNum * 6 + index) % dummyNames.length],
      category: categories[(pageNum * 6 + index) % categories.length],
      address: `${userAddress} ${Math.floor(Math.random() * 100) + 1}길`,
      distance: `${Math.floor(Math.random() * 5) + 1}km`,
      rating: Math.floor(Math.random() * 2) + 4,
      imageUrl: dummyImages[(pageNum * 6 + index) % dummyImages.length]
    }));
  };

  // 스토어 데이터 로드
  const loadStores = useCallback(async (pageNum: number) => {
    setLoading(true);
    
    // 실제 API 호출을 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStores = generateDummyStores(pageNum);
    
    // 카테고리 필터링 적용
    const filteredStores = selectedCategory === 'all' 
      ? newStores 
      : newStores.filter(store => store.category === selectedCategory);
    
    if (pageNum === 1) {
      setStores(filteredStores);
    } else {
      setStores(prev => [...prev, ...filteredStores]);
    }
    
    // 5페이지까지 데이터가 있다고 가정
    setHasMore(pageNum < 5);
    setPage(pageNum);
    setLoading(false);
  }, [userAddress, selectedCategory]);

  // 카테고리 변경 시 데이터 다시 로드
  useEffect(() => {
    setPage(1);
    setHasMore(true);
    loadStores(1);
  }, [selectedCategory, loadStores]);

  // 무한 스크롤 관찰자 설정
  const lastStoreElementRef = useCallback((node: HTMLDivElement) => {
    if (loading) return;
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        loadStores(page + 1);
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, hasMore, page, loadStores]);

  // 초기 데이터 로드
  useEffect(() => {
    loadStores(1);
  }, [loadStores]);

  return (
    <div className="store-list-container">
      {/* 위치 정보 */}
      <div className="location-info">
        <div className="location-text">
          나의 위치: {userAddress}
        </div>
        <div className="location-description">
          사용자 근처의 착한 가게들을 소개합니다.
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="category-filters">
        <div 
          className={`category-item ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('all')}
        >
          <div className="category-icon">🏠</div>
          <span>전체</span>
        </div>
        <div 
          className={`category-item ${selectedCategory === 'good-price' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('good-price')}
        >
          <div className="category-icon">💰</div>
          <span>착한 가격</span>
        </div>
        <div 
          className={`category-item ${selectedCategory === 'eco-friendly' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('eco-friendly')}
        >
          <div className="category-icon">🌱</div>
          <span>친환경</span>
        </div>
        <div 
          className={`category-item ${selectedCategory === 'welfare' ? 'active' : ''}`}
          onClick={() => handleCategoryClick('welfare')}
        >
          <div className="category-icon">🤝</div>
          <span>나눔 실천</span>
        </div>
      </div>

      {/* 스토어 목록 */}
      <div className="stores-grid">
        {stores.map((store, index) => (
          <div
            key={store.id}
            ref={index === stores.length - 1 ? lastStoreElementRef : null}
            className="store-card"
            style={{ backgroundImage: `url(${store.imageUrl})` }}
          >
            {/* 카테고리 아이콘 (오른쪽 상단) */}
            <div className="store-category-icon">
              {categoryIcons[store.category]}
            </div>
            
            {/* 가게 정보 (왼쪽 하단) */}
            <div className="store-info-container">
              <div className="store-name">{store.name}</div>
            </div>
            
            {/* 평점 (오른쪽 하단) */}
            <div className="store-rating">
              {'⭐'.repeat(store.rating)}
            </div>
          </div>
        ))}
      </div>

      {/* 로딩 인디케이터 */}
      {loading && (
        <div className="loading-indicator" ref={loadingRef}>
          <div className="loading-spinner"></div>
          <span>가게 정보를 불러오는 중...</span>
        </div>
      )}

      {/* 더 이상 데이터가 없을 때 */}
      {!hasMore && stores.length > 0 && (
        <div className="no-more-data">
          모든 착한가게를 불러왔습니다.
        </div>
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

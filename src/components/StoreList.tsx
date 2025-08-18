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
}

const StoreList: React.FC<StoreListProps> = ({ userLocation }) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
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
    'good-price': '🏠',
    'eco-friendly': '🌱',
    'welfare': '🤝'
  };

  // 카테고리별 한글 이름
  const categoryNames = {
    'good-price': '착한 가격',
    'eco-friendly': '친환경',
    'welfare': '복지 실천'
  };

  // 더미 데이터 생성 (실제로는 API에서 받아올 데이터)
  const generateDummyStores = (pageNum: number): Store[] => {
    const dummyNames = [
      '종이밥', '덤브치킨', '신호등찜닭', '맛있닭', '행컵', '착한카페',
      '친환경마트', '복지식당', '착한분식', '친환경치킨', '복지카페', '착한마트'
    ];
    
    const categories: Array<'good-price' | 'eco-friendly' | 'welfare'> = [
      'good-price', 'eco-friendly', 'welfare'
    ];

    return Array.from({ length: 6 }, (_, index) => ({
      id: pageNum * 6 + index,
      name: dummyNames[(pageNum * 6 + index) % dummyNames.length],
      category: categories[(pageNum * 6 + index) % categories.length],
      address: `대구 북구 대현동 ${Math.floor(Math.random() * 100) + 1}길`,
      distance: `${Math.floor(Math.random() * 5) + 1}km`,
      rating: Math.floor(Math.random() * 2) + 4,
      imageUrl: undefined
    }));
  };

  // 스토어 데이터 로드
  const loadStores = useCallback(async (pageNum: number) => {
    setLoading(true);
    
    // 실제 API 호출을 시뮬레이션
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newStores = generateDummyStores(pageNum);
    
    if (pageNum === 1) {
      setStores(newStores);
    } else {
      setStores(prev => [...prev, ...newStores]);
    }
    
    // 5페이지까지 데이터가 있다고 가정
    setHasMore(pageNum < 5);
    setPage(pageNum);
    setLoading(false);
  }, []);

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
          나의 위치: 대구 북구 대현동
        </div>
        <div className="location-description">
          사용자 근처의 착한 가게들을 소개합니다.
        </div>
      </div>

      {/* 카테고리 필터 */}
      <div className="category-filters">
        <div className="category-item active">
          <div className="category-icon">🏠</div>
          <span>착한 가격</span>
        </div>
        <div className="category-item">
          <div className="category-icon">🌱</div>
          <span>친환경</span>
        </div>
        <div className="category-item">
          <div className="category-icon">🤝</div>
          <span>복지 실천</span>
        </div>
      </div>

      {/* 스토어 목록 */}
      <div className="stores-grid">
        {stores.map((store, index) => (
          <div
            key={store.id}
            ref={index === stores.length - 1 ? lastStoreElementRef : null}
            className="store-card"
            style={{ backgroundColor: categoryColors[store.category] }}
          >
            <div className="store-icon">
              {categoryIcons[store.category]}
            </div>
            <div className="store-info">
              <div className="store-name">{store.name}</div>
              <div className="store-address">{store.address}</div>
              <div className="store-distance">{store.distance}</div>
            </div>
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

export default StoreList;

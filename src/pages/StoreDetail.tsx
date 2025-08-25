import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { mockStoreData } from "../data/mockData";

// API 응답 타입 정의
export type StoreApiResponse = {
  id: number;
  name: string;
  categories: string[];
  certifications: Array<{ source: string }>;
  address: string;
  phone: string;
  lat: number;
  lon: number;
  score: number;
  cardnews: unknown[];
};

// 카테고리 한글 매핑
const categoryMapping: Record<string, string> = {
  "good_price": "착한 가격",
  "eco_friendly": "친환경",
  "welfare": "복지 실천"
};

export default function StoreDetail() {
  const { storeId } = useParams<{ storeId: string }>();
  const [storeData, setStoreData] = useState<StoreApiResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // store_id 2082를 사용해서 API 요청
  const targetStoreId = "2082";
  
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(`/api/stores/${targetStoreId}`);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data: StoreApiResponse = await response.json();
        setStoreData(data);
      } catch (err) {
        console.error('가게 정보를 가져오는데 실패했습니다:', err);
        setError('가게 정보를 불러오는데 실패했습니다. 잠시 후 다시 시도해주세요.');
        
        // API 실패 시 mockData 사용 (fallback)
        if (storeId && mockStoreData[storeId]) {
          setStoreData(mockStoreData[storeId] as unknown as StoreApiResponse);
        } else {
          setStoreData(mockStoreData.store1 as unknown as StoreApiResponse);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchStoreData();
  }, [storeId, targetStoreId]);
  
  // 로딩 상태
  if (loading) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-neutral-600 dark:text-neutral-400">가게 정보를 불러오는 중...</p>
        </div>
      </div>
    );
  }
  
  // 에러 상태
  if (error && !storeData) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }
  
  // storeData가 없으면 기본값 사용
  if (!storeData) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center">
        <p>가게 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const { name, categories, certifications, address, phone, score } = storeData;
  
  // 카테고리 한글 변환
  const categoryDisplay = categories.map(cat => categoryMapping[cat] || cat).join(", ");
  
  // 기본 이미지 URL (heroUrl이 없으므로 기본 이미지 사용)
  const defaultImageUrl = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600&auto=format&fit=crop";

  return (
    <main
      className="min-h-[100svh] md:min-h-screen overflow-y-auto no-scrollbar bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
    >
      <div className="mx-auto w-full max-w-screen-sm px-4 pb-24 text-left mt-16 md:mt-8 lg:mt-6">
        {/* 헤더 */}
        <header className="mb-3">
          <h1 className="pt-3 text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-[28px]">
            {name}
          </h1>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-neutral-700 dark:text-neutral-200 break-words pl-1">
              {categoryDisplay}
            </span>
            {score && (
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                점수: {score}
              </span>
            )}
          </div>
        </header>

        {/* 대표 이미지 */}
        <figure className="mb-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <img
            src={defaultImageUrl}
            alt={`${name} 대표 이미지`}
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "https://picsum.photos/1200/675?grayscale";
            }}
          />
        </figure>

        {/* 상세 정보 */}
        <h1 className="pt-3 text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-[22px] mb-4">
          Details
        </h1>

        <section aria-label="Details" className="rounded-xl border border-neutral-200 bg-white p-4 shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <dl className="divide-y divide-neutral-200 dark:divide-neutral-800">
            <div className="grid grid-cols-[88px_1fr] items-start gap-4 py-3">
              <dt className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">주소</dt>
              <dd className="text-[15px] leading-7">{address}</dd>
            </div>
            <div className="grid grid-cols-[88px_1fr] items-start gap-4 py-3">
              <dt className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">전화번호</dt>
              <dd className="text-[15px] leading-7">
                {phone}
              </dd>
            </div>
            {certifications && certifications.length > 0 && (
              <div className="grid grid-cols-[88px_1fr] items-start gap-4 py-3">
                <dt className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">인증</dt>
                <dd className="text-[15px] leading-7">
                  {certifications.map((cert, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 mr-2">
                      {cert.source}
                    </span>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </section>
      </div>
    </main>
  );
}

// ============ Demo Page ============
export function DemoStoreDetail() {
  return <StoreDetail />;
}

import { useParams } from "react-router-dom";
import { mockStoreData } from "../data/mockData";

export type StoreDetailProps = {
  name: string;
  category: string; // e.g., "한식 식당"
  heroUrl?: string; // 대표 이미지 URL
  address: string;
  phone: string; // "010.0000.0000" 등, 표시용 문자열
  hours: string; // "월~금 : 11 AM - 10 PM"
  className?: string;
};

export default function StoreDetail() {
  const { storeId } = useParams<{ storeId: string }>();
  
  // storeId가 없거나 해당하는 가게 데이터가 없으면 기본값 사용
  const storeData = storeId ? mockStoreData[storeId] : mockStoreData.store1;
  
  if (!storeData) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center">
        <p>가게 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const { name, category, heroUrl, address, phone, hours } = storeData;

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
          <span className="text-neutral-700 dark:text-neutral-200 break-words pl-1">
              {category}
          </span>
        </header>

        {/* 대표 이미지 */}
        <figure className="mb-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <img
            src={heroUrl}
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
            <div className="grid grid-cols-[88px_1fr] items-start gap-4 py-3">
              <dt className="text-xs md:text-sm text-neutral-500 dark:text-neutral-400">운영시간</dt>
              <dd className="text-[15px] leading-7 whitespace-pre-line">{hours}</dd>
            </div>
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

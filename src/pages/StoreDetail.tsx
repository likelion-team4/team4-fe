import React from "react";

export type StoreDetailProps = {
  name: string;
  category: string; // e.g., "한식 식당"
  heroUrl?: string; // 대표 이미지 URL
  address: string;
  phone: string; // "010.0000.0000" 등, 표시용 문자열
  hours: string; // "월~금 : 11 AM - 10 PM"
  className?: string;
};

export default function StoreDetail({
  name,
  category,
  heroUrl =
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
  address,
  phone,
  hours,
  className = "",
}: StoreDetailProps) {
  
  return (
    <main
      className={`min-h-[100svh] md:min-h-screen overflow-y-auto no-scrollbar bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 ${className}`}
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
            <div className="pt-0 grid grid-cols-[88px_1fr] items-center gap-4 py-3">
              <dt className="text-green-800 text-xs md:text-sm">주소</dt>
              <dd className="text-[15px] leading-7">{address}</dd>
            </div>
            <div className="grid grid-cols-[88px_1fr] items-center gap-4 py-4">
              <dt className="text-green-800 text-xs md:text-sm">전화번호</dt>
              <dd className="text-[15px] leading-7">
                {phone}
              </dd>
            </div>
            <div className="pb-0 grid grid-cols-[88px_1fr] items-center gap-4 py-3">
              <dt className="text-green-800 text-xs md:text-sm">운영시간</dt>
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
  return (
    <StoreDetail
      name="신호등 찜닭"
      category="한식 식당"
      heroUrl="https://images.unsplash.com/photo-1625944528150-2f1a79c01a0c?q=80&w=1600&auto=format&fit=crop"
      address="대구 북구 대현동 OO로 12"
      phone="010.0000.0000"
      hours={"월~금 : 11 AM - 10 PM"}
    />
  );
}

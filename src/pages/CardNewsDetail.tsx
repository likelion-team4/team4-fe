import React from "react";

export type CardNewsDetailProps = {
  title: string;
  date: string; // e.g., "25.08.01"
  summary: string; // AI 요약 문구
  heroUrl?: string; // 대표 이미지 URL
  body: string | React.ReactNode; // 본문 (문단/리치텍스트 가능)
  className?: string;
};

export default function CardNewsDetail({
  title,
  date,
  summary,
  heroUrl =
    "https://images.unsplash.com/photo-1625944528150-2f1a79c01a0c?q=80&w=1600&auto=format&fit=crop",
  body,
  className = "",
}: CardNewsDetailProps) {
  return (
    <main
      className={`min-h-[100svh] md:min-h-screen overflow-y-auto no-scrollbar bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 ${className}`}
    >
      <div className="mx-auto w-full max-w-screen-sm px-4 pb-24 text-left mt-16 md:mt-8 lg:mt-6">
        {/* AI 요약 배지 카드 */}
        <section
          aria-label="AI 요약"
          className="mb-4 rounded-xl border border-neutral-200 bg-emerald-50/80 p-3 shadow-sm ring-1 ring-neutral-100 dark:border-neutral-800 dark:bg-emerald-900/20 dark:ring-neutral-800 min-h-20"
        >
          <div className="flex flex-col gap-2 text-sm text-neutral-800 dark:text-neutral-100">
            <span className="w-fit inline-flex select-none items-center rounded-md bg-emerald-600 px-2 py-0.5 text-xs font-medium text-white shadow-sm">
              AI 요약
            </span>
            <span className="text-neutral-700 dark:text-neutral-200 break-words">
              {summary}
            </span>
          </div>
        </section>

        {/* 헤더 */}
        <header className="mb-3">
          <h1 className="pt-3 text-2xl font-semibold leading-snug tracking-[-0.02em] md:text-[28px]">
            {title}
          </h1>
          <time
            dateTime={date}
            className="pt-1 mt-1 block text-xs text-neutral-500 dark:text-neutral-400"
          >
            {date}
          </time>
        </header>

        {/* 대표 이미지 */}
        <figure className="mb-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <img
            src={heroUrl}
            alt="카드뉴스 대표 이미지"
            className="aspect-[16/9] w-full object-cover"
            loading="lazy"
          />
        </figure>

        {/* 본문 */}
        <article className="prose prose-neutral max-w-none text-[15px] leading-7 dark:prose-invert">
          {typeof body === "string"
            ? body
                .replace(/\r\n/g, "\n")
                .replace(/\\n/g, "\n")
                .split(/\n{2,}/)
                .map((para, i) => (
                  <p key={i} className="whitespace-pre-line">
                    {para}
                  </p>
                ))
            : body}
        </article>
      </div>
    </main>
  );
}

// === 데모용 페이지 ===
export function DemoCardNewsDetail() {
  const body = `2010년부터 지금까지 학생들을 위해서 같은 자리에서 같은 가격을 유지하고 있는 식당이다. a significant transformation, driven by increasing consumer awareness of environmental and social issues.

Sustainable fashion is no longer a trend but a necessity for brands that want to stay relevant. 지역사회와 상생하며 공정한 가격을 유지하는 이 식당의 철학은, 단지 한 끼의 식사가 아니라 학생들의 일상과 경제에 실질적인 도움을 준다는 점에서 특별하다.

사장님은 매일 아침 신선한 재료를 들여오고, 남는 식자재는 지역 푸드뱅크와 연계해 낭비를 줄인다. 이런 작은 실천들이 모여 긴 시간 신뢰를 만들었다.`;

  return (
    <CardNewsDetail
      title="감동적인 가게 스토리"
      date="25.08.01"
      summary="학생들을 위해 합리적인 가격의 음식을 제공하는 가게."
      heroUrl="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop"
      body={body}
    />
  );
}

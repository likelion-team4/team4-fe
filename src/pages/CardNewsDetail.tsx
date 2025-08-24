import React from "react";
import { useParams } from "react-router-dom";
import { mockNewsData } from "../data/mockData";

export type CardNewsDetailProps = {
  title: string;
  date: string; // e.g., "25.08.01"
  summary: string; // AI 요약 문구
  heroUrl?: string; // 대표 이미지 URL
  body: string | React.ReactNode; // 본문 (문단/리치텍스트 가능)
  className?: string;
};

export default function CardNewsDetail() {
  const { newsId } = useParams<{ newsId: string }>();
  
  // 모든 뉴스 데이터에서 해당 newsId를 찾기
  let newsData = null;
  for (const storeNews of Object.values(mockNewsData)) {
    const found = storeNews.find(news => news.id === newsId);
    if (found) {
      newsData = found;
      break;
    }
  }
  
  if (!newsData) {
    return (
      <div className="min-h-[100svh] flex items-center justify-center">
        <p>뉴스를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const { title, postDate, summary, imageUrl, body } = newsData;

  return (
    <main
      className="min-h-[100svh] md:min-h-screen overflow-y-auto no-scrollbar bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
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
            dateTime={postDate}
            className="pt-1 mt-1 block text-xs text-neutral-500 dark:text-neutral-400"
          >
            {postDate}
          </time>
        </header>

        {/* 대표 이미지 */}
        <figure className="mb-6 overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm dark:border-neutral-800 dark:bg-neutral-950">
          <img
            src={imageUrl}
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
  return <CardNewsDetail />;
}

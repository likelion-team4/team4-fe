import React, { useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import PlaceCard from "../components/PlaceCard";
import PinModal from "../components/PinModal";
import { mockStoreData, type StoreData } from "../data/mockData";

const CATS = ["착한 가격", "친환경", "복지 실천"] as const;
type Cat = typeof CATS[number];

const normalize = (s: string) => s.toLowerCase().trim();
const ALL_STORES = Object.values(mockStoreData);

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState<Cat | "">("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>(undefined);

  // 검색/카테고리 필터링 (mock에서만 처리)
  const list = useMemo(() => {
    const q = normalize(query);
    let base = ALL_STORES;

    if (cat) base = base.filter((s) => s.category === cat);
    if (q) {
      base = base.filter((s) => {
        const hay = `${s.name} ${s.address} ${s.category}`.toLowerCase();
        return hay.includes(q);
      });
    }
    return base;
  }, [query, cat]);

  const handleCardClick = (store: StoreData) => {
    setSelectedStore(store);
    setIsModalOpen(true);
  };

  return (
    <div className="mx-auto w-full px-6 pb-10">
      {/* 검색바 */}
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="pt-5" />
        <div className="flex items-center rounded-2xl bg-[#F2F5F2] px-3 py-2 text-gray-800">
          <SearchIcon className="mr-2 h-5 w-5 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="가게 이름으로 검색하거나 카테고리를 선택해보세요."
            className="peer h-10 w-full bg-transparent text-[16px] outline-none placeholder:text-gray-800"
            aria-label="가게 검색"
          />
          {query && (
            <button
              aria-label="입력 지우기"
              onClick={() => setQuery("")}
              className="ml-1 rounded-full p-1 transition hover:bg-gray-200"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* 카테고리 필터 */}
        <div className="flex gap-2 py-3">
          <button
            onClick={() => setCat("")}
            className={`rounded-full px-3 py-1 text-sm ${cat === "" ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
          >
            전체
          </button>
          {CATS.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-3 py-1 text-sm ${cat === c ? "bg-black text-white" : "bg-gray-100 text-gray-700"}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>



      {/* 결과 리스트 */}
      <div className="divide-y divide-gray-100">
        {(query || cat) && list.length === 0 && (
          <div className="py-16 text-center text-gray-400">검색 결과가 없어요.</div>
        )}

        {list.map((s) => (
          <PlaceCard
            key={s.id}
            id={s.id}
            name={s.name}
            address={s.address}
            category={s.category}
            imageUrl={s.heroUrl}
            onClick={() => handleCardClick(s)}
          />
        ))}
      </div>

      {/* 상세 모달 */}
      <PinModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedStore(undefined);
        }}
        selectedStore={selectedStore}
      />
    </div>
  );
};

export default Search;
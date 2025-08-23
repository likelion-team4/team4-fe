import React, { useMemo, useState } from "react";
import { Search as SearchIcon, X } from "lucide-react";
import PlaceCard from "../components/PlaceCard";
import PinModal from "../components/PinModal";
import type { StoreData } from "../data/mockData"; // mock 타입이 있다면 사용
import store1 from "../assets/store1.png";
import store2 from "../assets/store2.png";
import store3 from "../assets/store3.png";

const MOCK_PLACES = [
  {
    id: "store1",
    name: "신호등 찜닭",
    address: "대구 북구 대현동 OO로 12",
    category: "착한 가격",
    imageUrl: store1,
  },
  {
    id: "store2",
    name: "맛있닭 치킨",
    address: "대구 북구 대현동 OO로 20",
    category: "친환경",
    imageUrl: store2,
  },
  {
    id: "store3",
    name: "썬더 닭강정",
    address: "대구 북구 대현동 OO로 125",
    category: "복지 실천",
    imageUrl: store3,
  },
] as const;

const normalize = (s: string) => s.toLowerCase().trim();

const Search: React.FC = () => {
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedStore, setSelectedStore] = useState<StoreData | undefined>(undefined);

  const results = useMemo(() => {
    const q = normalize(query);
    if (!q) return [];
    return MOCK_PLACES.filter((p) => {
      const hay = `${p.name} ${p.address} ${p.category}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  const handleCardClick = (p: typeof MOCK_PLACES[number]) => {
    // PinModal이 기대하는 StoreData 형태로 매핑
    const store: StoreData = {
      id: p.id,
      name: p.name,
      address: p.address,
      category: p.category as "착한 가격" | "친환경" | "복지 실천",
      imageUrl: p.imageUrl,
      // 선택: phone, hours, cardNews 등 mock을 여기에 추가 가능
      // phone: "053-000-0000",
      // hours: "매일 11:00 ~ 21:00",
      // cardNews: [{ imageUrl: p.imageUrl, title: "대표메뉴", description: "맛있는 찜닭!" }]
    };
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
            placeholder="신호등 찜닭"
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
        <div className="pb-3" />
      </div>

      {/* 안내 문구 */}
      {!query && (
        <div className="py-16 text-center text-gray-400">
          가게 이름, 주소, 카테고리로 검색해보세요.
        </div>
      )}

      {/* 결과 리스트 */}
      <div className="divide-y divide-gray-100">
        {query && results.length === 0 && (
          <div className="py-16 text-center text-gray-400">검색 결과가 없어요.</div>
        )}

        {results.map((p) => (
          <PlaceCard
            key={p.id}
            name={p.name}
            address={p.address}
            category={p.category as "착한 가격" | "친환경" | "복지 실천"}
            imageUrl={p.imageUrl}
            onClick={() => handleCardClick(p)}
          />
        ))}
      </div>

      {/* 카드 클릭 시 카드뉴스/상세 모달 */}
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
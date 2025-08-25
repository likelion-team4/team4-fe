// src/lib/api.ts
export type BackendStoreSummary = {
    id: string | number;
    name: string;
    lat: number;
    lon: number;
    score?: number;
    categories: string[];
  };
  
  export type BackendStoreDetail = {
    id: string | number;
    name: string;
    address: string;
    lat: number;
    lon: number;
    phone?: string;
    categories: string[];
    certifications?: { source: string; cert_date?: string }[];
    cardnews?: { title: string; summary: string; created_at: string }[];
  };
  
  export type UIStore = {
    id: string;
    name: string;
    category: "착한 가격" | "친환경" | "복지 실천";
    imageUrl?: string;        // 프론트 전용 썸네일(백엔드엔 없음)
    address?: string;
    phone?: string;
    hours?: string;           // (선택) 프론트 전용
  };
  
  const BASE = (import.meta.env.VITE_API_BASE?.replace(/\/+$/, "") || "/api");  
  function toId(v: string | number) { return String(v); }
  
  // 백엔드 → 프론트 어댑터
  export function adaptDetailToUI(data: BackendStoreDetail): UIStore {
    // 백엔드 categories에서 대표 카테고리 하나 고름(첫 번째 우선)
    const primary = (data.categories?.[0] ?? "착한 가격") as UIStore["category"];
    return {
      id: toId(data.id),
      name: data.name,
      category: primary,
      address: data.address,
      phone: data.phone,
    };
  }
  
  export async function getStores(params?: { category?: string }) {
    const url = params?.category
      ? `${BASE}/stores?categories=${encodeURIComponent(params.category)}`
      : `${BASE}/stores`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} failed`);
    const list = (await res.json()) as BackendStoreSummary[];
    return list;
  }
  
  export async function searchStoreByName(q: string) {
    const url = `${BASE}/stores/search?q=${encodeURIComponent(q)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} failed`);
    // 백엔드는 단일 결과로 예시를 주셨지만, 다건을 돌려도 동작하도록 처리
    const json = await res.json();
    const arr = Array.isArray(json) ? json : [json];
    return arr as BackendStoreDetail[];
  }
  
  export async function getStoreDetail(id: string) {
    const url = `${BASE}/stores/${encodeURIComponent(id)}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`GET ${url} failed`);
    return (await res.json()) as BackendStoreDetail;
  }
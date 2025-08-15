# 우리동네 착한가게

Mobile First Design으로 구현된 착한가게 찾기 앱입니다.

## 🚀 시작하기

### 설치
```bash
npm install
```

### 개발 서버 실행
```bash
npm run dev
```

## 🗺️ 네이버 지도 API 설정

1. **네이버 클라우드 플랫폼**에서 애플리케이션 등록
2. **Maps** 서비스 활성화
3. **Client ID** 발급받기
4. `src/components/Map.tsx` 파일에서 `YOUR_CLIENT_ID` 부분을 실제 Client ID로 교체

```typescript
// src/components/Map.tsx
script.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=YOUR_ACTUAL_CLIENT_ID`;
```

## 📁 프로젝트 구조

```
src/
├── components/      # 재사용 가능한 컴포넌트
│   └── Map.tsx     # 네이버 지도 컴포넌트
├── pages/          # 페이지별 컴포넌트
│   ├── Home.tsx    # 홈 페이지 (지도 포함)
│   ├── Search.tsx  # 검색 페이지
│   ├── SavedList.tsx
│   └── MyPage.tsx
├── App.tsx         # 메인 앱 + 네비게이션
└── App.css         # 스타일
```

## 🎨 주요 기능

- **Mobile First Design**: 모바일 우선 반응형 디자인
- **네이버 지도**: 실시간 지도 표시
- **페이지 라우팅**: 홈, 검색, 저장 목록, 마이페이지
- **고정 네비게이션**: 하단 고정 네비게이션 바

## 🔧 기술 스택

- React 19
- TypeScript
- Vite
- 네이버 지도 API
- CSS3 (Mobile First)

## 👥 협업 가이드

각 페이지와 컴포넌트는 독립적으로 개발 가능합니다:
- `pages/` 폴더: 페이지별 기능 개발
- `components/` 폴더: 재사용 가능한 컴포넌트 개발
- `App.tsx`: 네비게이션 및 전체 앱 구조
- `App.css`: 공통 스타일

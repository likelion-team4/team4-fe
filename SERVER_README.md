# Good Store API Server

## 설치 및 실행

### 1. 패키지 설치
```bash
npm install express cors
npm install -D nodemon
```

### 2. 서버 실행
```bash
# 개발 모드 (자동 재시작)
npm run dev

# 프로덕션 모드
npm start
```

## API 엔드포인트

### GET /stores
모든 착한가게 목록을 조회합니다.

**응답 예시:**
```json
[
  {
    "id": 1,
    "name": "종이밥",
    "lat": 37.5665,
    "lon": 126.9780,
    "score": 4.5,
    "categories": ["good-price"]
  },
  {
    "id": 2,
    "name": "덤브치킨",
    "lat": 37.5668,
    "lon": 126.9785,
    "score": 4.2,
    "categories": ["eco-friendly"]
  }
]
```

### GET /stores?categories=good-price,eco-friendly
카테고리별로 필터링된 착한가게 목록을 조회합니다.

### GET /stores/:id
특정 착한가게의 상세 정보를 조회합니다.

## 서버 정보
- **포트**: 5000
- **Base URL**: http://localhost:5000
- **API URL**: http://localhost:5000/stores

## 카테고리
- `good-price`: 착한 가격
- `eco-friendly`: 친환경
- `welfare`: 복지 실천

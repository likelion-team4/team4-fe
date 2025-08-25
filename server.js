const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// 미들웨어 설정
app.use(cors());
app.use(express.json());

// 착한가게 데이터 (더미 데이터)
const stores = [
  {
    id: 1,
    name: "종이밥",
    lat: 37.5665,
    lon: 126.9780,
    score: 4.5,
    categories: ["good-price"]
  },
  {
    id: 2,
    name: "덤브치킨",
    lat: 37.5668,
    lon: 126.9785,
    score: 4.2,
    categories: ["eco-friendly"]
  },
  {
    id: 3,
    name: "신호등찜닭",
    lat: 37.5662,
    lon: 126.9775,
    score: 4.7,
    categories: ["welfare"]
  },
  {
    id: 4,
    name: "맛있닭",
    lat: 37.5670,
    lon: 126.9790,
    score: 4.3,
    categories: ["good-price", "eco-friendly"]
  },
  {
    id: 5,
    name: "행컵",
    lat: 37.5660,
    lon: 126.9770,
    score: 4.6,
    categories: ["welfare", "eco-friendly"]
  },
  {
    id: 6,
    name: "착한카페",
    lat: 37.5672,
    lon: 126.9788,
    score: 4.4,
    categories: ["good-price", "welfare"]
  }
];

// GET /stores - 모든 착한가게 목록 조회
app.get('/stores', (req, res) => {
  try {
    // 카테고리 필터링 (선택사항)
    const { categories } = req.query;
    
    let filteredStores = stores;
    
    if (categories) {
      const categoryArray = categories.split(',');
      filteredStores = stores.filter(store => 
        store.categories.some(category => categoryArray.includes(category))
      );
    }
    
    res.status(200).json(filteredStores);
  } catch (error) {
    console.error('Error fetching stores:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: '가게 정보를 가져오는 중 오류가 발생했습니다.' 
    });
  }
});

// GET /stores/:id - 특정 착한가게 조회
app.get('/stores/:id', (req, res) => {
  try {
    const storeId = parseInt(req.params.id);
    const store = stores.find(s => s.id === storeId);
    
    if (!store) {
      return res.status(404).json({ 
        error: 'Not found',
        message: '해당 가게를 찾을 수 없습니다.' 
      });
    }
    
    res.status(200).json(store);
  } catch (error) {
    console.error('Error fetching store:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      message: '가게 정보를 가져오는 중 오류가 발생했습니다.' 
    });
  }
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}`);
  console.log(`Stores endpoint: http://localhost:${PORT}/stores`);
});

module.exports = app;

import React, { useState, useEffect } from 'react';

interface CardNewsPageProps {
  storeId?: string;
  storeName?: string;
}

interface CardNewsData {
  id: string;
  title: string;
  content: string;
  imageUrl: string;
  category: string;
  date: string;
}

const CardNewsPage: React.FC<CardNewsPageProps> = ({ storeId, storeName }) => {
  const [currentCard, setCurrentCard] = useState(0);
  const [cardNews, setCardNews] = useState<CardNewsData[]>([]);

  // 더미 카드뉴스 데이터
  const dummyCardNews: CardNewsData[] = [
    {
      id: '1',
      title: '착한 가격의 시작',
      content: '종이밥은 지역 주민들을 위해 합리적인 가격으로 맛있는 음식을 제공합니다. 특히 어려운 이웃들을 위해 할인 혜택도 제공하고 있어요.',
      imageUrl: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=400&h=300&fit=crop',
      category: '착한 가격',
      date: '2024.01.15'
    },
    {
      id: '2',
      title: '친환경 포장재 사용',
      content: '플라스틱 대신 종이 포장재를 사용하여 환경 보호에 기여하고 있습니다. 작은 실천이 큰 변화를 만들어요.',
      imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop',
      category: '친환경',
      date: '2024.01.15'
    },
    {
      id: '3',
      title: '지역 사회 기여',
      content: '매월 수익의 일부를 지역 복지 시설에 기부하고 있습니다. 함께하는 마음으로 더 나은 동네를 만들어요.',
      imageUrl: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop',
      category: '나눔 실천',
      date: '2024.01.15'
    }
  ];

  useEffect(() => {
    setCardNews(dummyCardNews);
  }, []);

  const nextCard = () => {
    if (currentCard < cardNews.length - 1) {
      setCurrentCard(currentCard + 1);
    }
  };

  const prevCard = () => {
    if (currentCard > 0) {
      setCurrentCard(currentCard - 1);
    }
  };

  const goBack = () => {
    window.history.back();
  };

  if (cardNews.length === 0) {
    return (
      <div className="card-news-container">
        <div className="loading">카드뉴스를 불러오는 중...</div>
      </div>
    );
  }

  const currentCardData = cardNews[currentCard];

  return (
    <div className="card-news-container">
      {/* 헤더 */}
      <div className="card-news-header">
        <button onClick={goBack} className="back-button">
          ← 뒤로가기
        </button>
        <h1 className="store-title">{storeName || '종이밥'} 카드뉴스</h1>
        <div className="card-indicator">
          {currentCard + 1} / {cardNews.length}
        </div>
      </div>

      {/* 카드뉴스 내용 */}
      <div className="card-news-content">
        <div className="card-news-card">
          <div className="card-image">
            <img src={currentCardData.imageUrl} alt={currentCardData.title} />
            <div className="card-category">{currentCardData.category}</div>
          </div>
          <div className="card-body">
            <h2 className="card-title">{currentCardData.title}</h2>
            <p className="card-text">{currentCardData.content}</p>
            <div className="card-date">{currentCardData.date}</div>
          </div>
        </div>
      </div>

      {/* 네비게이션 버튼 */}
      <div className="card-navigation">
        <button 
          onClick={prevCard} 
          disabled={currentCard === 0}
          className="nav-button prev-button"
        >
          이전
        </button>
        <button 
          onClick={nextCard} 
          disabled={currentCard === cardNews.length - 1}
          className="nav-button next-button"
        >
          다음
        </button>
      </div>

      {/* 진행률 표시 */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentCard + 1) / cardNews.length) * 100}%` }}
        ></div>
      </div>
    </div>
  );
};

export default CardNewsPage;

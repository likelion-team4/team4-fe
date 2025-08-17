import React from 'react';
import PlaceCard from '../components/PlaceCard';
import NewsCard from '../components/NewsCard';

const Home: React.FC = () => {
  return (
    <div className="page-content p-0">
      <h2>홈 페이지</h2>
      <p>우리동네착한가게 홈 페이지입니다.</p>

      <div className="w-full">
        <PlaceCard
        name="신호등 찜닭"
        address="대구 북구 대현동 OO로 12"
        category="착한 가격"
        imageUrl="https://picsum.photos/seed/store/200/200"
        />
        <NewsCard
        title="착한 가격 인증"
        content="위 가게는 착한 가격업체로 인증된 곳으로 맛있고 맛있고 맛있다!!!!!"
        postDate="25.08.01"
        imageUrl="https://picsum.photos/seed/store/200/200"
        />
        <NewsCard
        title="착한 가격 인증"
        content="위 가게는 착한 가격업체로 인증된 곳으로 맛있고 맛있고 맛있다!!!!!"
        postDate="25.08.01"
        imageUrl="https://picsum.photos/seed/store/200/200"
        />
      </div>

    </div>
  );
};

export default Home;

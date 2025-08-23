// 가게 데이터 타입 정의
export type StoreData = {
  id: string;
  name: string;
  category: "착한 가격" | "친환경" | "복지 실천";
  heroUrl: string;
  address: string;
  phone: string;
  hours: string;
};

// 뉴스 데이터 타입 정의
export type NewsData = {
  id: string;
  title: string;
  content: string;
  postDate: string;
  imageUrl: string;
  summary: string;
  body: string;
};

// 임시 가게 데이터 (실제로는 API에서 가져올 데이터, 가게 상세페이지 데이터)
export const mockStoreData: Record<string, StoreData> = {
  "store1": {
    id: "store1",
    name: "화랑 찜닭",
    category: "착한 가격",
    heroUrl: "https://images.unsplash.com/photo-1625944528150-2f80&w=1600&auto=format&fit=crop",
    address: "대구 북구 대현동 OO로 12",
    phone: "010.0000.0000",
    hours: "월~금 : 11 AM - 10 PM"
  },
  "store2": {
    id: "store2",
    name: "친환경 마트",
    category: "친환경",
    heroUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
    address: "대구 중구 OO동 OO로 34",
    phone: "010.1111.1111",
    hours: "월~일 : 9 AM - 9 PM"
  },
  "store3": {
    id: "store3",
    name: "복지 카페",
    category: "복지 실천",
    heroUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
    address: "대구 수성구 OO동 OO로 56",
    phone: "010.2222.2222",
    hours: "월~토 : 8 AM - 8 PM"
  },
  "store4": {
    id: "store4",
    name: "첨성 카페",
    category: "복지 실천",
    heroUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
    address: "대구 북구 OO동 OO로 16",
    phone: "010.3333.3333",
    hours: "월~토 : 10 AM - 9 PM"
  }
};

// 가게별 뉴스 데이터
export const mockNewsData: Record<string, NewsData[]> = {
  "store1": [
    {
      id: "news1",
      title: "착한 가격 업체 인증✅",
      content: "학생들을 위한 합리적인 가격으로 운영하는 신호등 찜닭의 이야기",
      postDate: "2024.01.15",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
      summary: "학생들을 위해 합리적인 가격의 음식을 제공하는 가게",
      body: "2010년부터 지금까지 학생들을 위해서 같은 자리에서 같은 가격을 유지하고 있는 식당이다. 지역사회와 상생하며 공정한 가격을 유지하는 이 식당의 철학은, 단지 한 끼의 식사가 아니라 학생들의 일상과 경제에 실질적인 도움을 준다는 점에서 특별하다.\n\n사장님은 매일 아침 신선한 재료를 들여오고, 남는 식자재는 지역 푸드뱅크와 연계해 낭비를 줄인다. 이런 작은 실천들이 모여 긴 시간 신뢰를 만들었다."
    },
    {
      id: "news2", 
      title: "신호등 찜닭의 친환경 실천",
      content: "일회용품 사용을 줄이고 친환경 포장재를 사용하는 신호등 찜닭",
      postDate: "2024.01.10",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
      summary: "친환경 포장재 사용과 일회용품 절약을 실천하는 가게",
      body: "신호등 찜닭은 환경 보호를 위해 다양한 친환경 실천을 하고 있다. 일회용 플라스틱 컵 대신 유리컵을 사용하고, 테이크아웃 시에는 종이 포장재를 사용한다.\n\n또한 음식물 쓰레기를 줄이기 위해 적정량 조절과 남은 음식 기부 등 다양한 활동을 통해 환경 친화적인 가게로 자리잡고 있다."
    },
    {
      id: "news9", 
      title: "산불 피해 지원금 후원",
      content: "산불 피해 지원금 후원한 신호등 찜닭",
      postDate: "2024.01.10",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
      summary: "친환경 포장재 사용과 일회용품 절약을 실천하는 가게",
      body: "신호등 찜닭은 환경 보호를 위해 다양한 친환경 실천을 하고 있다. 일회용 플라스틱 컵 대신 유리컵을 사용하고, 테이크아웃 시에는 종이 포장재를 사용한다.\n\n또한 음식물 쓰레기를 줄이기 위해 적정량 조절과 남은 음식 기부 등 다양한 활동을 통해 환경 친화적인 가게로 자리잡고 있다."
    }
  ],
  "store2": [
    {
      id: "news3",
      title: "친환경 마트의 지역 농산물 지원",
      content: "지역 농가와 협력하여 신선한 농산물을 공급하는 친환경 마트",
      postDate: "2024.01.12",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
      summary: "지역 농가와 협력하여 신선한 농산물을 공급하는 마트",
      body: "친환경 마트는 지역 농가와 직접 계약을 맺어 신선한 농산물을 공급받고 있다. 이를 통해 농가의 안정적인 수익을 보장하고, 소비자에게는 신선하고 안전한 식재료를 제공한다.\n\n또한 유기농 제품과 친환경 생활용품을 다양하게 취급하여 환경을 생각하는 소비자들의 니즈를 충족시키고 있다."
    },
    {
      id: "news4",
      title: "친환경 마트의 플라스틱 프리존",
      content: "플라스틱 사용을 최소화하는 친환경 마트의 노력",
      postDate: "2024.01.08",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
      summary: "플라스틱 사용을 최소화하고 친환경 포장재를 사용하는 마트",
      body: "친환경 마트는 플라스틱 사용을 최소화하기 위해 다양한 노력을 하고 있다. 손님들이 가져온 용기에 직접 담아갈 수 있도록 하고, 친환경 포장재를 사용한다.\n\n또한 재활용 가능한 제품들을 우선적으로 취급하여 소비자들의 환경 의식을 높이는 데 기여하고 있다."
    }
  ],
  "store3": [
    {
      id: "news5",
      title: "복지 카페의 장애인 고용",
      content: "장애인을 적극적으로 고용하여 사회적 가치를 실현하는 복지 카페",
      postDate: "2024.01.14",
      imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1600&auto=format&fit=crop",
      summary: "장애인을 적극적으로 고용하여 사회적 가치를 실현하는 카페",
      body: "복지 카페는 장애인을 적극적으로 고용하여 사회적 가치를 실현하고 있다. 장애인 직원들이 자신의 능력을 발휘할 수 있도록 적절한 업무 배치와 교육을 제공한다.\n\n이를 통해 장애인들의 자립과 사회 참여를 돕고, 고객들에게는 따뜻한 마음을 담은 서비스를 제공한다."
    },
    {
      id: "news6",
      title: "복지 카페의 지역사회 기여",
      content: "수익의 일부를 지역사회에 기부하는 복지 카페의 나눔 정신",
      postDate: "2024.01.06",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
      summary: "수익의 일부를 지역사회에 기부하는 나눔 정신을 실천하는 카페",
      body: "복지 카페는 수익의 일부를 지역사회에 기부하여 나눔 정신을 실천하고 있다. 지역의 어려운 이웃들을 돕고, 사회적 문제 해결을 위한 다양한 활동을 지원한다.\n\n이러한 활동을 통해 단순한 영리 추구가 아닌 사회적 가치를 우선시하는 기업 문화를 만들어가고 있다."
    }
  ],
  "store4": [
    {
      id: "news7",
      title: "첨성 카페의 청년 창업 지원",
      content: "청년들의 창업을 지원하고 멘토링을 제공하는 첨성 카페",
      postDate: "2024.01.13",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
      summary: "청년들의 창업을 지원하고 멘토링을 제공하는 카페",
      body: "첨성 카페는 청년들의 창업을 지원하기 위해 다양한 프로그램을 운영하고 있다. 창업에 관심 있는 청년들에게 공간을 제공하고, 성공한 사업가들의 멘토링을 연결해준다.\n\n또한 창업 관련 정보와 네트워킹 기회를 제공하여 청년들이 꿈을 실현할 수 있도록 돕고 있다."
    },
    {
      id: "news8",
      title: "첨성 카페의 문화 공간 역할",
      content: "카페를 넘어선 지역 문화 공간으로서의 역할을 하는 첨성 카페",
      postDate: "2024.01.05",
      imageUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1600&auto=format&fit=crop",
      summary: "카페를 넘어선 지역 문화 공간으로서의 역할을 하는 카페",
      body: "첨성 카페는 단순한 카페를 넘어서 지역 문화 공간으로서의 역할을 하고 있다. 다양한 문화 행사와 전시회를 개최하고, 지역 예술가들의 작품을 전시한다.\n\n이를 통해 지역 문화의 발전에 기여하고, 주민들에게는 문화적 경험을 제공하는 공간으로 자리잡고 있다."
    }
  ]
}; 

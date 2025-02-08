interface Developer {
  // 랜딩페이지 개발자 프로필 카드 정보
  name: string;
  university: string;
  role: string;
  position: string;
  image: string;
  portfolio?: string;
}

interface ServiceInformation {
  // 랜딩페이지 서비스 정보
  title: string;
  text: string;
  icon: string;
}

interface ChatResponses {
  //랜딩페이지 채팅프리뷰 정보
  [key: string]: string;
}

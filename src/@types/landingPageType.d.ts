interface Developer {
  // 랜딩페이지 개발자 프로필 카드 정보 타입
  name: string;
  university: string;
  role: string;
  position: string;
  image: string;
  portfolio?: string;
}

interface ServiceInformation {
  // 랜딩페이지 서비스 정보 타입
  title: string;
  text: string;
  icon: string;
}

interface ChatResponses {
  //랜딩페이지 채팅프리뷰 정보 타입
  [key: string]: string;
}

interface GrowthInformation {
  //랜딩페이지 성장 정보 타입
  title: string;
  explanation: string;
  itemNum: number; // 3d모델과 gif 조건 렌더링을 위한 데이터
}

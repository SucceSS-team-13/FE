interface Chat {
  // 채팅 데이터 타입
  id: number;
  sender?: "user" | "lumi";
  text: string;
  location?: string[];
}
interface GuideBar {
  // 가이드 바 데이터 타입
  title: string;
}

interface ChatRoom {
  // 채팅방 데이터 타입
  chatRoomId: number;
  memberId: number;
  title: string;
  lastMessageDate: string;
}

interface ChatRoomResponse {
  result: {
    content: ChatRoom[];
    totalElements: number;
    totalPages: number;
    pageable: {
      pageNumber: number;
      // pageSize: number; // 현재 미사용 타입이지만 서버 응답구조에 맞춘 타입 정의
      // offset: number;
      // paged: boolean;
      // unpaged: boolean;
    };
    last: boolean;
    // first: boolean;
    // numberOfElements: number;
    // empty: boolean;
  };
}

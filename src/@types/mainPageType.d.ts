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
  };
  nextPage: number | undefined;
}

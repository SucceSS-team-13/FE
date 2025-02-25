import { createChatRoom } from "../service/ChattingService";
import { NavigateFunction } from "react-router-dom";

export const handleCreateChatRoom = async (navigate: NavigateFunction) => {
  try {
    const newChatRoomId = await createChatRoom();
    navigate(`/main?chatRoomId=${newChatRoomId}`);
  } catch (error) {
    console.error("채팅방 생성 실패:", error);
  }
};

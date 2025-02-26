import { QueryFunction } from "@tanstack/react-query";
import CustomAxios from "../api/CustomAxios";

export const getChatting: QueryFunction<
  Chat[],
  [_1: string, number],
  number
> = async ({ queryKey, pageParam }) => {
  try {
    const chatRoomId = queryKey[1];

    if (chatRoomId === undefined || chatRoomId === null) {
      // id가 없다면 예외 처리
      throw new Error("chatRoomId is required");
    }

    const res = await CustomAxios.get(
      `/api/chat/room/${chatRoomId}?page=${pageParam}&size=10&sort=sendDate,desc`,
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );

    return res.data.result.content;
  } catch (err) {
    console.error("Failed to fetch data", err);
    throw err;
  }
};

export const getChatRoomList = async ({
  pageParam,
}: {
  pageParam: number | undefined;
}) => {
  try {
    const response = await CustomAxios.get(
      `/api/chat/rooms?page=${pageParam}&size=10`
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch data", err);
    throw err;
  }
};

export const getSearchChatRoomList = async ({
  pageParam,
  searchText,
}: {
  pageParam: number | undefined;
  searchText: string;
}) => {
  try {
    const response = await CustomAxios.get(
      `/api/chat/rooms?page=${pageParam}&size=10&keyword=${searchText}`
    );
    return response.data;
  } catch (err) {
    console.error("Failed to fetch data", err);
    throw err;
  }
};

export const createChatRoom = async () => {
  try {
    const response = await CustomAxios.post("/api/chat/room");
    return response.data.result.chatRoomId;
  } catch (err) {
    console.error("채팅방 생성 실패", err);
    throw err;
  }
};

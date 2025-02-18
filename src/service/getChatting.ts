import { QueryFunction } from "@tanstack/react-query";
import CustomAxios from "../api/CustomAxios";

export const getChatting: QueryFunction<Chat[], [_1: string, number]> = async ({
  queryKey: [, chatRoomId],
}) => {
  try {
    if (!chatRoomId) {
      // id가 없다면 예외 처리
      throw new Error("chatRoomId is required");
    }

    const res = await CustomAxios.get(`/api/chatting/${chatRoomId}`, {
      headers: {
        "Cache-Control": "no-store",
      },
    });

    return res.data.result.chatting;
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
      `/api/chatRoomList?page=${pageParam}`
    );
    console.log("채팅방 목록 ", response.data.result);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch data", err);
    throw err;
  }
};

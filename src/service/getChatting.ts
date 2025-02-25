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
      `/api/chat/room/${chatRoomId}?page=${pageParam}&size=10&sort=sendDate`,
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
      // `/api/chatRoomList?page=${pageParam}`
      `/api/chat/rooms?page=${pageParam}&size=10&sort=sendDate`
    );

    console.log("채팅방 목록 가져오기", response.data.result.content);
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
      `/api/searchChatRoomList?page=${pageParam}&search=${searchText}`
    );
    console.log("검색 api 호출", response.data.result);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch data", err);
    throw err;
  }
};

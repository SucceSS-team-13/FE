import CustomAxios from "../api/CustomAxios";

export const getChatting = async (
  chatRoomId: number , pageParam: number
): Promise<Chat[]> => {
  try {
    if (!chatRoomId) {
      throw new Error("id is required");
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
}

export const postChat = async (
  text: string, chatRoomId: number, sender: string
): Promise<Chat> => {
  const res = await CustomAxios.post(`/api/chat`, {
    chatRoomId,
    text,
    sender
  });

  return res.data.result;
}

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

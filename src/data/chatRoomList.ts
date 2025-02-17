export const chatRooms: ChatRoom[] = [
  { id: "1", title: "첫 번째 채팅방", lastMessageDate: new Date() },
  { id: "2", title: "첫 번째 채팅방", lastMessageDate: new Date() },
  { id: "3", title: "첫 번째 채팅방", lastMessageDate: new Date() },
  { id: "4", title: "첫 번째 채팅방", lastMessageDate: new Date() },

  {
    id: "5",
    title: "두 번째 채팅방",
    lastMessageDate: new Date(Date.now() - 86400000),
  },
  {
    id: "6",
    title: "세 번째 채팅방",
    lastMessageDate: new Date(Date.now() - 7 * 86400000),
  },
  {
    id: "7",
    title: "네 번째 채팅방",
    lastMessageDate: new Date(Date.now() - 30 * 86400000),
  },
  {
    id: "8",
    title: "다섯 번째 채팅방",
    lastMessageDate: new Date(Date.now() - 30 * 86400000),
  },
];

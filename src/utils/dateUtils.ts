import { DATE_GROUP, MILLISECONDS_PER_DAY } from "../constants/dateConstants";

export const calculateDaysDifference = (dateStr: string): number => {
  const today = new Date();
  const date = new Date(dateStr);

  // 서버의 UTC 날짜를 로컬 시간대로 변환
  const localDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate()
  );

  const todayWithoutTime = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  ).getTime();

  const dateWithoutTime = new Date(
    localDate.getFullYear(),
    localDate.getMonth(),
    localDate.getDate()
  ).getTime();

  return Math.floor(
    (todayWithoutTime - dateWithoutTime) / MILLISECONDS_PER_DAY
  );
};

export const getDateGroupKey = (diffDays: number) => {
  if (diffDays === 0) return DATE_GROUP.TODAY;
  if (diffDays === 1) return DATE_GROUP.YESTERDAY;
  if (diffDays <= 7) return DATE_GROUP.LAST_WEEK;
  if (diffDays <= 30) return DATE_GROUP.LAST_MONTH;
  return DATE_GROUP.OLDER;
};

// 채팅방을 날짜별로 그룹화하는 함수
export const groupChatsByDate = (chats: ChatRoom[]) => {
  const groups: { [key: string]: ChatRoom[] } = {};

  chats.forEach((chat) => {
    const diffDays = calculateDaysDifference(chat.lastMessageDate);
    const dateKey = getDateGroupKey(diffDays);

    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(chat);
  });

  return groups;
};

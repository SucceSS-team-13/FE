import styles from "../../styles/main/Sidebar.module.less";
import { chatRooms } from "../../data/chatRoomList";

const DATE_GROUP = {
  TODAY: "오늘",
  YESTERDAY: "어제",
  LAST_WEEK: "지난 7일",
  LAST_MONTH: "지난 30일",
  OLDER: "이전 메시지",
} as const;

const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

const calculateDaysDifference = (date: Date): number => {
  const today = new Date();
  return Math.floor((today.getTime() - date.getTime()) / MILLISECONDS_PER_DAY);
};

const getDateGroupKey = (diffDays: number): string => {
  if (diffDays === 0) return DATE_GROUP.TODAY;
  if (diffDays === 1) return DATE_GROUP.YESTERDAY;
  if (diffDays < 7) return DATE_GROUP.LAST_WEEK;
  if (diffDays < 30) return DATE_GROUP.LAST_MONTH;
  return DATE_GROUP.OLDER;
};

const Sidebar = () => {
  // 채팅방을 날짜별로 그룹화하는 함수
  const groupChatsByDate = (chats: ChatRoom[]) => {
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

  const groupedChats = groupChatsByDate(chatRooms);

  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <div className={styles.menuBarItem}>
          <span>
            <button>
              <img src="/image/hideSidepanel.png" />
            </button>
          </span>
        </div>
        <div className={styles.menuBarItem}>
          <span>
            <button>
              <img src="/image/search.png" />
            </button>
          </span>
          <span>
            <button>
              <img src="/image/newChat.png" />
            </button>
          </span>
        </div>
      </div>
      <div className={styles.chatRoomList}>
        <ul>
          {Object.entries(groupedChats).map(([date, chats]) => (
            <div key={date}>
              <span className={styles.chatRoomDate}>{date}</span>
              {chats.map((chat) => (
                <li key={chat.id} className={styles.chatRoom}>
                  {chat.title}
                </li>
              ))}
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

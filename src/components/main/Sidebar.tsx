import styles from "../../styles/main/Sidebar.module.less";
import {
  DATE_GROUP,
  MILLISECONDS_PER_DAY,
} from "../../constants/dateConstants";
import Loading from "../Loading";

const Sidebar = ({
  toggleSidebar,
  chatRoomList,
  lastElementRef,
  isFetchingNextPage,
}: {
  toggleSidebar: () => void;
  chatRoomList: ChatRoom[];
  lastElementRef: (node: HTMLElement | null) => void;
  isFetchingNextPage: boolean;
}) => {
  const calculateDaysDifference = (dateStr: string): number => {
    const today = new Date();
    const date = new Date(dateStr);

    const todayWithoutTime = Date.UTC(
      // 서버 응답값을 UTC기준으로 작성
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate()
    );

    const dateWithoutTime = Date.UTC(
      date.getUTCFullYear(),
      date.getUTCMonth(),
      date.getUTCDate()
    );

    return Math.floor(
      (todayWithoutTime - dateWithoutTime) / MILLISECONDS_PER_DAY
    );
  };

  const getDateGroupKey = (diffDays: number) => {
    if (diffDays === 0) return DATE_GROUP.TODAY;
    if (diffDays === 1) return DATE_GROUP.YESTERDAY;
    if (diffDays <= 7) return DATE_GROUP.LAST_WEEK;
    if (diffDays <= 30) return DATE_GROUP.LAST_MONTH;
    return DATE_GROUP.OLDER;
  };

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

  const groupedChats = groupChatsByDate(chatRoomList);

  return (
    <div className={styles.container}>
      <div className={styles.menuBar}>
        <div className={styles.menuBarItem}>
          <span>
            <button onClick={toggleSidebar}>
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
        {!chatRoomList.length ? (
          <Loading
            text="루미가 샅샅이 뒤졌는데… 아무것도 없네요!"
            size="medium"
          />
        ) : (
          <ul>
            {Object.entries(groupedChats).map(([date, chats]) => (
              <div key={date} className={styles.chatRoomListGroup}>
                <span className={styles.chatRoomDate}>{date}</span>
                {chats.map((chat) => (
                  <li key={chat.id} className={styles.chatRoom}>
                    <a
                      href={`/main/${chat.id}`}
                      className={styles.chatRoomLink}
                    >
                      {chat.title}
                    </a>
                  </li>
                ))}
                <div ref={lastElementRef}></div>
              </div>
            ))}
            {isFetchingNextPage && (
              <div className={styles.loading}>
                <Loading
                  text="루미가 채팅방 목록을 가져오는 중이에요!"
                  size="small"
                />
              </div>
            )}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;

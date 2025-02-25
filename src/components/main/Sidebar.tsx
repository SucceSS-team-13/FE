import styles from "../../styles/main/Sidebar.module.less";
import Loading from "../Loading";
import ActionIcon from "./ActionIcon";
import { groupChatsByDate } from "../../utils/dateUtils";
import useThemeStore from "../../store/themeStore";
import { handleCreateChatRoom } from "../../utils/chatUtils";
import { useNavigate } from "react-router-dom";
const Sidebar = ({
  toggleSidebar,
  chatRoomList,
  lastElementRef,
  isFetchingNextPage,
  setSearchModal,
}: {
  toggleSidebar: () => void;
  chatRoomList: ChatRoom[];
  lastElementRef: (node: HTMLElement | null) => void;
  isFetchingNextPage: boolean;
  setSearchModal: (status: boolean) => void;
}) => {
  const navigate = useNavigate();
  const groupedChats = groupChatsByDate(chatRoomList);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.menuBar}>
        <div className={styles.menuBarItem}>
          <ActionIcon
            icon="/image/hideSidepanel.png"
            onClick={toggleSidebar}
            size="medium"
          />
        </div>
        <div className={styles.menuBarItem}>
          <ActionIcon
            icon="/image/search.png"
            onClick={() => setSearchModal(true)}
            size="small"
          />
          <ActionIcon
            icon="/image/newChat.png"
            onClick={() => handleCreateChatRoom(navigate)}
            size="small"
          />
        </div>
      </div>
      <div
        className={`${styles.chatRoomList} ${
          isDarkMode ? styles.darkChatRoomList : styles.lightChatRoomList
        }`}
      >
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
                  <li
                    key={chat.chatRoomId}
                    className={`${styles.chatRoom} ${
                      isDarkMode ? styles.darkChatRoom : styles.lightChatRoom
                    }`}
                  >
                    <a
                      href={`/main?chatRoomId=${chat.chatRoomId}`}
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

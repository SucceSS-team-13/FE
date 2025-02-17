import styles from "../..//styles/main/Sidebar.module.less";

const Sidebar = () => {
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
          <span className={styles.chatRoomDate}>오늘</span>
          <li className={styles.chatRoom}>첫 번째 채팅방</li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

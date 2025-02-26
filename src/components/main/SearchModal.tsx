import styles from "../../styles/main/SearchModal.module.less";
import ActionIcon from "./ActionIcon";
import { useState, useEffect, useRef } from "react";
import { useInfiniteScroll } from "../../hook/useInfiniteScroll";
import { getSearchChatRoomList } from "../../service/ChattingService";
import { groupChatsByDate } from "../../utils/dateUtils";
import Loading from "../../components/Loading";
import { motion } from "framer-motion";
import useThemeStore from "../../store/themeStore";
import { useNavigate } from "react-router-dom";
import { handleCreateChatRoom } from "../../utils/chatUtils";

const SearchModal = ({
  setSearchModal,
  searchModal,
}: {
  setSearchModal: (status: boolean) => void;
  searchModal: boolean;
}) => {
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState<string>("");
  const [debouncedSearchText, setDebouncedSearchText] = useState<string>("");
  const modalRef = useRef<HTMLDivElement>(null);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  // 디바운스 로직
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchText(searchText);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchText]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 모달창 외부 클릭시 모달창을 닫는 함수
      if (
        modalRef.current && // modalRef.current: useRef를 사용해 모달창의 DOM 요소를 참조, modalRef.current는 모달창의 실제 DOM 노드
        !modalRef.current.contains(event.target as Node) // modalRef.current가 존재하고, 클릭된 요소가 modalRef.current의 자식 요소가 아니라면(모달창 내부가 아니라면)
      ) {
        setSearchModal(false);
      }
    };

    // 이벤트 리스너 추가
    document.addEventListener("mousedown", handleClickOutside);

    // 클린업 함수로 이벤트 리스너 제거
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setSearchModal]);

  const {
    data: searchChatRoomData,
    lastElementRef: searchChatRoomLastElementRef,
    isFetchingNextPage: isFetchingNextSearchChatRoom,
  } = useInfiniteScroll<ChatRoomResponse, [string, string]>({
    queryKey: ["searchChatRoomList", debouncedSearchText],
    queryFn: async ({ pageParam }) => {
      const response = await getSearchChatRoomList({
        pageParam,
        searchText: debouncedSearchText, // 디바운스된 검색어 사용
      });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.result.pageable.pageNumber + 1,
  });
  const searchChatRoomList =
    searchChatRoomData?.pages.flatMap((page) => page.result.content) || [];
  const groupedChats = groupChatsByDate(searchChatRoomList);
  return (
    <div className={styles.container}>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ duration: 0.3 }}
        ref={modalRef}
        className={`${styles.searchModal} ${
          isDarkMode ? styles.darkSearchModal : styles.lightSearchModal
        }`}
      >
        <div className={styles.searchModalHeader}>
          <input
            type="text"
            placeholder="채팅 검색..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <ActionIcon
            icon="/image/close.png"
            size="small"
            onClick={() => setSearchModal(!searchModal)}
          />
        </div>
        <div
          className={`${styles.newChatContainer} ${
            debouncedSearchText ? styles.searchTextTrue : styles.searchTextFalse
          }`}
        >
          {!debouncedSearchText && (
            <div className={styles.newChatButton}>
              <button
                onClick={() => {
                  handleCreateChatRoom(navigate);
                  setSearchModal(false);
                }}
              >
                <img src="/image/newChat.png" alt="newChat" />
                <span>새 채팅</span>
              </button>
            </div>
          )}
        </div>
        <div className={styles.chatListContainer}>
          {!searchChatRoomList?.length ? (
            <Loading text="검색 결과가 없어요!" size="medium" />
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
                      {isDarkMode ? (
                        <img src="/image/darkChat.png" alt="chat" />
                      ) : (
                        <img src="/image/searchChat.png" alt="chat" />
                      )}
                      <a
                        href={`/main?chatRoomId=${chat.chatRoomId}`}
                        className={styles.chatRoomLink}
                      >
                        {chat.title}
                      </a>
                    </li>
                  ))}
                  <div
                    ref={searchChatRoomLastElementRef}
                    className={styles.endRef}
                  ></div>
                </div>
              ))}
              {isFetchingNextSearchChatRoom && (
                <div className={styles.loading}>
                  <Loading
                    text="루미가 검색 결과를 가져오는 중이에요!"
                    size="small"
                  />
                </div>
              )}
            </ul>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default SearchModal;

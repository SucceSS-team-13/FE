import styles from "../styles/main/MainPage.module.less";
import Header from "../components/Header";
import GuideBar from "../components/main/GuideBar";
import { CHAT_GUIDE } from "../data/chatGuide";
import ChatInput from "../components/main/ChatInput";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import {
  getChatting,
  getChatRoomList,
  createChatRoom,
  postChat,
} from "../service/ChattingService";
import Sidebar from "../components/main/Sidebar";
import { useSidebarStore } from "../store/SideBarStatusStore";
import { useInfiniteScroll } from "../hook/useInfiniteScroll";
import MessageContainer from "../components/main/MessageContainer";
import ActionIcon from "../components/main/ActionIcon";
import SearchModal from "../components/main/SearchModal";
import { useChat } from "react-optimistic-chat";

const MainPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const { sideBarStatus, toggleSidebar } = useSidebarStore();
  const [searchModal, setSearchModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const initializeChatRoom = async () => {
      try {
        const urlChatRoomId = searchParams.get("chatRoomId");

        if (urlChatRoomId) {
          setChatRoomId(parseInt(urlChatRoomId));
        } else {
          const newChatRoomId = await createChatRoom();
          setChatRoomId(newChatRoomId);
          navigate(`/main?chatRoomId=${newChatRoomId}`);
        }
      } catch (error) {
        console.error("채팅방 생성 실패:", error);
        alert("채팅방을 초기화하는데 실패했습니다.");
      }
    };

    initializeChatRoom();
  }, [searchParams]);

  const {
    messages: chatting,
    sendUserMessage, 
    isPending, 
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useChat<Chat>({
    queryKey: ["chatting", chatRoomId!],
    queryFn: (pageParam) => getChatting(chatRoomId!, pageParam as number),
    initialPageParam: 0,
    getNextPageParam(lastPage, allPages) {
      if (lastPage.length < 10)
        return undefined;
      return allPages.length;
    },
    mutationFn: async (content) => {
      setInputValue("");
      return postChat(content, chatRoomId!, "user");
    },
    map: (raw) => ({
      id: raw.id,
      role: raw.sender === "user" ? "USER" : "AI",
      content: raw.text,
    }),
  })

  const {
    data: chatRoomData,
    lastElementRef: chatRoomLastElementRef,
    isFetchingNextPage: isFetchingNextChatRoom,
  } = useInfiniteScroll<ChatRoomResponse, [string]>({
    queryKey: ["chatRoomList"],
    queryFn: async ({ pageParam }) => getChatRoomList({ pageParam }),
    getNextPageParam: (lastPage) => {
      return !lastPage.result.last
        ? lastPage.result.pageable.pageNumber + 1
        : undefined;
    },
  });

  const chatRooms =
    chatRoomData?.pages.flatMap((page) => page.result.content) || [];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    sendUserMessage(inputValue);
    if (chatting && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      {searchModal && (
        <SearchModal
          setSearchModal={setSearchModal}
          searchModal={searchModal}
        />
      )}

      <div
        className={`${styles.sideBar} ${!sideBarStatus ? "" : styles.open} ${
          isDarkMode ? styles.dark : styles.light
        }`}
      >
        {sideBarStatus && (
          <Sidebar
            setSearchModal={setSearchModal}
            toggleSidebar={toggleSidebar}
            chatRoomList={chatRooms}
            lastElementRef={chatRoomLastElementRef}
            isFetchingNextPage={isFetchingNextChatRoom}
          />
        )}
        {!sideBarStatus && (
          <div className={styles.menuBarItem}>
            <ActionIcon
              icon="/image/showSidepanel.png"
              onClick={toggleSidebar}
              size="medium"
            />
            <ActionIcon
              icon="/image/newChat.png"
              onClick={() => {}}
              size="small"
            />
          </div>
        )}
      </div>

      <div
        className={`${styles.mainContainer} ${
          isDarkMode ? styles.dark : styles.light
        }`}
      >
        <div
          className={`${styles.header} ${
            isDarkMode ? styles.darkHeader : styles.lightHeader
          }`}
        >
          <Header isDarkMode={isDarkMode} />
        </div>

        <div
          className={`${styles.chatContainer} ${
            !sideBarStatus ? "" : styles.open
          }`}
        >
          <MessageContainer
            messages={chatting}
            isPending={isPending}
            messageEndRef={messageEndRef}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />

          <div className={styles.bottomContainer}>
            <GuideBar guideBar={CHAT_GUIDE} setInputValue={setInputValue} />
            <ChatInput
              handleSendMessage={handleSendMessage}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isPending={isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

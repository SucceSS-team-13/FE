import styles from "../styles/main/MainPage.module.less";
import Header from "../components/Header";
import GuideBar from "../components/main/GuideBar";
import { CHAT_GUIDE } from "../data/chatGuide";
import ChatInput from "../components/main/ChatInput";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import CustomAxios from "../api/CustomAxios";
import {
  getChatting,
  getChatRoomList,
  createChatRoom,
} from "../service/ChattingService";
import Sidebar from "../components/main/Sidebar";
import { useSidebarStore } from "../store/SideBarStatusStore";
import { useInfiniteScroll } from "../hook/useInfiniteScroll";
import MessageContainer from "../components/main/MessageContainer";
import ActionIcon from "../components/main/ActionIcon";
import SearchModal from "../components/main/SearchModal";
import useThemeStore from "../store/themeStore";
const MainPage = () => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);
  const [isNewMessage, setIsNewMessage] = useState(false);
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { sideBarStatus, toggleSidebar } = useSidebarStore();
  const [searchModal, setSearchModal] = useState(false);
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const navigate = useNavigate();
  // const chatRoomId = 1; //msw용 chatRoomId(0: 빈 채팅방, 1: 내용 있는 채팅방)

  useEffect(() => {
    const initializeChatRoom = async () => {
      try {
        const urlChatRoomId = searchParams.get("chatRoomId");

        if (urlChatRoomId) {
          // URL에 chatRoomId가 있는 경우
          setChatRoomId(parseInt(urlChatRoomId));
        } else {
          // URL에 chatRoomId가 없는 경우 새로운 채팅방 생성
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
    data: chatting,
    lastElementRef: messageLastElementRef,
    isFetchingNextPage: isFetchingNextChat,
    isThrottled,
  } = useInfiniteScroll<Chat[], [string, number]>({
    queryKey: ["chatting", chatRoomId!],
    queryFn: async (context) => {
      // chatRoomId가 null일 때 빈 배열을 반환
      if (!chatRoomId) return [];
      return getChatting(context);
    },
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined;
    },
  });

  useEffect(() => {
    if (chatting) {
      const flattenedMessages = chatting.pages.flat();
      setIsNewMessage(false);
      setMessages(flattenedMessages);
    }
  }, [chatting]);

  const postChat = useMutation({
    mutationFn: async () => {
      const messageText = inputValue;
      setInputValue("");
      return CustomAxios.post(`/api/chat`, {
        chatRoomId: chatRoomId,
        text: messageText,
        sender: "user",
      });
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      setIsNewMessage(true);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "chatting") {
          const value =
            queryClient.getQueryData<InfiniteData<Chat[]>>(queryKey);

          if (value) {
            const newUserMessage: Chat = {
              id: Date.now() + 1,
              sender: "user",
              text: inputValue,
            };

            const newLumiMessage: Chat = {
              id: Date.now() + 2,
              sender: "lumi",
              text: "",
            };

            // 첫 번째 페이지에 새 메시지 추가
            const updatedFirstPage = [
              ...value.pages[0],
              newUserMessage,
              newLumiMessage,
            ];

            const newData = {
              pages: [updatedFirstPage, ...value.pages.slice(1)],
              pageParams: [...value.pageParams],
            };

            queryClient.setQueryData(queryKey, newData);
            setMessages(newData.pages.flat());
          }
        }
      });
    },

    onSuccess: (response) => {
      const recomment = response.data.result;
      const lumiResponse: Chat = {
        id: recomment.id,
        sender: "lumi",
        text: recomment.text,
        location: recomment.location,
      };

      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      setIsNewMessage(true); // 새 메시지임을 표시
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "chatting") {
          const value =
            queryClient.getQueryData<InfiniteData<Chat[]>>(queryKey);

          if (value) {
            // 첫 번째 페이지의 두 번째 메시지(빈 AI 메시지)를 업데이트
            const updatedFirstPage = [...value.pages[0]];
            updatedFirstPage[updatedFirstPage.length - 1] = lumiResponse;

            const newData = {
              pages: [updatedFirstPage, ...value.pages.slice(1)],
              pageParams: [...value.pageParams],
            };

            queryClient.setQueryData(queryKey, newData);
            setMessages(newData.pages.flat());
          }
        }
      });
    },
    onError: (error) => {
      console.error("Mutation error: ", error);
    },
  });

  const {
    data: chatRoomData,
    lastElementRef: chatRoomLastElementRef,
    isFetchingNextPage: isFetchingNextChatRoom,
  } = useInfiniteScroll<ChatRoomResponse, [string]>({
    queryKey: ["chatRoomList"],
    queryFn: async ({ pageParam }) => {
      const response = await getChatRoomList({ pageParam });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  console.log("chatRoomData", chatRoomData);
  const chatRooms =
    chatRoomData?.pages.flatMap((page) => page.result.content) || [];

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > 0 && isNewMessage) {
      scrollToBottom();
      setIsNewMessage(false);
    }
  }, [messages, isNewMessage]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    postChat.mutate();
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
          <Header />
        </div>
        <div
          className={`${styles.chatContainer} ${
            !sideBarStatus ? "" : styles.open
          }`}
        >
          <MessageContainer
            messages={messages}
            isPending={postChat.isPending}
            messageEndRef={messageEndRef}
            hasNextPage={!!chatting?.pages[chatting.pages.length - 1]?.length}
            isFetchingNextChat={isFetchingNextChat}
            lastElementRef={messageLastElementRef}
            isThrottled={isThrottled}
          />
          <div className={styles.bottomContainer}>
            <GuideBar guideBar={CHAT_GUIDE} setInputValue={setInputValue} />
            <ChatInput
              handleSendMessage={handleSendMessage}
              inputValue={inputValue}
              setInputValue={setInputValue}
              isPending={postChat.isPending}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;

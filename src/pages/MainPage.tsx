import styles from "../styles/main/MainPage.module.less";
import Header from "../components/Header";
import GuideBar from "../components/main/GuideBar";
import { CHAT_GUIDE } from "../data/chatGuide";
import ChatInput from "../components/main/ChatInput";
import { useState, useEffect, useRef } from "react";
import { InfiniteData, useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../api/CustomAxios";
import { getChatting, getChatRoomList } from "../service/getChatting";
import Sidebar from "../components/main/Sidebar";
import { useSidebarStore } from "../store/SideBarStatusStore";
import { useInfiniteScroll } from "../hook/useInfiniteScroll";
import MessageContainer from "../components/main/MessageContainer";

const MainPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const prevMessagesLengthRef = useRef(0);
  const queryClient = useQueryClient();
  const { sideBarStatus, toggleSidebar } = useSidebarStore(); // 사이드바 상태 관리

  const chatRoomId = 1; //채팅방 ID

  const { 
    data: chatting, 
    isLoading,
    fetchNextPage,
    hasNextPage
     } = useInfiniteQuery<
    Chat[],
    object,
    InfiniteData<Chat[]>,
    [_1: string, number],
    number
  >({
    queryKey: ["chatting", chatRoomId],
    queryFn: getChatting,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length : undefined //페이지 사이즈는 추후 백엔드와 상의해야 함
    },
  });

  useEffect(() => {
    if (!isLoading) {
      const flattenedMessages = chatting?.pages.flat() ?? [];
      // 최신 메시지가 아래에 오도록 순서 유지
      setMessages(flattenedMessages);
    }
  }, [isLoading, chatting]);

  const postChat = useMutation({
    mutationFn: async () => {
      const messageText = inputValue;
      setInputValue("");
      return CustomAxios.post(`/api/chatting/${1}`, {
        text: messageText,
      });
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "chatting") {
          const value = queryClient.getQueryData<InfiniteData<Chat[]>>(queryKey);
          
          if (value) {
            const newUserMessage: Chat = {
              id: Date.now() + 1,
              sender: "user",
              text: inputValue,
            };
            
            const newLumiMessage: Chat = {
              id: Date.now() + 2,
              sender: "lumi",
              text: "", // 로딩 상태를 위한 빈 메시지
            };
    
            // 항상 첫 번째 페이지에 새 메시지 추가
            const newFirstPage = [...(value.pages[0] || []), newUserMessage, newLumiMessage];
            
            const newData = {
              pages: [
                newFirstPage,  // 업데이트된 첫 페이지
                ...value.pages.slice(1)  // 나머지 페이지들
              ],
              pageParams: [...value.pageParams]
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
      
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "chatting") {
          const value = queryClient.getQueryData<InfiniteData<Chat[]>>(queryKey);
          
          if (value) {
            // 첫 페이지의 마지막 메시지(빈 AI 응답)를 실제 응답으로 교체
            const firstPage = [...value.pages[0]];
            firstPage[firstPage.length - 1] = lumiResponse;
    
            const newData = {
              pages: [
                firstPage,  // 업데이트된 첫 페이지
                ...value.pages.slice(1)  // 나머지 페이지들
              ],
              pageParams: [...value.pageParams]
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
    lastElementRef,
    isFetchingNextPage,
  } = useInfiniteScroll<ChatRoomResponse, readonly ["chatRoomList"]>({
    queryKey: ["chatRoomList"] as const,
    queryFn: async ({ pageParam }) => {
      const response = await getChatRoomList({ pageParam });
      return response;
    },
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const chatRooms = chatRoomData?.pages.flatMap((page) => page.result) || [];

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // 이전 메시지 길이와 현재 메시지 길이를 비교하여
  // 새 메시지가 추가된 경우에만 스크롤
  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
      // 새 메시지가 추가된 경우만 스크롤
      scrollToBottom();
    }
    prevMessagesLengthRef.current = messages.length;
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    postChat.mutate();
  };

  return (
    <div className={styles.container}>
      <div className={`${styles.sideBar} ${!sideBarStatus ? "" : styles.open}`}>
        {sideBarStatus && (
          <Sidebar
            toggleSidebar={toggleSidebar}
            chatRoomList={chatRooms}
            lastElementRef={lastElementRef}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
        {!sideBarStatus && (
          <div className={styles.menuBarItem}>
            <span>
              <button onClick={toggleSidebar}>
                <img src="/image/showSidepanel.png" />
              </button>
            </span>
            <span>
              <button>
                <img src="/image/newChat.png" className={styles.newChat} />
              </button>
            </span>
          </div>
        )}
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
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
            hasNextPage={hasNextPage}
            onLoadMore={() => {
              fetchNextPage();
              return Promise.resolve();
            }}
            isLoading={isLoading} // isLoading prop 추가
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

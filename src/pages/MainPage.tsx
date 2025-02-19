import styles from "../styles/main/MainPage.module.less";
import Header from "../components/Header";
import GuideBar from "../components/main/GuideBar";
import { CHAT_GUIDE } from "../data/chatGuide";
import ChatInput from "../components/main/ChatInput";
import { useState, useEffect, useRef } from "react";
import UserMessage from "../components/main/UserMessage";
import AIMessage from "../components/main/AIMessage";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../api/CustomAxios";
import { getChatting, getChatRoomList } from "../service/getChatting";
import Sidebar from "../components/main/Sidebar";
import { useSidebarStore } from "../store/SideBarStatusStore";
import { useInfiniteScroll } from "../hook/useInfiniteScroll";

const MainPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();
  const { sideBarStatus, toggleSidebar } = useSidebarStore(); // 사이드바 상태 관리

  const chatRoomId = 1; //채팅방 ID

  const { data: chatting, isLoading } = useQuery<
    Chat[],
    object,
    Chat[],
    [_1: string, number]
  >({
    queryKey: ["chatting", chatRoomId],
    queryFn: getChatting,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  useEffect(() => {
    // 처음 chatting 내용 가져올 때 message 상태 변수에 저장
    if (!isLoading) {
      setMessages(chatting ? [...chatting] : []);
    }
  }, [isLoading, chatting]);

  const postChat = useMutation({
    mutationFn: async () => {
      return CustomAxios.post(`/api/chatting/${1}`, {
        text: inputValue,
      });
    },
    onMutate() {
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "chatting") {
          const value: Chat[] = queryClient.getQueryData(queryKey) ?? []; //undefined라면 빈 배열 추가
          const shallow = [...value];
          shallow.push({
            id: Date.now() + 1,
            sender: "user",
            text: inputValue,
          });
          shallow.push({
            //로딩을 보여주기 위한 빈 메시지 생성
            id: Date.now() + 2,
            sender: "lumi",
            text: "",
          });
          queryClient.setQueryData(queryKey, shallow);
          setMessages(shallow);
        }
      });
    },
    onSuccess: (response) => {
      setInputValue("");
      const recomment = response.data.result;
      const lumiResponse: Chat = {
        id: recomment.id,
        sender: "lumi",
        text: recomment.text,
        location: recomment.location,
      };

      //퀴리 캐시 업데이트
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "chatting") {
          const value: Chat[] = queryClient.getQueryData(queryKey) ?? [];
          const shallow = [...value];
          // 마지막 메시지(빈 AI 응답)를 실제 응답으로 교체
          shallow[shallow.length - 1] = lumiResponse;
          queryClient.setQueryData(queryKey, shallow);
          setMessages(shallow);
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
  } = useInfiniteScroll<ChatRoomResponse>({
    queryKey: "chatRoomList",
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

  useEffect(() => {
    scrollToBottom();
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
          <div className={styles.messageContainer}>
            {messages.map((message, index) => {
              if (message.sender === "user") {
                return <UserMessage message={message.text} key={index} />;
              } else {
                return (
                  <AIMessage
                    message={message.text}
                    key={index}
                    isLoading={
                      message.sender === "lumi" &&
                      message.text === "" &&
                      postChat.isPending
                    }
                    location={message.location}
                  />
                );
              }
            })}
            <div ref={messageEndRef} />
          </div>
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

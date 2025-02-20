import styles from "../styles/main/MainPage.module.less";
import Header from "../components/Header";
import GuideBar from "../components/main/GuideBar";
import { CHAT_GUIDE } from "../data/chatGuide";
import ChatInput from "../components/main/ChatInput";
import { useState, useEffect, useRef } from "react";
import { InfiniteData, useMutation, useQueryClient } from "@tanstack/react-query";
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
  const { sideBarStatus, toggleSidebar } = useSidebarStore();

  const chatRoomId = 1;

  const {
    data: chatting,
    lastElementRef: messageLastElementRef,
  } = useInfiniteScroll<Chat[], [string, number]>({
    queryKey: ["chatting", chatRoomId],
    queryFn: getChatting,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length === 10 ? allPages.length + 1 : undefined
    },
  });

  useEffect(() => {
    if (chatting) {
      const flattenedMessages = chatting.pages.flat();
      setMessages(flattenedMessages);
    }
  }, [chatting]);

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
              text: "",
            };
    
            const newFirstPage = [...(value.pages[0] || []), newUserMessage, newLumiMessage];
            
            const newData = {
              pages: [newFirstPage, ...value.pages.slice(1)],
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
            const firstPage = [...value.pages[0]];
            firstPage[firstPage.length - 1] = lumiResponse;
    
            const newData = {
              pages: [firstPage, ...value.pages.slice(1)],
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

  const chatRooms = chatRoomData?.pages.flatMap((page) => page.result) || [];

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messages.length > prevMessagesLengthRef.current) {
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
            lastElementRef={chatRoomLastElementRef}
            isFetchingNextPage={isFetchingNextChatRoom}
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
            hasNextPage={!!chatting?.pages[chatting.pages.length - 1]?.length}
            isLoading={!chatting}
            lastElementRef={messageLastElementRef}
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
import styles from "../styles/main/MainPage.module.less";
import Header from "../components/Header";
import GuideBar from "../components/main/GuideBar";
import { CHAT_GUIDE } from "../data/chatGuide";
import ChatInput from "../components/main/ChatInput";
import { useState, useEffect, useRef } from "react";
import UserMessage from "../components/main/UserMessage";
import AIMessage from "../components/main/AIMessage";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import CustomAxios from "../api/CustomAxios";
import { getChatting } from "../service/getChatting";

const MainPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Chat[]>([]);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const queryClient = useQueryClient();

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

      //퀴리 캐시 업데이트
      const queryCache = queryClient.getQueryCache();
      const queryKeys = queryCache.getAll().map((cache) => cache.queryKey);
      queryKeys.forEach((queryKey) => {
        if (queryKey[0] === "chatting") {
          const value: Chat[] = queryClient.getQueryData(queryKey) ?? [];
          const shallow = [...value];
          // 마지막 메시지(빈 AI 응답)를 실제 응답으로 교체
          shallow[shallow.length - 1] = recomment;
          queryClient.setQueryData(queryKey, shallow);
          setMessages(shallow);
        }
      });
    },
    onError: (error) => {
      console.error("Mutation error: ", error);
    },
  });

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
      <Sidebar className={styles.sideBar}>
        <Menu>
          <MenuItem> 메뉴 1 </MenuItem>
          <MenuItem> 메뉴 2 </MenuItem>
          <MenuItem> 메뉴 3 </MenuItem>
        </Menu>
      </Sidebar>
      <div className={styles.mainContainer}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.chatContainer}>
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
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default MainPage;

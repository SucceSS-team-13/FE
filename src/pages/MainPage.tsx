import styles from "../styles/main/MainPage.module.less";
import Header from "../components/Header";
import GuideBar from "../components/main/GuideBar";
import { CHAT_GUIDE } from "../data/chatGuide";
import ChatInput from "../components/main/ChatInput";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
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

const MainPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [searchParams] = useSearchParams();
  const [inputValue, setInputValue] = useState("");
  const [chatRoomId, setChatRoomId] = useState<number | null>(null);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();
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
    data: chatting,
    lastElementRef: messageLastElementRef,
    isFetchingNextPage: isFetchingNextChat,
    hasNextPage,
  } = useInfiniteScroll<Chat[], [string, number]>({
    queryKey: ["chatting", chatRoomId!],
    queryFn: getChatting,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.length < 10) return undefined;
      return allPages.length;
    },
  });

  useEffect(() => {
    if (chatting && messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatting?.pages]);

  const postChat = useMutation({
    mutationFn: async () => {
      const messageText = inputValue;
      setInputValue("");
      return CustomAxios.post(`/api/chat`, {
        chatRoomId,
        text: messageText,
        sender: "user",
      });
    },

    onMutate: () => {
      const value = queryClient.getQueryData<InfiniteData<Chat[]>>([
        "chatting",
        chatRoomId,
      ]);

      if (!value) return;

      const newUserMsg: Chat = {
        id: Date.now() + 1,
        sender: "user",
        text: inputValue,
      };

      const newLumiMsg: Chat = {
        id: Date.now() + 2,
        sender: "lumi",
        text: "",
      };

      const updatedFirstPage = [
        newLumiMsg,
        newUserMsg,
        ...value.pages[0],
      ];

      const newData: InfiniteData<Chat[]> = {
        pages: [updatedFirstPage, ...value.pages.slice(1)],
        pageParams: [...value.pageParams],
      };

      queryClient.setQueryData(["chatting", chatRoomId], newData);
    },

    onSuccess: (response) => {
      const value = queryClient.getQueryData<InfiniteData<Chat[]>>([
        "chatting",
        chatRoomId,
      ]);
      if (!value) return;

      const recomment = response.data.result;

      const lumiResponse: Chat = {
        id: recomment.id,
        sender: "lumi",
        text: recomment.text,
        location: recomment.location,
      };

      const updatedFirstPage = [...value.pages[0]];
      updatedFirstPage[0] = lumiResponse;

      const newData: InfiniteData<Chat[]> = {
        pages: [updatedFirstPage, ...value.pages.slice(1)],
        pageParams: [...value.pageParams],
      };

      queryClient.setQueryData(["chatting", chatRoomId], newData);
    },

    onError: (e) => console.error("Mutation error:", e),
  });

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
          <Header isDarkMode={isDarkMode} />
        </div>

        <div
          className={`${styles.chatContainer} ${
            !sideBarStatus ? "" : styles.open
          }`}
        >
          <MessageContainer
            messages={chatting?.pages.flat() ?? []}
            isPending={postChat.isPending}
            messageEndRef={messageEndRef}
            hasNextPage={hasNextPage}
            isFetchingNextChat={isFetchingNextChat}
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

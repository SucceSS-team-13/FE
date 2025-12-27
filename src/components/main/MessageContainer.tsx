import { RefObject, useEffect, useRef } from "react";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import styles from "../../styles/main/MainPage.module.less";
import LoadingSpinner from "../LoadingSpinner";
import type { Message } from "react-optimistic-chat";

type TMessage = Message<{
  location?: string[];
}>;

const MessageContainer = ({
  messages,
  isPending,
  messageEndRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: {
  messages: TMessage[];
  isPending: boolean;
  messageEndRef: RefObject<HTMLDivElement | null>;
  fetchNextPage?: () => void;
  hasNextPage?: boolean;
  isFetchingNextPage: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  // 스크롤 이벤트 처리
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleScroll = async () => {
      // 최상단 도달 시 과거 메시지 로딩
      if (
        el.scrollTop === 0 &&
        hasNextPage &&
        !isFetchingNextPage &&
        fetchNextPage
      ) {
        const prevScrollHeight = el.scrollHeight;

        await fetchNextPage();
        
        requestAnimationFrame(() => {
          const newScrollHeight = el.scrollHeight;
          el.scrollTop = newScrollHeight - prevScrollHeight;
        });
      }
    };

    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div ref={scrollRef} className={styles.messageContainer}>
      <div className={styles.messagesWrapper}>
        {hasNextPage && isFetchingNextPage && (
          <div className={styles.loadingTrigger}>
            <LoadingSpinner size={"sm"} />
          </div>
        )}
        {messages.map((message, index) => {
          if (message.role === "USER") {
            return (
              <UserMessage message={message.content} key={message.id || index} />
            );
          } else {
            return (
              <AIMessage
                message={message.content}
                key={message.id}
                isLoading={
                  message.role === "AI" && message.content === "" && isPending
                }
                location={message.location}
              />
            );
          }
        })}
        <div ref={messageEndRef} />
      </div>
    </div>
  );
};

export default MessageContainer;

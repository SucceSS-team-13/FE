import { RefObject, useEffect, useState, useRef } from "react";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import styles from "../../styles/main/MainPage.module.less";
import { useInView } from "react-intersection-observer";

const MessageContainer = ({
  messages,
  isPending,
  messageEndRef,
  hasNextPage,
  onLoadMore,
  isLoading,
}: {
  messages: Chat[];
  isPending: boolean;
  messageEndRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean | undefined;
  onLoadMore: () => Promise<void>;
  isLoading: boolean;
}) => {
  const [initialRenderComplete, setInitialRenderComplete] = useState(false);
  const isLoadingRef = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [prevScrollHeight, setPrevScrollHeight] = useState(0);

  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialRenderComplete(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Preserve scroll position when new messages are loaded at the top
  useEffect(() => {
    if (containerRef.current && prevScrollHeight) {
      const newScrollHeight = containerRef.current.scrollHeight;
      const scrollDiff = newScrollHeight - prevScrollHeight;
      containerRef.current.scrollTop = scrollDiff;
    }
  }, [messages, prevScrollHeight]);

  useEffect(() => {
    const handleLoadMore = async () => {
      if (isLoadingRef.current) return;
      
      try {
        isLoadingRef.current = true;
        // Store the current scroll height before loading more messages
        if (containerRef.current) {
          setPrevScrollHeight(containerRef.current.scrollHeight);
        }
        await onLoadMore();
      } finally {
        setTimeout(() => {
          isLoadingRef.current = false;
        }, 500);
      }
    };

    if (inView && hasNextPage && !isLoading && initialRenderComplete && !isLoadingRef.current) {
      handleLoadMore();
    }
  }, [inView, hasNextPage, onLoadMore, isLoading, initialRenderComplete]);

  // Reverse the messages array to show newest at bottom
  const reversedMessages = [...messages].reverse();

  return (
    <div className={styles.messageContainer} ref={containerRef}>
      <div className={styles.messagesWrapper}>
        {/* Load more trigger at top */}
        {hasNextPage && !isLoading && initialRenderComplete && (
          <div ref={ref} className={styles.loadingTrigger} />
        )}
        {reversedMessages.map((message, index) => {
          if (message.sender === "user") {
            return <UserMessage message={message.text} key={message.id || index} />;
          } else {
            return (
              <AIMessage
                message={message.text}
                key={message.id || index}
                isLoading={message.sender === "lumi" && message.text === "" && isPending}
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
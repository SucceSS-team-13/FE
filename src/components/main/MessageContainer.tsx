import { RefObject, useEffect } from "react";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import styles from "../../styles/main/MainPage.module.less";
import LoadingSpinner from "../LoadingSpinner";

const MessageContainer = ({
  messages,
  isPending,
  messageEndRef,
  hasNextPage,
  lastElementRef,
  isFetchingNextChat,
  isThrottled,
}: {
  messages: Chat[];
  isPending: boolean;
  messageEndRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean | undefined;
  lastElementRef: (node: HTMLElement | null) => void;
  isFetchingNextChat: boolean;
  isThrottled: boolean;
}) => {
  const reversedMessages = [...messages].reverse();

  useEffect(() => {
    console.log("hasNextPage: ", hasNextPage, ", isFetchingNextChat: ", isFetchingNextChat, ", isThrotteled: ", isThrottled);
  }, [hasNextPage, isFetchingNextChat, isThrottled])

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messagesWrapper}>
        {reversedMessages.length >= 10 && hasNextPage && !isFetchingNextChat && !isThrottled && (
          <div ref={lastElementRef} className={styles.loadingTrigger}>
            <LoadingSpinner size={"sm"} />
          </div>
        )}
        {reversedMessages.map((message, index) => {
          if (message.sender === "user") {
            return (
              <UserMessage message={message.text} key={message.id || index} />
            );
          } else {
            return (
              <AIMessage
                message={message.text}
                key={message.id}
                isLoading={
                  message.sender === "lumi" && message.text === "" && isPending
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

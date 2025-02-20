import { RefObject } from "react";
import AIMessage from "./AIMessage";
import UserMessage from "./UserMessage";
import styles from "../../styles/main/MainPage.module.less";

const MessageContainer = ({
  messages,
  isPending,
  messageEndRef,
  hasNextPage,
  isLoading,
  lastElementRef,
}: {
  messages: Chat[];
  isPending: boolean;
  messageEndRef: RefObject<HTMLDivElement | null>;
  hasNextPage: boolean | undefined;
  isLoading: boolean;
  lastElementRef: (node: HTMLElement | null) => void;
}) => {
  const reversedMessages = [...messages].reverse();

  return (
    <div className={styles.messageContainer}>
      <div className={styles.messagesWrapper}>
        {hasNextPage && !isLoading && (
          <div ref={lastElementRef} className={styles.loadingTrigger} />
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
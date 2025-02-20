import { RefObject, useEffect } from "react";
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
}: {
  messages: Chat[],
  isPending: boolean,
  messageEndRef: RefObject<HTMLDivElement | null>,
  hasNextPage: boolean | undefined,
  onLoadMore: () => Promise<void>;
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage) {
      onLoadMore();
    }
  }, [inView, hasNextPage, onLoadMore]);

  return (
    <div className={styles.messageContainer}>
      {hasNextPage && <div ref={ref} style={{height: "1px"}} />}
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
                isPending
              }
              location={message.location}
            />
          );
        }
      })}
      <div ref={messageEndRef} />
    </div>
  )
}

export default MessageContainer;
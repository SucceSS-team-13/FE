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
  isLoading, // MainPage에서 isLoading prop 추가 필요
}: {
  messages: Chat[],
  isPending: boolean,
  messageEndRef: RefObject<HTMLDivElement | null>,
  hasNextPage: boolean | undefined,
  onLoadMore: () => Promise<void>;
  isLoading: boolean;
}) => {
  const { ref, inView } = useInView({
    threshold: 0,
    delay: 0,
  });

  useEffect(() => {
    // isLoading이 false일 때만 새로운 데이터를 불러옵니다
    if (inView && hasNextPage && !isLoading) {
      onLoadMore();
    }
  }, [inView, hasNextPage, onLoadMore, isLoading]);

  // 메시지 배열을 역순으로 정렬합니다
  const reversedMessages = [...messages].reverse();

  return (
    <div className={styles.messageContainer}>
      <div ref={messageEndRef} />
      {reversedMessages.map((message, index) => {
        if (message.sender === "user") {
          return <UserMessage message={message.text} key={message.id || index} />;
        } else {
          return (
            <AIMessage
              message={message.text}
              key={message.id || index}
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
      {hasNextPage && !isLoading && <div ref={ref} style={{height: "1px"}} />}
    </div>
  )
}

export default MessageContainer;

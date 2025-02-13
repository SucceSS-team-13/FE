import styles from "../styles/main/MainPage.module.less";
import Header from "../components/Header";
import GuideBar from "../components/main/GuideBar";
import { CHAT_GUIDE } from "../data/chatGuide";
import ChatInput from "../components/main/ChatInput";
import { useState, useEffect, useRef } from "react";
import UserMessage from "../components/main/UserMessage";
import AIMessage from "../components/main/AIMessage";
import { CHAT_RESPONSES } from "../data/chatResponses";

const MainPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "lumi" }[]
  >([]);
  const messageEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    if (CHAT_RESPONSES[inputValue]) {
      e.preventDefault();
      setMessages([
        ...messages,
        { text: inputValue, sender: "user" },
        { text: CHAT_RESPONSES[inputValue], sender: "lumi" },
      ]);
      setInputValue("");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.sideBar}>1</div>
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
                return <AIMessage message={message.text} key={index} />;
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

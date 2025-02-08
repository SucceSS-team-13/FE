import styles from "../../styles/landing/ChatPreview.module.less";
import { useState } from "react";
const ChatPreview = ({ chatResponses }: { chatResponses: ChatResponses }) => {
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<
    { text: string; sender: "user" | "lumi" }[]
  >([]);

  const handleSendMessage = () => {
    if (chatResponses[inputValue]) {
      setMessages([
        ...messages,
        { text: inputValue, sender: "user" },
        { text: chatResponses[inputValue], sender: "lumi" },
      ]);
      setInputValue("");
    }
  };
  return (
    <div className={styles.chatContainer}>
      <div className={styles.box}>
        <div className={styles.messageContainer}>
          {messages.map((message, index) => {
            if (message.sender === "user") {
              return (
                <div className={styles.userMessage} key={index}>
                  {message.text}
                </div>
              );
            } else {
              return (
                <div className={styles.lumiContainer} key={index}>
                  <div className={styles.lumiLogo}>
                    <img src="/image/logo.png" />
                  </div>
                  <p className={styles.lumiMessage}>{message.text}</p>
                </div>
              );
            }
          })}
        </div>
        <div className={styles.bottomContainer}>
          <div className={styles.selectContainer}>
            {Object.keys(chatResponses).map((key) => (
              <button
                key={key}
                className={styles.selectBtn}
                onClick={() => {
                  setInputValue(key);
                }}
              >
                {key}
              </button>
            ))}
          </div>
          <div className={styles.inputContainer}>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="메시지를 입력하세요..."
            />
            <button onClick={handleSendMessage} className={styles.sendBtn}>
              <img src="/image/btn.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPreview;

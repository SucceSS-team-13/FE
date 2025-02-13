import styles from "../../styles/main/ChatInput.module.less";

const ChatInput = ({
  handleSendMessage,
  inputValue,
  setInputValue,
}: {
  handleSendMessage: () => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}) => {
  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button className={styles.sendBtn} onClick={handleSendMessage}>
        <img src="/image/btn.png" />
      </button>
    </div>
  );
};
export default ChatInput;

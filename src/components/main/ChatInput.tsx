import styles from "../../styles/main/ChatInput.module.less";

const ChatInput = ({
  handleSendMessage,
  inputValue,
  setInputValue,
}: {
  handleSendMessage: (e: React.FormEvent) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    if (inputValue.trim()) {
      handleSendMessage(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="메시지를 입력하세요..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button className={styles.sendBtn} onClick={handleSubmit}>
        <img src="/image/btn.png" />
      </button>
    </div>
  );
};
export default ChatInput;

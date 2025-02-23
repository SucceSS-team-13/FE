import styles from "../../styles/main/ChatInput.module.less";
import useThemeStore from "../../store/themeStore";
const ChatInput = ({
  handleSendMessage,
  inputValue,
  setInputValue,
  isPending,
}: {
  handleSendMessage: (e: React.FormEvent) => void;
  inputValue: string;
  setInputValue: (value: string) => void;
  isPending: boolean;
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const handleSubmit = (e: React.FormEvent) => {
    if (inputValue.trim() && !isPending) {
      handleSendMessage(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !isPending) {
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
        className={`${styles.chatInput} ${
          isDarkMode ? styles.darkChatInput : styles.lightChatInput
        }`}
      />
      <button className={styles.sendBtn} onClick={handleSubmit}>
        <img src="/image/btn.png" />
      </button>
    </div>
  );
};
export default ChatInput;

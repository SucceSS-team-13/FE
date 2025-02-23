import { MessageCircle } from "lucide-react";
import styles from "../../styles/BasicInfo/Result.module.less";
import useThemeStore from "../../store/themeStore";
type Props = {
  onChatStart: () => void;
  result: string;
  nickname: string;
};

const Result = ({ onChatStart, result, nickname }: Props) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.content}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h1
            className={`${styles.title} ${
              isDarkMode ? styles.darkTitle : styles.lightTitle
            }`}
          >
            {nickname} 님의 성향 분석 결과
          </h1>
          <p className={styles.subtitle}>AI가 분석한 맞춤형 결과입니다</p>
        </div>

        {/* 분석 결과 */}
        <div className={styles.resultCard}>
          <div className={styles.resultText}>{result}</div>
        </div>

        {/* 상담 시작 버튼 */}
        <button onClick={onChatStart} className={styles.chatButton}>
          <MessageCircle size={20} />
          <span className={styles.buttonText}>고민 털어놓기</span>
        </button>
      </div>
    </div>
  );
};

export default Result;

import { useEffect } from "react";
import { Brain } from "lucide-react";
import Logo from "../Logo";
import styles from "../../styles/BasicInfo/Loading.module.less";

type Props = {
  onNext: () => void;
}

const Loading = ({ onNext }: Props) => {
  useEffect(() => {
    setTimeout(() => {
      onNext();
    }, 5000);
  });

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 로고 */}
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        
        {/* 로딩 메시지 */}
        <div className={styles.messageContainer}>
          사용자의 성향을 분석 중이에요
          <span className={styles.dots}>
            <span className={styles.dot1}>.</span>
            <span className={styles.dot2}>.</span>
            <span className={styles.dot3}>.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
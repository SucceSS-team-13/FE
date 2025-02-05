import { useEffect, useState } from "react";
import Logo from "../Logo";
import styles from "../../styles/BasicInfo/Loading.module.less";

type Props = {
  onNext: () => void;
}

const Loading = ({ onNext }: Props) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onNext, 500); // 애니메이션 시간만큼 지연
    }, 4500);

    return () => clearTimeout(timer);
  });

  return (
    <div className={`${styles.container} ${isExiting ? styles.exit : ''}`}>
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
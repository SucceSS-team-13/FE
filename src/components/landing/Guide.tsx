import styles from "../../styles/landing/Guide.module.less";
import { useNavigate } from "react-router-dom";

const Guide = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.guide}>
        <p className={styles.guideText}>
          지금 바로, 더 나은 내일을 시작하세요.
        </p>
        <button onClick={() => navigate("/login")}>시작하기</button>
      </div>
    </div>
  );
};

export default Guide;

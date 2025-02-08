import styles from "../../styles/landing/Guide.module.less";

const Guide = () => {
  return (
    <div className={styles.container}>
      <div className={styles.white}></div>
      <div className={styles.guide}>
        <p className={styles.guideText}>
          지금 바로, 더 나은 내일을 시작하세요.
        </p>
        <button>시작하기</button>
      </div>
    </div>
  );
};

export default Guide;

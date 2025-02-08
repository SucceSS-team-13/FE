import styles from "../styles/Footer.module.less";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <span className={styles.devText}>오늘도 고생 많으셨습니다.</span>
        <span className={styles.devText}>
          당신의 마음을 더 잘 이해하기 위해 배우고 성장하겠습니다.
        </span>
        <span>
          "오늘 어땠어"는 Google Developer Groups on Campus 소속 대학교 간 연합
          프로젝트로 개발되었습니다.
        </span>
        <span>참여 대학: 성공회대학교, 숙명여자대학교, 성신여자대학교.</span>
      </div>
    </div>
  );
};

export default Footer;

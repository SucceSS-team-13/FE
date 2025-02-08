import styles from "../../styles/landing/Growth.module.less";
import EmotionPreview from "../EmotionPreview";

const Growth = () => {
  return (
    <div className={styles.container}>
      <div className={styles.leftContainer}>
        <div className={styles.title}>
          <p className={styles.titleText}>
            오늘 어땠어의<span>성장</span>
          </p>
          <div className={styles.subTitle}>
            <p className={styles.subTitleText}>
              앞으로 추가될 오늘 어땠어의 기능입니다!
            </p>
          </div>
        </div>
        <div className={styles.padding}></div>
        <div className={styles.body}>
          <div className={styles.bodyText}>
            <p>1. 오늘의 감정을 간단히 기록해보세요.</p>
            <span>
              하루 동안 느낀 감정을 짧게 남기는 것만으로도 마음을 정리할 수
              있어요. 당신의 하루를 차곡차곡 쌓아가며, 나만의 감정 기록장을
              만들어보세요.
            </span>
            <p>2. AI가 제안한 솔루션을 저장해보세요.</p>
            <span>
              당신만을 위한 AI 솔루션을 저장하고, 필요할 때 다시 꺼내볼 수
              있어요. 일상 속 작은 변화를 만들어가는 데 유용한 도구가 되어줄
              거예요.
            </span>
          </div>
        </div>
      </div>
      <div className={styles.rightContainer}>
        <div className={styles.topContainer}>
          <EmotionPreview />
        </div>
        <div className={styles.bottomContainer}>
          <img src="../../../public/image/solution.gif" />
        </div>
      </div>
    </div>
  );
};

export default Growth;

import { FormEvent } from "react";
import { Users, User, Heart, Brain } from "lucide-react";
import styles from "../../styles/BasicInfo/PersonalitySelection.module.less";
import useThemeStore from "../../store/themeStore";
type Props = {
  onNext: () => void;
  energyType: string;
  setEnergyType: (type: string) => void;
  decisionType: string;
  setDecisionType: (type: string) => void;
};

const PersonalitySelection = ({
  onNext,
  energyType,
  setEnergyType,
  decisionType,
  setDecisionType,
}: Props) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (energyType && decisionType && onNext) {
      onNext();
    }
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2
            className={`${styles.title} ${
              isDarkMode ? styles.darkTitle : styles.lightTitle
            }`}
          >
            당신만의 특별한 성향을 공유해주세요
          </h2>
          <p className={styles.subtitle}>
            에너지 방향과 판단 방식에 따라 맞춤 상담을 제공해드려요
          </p>
        </div>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.sectionsContainer}>
            {/* 에너지 방향 선택 */}
            <div className={styles.section}>
              <p className={styles.sectionTitle}>1. 에너지 방향</p>
              <div className={styles.buttonGrid}>
                <button
                  type="button"
                  onClick={() => setEnergyType("EXTROVERT")}
                  className={`${styles.typeButton} ${
                    energyType === "EXTROVERT" ? styles.selected : ""
                  }`}
                >
                  <div className={styles.leftContent}>
                    <Users className={styles.icon} />
                    <span className={styles.buttonTitle}>외향형</span>
                  </div>
                  <span className={styles.rightContent}>
                    사람들과 수다 떨며 에너지를 충전하는 사교왕 스타일!
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setEnergyType("INTROVERT")}
                  className={`${styles.typeButton} ${
                    energyType === "INTROVERT" ? styles.selected : ""
                  }`}
                >
                  <div className={styles.leftContent}>
                    <User className={styles.icon} />
                    <span className={styles.buttonTitle}>내향형</span>
                  </div>
                  <span className={styles.rightContent}>
                    혼자만의 시간을 최고로 여기는 조용한 힐링러
                  </span>
                </button>
              </div>
            </div>

            {/* 판단 결정 선택 */}
            <div className={styles.section}>
              <p className={styles.sectionTitle}>2. 판단 결정</p>
              <div className={styles.buttonGrid}>
                <button
                  type="button"
                  onClick={() => setDecisionType("EMOTIONAL")}
                  className={`${styles.typeButton} ${
                    decisionType === "EMOTIONAL" ? styles.selected : ""
                  }`}
                >
                  <div className={styles.leftContent}>
                    <Heart className={styles.icon} />
                    <span className={styles.buttonTitle}>감정형</span>
                  </div>
                  <span className={styles.rightContent}>
                    타인의 기분을 먼저 챙기는 따뜻한 공감 요정
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setDecisionType("LOGICAL")}
                  className={`${styles.typeButton} ${
                    decisionType === "LOGICAL" ? styles.selected : ""
                  }`}
                >
                  <div className={styles.leftContent}>
                    <Brain className={styles.icon} />
                    <span className={styles.buttonTitle}>이성형</span>
                  </div>
                  <span className={styles.rightContent}>
                    논리와 데이터로 무장한 이성적인 해결사!
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div className={styles.submitWrapper}>
            <button
              type="submit"
              disabled={!energyType || !decisionType}
              className={`${styles.submitButton} ${
                !(energyType && decisionType)
                  ? styles.inactiveSubmit
                  : styles.activeSubmit
              }`}
            >
              다음
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalitySelection;

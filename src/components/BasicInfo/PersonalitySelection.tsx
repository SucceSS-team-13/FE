import { useState, FormEvent } from "react";
import { Users, User, Heart, Brain } from 'lucide-react';
import styles from "../../styles/BasicInfo/PersonalitySelection.module.less"

type Props = {
  onNext: () => void;
}

const PersonalitySelection = ({ onNext }: Props) => {
  const [energyType, setEnergyType] = useState<string>('');
  const [decisionType, setDecisionType] = useState<string>('');

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (energyType && decisionType && onNext) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          성향을 선택해주세요
        </h2>
        <p className={styles.subtitle}>
          맞춤형 상담 서비스를 위해 당신의 성향을 선택해주세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 에너지 방향 선택 */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>1. 에너지 방향</p>
          <div className={styles.buttonGrid}>
            <button
              type="button"
              onClick={() => setEnergyType('외향형')}
              className={`${styles.typeButton} ${
                energyType === '외향형' ? styles.selected : ''
              }`}
            >
              <Users size={32} className={styles.icon} />
              <span className={styles.buttonTitle}>외향형</span>
              <span className={styles.buttonSubtext}>사교적, 활동적</span>
            </button>
            <button
              type="button"
              onClick={() => setEnergyType('내향형')}
              className={`${styles.typeButton} ${
                energyType === '내향형' ? styles.selected : ''
              }`}
            >
              <User size={32} className={styles.icon} />
              <span className={styles.buttonTitle}>내향형</span>
              <span className={styles.buttonSubtext}>신중함, 독립적</span>
            </button>
          </div>
        </div>

        {/* 판단 결정 선택 */}
        <div className={styles.section}>
          <p className={styles.sectionTitle}>2. 판단 결정</p>
          <div className={styles.buttonGrid}>
            <button
              type="button"
              onClick={() => setDecisionType('감정형')}
              className={`${styles.typeButton} ${
                decisionType === '감정형' ? styles.selected : ''
              }`}
            >
              <Heart size={32} className={styles.icon} />
              <span className={styles.buttonTitle}>감정형</span>
              <span className={styles.buttonSubtext}>공감, 조화</span>
            </button>
            <button
              type="button"
              onClick={() => setDecisionType('사고형')}
              className={`${styles.typeButton} ${
                decisionType === '사고형' ? styles.selected : ''
              }`}
            >
              <Brain size={32} className={styles.icon} />
              <span className={styles.buttonTitle}>사고형</span>
              <span className={styles.buttonSubtext}>논리, 객관성</span>
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={!energyType || !decisionType}
          className={`${styles.submitButton} ${
            !(energyType && decisionType) ? styles.disabled : ''
          }`}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default PersonalitySelection;
import { useState, FormEvent } from "react";
import styles from '../../styles/BasicInfo/AgeSelection.module.less';

type Props = {
  onNext: () => void;
}

const AgeSelection = ({ onNext }: Props) => {
  const [selectedAge, setSelectedAge] = useState('');
  
  const ageRanges = [
    '10대', '20대', '30대', '40대', '50대', '60대', '70대'
  ];

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedAge && onNext) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>나이를 선택해주세요</h2>
        <p className={styles.subtitle}>맞춤형 상담 서비스를 위해 연령대를 선택해주세요</p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.buttonGrid}>
          {ageRanges.map((age) => (
            <button
              key={age}
              type="button"
              onClick={() => setSelectedAge(age)}
              className={`${styles.ageButton} ${
                selectedAge === age ? styles.selectedButton : styles.unselectedButton
              }`}
            >
              {age}
            </button>
          ))}
        </div>

        <div className={styles.submitWrapper}>
          <button
            type="submit"
            disabled={!selectedAge}
            className={`${styles.submitButton} ${
              selectedAge ? styles.activeSubmit : styles.inactiveSubmit
            }`}
          >
            다음
          </button>
        </div>
      </form>
    </div>
  );
};

export default AgeSelection;
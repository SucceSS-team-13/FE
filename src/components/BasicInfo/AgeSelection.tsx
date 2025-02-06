import { useState, FormEvent } from "react";
import { Backpack, GraduationCap, Briefcase, Users, Heart, School } from "lucide-react";
import styles from '../../styles/BasicInfo/AgeSelection.module.less';

type Props = {
  onNext: () => void;
}

type AgeOption = {
  value: string;
  icon: React.ReactNode;
  label: string;
}

const AgeSelection = ({ onNext }: Props) => {
  const [selectedAge, setSelectedAge] = useState('');
  
  const ageOptions: AgeOption[] = [
    {
      value: '10대',
      icon: <School size={24} />,
      label: '학생'
    },
    {
      value: '20대',
      icon: <GraduationCap size={24} />,
      label: '청년'
    },
    {
      value: '30대',
      icon: <Briefcase size={24} />,
      label: '직장인'
    },
    {
      value: '40대',
      icon: <Users size={24} />,
      label: '중년'
    },
    {
      value: '50대~',
      icon: <Heart size={24} />,
      label: '장년'
    }
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
        <h2 className={styles.title}>당신의 이야기를 더 잘 이해하고 싶어요</h2>
        <p className={styles.subtitle}>
          더 나은 대화를 위해 연령대를 알려주시겠어요?
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.buttonGrid}>
          {ageOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSelectedAge(option.value)}
              className={`${styles.ageButton} ${
                selectedAge === option.value ? styles.selectedButton : styles.unselectedButton
              }`}
            >
              <div className={styles.buttonContent}>
                <span className={styles.icon}>{option.icon}</span>
                <span className={styles.ageValue}>{option.value}</span>
                <span className={styles.ageLabel}>{option.label}</span>
              </div>
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
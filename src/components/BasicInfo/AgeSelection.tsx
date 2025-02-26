import { FormEvent } from "react";
import { GraduationCap, Briefcase, Users, Heart, School } from "lucide-react";
import styles from "../../styles/BasicInfo/AgeSelection.module.less";
import useThemeStore from "../../store/ThemeStore";
type Props = {
  onNext: () => void;
  selectedAge: string;
  setSelectedAge: (age: string) => void;
};

type AgeOption = {
  value: string;
  icon: React.ReactNode;
  label: string;
  ageGroup: string;
};

const AgeSelection = ({ onNext, selectedAge, setSelectedAge }: Props) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const ageOptions: AgeOption[] = [
    {
      value: 'TEENS',
      icon: <School size={24} />,
      label: "학생",
      ageGroup: "10대",
    },
    {
      value: 'TWENTIES',
      icon: <GraduationCap size={24} />,
      label: "청년",
      ageGroup: "20대",
    },
    {
      value: 'THIRTIES',
      icon: <Briefcase size={24} />,
      label: "직장인",
      ageGroup: "30대",
    },
    {
      value: 'FORTIES',
      icon: <Users size={24} />,
      label: "중년",
      ageGroup: "40대",
    },
    {
      value: 'FIFTIES_AND_ABOVE',
      icon: <Heart size={24} />,
      label: "장년",
      ageGroup: "50대+",
    },
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
        <h2
          className={`${styles.title} ${
            isDarkMode ? styles.darkTitle : styles.lightTitle
          }`}
        >
          당신의 이야기를 더 잘 이해하고 싶어요
        </h2>
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
                selectedAge === option.value
                  ? styles.selectedButton
                  : styles.unselectedButton
              }`}
            >
              <div className={styles.buttonContent}>
                <span className={styles.icon}>{option.icon}</span>
                <span className={styles.ageValue}>
                  {option.ageGroup}
                </span>
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

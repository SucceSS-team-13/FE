import { FormEvent } from "react";
import { GraduationCap, Briefcase, Users, Heart, School } from "lucide-react";
import styles from "../../styles/BasicInfo/AgeSelection.module.less";
import useThemeStore from "../../store/themeStore";
type Props = {
  onNext: () => void;
  selectedAge: number;
  setSelectedAge: (age: number) => void;
};

type AgeOption = {
  value: number;
  icon: React.ReactNode;
  label: string;
};

const AgeSelection = ({ onNext, selectedAge, setSelectedAge }: Props) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const ageOptions: AgeOption[] = [
    {
      value: 10,
      icon: <School size={24} />,
      label: "학생",
    },
    {
      value: 20,
      icon: <GraduationCap size={24} />,
      label: "청년",
    },
    {
      value: 30,
      icon: <Briefcase size={24} />,
      label: "직장인",
    },
    {
      value: 40,
      icon: <Users size={24} />,
      label: "중년",
    },
    {
      value: 50,
      icon: <Heart size={24} />,
      label: "장년",
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
                  {option.value === 50
                    ? `${option.value}대+`
                    : `${option.value}대`}
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

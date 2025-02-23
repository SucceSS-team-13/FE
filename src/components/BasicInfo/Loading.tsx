import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import styles from "../../styles/BasicInfo/Loading.module.less";
import axios from "axios";
import useThemeStore from "../../store/themeStore";

type Props = {
  onNext: () => void;
  selectedAge: number;
  selectedAddress: string;
  energyType: string;
  decisionType: string;
  selectedHobbies: Hobby[];
  setResult: (result: string) => void;
};

const Loading = ({
  onNext,
  selectedAge,
  selectedAddress,
  energyType,
  decisionType,
  selectedHobbies,
  setResult,
}: Props) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    const sendSurveyData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_BASE_URL}/api/survey`,
          {
            ageGroup: selectedAge,
            location: selectedAddress,
            personalityEnergy: energyType,
            personalityJudgement: decisionType,
            hobbies: selectedHobbies,
          }
        );

        setResult(res.data.result);
      } catch (error) {
        alert("데이터를 가져오는 중 문제가 발생했습니다.");
        navigate("/");
        console.error("Failed to send survey data:", error);
      }
    };

    sendSurveyData();

    // 로딩 애니메이션 타이머(최소 5초)
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(onNext, 500);
    }, 4500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      className={`${styles.container} ${isExiting ? styles.exit : ""} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.content}>
        {/* 로고 */}
        <div className={styles.logoContainer}>
          <Logo />
        </div>

        {/* 로딩 메시지 */}
        <div
          className={`${styles.messageContainer} ${
            isDarkMode ? styles.darkMessage : styles.lightMessage
          }`}
        >
          사용자의 성향을 분석 중이에요
          <span className={styles.dots}>
            <span className={styles.dot1}>.</span>
            <span className={styles.dot2}>.</span>
            <span className={styles.dot3}>.</span>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Loading;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Logo from "../Logo";
import styles from "../../styles/BasicInfo/Loading.module.less";
import useThemeStore from "../../store/themeStore";
import { submitSurvey, getProfile } from "../../service/UserService";

const Loading = ({
  onNext,
  selectedAge,
  selectedAddress,
  energyType,
  decisionType,
  selectedHobbies,
  setNickname,
  setResult,
}: SurveyProps) => {
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const navigate = useNavigate();
  const isDarkMode = useThemeStore((state) => state.isDarkMode);

  useEffect(() => {
    console.log(
      "설문조사 데이터",
      selectedAge,
      selectedAddress,
      energyType,
      decisionType,
      selectedHobbies
    );
    const handleSurveySubmission = async () => {
      try {
        const patchRes = await submitSurvey(
          selectedAge,
          selectedAddress,
          energyType,
          decisionType,
          selectedHobbies
        );

        if (!patchRes.data.isSuccess) {
          throw new Error(`설문조사 전송 실패: ${patchRes.data.message}`);
        }

        setNickname(patchRes.data.result.nickname);
        await fetchProfileData();
      } catch (error) {
        console.error("Failed to send survey data:", error);
        alert("데이터를 전송하는 중 문제가 발생했습니다.");
        navigate("/");
      }
    };

    const fetchProfileData = async () => {
      try {
        const getRes = await getProfile();
        setResult(getRes);
      } catch (getError) {
        console.error("결과를 가져오는데 실패했습니다:", getError);
        alert("결과를 가져오는데 실패했습니다.");
        navigate("/");
      }
    };

    handleSurveySubmission();

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

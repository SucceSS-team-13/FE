import Logo from "../components/Logo";
import styles from "../styles/landing/LandingPage.module.less";
import LandingInformation from "../components/landing/LandingInformation";
import LandingInformation2 from "../components/landing/LandingInformation2";
import Typewriter from "react-typewriter-effect";
import { SERVICE_INFORMATION } from "../data/serviceInformation";
const LandingPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.firstContainer}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.textLarge}>
              <Typewriter
                text="당신의 오늘 하루는 어떠셨나요?"
                cursorColor="#fff"
                typeSpeed={100}
                startDelay={500}
                eraseSpeed={50}
                eraseDelay={1000}
                typingDelay={500}
              />
            </div>
            <div className={styles.textSmall}>
              <Typewriter
                text='"따뜻한 위로와 새로운 시작을 함께 만들어가는 AI 심리상담 서비스, "오늘 어땠어"가 당신의 마음을 살피고 더 나은 내일로 안내합니다."'
                cursorColor="#000"
                typeSpeed={100}
                startDelay={2500}
                eraseSpeed={50}
                eraseDelay={1000}
                typingDelay={500}
              />
            </div>
          </div>
        </div>
      </div>
      <LandingInformation serviceInformation={SERVICE_INFORMATION} />
      <LandingInformation2 />
    </div>
  );
};

export default LandingPage;

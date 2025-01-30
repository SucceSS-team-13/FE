import { DEVELOPERS } from "../../data/developer.ts";
import styles from "../../styles/landing/LandingInformation2.module.less";
import Developer from "../landing/Developer.tsx";

const LandingInformation2 = () => {
  return (
    <div className={styles.container}>
      <Developer developers={DEVELOPERS} />
    </div>
  );
};

export default LandingInformation2;

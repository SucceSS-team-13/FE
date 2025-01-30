import { useState } from "react";
import styles from "../styles/BasicInfo/BasicInfoPage.module.less"
import ProgressBar from "../components/BasicInfo/ProgressBar";

const BasicInfoPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ProgressBar currentStep={currentStep}/>
      </div>
    </div>
  )
}

export default BasicInfoPage;
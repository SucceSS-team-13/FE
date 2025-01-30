import { useState } from "react";
import styles from "../styles/BasicInfo/BasicInfoPage.module.less"
import ProgressBar from "../components/BasicInfo/ProgressBar";
import AgeSelection from "../components/BasicInfo/AgeSelection";
import AddressSelection from "../components/BasicInfo/AddressSelection";
import PersonalitySelection from "../components/BasicInfo/PersonalitySelection";

const BasicInfoPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ProgressBar currentStep={currentStep}/>
      </div>

      {currentStep === 1 && (
        <AgeSelection onNext={() => setCurrentStep(2)} />
      )}

      {currentStep === 2 && (
        <AddressSelection onNext={() => setCurrentStep(3)} />
      )}

      {currentStep == 3 && (
        <PersonalitySelection onNext={() => setCurrentStep(4)} />
      )}
    </div>
  )
}

export default BasicInfoPage;
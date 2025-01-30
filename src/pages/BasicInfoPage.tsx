import { useState } from "react";
import styles from "../styles/BasicInfo/BasicInfoPage.module.less"
import ProgressBar from "../components/BasicInfo/ProgressBar";
import AgeSelection from "../components/BasicInfo/AgeSelection";
import AddressSelection from "../components/BasicInfo/AddressSelection";
import PersonalitySelection from "../components/BasicInfo/PersonalitySelection";
import HobbySelection from "../components/BasicInfo/HobbySelection";
import Loading from "../components/BasicInfo/Loading";

const BasicInfoPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  return (
    <div className={styles.container}>
      {![5, 6].includes(currentStep) && ( //로딩, 결과 페이지에서는 숨김
        <div className={styles.wrapper}>
          <ProgressBar currentStep={currentStep}/>
        </div>
      )}

      {currentStep === 1 && (
        <AgeSelection onNext={() => setCurrentStep(2)} />
      )}

      {currentStep === 2 && (
        <AddressSelection onNext={() => setCurrentStep(3)} />
      )}

      {currentStep == 3 && (
        <PersonalitySelection onNext={() => setCurrentStep(4)} />
      )}

      {currentStep === 4 && (
        <HobbySelection onNext={() => setCurrentStep(5)} />
      )}

      {currentStep === 5 && (
        <Loading onNext={() => setCurrentStep(6)} />
      )}
    </div>
  )
}

export default BasicInfoPage;
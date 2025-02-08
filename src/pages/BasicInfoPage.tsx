import { useState } from "react";
import styles from "../styles/BasicInfo/BasicInfoPage.module.less"
import ProgressBar from "../components/BasicInfo/ProgressBar";
import AgeSelection from "../components/BasicInfo/AgeSelection";
import AddressSelection from "../components/BasicInfo/AddressSelection";
import PersonalitySelection from "../components/BasicInfo/PersonalitySelection";
import HobbySelection from "../components/BasicInfo/HobbySelection";
import Loading from "../components/BasicInfo/Loading";
import Result from "../components/BasicInfo/Result";

const BasicInfoPage = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAge, setSelectedAge] = useState<number>(0); //연령대
  const [selectedAddress, setSelectedAddress] = useState<string>(''); //거주지
  const [energyType, setEnergyType] = useState<string>(''); //에너지 성향(E, I)
  const [decisionType, setDecisionType] = useState<string>(''); //판단 결정(T, F)
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]); //취미 목록
  const [result, setResult] = useState<string>('');


  return (
    <div className={styles.container}>
      {![5, 6].includes(currentStep) && ( //로딩, 결과 페이지에서는 숨김
        <div className={styles.wrapper}>
          <ProgressBar currentStep={currentStep}/>
        </div>
      )}

      {currentStep === 1 && (
        <AgeSelection 
          onNext={() => setCurrentStep(2)} 
          selectedAge={selectedAge}
          setSelectedAge={setSelectedAge}
        />
      )}

      {currentStep === 2 && (
        <AddressSelection 
          onNext={() => setCurrentStep(3)} 
          selectedAddress={selectedAddress}
          setSelectedAddress={setSelectedAddress}
        />
      )}

      {currentStep == 3 && (
        <PersonalitySelection 
          onNext={() => setCurrentStep(4)} 
          energyType={energyType}
          setEnergyType={setEnergyType}
          decisionType={decisionType}
          setDecisionType={setDecisionType}
        />
      )}

      {currentStep === 4 && (
        <HobbySelection 
          onNext={() => setCurrentStep(5)} 
          selectedHobbies={selectedHobbies}
          setSelectedHobbies={setSelectedHobbies}
        />
      )}

      {currentStep === 5 && (
        <Loading 
          onNext={() => setCurrentStep(6)} 
          selectedAge={selectedAge}
          selectedAddress={selectedAddress}
          energyType={energyType}
          decisionType={decisionType}
          selectedHobbies={selectedHobbies}
          setResult={setResult}
        />
      )}

      {currentStep === 6 && (
        <Result 
          onChatStart={() => setCurrentStep(1)}
          result={result}
        />
      )}
    </div>
  )
}

export default BasicInfoPage;
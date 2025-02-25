import { useState } from "react";
import styles from "../styles/BasicInfo/BasicInfoPage.module.less";
import ProgressBar from "../components/BasicInfo/ProgressBar";
import AgeSelection from "../components/BasicInfo/AgeSelection";
import AddressSelection from "../components/BasicInfo/AddressSelection";
import PersonalitySelection from "../components/BasicInfo/PersonalitySelection";
import HobbySelection from "../components/BasicInfo/HobbySelection";
import Loading from "../components/BasicInfo/Loading";
import Result from "../components/BasicInfo/Result";

import { useNavigate } from "react-router-dom";

const BasicInfoPage = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [selectedAge, setSelectedAge] = useState<string>(""); //연령대
  const [selectedAddress, setSelectedAddress] = useState<string>(""); //거주지
  const [energyType, setEnergyType] = useState<string>(""); //에너지 성향(E, I)
  const [decisionType, setDecisionType] = useState<string>(""); //판단 결정(T, F)
  const [selectedHobbies, setSelectedHobbies] = useState<Hobby[]>([]); //취미 목록
  const [result, setResult] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");

  const navigate = useNavigate();

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      {![5, 6].includes(currentStep) && ( //로딩, 결과 페이지에서는 숨김
        <div className={styles.wrapper}>
          <ProgressBar currentStep={currentStep} />
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
          setNickname={setNickname}
          setResult={setResult}
        />
      )}

      {currentStep === 6 && (
        <Result
          onChatStart={() => navigate("/main")}
          result={result}
          nickname={nickname}
        />
      )}
    </div>
  );
};

export default BasicInfoPage;

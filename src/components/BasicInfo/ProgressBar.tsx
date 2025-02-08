import { Fragment } from "react";
import styles from '../../styles/BasicInfo/ProgressBar.module.less'

type Props = {
  currentStep: number;
}

const ProgressBar = ({ currentStep }: Props) => {
  const steps = [1, 2, 3, 4];
  
  return (
    <div className={styles.container}>
      <div className={styles.stepsContainer}>
        {steps.map((step, index) => (
          <Fragment key={step}>
            <div className={styles.stepWrapper}>
              <div className={`${styles.stepCircle} ${
                currentStep >= step ? styles.activeStep : styles.inactiveStep
              }`}>
                {step}
              </div>
              <div className={styles.stepLabel}>
                {step === 1 && '나이'}
                {step === 2 && '주소'}
                {step === 3 && '성향'}
                {step === 4 && '취미'}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={styles.stepConnector}>
                <div className={styles.connectorBg} />
                <div
                  className={styles.connectorProgress}
                  style={{
                    transform: `scaleX(${currentStep > step ? 1 : 0})`
                  }}
                />
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProgressBar;
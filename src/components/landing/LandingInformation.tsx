import styles from "../../styles/landing/LandingInformation.module.less";
const LandingInformation = ({
  serviceInformation,
}: {
  serviceInformation: ServiceInformation[];
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <p>오늘 어땠어는 이렇게 당신을 돕습니다.</p>
      </div>
      <div className={styles.informationContainer}>
        {serviceInformation.map((infor) => (
          <div key={infor.title} className={styles.inforBox}>
            <p className={styles.title}>{infor.title}</p>
            <div className={styles.text}>
              <p>{infor.text}</p>
            </div>
            <div className={styles.icon}>
              <img src={infor.icon} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LandingInformation;

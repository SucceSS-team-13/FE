import styles from "../../styles/main/AIMessage.module.less";

const AIMessage = ({ message }: { message: string }) => {
  return (
    <div className={styles.container}>
      <div className={styles.lumiLogo}>
        <img src="/image/logo.png" />
      </div>
      <p className={styles.lumiMessage}>{message}</p>
    </div>
  );
};
export default AIMessage;

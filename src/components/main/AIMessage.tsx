import styles from "../../styles/main/AIMessage.module.less";
import LoadingSpinner from "../LoadingSpinner";

const AIMessage = ({ message, isLoading }: { message: string, isLoading: boolean }) => {
  return (
    <div className={styles.container}>
      <div className={styles.lumiLogo}>
        <img src="/image/logo.png" />
      </div>
      <p className={styles.lumiMessage}>
        {isLoading ? (
          <LoadingSpinner size={"xs"}/>
        ) : 
        message}
      </p>
    </div>
  );
};
export default AIMessage;

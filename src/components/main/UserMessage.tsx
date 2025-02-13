import styles from "../../styles/main/UserMessage.module.less";

const UserMessage = ({ message }: { message: string }) => {
  return <div className={styles.container}>{message}</div>;
};
export default UserMessage;

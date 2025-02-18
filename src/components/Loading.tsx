import styles from "../styles/Loading.module.less";

const Loading = ({
  text,
  size,
}: {
  text: string;
  size: "small" | "medium" | "large";
}) => {
  return (
    <div className={styles.container}>
      <img src="/image/transparentLogo.png" />
      <p className={`${styles.text} ${styles[size]}`}>{text}</p>
    </div>
  );
};

export default Loading;

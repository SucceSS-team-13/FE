import styles from "../styles/NavigationButton.module.less";

const NavigationButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button className={styles.navigationButton} onClick={onClick}>
      {text}
    </button>
  );
};

export default NavigationButton;

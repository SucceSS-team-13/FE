import styles from "../../styles/main/ActionIcon.module.less";

const ActionIcon = ({
  icon,
  onClick,
  size = "medium",
}: {
  size: "small" | "medium";
  icon: string;
  onClick: () => void;
}) => {
  return (
    <div className={styles.container}>
      <span>
        <button onClick={onClick}>
          <img src={icon} className={styles[size]} />
        </button>
      </span>
    </div>
  );
};

export default ActionIcon;

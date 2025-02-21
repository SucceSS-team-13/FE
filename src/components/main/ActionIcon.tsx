import styles from "../../styles/main/ActionIcon.module.less";

const ActionIcon = ({
  icon,
  onClick,
}: {
  icon: string;
  onClick: () => void;
}) => {
  return (
    <div className={styles.container}>
      <span>
        <button onClick={onClick}>
          <img src={icon} />
        </button>
      </span>
    </div>
  );
};

export default ActionIcon;

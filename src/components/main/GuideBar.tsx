import styles from "../../styles/main/GuideBar.module.less";

const GuideBar = ({
  guideBar,
  setInputValue,
}: {
  guideBar: GuideBar[];
  setInputValue: (value: string) => void;
}) => {
  return (
    <div className={styles.container}>
      {guideBar.map((guide) => (
        <button
          key={guide.title}
          className={styles.guideBtn}
          onClick={() => {
            setInputValue(guide.title);
          }}
        >
          {guide.title}
        </button>
      ))}
    </div>
  );
};
export default GuideBar;

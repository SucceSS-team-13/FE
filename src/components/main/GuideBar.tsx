import styles from "../../styles/main/GuideBar.module.less";
import useThemeStore from "../../store/themeStore";

const GuideBar = ({
  guideBar,
  setInputValue,
}: {
  guideBar: GuideBar[];
  setInputValue: (value: string) => void;
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <div className={styles.container}>
      {guideBar.map((guide) => (
        <button
          key={guide.title}
          className={`${styles.guideBtn} ${
            isDarkMode ? styles.darkGuideBtn : styles.lightGuideBtn
          }`}
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

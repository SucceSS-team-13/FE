import useThemeStore from "../store/ThemeStore";
import styles from "../styles/ThemeToggle.module.less";
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <button onClick={toggleTheme} className={styles.themeToggleButton}>
      {isDarkMode ? "🌙" : "☀️"}
    </button>
  );
};

export default ThemeToggle;

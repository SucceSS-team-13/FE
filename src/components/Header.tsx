import styles from "../styles/Header.module.less";
import ThemeToggle from "./ThemeToggle";
import useThemeStore from "../store/themeStore";
import NavigationButton from "./NavigationButton";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  console.log(isDarkMode);
  const navigate = useNavigate();

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.itemContainer}>
        <div className={styles.logo}>
          <img src="/image/transparentLogo.png" />
        </div>
        <div className={styles.item}>
          <ThemeToggle />
          <NavigationButton
            text="서비스"
            onClick={() => {
              navigate("/");
            }}
          />
          <NavigationButton text="로그인" onClick={() => navigate("/login")} />
        </div>
      </div>
    </div>
  );
};
export default Header;

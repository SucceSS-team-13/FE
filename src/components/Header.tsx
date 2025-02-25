import styles from "../styles/Header.module.less";
import ThemeToggle from "./ThemeToggle";
import NavigationButton from "./NavigationButton";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/auth/AuthStore";
const Header = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  console.log(user);
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
          {user && (
            <div className={styles.userContainer}>
              <img src={user.profileImgUrl} alt="프로필" />
              <p>{user.nickname}</p>
            </div>
          )}
          {user ? (
            <NavigationButton
              text="로그아웃"
              onClick={() => {
                logout();
                navigate("/");
              }}
            />
          ) : (
            <NavigationButton
              text="로그인"
              onClick={() => navigate("/login")}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;

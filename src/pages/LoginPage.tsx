import Logo from "../components/Logo";
import styles from "../styles/LoginPage.module.less";
import { getKaKaoLoginURL } from "../service/UserService";
import useThemeStore from "../store/themeStore";

const socialKaKaoLogin = () => {
  window.localStorage.setItem("provider", "kakao");
  window.location.href = getKaKaoLoginURL();
};
const LoginPage = () => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.logoContainer}>
        <Logo />
      </div>
      <div className={styles.loginContainer}>
        <div className={styles.loginBox}>
          <div>
            <p
              className={`${styles.loginText} ${
                isDarkMode ? styles.darkLoginText : styles.lightLoginText
              }`}
            >
              로그인을 통해 오늘 어땠어? 서비스를 만나보세요!
            </p>
            <button onClick={socialKaKaoLogin}>
              <img src="../../public/image/kakao.png" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

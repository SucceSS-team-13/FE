import styles from "../styles/Header.module.less";
import { getKaKaoLoginURL } from "../service/UserService";

const Header = () => {
  const socialKaKaoLogin = () => {
    window.localStorage.setItem("provider", "kakao");
    window.location.href = getKaKaoLoginURL();
  };

  return (
    <div className={styles.container}>
      <div className={styles.itemContainer}>
        <div className={styles.logo}>
          <img src="/image/logo.png" />
        </div>
        <div className={styles.item}>
          <button>서비스</button>
          <button onClick={socialKaKaoLogin}>로그인</button>
        </div>
      </div>
    </div>
  );
};
export default Header;

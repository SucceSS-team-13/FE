import styles from "../../styles/landing/Help.module.less";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import useThemeStore from "../../store/themeStore";
const Help = ({
  serviceInformation,
  helpInView,
}: {
  serviceInformation: ServiceInformation[];
  helpInView: boolean;
}) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const settings = {
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1000, // 슬라이드 전환 1초 대기
    speed: 5000, // 슬라이드 속도 5초
    pauseOnHover: true,
    swipeToSlide: true,
  };

  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.textContainer}>
        <div className={styles.word}>
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={helpInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ duration: 2 }}
          >
            <span>Help</span>
          </motion.div>
        </div>
        <div className={styles.information}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={helpInView ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p>
              오늘 어땠어는 이렇게 <span>당신을 돕습니다.</span>
            </p>
          </motion.div>
        </div>
      </div>
      <motion.div
        className={styles.informationContainer}
        initial={{ y: 100, opacity: 0 }}
        animate={helpInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
        transition={{ duration: 2, delay: 1.5 }}
      >
        <Slider {...settings} className={styles.slider}>
          {serviceInformation.map((infor) => (
            <div className={styles.inforBox} key={infor.title}>
              <div className={styles.titleBox}>
                <div className={styles.title}>
                  <h2>{infor.title}</h2>
                </div>
                <div className={styles.iconBox}>
                  <img src={infor.icon} />
                </div>
                <div className={styles.paddingBox}></div>
              </div>
              <div className={styles.textBox}>
                <p className={styles.text}>{infor.text}</p>
              </div>
            </div>
          ))}
        </Slider>
      </motion.div>
      <div className={styles.padding}></div>
    </div>
  );
};

export default Help;

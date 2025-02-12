import styles from "../../styles/landing/Growth.module.less";
import { useRef } from "react";
import { motion } from "framer-motion";
import EmotionPreview from "../EmotionPreview";
import { GROWTH_INFORMATION } from "../../data/growthInformation";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const Growth = ({ growthInView }: { growthInView: boolean }) => {
  const sliderRef = useRef<Slider>(null); // 슬라이더를 제어하기 위한 ref

  const settings = {
    dots: false,
    slidesToShow: 1,
    arrows: false,
    autoplay: false,
    swipe: false, // 스와이프(드래그) 비활성화
    draggable: false, // 마우스로 드래그 비활성화
  };

  const handlePrev = () => {
    sliderRef.current?.slickPrev();
  };

  const handleNext = () => {
    sliderRef.current?.slickNext();
  };
  return (
    <div className={styles.container}>
      <div className={styles.inforContainer}>
        <div className={styles.textContainer}>
          <div className={styles.title}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={
                growthInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <span>Growth</span>
            </motion.div>
          </div>

          <div className={styles.padding}></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={growthInView ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className={styles.bodyText}>
              <span>오늘 어땠어는 앞으로 이렇게 성장해 나갈 예정입니다.</span>
            </p>
            <p className={styles.bodyText}>
              앞으로 추가될 오늘 어땠어의 기능입니다.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={growthInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
          className={styles.growthContainer}
        >
          <Slider {...settings} className={styles.slider} ref={sliderRef}>
            {GROWTH_INFORMATION.map((growth) => (
              <div key={growth.itemNum} className={styles.slideItem}>
                <div className={styles.leftContainer}>
                  <div className={styles.titleBox}>
                    <p className={styles.titleText}>{growth.title}</p>
                    <p className={styles.inforText}>{growth.explanation}</p>
                  </div>
                </div>
                <div className={styles.rightContainer}>
                  {growth.itemNum === 1 && <EmotionPreview />}
                  {growth.itemNum === 2 && (
                    <div className={styles.gifBox}>
                      <img src="/image/solution.gif" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </Slider>
          <div className={styles.padding} />
          <div className={styles.customBtn}>
            <button onClick={handlePrev}>이전</button>
            <button onClick={handleNext}>다음</button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Growth;

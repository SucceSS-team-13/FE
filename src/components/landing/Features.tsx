import styles from "../../styles/landing/Features.module.less";
import { motion } from "framer-motion";
import ChatPreview from "./ChatPreview";
import { CHAT_SOLUTION } from "../../data/chatSolution";
import useThemeStore from "../../store/ThemeStore";

const Features = ({ featuresInView }: { featuresInView: boolean }) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <div
      className={`${styles.container} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      <div className={styles.inforContainer}>
        <div className={styles.textContainer}>
          <div className={styles.title}>
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={
                featuresInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <span>Features</span>
            </motion.div>
          </div>

          <div className={styles.padding}></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={featuresInView ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className={styles.bodyText}>
              <span>
                나에게 딱 맞는 솔루션, AI가 빠르고 정확하게 제안합니다.
              </span>
            </p>
            <p className={styles.bodyText}>
              개인의 상황에 딱 맞는 솔루션을 지금 바로 만나보세요.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={
            featuresInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
          }
          transition={{ duration: 2, delay: 1.5 }}
          className={styles.productContainer}
        >
          <div className={styles.title}>
            <p className={styles.titleText}>
              루미가 여러분을 위한 맞춤형 솔루션을 제공합니다.
            </p>
            <div className={styles.personContainer}>
              <div className={styles.personImage}>
                <img src="/image/solutionPerson .png" />
              </div>
              <div className={styles.personMessage}>
                <p className={styles.msg}>
                  루미가 여러분과 나눈 대화를 바탕으로 맞춤형 솔루션을
                  제공해드려요.
                </p>
              </div>
            </div>
          </div>
          <ChatPreview chatResponses={CHAT_SOLUTION} />
        </motion.div>
      </div>
    </div>
  );
};

export default Features;

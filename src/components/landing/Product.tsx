import styles from "../../styles/landing/Product.module.less";
import { motion } from "framer-motion";
import ChatPreview from "./ChatPreview";
import { CHAT_RESPONSES } from "../../data/chatResponses";
import useThemeStore from "../../store/ThemeStore";

const Product = ({ productInView }: { productInView: boolean }) => {
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
                productInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }
              }
              transition={{ duration: 1 }}
            >
              <span>Product</span>
            </motion.div>
          </div>

          <div className={styles.padding}></div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={productInView ? { opacity: 1 } : { opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <p className={styles.bodyText}>
              <span>복잡한 상담 과정을 간단하게.</span>
            </p>
            <p className={styles.bodyText}>
              AI로 나만의 감정과 고민을 정리하세요.
            </p>
          </motion.div>
        </div>
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={productInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
          transition={{ duration: 2, delay: 1.5 }}
          className={styles.productContainer}
        >
          <div className={styles.title}>
            <p className={styles.titleText}>
              여러분의 지금 감정을 루미에게 알려주세요!
            </p>
            <div className={styles.personContainer}>
              <div className={styles.personImage}>
                <img src="/image/chatPerson.png" />
              </div>
              <div className={styles.personMessage}>
                <p className={styles.msg}>
                  루미와 나눌 수 있는 다양한 대화를 미리 확인해볼 수 있어요.
                </p>
              </div>
            </div>
          </div>
          <ChatPreview chatResponses={CHAT_RESPONSES} />
        </motion.div>
      </div>
    </div>
  );
};

export default Product;

import Logo from "../components/Logo";
import styles from "../styles/landing/LandingPage.module.less";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Guide from "../components/landing/Guide";
import Help from "../components/landing/Help";
import Developer from "../components/landing/Developer";
import { DEVELOPERS } from "../data/developer";
import { SERVICE_INFORMATION } from "../data/serviceInformation";
import Product from "../components/landing/Product";
import Features from "../components/landing/Features";
import Growth from "../components/landing/Growth";
import Typewriter from "react-typewriter-effect";
import { useRef, useState, useEffect } from "react";

const LandingPage = () => {
  const helpRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const growthRef = useRef<HTMLDivElement>(null);
  const [helpInView, setHelpInView] = useState(false);
  const [productInView, setProductInView] = useState(false);
  const [featuresInView, setFeaturesInView] = useState(false);
  const [growthInView, setGrowthInView] = useState(false);

  useEffect(() => {
    const helpObserver = new IntersectionObserver(
      ([entry]) => {
        setHelpInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    const productObserver = new IntersectionObserver(
      ([entry]) => {
        setProductInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );
    const featuresObserver = new IntersectionObserver(
      ([entry]) => {
        setFeaturesInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );
    const growthObserver = new IntersectionObserver(
      ([entry]) => {
        setGrowthInView(entry.isIntersecting);
      },
      {
        threshold: 0.5,
      }
    );

    if (helpRef.current) helpObserver.observe(helpRef.current);
    if (productRef.current) productObserver.observe(productRef.current);
    if (featuresRef.current) featuresObserver.observe(featuresRef.current);
    if (growthRef.current) growthObserver.observe(growthRef.current);

    return () => {
      if (helpRef.current) helpObserver.unobserve(helpRef.current);
      if (productRef.current) productObserver.unobserve(productRef.current);
      if (featuresRef.current) featuresObserver.unobserve(featuresRef.current);
      if (growthRef.current) growthObserver.unobserve(growthRef.current);
    };
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.firstContainer}>
        <div className={styles.logoContainer}>
          <Logo />
        </div>
        <div className={styles.textContainer}>
          <div className={styles.typeContainer}>
            <div className={styles.textLarge}>
              <Typewriter
                text="당신의 오늘 하루는 어떠셨나요?"
                cursorColor="#fff"
                typeSpeed={100}
                startDelay={500}
                eraseSpeed={50}
                eraseDelay={1000}
                typingDelay={500}
              />
            </div>
            <div className={styles.textSmall}>
              <Typewriter
                text='따뜻한 위로로 마음을 살피고, 더 나은 내일을 함께하는 AI 심리상담 서비스, "오늘 어땠어"'
                cursorColor="#000"
                typeSpeed={100}
                startDelay={2500}
                eraseSpeed={50}
                eraseDelay={1000}
                typingDelay={500}
              />
            </div>
          </div>
        </div>
      </div>
      <div ref={helpRef} className={styles.informationComponent}>
        <Help
          serviceInformation={SERVICE_INFORMATION}
          helpInView={helpInView}
        />
      </div>
      <div ref={productRef} className={styles.informationComponent}>
        <Product productInView={productInView} />
      </div>
      <div ref={featuresRef} className={styles.informationComponent}>
        <Features featuresInView={featuresInView} />
      </div>
      <div ref={growthRef} className={styles.informationComponent}>
        <Growth growthInView={growthInView} />
      </div>
      <div className={styles.developersComponent}>
        <Developer developers={DEVELOPERS} />
      </div>
      <Guide />
      <Footer />
    </div>
  );
};

export default LandingPage;

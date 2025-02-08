import { MessageCircle } from "lucide-react";
import styles from "../../styles/BasicInfo/Result.module.less";

type Props = {
  onChatStart: () => void;
  result: string;
}

const Result = ({ onChatStart, result }: Props) => {
  // 임시 분석 결과 텍스트
  const dummyResult = `안녕하세요, 홍길동 님! 성향 분석 결과를 알려드릴게요.

    홍길동 님은 조용한 환경에서 깊이 있는 생각을 하는 것을 선호하시는 내향적인 성향을 가지고 계시네요. 특히 논리적인 사고를 바탕으로 결정을 내리시는 특징이 있습니다.

    독서와 영화 감상을 즐기시는 점으로 미루어 보아, 풍부한 상상력과 지적 호기심을 가지고 계신 것 같아요. 이러한 취미 활동은 홍길동 님의 내면을 더욱 풍요롭게 만들어주고 있을 거예요.

    앞으로도 자신만의 페이스를 유지하면서 차근차근 성장해 나가시면 좋을 것 같아요. 혹시 고민이 있으시다면 언제든 저에게 이야기해 주세요.
  `;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* 헤더 */}
        <div className={styles.header}>
          <h1 className={styles.title}>
            홍길동 님의 성향 분석 결과
          </h1>
          <p className={styles.subtitle}>
            AI가 분석한 맞춤형 결과입니다
          </p>
        </div>

        {/* 분석 결과 */}
        <div className={styles.resultCard}>
          <div className={styles.resultText}>
            {result}
          </div>
        </div>

        {/* 상담 시작 버튼 */}
        <button
          onClick={onChatStart}
          className={styles.chatButton}
        >
          <MessageCircle size={20} />
          <span className={styles.buttonText}>고민 털어놓기</span>
        </button>
      </div>
    </div>
  );
};

export default Result;
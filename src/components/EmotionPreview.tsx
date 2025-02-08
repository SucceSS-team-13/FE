import { useState, useEffect } from "react";
import styles from "../styles/landing/EmotionPreview.module.less";
import Emotion from "./Emotion";

const EmotionPreview = () => {
  const [rangeValue, setRangeValue] = useState<number>(1);
  const [emotion, setEmotion] = useState<string>("");
  const [colors, setColors] = useState<{
    red: number;
    green: number;
    blue: number;
  } | null>(null);
  const [recordText, setRecordText] = useState<string>("");
  useEffect(() => {
    updateEmotionAndColor(rangeValue);
  }, [rangeValue]);

  const currentDate = new Date().toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleRangeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRangeValue(Number(event.target.value));
  };

  const updateEmotionAndColor = (value: number) => {
    const emotions = [
      "아주 불쾌함",
      "불쾌함",
      "약간 불쾌함",
      "보통",
      "약간 기분 좋음",
      "기분 좋음",
      "아주 기분 좋음",
    ];
    const colorMap = [
      { red: 64, green: 0, blue: 80 },
      { red: 0, green: 20, blue: 120 },
      { red: 0, green: 91, blue: 160 },
      { red: 150, green: 200, blue: 220 },
      { red: 250, green: 230, blue: 50 },
      { red: 255, green: 165, blue: 50 },
      { red: 255, green: 70, blue: 130 },
    ];

    setEmotion(emotions[value - 1] || "");
    setColors(colorMap[value - 1] || 0);
  };

  const handleSave = () => {
    setRecordText("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.emotionContainer}>
        <div className={styles.emotion}>
          <Emotion
            red={colors?.red || 0}
            green={colors?.green || 0}
            blue={colors?.blue || 0}
          />
        </div>
        <div className={styles.emotionControlBox}>
          <h3>{emotion}</h3>
          <input
            type="range"
            min="1"
            max="7"
            value={rangeValue}
            onChange={handleRangeChange}
          />
        </div>
      </div>
      <div className={styles.recordContainer}>
        <div className={styles.date}>
          <h3>{currentDate}</h3>
        </div>
        <div className={styles.record}>
          <div className={styles.title}>
            <p>오늘의 감정을 간단히 기록해보세요!</p>
          </div>
          <div className={styles.textareaBox}>
            <textarea
              rows={10}
              cols={50}
              value={recordText}
              onChange={(e) => setRecordText(e.target.value)}
            ></textarea>
          </div>
        </div>
        <div className={styles.saveBtn}>
          <button onClick={handleSave}>저장하기</button>
        </div>
      </div>
    </div>
  );
};

export default EmotionPreview;

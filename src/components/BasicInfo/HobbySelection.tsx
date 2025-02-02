import { FormEvent, useState } from "react";
import { Hobby } from "../../model/Hobby";
import { BookOpen, Clapperboard, Dumbbell, Gamepad2, Palette, Plane, Check } from "lucide-react";
import styles from "../../styles/BasicInfo/HobbySelection.module.less";

type Props = {
  onNext: () => void;
}

const HobbySelection = ({ onNext }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedHobbies, setSelectedHobbies] = useState<string[]>([]);

  const hobbyCategories: Hobby[] = [
    {
      id: 'exercise',
      title: '운동',
      icon: Dumbbell,
      subCategories: [
        '헬스', '요가', '필라테스', '수영', '테니스',
        '골프', '클라이밍', '축구', '농구', '볼링',
        '배드민턴', '러닝'
      ]
    },
    {
      id: 'travel',
      title: '여행',
      icon: Plane,
      subCategories: [
        '국내여행', '해외여행', '백패킹', '캠핑',
        '도시여행', '맛집탐방', '문화탐방', '힐링여행'
      ]
    },
    {
      id: 'reading',
      title: '독서',
      icon: BookOpen,
      subCategories: [
        '소설', '시', '에세이', '자기계발', '인문',
        '역사', '과학', '경제/경영', '철학', '예술'
      ]
    },
    {
      id: 'movie',
      title: '영화',
      icon: Clapperboard,
      subCategories: [
        '로맨스', '코미디', '액션', '스릴러', '공포',
        'SF', '판타지', '드라마', '애니메이션', '다큐멘터리'
      ]
    },
    {
      id: 'game',
      title: '게임',
      icon: Gamepad2,
      subCategories: [
        'RPG', 'FPS', '액션', '전략', '시뮬레이션',
        '스포츠', '퍼즐', '음악/리듬', '카드', 'MMORPG'
      ]
    },
    {
      id: 'craft',
      title: '공예',
      icon: Palette,
      subCategories: [
        '뜨개질', '자수', '도자기', '가죽공예', '목공예',
        '비즈공예', '캔들/디퓨저', '페이퍼크래프트', '마크라메', '레진아트'
      ]
    }
  ];

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies(prev => 
      prev.includes(hobby)
        ? prev.filter(h => h !== hobby)
        : [...prev, hobby]
    );
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedHobbies.length > 0 && onNext) {
      onNext();
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          취미를 선택해주세요
        </h2>
        <p className={styles.subtitle}>
          관심 있는 취미를 모두 선택해주세요
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 메인 카테고리 선택 */}
        <div className={styles.categoryGrid}>
          {hobbyCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                type="button"
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id ? styles.selected : ''
                }`}
              >
                <Icon size={28} className={styles.categoryIcon} />
                <span className={styles.categoryTitle}>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* 서브 카테고리 선택 */}
        {selectedCategory && (
          <div className={styles.subCategoryContainer}>
            <h3 className={styles.subCategoryTitle}>
              {hobbyCategories.find(c => c.id === selectedCategory)?.title} 세부 선택
            </h3>
            <div className={styles.subCategoryGrid}>
              {hobbyCategories
                .find(c => c.id === selectedCategory)
                ?.subCategories.map((hobby) => (
                  <button
                    key={hobby}
                    type="button"
                    onClick={() => toggleHobby(hobby)}
                    className={`${styles.hobbyButton} ${
                      selectedHobbies.includes(hobby) ? styles.selected : ''
                    }`}
                  >
                    <div className={`${styles.checkbox} ${
                      selectedHobbies.includes(hobby) ? styles.checked : ''
                    }`}>
                      {selectedHobbies.includes(hobby) && (
                        <Check size={14} className={styles.checkIcon} />
                      )}
                    </div>
                    {hobby}
                  </button>
                ))}
            </div>
          </div>
        )}

        {/* 선택된 취미 표시 */}
        {selectedHobbies.length > 0 && (
          <div className={styles.selectedHobbiesContainer}>
            <p className={styles.selectedHobbiesTitle}>선택된 취미:</p>
            <div className={styles.selectedHobbiesList}>
              {selectedHobbies.map((hobby) => (
                <span
                  key={hobby}
                  className={styles.selectedHobbyTag}
                >
                  {hobby}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={selectedHobbies.length === 0}
          className={`${styles.submitButton} ${
            selectedHobbies.length === 0 ? styles.disabled : ''
          }`}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default HobbySelection;
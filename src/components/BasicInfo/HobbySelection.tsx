import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import styles from "../../styles/BasicInfo/HobbySelection.module.less";
import { HOBBY_CATEGORIES } from "../../data/hobby";
type Props = {
  onNext: () => void;
  selectedHobbies: string[];
  setSelectedHobbies: (
    hobbies: string[] | ((prev: string[]) => string[])
  ) => void;
};

const HobbySelection = ({
  onNext,
  selectedHobbies,
  setSelectedHobbies,
}: Props) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleHobby = (hobby: string) => {
    setSelectedHobbies((prev: string[]) =>
      prev.includes(hobby) ? prev.filter((h) => h !== hobby) : [...prev, hobby]
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
        <h2 className={styles.title}>어떤 활동에서 즐거움을 느끼시나요?</h2>
        <p className={styles.subtitle}>
          당신이 관심 있는 활동들을 선택하시면 맞춤 제안을 준비할게요
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 메인 카테고리 선택 */}
        <div className={styles.categoryGrid}>
          {HOBBY_CATEGORIES.map((category) => {
            return (
              <button
                key={category.id}
                type="button"
                data-category={category.id}
                onClick={() =>
                  setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )
                }
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id ? styles.selected : ""
                }`}
              >
                <img src={category.imageUrl} alt={category.title} />
                <span className={styles.categoryTitle}>{category.title}</span>
              </button>
            );
          })}
        </div>

        {/* 서브 카테고리 선택 */}
        {selectedCategory && (
          <div className={styles.subCategoryContainer}>
            <h3 className={styles.subCategoryTitle}>
              {HOBBY_CATEGORIES.find((c) => c.id === selectedCategory)?.title}{" "}
              세부 선택
            </h3>
            <div className={styles.subCategoryGrid}>
              {HOBBY_CATEGORIES.find(
                (c) => c.id === selectedCategory
              )?.subCategories.map((hobby) => (
                <button
                  key={hobby}
                  type="button"
                  onClick={() => toggleHobby(hobby)}
                  className={`${styles.hobbyButton} ${
                    selectedHobbies.includes(hobby) ? styles.selected : ""
                  }`}
                >
                  <div
                    className={`${styles.checkbox} ${
                      selectedHobbies.includes(hobby) ? styles.checked : ""
                    }`}
                  >
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
                <span key={hobby} className={styles.selectedHobbyTag}>
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
            selectedHobbies.length === 0 ? styles.disabled : ""
          }`}
        >
          다음
        </button>
      </form>
    </div>
  );
};

export default HobbySelection;

import { FormEvent, useState } from "react";
import { Check } from "lucide-react";
import styles from "../../styles/BasicInfo/HobbySelection.module.less";
import { HOBBY_CATEGORIES } from "../../data/hobby";
import useThemeStore from "../../store/themeStore";

type Props = {
  onNext: () => void;
  selectedHobbies: Hobby[];
  setSelectedHobbies: (
    hobbies: Hobby[] | ((prev: Hobby[]) => Hobby[])
  ) => void;
};

const HobbySelection = ({
  onNext,
  selectedHobbies,
  setSelectedHobbies,
}: Props) => {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleHobby = (hobbyCode: string) => {
    setSelectedHobbies((prev: Hobby[]) => {
      const currentCategory = HOBBY_CATEGORIES.find(c => c.id === selectedCategory);
      if (!currentCategory) return prev;

      const existingHobbyIndex = prev.findIndex(h => h.hobby === currentCategory.title);

      if (existingHobbyIndex !== -1) {
        // 이미 해당 카테고리가 있는 경우
        const existingHobby = prev[existingHobbyIndex];
        if (existingHobby.detailedHobbies.includes(hobbyCode)) {
          // 취미가 이미 선택되어 있으면 제거
          const updatedHobbies = [...prev];
          updatedHobbies[existingHobbyIndex] = {
            ...existingHobby,
            detailedHobbies: existingHobby.detailedHobbies.filter(h => h !== hobbyCode)
          };
          // 상세 취미가 모두 제거되면 카테고리도 제거
          return updatedHobbies[existingHobbyIndex].detailedHobbies.length === 0 
            ? updatedHobbies.filter((_, index) => index !== existingHobbyIndex)
            : updatedHobbies;
        } else {
          // 새로운 취미 추가
          const updatedHobbies = [...prev];
          updatedHobbies[existingHobbyIndex] = {
            ...existingHobby,
            detailedHobbies: [...existingHobby.detailedHobbies, hobbyCode]
          };
          return updatedHobbies;
        }
      } else {
        // 새로운 카테고리 추가
        return [...prev, {
          hobby: currentCategory.title,
          detailedHobbies: [hobbyCode]
        }];
      }
    });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedHobbies.length > 0 && onNext) {
      onNext();
    }
  };

  // 현재 선택된 카테고리의 상세 취미들 확인
  const getSelectedDetailedHobbies = (categoryTitle: string) => {
    const hobby = selectedHobbies.find(h => h.hobby === categoryTitle);
    return hobby ? hobby.detailedHobbies : [];
  };

  // 코드로 저장된 취미의 표시 이름 가져오기
  const getHobbyDisplayName = (hobbyCode: string, categoryId: string) => {
    const category = HOBBY_CATEGORIES.find(c => c.id === categoryId);
    const hobby = category?.subCategories.find(h => h.code === hobbyCode);
    return hobby?.displayName || hobbyCode;
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={`${styles.title} ${isDarkMode ? styles.darkTitle : styles.lightTitle}`}>
          어떤 활동에서 즐거움을 느끼시나요?
        </h2>
        <p className={styles.subtitle}>
          당신이 관심 있는 활동들을 선택하시면 맞춤 제안을 준비할게요
        </p>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        {/* 메인 카테고리 선택 */}
        <div className={styles.categoryGrid}>
          {HOBBY_CATEGORIES.map((category) => {
            const isSelected = selectedHobbies.some(h => h.hobby === category.title);
            return (
              <button
                key={category.id}
                type="button"
                data-category={category.id}
                onClick={() => setSelectedCategory(
                  selectedCategory === category.id ? null : category.id
                )}
                className={`${styles.categoryButton} ${
                  selectedCategory === category.id || isSelected ? styles.selected : ""
                }`}
              >
                <img src={category.imageUrl} alt={category.displayTitle} />
                <span className={`${styles.categoryTitle} ${
                  isDarkMode ? styles.darkTitle : styles.lightTitle
                }`}>
                  {category.displayTitle}
                </span>
              </button>
            );
          })}
        </div>

        {/* 서브 카테고리 선택 */}
        {selectedCategory && (
          <div className={styles.subCategoryContainer}>
            <h3 className={styles.subCategoryTitle}>
              {HOBBY_CATEGORIES.find((c) => c.id === selectedCategory)?.displayTitle} 세부 선택
            </h3>
            <div className={styles.subCategoryGrid}>
              {HOBBY_CATEGORIES.find(
                (c) => c.id === selectedCategory
              )?.subCategories.map((hobby) => {
                const currentCategory = HOBBY_CATEGORIES.find(c => c.id === selectedCategory);
                const isSelected = currentCategory && 
                  getSelectedDetailedHobbies(currentCategory.title).includes(hobby.code);
                return (
                  <button
                    key={hobby.code}
                    type="button"
                    onClick={() => toggleHobby(hobby.code)}
                    className={`${styles.hobbyButton} ${isSelected ? styles.selected : ""}`}
                  >
                    <div className={`${styles.checkbox} ${isSelected ? styles.checked : ""}`}>
                      {isSelected && <Check size={14} className={styles.checkIcon} />}
                    </div>
                    {hobby.displayName}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 선택된 취미 표시 */}
        {selectedHobbies.length > 0 && (
          <div className={styles.selectedHobbiesContainer}>
            <p className={styles.selectedHobbiesTitle}>선택된 취미:</p>
            <div className={styles.selectedHobbiesList}>
              {selectedHobbies.flatMap(hobby => 
                hobby.detailedHobbies.map(hobbyCode => {
                  const category = HOBBY_CATEGORIES.find(c => c.title === hobby.hobby);
                  return category ? (
                    <span key={hobbyCode} className={styles.selectedHobbyTag}>
                      {getHobbyDisplayName(hobbyCode, category.id)}
                    </span>
                  ) : null;
                })
              )}
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

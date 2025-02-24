interface HobbyCategoryData {
  id: string;
  title: string;
  displayTitle: string;
  imageUrl: string;
  subCategories: {
    code: string;
    displayName: string;
  }[];
}

interface Hobby {
  hobby: string;
  detailedHobbies: string[];
}

interface SurveyProps {
  onNext: () => void;
  selectedAge: string;
  selectedAddress: string;
  energyType: string;
  decisionType: string;
  selectedHobbies: Hobby[];
  setNickname: (nickname: string) => void;
  setResult: (result: string) => void;
}

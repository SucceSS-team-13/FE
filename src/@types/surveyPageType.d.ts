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

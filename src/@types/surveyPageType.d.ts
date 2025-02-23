interface HobbyCategory {
  id: string;
  title: string;
  imageUrl: string;
  subCategories: string[];
}

interface Hobby {
  hobby: string;
  detailedHobbies: string[];
}

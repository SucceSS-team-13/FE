interface AuthUser {
  nickname: string;
  profileImgUrl: string;
  firstLogIn: boolean;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

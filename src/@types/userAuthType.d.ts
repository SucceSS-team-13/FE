interface AuthUser {
  id: string;
  name: string;
  profileImage?: string;
  email?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (userData: AuthUser) => void;
  logout: () => void;
}

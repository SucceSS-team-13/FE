import BasicInfoPage from "./pages/BasicInfoPage";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";
import LoginPage from "./pages/LoginPage";
import useThemeStore from "./store/themeStore";

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  return (
    <Routes>
      <Route path="/oauth" element={<AuthPage />} />
      <Route
        path="/survey"
        element={<BasicInfoPage isDarkMode={isDarkMode} />}
      />
      <Route
        path="/main/:chatRoomId"
        element={<MainPage isDarkMode={isDarkMode} />}
      />
      <Route path="/main" element={<MainPage isDarkMode={isDarkMode} />} />
      <Route path="/login" element={<LoginPage isDarkMode={isDarkMode} />} />
      <Route path="/" element={<LandingPage isDarkMode={isDarkMode} />} />
    </Routes>
  );
}
// path는 경로 element는 해당 경로로 이동했을 때 보여줄 컴포넌트

export default App;

import BasicInfoPage from "./pages/BasicInfoPage";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/oauth" element={<AuthPage />} />
      <Route path="/survey" element={<BasicInfoPage />} />
      <Route path="/main/:chatRoomId" element={<MainPage />} />
      <Route path="/main" element={<MainPage />} />
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
// path는 경로 element는 해당 경로로 이동했을 때 보여줄 컴포넌트

export default App;

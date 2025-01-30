import { Route, Routes } from "react-router-dom";
import LandingPage from "./pages/LandingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
    </Routes>
  );
}
// path는 경로 element는 해당 경로로 이동했을 때 보여줄 컴포넌트

export default App;

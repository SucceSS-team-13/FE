import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getToken } from "../service/UserService.ts";

const AuthPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const authenticateUser = async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) return;

      try {
        const tokenResponse = await getToken(code);
        if (tokenResponse.success) {
          if (tokenResponse.firstLogin) {
            navigate("/survey");
          } else {
            navigate("/main");
          }
        }
      } catch (error) {
        console.error("로그인 실패:", error);
      }
    };

    authenticateUser();
  }, [navigate]);

  return null;
};

export default AuthPage;

import CustomAxios from "../api/CustomAxios";

export const getKaKaoLoginURL = () => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
};

export const getToken = async (
  authCode: string
): Promise<{ success: boolean }> => {
  try {
    const response = await CustomAxios.get(
      `/api/auth/sign-in/kakao?code=${authCode}`
    );

    if (response.status === 200) {
      console.log(response);
      const accessToken = response.data.result.Access;
      const refreshToken = response.data.result.Refresh;
      console.log("액세스 토큰", accessToken, "리프레쉬토큰", refreshToken);
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      window.localStorage.setItem("message", response.data.message);

      return { success: true };
    }

    return { success: false };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

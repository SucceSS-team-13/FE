import CustomAxios from "../api/CustomAxios";

export const getKaKaoLoginURL = () => {
  return `https://kauth.kakao.com/oauth/authorize?client_id=${
    import.meta.env.VITE_KAKAO_CLIENT_ID
  }&redirect_uri=${import.meta.env.VITE_KAKAO_REDIRECT_URI}&response_type=code`;
};

export const getToken = async (
  authCode: string
): Promise<{ success: boolean; firstLogin: boolean }> => {
  try {
    const response = await CustomAxios.get(
      `/api/auth/sign-in/kakao?code=${authCode}`
    );

    if (response.status === 200) {
      console.log(response);
      const accessToken = response.data.result.accessToken;
      const refreshToken = response.data.result.refreshToken;
      const firstLogin = response.data.result.firstLogIn;
      console.log("첫 로그인", firstLogin);
      console.log("액세스 토큰", accessToken, "리프레쉬토큰", refreshToken);
      window.localStorage.setItem("accessToken", accessToken);
      window.localStorage.setItem("refreshToken", refreshToken);
      window.localStorage.setItem("message", response.data.message);

      return { success: true, firstLogin };
    }

    return { success: false, firstLogin: false };
  } catch (error) {
    console.log(error);
    return { success: false, firstLogin: false };
  }
};

export const submitSurvey = async (
  ageGroup: string,
  location: string,
  personalityEnergy: string,
  personalityJudgement: string,
  hobbies: Hobby[]
) => {
  const response = await CustomAxios.patch(`/api/members/profile/update`, {
    ageGroup,
    location,
    personalityEnergy,
    personalityJudgement,
    hobbies,
  });

  if (!response.data.isSuccess) {
    throw new Error(`설문조사 전송 실패: ${response.data.message}`);
  }
  console.log("설문조사 설정 응답", response);
  return response;
};

export const getProfile = async () => {
  try {
    const response = await CustomAxios.get(`/api/members/profile`);
    console.log("프로필 가져오기 응답", response);
    return response.data.result.message;
  } catch (error) {
    console.error("프로필 가져오기 실패:", error);
    return null;
  }
};

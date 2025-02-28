import CustomAxios from "../api/CustomAxios";
import useAuthStore from "../store/auth/AuthStore";

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

    if (response.status === 200 && response.data && response.data.result) {
      const userData = response.data.result;
      
      // 응답 데이터 구조 디버깅
      console.log("Response data structure:", JSON.stringify(response.data, null, 2));
      
      // userData가 있고 필요한 속성들이 존재하는지 확인
      if (userData) {
        // 안전하게 상태 업데이트
        useAuthStore.setState((state) => ({
          ...state,
          user: {
            nickname: userData.nickname || '',  // 기본값 제공
            profileImgUrl: userData.profileImgUrl || '',
            firstLogIn: userData.firstLogIn || false,
          },
          isAuthenticated: true,
        }));
        
        const firstLogin = userData.firstLogIn || false;
        
        // 토큰이 있는 경우에만 저장
        if (userData.accessToken) {
          window.localStorage.setItem("accessToken", userData.accessToken);
        } else {
          console.warn("Access token is missing in the response");
        }
        
        if (userData.refreshToken) {
          window.localStorage.setItem("refreshToken", userData.refreshToken);
        } else {
          console.warn("Refresh token is missing in the response");
        }

        return { success: true, firstLogin };
      } else {
        console.error("User data is undefined or incomplete in the response");
        return { success: false, firstLogin: false };
      }
    }

    console.error("Response unsuccessful or missing data", response);
    return { success: false, firstLogin: false };
  } catch (error) {
    console.error("Error in getToken:", error);
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

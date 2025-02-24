import axios from "axios";

const CustomAxios = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

CustomAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("저장된 토큰:", token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

CustomAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (!refreshToken) {
        console.log("로그인이 필요합니다.");
        return Promise.reject(error);
      }

      // try {
      //   const response = await axios.post(
      //     `${import.meta.env.VITE_BASE_URL}/api/auth/refresh`, // 서버 리프레쉬 토큰 발급 엔드포인트
      //     {
      //       refreshToken: refreshToken,
      //     }
      //   );

      //   const newAccessToken = response.data.result.Access;
      //   localStorage.setItem("accessToken", newAccessToken);

      //   originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      //   return axios(originalRequest);
      // } catch (refreshError) {
      //   console.log("리프레시 토큰이 만료되었습니다. 다시 로그인해주세요.");
      //   return Promise.reject(refreshError);
      // }
    }
    return Promise.reject(error);
  }
);

export default CustomAxios;

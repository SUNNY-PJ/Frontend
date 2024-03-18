import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { proxyUrl } from "../constant/common";

const apiClient = axios.create({
  baseURL: proxyUrl,
});

const tokenFetchData = async () => {
  const inputURL = `/apple/auth/reissue`;
  const refresh_token = await AsyncStorage.getItem("refresh_token");

  try {
    const response = await apiClient.get(inputURL, {
      params: { refresh_token },
    });

    const access_token = response.data.data.accessToken;
    const new_refresh_token = response.data.data.refreshToken;
    await AsyncStorage.setItem("access_token", access_token);
    await AsyncStorage.setItem("refresh_token", new_refresh_token);
    console.log("다시 저장함::", access_token);
    return access_token;
  } catch (error) {
    if (error.response) {
      console.error("서버 응답 오류:", error.response.data);
    } else {
      console.error("에러:", error);
    }
    return null;
  }
};

// 요청 인터셉터
apiClient.interceptors.request.use(
  async (config) => {
    const accessToken = await AsyncStorage.getItem("access_token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      // 재시도 표시
      originalRequest._retry = true;
      const newAccessToken = await tokenFetchData();
      if (newAccessToken) {
        originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
        // 수정된 요청으로 재시도
        return apiClient(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;

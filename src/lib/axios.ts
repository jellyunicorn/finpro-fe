import axios from "axios";

const BASE_FE_URL = import.meta.env.VITE_API_URL;


export const axiosInstance = axios.create({
  baseURL: BASE_FE_URL,
  withCredentials: true,
});

export const refreshInstance = axios.create({
  baseURL: BASE_FE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401) {
      try {
        await refreshInstance.post("/auth/refresh");
        return axiosInstance(originalRequest);
      } catch (error) {
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

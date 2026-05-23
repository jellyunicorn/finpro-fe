import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";


export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

export const refreshInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});


export const http = axios.create({
  baseURL: `${BASE_URL}/api`,
  withCredentials: true,
});


http.interceptors.request.use((config) => {
  const authData = localStorage.getItem("auth-storage");
  if (authData) {
    try {
      const parsed = JSON.parse(authData);
      const token = parsed?.state?.accessToken;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch {
 
    }
  }
  return config;
});


http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("auth-storage");
      if (window.location.pathname.startsWith("/admin")) {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);
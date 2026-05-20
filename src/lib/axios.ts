import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
});

export const refreshInstance = axios.create({
  baseURL:  "http://localhost:8000",
  withCredentials: true,
});

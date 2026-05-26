import { axiosInstance } from "../lib/axios.ts";

export const userDataLoader = async () => {
  const { data } = await axiosInstance.get("/user/");
  return data;
};

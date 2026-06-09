import { axiosInstance } from "../lib/axios.ts";

export const userAddressLoader = async () => {
  const {data} = await axiosInstance.get("/address/user");
  return data;
};

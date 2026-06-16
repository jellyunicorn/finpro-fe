import { axiosInstance } from "../lib/axios";
import { router } from "../main";

export async function goToDashboard() {
  const { data: role } = await axiosInstance.get<string>("/auth/me");
  router.navigate(`/dashboard/${role.toLowerCase()}`);
}

import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { DriverJob } from "../../types/driverJob";

export default function useGetActiveDriverJob() {
  return useQuery({
      queryKey: ["activeDriverJob"],
      queryFn: async () => {
        const { data } = await axiosInstance.get<DriverJob>(
          "/driver/active-request",
        );
        return data;
      },
    });
}
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { PageableResponse } from "../../types/pagination";
import type { Pickup } from "../../types/pickup";

export default function useGetAvailablePickups(page: number, take?: number) {
  return useQuery({
    queryKey: ["availablePickups", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Pickup>>(
        "/driver/available-pickups",
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
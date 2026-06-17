import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { PageableResponse } from "../../types/pagination";
import type { Pickup } from "../../types/pickup";

export default function useGetPickupHistory(page: number, take?: number) {
  return useQuery({
    queryKey: ["pickupHistory", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Pickup>>(
        "/driver/pickup-history",
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
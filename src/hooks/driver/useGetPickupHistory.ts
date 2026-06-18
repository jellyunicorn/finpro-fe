import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { PageableResponse } from "../../types/pagination";
import type { Pickup } from "../../types/pickup";

export default function useGetPickupHistory(
  page: number,
  startDate?: string,
  endDate?: string,
  take?: number,
) {
  return useQuery({
    queryKey: ["pickupHistory", page, take, startDate, endDate],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Pickup>>(
        "/driver/pickup-history",
        { params: { page, take, startDate, endDate } },
      );
      return data;
    },
  });
}

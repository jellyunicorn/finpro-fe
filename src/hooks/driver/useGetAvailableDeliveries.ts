import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import type { PageableResponse } from "../../types/pagination";
import type { Delivery } from "../../types/delivery";

export default function useGetAvailableDeliveries(page: number, take?: number) {
  return useQuery({
    queryKey: ["availableDeliveries", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Delivery>>(
        "/driver/available-deliveries",
        { params: { page: page, take: take } },
      );
      return data;
    },
  });
}
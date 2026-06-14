import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import type { PageableResponse } from "../types/pagination";
import type { Pickup } from "../types/pickup";

export default function useGetDeliveryHistory(page: number, take?: number) {
  return useQuery({
    queryKey: ["deliveryHistory", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<Pickup>>(
        "/driver/delivery-history",
        { params: { page: page, take: take } },
      );
      console.log(data);
      return data;
    },
  });
}
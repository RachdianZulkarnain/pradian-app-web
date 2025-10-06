import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useVouchers = (eventId: string) => {
  return useQuery({
    queryKey: ["vouchers", eventId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/vouchers?event=${eventId}`);
      return res.data.data;
    },
    enabled: !!eventId,
  });
};

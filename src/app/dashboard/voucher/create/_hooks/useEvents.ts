import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useEvents = () => {
  return useQuery({
    queryKey: ["events-short"],
    queryFn: async () => {
      const res = await axiosInstance.get("/events/list/short");
      console.log("Events from backend:", res.data);
      return res.data;
    },
  });
};

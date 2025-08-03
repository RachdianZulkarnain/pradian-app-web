import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";

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

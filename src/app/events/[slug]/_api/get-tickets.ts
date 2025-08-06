import { Ticket } from "@/types/ticket";
import { axiosInstance } from "@/lib/axios";

export const getTicketsByEvent = async (slug: string): Promise<Ticket[]> => {
  try {
    const res = await axiosInstance.get(`/events/${slug}/tickets`);
    return res.data.data as Ticket[];
  } catch (error) {
    console.error("Failed to fetch tickets", error);
    return [];
  }
};

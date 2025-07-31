import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event"; // pastikan kamu punya tipe ini

export const getEvent = async (slug: string): Promise<Event | null> => {
  try {
    const { data } = await axiosInstance.get<Event>(`/events/${slug}`);
    return data;
  } catch (error) {
    console.error("Failed to fetch event:", error);
    return null;
  }
};

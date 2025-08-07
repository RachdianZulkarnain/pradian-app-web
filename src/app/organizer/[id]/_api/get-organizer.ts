import { axiosInstance } from "@/lib/axios";
import { Organizer } from "@/types/organizer";

export const getOrganizer = async (id: string): Promise<Organizer> => {
  try {
    const { data } = await axiosInstance.get<Organizer>(
      `/profile/organizer/${id}`,
    );
    return data;
  } catch (error: any) {
    console.error(
      "❌ Failed to fetch organizer",
      error?.response?.data || error.message,
    );
    throw error;
  }
};

export default getOrganizer;

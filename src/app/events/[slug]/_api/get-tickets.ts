// src/app/(event)/_api/get-tickets-by-event.ts

import { Ticket } from "@/types/ticket";
import { axiosInstance } from "@/lib/axios"; // pastikan ini konsisten

export const getTicketsByEvent = async (eventId: number): Promise<Ticket[]> => {
  try {
    const res = await axiosInstance.get(`/tickets?event=${eventId}`);
    return res.data.data as Ticket[];
  } catch (error) {
    console.error("Failed to fetch tickets", error);
    return [];
  }
};

"use server";

import { axiosInstance } from "@/lib/axios";

export const getVouchersByEvent = async (eventId: number) => {
  try {
    const res = await axiosInstance.get(`/vouchers/event/${eventId}`);
    return res.data?.data || [];
  } catch (error) {
    console.error("Failed to fetch vouchers:", error);
    return [];
  }
};

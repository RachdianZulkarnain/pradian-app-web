// src/app/orders/_api/get-orders.ts

import { getSession } from "next-auth/react";
import axiosInstance from "@/lib/axios";

export type Order = {
  id: number;
  uuid: string;
  title: string;
  location: string;
  dateRange: string;
  status: string;
  image: string;
};

type OrderResponse = {
  data: Order[];
  meta: {
    total: number;
    page: number;
    take: number;
  };
};

export const getOrders = async (
  page: number,
  search: string = "",
): Promise<{ data: Order[]; total: number }> => {
  try {
    const session = await getSession();
    const token = session?.user?.accessToken;

    if (!token) {
      throw new Error("Unauthorized: No access token found in session.");
    }

    const response = await axiosInstance.get<OrderResponse>("/transactions", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        page,
        take: 5,
        search,
      },
    });

    const { data, meta } = response.data;

    return {
      data,
      total: meta.total,
    };
  } catch (error: any) {
    console.error("[getOrders] Failed to fetch:", error);
    throw new Error(
      error?.response?.data?.message || "Failed to fetch transaction history.",
    );
  }
};

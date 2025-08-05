"use client";

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export type Ticket = {
  id: number;
  title: string;
  price: number;
  stock: number;
  totalPrice: number;
  description: string;
  createdAt: string;
  updatedAt: string;
};

type Meta = {
  page: number;
  take: number;
  total: number;
};

type GetTicketsResponse = {
  data: Ticket[];
  meta: Meta;
};

export const useGetTickets = ({
  page = 1,
  take = 10,
  search = "",
}: {
  page?: number;
  take?: number;
  search?: string;
}) => {
  const session = useSession();

  return useQuery<GetTicketsResponse>({
    queryKey: ["tickets", page, take, search],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetTicketsResponse>(
        `/tickets/admin?take=${take}&page=${page}&search=${search}`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!session.data?.user.accessToken,
  });
};

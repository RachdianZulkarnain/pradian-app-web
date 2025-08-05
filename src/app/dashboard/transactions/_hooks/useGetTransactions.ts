"use client";

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { TransactionRow } from "../columns"; // Adjust if needed

type Meta = {
  page: number;
  take: number;
  total: number;
};

type GetTransactionsResponse = {
  data: TransactionRow[];
  meta: Meta;
};

export const useGetAdminTransactions = ({
  page = 1,
  take = 10,
}: {
  page?: number;
  take?: number;
}) => {
  const session = useSession();

  return useQuery<GetTransactionsResponse>({
    queryKey: ["transactions", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetTransactionsResponse>(
        `/transactions/admin?take=${take}&page=${page}`,
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

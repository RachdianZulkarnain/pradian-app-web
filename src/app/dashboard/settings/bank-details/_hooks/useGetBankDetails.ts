// src/hooks/useGetBankDetails.ts
"use client";

import { useQuery } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";

type BankDetails = {
  id: number;
  bankName: string;
  accountName: string;
  accountNumber: string;
};

export const useGetBankDetails = () => {
  const session = useSession();

  return useQuery<BankDetails | null>({
    queryKey: ["bank-details"],
    queryFn: async () => {
      const { data } = await axiosInstance.get<BankDetails | null>(
        "/bank-details",
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

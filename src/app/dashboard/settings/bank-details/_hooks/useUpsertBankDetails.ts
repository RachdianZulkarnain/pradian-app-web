// src/hooks/useUpsertBankDetails.ts
"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

type UpsertPayload = {
  bankName: string;
  accountName: string;
  accountNumber: string;
};

export const useUpsertBankDetails = () => {
  const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: UpsertPayload) => {
      const { data } = await axiosInstance.post(
        "/bank-details",
        payload,
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Bank details saved");
      queryClient.invalidateQueries({ queryKey: ["bank-details"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to save bank details"
      );
    },
  });
};

// src/_hooks/useUpdateTransaction.ts
"use client";

import { useMutation } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { useSession } from "next-auth/react";

export const useUpdateTransaction = () => {
  const session = useSession();

  return useMutation({
    mutationFn: async ({
      uuid,
      type,
    }: {
      uuid: string;
      type: "ACCEPT" | "REJECT";
    }) => {
      const { data } = await axiosInstance.patch(
        "/transactions",
        { uuid, type },
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        }
      );
      return data;
    },
  });
};

"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "@/lib/axios";
import { useRouter } from "next/navigation";

interface CreateVoucherPayload {
  event: string;
  code: string;
  value: number;
  limit: number;
}

const useCreateVoucher = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateVoucherPayload) => {
      const response = await axiosInstance.post("/vouchers", data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      router.push("/dashboard/vouchers");
    },
  });
};

export default useCreateVoucher;

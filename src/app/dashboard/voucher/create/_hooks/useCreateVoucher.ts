"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const useCreateVoucher = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: FormData) => {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token not found");
      }

      const response = await axiosInstance.post("/vouchers", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vouchers"] });
      router.push("/dashboard");
    },
    onError: (error: any) => {
      console.error(
        "Gagal membuat voucher:",
        error?.response?.data || error.message,
      );
      toast.error(
        "Gagal membuat voucher: " +
          (error?.response?.data?.message || error.message),
      );
    },
  });
};

export default useCreateVoucher;

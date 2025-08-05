import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface Payload {
  paymentProof: File | null;
}

const useUploadPaymentProof = (uuid: string) => {
  const queryClient = useQueryClient();
  const session = useSession();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();

      form.append("paymentProof", payload.paymentProof!);

      await axiosInstance.patch(`/transactions/${uuid}/upload-proof`, form, {
        headers: { Authorization: `Bearer ${session.data?.user.accessToken}` },
      });
    },
    onSuccess: async () => {
      toast.success("Upload payment proof success");
      await queryClient.invalidateQueries({ queryKey: ["transaction"] });
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "somenting went wrong!");
    },
  });
};

export default useUploadPaymentProof;

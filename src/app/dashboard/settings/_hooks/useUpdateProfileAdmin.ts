"use client";

import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  name: string;
  pictureProfile: File | null;
}

export const useUpdateProfileAdmin = () => {
  const queryClient = useQueryClient();
  const session = useSession();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();
      if (payload.pictureProfile) {
        form.append("pictureProfile", payload.pictureProfile);
      }

      if (payload.name) {
        form.append("name", payload.name);
      }

      await axiosInstance.patch("/profile/admin", form, {
        headers: {
          Authorization: `Bearer ${session.data?.user.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
    },

    onSuccess: async () => {
      toast.success("Profile updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
    },

    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

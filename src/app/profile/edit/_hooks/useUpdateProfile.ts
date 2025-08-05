"use client"

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
export const useUpdateProfile = () => {
  const router = useRouter();
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

      await axiosInstance.patch("/profile/edit", form, {
        headers: { Authorization: `Bearer ${session.data?.user.accessToken}` },
      });
    },

    onSuccess: async () => {
      toast.success("Profile updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      router.push("/profile");
    },

    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

"use client";

import { axiosInstance } from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  slug: string;
  title: string;
  category: string;
  description: string;
  location: string;
  startDate: string;
  endDate: string;
  thumbnail: File | null;
}

const useEditEvent = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const session = useSession();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const form = new FormData();
      form.append("title", payload.title);
      form.append("category", payload.category);
      form.append("location", payload.location);
      form.append("description", payload.description);
      form.append("startDate", payload.startDate);
      form.append("endDate", payload.endDate);

      if (payload.thumbnail) {
        form.append("thumbnail", payload.thumbnail);
      }

      await axiosInstance.patch(`/events/${payload.slug}/edit`, form, {
        headers: {
          Authorization: `Bearer ${session.data?.user.accessToken}`,
        },
      });
    },
    onSuccess: async () => {
      toast.success("Event updated successfully");
      await queryClient.invalidateQueries({ queryKey: ["events"] });
      router.push("/dashboard/events");
    },
    onError: (error: AxiosError<{ message: string; code: number }>) => {
      toast.error(error.response?.data.message ?? "Something went wrong!");
    },
  });
};

export default useEditEvent;

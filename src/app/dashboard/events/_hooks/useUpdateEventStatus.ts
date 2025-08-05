"use client";

import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

interface UpdateEventStatusPayload {
  eventId: number;
  status: "ACTIVE" | "DRAFT";
}

export const useUpdateEventStatus = () => {
  const session = useSession();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ eventId, status }: UpdateEventStatusPayload) => {
      const { data } = await axiosInstance.patch(
        "/events",
        {
          id: eventId,
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        }
      );
      return data;
    },
    onSuccess: () => {
      toast.success("Event status updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["my-events"] });
    },
    onError: (error: any) => {
      toast.error(
        error?.response?.data?.message || "Failed to update event status"
      );
    },
  });
};

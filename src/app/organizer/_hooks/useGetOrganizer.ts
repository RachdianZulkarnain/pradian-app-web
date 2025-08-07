// src/hooks/useGetOrganizer.ts
import axiosInstance from "@/lib/axios";
import { Organizer } from "@/types/organizer";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export const useGetOrganizer = () => {
  const { data: session, status } = useSession();

  return useQuery({
    queryKey: ["organizer"],
    queryFn: async () => {
      const id = session?.user?.id;
      const token = session?.user?.accessToken;

      if (!id || !token) {
        throw new Error("No access token or user ID found");
      }

      const { data } = await axiosInstance.get<Organizer>(
        `/profile/organizer/${id}`, // ✅ pakai backtick dan variable
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      return data;
    },
    enabled: status === "authenticated",
  });
};

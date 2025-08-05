"use client";

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

export type Event = {
  id: number;
  title: string;
  location: string;
  slug: string;
  status: "DRAFT" | "ACTIVE";
  startDate: string;
  endDate: string;
  thumbnail?: string | null;
  tickets: {
    price: number;
  }[];
};

type Meta = {
  page: number;
  take: number;
  total: number;
};

type GetEventsResponse = {
  data: Event[];
  meta: Meta;
};

export const useGetEvents = ({
  page = 1,
  take = 10,
}: {
  page?: number;
  take?: number;
}) => {
  const session = useSession();

  return useQuery<GetEventsResponse>({
    queryKey: ["my-events", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetEventsResponse>(
        `/events/admin?take=${take}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        }
      );
      return data;
    },
    enabled: !!session.data?.user.accessToken,
  });
};

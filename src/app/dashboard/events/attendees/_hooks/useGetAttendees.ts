"use client";

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { PageableResponse, PaginationQueries } from "@/types/pagination";
import { AttendeeRow } from "../columns"; // update path

const useGetAttendees = ({ page = 1, take = 10 }: PaginationQueries = {}) => {
  const session = useSession();

  return useQuery<PageableResponse<AttendeeRow>>({
    queryKey: ["attendees", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<PageableResponse<AttendeeRow>>(
        `/transactions/attendees?take=${take}&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        },
      );
      return data;
    },
    enabled: !!session.data?.user.accessToken,
  });
};

export default useGetAttendees;

"use client";

import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { VoucherRow } from "../columns";

type Meta = {
  page: number;
  take: number;
  total: number;
};

type GetVouchersResponse = {
  data: VoucherRow[];
  meta: Meta;
};

export const useGetVouchers = ({
  page = 1,
  take = 10,
}: {
  page?: number;
  take?: number;
}) => {
  const session = useSession();

  return useQuery<GetVouchersResponse>({
    queryKey: ["vouchers", page, take],
    queryFn: async () => {
      const { data } = await axiosInstance.get<GetVouchersResponse>(
        `/vouchers/admin?take=${take}&page=${page}`,
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

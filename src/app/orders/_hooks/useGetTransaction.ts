import { axiosInstance } from "@/lib/axios";
import { Transaction } from "@/types/transaction";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

const useGetTransaction = (uuid: string) => {
  const session = useSession();

  return useQuery({
    queryKey: ["transaction", uuid],
    queryFn: async () => {
      const { data } = await axiosInstance.get<Transaction>(
        `/transactions/${uuid}`,
        {
          headers: {
            Authorization: `Bearer ${session.data?.user.accessToken}`,
          },
        },
      );
      return data;
    },
  });
};

export default useGetTransaction;

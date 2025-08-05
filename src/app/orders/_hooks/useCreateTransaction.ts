import { axiosInstance } from "@/lib/axios";

export const createTransaction = async (payload: any, token: string) => {
  const res = await axiosInstance.post("/transactions", payload, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; 
};

export default createTransaction;
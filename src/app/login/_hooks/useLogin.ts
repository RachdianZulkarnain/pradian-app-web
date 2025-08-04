"use client";

import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Payload {
  email: string;
  password: string;
}

const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: async (payload: Payload) => {
      const { data } = await axiosInstance.post<User>("auth/login", payload);

      // Simpan token ke localStorage setelah login sukses
      localStorage.setItem("token", data.accessToken); // pastikan token memang dikembalikan dari endpoint login

      return data;
    },
    onSuccess: async (data) => {
      await signIn("credentials", { ...data, redirect: false });
      if (data.role === "ADMIN") {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    },
    onError: (error: AxiosError<{ message: string }>) => {
      toast.error(error.response?.data?.message ?? "Something went wrong");
    },
  });
};

export default useLogin;

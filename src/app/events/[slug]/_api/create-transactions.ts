import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { useSession } from "next-auth/react";
import { Ticket } from "@/types/ticket";
import axiosInstance from "@/lib/axios";

export const useCreateTransaction = (
  tickets: Ticket[],
  quantities: Record<number, number>,
  onSuccess?: () => void,
) => {
  const router = useRouter();
  const { data: session } = useSession();

  const handleCheckout = async () => {
    const payload = tickets
      .map((ticket) => ({
        ticketId: ticket.id,
        qty: quantities[ticket.id] || 0,
      }))
      .filter((item) => item.qty > 0);

    if (payload.length === 0) {
      toast.error("Please select at least one ticket.");
      return;
    }

    if (!session?.user?.accessToken) {
      console.log("Session missing accessToken", session);
      toast.error("Unauthorized. Please login.");
      return;
    }

    try {
      console.log("Sending checkout request...", payload);
      const res = await axiosInstance.post(
        "/transactions",
        { payload },
        {
          headers: {
            Authorization: `Bearer ${session.user.accessToken}`,
          },
        },
      );

      const uuid = res.data.uuid;

      onSuccess?.();
      router.push(`/orders/${uuid}`);
    } catch (error: any) {
      console.error("Checkout failed:", error);
      const msg =
        error?.response?.data?.message ||
        JSON.stringify(error?.response?.data) ||
        error.message;
      toast.error(msg);
    }
  };

  return { handleCheckout };
};

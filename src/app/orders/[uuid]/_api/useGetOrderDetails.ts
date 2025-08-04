"use client";

import { useEffect, useState } from "react";
import { axiosInstance } from "@/lib/axios";
import { useSession } from "next-auth/react";

export type OrderData = {
  event: {
    title: string;
    location: string;
    dateRange: string;
    time: string;
    image: string;
  };
  ticket: {
    type: string;
    quantity: number;
    price: number;
  };
  pricing: {
    totalTicketPrice: number;
    total: number;
  };
};

export const useOrderDetails = (uuid: string) => {
  const [orderData, setOrderData] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(true);

  const [voucherCode, setVoucherCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState("Payment Gateway");

  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const { data: session } = useSession();
  // Fetch Order
  const fetchOrder = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/transactions/${uuid}`, {
        headers: { Authorization: `Bearer ${session?.user.accessToken}` },
      });
      setOrderData(res.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Apply Voucher
  const handleApplyVoucher = async () => {
    try {
      const res = await axiosInstance.post("/vouchers/apply", {
        uuid,
        code: voucherCode,
      });
      setOrderData((prev) =>
        prev ? { ...prev, pricing: res.data.pricing } : prev,
      );
    } catch (err) {
      console.error("Voucher invalid", err);
    }
  };

  // Pilih metode pembayaran
  const handlePay = async () => {
    try {
      await axiosInstance.post(`/orders/${uuid}/pay`, {
        method: selectedPaymentMethod,
      });
      alert("Payment method selected!");
    } catch (err) {
      console.error("Failed to choose payment method", err);
    }
  };

  // Upload Bukti Pembayaran
  const handleUploadProof = async () => {
    if (!paymentProof) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", paymentProof);

    try {
      setUploading(true);
      await axiosInstance.post(`/transactions/${uuid}/upload-proof`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Proof uploaded successfully!");
    } catch (err) {
      console.error("Upload failed", err);
      alert("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, [uuid]);

  return {
    orderData,
    loading,
    voucherCode,
    setVoucherCode,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    paymentProof,
    setPaymentProof,
    uploading,
    handleApplyVoucher,
    handlePay,
    handleUploadProof,
  };
};

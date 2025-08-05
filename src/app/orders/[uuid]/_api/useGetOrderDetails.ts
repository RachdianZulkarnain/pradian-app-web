"use client";

import { useEffect, useState } from "react";

const API = process.env.NEXT_PUBLIC_API_URL;

export const useOrderDetails = (uuid: string) => {
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [voucherCode, setVoucherCode] = useState("");
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("gateway");

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // Fetch transaction detail by UUID
  useEffect(() => {
    const fetchOrder = async () => {
      if (!uuid || !token) return;
      

      try {
        setLoading(true);
        const res = await fetch(`${API}/transactions/${uuid}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch transaction");

        const data = await res.json();
        setOrderData(data);
        setSelectedPaymentMethod(data.paymentMethod || "gateway");
      } catch (err) {
        console.error("Fetch transaction error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [uuid, token]);

  // Apply voucher
  const handleApplyVoucher = async () => {
    try {
      const res = await fetch(`${API}/transactions/apply-voucher`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ uuid, code: voucherCode }),
      });

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes?.message || "Failed to apply voucher");
      }

      const data = await res.json();
      setOrderData((prev: any) => ({
        ...prev,
        pricing: data.pricing,
      }));
      setVoucherCode("");
    } catch (error) {
      console.error("Apply voucher error:", error);
    }
  };

  // Confirm payment method
  const handlePay = async () => {
    try {
      const res = await fetch(`${API}/transactions/${uuid}/pay`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ method: selectedPaymentMethod }),
      });

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes?.message || "Failed to confirm payment");
      }

      const data = await res.json();
      setOrderData((prev: any) => ({
        ...prev,
        paymentMethod: selectedPaymentMethod,
      }));
    } catch (error) {
      console.error("Payment error:", error);
    }
  };

  // Upload payment proof
  const handleUploadProof = async (file: File) => {
    const formData = new FormData();
    formData.append("uuid", uuid);
    formData.append("paymentProof", file);

    try {
      const res = await fetch(`${API}/transactions/payment-proof`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const errorRes = await res.json();
        throw new Error(errorRes?.message || "Upload failed");
      }

      const data = await res.json();
      setOrderData((prev: any) => ({
        ...prev,
        status: "WAITING_FOR_CONFIRMATION",
        paymentProof: data.paymentProof,
      }));
    } catch (error) {
      console.error("Upload proof error:", error);
    }
  };

  return {
    orderData,
    loading,
    voucherCode,
    setVoucherCode,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    handleApplyVoucher,
    handlePay,
    handleUploadProof,
  };
};

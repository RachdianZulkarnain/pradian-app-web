"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useOrderDetails } from "../_api/useGetOrderDetails";

type OrderDetailsProps = {
  uuid: string;
};

const OrderDetails = ({ uuid }: OrderDetailsProps) => {
  const {
    orderData,
    loading,
    voucherCode,
    setVoucherCode,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    handleApplyVoucher,
    handlePay,
  } = useOrderDetails(uuid);

  const [timeLeft, setTimeLeft] = useState(14 * 60 + 55);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatCurrency = (amount: number) =>
    `Rp ${amount.toLocaleString("id-ID")}`;
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading || !orderData)
    return <p className="py-10 text-center">Loading order...</p>;

  return (
    <div className="mx-auto max-w-3xl p-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Kiri */}
        <div className="space-y-6 md:col-span-2">
          {/* Timer */}
          <div className="rounded bg-orange-100 px-4 py-2 text-sm font-medium text-orange-700">
            Complete your payment before <strong>{formatTime(timeLeft)}</strong>
          </div>

          {/* Event Info */}
          <div className="flex items-start gap-4">
            <Image
              src={orderData.event.image}
              alt="Event"
              width={120}
              height={120}
              className="rounded object-cover"
            />
            <div>
              <h2 className="text-xl font-semibold">{orderData.event.title}</h2>
              <p className="text-sm text-gray-600">
                {orderData.event.location}
              </p>
              <p className="text-sm text-gray-600">
                {orderData.event.dateRange}
              </p>
              <p className="text-sm text-gray-600">{orderData.event.time}</p>
            </div>
          </div>

          {/* Tiket */}
          <div>
            <h3 className="mb-2 font-semibold">Ticket</h3>
            <div className="space-y-1 rounded border p-3 text-sm">
              <div className="flex justify-between">
                <span>
                  {orderData.ticket.type} x{orderData.ticket.quantity}
                </span>
                <span>{formatCurrency(orderData.ticket.price)}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span>Total Ticket</span>
                <span>
                  {formatCurrency(orderData.pricing.totalTicketPrice)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Kanan */}
        <div className="space-y-6">
          {/* Voucher */}
          <div>
            <h3 className="mb-2 font-semibold">Apply Voucher</h3>
            <div className="flex gap-2">
              <input
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
                className="w-full rounded border px-3 py-2 text-sm"
                placeholder="Enter voucher code"
              />
              <Button onClick={handleApplyVoucher} variant="outline">
                Apply
              </Button>
            </div>
          </div>

          {/* Payment Method */}
          <div>
            <h3 className="mb-2 font-semibold">Payment Method</h3>
            <select
              className="w-full rounded border px-3 py-2 text-sm"
              value={selectedPaymentMethod}
              onChange={(e) => setSelectedPaymentMethod(e.target.value)}
            >
              <option>Payment Gateway</option>
              <option>Bank Transfer</option>
            </select>
          </div>

          {/* Order Summary */}
          <div className="space-y-2 rounded border bg-gray-50 p-4 text-sm">
            <div className="flex justify-between">
              <span>Ticket Price</span>
              <span>{formatCurrency(orderData.pricing.totalTicketPrice)}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>{formatCurrency(orderData.pricing.total)}</span>
            </div>
          </div>

          <Button
            onClick={handlePay}
            className="w-full bg-orange-500 hover:bg-orange-600"
          >
            Pay
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

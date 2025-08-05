"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRef, useState } from "react";
import useGetTransaction from "../../_hooks/useGetTransaction";
import { format } from "date-fns";

type OrderDetailsProps = {
  uuid: string;
};

const OrderDetails = ({ uuid }: OrderDetailsProps) => {
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { data: transaction, isPending } = useGetTransaction(uuid);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (!transaction || !transaction.transactionDetail) {
    return <div>Order not found</div>;
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <h2 className="mb-6 text-xl font-semibold">Order Detail</h2>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 md:col-span-2">
          <div className="rounded bg-blue-100 px-4 py-2 text-sm text-blue-700">
            Your payment is pending. Please complete before{" "}
            <strong>timeleft</strong>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Image
              src="/assets/1.webp"
              alt="Event"
              width={160}
              height={120}
              className="rounded object-cover"
            />
            <div>
              <h3 className="text-lg font-semibold">
                {transaction?.event?.title}
              </h3>
              <p className="text-sm text-gray-600">
                {transaction.event?.location}
              </p>
              <p className="text-sm text-gray-600">
                {format(new Date(transaction.event!.startDate), "dd MMM yyyy")}{" "}
                - {format(new Date(transaction.event!.endDate), "dd MMM yyyy")}
              </p>
            </div>
          </div>

          {/* Ticket Info */}
          <div className="border-t pt-4">
            <div className="flex items-center gap-2 font-semibold">
              🎟️ {transaction?.transactionDetail[0]?.ticket.title}
            </div>
            <p className="text-sm text-gray-600">
              {transaction?.transactionDetail[0]?.qty} ticket
            </p>
            <p className="mt-1 text-right font-medium">
              {" "}
              {transaction?.transactionDetail[0]?.price}
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* Pricing */}
          <div className="space-y-2 rounded border bg-white p-4 text-sm">
            <div className="flex justify-between">
              <span>Total ticket price</span>
              <span> {transaction?.transactionDetail[0]?.price}</span>
            </div>
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>
                {" "}
                {transaction?.transactionDetail[0]?.qty *
                  transaction?.transactionDetail[0]?.price}
              </span>
            </div>
          </div>

          {/* Upload Proof */}
          <div className="space-y-2">
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setPaymentProof(e.target.files?.[0] ?? null)}
              ref={fileInputRef}
              className="text-sm"
            />
            <Button className="w-full bg-orange-500 text-white hover:bg-orange-600">
              Upload Payment Proof
            </Button>
          </div>

          {/* Bank Info */}
          <div className="border-t pt-4 text-sm">
            <h4 className="mb-1 font-semibold">Bank Detail</h4>
            <p>
              <strong>Bank Name:</strong> BCA
            </p>
            <p>
              <strong>Account Name:</strong> PT Suka Suka
            </p>
            <p>
              <strong>Account Number:</strong> 123123123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;

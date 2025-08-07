"use client";

import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar, Ticket } from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useGetTransaction from "../../_hooks/useGetTransaction";
import useUploadPaymentProof from "../../_hooks/useUploadPaymentProof";
import { applyVoucher } from "../_api/voucher";
import { format } from "date-fns";
import { toast } from "sonner";

type OrderDetailsProps = {
  uuid: string;
};

export default function OrderDetails({ uuid }: OrderDetailsProps) {
  const [voucherCode, setVoucherCode] = useState("");
  const [paymentProof, setPaymentProof] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showUpload, setShowUpload] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [total, setTotal] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { data: transaction, isPending } = useGetTransaction(uuid);
  const { mutateAsync: uploadProof, isPending: isUploading } =
    useUploadPaymentProof(uuid);

  const ticket = transaction?.transactionDetail?.[0];
  const baseTotal = (ticket?.qty ?? 0) * (ticket?.price ?? 0);

  const handleApplyVoucher = async () => {
    try {
      setErrorMessage("");
      const token = localStorage.getItem("token");
      if (!token) throw new Error("Unauthorized");
      const res = await applyVoucher(uuid, voucherCode, token);
      setTotal(res.pricing.total);
    } catch (err: any) {
      setErrorMessage(err.message);
    }
  };

  const formatStatus = (status: string) =>
    status
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (char) => char.toUpperCase());

  if (isPending) return <div className="p-10">Loading...</div>;
  if (!transaction || !ticket)
    return <div className="p-10">Order not found</div>;

  return (
    <div className="mx-auto min-h-screen max-w-7xl px-4 py-10 sm:px-6">
      <h1 className="mb-6 text-3xl font-black text-gray-900 uppercase">
        Order Details
      </h1>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Left Section */}
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-none border-2 border-gray-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex flex-col gap-6 md:flex-row">
              {transaction?.event?.thumbnail && (
                <Image
                  src={transaction.event.thumbnail}
                  alt="Event"
                  width={300}
                  height={200}
                  className="border border-gray-300 object-cover"
                />
              )}
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold tracking-wide text-gray-900 uppercase">
                  {transaction?.event?.title}
                </h2>
                <div className="flex items-center text-sm text-gray-700">
                  <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                  {transaction?.event?.location}
                </div>
                <div className="flex items-center text-sm text-gray-700">
                  <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                  {transaction?.event?.startDate &&
                    format(
                      new Date(transaction.event.startDate),
                      "dd MMM yyyy",
                    )}{" "}
                  -{" "}
                  {transaction?.event?.endDate &&
                    format(new Date(transaction.event.endDate), "dd MMM yyyy")}
                </div>
              </div>
            </div>

            {/* Ticket Info */}
            <div className="mt-6 border-t pt-4 text-sm">
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 font-semibold text-gray-900">
                    <Ticket className="h-4 w-4 text-orange-500" />
                    {ticket.ticket.title}
                  </div>
                  <p className="text-sm text-gray-600">{ticket.qty} ticket</p>
                </div>
                <p className="text-right font-bold">Rp {ticket.price}</p>
              </div>
            </div>

            {/* Status Display */}
            {transaction.status && (
              <div
                className={`mt-4 w-fit rounded-none border-2 px-4 py-2 text-sm font-bold tracking-wide uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] ${
                  transaction.status === "WAITING_FOR_PAYMENT"
                    ? "border-yellow-400 bg-yellow-100 text-yellow-800"
                    : transaction.status === "PAID"
                      ? "border-green-400 bg-green-100 text-green-800"
                      : transaction.status === "REJECTED"
                        ? "border-red-400 bg-red-100 text-red-800"
                        : "border-gray-400 bg-gray-100 text-gray-800"
                }`}
              >
                Status: {formatStatus(transaction.status)}
              </div>
            )}

            {/* Bank Info */}
            <div className="mt-6 space-y-1 text-sm text-gray-700">
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

        {/* Right Section */}
        <div className="space-y-6">
          {/* Voucher Input */}
          <div className="rounded-none border-2 border-gray-900 bg-white p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex gap-2">
              <Input
                placeholder="Enter voucher code here"
                className="rounded-none border-2 border-gray-900"
                value={voucherCode}
                onChange={(e) => setVoucherCode(e.target.value)}
              />
              <Button
                className="rounded-none border-2 border-gray-900 bg-orange-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-600"
                onClick={handleApplyVoucher}
              >
                Apply
              </Button>
            </div>
            {errorMessage && (
              <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
            )}
          </div>

          {/* Price Summary */}
          <div className="rounded-none border-2 border-gray-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="mb-4 text-lg font-semibold">Detail Price</h3>
            <div className="flex justify-between text-sm">
              <span>Total ticket price</span>
              <span className="font-medium">Rp {ticket.price}</span>
            </div>
            <div className="flex justify-between border-t pt-3 font-bold">
              <span>Total</span>
              <span>Rp {total ?? baseTotal}</span>
            </div>
            {!showUpload && (
              <Button
                className="mt-6 w-full rounded-none border-2 border-gray-900 bg-orange-500 font-bold text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-600"
                onClick={() => setShowConfirmModal(true)}
              >
                Pay
              </Button>
            )}
          </div>

          {/* Upload Payment Proof */}
          {showUpload && (
            <div className="rounded-none border-2 border-gray-900 bg-white p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <p className="mb-2 text-sm font-semibold text-gray-700">
                Upload Payment Proof
              </p>
              <Input
                type="file"
                accept="image/*"
                className="rounded-none border-2 border-gray-900"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    setPaymentProof(file);
                    setPreviewImage(URL.createObjectURL(file));
                  }
                }}
              />
              {previewImage && (
                <Image
                  src={previewImage}
                  alt="Preview"
                  width={300}
                  height={200}
                  className="mt-4 border border-gray-300"
                />
              )}
              <Button
                disabled={!paymentProof || isUploading}
                onClick={async () => {
                  if (!paymentProof) return;
                  await uploadProof({ paymentProof });
                  setShowUpload(false);
                  toast.success("Payment proof uploaded successfully!");
                }}
                className="mt-4 w-full rounded-none border-2 border-gray-900 bg-green-600 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:bg-green-700"
              >
                {isUploading ? "Uploading..." : "Submit Payment Proof"}
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center bg-black/20">
          <div className="pointer-events-auto w-[90%] max-w-md rounded-none border-2 border-gray-900 bg-white p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="mb-2 text-lg font-bold">Confirm Transaction</h2>
            <p className="mb-4 text-sm text-gray-600">
              Are you sure you want to proceed with this transaction? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                className="rounded-none border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="rounded-none border-2 border-gray-900 bg-orange-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-orange-600"
                onClick={() => {
                  setShowUpload(true);
                  setShowConfirmModal(false);
                  toast.info("Waiting for payment. Please upload your proof.");
                }}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

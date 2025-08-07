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

  if (isPending) return <div>Loading...</div>;
  if (!transaction || !ticket) return <div>Order not found</div>;

  return (
    <div className="mx-auto min-h-screen max-w-7xl p-4 sm:p-6">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Content */}
        <div className="space-y-6 lg:col-span-2">
          <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
            Order Detail
          </h1>

          <Card>
            <CardContent className="space-y-6 p-6">
              <div className="flex flex-col gap-4 md:flex-row">
                {!!transaction?.event?.thumbnail && (
                  <Image
                    src={transaction.event.thumbnail}
                    alt="Event Thumbnail"
                    width={300}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                )}
                <div className="flex-1 space-y-2">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {transaction?.event?.title}
                  </h2>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="mr-2 h-4 w-4 text-orange-500" />
                    {transaction?.event?.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Calendar className="mr-2 h-4 w-4 text-orange-500" />
                    {transaction?.event?.startDate &&
                      format(
                        new Date(transaction.event.startDate),
                        "dd MMM yyyy",
                      )}{" "}
                    -{" "}
                    {transaction?.event?.endDate &&
                      format(
                        new Date(transaction.event.endDate),
                        "dd MMM yyyy",
                      )}
                  </div>
                </div>
              </div>

              {/* Ticket Info */}
              <div className="border-t pt-4">
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

              {/* Status from backend */}
              {transaction.status && (
                <div
                  className={`rounded p-3 text-sm font-medium ${
                    transaction.status === "WAITING_FOR_PAYMENT"
                      ? "bg-yellow-100 text-yellow-800"
                      : transaction.status === "PAID"
                        ? "bg-green-100 text-green-800"
                        : transaction.status === "REJECTED"
                          ? "bg-red-100 text-red-800"
                          : "bg-gray-100 text-gray-800"
                  }`}
                >
                  Status: <strong>{formatStatus(transaction.status)}</strong>
                </div>
              )}

              {/* Bank Info */}
              <div className="space-y-1 text-sm text-gray-700">
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
            </CardContent>
          </Card>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Voucher */}
          <Card>
            <CardContent className="p-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Enter voucher code here"
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                />
                <Button onClick={handleApplyVoucher}>Apply</Button>
              </div>
              {errorMessage && (
                <p className="mt-2 text-sm text-red-500">{errorMessage}</p>
              )}
            </CardContent>
          </Card>

          {/* Price Summary */}
          <Card>
            <CardContent className="space-y-4 p-6">
              <h3 className="text-lg font-semibold">Detail Price</h3>
              <div className="flex justify-between text-sm">
                <span>Total ticket price</span>
                <span className="font-medium">Rp {ticket.price}</span>
              </div>
              <div className="flex justify-between border-t pt-3 font-semibold">
                <span>Total</span>
                <span>Rp {total ?? baseTotal}</span>
              </div>
              {!showUpload && (
                <Button
                  className="w-full bg-orange-500 text-white hover:bg-orange-600"
                  onClick={() => setShowConfirmModal(true)}
                >
                  Pay
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Upload Payment Proof */}
          {showUpload && (
            <Card>
              <CardContent className="space-y-4 p-4">
                <p className="text-sm font-semibold text-gray-700">
                  Upload Payment Proof
                </p>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      setPaymentProof(file);
                      setPreviewImage(URL.createObjectURL(file));
                    }
                  }}
                />
                {!!previewImage && (
                  <Image
                    src={previewImage}
                    alt="Preview"
                    width={300}
                    height={200}
                    className="rounded-lg border"
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
                  className="bg-green-600 text-white hover:bg-green-700"
                >
                  {isUploading ? "Uploading..." : "Submit Payment Proof"}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="pointer-events-none fixed inset-0 z-50 flex items-center justify-center">
          <div className="pointer-events-auto w-[90%] max-w-md rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
            <h2 className="mb-2 text-lg font-bold">Confirm Transaction</h2>
            <p className="mb-4 text-sm text-gray-600">
              Are you sure you want to proceed with this transaction? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </Button>
              <Button
                className="bg-orange-500 text-white hover:bg-orange-600"
                onClick={() => {
                  setShowUpload(true);
                  setShowConfirmModal(false);
                  toast.info(
                    "Waiting for payment. Please upload your payment proof.",
                  );
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

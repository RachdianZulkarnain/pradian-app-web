"use client";

import { useVouchers } from "../_hooks/useVouchers";
import VoucherCard from "./VoucherCard";

const VoucherSection = ({ eventId }: { eventId: string }) => {
  const { data: vouchers = [], isLoading } = useVouchers(eventId);

  if (isLoading) return <p>Loading vouchers...</p>;
  if (vouchers.length === 0)
    return <p className="text-sm text-gray-500">No vouchers available.</p>;

  return (
    <div className="mt-10 space-y-4">
      <h2 className="text-xl font-semibold text-orange-500">
        Available Vouchers
      </h2>
      {vouchers.map((voucher: any) => (
        <VoucherCard
          key={voucher.id}
          code={voucher.code}
          price={voucher.value}
        />
      ))}
    </div>
  );
};

export default VoucherSection;

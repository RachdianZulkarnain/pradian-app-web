"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { toast } from "sonner";

interface VoucherCardProps {
  code: string;
  price: number;
}

const VoucherCard: React.FC<VoucherCardProps> = ({ code, price }) => {
  const copyCode = () => {
    navigator.clipboard.writeText(code);
    toast.success("Voucher code copied!");
  };

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border p-4 shadow-sm">
      <div>
        <div className="text-lg font-bold text-orange-600">{code}</div>
        <div className="text-muted-foreground text-sm">
          Rp {price.toLocaleString()}
        </div>
      </div>
      <Button onClick={copyCode} variant="outline" size="icon">
        <Copy className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default VoucherCard;

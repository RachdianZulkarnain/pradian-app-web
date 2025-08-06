"use client";

import { Clipboard, Check } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ReferralCodeInput({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      toast.success("Referral code copied!");
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error("Failed to copy referral code", err);
    }
  };

  return (
    <div>
      <Label>Referral Code</Label>
      <div className="relative">
        <Input value={code} disabled className="pr-10" />
        <Button
          type="button"
          size="icon"
          variant="ghost"
          onClick={handleCopy}
          className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
        >
          {copied ? (
            <Check className="h-4 w-4 text-green-500" />
          ) : (
            <Clipboard className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

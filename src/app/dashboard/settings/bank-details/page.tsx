"use client";

import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetBankDetails } from "./_hooks/useGetBankDetails";
import { useUpsertBankDetails } from "./_hooks/useUpsertBankDetails";

const bankOptions = ["BCA", "BNI", "BRI", "Mandiri"];

export default function BankDetailsPage() {
  const { data, isLoading } = useGetBankDetails();
  const { mutate, isPending } = useUpsertBankDetails();

  const [bankName, setBankName] = useState("");
  const [accountName, setAccountName] = useState("");
  const [accountNumber, setAccountNumber] = useState("");

  useEffect(() => {
    if (data) {
      setBankName(data.bankName);
      setAccountName(data.accountName);
      setAccountNumber(data.accountNumber);
    }
  }, [data]);

  const handleSubmit = () => {
    if (!bankName || !accountName || !accountNumber) return;
    mutate({ bankName, accountName, accountNumber });
  };

  return (
    <div className="mx-auto max-w-xl p-4">
      <h1 className="text-2xl font-semibold">Bank Details</h1>
      <p className="text-muted-foreground mb-6">
        Manage your bank details settings.
      </p>

      {/* Bank Name */}
      <div className="mb-5">
        <Label>Bank Name</Label>
        {isLoading ? (
          <Skeleton className="mt-2 h-10 w-full rounded-md" />
        ) : (
          <Select value={bankName} onValueChange={setBankName}>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select bank" />
            </SelectTrigger>
            <SelectContent>
              {bankOptions.map((bank) => (
                <SelectItem key={bank} value={bank}>
                  {bank}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )}
        <p className="text-muted-foreground mt-1 text-sm">
          You can edit your bank here.
        </p>
      </div>

      {/* Account Name */}
      <div className="mb-5">
        <Label>Account Name</Label>
        {isLoading ? (
          <Skeleton className="mt-2 h-10 w-full rounded-md" />
        ) : (
          <Input
            type="text"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            className="mt-2"
          />
        )}
        <p className="text-muted-foreground mt-1 text-sm">
          You can edit your account name here.
        </p>
      </div>

      {/* Account Number */}
      <div className="mb-5">
        <Label>Account Number</Label>
        {isLoading ? (
          <Skeleton className="mt-2 h-10 w-full rounded-md" />
        ) : (
          <Input
            type="number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="mt-2"
          />
        )}
        <p className="text-muted-foreground mt-1 text-sm">
          You can edit your account number here.
        </p>
      </div>

      <Button
        disabled={isPending || isLoading}
        onClick={handleSubmit}
        className="mt-2"
        variant="outline"
      >
        {isPending ? "Saving..." : "Save"}
      </Button>
    </div>
  );
}

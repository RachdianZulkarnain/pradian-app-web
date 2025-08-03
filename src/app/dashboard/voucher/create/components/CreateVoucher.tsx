"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useCreateVoucher from "../_hooks/useCreateVoucher";
import { useEvents } from "../_hooks/useEvents";

const CreateVoucher = () => {
  const [form, setForm] = useState({
    event: "",
    code: "",
    value: "",
    limit: "",
  });

  const { data: events = [], isLoading } = useEvents();
  const createVoucher = useCreateVoucher();

  const generateCode = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setForm((prev) => ({ ...prev, code }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.event || !form.code || !form.value || !form.limit) {
      alert("Please fill in all required fields.");
      return;
    }

    createVoucher.mutate({
      event: form.event,
      code: form.code,
      value: Number(form.value),
      limit: Number(form.limit),
    });
  };

  return (
    <main className="container mx-auto mt-10 px-4 pb-20">
      <h1 className="mb-6 text-3xl font-bold text-orange-500">
        Create Voucher
      </h1>

      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {/* Left column */}
          <div className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="event">Event *</Label>
              <Select
                value={form.event}
                onValueChange={(value) =>
                  setForm((prev) => ({ ...prev, event: value }))
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select an event" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      Loading...
                    </div>
                  ) : events.length > 0 ? (
                    events.map((event: { id: string; name: string }) => (
                      <SelectItem key={event.id} value={event.id}>
                        {event.name}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="px-4 py-2 text-sm text-gray-400">
                      No events available
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="code">Code *</Label>
              <div className="flex">
                <Input
                  value={form.code}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, code: e.target.value }))
                  }
                  placeholder="Voucher code"
                  className="rounded-r-none"
                />
                <Button
                  type="button"
                  onClick={generateCode}
                  className="rounded-l-none"
                >
                  Generate
                </Button>
              </div>
            </div>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="value">Value *</Label>
              <Input
                type="number"
                value={form.value}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, value: e.target.value }))
                }
                placeholder="Voucher value"
                min="0"
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="limit">Limit *</Label>
              <Input
                type="number"
                value={form.limit}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, limit: e.target.value }))
                }
                placeholder="Usage limit"
                min="1"
              />
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={createVoucher.isPending}
            className="bg-orange-500 text-white hover:bg-orange-600"
          >
            {createVoucher.isPending ? "Submitting..." : "Submit Voucher"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default CreateVoucher;

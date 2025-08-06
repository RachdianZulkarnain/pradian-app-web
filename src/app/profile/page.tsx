"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { ReferralCodeInput } from "@/components/referral-code-input";

import { useGetProfile } from "./_hooks/useGetProfile";
import { useUpdateProfile } from "./_hooks/useUpdateProfile";

export default function ProfilePage() {
  const { data: profile, isLoading, isError } = useGetProfile();
  const updateMutation = useUpdateProfile();

  const [name, setName] = useState("");
  const [pictureProfile, setPictureProfile] = useState<File | null>(null);

  useEffect(() => {
    if (profile) {
      setName(profile.name);
    }
  }, [profile]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error("Name cannot be empty");
      return;
    }

    try {
      await updateMutation.mutateAsync({ name, pictureProfile });
      setPictureProfile(null);
    } catch {
      // error handled in hook
    }
  };

  if (isLoading) {
    return (
      <div className="mx-auto mt-10 flex max-w-4xl gap-8">
        <aside className="w-64 space-y-2">
          <Skeleton className="h-8 w-1/2" />
          <Skeleton className="h-8 w-3/4" />
        </aside>
        <div className="flex-1 space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-6 w-1/2" />
        </div>
      </div>
    );
  }

  if (isError || !profile) {
    return (
      <div className="mt-10 text-center text-red-500">
        Failed to load profile. Please try again.
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex max-w-5xl gap-8 px-4">
      {/* Sidebar */}
      <aside className="w-64 border-4 border-gray-900 bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <nav className="space-y-2 font-bold text-gray-900 uppercase text-sm">
          <Link href="/profile">
            <div className="rounded-none border-2 border-gray-900 bg-muted px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Profile
            </div>
          </Link>
          <Link href="/profile/change-password">
            <div className="rounded-none border-2 border-gray-900 px-4 py-2 transition-colors hover:bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Change Password
            </div>
          </Link>
        </nav>
      </aside>

      {/* Profile Details */}
      <div className="flex-1 space-y-8 border-4 border-gray-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <AvatarImage
              src={
                pictureProfile
                  ? URL.createObjectURL(pictureProfile)
                  : profile.pictureProfile || undefined
              }
              alt="Profile"
            />
            <AvatarFallback className="text-xl font-bold">
              {profile.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-black text-gray-900">
              {profile.name}
            </h2>
            <p className="text-sm font-medium text-gray-500">
              {profile.email}
            </p>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid max-w-md gap-6">
          {/* Editable Full Name */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-900 uppercase">
              Full Name
            </Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={updateMutation.isPending}
              className="h-14 rounded-none border-2 border-gray-900 font-medium placeholder:text-gray-400 focus:border-blue-600 focus:ring-0"
            />
          </div>

          {/* Read-only Email */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-900 uppercase">
              Email
            </Label>
            <Input
              value={profile.email}
              disabled
              className="h-14 rounded-none border-2 border-gray-900 bg-gray-100"
            />
          </div>

          {/* Referral Code */}
          <ReferralCodeInput code={profile.referralCode} />

          {/* Read-only Role */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-900 uppercase">
              Role
            </Label>
            <Input
              value={profile.role}
              disabled
              className="h-14 rounded-none border-2 border-gray-900 bg-gray-100"
            />
          </div>

          {/* Read-only Total Points */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-900 uppercase">
              Total Points
            </Label>
            <Input
              value={profile.referralPoints}
              disabled
              className="h-14 rounded-none border-2 border-gray-900 bg-gray-100"
            />
          </div>

          {/* Profile Picture Upload */}
          <div className="space-y-2">
            <Label className="text-sm font-bold text-gray-900 uppercase">
              Profile Picture
            </Label>
            <Input
              type="file"
              accept="image/*"
              disabled={updateMutation.isPending}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPictureProfile(file);
              }}
              className="h-14 rounded-none border-2 border-gray-900"
            />
          </div>

          {/* Save Button */}
          <Button
            onClick={handleSubmit}
            disabled={updateMutation.isPending}
            className="h-14 w-full transform rounded-none border-2 border-gray-900 bg-blue-600 text-lg font-bold uppercase tracking-wide text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-blue-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
          >
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

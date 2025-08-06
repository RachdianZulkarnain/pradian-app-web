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
      setPictureProfile(null); // reset after upload
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
    <div className="mx-auto mt-10 flex max-w-4xl gap-8">
      {/* Sidebar */}
      <aside className="w-64 border-r pr-4">
        <nav className="space-y-2">
          <Link href="/profile">
            <div className={cn("rounded-md px-3 py-2 text-sm font-medium", "bg-muted")}>
              Profile
            </div>
          </Link>
          <Link href="/profile/change-password">
            <div className="hover:bg-muted rounded-md px-3 py-2 text-sm font-medium transition">
              Change Password
            </div>
          </Link>
        </nav>
      </aside>

      {/* Profile Details */}
      <div className="flex-1 space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border">
            <AvatarImage
              src={
                pictureProfile
                  ? URL.createObjectURL(pictureProfile)
                  : profile.pictureProfile || undefined
              }
              alt="Profile"
            />
            <AvatarFallback>{profile.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{profile.name}</h2>
            <p className="text-muted-foreground text-sm">{profile.email}</p>
          </div>
        </div>

        {/* Form Section */}
        <div className="grid max-w-md gap-4">
          {/* Editable Full Name */}
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={updateMutation.isPending}
            />
          </div>

          {/* Read-only Email */}
          <div>
            <Label>Email</Label>
            <Input value={profile.email} disabled />
          </div>

          {/* Referral Code with Copy */}
          <ReferralCodeInput code={profile.referralCode} />

          {/* Read-only Role */}
          <div>
            <Label>Role</Label>
            <Input value={profile.role} disabled />
          </div>

          {/* Read-only Total Points */}
          <div>
            <Label>Total Points</Label>
            <Input value={profile.referralPoints} disabled />
          </div>

          {/* Profile Picture Upload */}
          <div>
            <Label>Profile Picture</Label>
            <Input
              type="file"
              accept="image/*"
              disabled={updateMutation.isPending}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPictureProfile(file);
              }}
            />

          </div>

          {/* Save Button */}
          <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useGetProfile } from "./_hooks/useGetProfile";

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useGetProfile();

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto mt-10 flex gap-8">
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

  if (isError || !user) {
    return (
      <div className="text-center text-red-500 mt-10">
        Failed to load profile. Please try again.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 flex gap-8">
      {/* Sidebar */}
      <aside className="w-64 border-r pr-4">
        <nav className="space-y-2">
          <Link href="/profile">
            <div className={cn("text-sm font-medium px-3 py-2 rounded-md", "bg-muted")}>
              Profile
            </div>
          </Link>
          <Link href="/profile/change-password">
            <div className="text-sm font-medium px-3 py-2 rounded-md hover:bg-muted transition">
              Change Password
            </div>
          </Link>
        </nav>
      </aside>

      {/* Profile Details */}
      <div className="flex-1 space-y-6">
        <div className="flex items-center gap-4">
          {user.pictureProfile ? (
            <Image
              src={user.pictureProfile}
              alt="Profile"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <div className="grid gap-4 max-w-md">
          <div>
            <Label>Name</Label>
            <Input value={user.name} disabled />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user.email} disabled />
          </div>
          <div>
            <Label>Referral Code</Label>
            <Input value={user.referralCode} disabled />
          </div>
          <div>
            <Label>Role</Label>
            <Input value={user.role} disabled />
          </div>
        </div>

        {/* Edit Button */}
        <div className="pt-4">
          <Link href="/profile/edit">
            <Button className="w-full">Edit Profile</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

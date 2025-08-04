"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Link from "next/link";
import { useGetDashboardProfile } from "./_hooks/useGetDashboardProfile";

export default function ProfilePage() {
  const { data: user, isLoading, isError } = useGetDashboardProfile();

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

  if (isError || !user) {
    return (
      <div className="mt-10 text-center text-red-500">
        Failed to load profile. Please try again.
      </div>
    );
  }

  return (
    <div className="mx-auto mt-10 flex max-w-4xl gap-8">
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
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-200 text-gray-500">
              No Image
            </div>
          )}
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-muted-foreground text-sm">{user.email}</p>
          </div>
        </div>

        <div className="grid max-w-md gap-4">
          <div>
            <Label>Name</Label>
            <Input value={user.name} disabled />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={user.email} disabled />
          </div>
          <div>
            <Label>Role</Label>
            <Input value={user.role} disabled />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useUpdateProfileAdmin } from "./_hooks/useUpdateProfileAdmin";
import { useGetDashboardProfile } from "./_hooks/useGetDashboardProfile";

const ProfilePage = () => {
  const { data: profile, isLoading } = useGetDashboardProfile();
  const updateMutation = useUpdateProfileAdmin();

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
      setPictureProfile(null); // reset uploaded picture state
    } catch {
      // error handled in hook
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-4 p-6">
        <Skeleton className="h-6 w-1/3" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-1/3" />
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-muted-foreground text-sm">
          Manage your profile settings.
        </p>
      </div>

      <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={updateMutation.isPending}
            />
            <p className="text-muted-foreground text-sm">
              You can edit your full name here.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input value={profile?.email} disabled />
            <p className="text-muted-foreground text-sm">
              This field is not editable.
            </p>
          </div>

          <div className="space-y-2">
            <Label>Role</Label>
            <Input value={profile?.role} disabled />
            <p className="text-muted-foreground text-sm">
              This field is not editable.
            </p>
          </div>

          <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
            {updateMutation.isPending ? "Saving..." : "Save"}
          </Button>
        </div>

        <div className="space-y-2">
          <Label>Profile Picture</Label>
          <Avatar className="h-40 w-40 border">
            <AvatarImage
              src={
                pictureProfile
                  ? URL.createObjectURL(pictureProfile)
                  : profile?.pictureProfile || undefined
              }
              alt="Profile"
            />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <Input
            type="file"
            accept="image/*"
            disabled={updateMutation.isPending}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setPictureProfile(file);
            }}
          />
          <p className="text-muted-foreground text-sm">
            You can edit your profile picture here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

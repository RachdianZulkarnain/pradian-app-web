"use client";

import { useGetProfile } from "../_hooks/useGetProfile";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { Loader } from "lucide-react";
import useChangePassword from "./_hooks/useChangePassword";
import { Skeleton } from "@/components/ui/skeleton";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current Password is required").min(6),
  newPassword: Yup.string().required("New Password is required").min(6),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("newPassword")], "Your Passwords do not match"),
});

const ChangePasswordPage = () => {
  const { mutateAsync: resetPassword, isPending } = useChangePassword();
  const { data: profile, isLoading, isError } = useGetProfile();

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
            <div
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium",
                "hover:bg-muted",
              )}
            >
              Profile
            </div>
          </Link>
          <Link href="/profile/change-password">
            <div className="bg-muted rounded-md px-3 py-2 text-sm font-medium">
              Change Password
            </div>
          </Link>
        </nav>
      </aside>

      {/* Change Password Card */}
      <div className="flex-1 space-y-6">
        {/* Header Section */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border">
            <AvatarImage
              src={profile.pictureProfile || undefined}
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
        <Card className="max-w-md">
          <Formik
            initialValues={{
              oldPassword: "",
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              await resetPassword({
                oldPassword: values.oldPassword,
                newPassword: values.newPassword,
              });
            }}
          >
            <Form className="space-y-4">
              <CardHeader>
                <CardTitle>Reset Password</CardTitle>
                <CardDescription>
                  Enter your password below to reset your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2">
                  <Label htmlFor="oldPassword">Current Password</Label>
                  <Field
                    name="oldPassword"
                    as={Input}
                    type="password"
                    placeholder="Your current password"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Field
                    name="newPassword"
                    as={Input}
                    type="password"
                    placeholder="Your new password"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type="password"
                    placeholder="Confirm new password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex-col gap-2">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Loader className="animate-spin" /> : "Submit"}
                </Button>
              </CardFooter>
            </Form>
          </Formik>
        </Card>
      </div>
    </div>
  );
};

export default ChangePasswordPage;

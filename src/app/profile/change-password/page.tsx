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
    <div className="mx-auto mt-10 flex max-w-5xl gap-8 px-4">
      {/* Sidebar */}
      <aside className="w-64 border-4 border-gray-900 bg-white p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <nav className="space-y-2 font-bold text-gray-900 uppercase text-sm">
          <Link href="/profile">
            <div className="rounded-none border-2 border-gray-900 px-4 py-2 transition-colors hover:bg-muted shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Profile
            </div>
          </Link>
          <Link href="/profile/change-password">
            <div className="rounded-none border-2 border-gray-900 bg-muted px-4 py-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Change Password
            </div>
          </Link>
        </nav>
      </aside>

      {/* Change Password Form */}
      <div className="flex-1 space-y-6 border-4 border-gray-900 bg-white p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20 border-2 border-gray-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <AvatarImage
              src={profile.pictureProfile || undefined}
              alt="Profile"
            />
            <AvatarFallback className="text-xl font-bold">
              {profile.name[0]}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-black text-gray-900">{profile.name}</h2>
            <p className="text-sm font-medium text-gray-500">{profile.email}</p>
          </div>
        </div>

        {/* Form Card */}
        <Card className="max-w-md border-4 border-gray-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
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
                <CardTitle className="text-lg font-black text-gray-900">
                  Reset Password
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  Enter your password below to reset your account
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6">
                {/* Old Password */}
                <div className="grid gap-2">
                  <Label className="text-sm font-bold uppercase text-gray-900">
                    Current Password
                  </Label>
                  <Field
                    name="oldPassword"
                    as={Input}
                    type="password"
                    placeholder="Your current password"
                    className="h-14 rounded-none border-2 border-gray-900"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* New Password */}
                <div className="grid gap-2">
                  <Label className="text-sm font-bold uppercase text-gray-900">
                    New Password
                  </Label>
                  <Field
                    name="newPassword"
                    as={Input}
                    type="password"
                    placeholder="Your new password"
                    className="h-14 rounded-none border-2 border-gray-900"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Confirm Password */}
                <div className="grid gap-2">
                  <Label className="text-sm font-bold uppercase text-gray-900">
                    Confirm Password
                  </Label>
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type="password"
                    placeholder="Confirm new password"
                    className="h-14 rounded-none border-2 border-gray-900"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
              </CardContent>

              <CardFooter className="flex-col gap-2">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="h-14 w-full transform rounded-none border-2 border-gray-900 bg-blue-600 text-lg font-bold uppercase tracking-wide text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-blue-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                >
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

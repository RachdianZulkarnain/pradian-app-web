"use client";

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
import { Label } from "@radix-ui/react-label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Loader } from "lucide-react";
import * as Yup from "yup";
import useChangePassword from "./_hooks/useChangePassword";

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current Password is required").min(6),
  newPassword: Yup.string().required("New Password is required").min(6),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("newPassword")], "Your Password do not match"),
});

const ChangePasswordPage = () => {
  const { mutateAsync: resetPassword, isPending } = useChangePassword();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <Card className="w-full max-w-md border-4 border-gray-900 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
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
              <CardTitle className="text-2xl font-black text-gray-900 uppercase">
                Reset Password
              </CardTitle>
              <CardDescription className="text-base font-medium text-gray-600">
                Enter your password below to reset your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {/* CURRENT PASSWORD */}
                <div className="space-y-2">
                  <Label
                    htmlFor="oldPassword"
                    className="text-sm font-bold uppercase text-gray-900"
                  >
                    Current Password
                  </Label>
                  <Field
                    name="oldPassword"
                    as={Input}
                    type="password"
                    placeholder="Your current password"
                    className="h-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:border-blue-600 focus:ring-0"
                  />
                  <ErrorMessage
                    name="oldPassword"
                    component="p"
                    className="border-l-4 border-red-500 bg-red-50 p-2 text-sm font-medium text-red-500"
                  />
                </div>

                {/* NEW PASSWORD */}
                <div className="space-y-2">
                  <Label
                    htmlFor="newPassword"
                    className="text-sm font-bold uppercase text-gray-900"
                  >
                    New Password
                  </Label>
                  <Field
                    name="newPassword"
                    as={Input}
                    type="password"
                    placeholder="Your new password"
                    className="h-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:border-blue-600 focus:ring-0"
                  />
                  <ErrorMessage
                    name="newPassword"
                    component="p"
                    className="border-l-4 border-red-500 bg-red-50 p-2 text-sm font-medium text-red-500"
                  />
                </div>

                {/* CONFIRM PASSWORD */}
                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="text-sm font-bold uppercase text-gray-900"
                  >
                    Confirm Password
                  </Label>
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type="password"
                    placeholder="Confirm your new password"
                    className="h-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:border-blue-600 focus:ring-0"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="border-l-4 border-red-500 bg-red-50 p-2 text-sm font-medium text-red-500"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col gap-2 px-6 pb-6">
              <Button
                type="submit"
                className="h-14 w-full transform rounded-none border-2 border-gray-900 bg-blue-600 text-lg font-bold uppercase tracking-wide text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-blue-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                disabled={isPending}
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>SUBMITTING...</span>
                  </div>
                ) : (
                  "Submit"
                )}
              </Button>
            </CardFooter>
          </Form>
        </Formik>
      </Card>
    </main>
  );
};

export default ChangePasswordPage;

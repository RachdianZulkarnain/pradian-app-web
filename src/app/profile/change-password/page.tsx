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
import { FC } from "react";
import * as Yup from "yup";
import { Loader } from "lucide-react";
import useChangePassword from "./_hooks/useChangePassword";


const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Current Password is required").min(6),
  newPassword: Yup.string().required("New Password is required").min(6),
  confirmPassword: Yup.string()
    .required("Confirm Password is Required")
    .oneOf([Yup.ref("newPassword")], "Your Password do not match"),
});

const ChangePasswordPage= () => {
  const { mutateAsync: resetPassword, isPending } = useChangePassword();
  return (
    <main className="container mx-auto">
      <Card className="mx-auto mt-24 w-full max-w-sm">
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
                Enter your password below to reset to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-6">
                {/* CURRENT PASSWORD */}
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
                {/* PASSWORD */}
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">Password</Label>
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

                {/* CONFIRM PASSWORD */}
                <div className="grid gap-2">
                  <Label htmlFor="newPassword">Confirm Password</Label>
                  <Field
                    name="confirmPassword"
                    as={Input}
                    type="password"
                    placeholder="Confirm your new password"
                  />
                  <ErrorMessage
                    name="confirmPassword"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>
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
    </main>
  );
};

export default ChangePasswordPage;

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
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Loader } from "lucide-react";
import * as Yup from "yup";
import useForgotPassword from "./_hooks/useForgotPassword";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const { mutateAsync: forgotPassword, isPending } = useForgotPassword();

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 py-12">
      <Card className="w-full max-w-md border-4 border-gray-900 bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await forgotPassword({ email: values.email });
          }}
        >
          <Form className="space-y-4">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-gray-900 uppercase">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-base font-medium text-gray-600">
                Enter your email below to reset your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-bold uppercase text-gray-900"
                  >
                    Email
                  </Label>
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="Your email"
                    className="h-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:border-blue-600 focus:ring-0"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="border-l-4 border-red-500 bg-red-50 p-2 text-sm font-medium text-red-500"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-2 px-6 pb-6">
              <Button
                type="submit"
                disabled={isPending}
                className="h-14 w-full transform rounded-none border-2 border-gray-900 bg-blue-600 text-lg font-bold uppercase tracking-wide text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-blue-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                {isPending ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Submitting...</span>
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

export default ForgotPassword;

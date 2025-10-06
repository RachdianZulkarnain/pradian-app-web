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
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <Formik
          initialValues={{ email: "" }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            await forgotPassword({ email: values.email });
          }}
        >
          <Form className="space-y-4">
            <CardHeader>
              <CardTitle className="text-2xl font-black text-gray-900">
                Forgot Password
              </CardTitle>
              <CardDescription className="text-base font-medium text-gray-400">
                Enter your email below to reset your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-bold text-gray-900 uppercase"
                  >
                    Email
                  </Label>
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="Your email"
                    className="h-12 rounded-md font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="rounded-md bg-red-50 p-2 text-sm font-medium text-red-500"
                  />
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-2 px-6 pb-6">
              <Button
                type="submit"
                disabled={isPending}
                className="h-12 w-full rounded-md bg-blue-600 text-lg font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
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

"use client";

import { useState } from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import Image from "next/image";
import {
  Loader,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useLogin from "./_hooks/useLogin";

export default function SignIn() {
  const { mutateAsync: login, isPending } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <Image
              src="/assets/pradian-logo1.png"
              alt="Pradian Logo"
              width={250}
              height={250}
              className="object-contain sm:w-[200px] w-[180px]"
              priority
            />
          </div>
          <div>
            <h1 className="mb-2 text-3xl sm:text-4xl font-black text-gray-900">
              WELCOME BACK
            </h1>
            <div className="mx-auto mb-4 h-1 w-16 bg-red-500"></div>
            <p className="font-medium text-gray-600 text-sm sm:text-base">
              Sign in to your PradianEvent account
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="border-4 border-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-6 sm:p-8">
            <Formik
              initialValues={{ email: "", password: "" }}
              validate={(values) => {
                const errors: any = {};
                if (!values.email) {
                  errors.email = "Email is required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.password) {
                  errors.password = "Password is required";
                } else if (values.password.length < 6) {
                  errors.password = "Password must be at least 6 characters";
                }
                return errors;
              }}
              onSubmit={async (values) => {
                try {
                  await login({
                    email: values.email,
                    password: values.password,
                  });
                } catch (error) {
                  console.error("Login failed:", error);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Email Address
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center bg-blue-600">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="email"
                        as={Input}
                        type="email"
                        placeholder="Enter your email"
                        className={`h-14 rounded-none border-2 border-gray-900 bg-white pl-14 font-medium transition-all duration-200 placeholder:text-gray-400 focus:border-blue-600 focus:ring-0 ${
                          errors.email && touched.email
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="border-l-4 border-red-500 bg-red-50 p-2 text-sm font-medium text-red-500"
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="password"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center bg-blue-600">
                        <Lock className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="password"
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        className={`h-14 pr-12 pl-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:border-blue-600 focus:ring-0 ${
                          errors.password && touched.password
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-600 transition-colors hover:text-blue-600"
                      >
                        {showPassword ? (
                          <EyeOff className="h-5 w-5" />
                        ) : (
                          <Eye className="h-5 w-5" />
                        )}
                      </button>
                    </div>
                    <ErrorMessage
                      name="password"
                      component="div"
                      className="border-l-4 border-red-500 bg-red-50 p-2 text-sm font-medium text-red-500"
                    />
                  </div>

                  {/* Forgot Password */}
                  <div className="flex justify-end">
                    <Link
                      href="/forgot-password"
                      className="text-sm font-bold tracking-wide text-red-500 uppercase transition-colors hover:text-red-600 hover:underline"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    className="h-14 w-full transform rounded-none border-2 border-gray-900 bg-red-500 text-lg font-bold tracking-wide text-white uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-red-600 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center gap-3">
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>SIGNING IN...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>SIGN IN</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>

                  {/* Sign Up */}
                  <div className="pt-4 text-center">
                    <p className="font-medium text-gray-900">
                      Don&apos;t have an account?
                    </p>
                    <Link
                      href="/register"
                      className="mt-2 inline-block border-2 border-gray-900 bg-blue-600 px-6 py-2 font-bold tracking-wide text-white uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-blue-700"
                    >
                      Sign Up Free
                    </Link>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>

        {/* Terms */}
        <div className="border-2 border-gray-900 bg-gray-100 p-4 mt-4 sm:mt-6">
          <p className="text-center text-xs leading-relaxed font-medium text-gray-700">
            By signing in, you agree to our{" "}
            <a
              href="#"
              className="font-bold text-blue-600 underline transition-colors hover:text-blue-700"
            >
              Terms of Service
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-bold text-red-500 underline transition-colors hover:text-red-600"
            >
              Privacy Policy
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

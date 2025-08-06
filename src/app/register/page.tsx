"use client";

import { useState } from "react";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Loader,
  User,
  Mail,
  Lock,
  Gift,
  ArrowRight,
  EyeOff,
  Eye,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./_hooks/useRegister";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required").min(3),
  email: Yup.string().required("Email is required").email(),
  password: Yup.string().required("Password is required").min(6),
  referralCode: Yup.string(),
});

export default function SignUp() {
  const { mutateAsync: register, isPending } = useRegister();
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
              className="object-contain w-[180px] sm:w-[200px] lg:w-[250px]"
              priority
            />
          </div>
          <div>
            <h1 className="mb-2 text-3xl sm:text-4xl font-black text-gray-900">
              JOIN US
            </h1>
            <div className="mx-auto mb-4 h-1 w-16 bg-red-500"></div>
            <p className="font-medium text-gray-600 text-sm sm:text-base">
              Create your PradianEvent account
            </p>
          </div>
        </div>

        {/* Register Card */}
        <Card className="border-4 border-gray-900 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
          <CardContent className="p-6 sm:p-8">
            <Formik
              initialValues={{
                name: "",
                email: "",
                password: "",
                referralCode: "",
              }}
              validationSchema={validationSchema}
              onSubmit={async (values) => {
                try {
                  await register(values);
                } catch (err) {
                  console.error("Registration failed", err);
                }
              }}
            >
              {({ errors, touched }) => (
                <Form className="space-y-6">
                  {/* Name */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="name"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center bg-blue-600">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="name"
                        as={Input}
                        type="text"
                        placeholder="Your full name"
                        className={`h-14 pl-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:ring-0 focus:border-blue-600 ${
                          errors.name && touched.name
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="border-l-4 border-red-500 bg-red-50 p-2 text-sm font-medium text-red-500"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center bg-blue-600">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="email"
                        as={Input}
                        type="email"
                        placeholder="Your email"
                        className={`h-14 pl-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:ring-0 focus:border-blue-600 ${
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

                  {/* Password */}
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
                        placeholder="Create a password"
                        className={`h-14 pr-12 pl-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:ring-0 focus:border-blue-600 ${
                          errors.password && touched.password
                            ? "border-red-500 focus:border-red-500"
                            : ""
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute top-1/2 right-4 -translate-y-1/2 transform text-gray-600 hover:text-blue-600"
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

                  {/* Referral Code */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="referralCode"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Referral Code (Optional)
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center bg-blue-600">
                        <Gift className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="referralCode"
                        as={Input}
                        type="text"
                        placeholder="Enter referral code"
                        className="h-14 pl-14 rounded-none border-2 border-gray-900 bg-white font-medium placeholder:text-gray-400 focus:ring-0 focus:border-blue-600"
                      />
                    </div>
                    <ErrorMessage
                      name="referralCode"
                      component="div"
                      className="text-sm font-medium text-red-500"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    className="h-14 w-full transform rounded-none border-2 border-gray-900 bg-blue-600 text-lg font-bold tracking-wide text-white uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:bg-blue-700 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                    disabled={isPending}
                  >
                    {isPending ? (
                      <div className="flex items-center gap-3">
                        <Loader className="h-5 w-5 animate-spin" />
                        <span>REGISTERING...</span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-2">
                        <span>REGISTER</span>
                        <ArrowRight className="h-5 w-5" />
                      </div>
                    )}
                  </Button>

                  {/* Switch to Login */}
                  <div className="pt-4 text-center">
                    <p className="font-medium text-gray-900">
                      Already have an account?
                    </p>
                    <Link
                      href="/login"
                      className="mt-2 inline-block border-2 border-gray-900 bg-red-500 px-6 py-2 font-bold tracking-wide text-white uppercase shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-colors hover:bg-red-600"
                    >
                      Sign In
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
            By signing up, you agree to our{" "}
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

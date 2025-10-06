"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Gift,
  Loader,
  Lock,
  Mail,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";
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
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-6 text-center">
          <div className="flex justify-center">
            <Link href="/">
              <Image
                src="/assets/pradian-logo1.png"
                alt="Pradian Logo"
                width={250}
                height={250}
                className="w-[100px] object-contain sm:w-[100px] lg:w-[100px]"
                priority
              />
            </Link>
          </div>
          <div>
            <h1 className="mb-2 text-2xl font-black text-gray-900 sm:text-4xl">
              Create Your Account
            </h1>
          </div>
        </div>

        <Card className="bg-white shadow-lg">
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
                  <div className="space-y-3">
                    <Label
                      htmlFor="name"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Full Name
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center rounded-l-md bg-blue-600">
                        <User className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="name"
                        as={Input}
                        type="text"
                        placeholder="Your full name"
                        className={`h-12 rounded-md pl-14 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 ${
                          errors.name && touched.name
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="rounded-md bg-red-50 p-2 text-sm font-medium text-red-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Email
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center rounded-l-md bg-blue-600">
                        <Mail className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="email"
                        as={Input}
                        type="email"
                        placeholder="Your email"
                        className={`h-12 rounded-md pl-14 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 ${
                          errors.email && touched.email
                            ? "border-red-500 focus:ring-red-500"
                            : ""
                        }`}
                      />
                    </div>
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="rounded-md bg-red-50 p-2 text-sm font-medium text-red-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="password"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center rounded-l-md bg-blue-600">
                        <Lock className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="password"
                        as={Input}
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a password"
                        className={`h-12 rounded-md pr-12 pl-14 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600 ${
                          errors.password && touched.password
                            ? "border-red-500 focus:ring-red-500"
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
                      className="rounded-md bg-red-50 p-2 text-sm font-medium text-red-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label
                      htmlFor="referralCode"
                      className="text-sm font-bold tracking-wide text-gray-900 uppercase"
                    >
                      Referral Code (Optional)
                    </Label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex w-12 items-center justify-center rounded-l-md bg-blue-600">
                        <Gift className="h-4 w-4 text-white" />
                      </div>
                      <Field
                        name="referralCode"
                        as={Input}
                        type="text"
                        placeholder="Enter referral code"
                        className="h-12 rounded-md pl-14 font-medium placeholder:text-gray-400 focus:ring-2 focus:ring-blue-600"
                      />
                    </div>
                    <ErrorMessage
                      name="referralCode"
                      component="div"
                      className="text-sm font-medium text-red-500"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="h-12 w-full rounded-md bg-blue-600 text-lg font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-blue-700 hover:shadow-lg"
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

                  <div className="pt-4 text-center">
                    <p className="font-medium text-gray-900">
                      Already have an account?{" "}
                      <Link href="/login">Sign In</Link>
                    </p>
                  </div>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

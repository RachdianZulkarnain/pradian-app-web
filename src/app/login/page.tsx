"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Loader } from "lucide-react";
import useLogin from "./_hooks/useLogin";
import Link from "next/link";

export default function SignIn() {
  const { mutateAsync: login, isPending } = useLogin();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12">
      <div className="space-y-6 w-full max-w-md">
        {/* LOGIN CARD */}
        <Card className="border border-border shadow-md">
          <CardContent className="p-8">
            <Formik
              initialValues={{ email: "", password: "" }}
              onSubmit={async (values) => {
                await login({ email: values.email, password: values.password });
              }}
            >
              <Form className="space-y-6">
                {/* Title */}
                <div className="text-center">
                  <h1 className="text-2xl font-bold">Welcome Back</h1>
                  <p className="text-muted-foreground text-sm">
                    Sign in to your PradianEvent account
                  </p>
                </div>

                {/* Email */}
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Field
                    name="email"
                    as={Input}
                    type="email"
                    placeholder="you@example.com"
                  />
                  <ErrorMessage
                    name="email"
                    component="p"
                    className="text-sm text-red-500"
                  />
                </div>

                {/* Password */}
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Field
                    name="password"
                    as={Input}
                    type="password"
                    placeholder="••••••••"
                  />
                  <ErrorMessage
                    name="password"
                    component="p"
                    className="text-sm text-red-500"
                  />
                                      <Link
                      href="/forgot-password"
                      className="ml-auto text-sm text-primary hover:underline"
                    >
                      Forgot Password
                    </Link>
                </div>

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? <Loader className="animate-spin" /> : "Login"}
                </Button>

                {/* Footer */}
                <p className="text-center text-sm text-muted-foreground">
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/register"
                    className="text-primary hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </Form>
            </Formik>
          </CardContent>
        </Card>

        {/* TERMS */}
        <p className="text-center text-xs text-muted-foreground max-w-sm mx-auto">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      </div>
    </div>
  );
}

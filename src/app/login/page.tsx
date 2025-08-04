"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Loader } from "lucide-react";
import useLogin from "./_hooks/useLogin";
import Link from "next/link";

export default function SignIn() {
  const { mutateAsync: login, isPending } = useLogin();

  return (
    <div className={cn("flex flex-col gap-6 items-center justify-center min-h-screen px-4 bg-background")}>
      <Card className="overflow-hidden p-0 max-w-3xl w-full">
        <CardContent className="grid p-0 md:grid-cols-2">
          <Formik
            initialValues={{ email: "", password: "" }}
            onSubmit={async (values) => {
              await login({ email: values.email, password: values.password });
            }}
          >
            <Form className="p-6 md:p-8 space-y-6">
              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                <p className="text-muted-foreground text-sm">
                  Sign in to your PradianEvent account
                </p>
              </div>

              {/* EMAIL */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="you@example.com"
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-400"
                />
              </div>

              {/* PASSWORD */}
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password" className="text-white">Password</Label>
                  <Link
                    href="/forgot-password"
                    className="ml-auto text-sm text-pink-500 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Field
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-800 text-white placeholder-gray-400"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-red-400"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-pink-600 text-white hover:bg-pink-700"
                disabled={isPending}
              >
                {isPending ? <Loader className="animate-spin" /> : "Login"}
              </Button>

              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t after:border-white/20">
                <span className="relative z-10 bg-background px-2 text-gray-400">
                  Or continue with
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {/* Apple */}
                <Button variant="outline" type="button" className="w-full">
                  🍎
                  <span className="sr-only">Login with Apple</span>
                </Button>
                {/* Google */}
                <Button variant="outline" type="button" className="w-full">
                  🟢
                  <span className="sr-only">Login with Google</span>
                </Button>
                {/* Meta */}
                <Button variant="outline" type="button" className="w-full">
                  📘
                  <span className="sr-only">Login with Meta</span>
                </Button>
              </div>

              <div className="text-center text-sm text-gray-400">
                Don't have an account?{" "}
                <Link href="/register" className="text-pink-500 hover:underline">
                  Sign up
                </Link>
              </div>
            </Form>
          </Formik>

          {/* Image / Right section */}
          <div className="bg-muted relative hidden md:block">
            <img
              src="/placeholder.svg"
              alt="Login illustration"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>

      <div className="text-muted-foreground text-center text-xs">
        By clicking continue, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
}

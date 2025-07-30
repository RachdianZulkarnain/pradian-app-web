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
import useLogin from "./_hooks/useLogin";

const SignIn = () => {
  const { mutateAsync: login, isPending } = useLogin();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-gray-800 flex items-center justify-center px-4">
      <Card className="w-full max-w-md backdrop-blur-md bg-white/5 border border-white/10 shadow-xl text-white rounded-2xl">
        <Formik
          initialValues={{ email: "", password: "" }}
          onSubmit={async (values) => {
            await login({ email: values.email, password: values.password });
          }}
        >
          <Form className="space-y-4">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-bold text-white">
                Welcome Back
              </CardTitle>
              <CardDescription className="text-sm text-gray-300">
                Sign in to your EventHub account
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* EMAIL */}
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-gray-200">
                  Email
                </Label>
                <Field
                  name="email"
                  as={Input}
                  type="email"
                  placeholder="you@example.com"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <ErrorMessage
                  name="email"
                  component="p"
                  className="text-sm text-red-400"
                />
              </div>

              {/* PASSWORD */}
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-gray-200">
                  Password
                </Label>
                <Field
                  name="password"
                  as={Input}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
                <ErrorMessage
                  name="password"
                  component="p"
                  className="text-sm text-red-400"
                />
              </div>
            </CardContent>

            <CardFooter className="flex-col gap-2 px-6 pb-6">
              <Button
                type="submit"
                className="w-full bg-pink-600 hover:bg-pink-700 transition text-white"
                disabled={isPending}
              >
                {isPending ? <Loader className="animate-spin" /> : "Login"}
              </Button>
              <p className="text-xs text-center text-gray-400 mt-2">
                New to EventHub?{" "}
                <a href="/register" className="text-pink-500 hover:underline">
                  Create an account
                </a>
              </p>
            </CardFooter>
          </Form>
        </Formik>
      </Card>
    </main>
  );
};

export default SignIn;

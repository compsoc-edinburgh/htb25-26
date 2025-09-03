"use client";
import React, { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import type { NextPage } from "next";
import { useRouter } from "next/navigation";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { toast } from "sonner";

const ForgotPasswordPage: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [code, setCode] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [secondFactor, setSecondFactor] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  if (!isLoaded) {
    return null;
  }

  // If the user is already signed in,
  // redirect them to the home page
  if (isSignedIn) {
    router.push("/");
  }

  // Send the password reset code to the user's email
  async function create(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.create({
        strategy: "reset_password_email_code",
        identifier: email,
      })
      .then((_) => {
        setSuccessfulCreation(true);
        setError("");
        toast.success("Reset code sent to your email");
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  // Reset the user's password.
  // Upon successful reset, the user will be
  // signed in and redirected to the home page
  async function reset(e: React.FormEvent) {
    e.preventDefault();
    await signIn
      ?.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code,
        password,
      })
      .then((result) => {
        // Check if 2FA is required
        if (result.status === "needs_second_factor") {
          setSecondFactor(true);
          setError("");
        } else if (result.status === "complete") {
          // Set the active session to
          // the newly created session (user is now signed in)
          setActive({ session: result.createdSessionId });
          setError("");
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors[0].longMessage);
        setError(err.errors[0].longMessage);
      });
  }

  return (
    <div className="flex w-full max-w-screen-md flex-col items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-sm flex-col gap-8">
        <div className="text-center">
          <h1 className="font-hexaframe text-2xl font-bold">
            Reset your password
          </h1>
        </div>

        <form
          onSubmit={!successfulCreation ? create : reset}
          className="grid gap-6"
        >
          {!successfulCreation && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
              >
                Send reset code
              </Button>
            </div>
          )}

          {successfulCreation && (
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  New password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="code" className="text-sm font-medium">
                  Reset code
                </Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Check your email"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
              >
                Reset password
              </Button>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600">{error}</p>
          )}

          {secondFactor && (
            <p className="text-sm text-red-600">
              2FA is required, but this UI does not handle that
            </p>
          )}

          <div className="text-center text-sm text-zinc-500">
            Remember your password?{" "}
            <Link
              href="/signin"
              className="text-zinc-900 underline underline-offset-4 hover:no-underline"
            >
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

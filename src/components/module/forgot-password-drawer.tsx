"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSignIn } from "@clerk/nextjs";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

interface ForgotPasswordDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSigninClick: () => void;
}

const EmailSchema = z.object({ email: z.string().email() });
type EmailValues = z.infer<typeof EmailSchema>;

const ResetSchema = z.object({ password: z.string().min(6), code: z.string().min(1) });
type ResetValues = z.infer<typeof ResetSchema>;

export default function ForgotPasswordDrawer({
  open,
  onOpenChange,
  onSigninClick,
}: ForgotPasswordDrawerProps) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [step, setStep] = useState<"request" | "reset">("request");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const emailForm = useForm<EmailValues>({ resolver: zodResolver(EmailSchema) });
  const resetForm = useForm<ResetValues>({ resolver: zodResolver(ResetSchema) });

  const onRequest = async (values: EmailValues) => {
    if (!isLoaded) return;
    setLoading(true);
    await signIn
      ?.create({ strategy: "reset_password_email_code", identifier: values.email })
      .then(() => {
        setStep("reset");
        setError("");
        toast.success("Reset code sent to your email");
      })
      .catch((err) => {
        console.error("error", err.errors?.[0]?.longMessage);
        setError(err.errors?.[0]?.longMessage ?? "Failed to send reset code");
      });
    setLoading(false);
  };

  const onReset = async (values: ResetValues) => {
    if (!isLoaded) return;
    setLoading(true);
    await signIn
      ?.attemptFirstFactor({ strategy: "reset_password_email_code", code: values.code, password: values.password })
      .then((result) => {
        if (result.status === "needs_second_factor") {
          setError("2FA required, not supported here");
        } else if (result.status === "complete") {
          setActive({ session: result.createdSessionId });
          setError("");
          onOpenChange(false);
        } else {
          console.log(result);
        }
      })
      .catch((err) => {
        console.error("error", err.errors?.[0]?.longMessage);
        setError(err.errors?.[0]?.longMessage ?? "Failed to reset");
      });
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center justify-center px-12 pb-32">
        <DialogTitle className="sr-only">Forgot password</DialogTitle>
        {step === "request" ? (
          <form onSubmit={emailForm.handleSubmit(onRequest)} className="w-full">
            <div className="text-center my-10">
              <h1 className="font-hexaframe text-2xl font-bold">Reset your password</h1>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">Email address</Label>
                <Input id="email" type="email" placeholder="name@example.com" {...emailForm.register("email")} />
              </div>
              <Button type="submit" className="w-full bg-zinc-900 text-white hover:bg-zinc-800" loading={loading}>Send reset code</Button>
              <div className="text-center text-sm text-zinc-500">
                Remember your password?{" "}
                <button
                  type="button"
                  className="text-zinc-900 underline underline-offset-4 hover:no-underline"
                  onClick={() => {
                    onOpenChange(false);
                    onSigninClick();
                  }}
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={resetForm.handleSubmit(onReset)} className="w-full">
            <div className="text-center my-10">
              <h1 className="font-hexaframe text-2xl font-bold">Enter reset code</h1>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm font-medium">New password</Label>
                <Input id="password" type="password" {...resetForm.register("password")} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="code" className="text-sm font-medium">Reset code</Label>
                <Input id="code" type="text" placeholder="Check your email" {...resetForm.register("code")} />
              </div>
              <Button type="submit" className="w-full bg-zinc-900 text-white hover:bg-zinc-800" loading={loading}>Reset password</Button>
            </div>
            {error && <p className="text-sm text-red-600 mt-3">{error}</p>}
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}



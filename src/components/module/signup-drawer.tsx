"use client";

import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useSignUp } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../ui/input-otp";
import { api } from "~/trpc/react";

interface SignupDrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSigninClick: () => void;
}

const AccountSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type AccountValues = z.infer<typeof AccountSchema>;

export default function SignupDrawer({
  open,
  onOpenChange,
  onSigninClick,
}: SignupDrawerProps) {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [step, setStep] = useState<"account" | "verifying">("account");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>();
  const [codeError, setCodeError] = useState<string>("");
  const [code, setCode] = useState("");

  const checkExistingUser = api.user.checkExisting.useMutation();
  const createUser = api.user.create.useMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AccountValues>({ resolver: zodResolver(AccountSchema) });

  const onCreate = async (values: AccountValues) => {
    if (!isLoaded || loading) return;
    setLoading(true);
    try {
      const exists = await checkExistingUser.mutateAsync(values.email);
      if (exists) {
        setEmailError(
          "You already have an account with this email, please sign in instead."
        );
        setLoading(false);
        return;
      }
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setStep("verifying");
    } catch (e: any) {
      toast.error(e.message);
      console.error(e);
    }
    setLoading(false);
  };

  const onVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    setLoading(true);
    try {
      const attempt = await signUp.attemptEmailAddressVerification({ code });
      if (attempt.status === "complete") {
        if (!attempt.createdUserId || !attempt.emailAddress) {
          toast.error("Invalid sign up attempt");
          throw new Error("Invalid sign up attempt");
        }
        await createUser.mutateAsync({
          clerkId: attempt.createdUserId,
          email: attempt.emailAddress,
        });
        await setActive({ session: attempt.createdSessionId });
        onOpenChange(false);
      } else {
        toast.error("Couldn't verify, please try again.");
        setCodeError("Couldn't verify, please try again.");
      }
    } catch (err: any) {
      toast.error(err.errors?.[0]?.longMessage ?? "Verification failed");
      setCodeError(err.errors?.[0]?.longMessage ?? "Verification failed");
    }
    setLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex flex-col items-center justify-center p-12">
        <DialogTitle className="sr-only">Sign up</DialogTitle>
        {step === "account" ? (
          <form onSubmit={handleSubmit(onCreate)} className="w-full">
            <div className="text-center my-10">
              <h1 className="font-hexaframe text-2xl font-bold">Sign up to Hack the Burgh</h1>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <span className="font-sans text-sm text-zinc-500">
                  You&apos;ll need your university email to apply
                </span>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  data-error={emailError || errors.email ? "true" : undefined}
                  className="border-gray-200 focus:border-black focus:ring-black"
                  {...register("email")}
                  required
                />
                {(emailError || errors.email) && (
                  <span className="text-sm text-red-600">{emailError || errors.email?.message}</span>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  className="border-gray-200 focus:border-black focus:ring-black"
                  data-error={errors.password ? "true" : undefined}
                  {...register("password")}
                  required
                />
              </div>
              <div className="flex justify-center">
                <div id="clerk-captcha"></div>
              </div>
              <Button
                type="submit"
                className="w-full bg-black text-white hover:bg-gray-800"
                loading={loading}
                disabled={!isLoaded}
              >
                Continue
              </Button>
              <div className="text-center text-sm text-zinc-600">
                Already have an account?{" "}
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
          <form onSubmit={onVerify} className="w-full">
            <div className="my-10">
              <h1 className="font-hexaframe text-2xl font-bold">Verify your email</h1>
              <p className="text-sm text-zinc-600">We&apos;ve sent a verification code to your email address.</p>
            </div>
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="code" className="text-center">
                  Verification code
                </Label>
                <div className="flex w-full flex-col items-center justify-center gap-3">
                  <InputOTP maxLength={6}>
                    <InputOTPGroup
                      className={!!codeError ? `rounded-md shadow-md ring-4 ring-red-500/20 [&>*]:border-red-500` : ""}
                    >
                      <InputOTPSlot index={0} onChange={(v) => setCode((p) => (v ? v + p.slice(1) : p))} />
                      <InputOTPSlot index={1} onChange={() => {}} />
                      <InputOTPSlot index={2} onChange={() => {}} />
                      <InputOTPSlot index={3} onChange={() => {}} />
                      <InputOTPSlot index={4} onChange={() => {}} />
                      <InputOTPSlot index={5} onChange={() => {}} />
                    </InputOTPGroup>
                  </InputOTP>
                  <span className="block max-w-sm text-center text-sm text-destructive">{codeError}</span>
                </div>
              </div>
              <Button type="submit" loading={loading} disabled={code.length < 6 || !!codeError} className="w-full">
                Verify
              </Button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}



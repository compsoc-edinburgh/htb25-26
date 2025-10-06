"use client";

import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useSignIn, useSignUp, useClerk, useUser } from "@clerk/nextjs";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "~/components/ui/dialog";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  code: z.string().min(6, "Verification code must be 6 digits").max(6),
  codeSent: z.boolean(),
});

type FormValues = z.infer<typeof signInSchema>;

type SignInDrawerProps = {
  trigger?: React.ReactNode;
  className?: string;
  onSignedIn?: () => void;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function SignInDrawer({
  trigger,
  className,
  onSignedIn,
  open,
  onOpenChange,
}: SignInDrawerProps) {
  const { isSignedIn } = useUser();
  const { signIn, isLoaded: isSignInLoaded } = useSignIn();
  const { setActive } = useClerk();

  const form = useForm<FormValues>({
    resolver: zodResolver(signInSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      code: "",
      codeSent: false,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = form;

  const codeSent = watch("codeSent");
  const email = watch("email");
  const code = watch("code");

  useEffect(() => {
    if (isSignedIn) {
      onOpenChange(false);
    }
  }, [isSignedIn, onOpenChange]);

  useEffect(() => {
    if (!open) {
      onOpenChange(false);
      form.reset();
    }
  }, [open, form, onOpenChange]);

  const sendCode = async () => {
    clearErrors("email");

    const currentEmail = getValues("email");
    if (!currentEmail) {
      setError("email", { message: "Email is required" });
      return;
    }

    try {
      if (!isSignInLoaded) {
        throw new Error("Auth not ready yet, try again");
      }

      // Only allow sign-in for existing users
      const attempt = await signIn?.create({ identifier: currentEmail });
      const emailFactor: any = attempt?.supportedFirstFactors?.find(
        (f: any) => f.strategy === "email_code"
      );
      const emailAddressId = emailFactor?.emailAddressId;
      if (!emailAddressId) {
        throw new Error(
          "No account found with this email address. Please check your email or contact support."
        );
      }
      await signIn?.prepareFirstFactor({
        strategy: "email_code",
        emailAddressId,
      });

      setValue("codeSent", true);
      toast.success("Verification code sent to your email");
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "No account found with this email address";
      setError("email", { message });
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!data.codeSent) {
      toast.error("Send a code first");
      return;
    }

    try {
      // Only handle sign-in flow
      const result = await signIn?.attemptFirstFactor({
        strategy: "email_code",
        code: data.code,
      });

      if (result?.status !== "complete") {
        throw new Error("Invalid verification code");
      }

      await setActive({ session: result.createdSessionId });
      toast.success("Signed in successfully");
      onOpenChange(false);
      onSignedIn?.();
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.message ||
        "Invalid verification code";
      setError("code", { message });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white text-black">
        <DialogHeader>
          <DialogTitle className="font-whyte text-xl">
            Sign in to your account
          </DialogTitle>
          <p className="mt-2 text-xs font-normal text-zinc-500">
            Enter your email to sign in. Only existing accounts can access this
            application.
          </p>
        </DialogHeader>
        <form className="py-12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-xs uppercase tracking-wide text-zinc-800"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@student-email.com"
                disabled={isSubmitting || codeSent}
                className="border-zinc-800 bg-white text-black placeholder:text-zinc-500"
                {...register("email")}
              />
              {errors.email && (
                <p className="font-mono text-xs font-medium text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Label className="text-xs uppercase tracking-wide text-black">
                Verification code
              </Label>
              <div className="flex gap-2">
                <Controller
                  control={control}
                  name="code"
                  render={({ field }) => (
                    <InputOTP
                      maxLength={6}
                      value={field.value}
                      onChange={field.onChange}
                      disabled={isSubmitting || !codeSent}
                    >
                      <InputOTPGroup>
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                          <InputOTPSlot key={i} index={i} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  )}
                />
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={sendCode}
                    disabled={isSubmitting || !email || !!errors.email}
                  >
                    {isSubmitting
                      ? "Sending..."
                      : codeSent
                        ? "Resend code"
                        : "Get code"}
                  </Button>
                </div>
              </div>
              {errors.code && (
                <p className="font-mono text-xs font-medium text-red-400">
                  {errors.code.message}
                </p>
              )}
            </div>
          </div>

          <div id="clerk-captcha" />
        </form>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || !codeSent || !code || code.length < 6}
            className="w-full"
          >
            {isSubmitting ? "Verifying..." : "Sign in"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

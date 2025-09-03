"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { useSignUp } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import ContinueWithSocial from "~/components/continue-with-social";
import { api } from "~/trpc/react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "~/components/ui/input-otp";
import { useRouter } from "next/navigation";
import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const { isLoaded, signUp, setActive } = useSignUp();

  const [step, setStep] = useState<"account" | "verifying">("account");
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState<string>();
  const [passwordError, setPasswordError] = useState<string>();

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState<any>("");

  const checkExistingUser = api.user.checkExisting.useMutation();
  const createUser = api.user.create.useMutation();

  const handleCreateAccount = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded || loading) return;

    setLoading(true);

    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");

    if (
      !email ||
      !password ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      toast.error("Please enter a valid email and password");
      return;
    }

    try {
      const exists = await checkExistingUser.mutateAsync(email);

      if (exists) {
        setEmailError(
          "You already have an account with this email, please sign in instead."
        );
        setLoading(false);
        return;
      }

      await signUp.create({
        emailAddress: email as string,
        password: password as string,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setStep("verifying");
    } catch (e: any) {
      toast.error(e.message);
      console.error(e);
    }

    setLoading(false);
  };

  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setLoading(true);

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        if (!signUpAttempt.createdUserId || !signUpAttempt.emailAddress) {
          toast.error("Invalid sign up attempt");
          throw new Error("Invalid sign up attempt");
        }

        // Create the user in the database
        await createUser.mutateAsync({
          clerkId: signUpAttempt.createdUserId,
          email: signUpAttempt.emailAddress,
        });

        // Set the active session
        await setActive({ session: signUpAttempt.createdSessionId });
        // Go to apply/onboarding
        router.push("/apply");
      } else {
        toast.error("Couldn't verify, please try again.");
        setCodeError("Couldn't verify, please try again.");
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err: any) {
      toast.error(err.errors[0].longMessage);
      setCodeError(err.errors[0].longMessage as string);
      console.error("Error:", JSON.stringify(err, null, 2));
    }

    setLoading(false);
  };

  if (step === "verifying") {
    return (
      <div>
        <Card>
          <CardHeader>
            <CardTitle>Verify your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a verification code to your email address. Please
              enter it below.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleVerify}>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="code" className="text-center">
                    Verification code
                  </Label>
                  <div className="flex w-full flex-col items-center justify-center gap-3">
                    <InputOTP
                      maxLength={6}
                      onChange={(e) => {
                        setCodeError("");
                        setCode(e);
                      }}
                    >
                      <InputOTPGroup
                        className={
                          !!codeError
                            ? `rounded-md shadow-md ring-4 ring-red-500/20 [&>*]:border-red-500`
                            : ""
                        }
                      >
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                    <span className="block max-w-sm text-center text-sm text-destructive">
                      {codeError}
                      {codeError.includes("Too many failed attempts") && (
                        <Button
                          className="my-3"
                          variant="outline"
                          onClick={() => setStep("account")}
                        >
                          Retry
                        </Button>
                      )}
                    </span>
                  </div>
                </div>
                <Button
                  type="submit"
                  loading={loading}
                  disabled={code.length < 6 || codeError.length}
                  className="w-full"
                >
                  Verify
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  } else
    return (
      <div className="flex min-h-[calc(100vh-4rem)] w-full max-w-screen-md flex-col items-center justify-center bg-white px-4">
        <div className="flex w-full max-w-sm flex-col gap-8 bg-white">
          <div className="text-center">
            <h1 className="font-hexaframe text-2xl font-bold">
              Sign up to Hack the Burgh
            </h1>
          </div>

          {step === "account" && (
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <ContinueWithSocial />
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200">
                <span className="relative z-10 bg-white px-2 text-zinc-500">
                  Or
                </span>
              </div>
              <form onSubmit={handleCreateAccount}>
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
                      name="email"
                      placeholder="name@example.com"
                      data-error={emailError}
                      className="border-gray-200 focus:border-black focus:ring-black"
                      required
                    />
                    {emailError && (
                      <span className="text-sm text-red-600">{emailError}</span>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password" className="text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      className="border-gray-200 focus:border-black focus:ring-black"
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
                    <Link
                      href="/signin"
                      className="text-zinc-900 underline underline-offset-4 hover:no-underline"
                    >
                      Sign in
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          )}

          <div className="text-balance text-center text-xs text-zinc-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-zinc-900">
            By clicking continue, you agree to MLH&apos;s{" "}
            <a
              target="_blank"
              href="https://static.mlh.io/docs/mlh-code-of-conduct.pdf?_gl=1*1fc0onz*_ga*MTQzMTk5NjI2LjE3MzU1Nzc1OTU.*_ga_E5KT6TC4TK*MTczNTc1NDMzNS4yLjEuMTczNTc1NTIwNi4wLjAuMA.."
            >
              Code of Conduct
            </a>
          </div>
        </div>
      </div>
    );
}

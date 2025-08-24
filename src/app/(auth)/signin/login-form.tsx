"use client";

import { cn } from "~/lib/utils";
import { Button } from "~/components/ui/button";

import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import Link from "next/link";
import { useSignIn } from "@clerk/nextjs";
import { FormEvent, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { isClerkAPIResponseError } from "@clerk/shared/error";
import { ClerkAPIError } from "@clerk/types";
import ContinueWithSocial from "~/components/continue-with-social";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        router.push("/");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        toast.error(JSON.stringify(signInAttempt, null, 2));
      }
    } catch (e) {
      if (isClerkAPIResponseError(e)) setErrors(e.errors);
      else toast.error("An unknown error occurred");
      console.error(JSON.stringify(e, null, 2));
    }

    setLoading(false);
  };

  return (
    <div className="flex w-full max-w-screen-md flex-col items-center justify-center bg-white px-4">
      <div className="flex w-full max-w-sm flex-col gap-8 bg-white">
        <div className="text-center">
          <h1 className="font-hexaframe text-2xl font-bold">Welcome back</h1>
        </div>

        <div className="grid gap-6">
          <div className="flex flex-col gap-4">
            <ContinueWithSocial />
          </div>
          <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-gray-200">
            <span className="relative z-10 bg-white px-2 text-gray-500">
              Or
            </span>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Email address
                </Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-gray-500 underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" name="password" required />
              </div>
              {errors && (
                <ul className="my-3 box-border max-w-sm">
                  {errors.map((el, index) => (
                    <li
                      key={index}
                      className="list-inside list-disc text-sm text-red-600"
                    >
                      {el.longMessage}
                    </li>
                  ))}
                </ul>
              )}
              <Button
                type="submit"
                className="w-full bg-zinc-900 text-white hover:bg-zinc-800"
                loading={loading}
              >
                Sign in
              </Button>
              <div className="text-center text-sm text-gray-500">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-zinc-900 underline underline-offset-4 hover:no-underline"
                >
                  Sign up
                </Link>
              </div>
            </div>
          </form>
        </div>

        <div className="text-balance text-center text-xs text-gray-500 [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-gray-900">
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

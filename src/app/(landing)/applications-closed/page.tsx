"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { Button } from "~/components/ui/button";
import SignInDrawer from "~/components/module/sign-in-dialog-form";
import { useRouter } from "next/navigation";

export default function ApplicationsClosedWithSignIn() {
  const { isSignedIn, isLoaded } = useUser();

  const [signInOpen, setSignInOpen] = useState(false);
  const router = useRouter();

  const handleSignedIn = () => {
    router.push("/dashboard");
  };

  if (!isLoaded) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-2 border-gray-300 border-t-black" />
      </div>
    );
  }

  return (
    <>
      <main className="h-screen w-full">
        <div className="relative flex h-full w-full items-center justify-center">
          <div className="flex scale-90 transform flex-col items-center px-4 text-center sm:scale-100">
            <h1 className="font-hexaframe text-xl font-extrabold sm:text-4xl md:text-5xl">
              Applications are Closed
            </h1>

            <p className="mt-4 max-w-lg text-base text-zinc-600 sm:text-base">
              Unfortunately, applications are closed for this year. Please check
              back in 2026.
            </p>

            {!isSignedIn ? (
              <div className="mt-8">
                <p className="mb-4 text-sm text-zinc-600">
                  Do you have an account?
                </p>
                <Button
                  onClick={() => setSignInOpen(true)}
                  variant="default"
                  size="lg"
                >
                  Sign in
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </main>

      <SignInDrawer
        open={signInOpen}
        onOpenChange={setSignInOpen}
        onSignedIn={handleSignedIn}
      />
    </>
  );
}

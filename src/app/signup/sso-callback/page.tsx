import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default function SSOCallback() {
  return (
    <>
      <AuthenticateWithRedirectCallback />
      <div id="clerk-captcha" />
      <div className="pointer-events-none absolute flex h-full w-full items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    </>
  );
}
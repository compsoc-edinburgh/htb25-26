"use client";

import Link from "next/link";
import React, { useCallback } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { isBeforeOpenDate, OPEN_DATE_READABLE } from "~/lib/date-gate";

type RegisterButtonProps = {
  href?: string;
  onClick?: () => void;
  label?: string;
  subtitle?: string;
  className?: string;
};

export default function RegisterButton({
  href,
  onClick,
  label = "Register",
  subtitle = "Press Enter To Start ↵",
  className = "",
}: RegisterButtonProps) {
  const router = useRouter();
  const { isSignedIn } = useUser();
  const gated = isBeforeOpenDate();

  const handleDefaultClick = useCallback(() => {
    if (gated) return;
    if (isSignedIn) {
      router.push("/apply");
      return;
    }
    try {
      localStorage.setItem("auth:returnTo", "/apply");
    } catch {}
    const event = new CustomEvent("open-auth", { detail: { mode: "signup" } });
    window.dispatchEvent(event);
  }, [gated, isSignedIn, router]);
  const commonProps = {
    className: [
      "group relative inline-block mx-auto mt-10 sm:mt-12 focus:outline-none",
      "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
      "scale-x-[-1] md:scale-x-100",
      className,
    ].join(" "),
    "aria-label": `${label}. ${subtitle}`,
  };

  const ButtonContent = () => (
    <div className="relative w-80">
      <svg
        viewBox="0 0 305 64"
        className="pointer-events-none absolute inset-0 h-full w-full"
        preserveAspectRatio="none"
      >
        <path
          d="M304.5 24.9609V55C304.5 59.6944 300.694 63.5 296 63.5L9 63.5C4.30556 63.5 0.5 59.6944 0.5 55V9C0.5 4.30558 4.30556 0.5 9 0.5L176.099 0.5C177.712 0.5 179.293 0.95925 180.655 1.82422L201.376 14.9814C202.898 15.948 204.664 16.4609 206.468 16.4609L296 16.4609C300.694 16.4609 304.5 20.2666 304.5 24.9609Z"
          stroke="black"
          fill="none"
        />
      </svg>

      <div className="relative z-10 py-4 pl-7 pr-20 text-left font-hexaframe text-xl text-black">
        <span className="inline-block scale-x-[-1] sm:inline sm:scale-x-100">
          {gated ? `Opens ${OPEN_DATE_READABLE}` : label}
        </span>
        <span className="absolute bottom-1 right-2 hidden text-xs text-zinc-600 sm:inline">
          {gated ? "Registration disabled" : subtitle}
        </span>
        <span className="absolute bottom-1 right-2 inline scale-x-[-1] text-xs text-zinc-600 sm:hidden">
          Start your journey↵
        </span>
      </div>
    </div>
  );

  return href ? (
    <Link
      href={gated ? "/applications-closed" : href}
      {...commonProps}
      aria-disabled={gated}
      onClick={(e) => {
        if (gated) e.preventDefault();
      }}
      title={gated ? `Opens ${OPEN_DATE_READABLE}` : undefined}
    >
      <ButtonContent />
    </Link>
  ) : (
    <button
      type="button"
      onClick={gated ? undefined : (onClick ?? handleDefaultClick)}
      {...commonProps}
      aria-disabled={gated}
      title={gated ? `Opens ${OPEN_DATE_READABLE}` : undefined}
    >
      <ButtonContent />
    </button>
  );
}

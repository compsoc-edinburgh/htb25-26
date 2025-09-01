"use client";

import Link from "next/link";
import React from "react";

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
  const commonProps = {
    className: [
      "group relative inline-block mx-auto mt-10 sm:mt-12 focus:outline-none",
      "focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2",
      "scale-x-[-1] md:scale-x-100",
      className,
    ].join(" "),
    "aria-label": `${label}. ${subtitle}`,
  };

  return href ? (
    <Link href={href} {...commonProps}></Link>
  ) : (
    <button type="button" onClick={onClick} {...commonProps}>
      <svg
        className="pointer-events-none absolute -right-4 top-0 z-10 h-40 w-40"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line
          x1="0"
          y1="0"
          x2="15"
          y2="11"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>

      <svg
        className="pointer-events-none absolute right-0 top-0 z-10 h-40 w-40"
        viewBox="0 0 100 100"
        aria-hidden="true"
      >
        <line
          x1="25"
          y1="11"
          x2="100"
          y2="11"
          stroke="currentColor"
          strokeWidth="0.5"
        />
      </svg>

      <div
        className={[
          "relative z-0 w-80 rounded-xl border bg-white/80",
          "py-4 pl-7 pr-20 text-left font-hexaframe text-xl text-black",
          "backdrop-blur transition-[background,transform,box-shadow]",
          "hover:bg-white hover:shadow-md active:translate-y-[1px]",
        ].join(" ")}
        style={{
          clipPath:
            "polygon(0 0, 55% 0, 70% 25%, 100% 28%, 100% 100%, 0% 100%)",
        }}
      >
        {label}

        <span className="pointer-events-none absolute bottom-1 right-2 font-sans text-xs text-gray-600">
          {subtitle}
        </span>
      </div>
    </button>
  );
}

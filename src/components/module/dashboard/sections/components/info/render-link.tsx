"use client";

import { ReactNode } from "react";

export const RenderLink = (url: string | null, text = "View"): ReactNode =>
  url ? (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-blue-600 underline hover:text-blue-800"
    >
      {text}
    </a>
  ) : undefined;

export const RenderYesNo = (value?: boolean | null): ReactNode =>
  value == null ? undefined : value ? "Yes" : "No";

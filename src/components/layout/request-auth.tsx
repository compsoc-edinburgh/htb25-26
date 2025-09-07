"use client";

import { useEffect } from "react";

type AuthMode = "signin" | "signup" | "forgot" | "reset" | "verify";

export default function RequestAuth({
  mode = "signin" as AuthMode,
}: {
  mode?: AuthMode;
}) {
  useEffect(() => {
    const current =
      window.location.pathname + window.location.search + window.location.hash;
    const params = new URLSearchParams({ auth: mode, returnTo: current });
    const target = `/${params.toString() ? `?${params.toString()}` : ""}`;
    if (window.location.pathname !== "/") {
      window.location.replace(target);
    } else {
      try {
        localStorage.setItem("auth:returnTo", current);
      } catch {}
      const event = new CustomEvent("open-auth", { detail: { mode } });
      window.dispatchEvent(event);
    }
  }, [mode]);
  return null;
}

"use client";

import { ReactNode } from "react";

export function InfoItem({
  label,
  value,
}: {
  label: string;
  value?: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-medium uppercase text-zinc-400">{label}</p>
      <div className="text-base text-zinc-900">
        {value ?? <span className="text-zinc-400">Not provided</span>}
      </div>
    </div>
  );
}

"use client";

import { ReactNode } from "react";
import { InfoItem } from "~/components/module/dashboard/sections/components/info/info-items";

export function InfoSection({
  items,
}: {
  items: { label: string; value?: ReactNode }[];
}) {
  const visibleItems = items.filter(
    (item) => item.value !== undefined && item.value !== null
  );

  if (visibleItems.length === 0) return null;

  return (
    <div className="space-y-6 border-b border-zinc-200 p-8 md:p-10 lg:p-12">
      <div className="flex flex-col gap-10">
        {visibleItems.map((item, idx) => (
          <InfoItem key={idx} label={item.label} value={item.value} />
        ))}
      </div>
    </div>
  );
}

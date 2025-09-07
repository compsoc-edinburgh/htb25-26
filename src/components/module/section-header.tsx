import React from "react";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  className = "",
}: SectionHeaderProps) {
  return (
    <div className={`px-4 ${className}`}>
      <h1 className="-ml-1 font-hexaframe text-5xl font-bold md:text-6xl">
        {title}
      </h1>
      <div className="mt-0 flex items-center gap-1.5 pt-1 sm:mt-2 sm:gap-2">
        <div className="h-1 w-1 bg-black sm:h-2 sm:w-2" />
        <p className="text-[8px] uppercase text-black sm:text-[10px]">
          {subtitle}
        </p>
      </div>
    </div>
  );
}

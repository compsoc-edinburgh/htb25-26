"use client";

import { cn } from "~/lib/utils";
import { PropsWithChildren } from "react";

interface AccordionSectionProps extends PropsWithChildren {
  id: string;
  title: string;
  questionsCount?: number;
  disabled?: boolean;
  expanded: boolean;
  onToggle: (id: string) => void;
  invalid?: boolean;
}

export function AccordionSection({
  id,
  title,
  questionsCount,
  disabled,
  expanded,
  onToggle,
  invalid,
  children,
}: AccordionSectionProps) {
  return (
    <div className="scrollbar-hide overflow-hidden bg-white">
      <button
        type="button"
        onClick={() => onToggle(id)}
        className={cn(
          "relative flex w-full items-center justify-between p-8 text-left transition-colors hover:bg-zinc-100 md:p-10 lg:p-12",
          expanded && "bg-zinc-50",
          disabled && "cursor-not-allowed opacity-50",
          invalid && "bg-red-300"
        )}
        disabled={!!disabled}
      >
        <div className="flex items-center space-x-4">
          <div className="flex flex-col md:gap-5">
            {typeof questionsCount === "number" && (
              <div className="absolute top-[15%] mb-2 flex items-center gap-1 text-[0.5rem] text-zinc-600 sm:left-6 sm:top-4 sm:text-[0.6rem]">
                <div className="h-1.5 w-1.5 bg-black sm:h-2 sm:w-2" />
                {questionsCount} QUESTIONS
              </div>
            )}
            <h2 className="pt-5 font-whyte text-2xl font-bold text-black md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        </div>
        {disabled && (
          <div className="absolute bottom-0 right-[15%] mt-5 h-fit bg-black px-2 py-1 text-[0.6rem] text-white">
            LOCKED
          </div>
        )}
        <div className="absolute right-5 top-1/2 h-2 w-4 -translate-y-1/2 sm:right-9 sm:h-3">
          <svg
            width="14"
            height="13"
            viewBox="0 0 14 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={cn("h-full w-full", expanded && "rotate-180")}
          >
            <path d="M1 1L12.5 1L6.5 11.5L1 1Z" fill="black" stroke="black" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="divide-y divide-zinc-200 p-8 pb-20 md:p-10 md:pb-20 lg:p-12 lg:pb-20">
          {children}
        </div>
      )}
    </div>
  );
}

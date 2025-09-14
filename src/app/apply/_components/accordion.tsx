"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
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
          "flex w-full items-center justify-between p-8 text-left transition-colors hover:bg-zinc-100 md:p-10 lg:p-12",
          expanded && "bg-zinc-50",
          disabled && "cursor-not-allowed opacity-50",
          invalid && "bg-red-300"
        )}
        disabled={!!disabled}
      >
        <div className="flex items-center space-x-4">
          <div className="flex flex-col md:gap-5">
            {typeof questionsCount === "number" && (
              <span className="mb-2 flex items-center gap-2 text-xs text-zinc-600">
                {questionsCount} QUESTIONS
              </span>
            )}
            <h2 className="font-whyte text-2xl font-bold text-black md:text-4xl lg:text-5xl">
              {title}
            </h2>
          </div>
        </div>
        <div className="text-zinc-600">
          {expanded ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
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

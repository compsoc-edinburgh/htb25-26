import * as React from "react";

import { cn } from "~/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full border border-zinc-200 bg-white px-3 py-2 text-base ring-offset-background placeholder:text-zinc-500 focus:outline-0 focus-visible:border-gray-900 focus-visible:outline-0 focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:ring-offset-0 active:outline-0 disabled:cursor-not-allowed disabled:opacity-50 data-[error]:border-destructive data-[error]:ring-4 data-[error]:ring-destructive/20 md:text-sm",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

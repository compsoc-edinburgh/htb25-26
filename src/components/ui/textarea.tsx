import * as React from "react";

import { cn } from "~/lib/utils";

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea">
>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background transition-all placeholder:text-muted-foreground focus:outline-0 focus-visible:shadow-md focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-muted focus-visible:ring-offset-0 active:outline-0 disabled:cursor-not-allowed disabled:opacity-50 data-[error]:border-destructive data-[error]:ring-4 data-[error]:ring-destructive/20 md:text-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };

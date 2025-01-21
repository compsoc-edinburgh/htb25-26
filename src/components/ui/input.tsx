import * as React from "react";

import { cn } from "~/lib/utils";

interface InputProps extends React.ComponentProps<"input"> {
  invisible?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ invisible, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border bg-background px-3 py-2 text-base shadow-sm transition-all file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus:outline-0 focus-visible:shadow-md focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-muted focus-visible:ring-offset-0 active:outline-0 disabled:cursor-not-allowed disabled:opacity-50 data-[error]:border-destructive data-[error]:ring-4 data-[error]:ring-destructive/20 md:text-sm",
          className,
          // invisible && " shadow-noneborder-0 bg-transparent text-sm font-medium rounded-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-0",
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };

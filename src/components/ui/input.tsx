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
          "flex h-10 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-500 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:opacity-50 data-[error]:border-red-500 data-[error]:focus:border-red-500 data-[error]:focus:ring-red-500",
          className
          // invisible && " shadow-noneborder-0 bg-transparent text-sm font-medium rounded-none focus-visible:ring-0 focus-visible:shadow-none focus-visible:border-0",
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };

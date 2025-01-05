import * as React from "react"

import { cn } from "~/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full shadow-sm rounded-xl border border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:shadow-md focus-visible:outline-0 focus-visible:ring-4 focus-visible:ring-muted-foreground/20 focus-visible:ring-offset-0 focus-visible:border-black/20 transition-all disabled:cursor-not-allowed disabled:opacity-50 md:text-sm active:outline-0 focus:outline-0 data-[error]:ring-4 data-[error]:ring-destructive/20 data-[error]:border-destructive",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }

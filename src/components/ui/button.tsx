import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "~/lib/utils";
import { Loader2, LoaderIcon } from "lucide-react";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 relative whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-900 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gray-900 text-white hover:bg-gray-700",
        destructive: "bg-red-600 text-white hover:bg-red-700",
        outline:
          "border border-gray-200 bg-white text-gray-900 hover:bg-gray-50",
        secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
        ghost: "text-gray-900 hover:bg-gray-100",
        link: "text-gray-900 underline-offset-4 hover:underline",
      },
      size: {
        default: "px-4 py-2",
        sm: "px-3 py-1 text-xs",
        lg: "px-8 py-3",
        icon: "w-10 h-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, asChild = false, loading = false, ...props },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={loading ?? props.disabled}
        {...props}
      >
        {loading && <Loader2 className="animate-spin text-[200%]" />}
        <Slottable>{props.children}</Slottable>
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

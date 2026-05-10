import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

import { cn } from "@/libs/utils";

const badgeVariants = cva(
  "inline-flex items-center border-2 border-foreground px-2 py-0.5 font-display text-[10px] uppercase tracking-wider",
  {
    variants: {
      variant: {
        default: "bg-secondary text-secondary-foreground",
        required: "bg-destructive text-destructive-foreground",
        accent: "bg-accent text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export const Badge = React.forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  ),
);
Badge.displayName = "Badge";

export { badgeVariants };

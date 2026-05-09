import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export interface FieldProps {
  label: React.ReactNode;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  badge?: React.ReactNode;
  helpText?: React.ReactNode;
  errorMessage?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
}

export const Field: React.FC<FieldProps> = ({
  label,
  htmlFor,
  badge,
  helpText,
  errorMessage,
  className,
  children,
}) => (
  <div className={cn("flex flex-col gap-2", className)}>
    <div className="flex items-center gap-2">
      <Label htmlFor={htmlFor}>{label}</Label>
      {badge}
    </div>
    {children}
    {helpText && (
      <p className="font-mono text-sm text-muted-foreground">{helpText}</p>
    )}
    {errorMessage && (
      <p className="font-mono text-sm text-destructive">{errorMessage}</p>
    )}
  </div>
);

"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-white shadow-glow hover:brightness-105 active:brightness-95",
  secondary:
    "bg-surface text-ink shadow-soft border border-line hover:bg-surface-2",
  outline:
    "border border-line text-ink hover:bg-surface-2 bg-transparent",
  ghost: "text-ink hover:bg-surface-2 bg-transparent",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-4 text-sm rounded-control",
  md: "h-11 px-5 text-[15px] rounded-control",
  lg: "h-[52px] px-7 text-base rounded-control",
};

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium",
        "transition-all duration-200 will-change-transform",
        "hover:-translate-y-[1px] active:translate-y-0",
        "disabled:pointer-events-none disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";

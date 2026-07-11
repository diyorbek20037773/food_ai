import * as React from "react";
import { cn } from "@/lib/utils";

type Tone = "accent" | "success" | "neutral";

const tones: Record<Tone, string> = {
  accent:
    "bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-accent-ink",
  success:
    "bg-[color-mix(in_srgb,var(--success)_14%,transparent)] text-[color-mix(in_srgb,var(--success)_75%,var(--ink))]",
  neutral: "bg-surface-2 text-ink-soft",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: React.HTMLAttributes<HTMLSpanElement> & { tone?: Tone }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}

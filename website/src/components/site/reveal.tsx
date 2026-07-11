import { cn } from "@/lib/utils";

/**
 * Lightweight entrance wrapper.
 * Pure CSS (`animate-fade-up` with `both` fill) so content is ALWAYS present
 * and ends fully visible — safe for SSR, no-JS, crawlers and screenshots.
 * `prefers-reduced-motion` is honored globally in globals.css (near-zero duration,
 * final state kept). A server component — adds no client JS.
 */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div
      className={cn("animate-fade-up", className)}
      style={delay ? { animationDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}

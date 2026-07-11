import { cn } from "@/lib/utils";

/**
 * FoodGPT wordmark.
 * Mark: a warm rounded-square "spark" holding a fork silhouette —
 * reads as both an app icon and an AI "spark". Uses the accent token.
 */
export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span className="relative inline-flex h-9 w-9 items-center justify-center">
        <svg
          viewBox="0 0 36 36"
          fill="none"
          className="h-9 w-9"
          aria-hidden="true"
        >
          <rect
            width="36"
            height="36"
            rx="11"
            fill="url(#fg-grad)"
          />
          {/* fork */}
          <path
            d="M14 10v5.2c0 1.2-.9 2.2-2.1 2.3V26M11.9 10v4.4M16.1 10v4.4M14 10"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* spoon */}
          <path
            d="M23 10c-1.7 0-2.6 1.9-2.6 3.6 0 1.3.9 2.4 2.1 2.6V26"
            stroke="white"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* AI spark */}
          <path
            d="M26.5 8.2c.2 1.1.5 1.4 1.6 1.6-1.1.2-1.4.5-1.6 1.6-.2-1.1-.5-1.4-1.6-1.6 1.1-.2 1.4-.5 1.6-1.6Z"
            fill="white"
          />
          <defs>
            <linearGradient
              id="fg-grad"
              x1="0"
              y1="0"
              x2="36"
              y2="36"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FF6B35" />
              <stop offset="1" stopColor="#FFB703" />
            </linearGradient>
          </defs>
        </svg>
      </span>
      {showWordmark && (
        <span className="text-[19px] font-bold tracking-tight text-ink">
          Food<span className="text-accent">GPT</span>
        </span>
      )}
    </span>
  );
}

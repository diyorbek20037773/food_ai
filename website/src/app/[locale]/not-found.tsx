import { Link } from "@/i18n/routing";
import { Logo } from "@/components/site/logo";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-6 px-6 text-center">
      <Logo />
      <div>
        <p className="text-6xl font-bold text-accent tnum">404</p>
        <p className="mt-2 text-lg text-ink-soft">Page not found</p>
      </div>
      <Link href="/">
        <Button size="lg">Back to home</Button>
      </Link>
    </div>
  );
}

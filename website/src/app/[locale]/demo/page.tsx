import { Suspense } from "react";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Logo } from "@/components/site/logo";
import { ThemeToggle } from "@/components/site/theme-toggle";
import { LanguageSwitcher } from "@/components/site/language-switcher";
import { ChatDemo } from "@/components/demo/chat-demo";
import { ArrowLeft } from "lucide-react";

export default async function DemoPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("demo");

  return (
    <div className="flex h-[100dvh] flex-col">
      <header className="border-b border-line bg-[var(--glass)] backdrop-blur-xl">
        <div className="container-x flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              aria-label={t("back")}
              className="inline-flex h-10 w-10 items-center justify-center rounded-control border border-line bg-surface text-ink-soft transition-colors hover:text-ink hover:bg-surface-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <Link href="/" aria-label="FoodGPT">
              <Logo />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <LanguageSwitcher />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="container-x flex-1 overflow-hidden py-4">
        <Suspense fallback={null}>
          <ChatDemo />
        </Suspense>
      </main>
    </div>
  );
}

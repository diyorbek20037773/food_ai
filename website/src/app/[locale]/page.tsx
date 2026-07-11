import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { ProblemSolution } from "@/components/site/problem-solution";
import { Features } from "@/components/site/features";
import { HowItWorks } from "@/components/site/how-it-works";
import { Team } from "@/components/site/team";
import { DemoVideo } from "@/components/site/demo-video";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <ProblemSolution />
        <Features />
        <HowItWorks />
        <DemoVideo />
        <Team />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

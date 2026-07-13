import { setRequestLocale } from "next-intl/server";
import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { ProblemSolution } from "@/components/site/problem-solution";
import { Stats } from "@/components/site/stats";
import { Features } from "@/components/site/features";
import { Tech } from "@/components/site/tech";
import { HowItWorks } from "@/components/site/how-it-works";
import { UseCases } from "@/components/site/use-cases";
import { ForRestaurants } from "@/components/site/for-restaurants";
import { DemoVideo } from "@/components/site/demo-video";
import { Launch } from "@/components/site/launch";
import { InstallGuide } from "@/components/site/install-guide";
import { Team } from "@/components/site/team";
import { Achievements } from "@/components/site/achievements";
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
        <Stats />
        <Features />
        <Tech />
        <HowItWorks />
        <UseCases />
        <ForRestaurants />
        <DemoVideo />
        <Launch />
        <InstallGuide />
        <Team />
        <Achievements />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

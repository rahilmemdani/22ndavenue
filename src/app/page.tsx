import TransformationHero from "@/components/TransformationHero";
import { AboutHome } from "@/components/Spotlight/AboutHome";
import { StatsBand } from "@/components/Spotlight/StatsBand";
import { Values } from "@/components/Spotlight/Values";
import { Services } from "@/components/Spotlight/Services";
import { FeaturedArtists } from "@/components/Spotlight/FeaturedArtists";
import { MicDropMoments } from "@/components/Spotlight/MicDropMoments";
import { Testimonials } from "@/components/Spotlight/Testimonials";

export default function HomePage() {
  return (
    <main>
      <TransformationHero />
      <AboutHome />
      <StatsBand />
      <FeaturedArtists />
      <MicDropMoments />
      <Testimonials />
      <Values />
      <Services />
    </main>
  );
}

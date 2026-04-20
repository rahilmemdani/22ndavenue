import VideoScrollHero from "@/components/VideoScrollHero";
import { AboutHome } from "@/components/Spotlight/AboutHome";
import { Values } from "@/components/Spotlight/Values";
import { Services } from "@/components/Spotlight/Services";
import { FeaturedArtists } from "@/components/Spotlight/FeaturedArtists";
import { Highlights } from "@/components/Spotlight/Highlights";

export default function HomePage() {
  return (
    <main>
      <VideoScrollHero />
      <AboutHome />
      <Highlights />
      <Values />
      <Services />
      <FeaturedArtists />
    </main>
  );
}

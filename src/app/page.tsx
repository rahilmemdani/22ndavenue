import TransformationHero from "@/components/TransformationHero";
import { AboutHome } from "@/components/Spotlight/AboutHome";
import { StatsBand } from "@/components/Spotlight/StatsBand";
import { Values } from "@/components/Spotlight/Values";
import { Services } from "@/components/Spotlight/Services";
import { FeaturedArtists } from "@/components/Spotlight/FeaturedArtists";
import { MicDropMoments } from "@/components/Spotlight/MicDropMoments";
import { Testimonials } from "@/components/Spotlight/Testimonials";
import { GlobalFootprint } from "@/components/Spotlight/GlobalFootprint";
import { StackedCard } from "@/components/ui/StackedCard";

import { client } from "@/sanity/client";
import {
  heroQuery,
  aboutQuery,
  collabsQuery,
  momentsQuery,
  testimonialsQuery,
  servicesQuery
} from "@/sanity/queries";

export default async function HomePage() {
  // Fetch all data concurrently
  let heroData, aboutData, collabsData, momentsData, testimonialsData, servicesData;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  if (projectId && projectId !== 'your-project-id') {
    try {
      [
        heroData,
        aboutData,
        collabsData,
        momentsData,
        testimonialsData,
        servicesData
      ] = await Promise.all([
        client.fetch(heroQuery),
        client.fetch(aboutQuery),
        client.fetch(collabsQuery),
        client.fetch(momentsQuery),
        client.fetch(testimonialsQuery),
        client.fetch(servicesQuery)
      ]);
    } catch (error) {
      console.error("Failed to fetch from Sanity:", error);
    }
  } else {
    console.log("Skipping Sanity fetch because NEXT_PUBLIC_SANITY_PROJECT_ID is not set or is 'your-project-id'. Using local fallback data.");
  }
  return (
    <main style={{ position: 'relative' }}>
      {/* Background Video Layer - Sticky so cards can slide over it */}
      <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <TransformationHero data={heroData} />
      </div>
      
      {/* First Card Stack: Behind the Spotlight + Stats - Slides OVER the video */}
      <StackedCard zIndex={2}>
        <AboutHome data={aboutData} />
        <StatsBand />
      </StackedCard>

      {/* Normal Scrolling Sections: Our Collabs & Mic Drop Moments */}
      <div style={{ position: 'relative', zIndex: 3, backgroundColor: '#050505' }}>
        <FeaturedArtists data={collabsData} />
        <MicDropMoments data={momentsData} />
      </div>

      {/* Normal Scrolling Section: Testimonials */}
      <div style={{ position: 'relative', zIndex: 4, backgroundColor: '#050505' }}>
        <Testimonials data={testimonialsData} />
        {/* <Values /> */}
      </div>

      {/* Card Stack: Our Services */}
      <StackedCard zIndex={5}>
        <Services data={servicesData} />
      </StackedCard>

      {/* Final Card Stack: Global Footprint */}
      <StackedCard zIndex={6}>
        <GlobalFootprint />
      </StackedCard>
    </main>
  );
}

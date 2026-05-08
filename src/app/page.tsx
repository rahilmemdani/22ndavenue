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
      
      {/* Normal Scrolling Section: Behind the Spotlight + Stats */}
      <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#050505' }}>
        <AboutHome data={aboutData} />
        <StatsBand />
      </div>
      {/* Normal Scrolling Sections: Our Collabs & Mic Drop Moments */}
      <div style={{ position: 'relative', zIndex: 3, backgroundColor: '#050505' }}>
        <FeaturedArtists data={collabsData} />
        <MicDropMoments data={momentsData} />
      </div>

      {/* Card Stack: Testimonials (THE BUZZ IS REAL) */}
      <StackedCard zIndex={4}>
        <Testimonials data={testimonialsData} />
      </StackedCard>

      {/* Normal Scrolling Section: Our Services */}
      <div style={{ position: 'relative', zIndex: 5, backgroundColor: '#050505' }}>
        <Services data={servicesData} />
      </div>

      {/* Final Card Stack: Global Footprint */}
      <StackedCard zIndex={6}>
        <GlobalFootprint />
      </StackedCard>
    </main>
  );
}

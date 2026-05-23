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
  servicesQuery,
  footprintQuery
} from "@/sanity/queries";

// Revalidate page on every request to ensure data is loaded as soon as it's changed
export const revalidate = 0;

export default async function HomePage() {
  // Initialize with null so we can check if fetch succeeded
  let heroData = null;
  let aboutData = null;
  let collabsData = null;
  let momentsData = null;
  let testimonialsData = null;
  let servicesData = null;
  let footprintData = null;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  // Force fetch if we have a project ID
  if (projectId) {
    try {
      console.log(`Attempting to fetch data for project: ${projectId}`);
      const results = await Promise.all([
        client.fetch(heroQuery),
        client.fetch(aboutQuery),
        client.fetch(collabsQuery),
        client.fetch(momentsQuery),
        client.fetch(testimonialsQuery),
        client.fetch(servicesQuery),
        client.fetch(footprintQuery)
      ]);

      [
        heroData,
        aboutData,
        collabsData,
        momentsData,
        testimonialsData,
        servicesData,
        footprintData
      ] = results;
      
      console.log("Sanity fetch successful!");
      console.log("momentsData:", JSON.stringify(momentsData, null, 2));
    } catch (error) {
      console.error("Sanity connection failed:", error);
    }
  } else {
    console.warn("NEXT_PUBLIC_SANITY_PROJECT_ID is missing from environment variables.");
  }

  return (
    <main style={{ position: 'relative' }}>
      {/* Background Video Layer */}
      <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <TransformationHero data={heroData} />
      </div>
      
      <div style={{ position: 'relative', zIndex: 2, backgroundColor: '#050505', transform: 'translateZ(0)', isolation: 'isolate', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}>
        <AboutHome data={aboutData} />
        <StatsBand />
      </div>
      
      <div style={{ position: 'relative', zIndex: 3, backgroundColor: '#050505', transform: 'translateZ(0)', isolation: 'isolate', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}>
        <FeaturedArtists data={collabsData} />
        <MicDropMoments data={momentsData} />
      </div>

      <StackedCard zIndex={4}>
        <Testimonials data={testimonialsData} />
      </StackedCard>

      <div style={{ position: 'relative', zIndex: 5, backgroundColor: '#050505', transform: 'translateZ(0)', isolation: 'isolate', WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}>
        <Services data={servicesData} />
      </div>

      <StackedCard zIndex={6}>
        <GlobalFootprint data={footprintData} />
      </StackedCard>
    </main>
  );
}

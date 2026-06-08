import TransformationHero from "@/components/TransformationHero";
import { AboutHome } from "@/components/Spotlight/AboutHome";
import { StatsBand } from "@/components/Spotlight/StatsBand";
import { Values } from "@/components/Spotlight/Values";
import { Services } from "@/components/Spotlight/Services";
import { FeaturedArtists } from "@/components/Spotlight/FeaturedArtists";
import { MicDropMoments } from "@/components/Spotlight/MicDropMoments";
import { Testimonials } from "@/components/Spotlight/Testimonials";
import { GlobalFootprint } from "@/components/Spotlight/GlobalFootprint";
import { Showrunners } from "@/components/Spotlight/Showrunners";
import { StackedCard } from "@/components/ui/StackedCard";

import { client } from "@/sanity/client";
import {
  heroQuery,
  aboutQuery,
  collabsQuery,
  momentsQuery,
  testimonialsQuery,
  servicesQuery,
  footprintQuery,
  showrunnersQuery
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
  let showrunnersData = null;

  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;

  // Force fetch if we have a project ID
  if (projectId) {
    try {
      console.log(`Attempting to fetch data for project: ${projectId}`);
      const results = await Promise.all([
        client.fetch(heroQuery, {}, { next: { revalidate: 0 } }),
        client.fetch(aboutQuery, {}, { next: { revalidate: 0 } }),
        client.fetch(collabsQuery, {}, { next: { revalidate: 0 } }),
        client.fetch(momentsQuery, {}, { next: { revalidate: 0 } }),
        client.fetch(testimonialsQuery, {}, { next: { revalidate: 0 } }),
        client.fetch(servicesQuery, {}, { next: { revalidate: 0 } }),
        client.fetch(footprintQuery, {}, { next: { revalidate: 0 } }),
        client.fetch(showrunnersQuery, {}, { next: { revalidate: 0 } })
      ]);

      [
        heroData,
        aboutData,
        collabsData,
        momentsData,
        testimonialsData,
        servicesData,
        footprintData,
        showrunnersData
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
    <div style={{ position: 'relative' }}>
      {/* Hero — sticky on desktop, normal flow on mobile */}
      <div className="hero-sticky-wrapper">
        <TransformationHero data={heroData} />
      </div>
      
      <div className="content-layer" style={{ zIndex: 2 }}>
        <AboutHome data={aboutData} />
        <StatsBand />
      </div>
      
      <div className="content-layer" style={{ zIndex: 3 }}>
        <FeaturedArtists data={collabsData} />
        <MicDropMoments data={momentsData} />
      </div>

      <StackedCard zIndex={4}>
        <Testimonials data={testimonialsData} />
      </StackedCard>

      <div className="content-layer" style={{ zIndex: 5 }}>
        <Services data={servicesData} />
      </div>

      <div className="content-layer" style={{ zIndex: 6 }}>
        <GlobalFootprint data={footprintData} />
      </div>

      <div className="content-layer" style={{ zIndex: 7 }}>
        <Showrunners data={showrunnersData} />
      </div>
    </div>
  );
}

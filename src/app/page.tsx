import TransformationHero from "@/components/TransformationHero";
import { AboutHome } from "@/components/Spotlight/AboutHome";
import { StatsBand } from "@/components/Spotlight/StatsBand";
import { Values } from "@/components/Spotlight/Values";
import { Services } from "@/components/Spotlight/Services";
import { FeaturedArtists } from "@/components/Spotlight/FeaturedArtists";
import { MicDropMoments } from "@/components/Spotlight/MicDropMoments";
import { Testimonials } from "@/components/Spotlight/Testimonials";

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
    <main>
      <TransformationHero data={heroData} />
      <AboutHome data={aboutData} />
      <StatsBand />
      <FeaturedArtists data={collabsData} />
      <MicDropMoments data={momentsData} />
      <Testimonials data={testimonialsData} />
      {/* <Values /> */}
      <Services data={servicesData} />
    </main>
  );
}

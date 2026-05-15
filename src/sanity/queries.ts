import { groq } from 'next-sanity'

export const heroQuery = groq`*[_type == "hero"] | order(_updatedAt desc)[0] {
  "desktopVideoUrl": desktopVideo.asset->url,
  "mobileVideoUrl": mobileVideo.asset->url,
  "fallbackImage": fallbackImage.asset->url
}`

export const aboutQuery = groq`*[_type == "about"] | order(_updatedAt desc)[0] {
  "directors": directors[] {
    name,
    title,
    "image": image.asset->url
  },
  story
}`

export const collabsQuery = groq`*[_type == "collabs"] | order(_updatedAt desc)[0] {
  "artists": artists[] {
    name,
    link,
    "image": image.asset->url
  }
}`

export const momentsQuery = groq`*[_type == "moments"] | order(_updatedAt desc)[0] {
  "categories": categories[] {
    categoryName,
    "tiles": tiles[] {
      title,
      subtitle,
      "image": placeholderImage.asset->url,
      "video": video.asset->url
    }
  }
}`

export const testimonialsQuery = groq`*[_type == "testimonials"] | order(_updatedAt desc)[0] {
  "buzzList": buzzList[] {
    authorName,
    authorTitle,
    "authorImage": authorImage.asset->url,
    hasVideo,
    videoUrl,
    text
  }
}`

export const servicesQuery = groq`*[_type == "services"] | order(_updatedAt desc)[0] {
  "servicesList": servicesList[] {
    title,
    description,
    "image": image.asset->url,
    shape,
    "gallery": gallery[] {
      type,
      "image": image.asset->url,
      videoUrl,
      "thumbnail": thumbnail.asset->url
    }
  }
}`

export const footprintQuery = groq`*[_type == "footprint"] | order(_updatedAt desc)[0] {
  "image": image.asset->url
}`

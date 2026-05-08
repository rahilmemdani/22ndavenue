import { groq } from 'next-sanity'

export const heroQuery = groq`*[_type == "hero"][0] {
  desktopVideoUrl,
  mobileVideoUrl,
  "fallbackImage": fallbackImage.asset->url
}`

export const aboutQuery = groq`*[_type == "about"][0] {
  "directors": directors[] {
    name,
    title,
    "image": image.asset->url
  },
  story
}`

export const collabsQuery = groq`*[_type == "collabs"][0] {
  "artists": artists[] {
    name,
    link,
    "image": image.asset->url
  }
}`

export const momentsQuery = groq`*[_type == "moments"][0] {
  "momentsList": momentsList[] {
    title,
    category,
    "placeholderImage": placeholderImage.asset->url,
    "gallery": gallery[] {
      type,
      "image": image.asset->url,
      videoUrl,
      "thumbnail": thumbnail.asset->url
    }
  }
}`

export const testimonialsQuery = groq`*[_type == "testimonials"][0] {
  "buzzList": buzzList[] {
    authorName,
    authorTitle,
    "authorImage": authorImage.asset->url,
    hasVideo,
    videoUrl,
    text
  }
}`

export const servicesQuery = groq`*[_type == "services"][0] {
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

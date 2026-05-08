import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'desktopVideoUrl',
      title: 'Desktop Background Video URL (Vimeo/CDN/Local)',
      type: 'url',
    }),
    defineField({
      name: 'mobileVideoUrl',
      title: 'Mobile Background Video URL (Optional - Vimeo/CDN/Local)',
      type: 'url',
    }),
    defineField({
      name: 'fallbackImage',
      title: 'Fallback Image (For mobile/slow connections)',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})

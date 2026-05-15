import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'desktopVideo',
      title: 'Desktop Background Video',
      type: 'file',
      options: { accept: 'video/mp4,video/*' },
    }),
    defineField({
      name: 'mobileVideo',
      title: 'Mobile Background Video (Optional)',
      type: 'file',
      options: { accept: 'video/mp4,video/*' },
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

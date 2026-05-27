import { defineField, defineType } from 'sanity'

export const hero = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'desktopVideoUrl',
      title: 'Desktop Background Video URL (Google Drive / Cloudflare)',
      type: 'url',
      description: 'Paste a Google Drive sharing link or Cloudflare direct video link.',
    }),
    defineField({
      name: 'mobileVideoUrl',
      title: 'Mobile Background Video URL (Optional - Google Drive / Cloudflare)',
      type: 'url',
      description: 'Paste a Google Drive sharing link or Cloudflare direct video link optimized for mobile.',
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

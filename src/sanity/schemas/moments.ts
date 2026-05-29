import { defineField, defineType } from 'sanity'

export const moments = defineType({
  name: 'moments',
  title: 'Mic Drop Moments',
  type: 'document',
  fields: [
    defineField({
      name: 'categories',
      title: 'Categories (Carousel Sections)',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'category',
          fields: [
            { name: 'categoryName', title: 'Category Name (e.g., Corporate Events, Live Concerts)', type: 'string' },
            {
              name: 'tiles',
              title: 'Accordion Cards (Tiles)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  name: 'tile',
                  fields: [
                    { name: 'title', title: 'Card Main Title (e.g., Summit)', type: 'string' },
                    { name: 'subtitle', title: 'Card Subtitle (e.g., EXPERIENCES)', type: 'string' },
                    { 
                      name: 'placeholderImage', 
                      title: 'Background Image (Desktop/Laptop) - Upload', 
                      type: 'image', 
                      options: { hotspot: true },
                      description: 'Desktop image. Recommended: 1200x1500px (4:5 portrait ratio) to fit the active accordion box perfectly. Landscape (e.g. 1920x1080px) is supported but crops heavily on the sides. Keep file size under 1MB.'
                    },
                    { 
                      name: 'imageUrl', 
                      title: 'Background Image (Desktop/Laptop) - Drive/External URL', 
                      type: 'url',
                      description: 'Desktop image link (Google Drive/External). Recommended: 1200x1500px (4:5 portrait ratio). Landscape (e.g. 1920x1080px) is supported but crops heavily. Make sure links are shared as "Anyone with the link can view".'
                    },
                    { 
                      name: 'mobileImage', 
                      title: 'Background Image (Mobile/Phone) - Upload', 
                      type: 'image', 
                      options: { hotspot: true },
                      description: 'Mobile image. Recommended: 1080x1350px (4:5 portrait ratio) or 1080x1920px (9:16 ratio). Keep file size under 500KB.'
                    },
                    { 
                      name: 'mobileImageUrl', 
                      title: 'Background Image (Mobile/Phone) - Drive/External URL', 
                      type: 'url',
                      description: 'Mobile image link (Google Drive/External). Recommended: 1080x1350px (4:5 ratio) or 1080x1920px (9:16 ratio). Make sure links are shared as "Anyone with the link can view".'
                    },
                    { 
                      name: 'videoUrl', 
                      title: 'Background Video (Desktop/Laptop) - Drive/External URL', 
                      type: 'url',
                      description: 'Desktop video link (Google Drive). Recommended: 1080x1350px (4:5 portrait ratio) for exact fit, or 1920x1080px (1080p, H.264 MP4) with main subjects centered (will crop sides). Keep under 5MB and shared as "Anyone with the link can view".'
                    },
                    { 
                      name: 'video', 
                      title: 'Background Video (Desktop/Laptop) - Upload', 
                      type: 'file', 
                      options: { accept: 'video/mp4,video/*' },
                      description: 'Desktop video. Recommended: 1080x1350px (4:5 portrait ratio) for exact fit, or 1920x1080px (1080p, H.264 MP4) with main subjects centered (will crop sides). Keep under 5MB for optimal performance.'
                    },
                    { 
                      name: 'mobileVideoUrl', 
                      title: 'Background Video (Mobile/Phone) - Drive/External URL', 
                      type: 'url',
                      description: 'Mobile video link (Google Drive). Recommended: 1080x1350px (4:5 ratio) or 1080x1920px (9:16 portrait ratio, H.264 MP4). Keep under 2MB and shared as "Anyone with the link can view".'
                    },
                    { 
                      name: 'mobileVideo', 
                      title: 'Background Video (Mobile/Phone) - Upload', 
                      type: 'file', 
                      options: { accept: 'video/mp4,video/*' },
                      description: 'Mobile video. Recommended: 1080x1350px (4:5 ratio) or 1080x1920px (9:16 portrait ratio, H.264 MP4). Keep under 2MB for fast loading on cellular networks.'
                    }
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      subtitle: 'subtitle',
                      media: 'placeholderImage'
                    }
                  }
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'categoryName'
            },
            prepare(selection: any) {
              return {
                title: selection.title || 'Unnamed Category'
              }
            }
          }
        }
      ]
    })
  ]
})

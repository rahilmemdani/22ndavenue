import { defineField, defineType } from 'sanity'

export const testimonials = defineType({
  name: 'testimonials',
  title: 'The Buzz Is Real',
  type: 'document',
  fields: [
    defineField({
      name: 'buzzList',
      title: 'Testimonials / Buzz',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'authorName', title: 'Author Name', type: 'string' },
            { name: 'authorTitle', title: 'Author Title / Company', type: 'string' },
            { name: 'authorImage', title: 'Author Image', type: 'image', options: { hotspot: true } },
            { name: 'hasVideo', title: 'Has Video Testimonial?', type: 'boolean', initialValue: false },
            { name: 'videoUrl', title: 'Video URL', type: 'url', hidden: ({ parent }) => !parent?.hasVideo },
            { name: 'text', title: 'Testimonial Text', type: 'text', hidden: ({ parent }) => parent?.hasVideo }
          ],
          preview: {
            select: {
              title: 'authorName',
              subtitle: 'authorTitle',
              media: 'authorImage'
            }
          }
        }
      ]
    })
  ]
})

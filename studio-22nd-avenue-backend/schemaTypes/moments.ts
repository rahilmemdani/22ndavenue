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
                    { name: 'placeholderImage', title: 'Background Image', type: 'image', options: { hotspot: true } },
                    { name: 'videoUrl', title: 'Video URL (Vimeo/YouTube/External)', type: 'url' },
                    { name: 'video', title: 'Or Upload Background Video', type: 'file', options: { accept: 'video/mp4,video/*' } }
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

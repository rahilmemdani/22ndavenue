import { defineField, defineType } from 'sanity'

export const moments = defineType({
  name: 'moments',
  title: 'Mic Drop Moments',
  type: 'document',
  fields: [
    defineField({
      name: 'momentsList',
      title: 'Moments List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'category', title: 'Category (e.g., EXPERIENCES, ACTIVATIONS)', type: 'string' },
            { name: 'placeholderImage', title: 'Placeholder Image', type: 'image', options: { hotspot: true } },
            {
              name: 'gallery',
              title: 'Gallery Collection',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'type', title: 'Media Type', type: 'string', options: { list: ['image', 'video'] } },
                    { name: 'image', title: 'Image', type: 'image', hidden: ({ parent }) => parent?.type !== 'image' },
                    { name: 'videoUrl', title: 'Video URL', type: 'url', hidden: ({ parent }) => parent?.type !== 'video' },
                    { name: 'thumbnail', title: 'Video Thumbnail', type: 'image', hidden: ({ parent }) => parent?.type !== 'video' }
                  ]
                }
              ]
            }
          ],
          preview: {
            select: {
              title: 'title',
              subtitle: 'category',
              media: 'placeholderImage'
            }
          }
        }
      ]
    })
  ]
})

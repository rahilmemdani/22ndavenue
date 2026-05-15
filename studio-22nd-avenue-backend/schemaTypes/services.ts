import { defineField, defineType } from 'sanity'

export const services = defineType({
  name: 'services',
  title: 'Where Excellence Runs The Show',
  type: 'document',
  fields: [
    defineField({
      name: 'servicesList',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Placeholder Image', type: 'image', options: { hotspot: true } },
            { name: 'shape', title: 'Shape', type: 'string', options: { list: ['shapeDiamond', 'shapeWave'] }, initialValue: 'shapeDiamond' },
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
              subtitle: 'description',
              media: 'image'
            }
          }
        }
      ]
    })
  ]
})

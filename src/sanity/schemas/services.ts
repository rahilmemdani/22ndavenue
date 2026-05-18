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
            { 
              name: 'shape', 
              title: 'Shape', 
              type: 'string', 
              options: { 
                list: [
                  { title: 'Diamond', value: 'shapeDiamond' },
                  { title: 'Wave', value: 'shapeWave' },
                  { title: 'Arch', value: 'shapeArch' }
                ] 
              }, 
              initialValue: 'shapeDiamond' 
            },
            {
              name: 'gallery',
              title: 'Gallery Collection',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'type', title: 'Media Type', type: 'string', options: { list: ['image', 'video'] } },
                    { name: 'image', title: 'Image', type: 'image', options: { hotspot: true }, hidden: ({ parent }) => parent?.type !== 'image' },
                    { name: 'videoUrl', title: 'Video URL', type: 'url', hidden: ({ parent }) => parent?.type !== 'video' },
                    { name: 'thumbnail', title: 'Video Thumbnail', type: 'image', options: { hotspot: true }, hidden: ({ parent }) => parent?.type !== 'video' }
                  ],
                  preview: {
                    select: {
                      type: 'type',
                      image: 'image',
                      thumbnail: 'thumbnail'
                    },
                    prepare(selection: any) {
                      const { type, image, thumbnail } = selection
                      return {
                        title: type === 'video' ? 'Video' : 'Image',
                        media: type === 'video' ? thumbnail : image
                      }
                    }
                  }
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

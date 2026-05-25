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
            { name: 'image', title: 'Placeholder Image (Card Cover)', type: 'image', options: { hotspot: true } },
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
              name: 'bulkVideoUrls',
              title: '📋 Bulk Video URLs (Paste multiple Google Drive links here)',
              description: 'Paste one URL per line. Supports Google Drive links like: https://drive.google.com/open?id=FILE_ID&usp=drive_copy — These will appear as video tiles in the gallery.',
              type: 'text',
              rows: 10,
            },
            {
              name: 'gallery',
              title: 'Gallery Collection (Images + Individual Videos)',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'type',
                      title: 'Media Type',
                      type: 'string',
                      options: { list: ['image', 'video'] }
                    },
                    {
                      name: 'image',
                      title: 'Image',
                      type: 'image',
                      options: { hotspot: true },
                      hidden: ({ parent }: { parent: any }) => parent?.type !== 'image'
                    },
                    {
                      name: 'videoUrl',
                      title: 'Video URL',
                      description: 'Paste a Google Drive link: https://drive.google.com/open?id=FILE_ID&usp=drive_copy',
                      type: 'url',
                      hidden: ({ parent }: { parent: any }) => parent?.type !== 'video'
                    },
                    {
                      name: 'videoFile',
                      title: 'Or Upload Video File',
                      type: 'file',
                      options: { accept: 'video/*' },
                      hidden: ({ parent }: { parent: any }) => parent?.type !== 'video'
                    },
                    {
                      name: 'thumbnail',
                      title: 'Video Thumbnail (optional — shown in gallery grid)',
                      type: 'image',
                      options: { hotspot: true },
                      hidden: ({ parent }: { parent: any }) => parent?.type !== 'video'
                    }
                  ],
                  preview: {
                    select: {
                      type: 'type',
                      image: 'image',
                      thumbnail: 'thumbnail',
                      videoUrl: 'videoUrl'
                    },
                    prepare(selection: any) {
                      const { type, image, thumbnail, videoUrl } = selection
                      return {
                        title: type === 'video' ? `Video` : 'Image',
                        subtitle: type === 'video' ? (videoUrl || 'No URL set') : '',
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

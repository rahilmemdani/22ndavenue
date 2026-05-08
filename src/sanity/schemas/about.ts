import { defineField, defineType } from 'sanity'

export const about = defineType({
  name: 'about',
  title: 'Behind The Spotlight',
  type: 'document',
  fields: [
    defineField({
      name: 'directors',
      title: 'Directors',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'title',
              media: 'image'
            }
          }
        }
      ]
    }),
    defineField({
      name: 'story',
      title: 'Story Copy',
      type: 'array',
      of: [{ type: 'block' }]
    })
  ],
})

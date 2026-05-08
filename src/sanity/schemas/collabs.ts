import { defineField, defineType } from 'sanity'

export const collabs = defineType({
  name: 'collabs',
  title: 'Our Collabs',
  type: 'document',
  fields: [
    defineField({
      name: 'artists',
      title: 'Featured Artists / Collabs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'link', title: 'External Link', type: 'url' }
          ],
          preview: {
            select: {
              title: 'name',
              media: 'image'
            }
          }
        }
      ]
    })
  ]
})

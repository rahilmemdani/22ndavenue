import { defineField, defineType } from 'sanity'

export const footprint = defineType({
  name: 'footprint',
  title: 'Our Global Footprint',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Global Footprint Image',
      type: 'image',
      options: { hotspot: true }
    })
  ],
  preview: {
    select: {
      media: 'image'
    },
    prepare() {
      return {
        title: 'Global Footprint'
      }
    }
  }
})

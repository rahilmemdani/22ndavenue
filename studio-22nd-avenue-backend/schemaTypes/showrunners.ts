import { defineField, defineType } from 'sanity'

export const showrunners = defineType({
  name: 'showrunners',
  title: 'The Showrunners',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'The Showrunners'
    }),
    defineField({
      name: 'subCopy',
      title: 'Sub-copy',
      type: 'string',
      initialValue: 'The minds behind the hustle, who turn opportunities into success.'
    }),
    defineField({
      name: 'teamList',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'role', title: 'Role / Designation', type: 'string' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'bio', title: 'Bio / Quote (Optional)', type: 'text' }
          ],
          preview: {
            select: {
              title: 'name',
              subtitle: 'role',
              media: 'image'
            }
          }
        }
      ]
    })
  ]
})

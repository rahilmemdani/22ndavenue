import { defineField, defineType } from 'sanity'

export const stats = defineType({
  name: 'stats',
  title: 'Fact Bar Data',
  type: 'document',
  fields: [
    defineField({
      name: 'statsList',
      title: 'Stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Value (Number)', type: 'number' },
            { name: 'label', title: 'Label', type: 'string' }
          ],
          preview: {
            select: {
              title: 'label',
              subtitle: 'value'
            }
          }
        }
      ]
    })
  ]
})

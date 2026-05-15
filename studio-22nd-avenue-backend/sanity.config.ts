import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schemaTypes } from './schemaTypes/index'

export default defineConfig({
  name: 'default',
  title: '22nd Avenue Backend',

  projectId: 'p92e1pft',
  dataset: 'production',

  plugins: [structureTool()],

  schema: {
    types: schemaTypes,
  },
})

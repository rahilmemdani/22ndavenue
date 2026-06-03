import { type SchemaTypeDefinition } from 'sanity'

import { hero } from './schemas/hero'
import { about } from './schemas/about'
import { collabs } from './schemas/collabs'
import { moments } from './schemas/moments'
import { testimonials } from './schemas/testimonials'
import { services } from './schemas/services'
import { footprint } from './schemas/footprint'
import { showrunners } from './schemas/showrunners'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [hero, about, collabs, moments, testimonials, services, footprint, showrunners],
}

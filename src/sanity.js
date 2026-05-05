import { createClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: '95dcqwwt',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true
})

const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}
import { getCliClient } from 'sanity/cli'
import * as fs from 'fs'
import * as path from 'path'

// Get the authenticated CLI client
const client = getCliClient({ apiVersion: '2024-05-07' })

// Helper to determine mime type
function getMimeType(filename: string): string {
  const ext = path.extname(filename).toLowerCase()
  switch (ext) {
    case '.mov':
      return 'video/quicktime'
    case '.webm':
      return 'video/webm'
    case '.mkv':
      return 'video/x-matroska'
    case '.mp4':
    default:
      return 'video/mp4'
  }
}

async function uploadServices() {
  const directoryPath = '/Users/rahilmemdani/Desktop/22ndAvenue/Brand Collabs'
  
  if (!fs.existsSync(directoryPath)) {
    console.error(`Error: Directory not found at ${directoryPath}`)
    process.exit(1)
  }

  const allFiles = fs.readdirSync(directoryPath)
  const allowedExtensions = ['.mp4', '.mov', '.webm', '.mkv']
  const videoFiles = allFiles.filter(f => allowedExtensions.includes(path.extname(f).toLowerCase()))

  console.log(`Found ${videoFiles.length} video files to process.`)

  // 1. Fetch the published services singleton document
  console.log('Fetching services document from Sanity...')
  let doc = await client.fetch('*[_type == "services" && !(_id in path("drafts.**"))][0]')

  const targetId = 'services'
  if (!doc) {
    console.log(`No published services document found. Creating a new one with ID "${targetId}"...`)
    doc = await client.create({
      _id: targetId,
      _type: 'services',
      servicesList: [
        {
          title: 'BRAND COLLABS',
          description: 'Unforgettable brand integrations and endorsements.',
          shape: 'shapeArch',
          gallery: []
        },
        {
          title: 'LIVE EVENTS',
          description: 'Spectacular live event productions.',
          shape: 'shapeDiamond',
          gallery: []
        }
      ]
    })
  } else {
    console.log(`Found existing services document with ID: ${doc._id}`)
  }

  const servicesList = doc.servicesList || []
  
  // Find or create "BRAND COLLABS" service item
  let brandCollabsIndex = servicesList.findIndex(
    (s: any) => s.title && s.title.toUpperCase() === 'BRAND COLLABS'
  )

  if (brandCollabsIndex === -1) {
    console.log('BRAND COLLABS entry not found in servicesList. Appending a new one...')
    servicesList.push({
      title: 'BRAND COLLABS',
      description: 'Unforgettable brand integrations and endorsements.',
      shape: 'shapeArch',
      gallery: []
    })
    brandCollabsIndex = servicesList.length - 1
  }

  const targetService = servicesList[brandCollabsIndex]
  const existingGallery = targetService.gallery || []
  const newGallery = [...existingGallery]
  let updatedCount = 0

  const generateKey = () => Math.random().toString(36).substring(2, 11)

  // 2. Upload each file and update/append in the gallery array
  for (const filename of videoFiles) {
    // Check if video already exists in the gallery
    const exists = existingGallery.some(
      (item: any) => item.videoUrl && item.videoUrl.includes(encodeURIComponent(filename))
    )

    if (exists) {
      console.log(`[Skip] Video "${filename}" already exists in gallery.`)
      continue
    }

    const filePath = path.join(directoryPath, filename)
    const mimeType = getMimeType(filename)
    console.log(`[Upload] Uploading ${filename} to Sanity...`)

    try {
      const fileStream = fs.createReadStream(filePath)
      const asset = await client.assets.upload('file', fileStream, {
        filename: filename,
        contentType: mimeType
      })

      console.log(`[Success] Uploaded ${filename} -> Asset URL: ${asset.url}`)

      // Add to services gallery
      newGallery.push({
        _key: generateKey(),
        type: 'video',
        videoUrl: asset.url
      })
      updatedCount++
    } catch (err: any) {
      console.error(`[Error] Failed to upload ${filename}:`, err.message || err)
    }
  }

  // 3. Save the document if changes were made
  if (updatedCount > 0) {
    targetService.gallery = newGallery
    
    const publishedId = doc._id.replace(/^drafts\./, '')
    console.log(`Saving services document with ${updatedCount} new gallery items to published ID "${publishedId}"...`)
    await client
      .patch(publishedId)
      .set({ servicesList })
      .commit()

    // Also update draft if it exists so they stay in sync
    const draftId = `drafts.${publishedId}`
    const draftExists = await client.fetch(`defined(*[_id == "${draftId}"][0])`)
    if (draftExists) {
      console.log(`Draft document "${draftId}" found. Updating draft to match...`)
      await client
        .patch(draftId)
        .set({ servicesList })
        .commit()
    }
    console.log('Successfully updated services gallery in Sanity!')
  } else {
    console.log('No new gallery items to add.')
  }
}

uploadServices().catch(err => {
  console.error('Migration failed:', err)
  process.exit(1)
})

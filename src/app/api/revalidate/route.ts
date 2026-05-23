import { revalidatePath } from 'next/cache'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const urlSecret = searchParams.get('secret')
    const secret = process.env.SANITY_REVALIDATE_SECRET

    // 1. Allow bypass via query parameter token (very helpful for testing or alternative setups)
    if (urlSecret && secret && urlSecret === secret) {
      revalidatePath('/')
      console.log('[Revalidate] Successfully revalidated homepage via query parameter secret verification.')
      return NextResponse.json({ revalidated: true, method: 'token', now: Date.now() })
    }

    // 2. Otherwise use the standard, secure webhook signature verification
    if (!secret) {
      // In development, if no secret is configured, let's allow it so they can easily test
      if (process.env.NODE_ENV === 'development') {
        console.warn('[Revalidate] SANITY_REVALIDATE_SECRET environment variable is missing. Bypassing validation in development.')
        revalidatePath('/')
        return NextResponse.json({ revalidated: true, devMode: true })
      }
      
      console.error('[Revalidate] SANITY_REVALIDATE_SECRET environment variable is missing.')
      return new Response('Configuration Error: SANITY_REVALIDATE_SECRET is missing', { status: 500 })
    }

    const { isValidSignature, body } = await parseBody<{ _type?: string }>(
      request,
      secret
    )

    if (!isValidSignature) {
      const message = 'Invalid signature'
      console.warn(`[Revalidate] ${message}`)
      return new Response(JSON.stringify({ message, isValidSignature }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    if (!body?._type) {
      return new Response('Bad Request: Missing body or _type', { status: 400 })
    }

    // Revalidate the main landing page and layout
    revalidatePath('/')
    
    console.log(`[Revalidate] Successfully revalidated page for type: ${body._type}`)
    return NextResponse.json({ revalidated: true, method: 'signature', now: Date.now(), type: body._type })
  } catch (err: any) {
    console.error('[Revalidate] Error processing webhook:', err)
    return new Response(`Error: ${err.message}`, { status: 500 })
  }
}

// Support GET requests in development mode to make it easy to trigger manual revalidation from a browser
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const urlSecret = searchParams.get('secret')
  const secret = process.env.SANITY_REVALIDATE_SECRET

  if (process.env.NODE_ENV === 'development' || (secret && urlSecret === secret)) {
    revalidatePath('/')
    console.log('[Revalidate] Successfully revalidated homepage via GET request.')
    return NextResponse.json({ revalidated: true, method: 'GET', now: Date.now() })
  }

  return new Response('Unauthorized', { status: 401 })
}

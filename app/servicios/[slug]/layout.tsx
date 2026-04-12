import type { Metadata } from 'next'
import type { ReactNode } from 'react'
import { createClient } from '@supabase/supabase-js'

type SegmentParams = Promise<{ slug: string }>

type LayoutProps = {
  children: ReactNode
}

type MetadataProps = {
  params: SegmentParams
}

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tazzky.com'

async function getGigMetadata(slug: string) {
  if (!supabaseUrl || !supabaseAnonKey) return null

  const client = createClient(supabaseUrl, supabaseAnonKey)
  const { data } = await client
    .from('gigs')
    .select('slug, title, description, cover_image')
    .eq('slug', slug)
    .maybeSingle()

  return data
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const resolvedParams = await params
  const slug = resolvedParams.slug
  const gig = await getGigMetadata(slug)

  const serviceUrl = `${siteUrl}/servicios/${slug}`
  const title = gig?.title ? `${gig.title} | TAZZKY` : 'Servicio | TAZZKY'
  const description = gig?.description?.trim() || 'Explora este servicio en TAZZKY y completa tu contratación de forma segura.'

  if (!gig?.cover_image) {
    return {
      title,
      description,
      alternates: {
        canonical: serviceUrl,
      },
      openGraph: {
        title,
        description,
        url: serviceUrl,
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title,
        description,
      },
    }
  }

  return {
    title,
    description,
    alternates: {
      canonical: serviceUrl,
    },
    openGraph: {
      title,
      description,
      url: serviceUrl,
      type: 'website',
      images: [
        {
          url: gig.cover_image,
          alt: gig.title || 'Servicio TAZZKY',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [gig.cover_image],
    },
  }
}

export default function GigDetailLayout({ children }: LayoutProps) {
  return children
}

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { use, useEffect, useMemo, useRef, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, Clock3, ArrowLeft, Link2, MessageCircle, Twitter, X } from 'lucide-react'
import { Poppins } from 'next/font/google'
import { isSupabaseConfigured, supabase } from '@/src/lib/supabase'
import { Footer } from '@/src/components/layout'
import { formatCurrencyAmount, normalizeCurrency, type SupportedCurrency } from '@/src/lib/currency'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600'],
})

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

interface GalleryImage {
  id: string
  image_url: string
}

interface PortfolioItem {
  id: string
  title: string
  description: string | null
  image_url: string
  work_date: string | null
  price_range: string | null
  duration: string | null
}

interface PackageItem {
  id: string
  type: string
  description: string
  price: number
  currency: string | null
  delivery_days: number
  features?: unknown
}

interface ProData {
  id: string
  full_name: string
  avatar_url: string | null
  is_top_talent: boolean
  is_verified: boolean
  location: string | null
  languages: string | null
  bio: string | null
}

interface GigDetailData {
  id: string
  slug: string
  title: string
  description: string
  cover_image: string | null
  marketplace_pros: ProData | ProData[] | null
  packages: PackageItem[] | PackageItem[] | null
  gig_gallery: GalleryImage[] | GalleryImage[] | null
  portfolio_items: PortfolioItem[] | PortfolioItem[] | null
}

interface NormalizedPackage {
  id: string
  type: string
  description: string
  price: number
  currency: SupportedCurrency
  delivery_days: number
  features: string[]
}

interface GigDetailView {
  id: string
  slug: string
  title: string
  description: string
  cover_image: string | null
  pro: ProData | null
  packages: NormalizedPackage[]
  galleryImages: string[]
  portfolioItems: PortfolioItem[]
}

type LightboxGallery = 'gig' | 'portfolio'

interface LightboxState {
  isOpen: boolean
  gallery: LightboxGallery
  index: number
}

function normalizeFeatureList(features: unknown): string[] {
  if (!Array.isArray(features)) return []

  return features
    .map((feature) => String(feature).trim())
    .filter(Boolean)
}

function normalizeGigDetail(data: GigDetailData): GigDetailView {
  const pro = Array.isArray(data.marketplace_pros) ? data.marketplace_pros[0] ?? null : data.marketplace_pros
  const packages = Array.isArray(data.packages) ? data.packages : []
  const gallery = Array.isArray(data.gig_gallery) ? data.gig_gallery : []
  const portfolioItems = Array.isArray(data.portfolio_items) ? data.portfolio_items : []

  return {
    id: data.id,
    slug: data.slug,
    title: data.title,
    description: data.description,
    cover_image: data.cover_image,
    pro,
    packages: packages.map((item) => ({
      id: item.id,
      type: item.type,
      description: item.description,
      price: Number(item.price),
      currency: normalizeCurrency(item.currency),
      delivery_days: Number(item.delivery_days),
      features: normalizeFeatureList(item.features),
    })),
    galleryImages: gallery.map((item) => item.image_url).filter(Boolean),
    portfolioItems,
  }
}

function formatPortfolioDate(workDate: string | null): string {
  if (!workDate) return 'Fecha no especificada'

  const parsedDate = new Date(workDate)
  if (Number.isNaN(parsedDate.getTime())) {
    return workDate
  }

  const monthYear = new Intl.DateTimeFormat('es-MX', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(parsedDate)

  return monthYear.charAt(0).toUpperCase() + monthYear.slice(1)
}

function formatPortfolioDuration(duration: string | null): string {
  if (!duration) return 'No especificado'

  const trimmed = duration.trim()
  if (!trimmed) return 'No especificado'

  if (/[a-zA-Z]/.test(trimmed)) {
    return trimmed
  }

  return `${trimmed} días`
}

export default function GigDetailPage({ params }: PageProps) {
  const resolvedParams = use(params)
  const slug = resolvedParams.slug
  const [gig, setGig] = useState<GigDetailView | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [activePackageIndex, setActivePackageIndex] = useState(0)
  const [selectedPortfolioIndex, setSelectedPortfolioIndex] = useState(0)
  const [linkCopied, setLinkCopied] = useState(false)
  const [isShareModalOpen, setIsShareModalOpen] = useState(false)
  const [lightbox, setLightbox] = useState<LightboxState>({
    isOpen: false,
    gallery: 'gig',
    index: 0,
  })
  const touchStartX = useRef<number | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchGig = async () => {
      setLoading(true)
      setError(null)
      setGig(null)
      setActiveImageIndex(0)
      setActivePackageIndex(0)
      setSelectedPortfolioIndex(0)

      if (!isSupabaseConfigured || !supabase) {
        setError('No se pudo conectar con Supabase.')
        setLoading(false)
        return
      }

      const client = supabase
      let data: unknown = null
      let fetchError: { message?: string } | null = null

      const primaryResult = await client
        .from('gigs')
        .select(`
          id,
          slug,
          title,
          description,
          cover_image,
          marketplace_pros(id, full_name, avatar_url, is_top_talent, is_verified, location, languages, bio),
          packages(id, type, description, price, currency, delivery_days, features),
          gig_gallery(id, image_url),
          portfolio_items(id, title, description, image_url, work_date, price_range, duration)
        `)
        .eq('slug', slug)
        .maybeSingle()

      data = primaryResult.data
      fetchError = primaryResult.error

      if (fetchError?.message?.toLowerCase().includes('features')) {
        const fallbackResult = await client
          .from('gigs')
          .select(`
            id,
            slug,
            title,
            description,
            cover_image,
            marketplace_pros(id, full_name, avatar_url, is_top_talent, is_verified, location, languages, bio),
              packages(id, type, description, price, currency, delivery_days),
            gig_gallery(id, image_url),
            portfolio_items(id, title, description, image_url, work_date, price_range, duration)
          `)
          .eq('slug', slug)
          .maybeSingle()

        data = fallbackResult.data
        fetchError = fallbackResult.error
      }

      if (!isMounted) return

      if (fetchError) {
        setError(fetchError.message ?? 'Ocurrio un error al cargar este servicio.')
        setLoading(false)
        return
      }

      if (!data) {
        setError('No encontramos este servicio.')
        setLoading(false)
        return
      }

      setGig(normalizeGigDetail(data as GigDetailData))
      setLoading(false)
    }

    fetchGig()

    return () => {
      isMounted = false
    }
  }, [slug])

  const galleryImages = useMemo(() => {
    if (!gig) return []

    const allImages = [gig.cover_image, ...gig.galleryImages].filter(Boolean) as string[]
    return allImages.length > 0 ? allImages : []
  }, [gig])

  const selectedPackage = useMemo(() => {
    if (!gig || gig.packages.length === 0) return null
    return gig.packages[Math.min(activePackageIndex, gig.packages.length - 1)]
  }, [gig, activePackageIndex])

  const selectedPortfolioItem = useMemo(() => {
    if (!gig || gig.portfolioItems.length === 0) return null
    return gig.portfolioItems[Math.min(selectedPortfolioIndex, gig.portfolioItems.length - 1)]
  }, [gig, selectedPortfolioIndex])

  const portfolioThumbnailItems = useMemo(() => {
    if (!gig || gig.portfolioItems.length === 0) return []

    return gig.portfolioItems
      .map((item, index) => ({ item, index }))
      .filter(({ index }) => index !== selectedPortfolioIndex)
  }, [gig, selectedPortfolioIndex])

  const portfolioImages = useMemo(() => {
    if (!gig) return []
    return gig.portfolioItems.map((item) => item.image_url).filter(Boolean)
  }, [gig])

  const lightboxImages = useMemo(() => {
    if (lightbox.gallery === 'gig') return galleryImages
    return portfolioImages
  }, [lightbox.gallery, galleryImages, portfolioImages])

  const currentLightboxImage = useMemo(() => {
    if (!lightbox.isOpen || lightboxImages.length === 0) return null
    return lightboxImages[Math.min(lightbox.index, lightboxImages.length - 1)]
  }, [lightbox, lightboxImages])

  const contractUrl = useMemo(() => {
    if (!gig || !selectedPackage) return '#'

    const params = new URLSearchParams({
      gig: gig.title,
      package: selectedPackage.type,
      price: selectedPackage.price.toFixed(0),
      currency: selectedPackage.currency,
      pro: gig.pro?.full_name ?? 'Profesional TAZZKY',
      slug: gig.slug,
    })

    return `/agradecimiento?${params.toString()}`
  }, [gig, selectedPackage])

  const serviceUrl = useMemo(() => {
    if (!gig) return 'https://tazzky.com/servicios'
    if (typeof window !== 'undefined') return window.location.href
    return `https://tazzky.com/servicios/${gig.slug}`
  }, [gig])

  const shareText = useMemo(() => {
    if (!gig || !selectedPackage) return 'Mira este servicio en TAZZKY'
    return `Mira este servicio en TAZZKY: ${gig.title} (${selectedPackage.type})`
  }, [gig, selectedPackage])

  const openSharePopup = (url: string) => {
    if (typeof window === 'undefined') return
    window.open(url, '_blank', 'noopener,noreferrer,width=620,height=720')
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(serviceUrl)
      setLinkCopied(true)
      window.setTimeout(() => setLinkCopied(false), 1600)
    } catch {
      setLinkCopied(false)
    }
  }

  const openLightbox = (gallery: LightboxGallery, index: number) => {
    const images = gallery === 'gig' ? galleryImages : portfolioImages
    if (images.length === 0) return

    setLightbox({
      isOpen: true,
      gallery,
      index: Math.max(0, Math.min(index, images.length - 1)),
    })
  }

  const closeLightbox = () => {
    setLightbox((current) => ({ ...current, isOpen: false }))
  }

  const goToPrevLightboxImage = () => {
    setLightbox((current) => {
      if (!current.isOpen || lightboxImages.length === 0) return current
      return {
        ...current,
        index: current.index === 0 ? lightboxImages.length - 1 : current.index - 1,
      }
    })
  }

  const goToNextLightboxImage = () => {
    setLightbox((current) => {
      if (!current.isOpen || lightboxImages.length === 0) return current
      return {
        ...current,
        index: current.index === lightboxImages.length - 1 ? 0 : current.index + 1,
      }
    })
  }

  useEffect(() => {
    if (!lightbox.isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        closeLightbox()
      }

      if (event.key === 'ArrowLeft') {
        goToPrevLightboxImage()
      }

      if (event.key === 'ArrowRight') {
        goToNextLightboxImage()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [lightbox.isOpen, lightboxImages.length])

  const goToPrevImage = () => {
    if (galleryImages.length === 0) return
    setActiveImageIndex((current) => (current === 0 ? galleryImages.length - 1 : current - 1))
  }

  const goToNextImage = () => {
    if (galleryImages.length === 0) return
    setActiveImageIndex((current) => (current === galleryImages.length - 1 ? 0 : current + 1))
  }

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]?.clientX ?? null
  }

  const handleTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return

    const touchEndX = event.changedTouches[0]?.clientX ?? touchStartX.current
    const deltaX = touchStartX.current - touchEndX
    const swipeThreshold = 40

    if (Math.abs(deltaX) > swipeThreshold) {
      if (deltaX > 0) {
        goToNextImage()
      } else {
        goToPrevImage()
      }
    }

    touchStartX.current = null
  }

  const pageTitle = gig?.title ? `${gig.title} | TAZZKY` : 'Detalle del Gig | TAZZKY'

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  return (
    <main className="min-h-dvh w-full bg-black text-white">
      <div className="mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <Link
          href="/servicios"
          className={`${poppins.className} inline-flex items-center gap-2 text-sm font-semibold text-zinc-300 transition-colors hover:text-[#E2E66B]`}
        >
          <span aria-hidden="true">←</span>
          <span>Volver a servicios</span>
        </Link>
      </div>

      {loading ? (
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="space-y-5">
              <div className="animate-pulse overflow-hidden rounded-2xl border border-zinc-800 bg-[#121212]">
                <div className="aspect-[16/9] bg-zinc-900" />
              </div>
              <div className="animate-pulse space-y-4 rounded-2xl border border-zinc-800 bg-[#121212] p-6">
                <div className="h-8 w-2/3 rounded bg-zinc-800" />
                <div className="h-4 w-1/3 rounded bg-zinc-800" />
                <div className="h-24 rounded bg-zinc-800" />
              </div>
            </div>
            <div className="animate-pulse rounded-2xl border border-zinc-800 bg-[#121212] p-5">
              <div className="h-8 w-1/2 rounded bg-zinc-800" />
              <div className="mt-4 h-48 rounded bg-zinc-800" />
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="mx-auto w-full max-w-3xl px-4 pb-12 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-red-500/40 bg-red-500/10 p-6 text-center text-red-200">
            <h1 className="text-2xl font-bold text-white">Servicio no disponible</h1>
            <p className="mt-2 text-sm text-red-200">{error}</p>
            <Link
              href="/servicios"
              className="mt-6 inline-flex rounded-full bg-lime-300 px-5 py-2.5 text-sm font-bold text-black transition hover:bg-lime-200"
            >
              Volver al marketplace
            </Link>
          </div>
        </div>
      ) : gig ? (
        <>
        <div className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 sm:pb-14 lg:px-8">
          <div className="grid gap-6 sm:gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0 space-y-6 sm:space-y-8">
              <section>
                <div className="grid gap-4 lg:grid-cols-[100px_minmax(0,1fr)]">
                  <div className="hidden lg:flex lg:flex-col lg:gap-3">
                    {galleryImages.length > 0 ? (
                      galleryImages.map((imageUrl, index) => (
                        <button
                          key={`${imageUrl}-${index}`}
                          type="button"
                          onClick={() => {
                            setActiveImageIndex(index)
                            openLightbox('gig', index)
                          }}
                          className={`relative aspect-[4/3] overflow-hidden rounded-2xl border transition ${
                            activeImageIndex === index ? 'border-lime-300 ring-2 ring-lime-300/30' : 'border-zinc-800'
                          }`}
                        >
                          <img src={imageUrl} alt={`Miniatura ${index + 1}`} className="h-full w-full object-cover" />
                        </button>
                      ))
                    ) : (
                      <div className="rounded-2xl border border-zinc-800 bg-black px-2 py-3 text-center text-[10px] uppercase tracking-[0.12em] text-zinc-500">
                        Sin miniaturas
                      </div>
                    )}
                  </div>

                  <div className="min-w-0 space-y-3">
                    <div
                      className="relative overflow-hidden rounded-3xl border border-zinc-800 bg-black sm:rounded-[28px]"
                      onTouchStart={handleTouchStart}
                      onTouchEnd={handleTouchEnd}
                    >
                      <div className="aspect-[4/3] w-full bg-black sm:aspect-[16/10]">
                        {galleryImages.length > 0 ? (
                          <button
                            type="button"
                            onClick={() => openLightbox('gig', activeImageIndex)}
                            className="h-full w-full cursor-zoom-in"
                            aria-label="Abrir imagen en pantalla completa"
                          >
                            <img
                              src={galleryImages[activeImageIndex]}
                              alt={`${gig.title} imagen ${activeImageIndex + 1}`}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-sm text-zinc-500">
                            No hay imagen disponible
                          </div>
                        )}
                      </div>

                      {galleryImages.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={goToPrevImage}
                            aria-label="Imagen anterior"
                            className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-1.5 text-white backdrop-blur transition hover:bg-black sm:left-3 sm:p-2"
                          >
                            <ChevronLeft size={16} className="sm:h-[18px] sm:w-[18px]" />
                          </button>
                          <button
                            type="button"
                            onClick={goToNextImage}
                            aria-label="Siguiente imagen"
                            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/70 p-1.5 text-white backdrop-blur transition hover:bg-black sm:right-3 sm:p-2"
                          >
                            <ChevronRight size={16} className="sm:h-[18px] sm:w-[18px]" />
                          </button>
                        </>
                      )}
                    </div>

                    {galleryImages.length > 1 && (
                      <div className="flex gap-3 overflow-x-auto lg:hidden">
                        {galleryImages.map((imageUrl, index) => (
                          <button
                            key={`${imageUrl}-${index}`}
                            type="button"
                            onClick={() => {
                              setActiveImageIndex(index)
                              openLightbox('gig', index)
                            }}
                            className={`relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-xl border transition ${
                              activeImageIndex === index ? 'border-lime-300 ring-2 ring-lime-300/30' : 'border-zinc-800'
                            }`}
                          >
                            <img src={imageUrl} alt={`Miniatura ${index + 1}`} className="h-full w-full object-cover" />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </section>

              <section>
                <div className="flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3">
                    {gig.pro?.avatar_url ? (
                      <img
                        src={gig.pro.avatar_url}
                        alt={gig.pro.full_name}
                        className="h-12 w-12 rounded-full border border-zinc-700 object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-full border border-zinc-700 bg-zinc-900" />
                    )}

                    <div className="min-w-0 space-y-1">
                      <div className="truncate text-base font-bold text-white sm:text-lg">{gig.pro?.full_name ?? 'Profesional TAZZKY'}</div>
                      {gig.pro?.is_verified && (
                        <div className="inline-flex items-center gap-1 text-xs font-semibold text-lime-200">
                          Profesional verificado
                          <Image
                            src="/images/verificacion.svg"
                            alt="Verificado"
                            width={14}
                            height={14}
                            className="h-3.5 w-3.5 object-contain"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {gig.pro?.is_top_talent && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#FFD700] to-[#402C19] px-2 py-1 text-[11px] font-bold uppercase text-white sm:px-3 sm:text-xs">
                      Top Talent
                      <Image
                        src="/images/icontrofeo.svg"
                        alt="Icono trofeo"
                        width={12}
                        height={12}
                        className="h-3 w-3 object-contain sm:h-3.5 sm:w-3.5"
                      />
                    </span>
                  )}
                </div>
              </section>

              <section className="space-y-4">
                <h2 className="text-xl font-bold text-white sm:text-2xl">Sobre el profesional</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-zinc-800 bg-[#0b0b0b] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Ubicación</p>
                    <p className="mt-2 text-sm font-semibold text-lime-300">{gig.pro?.location?.trim() || 'No especificada'}</p>
                  </div>

                  <div className="rounded-2xl border border-zinc-800 bg-[#0b0b0b] p-4">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Idiomas</p>
                    <p className="mt-2 text-sm font-semibold text-lime-300">{gig.pro?.languages?.trim() || 'No especificados'}</p>
                  </div>
                </div>

                <p className="max-w-4xl text-sm leading-7 text-zinc-300 sm:text-base">
                  {gig.pro?.bio?.trim() || 'Este profesional todavía no ha agregado una biografía.'}
                </p>
              </section>

              <section className="space-y-4 rounded-[28px] border border-zinc-800 bg-[#121212] p-4 sm:p-7">
                <h2 className="text-xl font-bold text-white sm:text-2xl">Acerca de este servicio</h2>
                <h1 className="text-xl font-extrabold tracking-tight text-white sm:text-4xl">{gig.title}</h1>
                <p className="max-w-4xl text-sm leading-7 text-zinc-300 sm:text-base">{gig.description}</p>
              </section>

              <section className="space-y-5 rounded-[28px] border border-zinc-800 bg-[#121212] p-4 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <h2 className="text-lg font-bold text-white sm:text-2xl">Mi portafolio de trabajos</h2>
                  <span className="rounded-full border border-zinc-800 bg-black px-2.5 py-1 text-[11px] font-semibold text-zinc-400 sm:px-3 sm:text-xs">
                    {gig.portfolioItems.length} trabajo(s)
                  </span>
                </div>

                {gig.portfolioItems.length > 0 ? (
                  selectedPortfolioItem ? (
                    <div className="space-y-4">
                      <article className="grid gap-4 sm:gap-5 md:grid-cols-[320px_minmax(0,1fr)] lg:grid-cols-[360px_minmax(0,1fr)]">
                        <div>
                          <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-900">
                            <button
                              type="button"
                              onClick={() => openLightbox('portfolio', selectedPortfolioIndex)}
                              className="h-full w-full cursor-zoom-in"
                              aria-label="Abrir imagen del portfolio en pantalla completa"
                            >
                              <img src={selectedPortfolioItem.image_url} alt={selectedPortfolioItem.title} className="h-full w-full object-cover" />
                            </button>
                          </div>
                        </div>

                        <div className="min-w-0 space-y-5">
                          <div className="text-sm font-semibold text-zinc-500">{formatPortfolioDate(selectedPortfolioItem.work_date)}</div>

                          <h3 className="text-lg font-bold text-white sm:text-2xl">{selectedPortfolioItem.title}</h3>

                          {selectedPortfolioItem.description && (
                            <p className="w-full break-words text-sm leading-7 text-zinc-300 sm:text-base">{selectedPortfolioItem.description}</p>
                          )}

                          <div className="grid gap-4 pt-2 sm:grid-cols-2">
                            <div className="space-y-1">
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Rango de precios</p>
                              <p className="text-lg font-bold text-lime-300">{selectedPortfolioItem.price_range ?? 'No especificado'}</p>
                            </div>
                            <div className="space-y-1">
                              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-zinc-500">Duración</p>
                              <p className="text-lg font-bold text-lime-300">{formatPortfolioDuration(selectedPortfolioItem.duration)}</p>
                            </div>
                          </div>
                        </div>
                      </article>

                      <div className="space-y-2">
                        <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">Otros trabajos</p>
                        {portfolioThumbnailItems.length > 0 ? (
                          <div className="flex gap-2 overflow-x-auto">
                            {portfolioThumbnailItems.map(({ item, index }) => (
                              <button
                                key={item.id}
                                type="button"
                                onClick={() => {
                                  setSelectedPortfolioIndex(index)
                                  openLightbox('portfolio', index)
                                }}
                                className="h-14 w-16 flex-shrink-0 overflow-hidden rounded-xl border border-zinc-700 transition hover:border-lime-300/70 sm:h-16 sm:w-20"
                              >
                                <img src={item.image_url} alt={item.title} className="h-full w-full object-cover" />
                              </button>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-zinc-500">No hay más trabajos para mostrar.</p>
                        )}
                      </div>
                    </div>
                  ) : null
                ) : (
                  <div className="py-6 text-center text-sm text-zinc-500">
                    Este profesional todavía no tiene trabajos de portfolio registrados.
                  </div>
                )}
              </section>
            </div>

            <aside className="min-w-0 space-y-4 lg:sticky lg:top-6 lg:self-start">
              <section className="rounded-[28px] border border-zinc-800 bg-[#121212] p-4 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] sm:p-5 lg:translate-y-0">
                <div className="mb-4 flex flex-row flex-nowrap gap-2 overflow-x-auto whitespace-nowrap custom-scrollbar touch-pan-x pb-1 pr-1">
                  {gig.packages.map((pkg, index) => {
                    const isActive = index === activePackageIndex
                    return (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => setActivePackageIndex(index)}
                        className={`flex-shrink-0 whitespace-nowrap rounded-full border px-4 py-2 text-xs font-semibold transition ${
                          isActive
                            ? 'bg-lime-300 text-black'
                            : 'border-zinc-800 bg-black text-zinc-300 hover:border-lime-300/40 hover:text-white'
                        }`}
                      >
                        {pkg.type}
                      </button>
                    )
                  })}
                </div>

                {selectedPackage ? (
                  <div className="space-y-5 rounded-[24px] border border-zinc-800 bg-black p-4 sm:p-5">
                    <div className="space-y-1">
                      <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">Precio</p>
                      <div className="text-3xl font-black tracking-tight text-white sm:text-4xl">{formatCurrencyAmount(selectedPackage.price, selectedPackage.currency, true)}</div>
                    </div>

                    <div className="space-y-4 text-sm text-zinc-300">
                      <p className="leading-6 text-zinc-400">{selectedPackage.description}</p>

                      <div className="flex items-center gap-2 rounded-2xl border border-zinc-800 bg-[#0b0b0b] px-3 py-3">
                        <Clock3 size={16} className="text-lime-300" />
                        <span>
                          Tiempo de entrega: <strong className="text-white">{selectedPackage.delivery_days} días</strong>
                        </span>
                      </div>

                      <div className="space-y-3">
                        <p className="text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500">¿Qué incluye?</p>
                        <ul className="space-y-2">
                          {selectedPackage.features.length > 0 ? (
                            selectedPackage.features.map((feature, index) => (
                              <li key={`${selectedPackage.id}-${index}`} className="flex items-start gap-2 text-sm text-zinc-300">
                                <Check size={16} className="mt-0.5 flex-shrink-0 text-lime-300" />
                                <span className="break-words">{feature}</span>
                              </li>
                            ))
                          ) : (
                            <li className="text-sm text-zinc-500">No se registraron inclusiones para este paquete.</li>
                          )}
                        </ul>
                      </div>
                    </div>

                    <a
                      href={contractUrl}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-lime-300 px-5 py-3.5 text-sm font-bold text-black transition hover:bg-lime-200"
                    >
                      Contratar Servicio
                      <Image
                        src="/images/flechaderecha.svg"
                        alt=""
                        aria-hidden="true"
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 object-contain"
                      />
                    </a>

                    <button
                      type="button"
                      onClick={() => setIsShareModalOpen(true)}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-zinc-700 bg-[#121212] px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-lime-300/50 hover:text-lime-200"
                    >
                      Compartir servicio
                    </button>

                    {linkCopied && (
                      <p className="text-xs font-semibold text-lime-300">Enlace copiado al portapapeles.</p>
                    )}
                  </div>
                ) : (
                  <div className="rounded-[24px] border border-zinc-800 bg-black p-4 text-sm text-zinc-500">
                    No hay paquetes disponibles para este servicio.
                  </div>
                )}
              </section>
            </aside>
          </div>

        </div>

        <Footer />

        {isShareModalOpen && (
          <div
            className="fixed inset-0 z-[80] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
            onClick={() => setIsShareModalOpen(false)}
          >
            <div
              className="w-full max-w-md rounded-2xl border border-zinc-800 bg-[#111111] p-5"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <h3 className="text-base font-bold text-white">Compartir servicio</h3>
                <button
                  type="button"
                  onClick={() => setIsShareModalOpen(false)}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-zinc-700 text-zinc-300 transition hover:border-lime-300/50 hover:text-lime-200"
                >
                  <X size={14} />
                </button>
              </div>

              <div className="rounded-xl border border-zinc-800 bg-black/70 p-3">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-zinc-500">Link del servicio</p>
                <p className="truncate text-sm text-zinc-200">{serviceUrl}</p>
              </div>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-[#121212] text-zinc-200 transition hover:border-lime-300/50 hover:text-lime-200"
                  title="Copiar enlace"
                >
                  <Link2 size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => openSharePopup(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(serviceUrl)}`)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-[#121212] text-zinc-200 transition hover:border-lime-300/50 hover:text-lime-200"
                  title="Compartir en X"
                >
                  <Twitter size={16} />
                </button>

                <button
                  type="button"
                  onClick={() => openSharePopup(`https://www.threads.net/intent/post?text=${encodeURIComponent(`${shareText} ${serviceUrl}`)}`)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-[#121212] text-zinc-200 transition hover:border-lime-300/50 hover:text-lime-200"
                  title="Compartir en Threads"
                >
                  <Image src="/images/threads.svg" alt="Threads" width={16} height={16} className="h-4 w-4 object-contain" />
                </button>

                <button
                  type="button"
                  onClick={() => openSharePopup(`https://wa.me/?text=${encodeURIComponent(`${shareText} ${serviceUrl}`)}`)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-700 bg-[#121212] text-zinc-200 transition hover:border-lime-300/50 hover:text-lime-200"
                  title="Compartir en WhatsApp"
                >
                  <MessageCircle size={16} />
                </button>
              </div>
            </div>
          </div>
        )}

        {lightbox.isOpen && currentLightboxImage && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <div
              className="relative flex h-full w-full max-w-7xl items-center justify-center"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                onClick={closeLightbox}
                className="absolute right-2 top-2 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/70 text-white transition hover:border-lime-300/50 hover:text-lime-200 sm:right-4 sm:top-4"
                aria-label="Cerrar pantalla completa"
              >
                <X size={28} />
              </button>

              {lightboxImages.length > 1 && (
                <button
                  type="button"
                  onClick={goToPrevLightboxImage}
                  className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/70 p-2 text-white transition hover:border-lime-300/50 hover:text-lime-200 sm:left-4 sm:p-3"
                  aria-label="Imagen anterior"
                >
                  <ChevronLeft size={22} className="sm:h-7 sm:w-7" />
                </button>
              )}

              <img
                src={currentLightboxImage}
                alt="Vista ampliada"
                className="max-h-[88vh] w-auto max-w-full rounded-xl object-contain"
              />

              {lightboxImages.length > 1 && (
                <button
                  type="button"
                  onClick={goToNextLightboxImage}
                  className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/20 bg-black/70 p-2 text-white transition hover:border-lime-300/50 hover:text-lime-200 sm:right-4 sm:p-3"
                  aria-label="Siguiente imagen"
                >
                  <ChevronRight size={22} className="sm:h-7 sm:w-7" />
                </button>
              )}

              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full border border-white/10 bg-black/70 px-3 py-1 text-xs font-semibold text-zinc-200 sm:bottom-5">
                {lightbox.index + 1} / {lightboxImages.length}
              </div>
            </div>
          </div>
        )}
        </>
      ) : null}
    </main>
  )
}

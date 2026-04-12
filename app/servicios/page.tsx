'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useMemo, useState } from 'react'
import { CheckCircle2 } from 'lucide-react'
import { supabase, isSupabaseConfigured } from '@/src/lib/supabase'
import { WaitlistModal } from '@/src/components/modals/WaitlistModal'
import { Footer } from '@/src/components/layout'
import { formatCurrencyAmount, normalizeCurrency, type SupportedCurrency } from '@/src/lib/currency'

type CategoryFilter = {
  slug: string
  label: string
}

type GigCardData = {
  id: string
  slug: string
  title: string
  description: string
  cover_image: string | null
  category_slug: string
  pro_full_name: string
  pro_avatar_url: string | null
  pro_is_top_talent: boolean
  pro_is_verified: boolean
  min_price: number | null
  min_currency: SupportedCurrency
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'top-talent'

const CATEGORY_FILTERS: CategoryFilter[] = [
  { slug: 'all', label: 'Todas' },
  { slug: 'diseno', label: 'Artes gráficas y diseño' },
  { slug: 'tecnologia', label: 'Programación y tecnología' },
  { slug: 'marketing', label: 'Marketing Digital' },
  { slug: 'foto-video', label: 'Video y animación' },
  { slug: 'escritura-y-traduccion', label: 'Escritura y traducción' },
  { slug: 'musica-y-audio', label: 'Música y audio' },
  { slug: 'negocios', label: 'Negocios' },
]

export default function ServiciosPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<SortOption>('default')
  const [gigs, setGigs] = useState<GigCardData[]>([])

  useEffect(() => {
    const fetchGigs = async () => {
      setLoading(true)
      setError(null)

      if (!isSupabaseConfigured || !supabase) {
        setError('No se pudo conectar con Supabase.')
        setLoading(false)
        return
      }

      const client = supabase
      const { data: gigsData, error: gigsError } = await client
        .from('gigs')
        .select('id, slug, title, description, cover_image, pro_id, category_id')

      if (gigsError) {
        setError(gigsError.message)
        setLoading(false)
        return
      }

      const baseGigs = (gigsData ?? []) as Array<{
        id: string
        slug: string
        title: string
        description: string
        cover_image: string | null
        pro_id: string | null
        category_id: string | null
      }>

      const proIds = Array.from(new Set(baseGigs.map((gig) => gig.pro_id).filter(Boolean))) as string[]
      const categoryIds = Array.from(new Set(baseGigs.map((gig) => gig.category_id).filter(Boolean))) as string[]
      const gigIds = baseGigs.map((gig) => gig.id)

      const [prosResult, categoriesResult, packagesResult] = await Promise.all([
        proIds.length > 0
          ? client
              .from('marketplace_pros')
              .select('id, full_name, avatar_url, is_top_talent, is_verified')
              .in('id', proIds)
          : Promise.resolve({ data: [], error: null }),
        categoryIds.length > 0
          ? client
              .from('service_categories')
              .select('id, slug')
              .in('id', categoryIds)
          : Promise.resolve({ data: [], error: null }),
        gigIds.length > 0
            ? client
              .from('packages')
              .select('gig_id, price, currency')
              .in('gig_id', gigIds)
          : Promise.resolve({ data: [], error: null }),
      ])

      if (prosResult.error || categoriesResult.error || packagesResult.error) {
        setError(
          prosResult.error?.message
            ?? categoriesResult.error?.message
            ?? packagesResult.error?.message
            ?? 'Ocurrio un error cargando los datos relacionados.'
        )
      }

      const prosById = new Map(
        ((prosResult.data ?? []) as Array<{
          id: string
          full_name: string
          avatar_url: string | null
          is_top_talent: boolean
          is_verified: boolean
        }>).map((pro) => [pro.id, pro])
      )

      const categoriesById = new Map(
        ((categoriesResult.data ?? []) as Array<{ id: string; slug: string }>).map((category) => [category.id, category])
      )

      const packagePricesByGigId = new Map<string, Array<{ price: number; currency: SupportedCurrency }>>()
      ;((packagesResult.data ?? []) as Array<{ gig_id: string; price: number | string | null; currency?: string | null }>).forEach((pkg) => {
        const numericPrice = Number(pkg.price)
        if (!Number.isFinite(numericPrice)) return
        const current = packagePricesByGigId.get(pkg.gig_id) ?? []
        current.push({ price: numericPrice, currency: normalizeCurrency(pkg.currency) })
        packagePricesByGigId.set(pkg.gig_id, current)
      })

      const normalized: GigCardData[] = baseGigs.map((row) => {
        const pro = row.pro_id ? prosById.get(row.pro_id) : null
        const category = row.category_id ? categoriesById.get(row.category_id) : null
        const prices = packagePricesByGigId.get(row.id) ?? []
        const cheapestPackage = prices.reduce<{ price: number; currency: SupportedCurrency } | null>((winner, candidate) => {
          if (!winner) return candidate
          return candidate.price < winner.price ? candidate : winner
        }, null)

        return {
          id: row.id,
          slug: row.slug,
          title: row.title,
          description: row.description,
          cover_image: row.cover_image ?? null,
          category_slug: category?.slug ?? 'unknown',
          pro_full_name: pro?.full_name ?? 'Profesional TAZZKY',
          pro_avatar_url: pro?.avatar_url ?? null,
          pro_is_top_talent: Boolean(pro?.is_top_talent),
          pro_is_verified: Boolean(pro?.is_verified),
          min_price: cheapestPackage?.price ?? null,
          min_currency: cheapestPackage?.currency ?? 'MXN',
        }
      })

      setGigs(normalized)
      setLoading(false)
    }

    fetchGigs()
  }, [])

  const filteredGigs = useMemo(() => {
    if (selectedCategory === 'all') return gigs
    return gigs.filter((gig) => gig.category_slug === selectedCategory)
  }, [gigs, selectedCategory])

  const displayedGigs = useMemo(() => {
    if (sortBy === 'top-talent') {
      return filteredGigs.filter((gig) => gig.pro_is_top_talent)
    }

    const sorted = [...filteredGigs]

    if (sortBy === 'price-asc') {
      sorted.sort((a, b) => (a.min_price ?? Number.MAX_SAFE_INTEGER) - (b.min_price ?? Number.MAX_SAFE_INTEGER))
    }

    if (sortBy === 'price-desc') {
      sorted.sort((a, b) => (b.min_price ?? -1) - (a.min_price ?? -1))
    }

    return sorted
  }, [filteredGigs, sortBy])

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <section className="relative mx-auto h-[360px] w-full overflow-hidden sm:h-[650px] sm:w-[1400px] sm:max-w-full">
        <Image
          src="/images/FREELANCER22NUEVO.png"
          alt="Banner principal TAZZKY"
          width={1440}
          height={610}
          className="block h-full w-full object-cover object-center sm:scale-110 sm:-translate-y-16"
          priority
        />
        <div className="absolute inset-0 bg-black/45" />

        <div className="absolute inset-0 p-4 sm:p-8 md:p-10">
          <div className="relative z-10 flex items-start justify-between">
            <Link href="/clientes" aria-label="Inicio Tazzky" className="inline-flex -mt-4 sm:-mt-5">
              <Image
                src="/footerlogo.png"
                alt="Tazzky"
                width={100}
                height={100}
                className="h-[72px] w-[72px] object-contain sm:h-[100px] sm:w-[100px]"
                priority
              />
            </Link>

            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="whitespace-nowrap rounded-full bg-white px-3 py-1.5 text-xs font-bold text-black transition-colors hover:bg-gray-100 sm:px-5 sm:py-2 sm:text-sm"
            >
              Pre-registrarme
            </button>
          </div>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-end px-4 sm:px-8 md:px-10">
            <h1 className="max-w-3xl text-right text-2xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              La ayuda que necesitas a tu alcance.
            </h1>
          </div>
        </div>
      </section>

      <section className="w-full border-y border-zinc-900 bg-black">
        <div className="no-scrollbar flex gap-2 overflow-x-auto px-4 py-3 sm:justify-center sm:px-6 lg:px-8">
          {CATEGORY_FILTERS.map((category) => {
            const active = selectedCategory === category.slug
            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => setSelectedCategory(category.slug)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                  active
                    ? 'bg-[#BADB3A] text-black'
                    : 'bg-transparent text-white hover:text-[#BADB3A]'
                }`}
              >
                {category.label}
              </button>
            )
          })}
        </div>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 pb-14 pt-8 sm:px-6 lg:px-8">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-bold text-zinc-100 sm:text-2xl">Profesionales disponibles ahora</h2>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <label htmlFor="sort-gigs" className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-400">
              Ordenar por:
            </label>
            <select
              id="sort-gigs"
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value as SortOption)}
              className="rounded-lg border border-zinc-700 bg-[#121212] px-3 py-2 text-xs font-semibold text-white outline-none transition focus:border-[#BADB3A] sm:text-sm"
            >
              <option value="default">Relevancia</option>
              <option value="price-asc">Menor precio</option>
              <option value="price-desc">Mayor precio</option>
              <option value="top-talent">Top Talent</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
            {error}
          </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <article key={index} className="animate-pulse rounded-xl border border-zinc-800 bg-[#121212] p-3">
                <div className="aspect-video rounded-lg bg-zinc-800" />
                <div className="mt-3 h-4 w-2/3 rounded bg-zinc-800" />
                <div className="mt-2 h-3 w-1/2 rounded bg-zinc-800" />
                <div className="mt-4 h-9 w-28 rounded-full bg-zinc-800" />
              </article>
            ))}
          </div>
        ) : displayedGigs.length === 0 ? (
          <div className="rounded-xl border border-zinc-800 bg-[#121212] px-4 py-10 text-center text-zinc-400">
            No hay servicios disponibles en esta categoria por ahora.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {displayedGigs.map((gig) => (
              <Link
                key={gig.id}
                href={`/servicios/${gig.slug}`}
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-zinc-800 bg-[#121212] transition hover:border-lime-300/50"
              >
                <div className="aspect-video w-full overflow-hidden rounded-t-xl bg-zinc-900">
                  {gig.cover_image ? (
                    <img
                      src={gig.cover_image}
                      alt={gig.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.03]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-zinc-500">
                      Sin imagen
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-3">
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <div className="flex min-w-0 items-center gap-2">
                      {gig.pro_avatar_url ? (
                        <img
                          src={gig.pro_avatar_url}
                          alt={gig.pro_full_name}
                          className="h-8 w-8 rounded-full border border-zinc-700 object-cover"
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full border border-zinc-700 bg-zinc-900" />
                      )}
                      <div className="min-w-0">
                        <div className="flex items-center gap-1">
                          <p className="truncate text-xs font-medium text-zinc-100">{gig.pro_full_name}</p>
                          {gig.pro_is_verified && <CheckCircle2 size={14} className="text-lime-400" />}
                        </div>
                      </div>
                    </div>

                    {gig.pro_is_top_talent && (
                      <span className="inline-flex items-center rounded-md bg-gradient-to-r from-[#FFD700] to-[#402C19] px-2 py-1 text-xs font-bold uppercase text-white">
                        Top Talent
                        <Image
                          src="/images/icontrofeo.svg"
                          alt="Icono trofeo"
                          width={12}
                          height={12}
                          className="ml-1 h-3 w-3 object-contain"
                        />
                      </span>
                    )}
                  </div>

                  <h2 className="line-clamp-2 text-base font-bold text-white">{gig.title}</h2>
                  <p className="mt-1 line-clamp-2 text-sm text-zinc-400">{gig.description}</p>

                  <div className="mt-4 flex justify-end">
                    <span className="rounded-full bg-[#A3E635] px-4 py-2 text-xs font-bold text-black sm:text-sm">
                      {gig.min_price != null ? `Desde ${formatCurrencyAmount(gig.min_price, gig.min_currency, true)}` : 'Consultar precio'}
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>

      <Footer />

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </main>
  )
}
'use client'

import Link from 'next/link'
import { Suspense, useEffect, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Footer } from '@/src/components/layout'
import { formatCurrencyAmount, normalizeCurrency } from '@/src/lib/currency'

const WHATSAPP_BASE_URL = 'https://wa.me/525661306651'

function AgradecimientoContent() {
  const searchParams = useSearchParams()

  const gig = searchParams.get('gig') ?? 'Servicio'
  const packageName = searchParams.get('package') ?? 'Paquete'
  const price = searchParams.get('price') ?? '0'
  const currency = normalizeCurrency(searchParams.get('currency'))
  const pro = searchParams.get('pro') ?? 'Profesional TAZZKY'
  const slug = searchParams.get('slug') ?? ''

  const whatsappUrl = useMemo(() => {
    const servicePath = slug ? `/servicios/${slug}` : '/servicios'
    const serviceUrl = `https://tazzky.com${servicePath}`
    const message = `¡Hola! Vengo de Tazzky. Quiero completar mi pedido:*${gig}* - Pack ${packageName} (${formatCurrencyAmount(Number(price), currency, true)}).\n\nLink del servicio: ${serviceUrl}`
    return `${WHATSAPP_BASE_URL}?text=${encodeURIComponent(message)}`
  }, [gig, packageName, price, currency, slug])

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      window.location.href = whatsappUrl
    }, 3000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [whatsappUrl])

  return (
    <main className="min-h-screen bg-[#000000] text-white">
      <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-6 sm:p-10">
          <h1 className="text-3xl font-bold text-lime-300 sm:text-4xl">¡Gracias por elegir Tazzky!</h1>

          <p className="mt-5 text-base text-zinc-200 sm:text-lg">
            Estás contratando <strong className="text-white">{gig}</strong> (<strong className="text-white">{packageName}</strong>) por{' '}
            <strong className="text-white">{formatCurrencyAmount(Number(price), currency, true)}</strong>.
          </p>

          <p className="mt-4 text-sm leading-7 text-zinc-400 sm:text-base">
            En un momento serás redirigido a WhatsApp para coordinar tu pago y los detalles de tu pedido con{' '}
            <strong className="text-zinc-200">{pro}</strong>.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={whatsappUrl}
              className="inline-flex items-center justify-center rounded-full bg-lime-300 px-6 py-3 text-sm font-bold text-black transition hover:bg-lime-200"
            >
              Ir a WhatsApp manualmente
            </a>

            <Link
              href="/servicios"
              className="inline-flex items-center justify-center rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-lime-300/50 hover:text-lime-200"
            >
              Volver al marketplace
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

export default function AgradecimientoPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#000000] text-white">
          <section className="mx-auto w-full max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
            <div className="rounded-3xl border border-zinc-800 bg-[#111111] p-6 sm:p-10">
              <p className="text-base text-zinc-200">Cargando tu resumen...</p>
            </div>
          </section>
          <Footer />
        </main>
      }
    >
      <AgradecimientoContent />
    </Suspense>
  )
}

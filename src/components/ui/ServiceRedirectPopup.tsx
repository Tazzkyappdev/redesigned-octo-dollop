'use client'

import { useState } from 'react'
import Link from 'next/link'
import { X } from 'lucide-react'

export const ServiceRedirectPopup = () => {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 right-4 z-[80] w-[calc(100%-2rem)] max-w-sm rounded-2xl border border-[#BADB3A]/50 bg-black/90 p-4 shadow-2xl backdrop-blur-sm sm:bottom-6 sm:right-6">
      <button
        type="button"
        onClick={() => setIsVisible(false)}
        className="absolute right-2 top-2 rounded-full p-1 text-zinc-300 transition hover:bg-white/10 hover:text-white"
        aria-label="Cerrar anuncio"
      >
        <X className="h-4 w-4" />
      </button>

      <p className="pr-6 text-sm font-semibold text-white sm:text-base">
        Necesitas un servicio freelance? <span className="text-[#BADB3A]">Contrata Aqui</span>
      </p>

      <Link
        href="/servicios"
        className="mt-3 inline-flex w-full items-center justify-center rounded-full bg-[#BADB3A] px-4 py-2 text-sm font-bold text-black transition hover:bg-[#d2eb7e]"
      >
        Ir a servicios
      </Link>
    </div>
  )
}
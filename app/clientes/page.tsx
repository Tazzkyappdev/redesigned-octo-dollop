'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RegistrationModal } from '../../src/components/modals'
import { WaitlistModal } from '../../src/components/modals/WaitlistModal'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../src/components/ui'
import { Briefcase } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { Footer } from '../../src/components/layout'

const chips = [
  // Digitales
  'Diseño de logos e identidad',
  'Desarrollo de sitios web',
  'Marketing en redes sociales',
  'SEO (Posicionamiento web)',
  'Edición de video',
  'Traducción y transcripción',
  // Físicos
  'Plomería',
  'Electricidad',
  'Reparación de electrodomésticos',
  'Cerrajería',
  'Jardinería y mantenimiento',
  'Limpieza del hogar'
]

export default function ClientesHome() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [chipStartIndex, setChipStartIndex] = useState(0)
  const [isSmall, setIsSmall] = useState(false)
  const [displayChipCount, setDisplayChipCount] = useState(6)
  const displayCountRef = useRef(displayChipCount)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMounted(true)
  }, [])

  // Mantener ref actualizado con el número a rotar
  useEffect(() => {
    displayCountRef.current = displayChipCount
  }, [displayChipCount])

  // Rotación automática de servicios visibles
  useEffect(() => {
    const intervalMs = isSmall ? 5000 : 4000
    const id = setInterval(() => {
      setChipStartIndex((prev) => (prev + displayCountRef.current) % chips.length)
    }, intervalMs)
    return () => clearInterval(id)
  }, [isSmall])

  // Detectar tamaño de pantalla para adaptar animación y cantidad de chips
  useEffect(() => {
    const handler = () => {
      const small = window.innerWidth < 640
      setIsSmall(small)
      setDisplayChipCount(small ? 4 : 6)
    }
    handler()
    window.addEventListener('resize', handler)
    return () => window.removeEventListener('resize', handler)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-[#FAF8F1]">
      {/* Header con mismas características */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20' : 'bg-transparent'
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Link href="/clientes" aria-label="Ir a la página de inicio de clientes">
                <Image
                  src="/Logo Principal Horizontal (3).png"
                  alt="Tazzky"
                  width={240}
                  height={75}
                  className="h-12 lg:h-16 w-auto cursor-pointer"
                  priority
                />
              </Link>
            </motion.div>

            {/* CTA con iconos de tiendas */}
            <motion.div
              className="flex items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {/* Texto a la izquierda del botón */}
              <div className="hidden sm:flex flex-col leading-tight text-gray-600 text-xs sm:text-sm text-right sm:text-left">
                <span>Próximamente en</span>
                <span className="font-semibold text-gray-900">Tuxtla Gutierrez y alrededores</span>
              </div>
              <Link href="/profesionales" className="inline-block" aria-label="Ir a la página para profesionales">
                <Button
                  variant="primary"
                  size="sm"
                  className={`flex items-center space-x-2 px-4 py-2 text-sm lg:text-base lg:px-6 lg:py-3 lg:space-x-3 transition-all duration-300 ${
                    isScrolled
                      ? 'bg-[#BADB3A] hover:bg-[#A6C032] text-white shadow-lg'
                      : 'bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm'
                  }`}
                >
                  <Briefcase className="w-4 h-4 lg:w-5 lg:h-5" />
                  <span className="font-medium">Para profesionales</span>
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Columna izquierda */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-black/5 text-gray-800 px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Calendar className="w-4 h-4 text-[#BADB3A]" />
              <span>Lanzamiento en 2025</span>
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4"
            >
              Encuentra <span className="text-[#BADB3A]">profesionales de confianza</span> en minutos
            </motion.h1>

            {/* Chips: 12 servicios principales (digitales y físicos) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mb-8"
            >
              <div className="relative h-[140px] sm:h-[164px] md:h-[176px] overflow-hidden">
                <AnimatePresence mode="wait" initial={false}>
                  {(() => {
                    const end = chipStartIndex + displayChipCount
                    const visible = end <= chips.length
                      ? chips.slice(chipStartIndex, end)
                      : [...chips.slice(chipStartIndex), ...chips.slice(0, end - chips.length)]
                    return (
                      <motion.div
                        key={chipStartIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.35 }}
                        className="absolute inset-0 grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-4"
                      >
                        {visible.map((label) => (
                          <button
                            key={label}
                            type="button"
                            className="w-full inline-flex items-center justify-center gap-2 bg-[#F5FBE5] text-[#1A1A1A] border border-[#D8EB90] px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm rounded-full font-medium"
                          >
                            <span className="inline-block w-2 h-2 rounded-full bg-[#BADB3A]" />
                            {label}
                          </button>
                        ))}
                      </motion.div>
                    )
                  })()}
                </AnimatePresence>
              </div>
            </motion.div>

            {/* CTA principal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <button
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center gap-3 bg-[#BADB3A] hover:bg-[#A6C032] text-white font-semibold px-6 py-4 rounded-full shadow-lg transition-colors"
              >
                Unirse a la lista de espera
                <span className="text-xl">→</span>
              </button>
            </motion.div>

            {/* Badges de tiendas */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center gap-3 sm:gap-4"
            >
              <img src="/images/Apple.svg" alt="App Store" className="h-10 md:h-12 w-auto" />
              <img src="/images/Google.svg" alt="Google Play" className="h-10 md:h-12 w-auto" />
            </motion.div>
          </div>

          {/* Columna derecha - Ilustración */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[520px] h-[240px] sm:h-[320px] md:h-[360px]">
              {/* Imagen principal: Programador */}
              <img
                src="/images/programador.jpg"
                alt="Programador"
                className="absolute right-0 top-0 md:right-2 md:top-2 w-1/2 sm:w-2/3 md:w-2/5 lg:w-1/2 h-auto rounded-2xl shadow-2xl object-cover border border-white transition-opacity fadeSwap delay-0"
              />
              {/* Imagen secundaria: Jardinero */}
              <img
                src="/images/jardinero.jpg"
                alt="Jardinero"
                className="hidden lg:block absolute left-0 bottom-0 md:left-2 md:bottom-2 w-2/5 sm:w-1/2 md:w-1/2 lg:w-2/3 h-auto rounded-2xl shadow-xl object-cover border border-white transition-opacity fadeSwap delay-6"
              />
              {/* Imagen terciaria: Marketing */}
              <img
                src="/images/marketing.jpg"
                alt="Marketing"
                className="hidden sm:block absolute right-0 top-0 md:right-2 md:top-2 w-1/2 sm:w-2/3 md:w-2/5 lg:w-1/2 h-auto rounded-2xl shadow-2xl object-cover border border-white transition-opacity fadeSwap delay-12"
              />
              {/* Imagen cuarta: Limpieza */}
              <img
                src="/images/limpieza.jpg"
                alt="Limpieza"
                className="absolute left-0 bottom-0 md:left-2 md:bottom-2 w-2/5 sm:w-1/2 md:w-1/2 lg:w-2/3 h-auto rounded-2xl shadow-xl object-cover border border-white transition-opacity fadeSwap delay-18 md:hidden lg:block"
              />
              <style jsx>{`
                @keyframes fadeSwap4 {
                  0% { opacity: 0; }
                  8% { opacity: 1; }
                  22% { opacity: 1; }
                  30% { opacity: 0; }
                  100% { opacity: 0; }
                }
                .fadeSwap {
                  animation-name: fadeSwap4;
                  animation-duration: 24s;
                  animation-timing-function: ease-in-out;
                  animation-iteration-count: infinite;
                  will-change: opacity;
                }
                .delay-0 { animation-delay: 0s; }
                .delay-6 { animation-delay: 6s; }
                .delay-12 { animation-delay: 12s; }
                .delay-18 { animation-delay: 18s; }
              `}</style>
            </div>
          </motion.div>
        </div>
      </main>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  )
}

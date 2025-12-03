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
import { Shield, Star, CreditCard, MessageCircle, FileText, Check, Wrench, Stethoscope, Palette, Laptop, Home, Scissors, Car, Hammer, Utensils, Dumbbell, Camera, ChevronLeft, ChevronRight, PawPrint } from 'lucide-react'

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
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const displayCountRef = useRef(displayChipCount)
  const categoriasCarouselRef = useRef<HTMLDivElement | null>(null)
  const [isCarouselHovered, setIsCarouselHovered] = useState(false)

  // Testimonials carousel state
  const [testimonialPage, setTestimonialPage] = useState(0)
  const [testimonialsHovered, setTestimonialsHovered] = useState(false)
  const testimonialItems = [
    { quote: 'Me encanta la idea: poder contratar profesionales confiables en minutos me ahorra tiempo y dolores de cabeza.', name: 'María G.', role: 'Emprendedora' },
    { quote: 'Si Tazzky facilita pagos y agenda, definitivamente lo usaré para mis proyectos del hogar.', name: 'Carlos R.', role: 'Freelancer' },
    { quote: 'Contratar con claridad de precio y opiniones reales suena perfecto para decidir rápido.', name: 'Lucía P.', role: 'Dueña de casa' },
    { quote: 'Como técnico independiente, espero poder encontrar más clientes y gestionar todo en un solo lugar.', name: 'Diego M.', role: 'Técnico independiente' },
    { quote: 'El enfoque en confianza y soporte me da seguridad para probar la plataforma.', name: 'Ana S.', role: 'Estudiante' },
    { quote: 'Poder comparar perfiles y resultados visuales haría más fácil elegir al profesional indicado.', name: 'Javier T.', role: 'Fotógrafo' },
    { quote: 'La idea de ver disponibilidad y reservar al instante me parece clave.', name: 'Valentina D.', role: 'Diseñadora' },
    { quote: 'Busco rapidez y calidad; si Tazzky asegura ambas, seré usuario frecuente.', name: 'Andrés L.', role: 'Empresario' },
    { quote: 'Me interesa poder repetir con el mismo profesional si me fue bien.', name: 'Sofía N.', role: 'Product Manager' },
    { quote: 'Que haya verificación de perfiles y garantías me transmite confianza.', name: 'Pedro C.', role: 'Arquitecto' },
    { quote: 'Si puedo chatear y acordar detalles antes de pagar, mejor aún.', name: 'Camila R.', role: 'Community Manager' },
    { quote: 'Comparar presupuestos en un mismo lugar me ahorraría mucho tiempo.', name: 'Felipe Q.', role: 'Administrador' }
  ]

  // Auto-rotate testimonials with hover pause
  useEffect(() => {
    const itemsPerPage = 3
    const totalPages = Math.ceil(testimonialItems.length / itemsPerPage)
    const id = setInterval(() => {
      if (!testimonialsHovered) {
        setTestimonialPage((p) => (p + 1) % totalPages)
      }
    }, 5000)
    return () => clearInterval(id)
  }, [testimonialsHovered, testimonialItems.length])

  // Auto-scroll carousel with hover pause
  useEffect(() => {
    const el = categoriasCarouselRef.current
    if (!el) return
    const interval = setInterval(() => {
      if (!isCarouselHovered) {
        el.scrollBy({ left: 260, behavior: 'smooth' })
      }
    }, 3500)
    return () => clearInterval(interval)
  }, [isCarouselHovered])

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

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100
      const y = (e.clientY / window.innerHeight) * 100
      setMousePosition({ x, y })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
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

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(186, 219, 58, 0.15) 0%, rgba(186, 219, 58, 0.05) 20%, transparent 50%), linear-gradient(to bottom right, #000000, #1a1a1a, #000000)`
      }}
      suppressHydrationWarning
    >
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-20 relative z-10">
        <div className="flex justify-center items-center">
          {/* Columna centrada */}
          <div className="flex flex-col items-center text-center max-w-4xl w-full">
            {/* Logo */}
            <motion.div
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src="/Logo Principal Horizontal (3).png"
                alt="Tazzky"
                width={480}
                height={150}
                className="h-24 md:h-28 lg:h-32 w-auto"
                priority
              />
            </motion.div>


            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center space-x-2 bg-[#BADB3A]/10 text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <Calendar className="w-4 h-4 text-[#BADB3A]" />
              <span>Lanzamiento en 2026</span>
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold text-white leading-tight mb-4"
            >
              Contrata servicios seguros, rápidos y verificados <span className="text-[#BADB3A]">todo en un solo lugar</span>
            </motion.h1>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-gray-300 text-lg md:text-xl leading-relaxed mb-8"
            >
              Tazzky es la forma más simple y segura de encontrar profesionales confiables para todo tipo de servicios, desde trabajos en casa hasta servicios digitales.
            </motion.p>

            {/* CTA principal */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-6"
            >
              <div className="flex flex-wrap items-center justify-center gap-3">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="inline-flex items-center justify-center gap-3 bg-[#BADB3A] hover:bg-[#A6C032] text-black font-semibold px-6 py-4 rounded-full shadow-lg transition-colors min-h-[56px] min-w-[250px]"
                >
                  Unirse a la lista de espera
                  <span className="text-xl">→</span>
                </button>
                <Link href="/profesionales" className="inline-block" aria-label="Ir a la página para profesionales">
                  <button
                    className="inline-flex items-center justify-center gap-3 bg-[#BADB3A] hover:bg-[#A6C032] text-black font-semibold px-6 py-4 rounded-full shadow-lg transition-colors min-h-[56px] min-w-[250px]"
                  >
                    <Briefcase className="w-5 h-5" />
                    <span>Únete como profesional</span>
                  </button>
                </Link>
              </div>
            </motion.div>

            {/* Badges de tiendas */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex items-center justify-center gap-3 sm:gap-4 mb-16"
            >
              <img src="/images/Apple.svg" alt="App Store" className="h-10 md:h-12 w-auto" />
              <img src="/images/Google.svg" alt="Google Play" className="h-10 md:h-12 w-auto" />
            </motion.div>

            {/* Sección ¿Qué es Tazzky? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20"
            >
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Encuentra lo que necesitas en <span className="text-[#BADB3A]">segundos</span>
              </h2>
              <p className="text-gray-300 text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-8">
                Busca por categoría o escribe directamente lo que necesitas.<br />
                Tazzky te mostrará profesionales verificados, con reseñas reales y trabajos que han hecho anteriormente.
              </p>

              {/* Chips: 12 servicios principales (digitales y físicos) */}
              <div className="relative mb-8">
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
                              className="w-full inline-flex items-center justify-center gap-2 bg-[#BADB3A]/10 text-white border border-[#BADB3A]/30 px-3 py-2 text-xs sm:px-5 sm:py-3 sm:text-sm rounded-full font-medium hover:bg-[#BADB3A] hover:text-black hover:border-[#BADB3A] transition-all duration-300"
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
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Sección ¿Qué podrías hacer en Tazzky? - Full width */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full py-16 md:py-20 bg-gradient-to-br from-[#BADB3A]/20 via-[#BADB3A]/10 to-[#BADB3A]/5 border-y border-[#BADB3A]/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-left">
            ¿Qué podrás contratar en <span className="text-[#BADB3A]">Tazzky</span>?
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { src: '/images/marketing.jpg', title: 'Marketing', delay: 0.6, task: 'Gestión de campañas' },
              { src: '/images/programador.jpg', title: 'Programación', delay: 0.7, task: 'Desarrollo de landing pages' },
              { src: '/images/mecanico.jpg', title: 'Mecánico', delay: 0.8, task: 'Mantenimiento preventivo' },
              { src: '/images/limpieza.jpg', title: 'Limpieza', delay: 0.9, task: 'Limpieza profunda' },
              { src: '/images/jardinero2.jpg', title: 'Jardinería', delay: 1.0, task: 'Podar y mantener jardines' },
              { src: '/images/diseño2.jpg', title: 'Diseño', delay: 1.1, task: 'Diseño de logos' },
              { src: '/images/electrodomesticos.jpg', title: 'Electrodomésticos', delay: 1.2, task: 'Reparación de lavadoras' },
              { src: '/images/fotografo.jpg', title: 'Fotografía', delay: 1.3, task: 'Sesión de retratos' },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: item.delay }}
                className="group relative overflow-hidden rounded-2xl border border-[#BADB3A]/30 bg-black/40 hover:bg-black/60 transition-colors duration-300"
              >
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill={false}
                    width={800}
                    height={600}
                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-300"
                    priority={idx < 4}
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />
                {/* Pestaña debajo de la imagen */}
                <div className="px-4 py-3 bg-black/80 border-t border-[#BADB3A]/30">
                  <h3 className="text-white font-semibold text-sm sm:text-base leading-tight">{item.title}</h3>
                  {(item as any).task && (
                    <p className="text-gray-300 text-xs sm:text-sm mt-1 leading-snug">{(item as any).task}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full py-16 md:py-20 bg-black/50 border-y border-[#BADB3A]/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12 text-left">
            Vea lo que piensan nuestros futuros usuarios sobre <span className="text-[#BADB3A]">Tazzky</span>
          </h2>

          {(() => {
            const itemsPerPage = 3
            const totalPages = Math.ceil(testimonialItems.length / itemsPerPage)
            const visible = Array.from({ length: itemsPerPage }, (_, i) =>
              testimonialItems[(testimonialPage * itemsPerPage + i) % testimonialItems.length]
            )
            return (
              <div
                onMouseEnter={() => setTestimonialsHovered(true)}
                onMouseLeave={() => setTestimonialsHovered(false)}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`testimonials-page-${testimonialPage}`}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -40 }}
                    transition={{ duration: 0.45 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  >
                    {visible.map((t, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 * idx }}
                        className="rounded-2xl border border-[#BADB3A]/30 bg-black/60 p-6 h-full flex flex-col"
                      >
                        <div className="text-[#BADB3A] text-lg leading-none mb-3">★★★★★</div>
                        <p className="text-gray-200 leading-relaxed">“{t.quote}”</p>
                        <div className="mt-5 flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-[#BADB3A]/20 border border-[#BADB3A]/40 flex items-center justify-center text-[#BADB3A] font-semibold">
                            {t.name.split(' ').map(w => w[0]).join('')}
                          </div>
                          <div>
                            <div className="text-white font-medium">{t.name}</div>
                            <div className="text-gray-400 text-sm">{t.role}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
                <div className="flex items-center justify-end gap-3 mt-6">
                  <button
                    type="button"
                    aria-label="Anterior"
                    onClick={() => setTestimonialPage((p) => (p - 1 + totalPages) % totalPages)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#BADB3A]/40 text-[#BADB3A] hover:bg-[#BADB3A] hover:text-black transition"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-2 w-2 rounded-full ${i === testimonialPage ? 'bg-[#BADB3A]' : 'bg-[#BADB3A]/30'}`}
                      />
                    ))}
                  </div>
                  <button
                    type="button"
                    aria-label="Siguiente"
                    onClick={() => setTestimonialPage((p) => (p + 1) % totalPages)}
                    className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-[#BADB3A]/40 text-[#BADB3A] hover:bg-[#BADB3A] hover:text-black transition"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )
          })()}
        </div>
      </motion.div>

      {/* Sección Su satisfacción, garantizada */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="w-full py-16 md:py-20 bg-gradient-to-br from-[#BADB3A]/15 via-[#BADB3A]/10 to-transparent border-y border-[#BADB3A]/30"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-10 text-left">
            Su satisfacción,  <span className="text-[#BADB3A]">garantizada</span>
          </h2>
          <p className="text-gray-300 max-w-3xl mb-10">
            Diseñamos Tazzky para que contratar sea simple, seguro y con resultados de calidad.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="rounded-2xl border border-[#BADB3A]/30 bg-black/60 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#BADB3A]/15 border border-[#BADB3A]/30 flex items-center justify-center text-[#BADB3A]">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Profesionales verificados</h3>
                  <p className="text-gray-300 mt-1">Perfiles con historial, valoraciones y verificación para tu tranquilidad.</p>
                </div>
              </div>
            </motion.div>
            

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="rounded-2xl border border-[#BADB3A]/30 bg-black/60 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#BADB3A]/15 border border-[#BADB3A]/30 flex items-center justify-center text-[#BADB3A]">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Compromiso de felicidad</h3>
                  <p className="text-gray-300 mt-1">Si no está satisfecho, trabajaremos para solucionarlo.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: 0.3 }}
              className="rounded-2xl border border-[#BADB3A]/30 bg-black/60 p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#BADB3A]/15 border border-[#BADB3A]/30 flex items-center justify-center text-[#BADB3A]">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Soporte dedicado</h3>
                  <p className="text-gray-300 mt-1">Servicio amable cuando nos necesita, todos los días de la semana.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Sección Cómo funciona */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full py-16 md:py-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            {/* Columna izquierda: título + pasos */}
            <div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 text-left">
                Cómo <span className="text-[#BADB3A]">funciona</span>
              </h2>
              <ul className="space-y-6">
                {[
                  'Elija un profesional por precio, habilidades y reseñas.',
                  'Programe una tarea hoy mismo.',
                  'Chatea, paga, da propinas y revisa todo en un solo lugar.'
                ].map((t, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.35, delay: 0.1 * i }}
                    className="flex items-start gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#BADB3A] text-black font-bold flex items-center justify-center">
                      {i + 1}
                    </div>
                    <p className="text-gray-200 leading-relaxed">{t}</p>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-10">
                <Button
                  size="lg"
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#BADB3A] text-black hover:bg-[#BADB3A]/90 border border-[#BADB3A]"
                >
                  UNASE A LA LISTA DE ESPERA
                </Button>
              </div>
            </div>

            {/* Columna derecha: imagen */}
            <div>
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.5 }}
                className="relative w-full aspect-video rounded-2xl overflow-hidden border border-[#BADB3A]/30 bg-black/40"
              >
                <Image
                  src="/images/Comofunciona.jpg"
                  alt="Cómo funciona"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={false}
                />
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      <WaitlistModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <Footer />
    </div>
  )
}

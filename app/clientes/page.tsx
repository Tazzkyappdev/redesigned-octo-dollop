'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { RegistrationModal } from '../../src/components/modals'
import { WaitlistModal } from '../../src/components/modals/WaitlistModal'
import Image from 'next/image'
import Link from 'next/link'
import { Poppins } from 'next/font/google'
import { Button } from '../../src/components/ui'
import { Briefcase } from 'lucide-react'
import { Calendar } from 'lucide-react'
import { Footer } from '../../src/components/layout'
import { CreditCard, FileText, Check, Wrench, Stethoscope, Palette, Laptop, Home, Scissors, Car, Hammer, Utensils, Dumbbell, Camera, ChevronDown, ChevronUp, PawPrint } from 'lucide-react'

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

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700']
})

export default function ClientesHome() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isProfessionalModalOpen, setIsProfessionalModalOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [chipStartIndex, setChipStartIndex] = useState(0)
  const [isSmall, setIsSmall] = useState(false)
  const [displayChipCount, setDisplayChipCount] = useState(6)
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 })
  const [activeMenu, setActiveMenu] = useState('inicio')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const displayCountRef = useRef(displayChipCount)
  const categoriasCarouselRef = useRef<HTMLDivElement | null>(null)
  const [isCarouselHovered, setIsCarouselHovered] = useState(false)

  

  const [categoryPage, setCategoryPage] = useState(0)
  const [openFaqIndex, setOpenFaqIndex] = useState(0)
  const faqItems = [
    {
      question: '¿Qué es el "Pago en Garantía" y cómo protege mi dinero?',
      answer:
        'Es un sistema de seguridad. Cuando contratas un servicio, pagas, pero el profesional no lo recibe de inmediato. Tazzky lo guarda de forma segura en una cuenta neutra y solo se lo transferimos al profesional cuando tú confirmas que el trabajo fue entregado tal como se acordó. No hay riesgo de dar anticipos.'
    },
    {
      question: '¿Qué pasa si el profesional no me entrega lo que prometió?',
      answer:
        'Tu dinero permanece protegido en garantía. Nuestro equipo revisa el caso y, si no se cumplió el acuerdo, gestionamos la resolución para protegerte como cliente.'
    },
    {
      question: '¿Cómo sé que los profesionales son de confianza?',
      answer:
        'Verificamos perfiles con filtros de seguridad y validamos identidad para reducir el riesgo de perfiles falsos, dándote más confianza al contratar.'
    },
    {
      question: '¿Cuándo y cómo recibo el dinero de mi trabajo?',
      answer:
        'Como profesional, recibes tu pago cuando el cliente confirma la entrega según lo pactado. Todo queda registrado y transparente dentro de la plataforma.'
    },
    {
      question: '¿Qué hago si el cliente me pide "cambios extra" que no estaban en el precio?',
      answer:
        'Puedes gestionar adicionales dentro de Tazzky y cobrar ese excedente sin fricciones, manteniendo claridad sobre lo incluido y lo extra.'
    },
    {
      question: '¿Cuánto cuesta usar Tazzky y de cuánto es la comisión?',
      answer:
        'El uso de la plataforma es gratis: puedes registrarte y subir tus servicios sin costo. Solo pagarás una comisión por cada servicio concretado. Durante esta etapa de Profesionales Fundadores tendrás beneficios especiales, como comisiones reducidas o incluso 0% de comisión por tiempo limitado.'
    }
  ]

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

  // Auto-scroll del carrusel de categorías cada 5 segundos
  useEffect(() => {
    const id = setInterval(() => {
      setCategoryPage((prev) => (prev + 1) % 2) // 2 páginas de categorías
    }, 5000)
    return () => clearInterval(id)
  }, [])

  // Detectar sección activa para cambiar menú automáticamente
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        { id: 'inicio', label: 'inicio' },
        { id: 'concepto', label: 'concepto' },
        { id: 'categorias', label: 'categorias' },
        { id: 'mundopro', label: 'mundopro' },
        { id: 'faq', label: 'faq' },
      ]

      let currentActive = null
      let closestDistance = Infinity

      sections.forEach(({ id, label }) => {
        const element = document.getElementById(id)
        if (element) {
          const rect = element.getBoundingClientRect()
          const distance = Math.abs(rect.top)
          
          // Si está cerca del top de la viewport, actualiza el menú activo
          if (distance < closestDistance) {
            closestDistance = distance
            currentActive = label
          }
        }
      })

      if (currentActive) {
        setActiveMenu(currentActive)
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Ejecutar al montar
    
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div 
      id="inicio"
      className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black relative overflow-hidden"
      style={{
        background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(186, 219, 58, 0.15) 0%, rgba(186, 219, 58, 0.05) 20%, transparent 50%), linear-gradient(to bottom right, #000000, #1a1a1a, #000000)`
      }}
      suppressHydrationWarning
    >
      <header
        className={`${poppins.className} fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative flex items-center justify-between gap-4">
            <Link href="/clientes" aria-label="Inicio Tazzky">
              <Image
                src="/footerlogo.png"
                alt="Tazzky"
                width={100}
                height={100}
                className="h-[100px] w-[100px] object-contain"
                priority
              />
            </Link>

            {/* Menú Desktop */}
            <nav className="hidden md:flex absolute left-1/2 -translate-x-1/2 items-center rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg shadow-black/30 px-2 py-1">
              <a href="#inicio" onClick={() => setActiveMenu('inicio')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'inicio' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>Inicio</a>
              <a href="#concepto" onClick={() => setActiveMenu('concepto')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'concepto' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>Concepto</a>
              <a href="#categorias" onClick={() => setActiveMenu('categorias')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'categorias' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>Categorías</a>
              <a href="#mundopro" onClick={() => setActiveMenu('mundopro')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'mundopro' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>Mundo Pro</a>
              <a href="#faq" onClick={() => setActiveMenu('faq')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'faq' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>FAQ</a>
            </nav>

            {/* Controles Derechos */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white text-black font-bold px-5 md:px-8 py-1.5 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Pre-registrarme
              </button>

              {/* Botón Hamburguesa Mobile */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden flex flex-col gap-1.5 w-8 h-8 justify-center items-center relative"
                aria-label="Menú"
              >
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                <span className={`w-6 h-0.5 bg-white transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
              </button>
            </div>
          </div>

          {/* Menú Mobile */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="md:hidden absolute left-0 right-0 top-full mt-2 bg-gray-900/95 backdrop-blur-xl border border-gray-700/50 rounded-lg mx-4 shadow-lg"
              >
                <div className="flex flex-col p-3 space-y-1">
                  <a
                    href="#inicio"
                    onClick={() => {
                      setActiveMenu('inicio')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 hover:text-[#BADB3A] transition-colors"
                  >
                    Inicio
                  </a>
                  <a
                    href="#concepto"
                    onClick={() => {
                      setActiveMenu('concepto')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 hover:text-[#BADB3A] transition-colors"
                  >
                    Concepto
                  </a>
                  <a
                    href="#categorias"
                    onClick={() => {
                      setActiveMenu('categorias')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 hover:text-[#BADB3A] transition-colors"
                  >
                    Categorías
                  </a>
                  <a
                    href="#mundopro"
                    onClick={() => {
                      setActiveMenu('mundopro')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 hover:text-[#BADB3A] transition-colors"
                  >
                    Mundo Pro
                  </a>
                  <a
                    href="#faq"
                    onClick={() => {
                      setActiveMenu('faq')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 hover:text-[#BADB3A] transition-colors"
                  >
                    FAQ
                  </a>
                </div>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12 relative z-10 pt-60 md:pt-64">
        <div className="flex justify-center items-center">
          {/* Columna centrada */}
          <div className="flex flex-col items-center text-center max-w-4xl w-full -mt-18 md:mt-20">
            {/* Logo */}
            {/* Logo principal removido según solicitud */}


            {/* Badge */}
            {/* Badge 'Lanzamiento en 2026' removido según solicitud */}

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-center leading-tight mb-4"
            >
              <span className="text-[#BADB3A]">Contrata servicios</span>{' '}
              <span className="text-white">seguros,</span>
              <br />
              <span className="text-white">rápidos y verificados</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className={`${poppins.className} text-gray-300 text-base md:text-lg font-semibold leading-relaxed mb-8 max-w-2xl mx-auto text-center`}
            >
              Tazzky es la nueva plataforma para usuarios, freelancers y profesionales físicos. Un espacio donde el pago y el trabajo reciben protección mediante un sistema de garantía.
            </motion.p>

            {/* Imagen principal de la app debajo del subtítulo */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-full flex justify-center mt-6 mb-10"
            >
              <Image src="/images/homeapp.png" alt="Home Tazzky" width={320} height={160} className="w-full max-w-[320px] h-auto object-contain" />
            </motion.div>

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
                  className={`${poppins.className} inline-flex items-center justify-center gap-3 bg-white text-black font-semibold px-4 py-2.5 rounded-full shadow-lg transition-colors min-w-[220px] text-sm hover:bg-gray-100`}
                >
                  Unirse a la lista de espera
                </button>
                <Link href="/profesionales" className="inline-block" aria-label="Ir a la página para profesionales">
                  <button
                    className={`${poppins.className} inline-flex items-center justify-center gap-3 bg-[#BADB3A] text-black font-semibold px-4 py-2.5 rounded-full shadow-lg transition-colors min-w-[220px] text-sm hover:bg-[#A6C032]`}
                  >
                    <span>Únete como profesional</span>
                  </button>
                </Link>
              </div>
            </motion.div>

            

            {/* Badges de tiendas: removidas según solicitud */}

            {/* Sección ¿Qué es Tazzky? */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-20"
            >
              <h2 id="concepto" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BADB3A] mb-6 text-center scroll-mt-24">
                CONCEPTO
              </h2>
              <p className="text-gray-200 max-w-3xl mx-auto mb-8 text-center">
                Tazzky nace para que trabajes y contrates sin miedo. Guardamos el dinero de forma segura al inicio del servicio y solo lo entregamos cuando ambas partes están satisfechas. Sin excusas y con la certeza que mereces.
              </p>

              {/* Pagos en Garantía moved to its own block below */}
            </motion.div>
          </div>
        </div>
      </main>

      {/* Pagos en Garantía - standalone block */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
                  className="w-full py-3"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Pagos en Garantía</h3>
              <p className="text-gray-300 mt-4 max-w-xl">
                Olvida el miedo a dar anticipos a ciegas o a que desaparezcan con tu dinero. Guardamos el dinero de forma segura al inicio y solo se libera cuando el trabajo está listo. Tu pago está garantizado.
              </p>
            </div>
            <div className="flex justify-end -translate-y-32">
              <Image
                src="/images/pagosengarantiahome.png"
                alt="Pagos en Garantía"
                width={340}
                height={255}
                className="w-full max-w-[340px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Identidad Verificada - standalone block */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full py-2 -translate-y-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Identidad Verificada</h3>
              <p className="text-gray-300 mt-4 max-w-xl">
                Eliminamos el anonimato tóxico de las redes sociales. Validamos la identidad de cada usuario mediante tecnología avanzada para que sepas exactamente con quién haces negocio.
              </p>
            </div>
            <div className="flex justify-end -translate-y-20">
              <Image
                src="/images/identidadverificada1.png"
                alt="Identidad Verificada"
                width={320}
                height={200}
                className="w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
        className="w-full py-3 -translate-y-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">Claridad Absoluta, Cero Sorpresas</h3>
              <p className="text-gray-200 max-w-3xl">
                Sabe exactamente qué estás comprando antes de pagar. Cada servicio muestra una lista clara de lo que incluye. Si el profesional no entrega lo que prometió en esa lista, tu dinero está protegido. Sin tarifas ocultas ni excusas.
              </p>
            </div>

            <div className="flex justify-end">
              <Image
                src="/images/Claridad%20Absoluta.png"
                alt="Claridad Absoluta"
                width={320}
                height={400}
                className="w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sección ¿Qué podrías hacer en Tazzky? - Full width */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="w-full py-4 -translate-y-100"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-6">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white">Todo el Control en tu Bolsillo.</h3>
              <p className="text-gray-200 mt-4 max-w-3xl">
                Olvídate de rogar por actualizaciones sobre tus proyectos o preguntarte si el técnico va a llegar.
                Tazzky te da un panel centralizado para que monitorees el estatus exacto de tus contrataciones con total transparencia.
              </p>
            </div>

            <div className="flex justify-end -translate-y-60">
              <Image
                src="/images/TODOELCONTROL1.png"
                alt="Todo el Control"
                width={320}
                height={520}
                className="w-full max-w-[320px] h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Sección Categorías */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full py-6 md:py-8 -translate-y-120"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="categorias" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BADB3A] mb-3 text-center scroll-mt-24">
            CATEGORÍAS
          </h2>
          <p className={`${poppins.className} text-gray-200 text-center mb-8 max-w-2xl mx-auto font-semibold`}>
            Encuentra las categorías que necesitas
          </p>

          <div className="relative">
            {(() => {
              const categories = [
                { title: 'Artes gráficas y diseño', src: '/images/artesgraficascate.jpg' },
                { title: 'Programación y tecnología', src: '/images/programacionyteccat.jpg' },
                { title: 'Marketing Digital', src: '/images/marketingcat.jpg' },
                { title: 'Video y animación', src: '/images/videoyanimacioncat.jpg' },
                { title: 'Escritura y traducción', src: '/images/escrituraytraducat.jpg' },
                { title: 'Música y audio', src: '/images/musicayaudiocat.jpg' },
                { title: 'Negocios', src: '/images/negocioscat.jpg' },
                { title: 'Salud y bienestar', src: '/images/saludcat1.jpg' },
                { title: 'Mantenimiento del hogar', src: '/images/matenimientohogarcate.jpg' },
                { title: 'Reparación de automóviles y motos', src: '/images/reparacioncat.jpg' },
                { title: 'Belleza y cuidado personal', src: '/images/bellezaycuidadcat.jpg' },
                { title: 'Eventos y entretenimiento', src: '/images/eventoscat.jpg' },
                { title: 'Cuidado de mascotas', src: '/images/cuidadomascotas.jpg' },
                { title: 'Servicios profesionales', src: '/images/serviciosprof.jpg' },
                { title: 'Fotografía', src: '/images/fotografiacat.jpg' },
              ]
              const categoriesPerPage = 8
              const totalPages = Math.ceil(categories.length / categoriesPerPage)
              const currentCategories = categories.slice(
                categoryPage * categoriesPerPage,
                (categoryPage + 1) * categoriesPerPage
              )
              
              return (
                <>
                  <div className="relative">
                    {/* Left Arrow */}
                    <button
                      type="button"
                      onClick={() => setCategoryPage((p) => (p - 1 + totalPages) % totalPages)}
                      className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-6 md:-translate-x-12 z-10 items-center justify-center w-10 h-10 rounded-full border border-[#BADB3A]/40 text-[#BADB3A] hover:bg-[#BADB3A] hover:text-black transition"
                      aria-label="Anterior"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>

                    <AnimatePresence mode="wait">
                      <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.4 }}
                        key={`categories-page-${categoryPage}`}
                        className="grid grid-cols-2 md:grid-cols-4 gap-6"
                      >
                      {currentCategories.map((cat, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 12 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3, delay: 0.05 * idx }}
                          className="group relative overflow-hidden rounded-2xl cursor-pointer"
                        >
                          <div className="relative aspect-square w-full">
                            <Image
                              src={cat.src}
                              alt={cat.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <p className="text-white font-semibold text-sm md:text-base">{cat.title}</p>
                          </div>
                        </motion.div>
                      ))}
                      </motion.div>
                    </AnimatePresence>

                    {/* Right Arrow */}
                    <button
                      type="button"
                      onClick={() => setCategoryPage((p) => (p + 1) % totalPages)}
                      className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-6 md:translate-x-12 z-10 items-center justify-center w-10 h-10 rounded-full border border-[#BADB3A]/40 text-[#BADB3A] hover:bg-[#BADB3A] hover:text-black transition"
                      aria-label="Siguiente"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </div>

                  {/* Navigation Dots - Centered Below */}
                  <div className="flex items-center justify-center gap-2 mt-8">
                    {Array.from({ length: totalPages }).map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setCategoryPage(i)}
                        className={`h-2 w-2 rounded-full transition-colors ${
                          i === categoryPage ? 'bg-[#BADB3A]' : 'bg-[#BADB3A]/30'
                        }`}
                        aria-label={`Página ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )
            })()}
          </div>
        </div>
      </motion.div>

      {/* Sección MUNDO PRO */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full py-6 md:py-8 -translate-y-120"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="mundopro" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BADB3A] mb-8 text-center scroll-mt-24">
            MUNDO PRO
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
            <div className="text-left">
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4">
                Cobra el 100% de tu esfuerzo.{' '}
                <span className="text-[#BADB3A]">Sin trabajar gratis, sin abusos y sin altas comisiones.</span>
              </h3>
              <p className="text-gray-300 text-base md:text-lg mb-6 max-w-md">
                Tazzky es la herramienta definitiva para freelancers y contratistas que buscan formalizar sus ventas, asegurar su dinero desde el día uno y escapar de las plataformas globales que castigan su trabajo con tarifas excesivas.
              </p>
              <button
                onClick={() => setIsProfessionalModalOpen(true)}
                className={`${poppins.className} inline-flex items-center justify-center bg-[#BADB3A] text-black font-semibold px-6 py-2.5 rounded-full shadow-lg transition-colors hover:bg-[#A6C032]`}
              >
                Únete como profesional
              </button>
            </div>
            <div className="hidden md:flex justify-end translate-y-4">
              <div className="rounded-3xl overflow-hidden">
                <Image
                  src="/images/MUNDOPRO.png"
                  alt="Mundo Pro"
                  width={460}
                  height={400}
                  className="w-full max-w-[460px] h-auto object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/tunegocio.png"
                alt="Tu negocio centralizado"
                width={340}
                height={420}
                className="w-full max-w-[300px] md:max-w-[340px] h-auto object-contain"
              />
            </div>
            <div className="text-left max-w-xl">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Tu negocio, <span className="text-[#BADB3A]">100% centralizado.</span>
              </h4>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Olvídate de llevar tus cuentas en libretas o perder cotizaciones. Tazzky te da un panel de control profesional para gestionar tus servicios activos, monitorear tus ganancias retenidas y organizar tus entregas desde un solo lugar.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            <div className="text-left max-w-xl order-2 md:order-1">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Tus servicios, tus reglas.
              </h4>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Define exactamente qué incluye tu tarifa con entregables por escrito. Si el cliente te pide modificaciones extra fuera del acuerdo original, el sistema te permite cobrar ese excedente sin fricciones. Tu tiempo vale, protégelo
              </p>
            </div>
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <Image
                src="/images/CENTRALIZADO.png"
                alt="Tus servicios, tus reglas"
                width={340}
                height={420}
                className="w-full max-w-[300px] md:max-w-[340px] h-auto object-contain"
              />
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 md:gap-12">
            <div className="flex justify-center md:justify-start">
              <Image
                src="/images/Tusservicios1.png"
                alt="Tus servicios"
                width={340}
                height={420}
                className="w-full max-w-[300px] md:max-w-[340px] h-auto object-contain"
              />
            </div>
            <div className="text-left max-w-xl">
              <h4 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                Destaca entre la informalidad.
              </h4>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed">
                Construye una reputación que justifique tus precios. Al pasar nuestro filtro de seguridad, obtienes una insignia de Profesional Verificado. Deja de competir por precio contra perfiles falsos y atrae a clientes dispuestos a pagar por calidad y certeza.
              </p>
            </div>
          </div>

        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full py-32 md:py-48 bg-gradient-to-br from-[#BADB3A] via-[#BADB3A]/60 to-black -translate-y-50"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Acceso exclusivo: Solo 100 lugares sin comisiones.
            </h3>
            <p className={`${poppins.className} text-white text-base md:text-lg leading-relaxed mb-8 font-bold`}>
              Únete a la lista como "Profesional Fundador". Los primeros 100 profesionales en registrarse operarán con 0% de comisión en sus primeros cobros y asegurarán su insignia VIP de por vida.
            </p>
            <button
              onClick={() => setIsProfessionalModalOpen(true)}
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Asegurar mi lugar sin comisión
            </button>
            <Link href="/profesionales" className={`${poppins.className} block mt-4 text-white hover:text-[#BADB3A] transition underline`}>
              Tienes dudas? Entra aquí.
            </Link>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="w-full -mt-16 md:-mt-20"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 id="faq" className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#BADB3A] text-center scroll-mt-24">
            PREGUNTAS FRECUENTES
          </h2>

          <div className="mt-10 max-w-5xl mx-auto">
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index
              return (
                <div key={item.question} className="border-b border-white/30 py-5">
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full flex items-center justify-between gap-4 text-left"
                  >
                    <span className="text-white text-lg md:text-2xl font-semibold leading-snug">{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-[#BADB3A] shrink-0" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-white shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeInOut' }}
                        className="overflow-hidden"
                      >
                        <p className="mt-4 text-gray-200 text-base md:text-lg leading-relaxed max-w-4xl">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>
      </motion.div>

      {/* Sección Cómo funciona */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full py-6 md:py-8"
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
      <RegistrationModal isOpen={isProfessionalModalOpen} onClose={() => setIsProfessionalModalOpen(false)} />
      <Footer />
    </div>
  )
}

'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { RegistrationModal } from '../modals'
import Link from 'next/link'
import Image from 'next/image'
import { AnimatePresence } from 'framer-motion'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const jobExamples = [
  {
    id: 1,
    title: 'Diseño de logo',
    distance: '2.8 km',
    price: '250',
    professional: 'Ana',
    category: 'Diseño'
  },
  {
    id: 2,
    title: 'Desarrollo web',
    distance: '1.3 km',
    price: '150',
    professional: 'Carlos',
    category: 'Programación'
  },
  {
    id: 3,
    title: 'Fotografía de producto',
    distance: '4.9 km',
    price: '120',
    professional: 'María',
    category: 'Fotografía'
  },
  {
    id: 4,
    title: 'Traducción de documentos',
    distance: '6.7 km',
    price: '133',
    professional: 'Sofía',
    category: 'Traducción'
  },
  {
    id: 5,
    title: 'Consultoría de marketing',
    distance: '1.6 km',
    price: '165',
    professional: 'Ayaan',
    category: 'Marketing'
  },
  {
    id: 6,
    title: 'Edición de video',
    distance: '2.1 km',
    price: '95',
    professional: 'Zara',
    category: 'Multimedia'
  }
]

export const Hero = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeMenu, setActiveMenu] = useState('inicio')

  // Intersection Observer para actualizar el menú según la sección visible
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    
    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -35% 0px',
      threshold: 0
    }

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id
          // Mapear IDs de sección a estados del menú
          const menuMap: Record<string, string> = {
            'inicio': 'inicio',
            'nuestro-sistema': 'beneficios',
            'tus-reglas': 'proceso',
            'herramientas': 'pasos',
            'faq': 'faq'
          }
          
          if (menuMap[sectionId]) {
            setActiveMenu(menuMap[sectionId])
          }
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)
    
    sections.forEach((section) => {
      observer.observe(section)
    })

    return () => {
      sections.forEach((section) => {
        observer.unobserve(section)
      })
    }
  }, [])

  return (
    <section id="hero" className="relative w-full min-h-screen overflow-hidden flex flex-col">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/VIDEOLANDING.mp4" type="video/mp4" />
        </video>
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent">
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
              <a href="#nuestro-sistema" onClick={() => setActiveMenu('beneficios')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'beneficios' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>Nuestro sistema</a>
              <a href="#tus-reglas" onClick={() => setActiveMenu('proceso')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'proceso' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>Tus reglas</a>
              <a href="#herramientas" onClick={() => setActiveMenu('pasos')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'pasos' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>Herramientas</a>
              <a href="#faq" onClick={() => setActiveMenu('faq')} className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors ${activeMenu === 'faq' ? 'bg-[#BADB3A] text-black' : 'text-white hover:text-[#BADB3A]'}`}>FAQ</a>
            </nav>

            {/* Controles Derechos */}
            <div className="flex items-center gap-3 md:gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="rounded-full bg-white text-black font-bold px-5 md:px-8 py-1.5 text-sm hover:bg-gray-100 transition-colors whitespace-nowrap"
              >
                Reclamar acceso
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
                    href="#nuestro-sistema"
                    onClick={() => {
                      setActiveMenu('beneficios')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 hover:text-[#BADB3A] transition-colors"
                  >
                    Nuestro sistema
                  </a>
                  <a
                    href="#tus-reglas"
                    onClick={() => {
                      setActiveMenu('proceso')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 hover:text-[#BADB3A] transition-colors"
                  >
                    Tus reglas
                  </a>
                  <a
                    href="#herramientas"
                    onClick={() => {
                      setActiveMenu('pasos')
                      setIsMobileMenuOpen(false)
                    }}
                    className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white hover:bg-gray-800 hover:text-[#BADB3A] transition-colors"
                  >
                    Herramientas
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

      {/* Main Content - Centered */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 md:px-12 text-center space-y-8">
        <motion.h1
          className={`${poppins.className} text-2xl sm:text-3xl lg:text-4xl font-bold text-white leading-tight max-w-3xl`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Deja de trabajar gratis y de regalarle{' '}
          <span className="text-[#BADB3A]">tu dinero a plataformas extranjeras.</span>
        </motion.h1>

        <motion.button
          onClick={() => setIsModalOpen(true)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="bg-[#BADB3A] hover:bg-[#A6C032] text-black font-bold py-2 px-6 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base"
        >
          Reclamar mi 0% de Comisión
        </motion.button>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-xs sm:text-sm text-white/80 max-w-xl leading-relaxed"
        >
          El 0% de comisión es exclusivo para nuestros primeros Profesionales Fundadores. Después de esta fase, nuestra comisión será justa y transparente, muy por debajo del 20% que cobra la competencia.
        </motion.p>
      </div>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

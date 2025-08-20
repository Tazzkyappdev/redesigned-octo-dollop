'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui'
import { RegistrationModal } from '../modals'
import Image from 'next/image'
import Link from 'next/link'

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-500 ${
          isScrolled
            ? 'bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20'
            : 'bg-transparent'
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
              <Link href="/clientes" aria-label="Ir a la página de inicio para clientes">
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
              className="flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Button 
                variant="primary" 
                size="sm"
                onClick={handleOpenModal}
                className={`flex items-center space-x-2 px-4 py-2 text-sm lg:text-base lg:px-6 lg:py-3 lg:space-x-3 transition-all duration-300 ${
                  isScrolled 
                    ? 'bg-[#BADB3A] hover:bg-[#A6C032] text-white shadow-lg' 
                    : 'bg-white/90 hover:bg-white text-gray-800 shadow-lg backdrop-blur-sm'
                }`}
              >
                <div className="flex items-center space-x-1 lg:space-x-2">
                  {/* Icono App Store */}
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  {/* Icono Play Store */}
                  <svg className="w-4 h-4 lg:w-5 lg:h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.61 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                  </svg>
                </div>
                <span className="font-medium hidden sm:inline">Unirse a la lista de espera</span>
                <span className="font-medium sm:hidden">Lista de espera</span>
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Modal de registro */}
      <RegistrationModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </>
  )
}

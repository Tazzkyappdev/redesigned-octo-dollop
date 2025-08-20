'use client'

import React, { useState } from 'react'
import { Instagram } from 'lucide-react'
import { ContactModal } from '../modals/ContactModal'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const [isContactModalOpen, setIsContactModalOpen] = useState(false)

  const handleOpenContactModal = () => {
    setIsContactModalOpen(true)
  }

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false)
  }





  return (
    <footer className="bg-white text-gray-900 border-t-2 border-[#BADB3A]">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start space-y-6 md:space-y-0">
          {/* Lado izquierdo - Logo y copyright */}
          <div className="flex flex-col space-y-4">
            {/* Logo */}
            <div>
              <img 
                src="/footerlogo.png" 
                alt="Tazzky Logo" 
                className="h-20 md:h-12 w-auto"
              />
            </div>
            
            {/* Copyright */}
            <div className="text-gray-600 text-sm">
              Tazzky © {currentYear}
            </div>
            
            {/* Dirección */}
            <div className="text-gray-600 text-sm space-y-1">
              <div>Tuxtla Gutiérrez, Chiapas, México.</div>
            </div>
            
            {/* Política legal */}
            <div className="text-gray-900 font-semibold text-sm">
              <a href="/politica-privacidad" className="hover:text-[#BADB3A] transition-colors duration-200">
                Política legal y de privacidad
              </a>
            </div>
          </div>

          {/* Lado derecho - Contacto */}
          <div className="flex flex-col space-y-2">
            {/* Título de contacto */}
            <div className="text-gray-500 text-sm">
              ¿Alguna pregunta?
            </div>
            
            <button
              onClick={handleOpenContactModal}
              className="text-gray-900 font-bold text-lg hover:text-[#BADB3A] transition-colors duration-200 cursor-pointer self-start"
            >
              Contáctanos
            </button>
            
            {/* Redes sociales */}
            <div className="flex space-x-4">
              <a
                href="https://www.instagram.com/tazzkyapp/"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-[#BADB3A] hover:text-white transition-colors duration-200"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://x.com/Tazzkyapp"
                className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-700 hover:bg-[#BADB3A] hover:text-white transition-colors duration-200"
                aria-label="X"
                title="X"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M4 4h3.2l5 6.6 5.6-6.6H20l-6.6 7.8L20 20h-3.2l-5.4-7.1L5.6 20H4l7.1-8.5L4 4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de contacto */}
      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={handleCloseContactModal} 
      />
    </footer>
  )
}

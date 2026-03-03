'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="bg-[#1a1a1a] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Columna 1: Logo y descripción */}
          <div className="flex flex-col space-y-4 -ml-2">
            <div>
              <Image
                src="/footerlogo.png"
                alt="Tazzky Logo"
                width={60}
                height={60}
                className="h-[60px] w-[60px] object-contain"
              />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Tazzky es la infraestructura de confianza en donde los freelancers y contratistas de LATAM tienen voz, pagos garantizados y una reputación que los respalda.
            </p>
          </div>

          {/* Columna 2: Legal */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-semibold text-base mb-2">Legal</h3>
            <Link 
              href="/terminos-condiciones" 
              className="text-gray-400 text-sm hover:text-[#BADB3A] transition-colors duration-200"
            >
              Términos y condiciones
            </Link>
            <Link 
              href="/terminos-condiciones?tab=privacidad" 
              className="text-gray-400 text-sm hover:text-[#BADB3A] transition-colors duration-200"
            >
              Políticas de privacidad
            </Link>
          </div>

          {/* Columna 3: Canales */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-semibold text-base mb-2">Inversiones y contacto</h3>
            <a 
              href="mailto:hola@tazzky.com" 
              className="text-gray-400 text-sm hover:text-[#BADB3A] transition-colors duration-200"
            >
              hola@tazzky.com
            </a>
          </div>

          {/* Columna 4: Redes Sociales */}
          <div className="flex flex-col space-y-3">
            <h3 className="text-white font-semibold text-base mb-2">Redes Sociales</h3>
            <a 
              href="https://www.threads.net/@tazzkyapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-400 text-sm hover:text-[#BADB3A] transition-colors duration-200 group"
            >
              <Image 
                src="/images/threads.svg" 
                alt="Threads" 
                width={20} 
                height={20}
                className="w-5 h-5 transition-all duration-200 group-hover:[filter:brightness(1.2)_saturate(1.8)_hue-rotate(45deg)]"
              />
              <span>Threads</span>
            </a>
            <a 
              href="https://www.instagram.com/tazzkyapp/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-400 text-sm hover:text-[#BADB3A] transition-colors duration-200 group"
            >
              <Image 
                src="/images/instagram.svg" 
                alt="Instagram" 
                width={20} 
                height={20}
                className="w-5 h-5 transition-all duration-200 group-hover:[filter:brightness(1.2)_saturate(1.8)_hue-rotate(45deg)]"
              />
              <span>Instagram</span>
            </a>
            <a 
              href="https://www.facebook.com/people/Tazzky/61583129657376/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-400 text-sm hover:text-[#BADB3A] transition-colors duration-200 group"
            >
              <Image 
                src="/images/facebook.svg" 
                alt="Facebook" 
                width={20} 
                height={20}
                className="w-5 h-5 transition-all duration-200 group-hover:[filter:brightness(1.2)_saturate(1.8)_hue-rotate(45deg)]"
              />
              <span>Facebook</span>
            </a>
            <a 
              href="https://www.tiktok.com/@tazzkyapp"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-3 text-gray-400 text-sm hover:text-[#BADB3A] transition-colors duration-200 group"
            >
              <Image 
                src="/images/tiktok.svg" 
                alt="TikTok" 
                width={20} 
                height={20}
                className="w-5 h-5 transition-all duration-200 group-hover:[filter:brightness(1.2)_saturate(1.8)_hue-rotate(45deg)]"
              />
              <span>Tiktok</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'
import Image from 'next/image'
import { WaitlistModal } from '../modals/WaitlistModal'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const CTASection = () => {
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const handleOpenWaitlist = () => { setIsWaitlistOpen(true) }
  const handleCloseWaitlist = () => { setIsWaitlistOpen(false) }

  return (
    <section className="py-0 relative overflow-hidden">
      {/* Verde Tazzky a Negro gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#BADB3A] via-[#9AC420] to-black"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center py-12 md:py-16 lg:py-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Imagen izquierda */}
          <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
            <Image
              src="/images/Frame 752.png"
              alt="Ofrece tus servicios"
              fill
              className="object-contain"
            />
          </div>

          {/* Contenido derecha */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2
                className={`${poppins.className} text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-4`}
                style={{ fontWeight: 700 }}
              >
                Ofrece tus servicios y haz crecer tu negocio
              </h2>
              <p
                className={`${poppins.className} text-base md:text-lg text-white leading-relaxed opacity-95`}
              >
                Conecta con clientes locales y globales, gestiona tus servicios y recibe pagos de forma segura. Únete a la comunidad de profesionales de Tazzky.
              </p>
            </motion.div>

            <motion.button
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onClick={handleOpenWaitlist}
              className={`${poppins.className} bg-white hover:bg-gray-100 text-black font-semibold py-3 px-8 rounded-full transition-colors duration-200 w-full md:w-auto text-center`}
              style={{ fontWeight: 600 }}
            >
              Únete a la lista de espera
            </motion.button>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className={`${poppins.className} text-xs md:text-sm text-white/85 leading-relaxed max-w-sm`}
            >
              El 0% de comisión es exclusivo para nuestros primeros Profesionales Fundadores. Después de esta fase, nuestra comisión será justa y transparente, muy por debajo del 20% que cobra la competencia.
            </motion.p>
          </div>
        </motion.div>
      </div>

      {/* Waitlist Modal */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={handleCloseWaitlist} />
    </section>
  )
}

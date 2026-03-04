'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Poppins } from 'next/font/google'
import Image from 'next/image'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const Steps = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título principal */}
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 
            className={`${poppins.className} text-2xl md:text-3xl lg:text-4xl font-bold text-[#BADB3A] scroll-mt-24`}
            style={{ fontWeight: 700 }}
          >
            Hecho para los que crean y los que reparan
          </h2>
        </motion.div>

        {/* Primera fila: Imagen izquierda, texto derecha */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Imagen FREELANCERLAND.png */}
          <div className="relative w-full h-64 md:h-80 lg:h-96">
            <Image
              src="/images/FREELANCERLAND.png"
              alt="Freelancers"
              fill
              className="object-contain"
            />
          </div>

          {/* Texto derecha */}
          <div className="space-y-4">
            <h3 className={`${poppins.className} text-2xl md:text-3xl font-bold text-white`} style={{ fontWeight: 700 }}>
              Freelancers y Talento Digital
            </h3>
            <p className={`${poppins.className} text-base md:text-lg text-gray-300`}>
              Tu código y tus diseños valen. Cero clientes fantasma. Cobras el 100% al enviar tu archivo.
            </p>
          </div>
        </motion.div>

        {/* Segunda fila: Texto izquierda, imagen derecha */}
        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Texto izquierda */}
          <div className="space-y-4 order-2 md:order-1">
            <h3 className={`${poppins.className} text-2xl md:text-3xl font-bold text-white`} style={{ fontWeight: 700 }}>
              Profesionales Locales y Físicos
            </h3>
            <p className={`${poppins.className} text-base md:text-lg text-gray-300`}>
              Tu mano de obra y tu tiempo se respetan. El cliente deposita la garantía antes de que salgas de tu casa o taller.
            </p>
          </div>

          {/* Imagen FISICOLAND.png */}
          <div className="relative w-full h-64 md:h-80 lg:h-96 order-1 md:order-2">
            <Image
              src="/images/FISICOLAND.png"
              alt="Profesionales Locales"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

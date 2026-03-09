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
            Hecho para los talentos digitales
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
              Trabaja con acuerdos claros, tiempos definidos y pagos protegidos desde el inicio para enfocarte en crear,
              crecer tu portafolio y escalar tus ingresos con mayor confianza.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <h3
            id="herramientas"
            className={`${poppins.className} text-2xl md:text-3xl lg:text-4xl font-bold text-[#BADB3A] scroll-mt-24`}
            style={{ fontWeight: 700 }}
          >
            Todas las herramientas que necesitas para hacer crecer tu negocio
          </h3>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="relative w-full h-80 md:h-[26rem] lg:h-[30rem]">
            <Image
              src="/images/tunegocio.png"
              alt="Tu negocio centralizado"
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-4">
            <h3 className={`${poppins.className} text-2xl md:text-3xl font-bold text-white`} style={{ fontWeight: 700 }}>
              Tu negocio, 100% centralizado.
            </h3>
            <p className={`${poppins.className} text-base md:text-lg text-gray-300`}>
              Controla tus ganancias, visitas y pedidos en tiempo real. Ten el control total de tu crecimiento.
              Tazzky te da un panel de control profesional para gestionar tus servicios activos, monitorear tus
              ganancias retenidas y organizar tus entregas desde un solo lugar.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-8 items-center mt-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.35 }}
        >
          <div className="space-y-4 order-2 md:order-1">
            <h3 className={`${poppins.className} text-2xl md:text-3xl font-bold text-white`} style={{ fontWeight: 700 }}>
              Tus servicios, tus reglas.
            </h3>
            <p className={`${poppins.className} text-base md:text-lg text-gray-300`}>
              Define exactamente qué incluye tu tarifa con entregables por escrito. Si el cliente te pide
              modificaciones extra fuera del acuerdo original, el sistema te permite cobrar ese excedente sin
              fricciones. Tu tiempo vale, protégelo.
            </p>
          </div>

          <div className="relative w-full h-80 md:h-[26rem] lg:h-[30rem] order-1 md:order-2">
            <Image
              src="/images/CENTRALIZADO.png"
              alt="Tus servicios centralizados"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

      </div>
    </section>
  )
}

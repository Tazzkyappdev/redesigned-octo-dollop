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

export const EarlyAccess = () => {
  return (
    <section className="py-14 md:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={`${poppins.className} text-2xl md:text-3xl lg:text-4xl font-bold text-[#BADB3A] max-w-4xl mx-auto leading-tight`}
            style={{ fontWeight: 700 }}
          >
            Todas las herramientas que necesitas para hacer crecer tu negocio
          </h2>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-14 items-center max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <div className="relative w-full h-[420px] md:h-[500px] lg:h-[560px]">
            <Image
              src="/images/tunegocio.png"
              alt="Tu negocio centralizado"
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-5 text-left">
            <h3
              className={`${poppins.className} text-2xl md:text-3xl font-bold text-white leading-tight`}
              style={{ fontWeight: 700 }}
            >
              Tu negocio, <span className="text-[#BADB3A]">100% centralizado.</span>
            </h3>
            <p className={`${poppins.className} text-base md:text-lg text-gray-200 leading-relaxed max-w-xl`}>
              Controla tus ganancias, visitas y pedidos en tiempo real. Ten el control total de tu crecimiento. Tazzky te da un panel de control profesional para gestionar tus servicios activos, monitorear tus ganancias retenidas y organizar tus entregas desde un solo lugar.
            </p>
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-14 items-center max-w-5xl mx-auto mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="space-y-5 text-left order-2 md:order-1 -mt-32 md:mt-0">
            <h3
              className={`${poppins.className} text-2xl md:text-3xl font-bold text-white leading-tight`}
              style={{ fontWeight: 700 }}
            >
              La mejor notificación del día.
            </h3>
            <p className={`${poppins.className} text-base md:text-lg text-gray-200 leading-relaxed max-w-xl`}>
              Recibe alertas instantáneas en cuanto el dinero se libere en tu cuenta. Sin demoras, directo a tu bolsillo.
            </p>
          </div>

          <div className="relative w-full h-[700px] md:h-[500px] lg:h-[620px] order-1 md:order-2">
            <Image
              src="/images/pagosengarantiahome.png"
              alt="Notificación de pago liberado"
              fill
              className="object-contain"
            />
          </div>
        </motion.div>

        <motion.div
          className="grid md:grid-cols-2 gap-10 md:gap-14 items-center max-w-5xl mx-auto mt-12 md:mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <div className="relative w-full h-[420px] md:h-[500px] lg:h-[560px]">
            <Image
              src="/images/CENTRALIZADO.png"
              alt="Tus servicios, tus reglas"
              fill
              className="object-contain"
            />
          </div>

          <div className="space-y-5 text-left">
            <h3
              className={`${poppins.className} text-2xl md:text-3xl font-bold text-white leading-tight`}
              style={{ fontWeight: 700 }}
            >
              Tus servicios, tus reglas..
            </h3>
            <p className={`${poppins.className} text-base md:text-lg text-gray-200 leading-relaxed max-w-xl`}>
              Define exactamente qué incluye tu tarifa con entregables por escrito. Si el cliente te pide modificaciones extra fuera del acuerdo original, el sistema te permite cobrar ese excedente sin fricciones. Tu tiempo vale, protégelo
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

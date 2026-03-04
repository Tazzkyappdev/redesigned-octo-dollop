'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, Shield } from 'lucide-react'
import { RegistrationModal } from '../modals'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const Benefits = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Título y subtítulo */}
        <div className="text-center mb-12">
          <motion.h2
            className={`${poppins.className} text-3xl md:text-4xl font-bold text-[#BADB3A] mb-4 scroll-mt-24`}
            style={{ fontWeight: 700 }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Se acabó trabajar con miedo
          </motion.h2>
          <motion.p
            className={`${poppins.className} text-base md:text-lg text-white max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            El sistema tradicional en LATAM estaba roto. Construimos la infraestructura para arreglarlo.
          </motion.p>
        </div>

        {/* Tarjetas comparativas */}
        <div className="grid md:grid-cols-2 gap-6 mb-10 max-w-5xl mx-auto">
          {/* Tarjeta Roja - Problema */}
          <motion.div
            className="bg-gradient-to-br from-red-900/90 to-red-950/90 rounded-2xl p-8 border border-red-800/50 shadow-xl"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-red-800/50 flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-300" />
              </div>
            </div>
            <div className={`${poppins.className} space-y-4 text-white text-sm md:text-base font-semibold text-center`}>
              <p>Ruegas por un anticipo del 50%.</p>
              <p>Regalas el 20% de tus ingresos en comisiones abusivas.</p>
              <p>Trabajas cruzando los dedos para que el cliente no desaparezca.</p>
              <p>Estás completamente desprotegido ante estafas.</p>
            </div>
          </motion.div>

          {/* Tarjeta Verde - Solución */}
          <motion.div
            className="bg-gradient-to-br from-[#5a6938]/90 to-[#4a5530]/90 rounded-2xl p-8 border border-[#6a7948]/50 shadow-xl"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-[#6a7948]/50 flex items-center justify-center">
                <Shield className="w-8 h-8 text-[#BADB3A]" />
              </div>
            </div>
            <div className={`${poppins.className} space-y-4 text-white text-sm md:text-base font-semibold text-center`}>
              <p>El cliente paga por adelantado.</p>
              <p>Pagas 0% de comisión (exclusivo en la Fase Beta).</p>
              <p>Trabajas con la garantía de que el dinero ya está protegido.</p>
              <p>Entregas el proyecto y recibes tu pago automáticamente.</p>
            </div>
          </motion.div>
        </div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button
            onClick={() => setIsModalOpen(true)}
            className={`${poppins.className} bg-[#BADB3A] hover:bg-[#A6C032] text-black font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-base`}
          >
            Reclamar mi 0% de Comisión
          </button>
        </motion.div>
      </div>

      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

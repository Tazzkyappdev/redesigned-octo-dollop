'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Package, Lock, Banknote } from 'lucide-react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const steps = [
  {
    number: '1',
    title: 'Publicas tu servicio',
    icon: Package,
    description: 'Tú defines el precio fijo o por paquetes, los tiempos de entrega y lo que incluye. Creas tu oferta completa para que los clientes lleguen sin perder tiempo enviando cotizaciones.'
  },
  {
    number: '2',
    title: 'El cliente contrata y el dinero se retiene',
    icon: Lock,
    description: 'El cliente acepta tus condiciones y paga por adelantado. Comenzas a trabajar con la certeza absoluta de que tus fondos ya están asegurados.'
  },
  {
    number: '3',
    title: 'Entregas y cobras automáticamente',
    icon: Banknote,
    description: 'Subes el trabajo terminado dentro de la plataforma. Una vez entregado, el sistema libera tu dinero directo a tu cuenta. Sin pelear, ni rogar, ni perder tu tiempo.'
  }
]

export const Process = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
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
            Tú pones las reglas
          </motion.h2>
          <motion.p
            className={`${poppins.className} text-base md:text-lg text-white max-w-2xl mx-auto`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Olvídate de regatear. Así de simple funciona nuestro sistema:
          </motion.p>
        </div>

        {/* Tres pasos */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
            >
              {/* Número en círculo */}
              <div className="w-16 h-16 rounded-full bg-[#5a6938]/60 border-2 border-[#BADB3A] flex items-center justify-center mb-4">
                <span className={`${poppins.className} text-2xl font-bold text-[#BADB3A]`}>
                  {step.number}
                </span>
              </div>

              {/* Título del paso */}
              <h3 className={`${poppins.className} text-base md:text-lg font-semibold text-white mb-4`}>
                {step.title}
              </h3>

              {/* Ícono grande */}
              <div className="mb-4">
                <step.icon className="w-16 h-16 text-[#BADB3A]" strokeWidth={1.5} />
              </div>

              {/* Descripción */}
              <p className={`${poppins.className} text-sm text-gray-300 leading-relaxed`}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

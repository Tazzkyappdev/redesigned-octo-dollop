'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Download, Search, Wallet, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Download,
    title: 'Descarga la app'
  },
  {
    icon: Search,
    title: 'Encuentra clientes'
  },
  {
    icon: Wallet,
    title: 'Recibe tu pago'
  },
  {
    icon: CheckCircle,
    title: '¡Así de fácil!'
  }
]

export const Steps = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="bg-gradient-to-r from-[#BADB3A] to-[#A6C032] rounded-2xl lg:rounded-3xl p-6 md:p-8 lg:p-12 xl:p-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <motion.div
            className="text-center mb-8 md:mb-12 lg:mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white mb-3 md:mb-4 lg:mb-6">
              Registrarte es gratis. Fácil de usar.
            </h2>
            <p className="text-sm md:text-base lg:text-lg xl:text-xl text-white/90 max-w-4xl mx-auto px-2">
              A diferencia de otras plataformas, con Tazzky no hay costo de registro ni suscripción y solo un 15% de comisión por servicios completados. ¡Ah, y el primer mes es gratis!
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
              >
                <div className={`w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 rounded-full flex items-center justify-center mb-3 md:mb-4 ${
                  index === 3 
                    ? 'bg-white' 
                    : 'bg-white border-2 border-white/20'
                }`}>
                  <step.icon className={`w-6 h-6 md:w-8 md:h-8 lg:w-10 lg:h-10 ${
                    index === 3 ? 'text-red-500' : 'text-gray-700'
                  }`} />
                </div>
                <h3 className="text-xs md:text-sm lg:text-base font-semibold text-white mb-1">
                  {step.title}
                </h3>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

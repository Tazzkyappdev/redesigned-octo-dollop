'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

const tools = [
  {
    icon: CheckCircle,
    title: 'Promociona tu negocio en un mercado global y local'
  },
  {
    icon: CheckCircle,
    title: 'Envía cotizaciones y programa trabajos'
  },
  {
    icon: CheckCircle,
    title: 'Recibe pagos automáticos'
  },
  {
    icon: CheckCircle,
    title: 'Evalúa clientes'
  }
]

export const Process = () => {
  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout horizontal: imagen a la izquierda, contenido a la derecha */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          {/* Columna izquierda - Imagen */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-start order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src="/images/Frame 752.png"
              alt="Frame 752"
              className="w-[280px] h-[224px] md:w-[350px] md:h-[280px] lg:w-[500px] lg:h-[400px] object-cover rounded-2xl lg:rounded-3xl"
            />
          </motion.div>

          {/* Columna derecha - Contenido */}
          <motion.div
            className="flex-1 order-1 lg:order-2"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Header */}
            <motion.div
              className="text-center lg:text-left mb-12 lg:mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 lg:mb-6">
                <span className="text-[#BADB3A]">Todas las herramientas</span> que necesitas para hacer crecer <span className="text-[#BADB3A]">tu negocio</span>
              </h2>
              <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-4xl mx-auto lg:mx-0">
                Mantente al tanto de tus próximos trabajos en Tazzky. Chatea directamente con clientes, recibe pagos automáticamente y obtén soporte personalizado cuando lo necesites.
              </p>
            </motion.div>

            {/* Herramientas */}
            <motion.div
              className="flex flex-col gap-2 lg:gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  className="text-center lg:text-left"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                >
                  <div className="flex justify-center lg:justify-start items-baseline gap-2">
                    <tool.icon className="w-3 h-3 md:w-4 md:h-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <h3 className="text-xs md:text-sm font-semibold text-gray-900">
                      {tool.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

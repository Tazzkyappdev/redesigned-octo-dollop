'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { LeadForm, ProfessionalForm } from '../forms'

export const Conversion = () => {
  const [activeForm, setActiveForm] = useState<'client' | 'professional'>('client')

  return (
    <section id="conversion" className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header de la sección */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Únete a la beta de Tazzky
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Sé de los primeros en experimentar la nueva forma de contratar servicios. 
            Acceso gratuito y sin comisiones durante el período beta.
          </p>
        </motion.div>

        {/* Selector de formulario */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveForm('client')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeForm === 'client'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Buscar servicios
              </button>
              <button
                onClick={() => setActiveForm('professional')}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeForm === 'professional'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Ofrecer servicios
              </button>
            </div>
          </div>
        </motion.div>

        {/* Formulario activo */}
        <motion.div
          key={activeForm}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-2xl mx-auto"
        >
          {activeForm === 'client' ? <LeadForm /> : <ProfessionalForm />}
        </motion.div>

        {/* Información adicional */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-md border border-gray-200 max-w-4xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              ¿Por qué unirse a la beta?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">🚀</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Acceso anticipado</h4>
                <p className="text-gray-600 text-sm">
                  Sé de los primeros en usar la plataforma antes del lanzamiento oficial
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">💰</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Sin comisiones</h4>
                <p className="text-gray-600 text-sm">
                  Durante la beta no hay comisiones por transacciones
                </p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-green-600 text-xl">🎯</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Soporte directo</h4>
                <p className="text-gray-600 text-sm">
                  Atención personalizada del equipo de Tazzky
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

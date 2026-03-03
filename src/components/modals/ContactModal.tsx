'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    tipoUsuario: 'cliente',
    mensaje: ''
  })

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Formulario de contacto enviado:', formData)
    // Aquí puedes agregar la lógica para enviar los datos
    onClose()
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-white/95 backdrop-blur-md rounded-2xl sm:rounded-3xl w-full max-w-sm sm:max-w-md mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-white/20"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header del modal */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-200/50 sticky top-0 bg-white/95 backdrop-blur-sm z-10">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900">
                Contáctanos
              </h2>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-gray-100/50 rounded-full transition-colors duration-200"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
              </button>
            </div>

            {/* Formulario */}
            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4">
              {/* Nombre */}
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                  placeholder="Tu nombre completo"
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                  placeholder="tu@email.com"
                />
              </div>

              {/* Teléfono */}
              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-1">
                  Número de teléfono *
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                  placeholder="+52 55 1234 5678"
                />
              </div>

              {/* Tipo de usuario */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Yo soy un: *
                </label>
                <div className="bg-gray-100/80 rounded-xl p-1 w-full max-w-xs">
                  <div className="flex space-x-1">
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tipoUsuario: 'cliente' }))}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${formData.tipoUsuario === 'cliente' ? 'bg-[#BADB3A] text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'}`}
                    >
                      Cliente
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData(prev => ({ ...prev, tipoUsuario: 'profesional' }))}
                      className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${formData.tipoUsuario === 'profesional' ? 'bg-[#BADB3A] text-white shadow-md' : 'text-gray-600 hover:text-gray-900 hover:bg-white/80'}`}
                    >
                      Profesional
                    </button>
                  </div>
                </div>
              </div>

              {/* Mensaje */}
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  maxLength={1000}
                  rows={4}
                  className="w-full px-3 py-2.5 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200 resize-none"
                  placeholder="Escribe tu mensaje aquí..."
                />
                <div className="text-xs text-gray-500 mt-1 text-right">
                  {formData.mensaje.length}/1000 caracteres
                </div>
              </div>

              {/* Botón de enviar */}
              <button
                type="submit"
                className="w-full bg-[#BADB3A] hover:bg-[#A6C032] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg"
              >
                Enviar
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

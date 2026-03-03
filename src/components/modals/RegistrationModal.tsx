'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface RegistrationModalProps {
  isOpen: boolean
  onClose: () => void
}

export const RegistrationModal = ({ isOpen, onClose }: RegistrationModalProps) => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    email: '',
    pais: '',
    estado: '',
    categoria: '',
    categoriaOtra: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const resetForm = () => {
    setFormData({
      nombre: '',
      telefono: '',
      email: '',
      pais: '',
      estado: '',
      categoria: '',
      categoriaOtra: ''
    })
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      resetForm()
      onClose()
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitError(null)
    setIsSubmitting(true)
    try {
      const { createLandingLead } = await import('../../lib/supabase-functions')

      const categoriaElegida = formData.categoria === 'Otra' ? formData.categoriaOtra : formData.categoria

      const detalles: string[] = []
      if (formData.telefono) detalles.push(`Teléfono: ${formData.telefono}`)
      if (formData.pais) detalles.push(`País: ${formData.pais}`)
      if (formData.estado) detalles.push(`Estado: ${formData.estado}`)
      if (categoriaElegida) detalles.push(`Categoría: ${categoriaElegida}`)

      const result = await createLandingLead({
        email: formData.email,
        full_name: formData.nombre,
        interest_type: 'professional',
        category: categoriaElegida || undefined,
        message: detalles.join(' | ') || undefined,
        notification_preference: true
      })

      if (!result.success) {
        const errorMsg = typeof result.error === 'string' ? result.error : 'No pudimos guardar tu registro. Intenta de nuevo en unos minutos.'
        setSubmitError(errorMsg)
        setIsSubmitting(false)
        return
      }

      setFormData({
        nombre: '',
        telefono: '',
        email: formData.email,
        pais: '',
        estado: '',
        categoria: '',
        categoriaOtra: ''
      })
      setIsSubmitting(false)
      setSubmitSuccess(true)
      
      setTimeout(() => {
        resetForm()
        onClose()
      }, 2500)
    } catch (err: any) {
      const message = err?.message || 'Ocurrió un error inesperado. Intenta de nuevo más tarde.'
      setSubmitError(message)
      setIsSubmitting(false)
    }
  }

  const categorias = [
    'Artes gráficas y diseño',
    'Programación y tecnología',
    'Marketing Digital',
    'Video y animación',
    'Escritura y traducción',
    'Música y audio',
    'Negocios',
    'Salud y bienestar',
    'Mantenimiento del hogar',
    'Reparación de automóviles y motos',
    'Belleza y cuidado personal',
    'Eventos y entretenimiento',
    'Cuidado de mascotas',
    'Servicios profesionales',
    'Fotografía'
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleBackdropClick}
        >
          <motion.div
            className="bg-gray-900/95 backdrop-blur-md rounded-2xl sm:rounded-3xl w-full max-w-sm sm:max-w-md mx-4 max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-2xl border border-white/10"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Header del modal */}
            <div className="flex justify-between items-center p-4 sm:p-6 border-b border-gray-700/50 sticky top-0 bg-gray-900/95 backdrop-blur-sm z-10">
              <h2 className="text-lg sm:text-xl font-bold text-white">
                Reclama tu Pase como Profesional Fundador
              </h2>
              <button
                onClick={() => { resetForm(); onClose() }}
                className="p-1.5 sm:p-2 hover:bg-gray-800/50 rounded-full transition-colors duration-200"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
              </button>
            </div>

            <div className="p-4 sm:p-6">
              {/* Formulario */}
              <motion.form
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
                className="space-y-3 sm:space-y-4"
              >
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: -15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-gradient-to-br from-[#BADB3A]/20 to-lime-900/30 border-2 border-[#BADB3A] rounded-lg p-6 text-center shadow-2xl"
                  >
                    <p className="text-4xl sm:text-5xl mb-3 text-white animate-bounce">¡Felicidades! ✓</p>
                    <p className="text-white text-base sm:text-lg font-bold mb-3">
                      ¡Has asegurado tu lugar como Profesional Fundador!
                    </p>
                    <p className="text-white text-sm sm:text-base font-semibold mb-2">
                      Confirma tu correo: <span className="font-mono text-[#BADB3A] bg-gray-900/50 px-2 py-1 rounded">{formData.email}</span>
                    </p>
                    <p className="text-white text-xs sm:text-sm">
                      Recibirás un email con los detalles de tu pase VIP y cómo comenzar
                    </p>
                    <div className="mt-4 flex justify-center gap-1">
                      <div className="w-2 h-2 bg-[#BADB3A] rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-[#BADB3A] rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-2 h-2 bg-[#BADB3A] rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </motion.div>
                )}
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/20 border border-red-500/30 text-red-200 text-xs sm:text-sm rounded-lg p-3"
                  >
                    {submitError}
                  </motion.div>
                )}

                {!submitSuccess && (
                  <>
                    {/* Descripción */}
                    <p className="text-gray-300 text-xs sm:text-sm font-semibold mb-4">
                      Asegura tu lugar entre los primeros 100 y obtén 0% de comisión en tus primeros cobros.
                    </p>

                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                    Nombre completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 sm:py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                    placeholder="Tu nombre completo"
                  />
                </div>

                {/* Teléfono */}
                <div>
                  <label htmlFor="telefono" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                    Número de teléfono *
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 sm:py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                    Correo electrónico *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 sm:py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                    placeholder="tu@email.com"
                  />
                </div>

                {/* País y Estado */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label htmlFor="pais" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                      País *
                    </label>
                    <input
                      type="text"
                      id="pais"
                      name="pais"
                      value={formData.pais}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 sm:py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                      placeholder="México"
                    />
                  </div>
                  <div>
                    <label htmlFor="estado" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                      Estado *
                    </label>
                    <input
                      type="text"
                      id="estado"
                      name="estado"
                      value={formData.estado}
                      onChange={handleInputChange}
                      required
                      className="w-full px-3 py-2.5 sm:py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                      placeholder="CDMX"
                    />
                  </div>
                </div>

                {/* Categoría */}
                <div>
                  <label htmlFor="categoria" className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                    ¿A qué categoría podrías pertenecer? *
                  </label>
                  <select
                    id="categoria"
                    name="categoria"
                    value={formData.categoria}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 sm:py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                  >
                    <option value="">Selecciona una categoría</option>
                    {categorias.map((categoria) => (
                      <option key={categoria} value={categoria}>
                        {categoria}
                      </option>
                    ))}
                    <option value="Otra">Otra (especificar)</option>
                  </select>
                </div>

                {formData.categoria === 'Otra' && (
                  <div>
                    <label className="block text-xs sm:text-sm font-medium text-gray-200 mb-1">
                      Si no encuentras tu categoría, escribe cuál es
                    </label>
                    <input
                      type="text"
                      name="categoriaOtra"
                      value={formData.categoriaOtra}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2.5 sm:py-2 text-sm bg-gray-800 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-transparent transition-all duration-200"
                      placeholder="Ej. Instalaciones solares, Carpintería personalizada, etc."
                    />
                  </div>
                )}

                {/* Botón de envío */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full ${isSubmitting ? 'bg-[#A6C032] cursor-not-allowed' : 'bg-[#BADB3A] hover:bg-[#A6C032]'} text-black font-semibold py-3 sm:py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 mt-4 sm:mt-6 text-sm sm:text-base`}
                >
                  {isSubmitting ? 'Reclamando...' : 'Reclamar mi lugar'}
                </button>

                <p className="text-xs text-gray-400/70 text-center mt-3 sm:mt-4 px-2">
                  Al enviar este formulario, aceptas recibir comunicaciones de Tazzky sobre el lanzamiento de la plataforma.
                </p>
                  </>
                )}
              </motion.form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

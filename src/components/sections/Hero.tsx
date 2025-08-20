'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui'
import { RegistrationModal } from '../modals'
import { Smartphone, MapPin, DollarSign, Clock } from 'lucide-react'

const jobExamples = [
  {
    id: 1,
    title: 'Diseño de logo',
    distance: '2.8 km',
    price: '250',
    professional: 'Ana',
    category: 'Diseño'
  },
  {
    id: 2,
    title: 'Desarrollo web',
    distance: '1.3 km',
    price: '150',
    professional: 'Carlos',
    category: 'Programación'
  },
  {
    id: 3,
    title: 'Fotografía de producto',
    distance: '4.9 km',
    price: '120',
    professional: 'María',
    category: 'Fotografía'
  },
  {
    id: 4,
    title: 'Traducción de documentos',
    distance: '6.7 km',
    price: '133',
    professional: 'Sofía',
    category: 'Traducción'
  },
  {
    id: 5,
    title: 'Consultoría de marketing',
    distance: '1.6 km',
    price: '165',
    professional: 'Ayaan',
    category: 'Marketing'
  },
  {
    id: 6,
    title: 'Edición de video',
    distance: '2.1 km',
    price: '95',
    professional: 'Zara',
    category: 'Multimedia'
  }
]

export const Hero = () => {
  const [selectedCategory, setSelectedCategory] = useState('Diseño')
  const [jobsPerWeek, setJobsPerWeek] = useState(5)
  const [experienceLevel, setExperienceLevel] = useState('Intermedio')
  const [location, setLocation] = useState('Ciudad grande')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const categories = [
    // DIGITALES
    'Artes gráficas y diseño',
    'Programación y tecnología', 
    'Marketing Digital',
    'Video y animación',
    'Escritura y traducción',
    'Música y audio',
    'Negocios',
    // FÍSICOS
    'Salud y bienestar',
    'Mantenimiento del hogar',
    'Reparación de automóviles y motos',
    'Belleza y cuidado personal',
    'Eventos y entretenimiento',
    'Cuidado de mascotas',
    'Servicios profesionales',
    'Fotografía'
  ]

  // Clasificación de tipos de servicios
  const serviceTypes = {
    // DIGITALES
    'Artes gráficas y diseño': 'digital',
    'Programación y tecnología': 'digital',
    'Marketing Digital': 'digital',
    'Video y animación': 'digital',
    'Escritura y traducción': 'digital',
    'Música y audio': 'digital',
    'Negocios': 'digital',
    // FÍSICOS
    'Salud y bienestar': 'fisico',
    'Mantenimiento del hogar': 'fisico',
    'Reparación de automóviles y motos': 'fisico',
    'Belleza y cuidado personal': 'fisico',
    'Eventos y entretenimiento': 'fisico',
    'Cuidado de mascotas': 'fisico',
    'Servicios profesionales': 'fisico',
    'Fotografía': 'fisico'
  }
  
  // Precios base por categoría (promedio del mercado)
  const basePrices = {
    // DIGITALES
    'Artes gráficas y diseño': 180,
    'Programación y tecnología': 320,
    'Marketing Digital': 220,
    'Video y animación': 280,
    'Escritura y traducción': 130,
    'Música y audio': 250,
    'Negocios': 200,
    // FÍSICOS
    'Salud y bienestar': 160,
    'Mantenimiento del hogar': 100,
    'Reparación de automóviles y motos': 180,
    'Belleza y cuidado personal': 90,
    'Eventos y entretenimiento': 220,
    'Cuidado de mascotas': 70,
    'Servicios profesionales': 280,
    'Fotografía': 200
  }

  // Factores de experiencia (diferentes para físicos y digitales)
  const getExperienceMultiplier = (serviceType: string, level: string) => {
    if (serviceType === 'digital') {
      switch (level) {
        case 'Principiante': return 0.6
        case 'Intermedio': return 1.0
        case 'Avanzado': return 1.5
        case 'Experto': return 2.0
        default: return 1.0
      }
    } else {
      switch (level) {
        case 'Principiante': return 0.8
        case 'Intermedio': return 1.0
        case 'Avanzado': return 1.3
        case 'Experto': return 1.6
        default: return 1.0
      }
    }
  }

  // Factores de ubicación (más importante para servicios físicos)
  const locationMultipliers = {
    'Pueblo pequeño': 0.7,
    'Ciudad mediana': 0.85,
    'Ciudad grande': 1.0,
    'Capital': 1.3
  }

  // Factores de demanda por categoría
  const demandMultipliers = {
    // DIGITALES
    'Artes gráficas y diseño': 1.1,
    'Programación y tecnología': 1.3,
    'Marketing Digital': 1.2,
    'Video y animación': 1.1,
    'Escritura y traducción': 0.9,
    'Música y audio': 0.8,
    'Negocios': 1.0,
    // FÍSICOS
    'Salud y bienestar': 1.2,
    'Mantenimiento del hogar': 1.1,
    'Reparación de automóviles y motos': 1.0,
    'Belleza y cuidado personal': 1.1,
    'Eventos y entretenimiento': 0.9,
    'Cuidado de mascotas': 1.0,
    'Servicios profesionales': 1.1,
    'Fotografía': 1.0
  }

  // Cálculo inteligente de ganancias
  const calculateEarnings = () => {
    const basePrice = basePrices[selectedCategory as keyof typeof basePrices] || 200
    const serviceTypeKey = serviceTypes[selectedCategory as keyof typeof serviceTypes] as 'digital' | 'fisico'
    
    // Manejo seguro de multiplicadores de experiencia
    const experienceMultiplier = getExperienceMultiplier(serviceTypeKey, experienceLevel)
    
    // Ubicación solo afecta significativamente a servicios físicos
    let locationMultiplier = 1.0
    if (serviceTypeKey === 'fisico') {
      locationMultiplier = locationMultipliers[location as keyof typeof locationMultipliers] || 1.0
    } else {
      // Para servicios digitales, ubicación tiene impacto mínimo
      locationMultiplier = location === 'Capital' ? 1.05 : 1.0
    }
    
    const demandMultiplier = demandMultipliers[selectedCategory as keyof typeof demandMultipliers] || 1.0
    
    // Factores específicos del tipo de servicio con manejo seguro
    let volumeDiscount = 1.0
    let seasonalFactor = 1.0
    let travelFactor = 1.0
    let equipmentFactor = 1.0
    
    if (serviceTypeKey === 'digital') {
      volumeDiscount = jobsPerWeek > 15 ? 0.9 : jobsPerWeek > 8 ? 0.95 : 1.0
      seasonalFactor = 1.02
      travelFactor = 1.0
      equipmentFactor = 1.0
    } else if (serviceTypeKey === 'fisico') {
      volumeDiscount = jobsPerWeek > 12 ? 0.85 : jobsPerWeek > 6 ? 0.95 : 1.0
      seasonalFactor = 1.08
      travelFactor = 0.95
      equipmentFactor = 0.98
    }
    
    const adjustedPrice = basePrice * experienceMultiplier * locationMultiplier * demandMultiplier * volumeDiscount * seasonalFactor * travelFactor * equipmentFactor
    
    return Math.round(adjustedPrice * jobsPerWeek)
  }

  const weeklyEarnings = calculateEarnings()

  // Cálculo de ganancias mensuales y anuales
  const monthlyEarnings = weeklyEarnings * 4.33 // Promedio de semanas por mes
  const yearlyEarnings = weeklyEarnings * 52

  // Estimación de trabajos disponibles (diferente para físicos y digitales)
  const getAvailableJobs = () => {
    const baseJobs = {
      // DIGITALES (más disponibles globalmente)
      'Artes gráficas y diseño': 120,
      'Programación y tecnología': 200,
      'Marketing Digital': 150,
      'Video y animación': 95,
      'Escritura y traducción': 180,
      'Música y audio': 60,
      'Negocios': 100,
      // FÍSICOS (limitados por ubicación)
      'Salud y bienestar': 45,
      'Mantenimiento del hogar': 67,
      'Reparación de automóviles y motos': 28,
      'Belleza y cuidado personal': 42,
      'Eventos y entretenimiento': 25,
      'Cuidado de mascotas': 35,
      'Servicios profesionales': 22,
      'Fotografía': 30
    }
    return baseJobs[selectedCategory as keyof typeof baseJobs] || 50
  }

  const availableJobs = getAvailableJobs()

  // Obtener información específica del tipo de servicio
  const getServiceTypeInfo = () => {
    const type = serviceTypes[selectedCategory as keyof typeof serviceTypes]
    return {
      type,
      name: type === 'digital' ? 'Digital' : 'Físico',
      description: type === 'digital' 
        ? 'Servicios remotos sin límites geográficos' 
        : 'Servicios presenciales en tu área local',
      advantages: type === 'digital' 
        ? ['Sin costos de viaje', 'Escalabilidad global', 'Horarios flexibles']
        : ['Contacto directo', 'Servicio personalizado', 'Pago inmediato']
    }
  }

  const serviceInfo = getServiceTypeInfo()

  return (
    <section id="hero" className="py-8 md:py-16 lg:py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Columna izquierda - Contenido principal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-start"
          >
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1A1A1A] mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              La nueva app para{' '}
              <span className="text-[#BADB3A]">servicios físicos y digitales</span>{' '}
              bajo demanda
            </motion.h1>

            <motion.div
              className="flex items-center space-x-6 text-sm text-[#4A4A4A] mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              <div className="flex items-center">
                <MapPin className="w-4 h-4 mr-2 text-[#BADB3A]" />
                <span>Servicios locales y globales</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="w-4 h-4 mr-2 text-[#BADB3A]" />
                <span>Mejores ganancias</span>
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2 text-[#BADB3A]" />
                <span>Sin comisiones ocultas</span>
              </div>
            </motion.div>

            {/* Calculadora de ganancias */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-[#EDF5D7]">
                <h3 className="text-lg font-semibold text-[#1A1A1A] mb-4">
                  Mira cuánto podrías ganar:
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Categoría
                    </label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full px-3 py-2 border border-[#DADADA] rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-[#BADB3A] bg-white"
                    >
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Nivel de experiencia
                    </label>
                    <select
                      value={experienceLevel}
                      onChange={(e) => setExperienceLevel(e.target.value)}
                      className="w-full px-3 py-2 border border-[#DADADA] rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-[#BADB3A] bg-white"
                    >
                      <option value="Principiante">Principiante</option>
                      <option value="Intermedio">Intermedio</option>
                      <option value="Avanzado">Avanzado</option>
                      <option value="Experto">Experto</option>
                    </select>
                  </div>

                  {/* Campo de ubicación solo para servicios físicos */}
                  {serviceInfo.type === 'fisico' && (
                    <div>
                      <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                        Ubicación
                      </label>
                      <select
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full px-3 py-2 border border-[#DADADA] rounded-lg focus:ring-2 focus:ring-[#BADB3A] focus:border-[#BADB3A] bg-white"
                      >
                        <option value="Pueblo pequeño">Pueblo pequeño</option>
                        <option value="Ciudad mediana">Ciudad mediana</option>
                        <option value="Ciudad grande">Ciudad grande</option>
                        <option value="Capital">Capital</option>
                      </select>
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-2">
                      Trabajos por semana
                    </label>
                    
                    {/* Selector minimalista */}
                    <div className="grid grid-cols-4 gap-1 mb-2">
                      {[1, 3, 5, 8, 10, 12, 15, 20].map((num) => (
                        <button
                          key={num}
                          onClick={() => setJobsPerWeek(num)}
                          className={`py-2 px-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                            jobsPerWeek === num
                              ? 'bg-[#BADB3A] text-white shadow-md'
                              : 'bg-[#EDF5D7] text-[#4A4A4A] hover:bg-[#D8EB90]'
                          }`}
                        >
                          {num}
                        </button>
                      ))}
                    </div>
                    
                    {/* Información contextual minimalista */}
                    <div className="text-xs text-[#999999] text-center">
                      {jobsPerWeek <= 3 && "🚀 Inicio - Ideal para principiantes"}
                      {jobsPerWeek > 3 && jobsPerWeek <= 8 && "⭐ Balance - Buen equilibrio"}
                      {jobsPerWeek > 8 && jobsPerWeek <= 12 && "🔥 Profesional - Alto rendimiento"}
                      {jobsPerWeek > 12 && "🏆 Escalabilidad - Máximo volumen"}
                    </div>
                  </div>

                  {/* Información inteligente */}
                  <div className="bg-[#E7F3BB] rounded-lg p-4 space-y-3">
                    {/* Tipo de servicio */}
                    <div className="flex items-center justify-between">
                      <span className="text-[#1A1A1A] font-medium">Tipo de servicio:</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        serviceInfo.type === 'digital' 
                          ? 'bg-[#C9E365] text-[#1A1A1A]' 
                          : 'bg-[#D8EB90] text-[#1A1A1A]'
                      }`}>
                        {serviceInfo.name}
                      </span>
                    </div>

                    <div className="flex justify-between text-sm">
                      <span className="text-[#4A4A4A]">Precio promedio:</span>
                      <span className="font-medium text-[#1A1A1A]">
                        ${Math.round(basePrices[selectedCategory as keyof typeof basePrices] || 200).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-[#4A4A4A]">Demanda:</span>
                      <span className="font-medium text-[#1A1A1A]">
                        {demandMultipliers[selectedCategory as keyof typeof demandMultipliers] > 1 ? 'Alta' : 
                         demandMultipliers[selectedCategory as keyof typeof demandMultipliers] < 1 ? 'Baja' : 'Media'}
                      </span>
                    </div>

                    {/* Ventajas específicas del tipo de servicio */}
                    <div className="mt-3 pt-3 border-t border-[#D8EB90]">
                      <div className="text-xs text-[#4A4A4A] font-medium mb-1">Ventajas:</div>
                      <div className="flex flex-wrap gap-1">
                        {serviceInfo.advantages.map((advantage, index) => (
                          <span key={index} className="text-xs bg-[#D8EB90] text-[#1A1A1A] px-2 py-1 rounded">
                            {advantage}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Resultados */}
                  <div className="bg-[#D8EB90] rounded-lg p-4 text-center">
                    <p className="text-sm text-[#1A1A1A] mb-1">Ganancias por semana</p>
                    <p className="text-3xl font-bold text-[#1A1A1A]">
                      ${weeklyEarnings.toLocaleString()}
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-3 text-sm">
                      <div>
                        <p className="text-[#4A4A4A]">Por mes</p>
                        <p className="font-semibold text-[#1A1A1A]">${Math.round(monthlyEarnings).toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-[#4A4A4A]">Por año</p>
                        <p className="font-semibold text-[#1A1A1A]">${Math.round(yearlyEarnings).toLocaleString()}</p>
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-[#999999] text-center">
                    * Cálculos basados en datos del mercado, demanda local y factores estacionales.
                    Las ganancias pueden variar según tu experiencia, ubicación y demanda específica.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Botón CTA y información de lanzamiento */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="mt-6 sm:mt-8"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                {/* Botón principal */}
                <Button onClick={() => setIsModalOpen(true)} className="bg-[#BADB3A] hover:bg-[#A6C032] text-white font-semibold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
                  Unirse a la lista de espera
                </Button>

                {/* Separador */}
                <div className="hidden sm:block w-px h-8 bg-[#EDF5D7]"></div>

                {/* Información de lanzamiento */}
                <div className="text-center sm:text-left">
                  <div className="text-sm font-medium text-[#4A4A4A] mb-1">
                    Lanzamiento en 2026
                  </div>
                  <div className="text-xs text-[#999999]">
                    Sin cuotas de inscripción
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Columna derecha - Imagen representativa */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center items-center relative"
          >
            <motion.img 
              src="https://images.unsplash.com/photo-1611703371650-333f912c9311?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profesional trabajando"
              className="w-64 h-80 md:w-80 md:h-96 lg:w-96 lg:h-[28rem] object-cover rounded-2xl shadow-2xl -mt-8 md:-mt-12 lg:-mt-16"
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Imagen 2 en esquina inferior derecha */}
            <motion.img
              src="https://plus.unsplash.com/premium_photo-1661963875453-1bc004610423?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profesional adicional"
              className="hidden md:block absolute -bottom-32 -right-4 md:-bottom-40 md:-right-6 lg:-bottom-48 lg:-right-8 w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 object-cover rounded-2xl shadow-2xl -mt-8 md:-mt-12 lg:-mt-16"
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5
              }}
            />
          </motion.div>
        </div>
      </div>
      <RegistrationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  )
}

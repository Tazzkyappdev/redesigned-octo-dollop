'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Star, Users, MapPin, DollarSign, Clock } from 'lucide-react'
import { RegistrationModal } from '../modals/RegistrationModal'
import { WaitlistModal } from '../modals/WaitlistModal'

export const EarlyAccess = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false)

  const handleOpenModal = () => { setIsModalOpen(true) }
  const handleOpenWaitlist = () => { setIsWaitlistOpen(true) }

  const handleCloseModal = () => { setIsModalOpen(false) }
  const handleCloseWaitlist = () => { setIsWaitlistOpen(false) }

  return (
    <section className="py-20 md:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#E7F3BB]/30 to-[#D8EB90]/20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center space-x-2 bg-[#BADB3A] text-white px-6 py-3 rounded-full text-sm font-semibold mb-6 shadow-lg"
          >
            <Calendar className="w-4 h-4" />
            <span>Lanzamiento en 2025</span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#1A1A1A] mb-6 max-w-4xl mx-auto leading-tight"
          >
            Ofrece tus{' '}
            <span className="text-[#BADB3A]">servicios</span>
            <br />
            y haz crecer tu negocio
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-lg md:text-xl text-[#4A4A4A] max-w-2xl mx-auto mb-8"
          >
            Conecta con clientes locales y globales, gestiona tus servicios y recibe pagos de forma segura. 
            Únete a la comunidad de profesionales de Tazzky.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-8 md:gap-12"
          >
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#BADB3A] mb-2">15%</div>
              <div className="text-sm text-[#4A4A4A]">Comisión</div>
            </div>

            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-[#BADB3A] mb-2">24/7</div>
              <div className="text-sm text-[#4A4A4A]">Soporte</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Column - Features */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-[#BADB3A] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <MapPin className="w-6 h-6 text-white" />
              </div>
                             <div>
                 <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Alcance Local y Global</h3>
                 <p className="text-[#4A4A4A] leading-relaxed">
                   Conecta con clientes y construye una base de clientes estable.
                 </p>
               </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-[#BADB3A] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Pagos Seguros</h3>
                                 <p className="text-[#4A4A4A] leading-relaxed">
                   Recibe pagos automáticos. Sin esperar meses por cobrar tus servicios.
                 </p>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex items-start space-x-4"
            >
              <div className="w-12 h-12 bg-[#BADB3A] rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#1A1A1A] mb-2">Gestión Simplificada</h3>
                                 <p className="text-[#4A4A4A] leading-relaxed">
                   Gestiona tus servicios, cotizaciones y comunicación con clientes desde una sola app.
                 </p>
              </div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-8"
            >
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <div className="rounded-xl px-8 py-5 flex items-center justify-center">
                  <img src="/images/Apple.svg" alt="App Store" className="h-12 w-auto" />
                </div>
                <div className="rounded-xl px-8 py-5 flex items-center justify-center">
                  <img src="/images/Google.svg" alt="Google Play" className="h-12 w-auto" />
                </div>
              </div>
              <div className="text-center">
                <button 
                  onClick={handleOpenWaitlist}
                  className="bg-[#BADB3A] hover:bg-[#A6C032] text-white font-semibold py-4 px-8 rounded-xl text-lg transition-colors duration-200 shadow-lg"
                >
                  Unirse a la lista de espera
                </button>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Column - Lock Screen Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center lg:justify-center"
          >
            <div className="relative">
              <img 
                src="/images/Lock Screen.png" 
                alt="Tazzky App Lock Screen" 
                className="w-64 h-auto object-contain rounded-3xl shadow-2xl"
              />
              
              {/* Image 1 overlay */}
              <img 
                src="/images/1.png" 
                alt="Feature 1" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50 h-10 z-10 animate-fade-in-out"
                style={{
                  animation: 'fadeInOut 25s infinite',
                  animationDelay: '0s'
                }}
              />

              {/* Image 2 overlay */}
              <img 
                src="/images/2.png" 
                alt="Feature 2" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50 h-10 z-10 animate-fade-in-out"
                style={{
                  animation: 'fadeInOut 25s infinite',
                  animationDelay: '5s'
                }}
              />

              {/* Image 3 overlay */}
              <img 
                src="/images/3.png" 
                alt="Feature 3" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50 h-10 z-10 animate-fade-in-out"
                style={{
                  animation: 'fadeInOut 25s infinite',
                  animationDelay: '10s'
                }}
              />

              {/* Image 4 overlay */}
              <img 
                src="/images/4.png" 
                alt="Feature 4" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50 h-10 z-10 animate-fade-in-out"
                style={{
                  animation: 'fadeInOut 25s infinite',
                  animationDelay: '15s'
                }}
              />

              {/* Image 5 overlay */}
              <img 
                src="/images/5.png" 
                alt="Feature 5" 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-50 h-10 z-10 animate-fade-in-out"
                style={{
                  animation: 'fadeInOut 25s infinite',
                  animationDelay: '20s'
                }}
              />

              <style jsx>{`
                @keyframes fadeInOut {
                  0%, 100% { opacity: 0; }
                  4%, 16% { opacity: 1; }
                  20% { opacity: 0; }
                }
              `}</style>
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Modal de lista de espera */}
      <WaitlistModal isOpen={isWaitlistOpen} onClose={handleCloseWaitlist} />
    </section>
  )
}

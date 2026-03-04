'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { Poppins } from 'next/font/google'

const poppins = Poppins({
  weight: ['400', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
})

const faqs = [
  {
    id: 1,
    question: '¿Cómo gana dinero Tazzky si cobran 0% de comisión?',
    answer: 'Crear tu perfil y usar nuestras herramientas de gestión es 100% gratis, sin mensualidades. El 0% de comisión es un beneficio exclusivo para nuestra Fase BETA. Al lanzar la versión pública, cobraremos una tarifa fija y transparente por transacción exitosa, muy por debajo de lo que te quitan otras plataformas. Ganamos solo si tú ganas.'
  },
  {
    id: 2,
    question: '¿Cuándo y cómo recibo el dinero de mi trabajo?',
    answer: 'Al entregar tu proyecto terminado, el sistema libera los fondos automáticamente directo a tu cuenta. Como exigimos que el cliente deposite el 100% en nuestra garantía neutral desde el día uno, cobras al instante de la entrega. Sin excusas, sin demoras y sin perseguir a nadie.'
  },
  {
    id: 3,
    question: '¿Qué hago si el cliente me pide "cambios extra" que no estaban en el precio?',
    answer: 'Tu tiempo extra se respeta y se cobra. Si el cliente solicita modificaciones fuera del acuerdo original, Tazzky exige que fondee ese excedente por adelantado en la garantía neutral. No mueves un dedo en esos detalles extra hasta que el nuevo pago esté totalmente asegurado.'
  },
  {
    id: 4,
    question: '¿Qué pasa si el cliente cancela el proyecto a la mitad?',
    answer: 'Esa es la ventaja de la garantía neutral. Si el cliente intenta cancelar injustificadamente, tu pago ya está asegurado por la parte del trabajo que ya entregaste. Nuestro equipo revisa el chat interno y las evidencias para liberar los fondos con total justicia.'
  },
  {
    id: 5,
    question: '¿Tazzky me consigue los clientes o los traigo yo?',
    answer: 'Ambos. Tu perfil funciona como una vitrina para que los usuarios dentro de nuestra app te descubran y contraten. Pero tu verdadero superpoder es enviarle tu link directo de Tazzky a tus clientes externos (de redes sociales o WhatsApp) para cobrarles con nuestra garantía neutral y dejar de perseguir pagos.'
  },
  {
    id: 6,
    question: '¿Esto funciona si ofrezco servicios físicos o reparaciones locales?',
    answer: 'Totalmente. Ya sea que programes software o repares instalaciones eléctricas, el sistema es el mismo: tú defines tus paquetes, tus precios y tu zona de cobertura. El cliente fondea el pago antes de que salgas de tu casa o taller, asegurando tu tiempo y traslados.'
  }
]

export const FAQ = () => {
  const [expandedId, setExpandedId] = useState<number | null>(1)

  return (
    <section className="py-12 md:py-16 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className={`${poppins.className} text-2xl md:text-3xl lg:text-4xl font-bold text-[#BADB3A] scroll-mt-24`}
            style={{ fontWeight: 700 }}
          >
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq) => (
            <motion.div
              key={faq.id}
              className="border-b border-gray-700"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: faq.id * 0.05 }}
            >
              <button
                onClick={() => setExpandedId(expandedId === faq.id ? null : faq.id)}
                className="w-full py-4 md:py-5 flex items-start justify-between gap-4 text-left hover:opacity-80 transition-opacity"
              >
                <span
                  className={`${poppins.className} text-base md:text-lg font-semibold text-white flex-1 text-left`}
                  style={{ fontWeight: 600 }}
                >
                  {faq.question}
                </span>
                <motion.div
                  animate={{ rotate: expandedId === faq.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 mt-1"
                >
                  <ChevronDown className="w-5 h-5 md:w-6 md:h-6 text-[#BADB3A]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedId === faq.id && faq.answer && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="pb-4 md:pb-5">
                      <p
                        className={`${poppins.className} text-base text-gray-300 leading-relaxed`}
                      >
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

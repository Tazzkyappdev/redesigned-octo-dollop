'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui'
import { 
  MessageSquare, 
  CreditCard, 
  Star, 
  MapPin, 
  Calendar, 
  Shield,
  TrendingUp,
  Users
} from 'lucide-react'

const benefits = [
  {
    icon: MapPin,
    title: 'Promociona tu negocio en un mercado global y local',
    description: 'Conecta con clientes en tu área y construye una base de clientes local.'
  },
  {
    icon: MessageSquare,
    title: 'Envía cotizaciones y agenda trabajos',
    description: 'Comunícate directamente con clientes y gestiona tu agenda desde la app.'
  },
  {
    icon: CreditCard,
    title: 'Recibe pagos en 7 días',
    description: 'Pagos automáticos y seguros. Sin esperar meses por cobrar.'
  },
  {
    icon: Star,
    title: 'Revisa clientes',
    description: 'Lee reseñas y calificaciones antes de aceptar trabajos.'
  }
]

const tools = [
  {
    icon: Calendar,
    title: 'Gestión de agenda',
    description: 'Organiza todos tus trabajos pendientes en un solo lugar.'
  },
  {
    icon: MessageSquare,
    title: 'Chat directo',
    description: 'Comunícate con clientes sin compartir tu número personal.'
  },
  {
    icon: CreditCard,
    title: 'Pagos automáticos',
    description: 'Recibe pagos automáticamente una vez completado el trabajo.'
  },
  {
    icon: Shield,
    title: 'Soporte dedicado',
    description: 'Equipo de soporte disponible cuando lo necesites.'
  }
]

const stats = [
  {
    icon: TrendingUp,
    value: '40%',
    label: 'Más ganancias promedio'
  },
  {
    icon: Users,
    value: '3x',
    label: 'Más clientes'
  },
  {
    icon: Calendar,
    value: '60%',
    label: 'Menos tiempo de gestión'
  }
]

export const Benefits = () => {
  return (
    <section className="py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Layout horizontal: textos a la izquierda, imagen a la derecha */}
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Columna izquierda - Textos */}
          <motion.div
            className="flex-1 text-left"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Obtén el trabajo que quieres, cuando lo quieres
            </h2>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl">
              Tazzky conecta profesionales confiables con trabajos locales en minutos. 
              Obtén rápidamente la información que necesitas, ve fotos y evalúa clientes antes de aceptar trabajos.
            </p>
          </motion.div>

          {/* Columna derecha - Imagen */}
          <motion.div
            className="flex-1 flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Imagen de Unsplash sin marco */}
            <img 
              src="https://images.unsplash.com/photo-1672862273558-0608c644a41a?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Servicios Digitales"
              className="w-[500px] h-[400px] object-cover rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>

      </div>
    </section>
  )
}

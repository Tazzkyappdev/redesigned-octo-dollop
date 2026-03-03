'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { ProfessionalRegistrationForm } from '@/src/components/forms'
import { Footer } from '@/src/components/layout'
import { ChevronDown } from 'lucide-react'
import { motion } from 'framer-motion'

export default function ProfesionalesRegistroPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  // Agregar meta tag noindex al cargar la página
  useEffect(() => {
    const metaRobots = document.querySelector('meta[name="robots"]')
    if (!metaRobots) {
      const meta = document.createElement('meta')
      meta.name = 'robots'
      meta.content = 'noindex, nofollow'
      document.head.appendChild(meta)
    } else {
      metaRobots.setAttribute('content', 'noindex, nofollow')
    }
  }, [])

  const faqs = [
    {
      q: '¿Qué es Tazzky?',
      a: 'Tazzky es una plataforma que conecta a clientes con profesionales y negocios digitales de forma segura, facilitando la contratación de servicios, la gestión de solicitudes y la administración de pagos.'
    },
    {
      q: '¿Tiene algún costo registrarme en Tazzky?',
      a: 'No. El registro en Tazzky es totalmente gratuito.'
    },
    {
      q: '¿Cómo recibiré pagos por mis servicios?',
      a: 'Los pagos se gestionan exclusivamente a través de los mecanismos habilitados por Tazzky. Una vez que el servicio se marca como completado y validado, el pago es liberado a tu cuenta bancaria.'
    },
    {
      q: '¿Tazzky cobra comisión?',
      a: 'Actualmente no se aplica comisión por los servicios durante esta etapa. En el futuro, se notificará con anticipación cualquier esquema de comisión aplicable.'
    },
    {
      q: '¿Puedo cobrar directamente al cliente?',
      a: 'No. Todos los cobros deben realizarse exclusivamente a través de Tazzky. Cualquier cobro externo está estrictamente prohibido y puede ser motivo de baja.'
    },
    {
      q: '¿Qué pasa si necesito comprar materiales para un servicio?',
      a: 'El costo de los materiales deberá ser informado previamente al cliente y gestionado a través de Tazzky. El monto será retenido junto con tu mano de obra y se te liberará una vez concluido el servicio.'
    },
    {
      q: '¿Cómo me asignarán servicios?',
      a: 'Tazzky te contactará por los canales oficiales una vez que exista una solicitud compatible con tu perfil, zona y disponibilidad.'
    },
    {
      q: '¿Tazzky garantiza que recibiré servicios?',
      a: 'No. Tazzky no garantiza un número mínimo de contrataciones. Las asignaciones dependen de la demanda de clientes y de tu disponibilidad.'
    },
    {
      q: '¿Qué pasa si no puedo atender un servicio asignado?',
      a: 'Deberás notificarlo de inmediato para que el servicio pueda ser reasignado sin afectar al cliente.'
    },
    {
      q: '¿Puedo rechazar servicios?',
      a: 'Sí. Puedes aceptar o rechazar servicios, siempre y cuando lo hagas de forma oportuna para no afectar la operación.'
    },
    {
      q: '¿Puedo subir mis precios cuando quiera?',
      a: 'Sí. Tú defines libremente tu precio de mano de obra. Solo debes informar cualquier cambio antes de aceptar un servicio.'
    },
    {
      q: '¿Cómo sabré que el cliente ya pagó?',
      a: 'Tazzky te confirmará cuando el pago haya sido realizado y validado antes de que ejecutes cualquier servicio.'
    },
    {
      q: '¿Qué pasa si el cliente cancela?',
      a: 'Cada caso será evaluado por Tazzky conforme a las políticas de operación. En caso de que existan cargos procedentes, se te notificará.'
    },
    {
      q: '¿Qué pasa si el cliente no queda satisfecho?',
      a: 'Tazzky podrá solicitar evidencia del servicio realizado. Cada caso se analizará de forma individual para proteger tanto al cliente como al profesionista.'
    },
    {
      q: '¿Puedo dar mi número al cliente?',
      a: 'No. La comunicación debe mantenerse a través de los canales autorizados por Tazzky, salvo que la plataforma indique lo contrario.'
    },
    {
      q: '¿Mis datos están protegidos?',
      a: 'Sí. Tazzky utiliza medidas de seguridad para proteger la información proporcionada por los profesionales conforme a la normativa aplicable.'
    },
    {
      q: '¿Puedo darme de baja cuando quiera?',
      a: 'Sí. Puedes solicitar tu baja de la plataforma en cualquier momento sin penalización, siempre que no existan servicios en curso.'
    },
    {
      q: '¿Tazzky es mi patrón o empleador?',
      a: 'No. La relación entre Tazzky y el profesionista es exclusivamente comercial. Tú prestas tus servicios de manera independiente.'
    },
    {
      q: '¿Necesito tener empresa constituida para registrarme?',
      a: 'No. Puedes registrarte como persona física o como negocio.'
    },
    {
      q: '¿Qué pasa después de enviar el formulario?',
      a: 'Tus datos serán revisados por Tazzky. Si tu perfil es aprobado, se te brindará acceso a los canales de operación.'
    }
  ]
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-950 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-lime-400/10 rounded-full blur-3xl"></div>
      </div>

      {/* Contenido */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <div className="flex justify-center mb-6">
                <Image src="/Logo Principal Horizontal (3).png" alt="Tazzky" width={260} height={78} />
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
                Haz crecer tu negocio
              </h1>
              
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Accede a miles de clientes buscando tus servicios. Gestiona tus proyectos, recibe pagos seguros y construye tu reputación.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-2xl">✓</span>
                  <span>Sin costos de registro</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-2xl">✓</span>
                  <span>Verificación en 24-48 horas</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-2xl">✓</span>
                  <span>Pagos 100% seguros</span>
                </div>
              </div>
            </div>

            {/* Estadísticas */}

          </div>
        </section>

        {/* Por qué unirte a Tazzky */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-5xl mx-auto">
            <motion.h2 
              className="text-4xl font-bold text-white mb-16 text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              ¿Por qué unirte a Tazzky?
            </motion.h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {[
                {
                  title: 'Clientes sin invertir en publicidad',
                  icon: '/images/1.svg'
                },
                {
                  title: 'Pagos protegidos',
                  icon: '/images/2.svg'
                },
                {
                  title: 'Mayor formalidad',
                  icon: '/images/3.svg'
                },
                {
                  title: 'Reputación digital',
                  icon: '/images/4.svg'
                },
                {
                  title: 'Soporte directo',
                  icon: '/images/5.svg'
                }
              ].map((item, i) => (
                <motion.div 
                  key={i}
                  className="bg-gradient-to-br from-slate-800/70 to-slate-700/40 border border-lime-400/30 rounded-2xl p-6 text-center hover:border-lime-400/60 hover:shadow-lg hover:shadow-lime-400/20 transition cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ translateY: -8, scale: 1.05 }}
                >
                  <motion.div 
                    className="w-20 h-20 mx-auto mb-4 flex items-center justify-center"
                    whileHover={{ rotate: 10, scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <img src={item.icon} alt={item.title} className="w-full h-full object-contain" />
                  </motion.div>
                  <h3 className="text-white font-bold text-lg">{item.title}</h3>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cómo Funciona - Timeline Horizontal */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-16 text-center">Cómo Funciona</h2>
            
            <div className="relative">
              {/* Timeline Items */}
              <div className="grid md:grid-cols-4 gap-8">
                {[
                  {
                    number: 1,
                    title: 'Te registras',
                    description: 'Completa tu perfil con tus datos, servicios y disponibilidad',
                    icon: '📝'
                  },
                  {
                    number: 2,
                    title: 'Recibes solicitudes',
                    description: 'Clientes te contactan para solicitar tus servicios',
                    icon: '📨'
                  },
                  {
                    number: 3,
                    title: 'Realizas el servicio',
                    description: 'Ejecuta el trabajo acordado con el cliente',
                    icon: '⚙️'
                  },
                  {
                    number: 4,
                    title: 'Recibes tu pago',
                    description: 'Obtén tu pago directamente en tu cuenta bancaria',
                    icon: '💰'
                  }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center">
                    {/* Number Badge */}
                    <div className="bg-gradient-to-r from-lime-400 to-green-500 text-slate-950 font-bold text-lg rounded-full w-8 h-8 flex items-center justify-center mb-4">
                      {step.number}
                    </div>

                    {/* Icon Circle */}
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-lime-400 to-green-500 flex items-center justify-center text-3xl shadow-lg shadow-lime-400/50 mb-6">
                      {step.icon}
                    </div>

                    {/* Content */}
                    <div className="text-center">
                      <h3 className="text-white font-bold text-lg mb-3">{step.title}</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Formulario */}
        <section className="container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white mb-4 text-center bg-gradient-to-r from-lime-300 via-green-400 to-lime-300 bg-clip-text text-transparent">Completa tu registro</h2>
            <p className="text-slate-200 text-center mb-12">5 pasos simples para empezar a recibir clientes hoy</p>
            <ProfessionalRegistrationForm />
          </div>

          {/* What happens next */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-12 text-center bg-gradient-to-r from-lime-300 via-green-400 to-lime-300 bg-clip-text text-transparent">¿Qué pasa después?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gradient-to-br from-lime-400/10 to-green-500/10 border border-lime-400/40 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-lime-400 mb-2">1</div>
                <h4 className="text-white font-bold mb-2">Envía tu registro</h4>
                <p className="text-slate-300 text-sm">Completa el formulario con tus datos y servicios</p>
              </div>

              <div className="bg-gradient-to-br from-lime-400/10 to-green-500/10 border border-lime-400/40 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-lime-400 mb-2">2</div>
                <h4 className="text-white font-bold mb-2">Revisamos tu perfil</h4>
                <p className="text-slate-300 text-sm">Nuestro equipo validará tu información y experiencia</p>
              </div>

              <div className="bg-gradient-to-br from-lime-400/10 to-green-500/10 border border-lime-400/40 rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-lime-400 mb-2">3</div>
                <h4 className="text-white font-bold mb-2">¡Te contactamos!</h4>
                <p className="text-slate-300 text-sm">Si eres aprobado, nos comunicaremos contigo</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="container mx-auto px-4 py-20 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-white mb-4">Preguntas Frecuentes</h2>
              <p className="text-slate-300">Todo lo que necesitas saber sobre Tazzky</p>
            </div>

            <div className="space-y-3">
              {faqs.map((item, i) => (
                <div 
                  key={i} 
                  className="bg-gradient-to-br from-slate-800/70 to-slate-700/40 border border-lime-400/30 rounded-xl overflow-hidden transition-all duration-300 hover:border-lime-400/60"
                >
                  <button
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                    className="w-full flex items-center justify-between gap-4 p-5 text-left group"
                  >
                    <h3 className="text-base md:text-lg font-bold text-white group-hover:text-lime-300 transition flex-1">
                      {item.q}
                    </h3>
                    <ChevronDown 
                      className={`w-5 h-5 text-lime-400 transition-transform duration-300 flex-shrink-0 ${
                        openFAQ === i ? 'rotate-180' : ''
                      }`}
                    />
                  </button>
                  
                  <div 
                    className={`overflow-hidden transition-all duration-300 ${
                      openFAQ === i ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5 pt-0">
                      <p className="text-slate-300 leading-relaxed text-sm md:text-base">
                        {item.a}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <p className="text-xs text-slate-400 italic max-w-2xl mx-auto mb-8">
                Tazzky se reserva el derecho de actualizar estas políticas en cualquier momento para mejorar la operación y seguridad de la plataforma.
              </p>

              <div className="bg-gradient-to-br from-slate-800/50 to-slate-700/30 border border-lime-400/40 rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-white mb-4">¿Tienes más dudas?</h3>
                <p className="text-slate-300 mb-6">Contáctanos</p>
                
                <div className="space-y-4">
                  <a 
                    href="mailto:hola@tazzky.com" 
                    className="flex items-center justify-center gap-3 text-lime-300 hover:text-lime-200 transition text-lg"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    hola@tazzky.com
                  </a>

                  <div className="flex items-center justify-center gap-6 pt-4">
                    <a 
                      href="https://www.instagram.com/tazzkyapp/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-lime-300 transition"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                      Instagram
                    </a>

                    <a 
                      href="https://x.com/Tazzkyapp" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-slate-300 hover:text-lime-300 transition"
                    >
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                      </svg>
                      X (Twitter)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}

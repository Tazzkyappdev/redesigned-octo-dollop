'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

function TerminosCondicionesContent() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState('terminos')

  useEffect(() => {
    const tab = searchParams.get('tab')
    if (tab) {
      setActiveTab(tab)
    }
  }, [searchParams])

  const tabs = [
    { id: 'terminos', label: 'Términos y Condiciones' },
    { id: 'privacidad', label: 'Política de Privacidad' },
    { id: 'uso', label: 'Términos de Uso' },
    { id: 'cookies', label: 'Política de Cookies' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/5 backdrop-blur-xl border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/clientes" className="flex items-center space-x-2 text-white hover:text-[#BADB3A] transition-colors">
              <ChevronLeft className="w-5 h-5" />
              <span>Volver</span>
            </Link>
            <h1 className="text-xl font-bold text-white">Legal</h1>
            <div className="w-12"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Tabs */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 overflow-x-auto pb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'bg-[#BADB3A] text-black'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 md:p-8 max-w-4xl mx-auto">
            {activeTab === 'terminos' && (
              <div className="space-y-6 text-gray-100">
                <h2 className="text-3xl font-bold text-white mb-6">Términos y Condiciones</h2>
                
                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">1. Aceptación de Términos</h3>
                  <p>Al acceder y utilizar la plataforma Tazzky, aceptas estar vinculado por estos Términos y Condiciones. Si no estás de acuerdo con alguna parte de estos términos, no debes utilizar nuestros servicios.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">2. Descripción del Servicio</h3>
                  <p>Tazzky es una plataforma de servicios que conecta a usuarios con profesionales y freelancers. Proporcionamos infraestructura para facilitar transacciones, pagos garantizados y un sistema de reputación para ambas partes.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">3. Elegibilidad</h3>
                  <p>Debes ser mayor de 18 años y cumplir con las leyes locales para usar Tazzky. Los usuarios profesionales deben estar en situación legal para prestar servicios en su jurisdicción.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">4. Cuenta de Usuario</h3>
                  <p>Eres responsable de mantener la confidencialidad de tu contraseña y de toda actividad bajo tu cuenta. Debes proporcionar información precisa y actualizada durante el registro. Nos reservamos el derecho de suspender o cancelar cuentas que violen estas condiciones.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">5. Conducta del Usuario</h3>
                  <p>No debes utilizar Tazzky para:</p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li>Actividades ilegales o fraudulentas</li>
                    <li>Acoso, discriminación u abuso hacia otros usuarios</li>
                    <li>Violación de derechos de propiedad intelectual</li>
                    <li>Interferencia con la seguridad o funcionalidad de la plataforma</li>
                    <li>Intentos de acceso no autorizado</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">6. Pagos y Comisiones</h3>
                  <p>Tazzky procesa pagos entre usuarios. Los usuarios profesionales acuerdan que Tazzky puede aplicar comisiones en transacciones. Los detalles específicos sobre comisiones serán comunicados antes de completar cualquier transacción.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">7. Sistema de Garantía</h3>
                  <p>Nuestro sistema de garantía protege transacciones hasta cierto límite. Ambas partes deben cumplir con sus obligaciones acordadas para que el sistema funcione correctamente.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">8. Limitación de Responsabilidad</h3>
                  <p>Tazzky no es responsable por daños indirectos, incidentales o consecuentes derivados del uso de nuestros servicios. Nuestra responsabilidad máxima se limita al monto de la transacción en cuestión.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">9. Terminación</h3>
                  <p>Podemos terminar tu acceso a Tazzky en cualquier momento si violas estos términos. Tras la terminación, debes cesar todo uso de la plataforma.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">10. Cambios a los Términos</h3>
                  <p>Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán efectivos al ser publicados. El uso continuado constituyye aceptación de cambios.</p>
                </section>
              </div>
            )}

            {activeTab === 'privacidad' && (
              <div className="space-y-6 text-gray-100">
                <h2 className="text-3xl font-bold text-white mb-6">Política de Privacidad</h2>
                
                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">1. Información que Recopilamos</h3>
                  <p>Recopilamos información personal incluyendo:</p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li>Nombre, correo electrónico y número de teléfono</li>
                    <li>Información de perfil y descripción de servicios</li>
                    <li>Datos de pago y información bancaria</li>
                    <li>Historial de transacciones</li>
                    <li>Información de uso de la plataforma</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">2. Cómo Usamos tu Información</h3>
                  <p>Utilizamos tu información para:</p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li>Proporcionar y mejorar nuestros servicios</li>
                    <li>Procesar pagos y transacciones</li>
                    <li>Comunicarnos contigo sobre tu cuenta</li>
                    <li>Prevenir fraude y garantizar seguridad</li>
                    <li>Cumplir con obligaciones legales</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">3. Protección de Datos</h3>
                  <p>Implementamos medidas de seguridad técnicas y organizacionales para proteger tu información personal contra acceso no autorizado, alteración o divulgación.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">4. Compartir Información</h3>
                  <p>No vendemos tu información personal. Podemos compartir información con terceros si es necesario para:</p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li>Proveedores de servicios de pago</li>
                    <li>Autoridades legales cuando sea requerido</li>
                    <li>Proteger derechos de seguridad</li>
                    <li>Operaciones comerciales legítimas</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">5. Tus Derechos</h3>
                  <p>Tienes el derecho a:</p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li>Acceder a tu información personal</li>
                    <li>Solicitar correcciones de tu información</li>
                    <li>Solicitar eliminación de tu información</li>
                    <li>Oponerte al procesamiento de datos</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">6. Cookies y Tecnologías de Rastreo</h3>
                  <p>Utilizamos cookies y tecnologías similares para mejorar tu experiencia. Puedes controlar las cookies a través de la configuración de tu navegador.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">7. Retención de Datos</h3>
                  <p>Conservamos tu información personal solo el tiempo necesario para proporcionar servicios y cumplir obligaciones legales. Puedes solicitar la eliminación de tu información en cualquier momento.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">8. Cambios a esta Política</h3>
                  <p>Podemos actualizar esta política de privacidad periódicamente. Las actualizaciones serán efectivas al publicarse en nuestro sitio.</p>
                </section>
              </div>
            )}

            {activeTab === 'uso' && (
              <div className="space-y-6 text-gray-100">
                <h2 className="text-3xl font-bold text-white mb-6">Términos de Uso</h2>
                
                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">1. Licencia de Uso</h3>
                  <p>Tazzky te otorga una licencia limitada, no exclusiva e intransferible para usar la plataforma para propósitos personales y comerciales legítimos, sujeto a estos términos.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">2. Restricciones de Uso</h3>
                  <p>No debes:</p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li>Copiar, modificar o crear derivados de la plataforma</li>
                    <li>Descompilar o intentar obtener el código fuente</li>
                    <li>Usar la plataforma de forma que viole leyes aplicables</li>
                    <li>Interferir con la funcionalidad o seguridad</li>
                    <li>Usar automatización sin autorización</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">3. Contenido de Usuario</h3>
                  <p>Eres responsable de todo contenido que publiques. Al publicar, concedes a Tazzky derechos para usar, mostrar y distribuir tu contenido en la plataforma.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">4. Propiedad Intelectual</h3>
                  <p>Tazzky y sus características son propiedad de Tazzky o sus licenciantes. No adquieres derechos de propiedad al usar la plataforma.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">5. Soporte y Mantenimiento</h3>
                  <p>Nos esforzamos por mantener la plataforma disponible, pero no garantizamos acceso ininterrumpido. Realizamos mantenimiento regularmente que puede causar interrupciones temporales.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">6. Reclamos de Propiedad Intelectual</h3>
                  <p>Si crees que tu trabajo fue utilizado sin autorización, contáctanos con detalles. Investigaremos y tomaremos acciones apropiadadas.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">7. Disponibilidad</h3>
                  <p>Aunque nos esforzamos por proporcionar servicio continuo, la plataforma se proporciona "tal cual" sin garantías de disponibilidad ininterrumpida.</p>
                </section>
              </div>
            )}

            {activeTab === 'cookies' && (
              <div className="space-y-6 text-gray-100">
                <h2 className="text-3xl font-bold text-white mb-6">Política de Cookies</h2>
                
                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">1. ¿Qué son las Cookies?</h3>
                  <p>Las cookies son pequeños archivos de texto que se guardan en tu dispositivo cuando visitas nuestro sitio. Ayudan a recordar tus preferencias y mejorar tu experiencia.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">2. Tipos de Cookies que Usamos</h3>
                  <ul className="list-disc list-inside space-y-2">
                    <li><strong>Esenciales:</strong> Necesarias para el funcionamiento básico</li>
                    <li><strong>Funcionales:</strong> Recuerdan tus preferencias</li>
                    <li><strong>Analíticas:</strong> Nos ayudan a entender cómo usas la plataforma</li>
                    <li><strong>Marketing:</strong> Para mostrar contenido relevante</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">3. Control de Cookies</h3>
                  <p>Puedes controlar las cookies a través de:</p>
                  <ul className="list-disc list-inside space-y-2 mt-3">
                    <li>Configuración de tu navegador</li>
                    <li>Nuestras preferencias de privacidad</li>
                    <li>Herramientas de exclusión voluntaria</li>
                  </ul>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">4. Cookies de Terceros</h3>
                  <p>Algunos servicios terceros pueden colocar cookies en tu dispositivo para análisis y publicidad. No controlamos estas cookies, pero puedes optar por no participar.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">5. Rastreo Entre Sitios</h3>
                  <p>No participamos en rastreo entre sitios para publicidad dirigida sin tu consentimiento previo.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">6. Actualizaciones de Política</h3>
                  <p>Esta política puede actualizarse periódicamente. Te notificaremos cambios significativos a través de tu cuenta o correo electrónico.</p>
                </section>

                <section>
                  <h3 className="text-xl font-bold text-[#BADB3A] mb-3">7. Contacto</h3>
                  <p>Si tienes preguntas sobre nuestro uso de cookies, contáctanos en: <a href="mailto:privacidad@tazzky.com" className="text-[#BADB3A] hover:text-white transition-colors">privacidad@tazzky.com</a></p>
                </section>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default function TerminosCondiciones() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    }>
      <TerminosCondicionesContent />
    </Suspense>
  )
}

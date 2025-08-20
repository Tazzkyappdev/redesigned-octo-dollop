'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Estructura de datos completa con categorías y servicios
const categoriesData = {
  digitales: {
    title: 'DIGITALES',
    categories: [
      {
        name: 'Artes gráficas y diseño',
      icon: '🎨',
        color: 'from-blue-500 to-blue-600',
        services: [
          'Diseño de logos, guías de estilo para marcas, tarjetas de presentación y papelería, y fuentes y topografía',
          'Diseño web, diseño de aplicaciones, diseño UX, diseño de landing page y diseño de iconos',
          'Ilustraciones, ilustraciones de libros infantiles, retratos y caricaturas, dibujos animados y cómics, diseño de patrones, diseño de tatuajes',
          'Arquitectura y diseño de interiores, paisajismo, ingenieria de edificacion, modelado de información de construcción (BIM)',
          'Diseño industrial y de productos, modelado de personajes, game art, artes gráficas para streamers y diseño de stand comercial',
          'Edición de imágenes, diseño de presentaciones, diseño de infografías, vectorización, diseño de curriculums',
          'Diseño de flyers, diseño de folletos, diseño de posters, diseño de catálogos, diseño de menús, diseño de invitaciones',
          'Diseño de packing y etiquetas, diseño de libros, portadas de libros, diseño de portada de álbumes, diseño de portada para podcast',
          'Arquitectura 3D, Diseño industrial en 3D, moda y prendas de vestir en 3D, paisaje en 3D, diseño de joyas en 3D',
          'Diseño de redes sociales, diseño de miniaturas, diseño de correo electrónico, banners web, diseño de carteles',
          'Camisetas y artículos, diseño de moda y diseño de joyas'
        ]
      },
      {
        name: 'Programación y tecnología',
        icon: '💻',
        color: 'from-green-500 to-green-600',
        services: [
          'Desarrollo de sitios web, mantenimiento de sitios web, wordpress, shopify, sitios web personalizados',
          'Aplicaciones web, aplicaciones de escritorio, desarrollo de videojuegos, desarrollo de chatbots, extensiones de navegador',
          'Desarrollo de software, desarrollo de IA, API e integraciones, redacción de scripts, desarrollo de plugins',
          'Desarrollo de aplicaciones móviles, aplicaciones multiplataforma, desarrollo de aplicaciones android, desarrollo de aplicaciones IOS, mantenimiento de aplicaciones móviles',
          'Wix, webflow, godaddy, squarespace, woocommerce',
          'Soporte y TI, devops y nube, ciberseguridad, desarrollo para streamers, conversión de archivos'
        ]
      },
      {
        name: 'Marketing Digital',
      icon: '📈',
        color: 'from-purple-500 to-purple-600',
        services: [
          'Posicionamiento web (SEO), marketing de motores de búsqueda, SEO local, SEO para E-commerce, SEO de video',
          'Marketing para redes sociales, redes sociales pagas, marketing de influencia, community management',
          'Video marketing, marketing para e-commerce, email marketing, publicación de invitados, marketing de afiliados, publicidad display, relaciones públicas',
          'Estrategia de marketing, asesoramiento de marketing y web analytics',
          'Promoción musical, marketing de podcast, marketing de libros y libros electrónicos, marketing de aplicaciones móviles'
        ]
      },
      {
        name: 'Video y animación',
        icon: '🎬',
        color: 'from-red-500 to-red-600',
        services: [
          'Edición de video, efectos visuales, videos de intros, edición de plantillas de video y subtítulos y leyendas',
          'Animación de personajes, animación para niños, animación para streamers, montaje',
          'Animación de logos, animación web, animación de texto',
          'Anuncios y comerciales en video, videos en redes sociales, videos musicales y videos de diapositivas',
          'Video explicativo animado, vídeos de presentadores, explicacion con imagenes reales, produccion de video de eLearning',
          'Animacion de productos en 3D, videos de productos para e-commerce, videos corporativos, vistas previas de aplicaciones y sitios web',
          'De artículo a video, trailers para videojuegos, promociones inmobiliarias, trailers para libros y otros'
        ]
      },
      {
        name: 'Escritura y traducción',
        icon: '✍️',
        color: 'from-yellow-500 to-yellow-600',
        services: [
          'Artículos y blogs, estrategia de contenido, contenido para sitios web, redacción de guiones, escritura creativa, redacción de podcast, redacción de discursos, investigación y resúmenes',
          'Revisión y edición, consejos de escritura',
          'Traducción, transcripción',
          'Voz y tono de marca, nombre y lemas comerciales, estudio de caso, descripciones de productos, copia de ventas, copia del anuncio, copia de correo electrónico, copia de redes sociales, comunicados de prensa, escritura de experiencia de usuario',
          'Reanudar la redacción, cartas de presentación, descripciones de trabajo',
          'Desarrollo de contenido de aprendizaje electrónico, escritura técnica, escritura de concesión'
        ]
      },
      {
        name: 'Música y audio',
        icon: '🎵',
        color: 'from-pink-500 to-pink-600',
        services: [
          'Productores y compositores, compositores, hacer ritmo, jingles e introducciones',
          'Mezcla y masterizacion, edicion de audio, afinación vocal, logotipo de audio y marca sonica',
          'Narración, producción de podcasts, producción de audiolibros, producción de anuncios de audio',
          'Lecciones de musica en línea, transcripción de música, consejos sobre música y audio',
          'Diseño de sonido, presets de sintetizador'
        ]
      },
      {
        name: 'Negocios',
        icon: '💼',
        color: 'from-indigo-500 to-indigo-600',
        services: [
          'Registración de negocio, planes de negocio, plataformas de presentación, consultoría de inicio, investigación de mercado',
          'Gestión de comercio electrónico, consultoría de RRHH, gestión de proyectos, gestión de la cadena de suministro, consulta de trabajo',
          'Solicitudes y registros, documentos legales y contratos, consultoría jurídica',
          'Consultoría fiscal, contabilidad y teneduría de libros, consulta financiera, gestión ERP',
          'Ventas, generación líder, centro de llamadas, atención al cliente, gestión de CRM',
          'Gestión de productos, comprobación de hechos, gestión de eventos'
        ]
      }
    ]
  },
  fisicos: {
    title: 'FÍSICOS',
    categories: [
      {
        name: 'Salud y bienestar',
        icon: '🏥',
        color: 'from-green-400 to-green-500',
        services: [
          'Consulta general, curaciones y seguimiento postoperatorio, control de enfermedades crónicas',
          'Toma de presión, glucosa y temperatura, Administración de medicamentos, Cuidados paliativos, Cambio de sondas y catéteres, Atención a pacientes inmovilizados',
          'Acompañamiento y asistencia básica, Control de medicamentos, Actividades recreativas y físicas, Higiene personal y alimentación, Asistencia nocturna o por horas',
          'Examen visual a domicilio, Ajuste y reparación de armazones, Prueba de visión computarizada, Seguimiento de salud visual',
          'Masaje relajante, Masaje descontracturante, Masaje linfático, Masaje deportivo, Masaje prenatal',
          'Terapia individual (presencial/online), Psicología infantil, Terapia de pareja, Apoyo emocional para crisis, Evaluación psicológica',
          'Consulta nutricional inicial, Plan de alimentación personalizado, Control de peso, Asesoría para nutrición deportiva, Nutrición infantil o clínica'
        ]
      },
      {
        name: 'Mantenimiento del hogar',
      icon: '🏠',
        color: 'from-orange-500 to-orange-600',
        services: [
          'Reparación de fugas, Instalación de grifería y sanitarios, Desazolve de tuberías, Revisión de presión de agua',
          'Reparación de cortos o apagones, Instalación de enchufes e interruptores, Instalación de lámparas o ventiladores, Mantenimiento de cableado',
          'Lavadoras y secadoras, Refrigeradores y congeladores, Estufas y hornos, Microondas y cafeteras',
          'Podado y desmalezado, Mantenimiento de áreas verdes, Decoración con plantas, Sistemas de riego',
          'Limpieza y mantenimiento químico, Revisión de filtros y bombas, Reparaciones menores, Control de niveles de agua',
          'Apertura de puertas, Cambio de cerraduras, Duplicado de llaves, Instalación de sistemas de seguridad',
          'Limpieza general o profunda, Limpieza post-obra, Lavado y planchado de ropa, Servicio de limpieza por horas'
        ]
      },
      {
        name: 'Reparación de automóviles y motos',
        icon: '🚗',
        color: 'from-gray-500 to-gray-600',
        services: [
          'Diagnóstico de fallas, Cambio de aceite, Reparación de motor, Revisión de frenos y suspensión',
          'Reparación de golpes o rayones, Pintura completa o parcial, Pulido y encerado, Restauración estética',
          'Revisión de niveles y filtros, Ajustes de motor, Alineación y balanceo, Inspección general'
        ]
      },
      {
        name: 'Belleza y cuidado personal',
        icon: '💄',
        color: 'from-pink-400 to-pink-500',
        services: [
          'Corte y peinado, Tintes y mechas, Tratamientos capilares, Alisados y permanentes',
          'Limpieza facial profunda, Depilación con cera o láser, Tratamientos antiacné o antiarrugas, Exfoliaciones y mascarillas',
          'Manicura tradicional o semipermanente, Pedicura spa, Decoración de uñas, Uñas acrílicas o de gel'
        ]
      },
      {
        name: 'Eventos y entretenimiento',
        icon: '🎉',
        color: 'from-purple-400 to-purple-500',
        services: [
          'Planeación y coordinación completa, Logística y proveedores, Decoración temática, Asistencia el día del evento',
          'Audio e iluminación, Tarimas y carpas, Mobiliario y vajilla, Proyectores y pantallas',
          'Shows infantiles, Payasos y botargas, Animadores para adultos, Personajes temáticos'
        ]
      },
      {
        name: 'Cuidado de mascotas',
        icon: '🐕',
        color: 'from-yellow-400 to-yellow-500',
        services: [
          'Paseos programados, Guardería a domicilio, Alojamiento temporal, Supervisión diaria',
          'Vacunación y desparasitación, Revisión general, Aplicación de tratamientos, Control de enfermedades'
        ]
      },
      {
        name: 'Servicios profesionales',
        icon: '⚖️',
        color: 'from-blue-400 to-blue-500',
        services: [
          'Asuntos civiles, penales y laborales, Redacción de contratos, Consultoría jurídica, Representación legal',
          'Declaraciones fiscales, Contabilidad para pymes o freelancers, Asesoría financiera personal o empresarial, Gestión de nómina y facturación'
        ]
      },
      {
        name: 'Fotografía',
        icon: '📸',
        color: 'from-red-400 to-red-500',
        services: [
          'Bodas y XV años, Cumpleaños y reuniones, Cobertura completa y edición, Álbum impreso o digital',
          'Productos para e-commerce, Fotografía 360°, Fondo blanco o ambientado, Edición profesional',
          'Platillos para menú o redes, Iluminación y estilismo, Composición profesional, Fotos para delivery apps',
          'Book profesional, Sesiones para modelos, Retratos urbanos o editoriales, Branding personal',
          'Casas, departamentos y terrenos, Interiorismo, Drone y tomas panorámicas, Edición HDR',
          'Teatro y espectáculos, Conciertos y festivales, Backstage y ensayo, Retrato artístico'
        ]
      }
    ]
  }
}

export const Categories = () => {
  const [selectedType, setSelectedType] = useState<'digitales' | 'fisicos'>('digitales')
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  }

  const currentData = categoriesData[selectedType]

  return (
    <section className="py-16 md:py-20">
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
            Encuentra tu categoria
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Desde diseño y marketing hasta servicios del hogar y tecnologia.
          </p>
        </motion.div>

        {/* Selector de tipo de servicios */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-2 shadow-md border border-gray-200">
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  setSelectedType('digitales')
                  setSelectedCategory(null)
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedType === 'digitales'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Servicios Digitales
              </button>
              <button
                onClick={() => {
                  setSelectedType('fisicos')
                  setSelectedCategory(null)
                }}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  selectedType === 'fisicos'
                    ? 'bg-green-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                Servicios Físicos
              </button>
            </div>
          </div>
        </motion.div>

        {/* Grid de categorías */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {currentData.categories.map((category, index) => (
            <motion.div
              key={category.name}
              className="relative"
              variants={itemVariants}
            >
              <div
                className={`bg-gradient-to-br ${category.color} rounded-2xl p-6 cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-lg group border border-white/20`}
                onClick={() => handleCategoryClick(category.name)}
              >
                {/* Ícono */}
                <div className="text-4xl mb-4 text-center group-hover:scale-110 transition-transform duration-300">
                  {category.icon}
                </div>

                {/* Nombre de la categoría */}
                <h3 className="text-lg font-semibold text-white text-center mb-2">
                  {category.name}
                </h3>

                {/* Indicador de selección */}
                {selectedCategory === category.name && (
                  <motion.div
                    className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Categoría seleccionada expandida con servicios */}
        {selectedCategory && (
          <motion.div
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100">
              <div className="text-center mb-8">
                <motion.h3 
                  className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  {selectedCategory}
                </motion.h3>
                <motion.p 
                  className="text-lg text-gray-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Servicios disponibles en esta categoría
                </motion.p>
              </div>

              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, staggerChildren: 0.1 }}
              >
                {currentData.categories
                  .find(cat => cat.name === selectedCategory)
                  ?.services.map((service, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className="group"
                    >
                      <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg border border-gray-100 transition-all duration-300 cursor-pointer group-hover:border-green-200">
                        <div className="flex items-start space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:from-green-200 group-hover:to-green-300 transition-all duration-300">
                            <span className="text-green-600 text-sm font-bold">
                              {index + 1}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm md:text-base text-gray-800 group-hover:text-green-600 transition-colors duration-300 leading-relaxed">
                              {service}
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </motion.div>

              <motion.div 
                className="text-center mt-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                <button className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-2xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                  Explorar {selectedCategory}
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* CTA después de las categorías */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="bg-white rounded-2xl p-8 shadow-md max-w-2xl mx-auto border border-gray-200">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              ¿No encuentras tu categoría?
            </h3>
            <p className="text-gray-600 mb-6">
              Estamos constantemente expandiendo nuestras categorías. ¡Déjanos saber qué servicio necesitas!
            </p>
            <button className="bg-green-500 text-white px-8 py-3 rounded-lg font-medium hover:bg-green-600 transition-colors duration-200 shadow-md">
              Sugerir categoría
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

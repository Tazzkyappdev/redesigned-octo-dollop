# Plan de Desarrollo - Tazzky Landing Page

## 📋 Descripción General

Este documento describe el plan de desarrollo paso a paso para construir la landing page de Tazzky, siguiendo las especificaciones del `tazzky-landing-documentation.md` y enfocándose en una tarea a la vez para garantizar un desarrollo ordenado y eficiente.

## 🎯 Objetivo del Plan

Desarrollar una landing page **mobile-first**, completamente responsive y adaptativa para web y dispositivos móviles, optimizada para conversiones que capture leads de usuarios y profesionales, explicando claramente el valor de Tazzky y generando interés en la plataforma.

## 🏗️ Fases de Desarrollo

### Fase 1: Configuración Inicial y Base del Proyecto

#### Tarea 1.1: Configuración del Entorno de Desarrollo
**Duración estimada:** 1 día
**Objetivo:** Establecer el entorno de desarrollo completo

**Pasos:**
1. **Instalar herramientas de desarrollo**
   - Node.js (versión LTS)
   - Git
   - VS Code con extensiones recomendadas

2. **Crear proyecto Next.js**
   ```bash
   npx create-next-app@latest tazzky-landing --typescript --tailwind --eslint
   cd tazzky-landing
   ```

3. **Configurar dependencias adicionales**
   ```bash
   npm install @supabase/supabase-js
   npm install framer-motion
   npm install react-hook-form
   npm install @hookform/resolvers zod
   npm install lucide-react
   ```

4. **Configurar archivos de configuración**
   - `tsconfig.json` - Configuración TypeScript
   - `tailwind.config.js` - Configuración Tailwind CSS
   - `.env.local` - Variables de entorno
   - `next.config.js` - Configuración Next.js

**Criterios de aceptación:**
- [ ] Proyecto se ejecuta sin errores
- [ ] TypeScript configurado correctamente
- [ ] Tailwind CSS funcionando
- [ ] Todas las dependencias instaladas

---

#### Tarea 1.2: Configuración de Supabase
**Duración estimada:** 1 día
**Objetivo:** Configurar la base de datos y servicios backend

**Pasos:**
1. **Crear proyecto Supabase**
   - Crear cuenta en Supabase
   - Crear nuevo proyecto
   - Obtener URL y API keys

2. **Configurar variables de entorno**
   ```bash
   # .env.local
   NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
   NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
   ```

3. **Crear esquema de base de datos**
   - Tabla `landing_leads` para formularios
   - Tabla `categories` para servicios
   - Tabla `professionals` para testimonios

4. **Configurar cliente Supabase**
   ```typescript
   // src/lib/supabase.ts
   import { createClient } from '@supabase/supabase-js'
   
   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
   
   export const supabase = createClient(supabaseUrl, supabaseAnonKey)
   ```

**Criterios de aceptación:**
- [ ] Conexión a Supabase establecida
- [ ] Tablas creadas correctamente
- [ ] Variables de entorno funcionando
- [ ] Cliente configurado

---

#### Tarea 1.3: Estructura de Carpetas y Configuración Base
**Duración estimada:** 1 día
**Objetivo:** Crear la estructura de carpetas y componentes base con enfoque mobile-first

**Pasos:**
1. **Crear estructura de carpetas**
   ```bash
   mkdir -p src/{components/{ui,sections,layout},lib,hooks,types,styles}
   mkdir -p public/{images,icons}
   ```

2. **Configurar sistema de diseño mobile-first**
   - Crear `src/styles/globals.css` con variables CSS
   - Configurar Tailwind con colores de Tazzky
   - Establecer tipografías (Inter, Poppins)
   - **Configurar breakpoints personalizados:**
     ```javascript
     // tailwind.config.js
     screens: {
       'xs': '375px',
       'sm': '640px',
       'md': '768px',
       'lg': '1024px',
       'xl': '1280px',
       '2xl': '1536px',
     }
     ```

3. **Crear componentes UI base responsive**
   - `src/components/ui/Button.tsx` - Adaptativo a diferentes tamaños
   - `src/components/ui/Input.tsx` - Optimizado para móvil
   - `src/components/ui/Card.tsx` - Layout flexible
   - `src/components/ui/Chip.tsx` - Responsive grid

4. **Configurar layout base responsive**
   - `src/components/layout/Header.tsx` - Sticky en móvil, navegación hamburguesa
   - `src/components/layout/Footer.tsx` - Stack en móvil, grid en desktop
   - `src/app/layout.tsx` - Meta viewport configurado

5. **Configurar CSS utilities responsive**
   - Variables CSS para espaciado adaptativo
   - Mixins para breakpoints
   - Grid system flexible

**Criterios de aceptación:**
- [ ] Estructura de carpetas creada
- [ ] Sistema de diseño mobile-first configurado
- [ ] Breakpoints personalizados funcionando
- [ ] Componentes UI base responsive funcionando
- [ ] Layout base responsive implementado
- [ ] CSS utilities responsive configuradas

---

### Fase 2: Implementación de Secciones Principales

#### Tarea 2.1: Header y Navegación Responsive
**Duración estimada:** 1 día
**Objetivo:** Implementar header sticky con navegación responsive y mobile-first

**Pasos:**
1. **Crear componente Header responsive**
   ```typescript
   // src/components/layout/Header.tsx
   export const Header = () => {
     const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
     
     return (
       <header className="sticky top-0 bg-white shadow-sm z-50">
         <nav className="container mx-auto px-4 py-4">
           {/* Logo, menú responsive y CTA */}
         </nav>
       </header>
     )
   }
   ```

2. **Implementar navegación mobile-first**
   - **Móvil (< 768px):**
     - Logo centrado
     - Menú hamburguesa con animación
     - CTA "Obtener acceso" en menú desplegable
     - Overlay completo para menú móvil
   - **Tablet (768px - 1024px):**
     - Logo a la izquierda
     - Menú horizontal compacto
     - CTA destacado a la derecha
   - **Desktop (> 1024px):**
     - Logo a la izquierda
     - Menú completo horizontal
     - CTA "Obtener acceso" destacado
     - Hover effects y transiciones

3. **Configurar scroll behavior responsive**
   - Header sticky en todos los dispositivos
   - Animación de scroll adaptativa
   - Estados activos de navegación
   - **Móvil:** Menú se oculta al hacer scroll down, aparece al scroll up

4. **Implementar menú hamburguesa accesible**
   - Botón con aria-label
   - Animación de transformación
   - Navegación por teclado
   - Focus management

**Criterios de aceptación:**
- [ ] Header sticky funcionando en todos los dispositivos
- [ ] Navegación mobile-first implementada
- [ ] Menú hamburguesa funcional y accesible
- [ ] CTA destacado y funcional en todas las resoluciones
- [ ] Animaciones de scroll adaptativas
- [ ] Navegación por teclado funcionando
- [ ] Responsive design validado en múltiples dispositivos

---

#### Tarea 2.2: Sección Hero Responsive
**Duración estimada:** 2 días
**Objetivo:** Implementar sección principal mobile-first que capture la atención y promueva registro beta

**Pasos:**
1. **Crear componente Hero responsive**
   ```typescript
   // src/components/sections/Hero.tsx
   export const Hero = () => {
     return (
       <section className="bg-white py-8 md:py-16 lg:py-20">
         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
           {/* Layout responsive: Stack en móvil, Grid en desktop */}
         </div>
       </section>
     )
   }
   ```

2. **Implementar contenido del Hero mobile-first**
   - **Móvil (< 768px):**
     - H1: Tamaño `text-3xl` centrado
     - Subtítulo: `text-lg` con espaciado optimizado
     - CTAs: Stack vertical, botones full-width
     - Badges: Stack vertical con espaciado
   - **Tablet (768px - 1024px):**
     - H1: `text-4xl` con mejor alineación
     - CTAs: Layout horizontal con espaciado
     - Badges: Grid de 2 columnas
   - **Desktop (> 1024px):**
     - H1: `text-5xl` con layout horizontal
     - CTAs: Side-by-side con hover effects
     - Badges: Grid de 3 columnas

3. **Crear mockup de la app responsive**
   - **Móvil:** Mockup centrado, tamaño optimizado
   - **Tablet:** Mockup a la derecha, texto a la izquierda
   - **Desktop:** Layout horizontal con mockup destacado
   - Overlay "Beta" adaptativo a cada tamaño

4. **Implementar animaciones responsive**
   - **Móvil:** Animaciones simples, sin hover
   - **Tablet:** Animaciones moderadas
   - **Desktop:** Animaciones completas con Framer Motion
   - Efecto de "pulso" en badge de beta (solo desktop)

5. **Agregar elementos de urgencia adaptativos**
   - **Móvil:** Contador simple, texto corto
   - **Desktop:** Contador animado, testimonios expandidos
   - Responsive grid para testimonios

6. **Optimizar para touch devices**
   - Botones con tamaño mínimo 44px
   - Espaciado entre elementos táctiles
   - Swipe gestures opcionales

**Criterios de aceptación:**
- [ ] Hero implementado con copy correcto y enfoque en beta
- [ ] Layout mobile-first funcionando en todas las resoluciones
- [ ] CTAs responsive y funcionales en todos los dispositivos
- [ ] Badges de beta prominentes y adaptativos
- [ ] Mockup de app responsive con indicadores de beta
- [ ] Animaciones adaptativas según dispositivo
- [ ] Elementos de urgencia responsive
- [ ] Optimización para touch devices
- [ ] Testing en múltiples dispositivos y orientaciones

---

#### Tarea 2.3: Sección "Cómo Funciona" Responsive
**Duración estimada:** 1 día
**Objetivo:** Explicar el flujo de uso en 4 pasos claros con layout mobile-first

**Pasos:**
1. **Crear componente Steps responsive**
   ```typescript
   // src/components/sections/Steps.tsx
   export const Steps = () => {
     const steps = [
       { icon: 'Search', title: 'Busca por categoría', description: 'Encuentra el servicio que necesitas' },
       { icon: 'Filter', title: 'Filtra opciones', description: 'Por precio, ubicación y rating' },
       { icon: 'MessageCircle', title: 'Habla por inbox', description: 'Conversa y recibe cotizaciones' },
       { icon: 'CheckCircle', title: 'Contrata y sigue', description: 'Da seguimiento a tu pedido' }
     ]
   }
   ```

2. **Implementar cards de pasos responsive**
   - **Móvil (< 768px):**
     - Stack vertical con espaciado `py-6`
     - Íconos centrados arriba del texto
     - Cards con padding `px-4 py-6`
     - Bordes redondeados `rounded-lg`
   - **Tablet (768px - 1024px):**
     - Grid de 2x2 columnas
     - Íconos a la izquierda del texto
     - Cards con padding `px-6 py-8`
   - **Desktop (> 1024px):**
     - Grid de 4 columnas horizontales
     - Íconos centrados arriba del texto
     - Cards con padding `px-8 py-10`
     - Hover effects con sombras

3. **Configurar layout mobile-first**
   - **Base móvil:** Stack vertical con espaciado consistente
   - **Breakpoint sm:** Grid de 2 columnas
   - **Breakpoint lg:** Grid de 4 columnas
   - Espaciado adaptativo: `gap-6 sm:gap-8 lg:gap-10`

4. **Optimizar para touch devices**
   - Cards con área táctil mínima de 44px
   - Espaciado entre cards para evitar toques accidentales
   - Íconos con tamaño adecuado para móvil

**Criterios de aceptación:**
- [ ] 4 pasos implementados correctamente
- [ ] Layout mobile-first funcionando en todas las resoluciones
- [ ] Grid responsive: 1 columna (móvil) → 2 columnas (tablet) → 4 columnas (desktop)
- [ ] Íconos y textos alineados con documentación
- [ ] Espaciado adaptativo según dispositivo
- [ ] Estilos consistentes con design system
- [ ] Optimización para touch devices
- [ ] Testing en múltiples resoluciones

---

#### Tarea 2.4: Catálogo de Servicios Responsive
**Duración estimada:** 1 día
**Objetivo:** Mostrar amplitud de oferta con categorías en layout mobile-first

**Pasos:**
1. **Crear componente Categories responsive**
   ```typescript
   // src/components/sections/Categories.tsx
   export const Categories = () => {
     const categories = [
       'Diseño', 'Marketing', 'Foto/Video', 'Hogar', 'Clases', 'Tecnología'
     ]
   }
   ```

2. **Implementar chips de categorías responsive**
   - **Móvil (< 768px):**
     - Grid de 2 columnas con `grid-cols-2`
     - Chips con padding `px-4 py-3`
     - Tamaño de fuente `text-sm`
     - Espaciado `gap-3`
   - **Tablet (768px - 1024px):**
     - Grid de 3 columnas con `grid-cols-3`
     - Chips con padding `px-6 py-4`
     - Tamaño de fuente `text-base`
     - Espaciado `gap-4`
   - **Desktop (> 1024px):**
     - Grid de 6 columnas con `grid-cols-6`
     - Chips con padding `px-8 py-5`
     - Tamaño de fuente `text-lg`
     - Espaciado `gap-6`
     - Hover effects con transiciones

3. **Configurar layout mobile-first**
   - **Base móvil:** Grid de 2 columnas
   - **Breakpoint md:** Grid de 3 columnas
   - **Breakpoint lg:** Grid de 6 columnas
   - Espaciado adaptativo: `gap-3 md:gap-4 lg:gap-6`

4. **Optimizar para touch devices**
   - Chips con área táctil mínima de 44px
   - Espaciado entre chips para evitar toques accidentales
   - Feedback visual inmediato al tocar

5. **Integrar con Supabase**
   - Cargar categorías desde base de datos
   - Estado de loading responsive
   - Manejo de errores con mensajes adaptativos

**Criterios de aceptación:**
- [ ] Grid de categorías responsive implementado
- [ ] Layout mobile-first: 2 → 3 → 6 columnas
- [ ] Estilos hover funcionando en desktop
- [ ] Datos cargando desde Supabase
- [ ] Espaciado adaptativo según dispositivo
- [ ] Optimización para touch devices
- [ ] Testing en múltiples resoluciones

---

### Fase 3: Secciones Diferenciadoras y Formularios

#### Tarea 3.1: Inbox y Cotizaciones
**Duración estimada:** 2 días
**Objetivo:** Destacar la mensajería como valor central

**Pasos:**
1. **Crear componente InboxHighlight**
   ```typescript
   // src/components/sections/InboxHighlight.tsx
   export const InboxHighlight = () => {
     return (
       <section className="py-20 bg-gray-50">
         {/* Mockup chat + bullets de beneficios */}
       </section>
     )
   }
   ```

2. **Implementar mockup del chat**
   - Interfaz de chat realista
   - Mensajes de ejemplo
   - Estados visuales (no leído, estrella, archivado)

3. **Crear bullets de beneficios**
   - "Conversa con profesionales"
   - "Comparte archivos"
   - "Acepta cotizaciones sin salir de Tazzky"

4. **Configurar layout**
   - Mockup a la izquierda
   - Beneficios a la derecha
   - Responsive stacking

**Criterios de aceptación:**
- [ ] Mockup de chat implementado
- [ ] Beneficios claramente presentados
- [ ] Layout responsive funcionando
- [ ] Estilos consistentes

---

#### Tarea 3.2: Sección de Confianza
**Duración estimada:** 2 días
**Objetivo:** Construir credibilidad con testimonios y perfiles

**Pasos:**
1. **Crear componente TrustSection**
   ```typescript
   // src/components/sections/TrustSection.tsx
   export const TrustSection = () => {
     return (
       <section className="py-20 bg-white">
         {/* Carrusel de profesionales + reseñas */}
       </section>
     )
   }
   ```

2. **Implementar carrusel de profesionales**
   - Tarjetas con avatar, rating, servicios
   - Botón "Ver perfil"
   - Navegación del carrusel
   - Autoplay opcional

3. **Crear sistema de rating**
   - Estrellas accesibles con texto
   - Número de reseñas
   - Promedio de calificación

4. **Integrar datos de Supabase**
   - Cargar profesionales destacados
   - Reseñas reales
   - Estados de loading

**Criterios de aceptación:**
- [ ] Carrusel de profesionales funcionando
- [ ] Sistema de rating implementado
- [ ] Datos cargando desde Supabase
- [ ] Navegación del carrusel suave

---

#### Tarea 3.3: Formularios de Conversión y Registro Beta Responsive
**Duración estimada:** 3 días
**Objetivo:** Implementar formularios responsive para captar leads y registro de beta

**Pasos:**
1. **Crear componente LeadForm responsive (Usuarios Beta)**
   ```typescript
   // src/components/forms/LeadForm.tsx
   export const LeadForm = () => {
     const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>()
     
     const onSubmit = async (data: LeadFormData) => {
       // Enviar a Supabase con etiqueta "Beta User"
     }
   }
   ```

2. **Implementar campos del formulario principal responsive**
   - **Móvil (< 768px):**
     - Campos full-width con `w-full`
     - Labels arriba de inputs con `block mb-2`
     - Espaciado vertical `space-y-4`
     - Botones full-width con `w-full`
   - **Tablet (768px - 1024px):**
     - Layout de 2 columnas para campos relacionados
     - Labels inline con inputs
     - Espaciado horizontal `space-x-4`
   - **Desktop (> 1024px):**
     - Layout de 3 columnas para optimizar espacio
     - Labels inline con inputs
     - Hover effects en botones
   - **Campos:**
     - Nombre (requerido)
     - Email (requerido, validado)
     - Tipo de interés: "Buscar servicios" (default)
     - Categoría principal (select)
     - Mensaje (opcional)
     - Aceptación de términos (checkbox)
     - **Nuevo:** "Quiero ser notificado cuando lance la beta"

3. **Crear componente ProfessionalRegistrationForm responsive**
   ```typescript
   // src/components/forms/ProfessionalRegistrationForm.tsx
   export const ProfessionalRegistrationForm = () => {
     const { register, handleSubmit, formState: { errors } } = useForm<ProfessionalFormData>()
     
     const onSubmit = async (data: ProfessionalFormData) => {
       // Enviar a Supabase con etiqueta "Professional Beta"
     }
   }
   ```

4. **Implementar campos específicos para profesionales responsive**
   - **Layout mobile-first:**
     - **Móvil:** Stack vertical con `space-y-4`
     - **Tablet:** Grid de 2 columnas para campos relacionados
     - **Desktop:** Grid de 3 columnas optimizado
   - **Campos responsive:**
     - Nombre completo (requerido)
     - Email (requerido, validado)
     - Teléfono (opcional)
     - Categoría principal de servicios (select)
     - Subcategorías (multi-select)
     - Años de experiencia (select)
     - Portafolio/website (opcional)
     - Descripción breve de servicios
     - Disponibilidad (tiempo completo/parcial)
     - Aceptación de términos y políticas

5. **Configurar validaciones avanzadas responsive**
   - Validación client-side con React Hook Form + Zod
   - Validación de email único
   - Validación de teléfono (formato internacional)
   - Validación de URL de portafolio
   - **Mensajes de error adaptativos:**
     - **Móvil:** Mensajes cortos y claros
     - **Desktop:** Mensajes detallados con sugerencias

6. **Integrar con Supabase y CRM**
   - Guardar leads en tabla `landing_leads`
   - Etiquetar por tipo: "Beta User" o "Professional Beta"
   - Crear tabla `professional_applications` para datos específicos
   - Integración con CRM (Airtable, Notion, etc.)
   - Notificaciones automáticas por email

7. **Implementar estados de UI avanzados responsive**
   - **Loading states adaptativos:**
     - **Móvil:** Spinner simple centrado
     - **Desktop:** Progress bar con porcentaje
   - Mensaje de éxito personalizado
   - Mensaje de error específico por campo
   - Confirmación de email enviado
   - **Progress bar responsive:**
     - **Móvil:** Barra horizontal simple
     - **Desktop:** Barra con pasos numerados

8. **Optimizar para touch devices**
   - Inputs con altura mínima de 44px
   - Checkboxes y radio buttons con área táctil amplia
   - Espaciado entre elementos para evitar toques accidentales
   - Feedback visual inmediato

**Criterios de aceptación:**
- [ ] Formularios responsive funcionando en todos los dispositivos
- [ ] Layout mobile-first implementado
- [ ] Formulario principal para usuarios beta funcionando
- [ ] Formulario específico para profesionales implementado
- [ ] Validaciones avanzadas funcionando
- [ ] Integración con Supabase y CRM
- [ ] Estados de UI avanzados responsive implementados
- [ ] Mensajes de confirmación personalizados
- [ ] Etiquetado correcto de leads por tipo
- [ ] Notificaciones automáticas configuradas
- [ ] Optimización para touch devices
- [ ] Testing en múltiples dispositivos y orientaciones

---

### Fase 4: Secciones Finales y Optimización

#### Tarea 4.1: FAQ y CTA Final
**Duración estimada:** 1 día
**Objetivo:** Resolver dudas y cerrar con registro beta

**Pasos:**
1. **Crear componente FAQ**
   ```typescript
   // src/components/sections/FAQ.tsx
   export const FAQ = () => {
     const faqs = [
       { question: '¿Tazzky es gratis para usuarios?', answer: 'Sí; algunos servicios podrían cobrar comisión al profesional' },
       { question: '¿Qué es la beta?', answer: 'Período de lanzamiento temprano con acceso prioritario y sin comisiones' },
       { question: '¿Cuándo se lanza oficialmente?', answer: 'Estamos planificando el lanzamiento oficial para Q2 2024' },
       { question: '¿Cómo funciona el registro beta?', answer: 'Regístrate ahora y te notificaremos cuando esté disponible' },
       { question: '¿Los profesionales pagan algo durante la beta?', answer: 'No, durante la beta no hay comisiones por transacciones' },
       // ... más preguntas
     ]
   }
   ```

2. **Implementar acordeón accesible**
   - Expandir/contraer preguntas
   - Navegación por teclado
   - ARIA labels
   - Animaciones suaves
   - Categorías: General, Beta, Profesionales

3. **Crear CTA final con enfoque en beta**
   - **Copy principal:** "Empieza hoy. Encuentra al profesional ideal en minutos."
   - **Subcopy:** "Únete a nuestra beta y sé de los primeros en disfrutar Tazzky"
   - **CTA:** "Obtener acceso beta"
   - **CTA secundario:** "Soy profesional"
   - Posicionamiento estratégico

4. **Agregar elementos de confianza**
   - "Ya se han registrado X usuarios"
   - "X profesionales esperando el lanzamiento"
   - Testimonios de early adopters

**Criterios de aceptación:**
- [ ] FAQ accesible implementado con preguntas específicas de beta
- [ ] Acordeón funcionando correctamente con categorías
- [ ] CTA final destacado con enfoque en beta
- [ ] Navegación por teclado
- [ ] Elementos de confianza implementados
- [ ] Preguntas específicas sobre beta incluidas

---

#### Tarea 4.2: Footer y Sección Legal
**Duración estimada:** 1 día
**Objetivo:** Implementar footer completo con información legal

**Pasos:**
1. **Crear componente Footer**
   ```typescript
   // src/components/layout/Footer.tsx
   export const Footer = () => {
     return (
       <footer className="bg-gray-900 text-white py-16">
         {/* Navegación, legal, empresa y social */}
       </footer>
     )
   }
   ```

2. **Implementar secciones del footer**
   - Navegación: Inicio, Cómo funciona, Categorías, Profesionales, FAQ
   - Legal: Términos, Privacidad, Cookies
   - Empresa: Tazzky SA DE CV
   - Redes sociales y contacto

3. **Configurar enlaces**
   - Enlaces internos funcionales
   - Enlaces externos con target="_blank"
   - Rel="noopener noreferrer"

**Criterios de aceptación:**
- [ ] Footer completo implementado
- [ ] Enlaces funcionando correctamente
- [ ] Información legal incluida
- [ ] Responsive design

---

#### Tarea 4.3: Llamado a Profesionales y Registro Beta
**Duración estimada:** 2 días
**Objetivo:** Convertir proveedores y facilitar registro para beta

**Pasos:**
1. **Crear componente ProSection**
   ```typescript
   // src/components/sections/ProSection.tsx
   export const ProSection = () => {
     return (
       <section className="py-20 bg-[#E7F3BB]">
         {/* Copy, beneficios y formulario de registro */}
       </section>
     )
   }
   ```

2. **Implementar contenido diferenciado y beneficios**
   - Fondo `--color-bg-alt`
   - **Copy principal:** "Consigue más clientes desde tu móvil. Muestra tu portafolio, cotiza y cobra con Tazzky."
   - **Subcopy:** "Únete a nuestra beta y sé de los primeros en ofrecer servicios"
   - **Beneficios destacados:**
     - "Acceso prioritario a la plataforma"
     - "Sin comisiones durante el período beta"
     - "Soporte directo del equipo"
     - "Posicionamiento destacado en el lanzamiento"
   - **CTA principal:** "Registrarme para la beta"

3. **Integrar formulario de registro profesional**
   - Formulario completo con todos los campos
   - Progress indicator para formulario largo
   - Validaciones en tiempo real
   - Mensaje de confirmación personalizado

4. **Implementar sistema de notificaciones**
   - Email de confirmación inmediato
   - Email de bienvenida con próximos pasos
   - Notificación al equipo de Tazzky
   - Seguimiento en CRM

5. **Crear sección de "Próximos pasos"**
   - Timeline de lanzamiento
   - Qué esperar después del registro
   - Contacto del equipo
   - FAQ específico para profesionales

**Criterios de aceptación:**
- [ ] Sección diferenciada implementada con beneficios claros
- [ ] Formulario de registro profesional integrado
- [ ] Sistema de notificaciones funcionando
- [ ] Sección de próximos pasos implementada
- [ ] Estilos visuales contrastados y atractivos
- [ ] Integración completa con CRM y Supabase
- [ ] Mensajes de confirmación personalizados
- [ ] Timeline de lanzamiento visible

---

### Fase 5: Optimización y Testing

#### Tarea 5.1: SEO y Metadatos
**Duración estimada:** 1 día
**Objetivo:** Implementar SEO técnico completo

**Pasos:**
1. **Configurar metadatos**
   ```typescript
   // src/app/layout.tsx
   export const metadata = {
     title: 'Tazzky — Encuentra y contrata servicios confiables en minutos',
     description: 'Descubre profesionales para servicios digitales y presenciales...',
     keywords: 'servicios, contratar, profesionales, freelancers, cotización, chat, México, Latinoamérica, Tazzky'
   }
   ```

2. **Implementar Open Graph**
   - og:title, og:description, og:image
   - Twitter Card
   - JSON-LD structured data

3. **Configurar sitemap y robots.txt**
   - Generar sitemap automático
   - Configurar robots.txt
   - Verificar en Search Console

**Criterios de aceptación:**
- [ ] Metadatos implementados
- [ ] Open Graph configurado
- [ ] Sitemap generado
- [ ] SEO técnico verificado

---

#### Tarea 5.2: Performance y Core Web Vitals
**Duración estimada:** 2 días
**Objetivo:** Optimizar rendimiento y métricas

**Pasos:**
1. **Optimizar imágenes**
   - Formato WebP/AVIF
   - Lazy loading
   - Responsive images
   - Compresión automática

2. **Implementar optimizaciones**
   - Code splitting por secciones
   - Critical CSS
   - Bundle analyzer
   - Tree shaking

3. **Configurar métricas**
   - Core Web Vitals
   - Lighthouse CI
   - Performance monitoring
   - LCP < 2.0s, CLS < 0.1, INP < 200ms

**Criterios de aceptación:**
- [ ] Core Web Vitals optimizados
- [ ] Imágenes optimizadas
- [ ] Bundle optimizado
- [ ] Performance score > 90

---

#### Tarea 5.3: Testing, Accesibilidad y Responsive Design
**Duración estimada:** 2 días
**Objetivo:** Garantizar calidad, accesibilidad y responsive design en todos los dispositivos

**Pasos:**
1. **Implementar testing responsive**
   ```bash
   npm install --save-dev @testing-library/react @testing-library/jest-dom jest
   npm install --save-dev @testing-library/user-event
   ```

2. **Crear tests unitarios responsive**
   - Tests para componentes UI en diferentes breakpoints
   - Tests para formularios en móvil y desktop
   - Tests para hooks personalizados
   - Tests para navegación responsive

3. **Verificar accesibilidad responsive**
   - Navegación por teclado en todos los dispositivos
   - Screen reader compatibility
   - ARIA labels adaptativos
   - Contraste AA mínimo 4.5:1 en todas las resoluciones
   - **Touch accessibility:**
     - Área táctil mínima de 44px
     - Espaciado adecuado entre elementos táctiles
     - Feedback visual inmediato

4. **Testing de navegadores y dispositivos**
   - **Navegadores desktop:** Chrome, Firefox, Safari, Edge
   - **Navegadores móviles:** Chrome Mobile, Safari iOS, Firefox Mobile
   - **Responsive design testing:**
     - Móvil: 375px, 414px, 768px
     - Tablet: 768px, 1024px
     - Desktop: 1024px, 1280px, 1536px
   - **Orientaciones:** Portrait y landscape en móvil

5. **Testing de performance responsive**
   - Core Web Vitals en diferentes dispositivos
   - LCP < 2.0s en móvil y desktop
   - CLS < 0.1 en todas las resoluciones
   - INP < 200ms en touch devices

6. **Testing de formularios responsive**
   - Validación en diferentes tamaños de pantalla
   - Comportamiento de inputs en móvil
   - Manejo de teclado virtual
   - Zoom y escalado de texto

**Criterios de aceptación:**
- [ ] Tests unitarios responsive implementados
- [ ] Accesibilidad AA verificada en todos los dispositivos
- [ ] Cross-browser testing completo
- [ ] Responsive design validado en múltiples resoluciones
- [ ] Touch accessibility verificada
- [ ] Performance responsive optimizada
- [ ] Formularios funcionando en todos los dispositivos
- [ ] Testing en orientaciones portrait y landscape

---

### Fase 6: Deployment y Lanzamiento

#### Tarea 6.1: Configuración de Producción
**Duración estimada:** 1 día
**Objetivo:** Preparar aplicación para producción

**Pasos:**
1. **Configurar variables de producción**
   - URLs de Supabase de producción
   - Analytics keys
   - Error tracking

2. **Optimizar build**
   - Minificación de código
   - Compresión de assets
   - Cache headers
   - Service worker (opcional)

3. **Configurar monitoreo**
   - Error tracking (Sentry)
   - Performance monitoring
   - Analytics (GA4)
   - Uptime monitoring

**Criterios de aceptación:**
- [ ] Variables de producción configuradas
- [ ] Build optimizado
- [ ] Monitoreo configurado
- [ ] Performance validado

---

#### Tarea 6.2: Deployment en Vercel
**Duración estimada:** 1 día
**Objetivo:** Desplegar aplicación en producción

**Pasos:**
1. **Configurar Vercel**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

2. **Configurar dominio personalizado**
   - DNS configuration
   - SSL certificate
   - Redirects y rewrites

3. **Configurar CI/CD**
   - GitHub Actions
   - Auto-deploy en push a main
   - Preview deployments en PRs

4. **Verificar funcionamiento**
   - Tests de funcionalidad
   - Performance en producción
   - SEO verification
   - Mobile testing

**Criterios de aceptación:**
- [ ] Aplicación desplegada en Vercel
- [ ] Dominio personalizado funcionando
- [ ] CI/CD configurado
- [ ] Funcionamiento verificado

---

## 📊 Cronograma General

| Fase | Tareas | Duración Total | Dependencias |
|------|--------|----------------|--------------|
| 1 | Configuración Inicial | 3 días | - |
| 2 | Secciones Principales | 5 días | Fase 1 |
| 3 | Secciones Diferenciadoras | 6 días | Fase 2 |
| 4 | Secciones Finales | 4 días | Fase 3 |
| 5 | Optimización y Testing | 5 días | Fase 4 |
| 6 | Deployment y Lanzamiento | 2 días | Fase 5 |

**Duración Total Estimada:** 25 días (aproximadamente 5 semanas)

**Nota:** Se agregaron 2 días adicionales para implementar las funcionalidades específicas de registro beta y captación de profesionales.

## 🎯 Criterios de Éxito

### Técnicos
- [ ] Landing page **mobile-first** completamente responsive
- [ ] **Breakpoints personalizados** configurados (xs: 375px, sm: 640px, md: 768px, lg: 1024px, xl: 1280px, 2xl: 1536px)
- [ ] **Layout adaptativo** en todas las resoluciones
- [ ] Core Web Vitals optimizados para móvil y desktop
- [ ] SEO técnico implementado
- [ ] Accesibilidad AA verificada en todos los dispositivos
- [ ] Performance score > 90 en móvil y desktop
- [ ] **Touch-friendly** con área táctil mínima de 44px

### Funcionales
- [ ] Todas las secciones implementadas con **layout responsive**
- [ ] **Formularios responsive** funcionando en todos los dispositivos
- [ ] **Navegación mobile-first** con menú hamburguesa funcional
- [ ] Integración con Supabase
- [ ] **Navegación fluida** en móvil y desktop
- [ ] **CTAs destacados** y optimizados para touch devices
- [ ] **Grid systems adaptativos** para todas las secciones

### Negocio
- [ ] Conversión de leads implementada
- [ ] **Registro beta para usuarios implementado**
- [ ] **Registro beta para profesionales implementado**
- [ ] **Sistema de notificaciones automáticas funcionando**
- [ ] Analytics configurado
- [ ] Formularios conectados a CRM
- [ ] Landing page desplegada
- [ ] **Monitoreo de conversiones por tipo de usuario**
- [ ] **Seguimiento de profesionales registrados para beta**

## 📝 Notas de Desarrollo

### Reglas Importantes
1. **Una tarea a la vez:** No comenzar nueva tarea hasta completar la actual
2. **Testing continuo:** Probar cada funcionalidad antes de continuar
3. **Commits frecuentes:** Hacer commits pequeños y descriptivos
4. **Documentación:** Documentar decisiones técnicas importantes
5. **Code review:** Revisar código antes de merge a main
6. **Mobile-first:** Siempre desarrollar primero para móvil, luego escalar a desktop
7. **Responsive testing:** Probar en múltiples dispositivos antes de continuar
8. **Touch optimization:** Verificar que todos los elementos sean touch-friendly

### Herramientas Recomendadas
- **IDE:** VS Code con extensiones React/Next.js
- **Git:** GitFlow para manejo de branches
- **Testing:** Jest + React Testing Library + Testing Library User Event
- **Linting:** ESLint + Prettier
- **Analytics:** Google Analytics 4
- **Performance:** Lighthouse CI
- **Responsive Testing:** Chrome DevTools, Firefox Responsive Design Mode
- **Mobile Testing:** BrowserStack, LambdaTest para testing cross-device
- **Touch Testing:** Simuladores de touch en navegadores

### Métricas de Seguimiento
- **Velocidad:** Tareas completadas por día
- **Calidad:** Bugs encontrados vs resueltos
- **Performance:** Core Web Vitals y Lighthouse score
- **Conversiones:** Leads generados por formulario
- **Beta Users:** Usuarios registrados para beta
- **Professional Leads:** Profesionales registrados para beta
- **Email Engagement:** Tasa de apertura y clics en emails de confirmación
- **Form Completion:** Tasa de completitud de formularios por tipo
- **Responsive Performance:** Core Web Vitals por dispositivo (móvil vs desktop)
- **Touch Usability:** Tasa de éxito en interacciones táctiles
- **Cross-Device Conversion:** Conversiones por tipo de dispositivo

---

*Plan de desarrollo para Tazzky Landing Page*
*Basado en: tazzky-landing-documentation.md*
*Fecha: 2024*

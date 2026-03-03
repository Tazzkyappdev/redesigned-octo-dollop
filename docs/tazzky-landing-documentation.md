# Tazzky Landing Page - Documentación del Proyecto

## 1. Resumen del Producto

**Tazzky** es una plataforma de servicios digitales y presenciales que conecta usuarios con profesionales calificados. Permite descubrir, filtrar y contratar servicios con mensajería integrada (inbox), cotizaciones, pedidos con estados y valoraciones.

**Objetivo de la landing:** captar registros (early access / descarga), generar leads de profesionales y explicar el valor del producto de forma clara y minimalista.

## 2. Público Objetivo

### Usuarios Finales
Personas que necesitan servicios (diseño, marketing, foto/video, reparación, clases, etc.) y valoran rapidez, confianza y precios claros.

### Profesionales
Freelancers y negocios que desean conseguir clientes, mostrar portafolio y gestionar pedidos desde el móvil.

## 3. Propuesta de Valor

**Encuentra y contrata servicios confiables en minutos.** Explora, filtra, conversa con profesionales, recibe cotizaciones y contrata — todo en un solo lugar.

### Beneficios Clave
- **Búsqueda inteligente** por categoría/subcategoría y filtros (precio, ubicación, rating, tipo digital/presencial)
- **Inbox** para hablar con profesionales, enviar/recibir cotizaciones y acordar detalles
- **Pedidos con estados y timeline**; archivos compartidos y valoración al finalizar
- **Portafolios y reseñas** para decidir con confianza

## 4. Marca y Estilo (Modo Claro)

### Colores (Tokens)
```css
--color-primary: #BADB3A (Verde Tazzky)
--color-primary-hover: #A6C032
--color-bg: #FFFFFF
--color-bg-alt: #E7F3BB
--color-text: #1A1A1A
--color-text-muted: #4A4A4A
--color-border: #EDF5D7
--color-error: #F36C6C
```

### Tipografía
- **Títulos:** Inter / Poppins / SF Pro (peso 600–700)
- **Texto:** Inter / Roboto (400–500)
- **Tamaños guía:** H1 40–48, H2 28–32, H3 22–24, body 16–18, caption 13–14

### Iconografía
- Estilo lineal/duotono simple (24px) con esquinas suaves
- Uso moderado, siempre con texto de apoyo

### Tono
Claro, cercano y profesional. Oraciones cortas, foco en beneficios y acciones.

### Accesibilidad
- Contraste AA mínimo 4.5:1 en texto
- Botones: altura mínima 44px, foco visible, etiquetas claras
- Imágenes con alt. Formularios con aria-* y mensajes de error útiles

## 5. Estructura de la Página

### 5.1 Hero (Encabezado Principal)
**Objetivo:** explicar en 5 segundos qué hace Tazzky y captar el CTA principal.

**Estructura:**
- Título (H1), subtítulo, 1–2 CTAs, badges de confianza (rating, "Próximamente en App Store/Play"), mockup app

**Copy base:**
- **H1:** "Contrata servicios confiables en minutos."
- **Sub:** "Encuentra profesionales, conversa por inbox y recibe cotizaciones sin salir de Tazzky."
- **CTAs:** "Obtener acceso" (primary) / "Soy profesional" (secondary)

**Notas:** Fondo blanco con acentos --color-primary; mockup de la app o ilustración minimal.

### 5.2 Cómo Funciona (3–4 Pasos)
**Objetivo:** reducir fricción explicando el flujo.

**Pasos sugeridos:**
1. Busca por categoría o palabra clave
2. Filtra (precio, ubicación, rating, tipo)
3. Habla por inbox y recibe cotizaciones
4. Contrata y da seguimiento a tu pedido

**Notas:** Íconos lineales con títulos cortos; cada paso en card suave con borde --color-border.

### 5.3 Catálogo de Servicios (Grid por Categorías)
**Objetivo:** mostrar amplitud de oferta.

**Contenido:** chips de categorías (Diseño, Marketing, Foto/Video, Hogar, Clases, Tecnología, etc.) y subcategorías populares.

**Notas:** chips con borde suave; hover cambia a --color-primary-bg tenue (#E7F3BB).

### 5.4 Inbox y Cotizaciones (Diferenciador)
**Objetivo:** destacar la mensajería como valor central.

**Copy:** "Conversa con profesionales, comparte archivos y acepta cotizaciones sin salir de Tazzky."

**Notas:** Mockup chat + lista de conversaciones (estados: no leído, estrella, archivado).

### 5.5 Confianza (Reseñas, Portafolios, Perfiles)
**Objetivo:** credibilidad.

**Contenido:** carrusel con tarjetas de profesionales (avatar, rating, servicios realizados, botones "Ver perfil").

**Notas:** card limpia, sombras suaves, estrellas accesibles con texto.

### 5.6 Orden y Seguimiento (Pedidos)
**Objetivo:** transmitir control y seguridad.

**Copy:** "Sigue tu pedido con un timeline claro. Comparte archivos y valora al finalizar."

**Notas:** infografía o mockup de timeline de estados.

### 5.7 Llamado a Profesionales (Captación B2C)
**Objetivo:** convertir proveedores.

**Copy:** "Consigue más clientes desde tu móvil. Muestra tu portafolio, cotiza y cobra con Tazzky."

**CTA:** "Quiero ofrecer mis servicios"

**Notas:** diferenciar visualmente (fondo --color-bg-alt).

### 5.8 Testimonios / Prensa (Si Aplica)
**Objetivo:** prueba social.

**Notas:** 3–5 quotes cortas, logos grises si hay medios.

### 5.9 FAQ (Preguntas Frecuentes)
- **¿Tazzky es gratis para usuarios?** Sí; algunos servicios podrían cobrar comisión al profesional
- **¿Cómo pago?** Integración Stripe/Conekta — roadmap
- **¿Qué pasa si el servicio falla?** Soporte y mediación — roadmap
- **¿Puedo convertir mi cuenta a profesional?** Sí, desde Perfil

### 5.10 CTA Final
**Objetivo:** cerrar con registro.

**Copy:** "Empieza hoy. Encuentra al profesional ideal en minutos."

**CTA:** "Obtener acceso"

### 5.11 Footer
- **Navegación:** Inicio, Cómo funciona, Categorías, Profesionales, FAQ, Blog (opcional)
- **Legal:** Términos, Privacidad, Cookies
- **Empresa:** LOGUISAN SA DE CV
- **Social y contacto**

## 6. Formularios y Conversiones

### 6.1 Formulario Principal (Lead / Early Access)
**Campos:** nombre, email*, tipo de interés (Buscar servicios / Ofrecer servicios), categoría principal, mensaje (opcional), aceptación de términos.

**Validaciones:** email válido, checks de consentimiento, errores claros en rojo --color-error.

**Mensajes:** "Gracias. Te contactaremos pronto por correo."

### 6.2 Form Profesional
**Campos extra:** portafolio (URL), categoría/subcategoría, experiencia (años), disponibilidad.

**Automatización:** etiqueta "Lead Profesional" en CRM/Sheets.

## 7. SEO y Meta (Para Implementación)

### Título (60–65)
Tazzky — Encuentra y contrata servicios confiables en minutos

### Descripción (150–160)
Descubre profesionales para servicios digitales y presenciales. Filtra, conversa por inbox, recibe cotizaciones y contrata desde Tazzky.

### Keywords
servicios, contratar, profesionales, freelancers, cotización, chat, México, Latinoamérica, Tazzky

### Open Graph
- **og:title:** Tazzky — Servicios confiables en minutos
- **og:description:** Filtra, conversa, cotiza y contrata en un solo lugar
- **og:image:** /og-image.jpg (1200×630)
- **og:type:** website

### Twitter Card
summary_large_image

### JSON-LD (Organization & Product)
incluir name, url, logo, sameAs y offers (si aplica)

## 8. Componentes UI (Landing)

1. **Header** (logo + menú + CTA "Obtener acceso"). Sticky en desktop
2. **Hero** (H1 + sub + 2 CTAs + mockup)
3. **Steps** (4 cards)
4. **Categories grid** (chips/capsulas)
5. **Inbox highlight** (mockup chat + bullets)
6. **Trust/Profiles** (cards con rating)
7. **Orders timeline** (ilustración/imagen)
8. **CTA Proveedores** (sección contrastada)
9. **Testimonials** (opcional)
10. **FAQ acordeón accesible**
11. **CTA final**
12. **Footer con legal y empresa**

## 9. Directrices de Diseño (Detalles Prácticos)

### Botones
- **Primario:** altura 48px, radio 12–16px, padding 16–20px, bg --color-primary, hover --color-primary-hover, texto blanco #FFFFFF
- **Secundario:** fondo #FFFFFF, borde --color-primary o --color-border, texto --color-text
- **Deshabilitado:** opacidad 0.5, sin hover

### Cards
- Borde --color-border (1px), radio 16–20px, sombra sutil (blur 16–24px, alpha 0.05–0.08)
- Espaciados internos 16–24px

### Chips
- Altura 32–36px, padding 12–16px, borde --color-border, seleccionadas con fondo --color-bg-alt

### Sección Separadores
- Divisores #EDF5D7 (1px) con 40–64px de separación vertical

### Imágenes
- Pesadas < 200KB hero, < 120KB resto. Formato WebP/AVIF cuando sea posible

## 10. Rendimiento y Técnica

### Core Web Vitals
- LCP < 2.0s
- CLS < 0.1
- INP < 200ms

### Optimizaciones
- **Carga diferida:** imágenes y componentes pesados
- **Split de JS:** solo lo necesario por página
- **Critical CSS:** aplicar estilos esenciales en el primer render
- **CDN:** para assets estáticos

### Analítica
Eventos para clic en CTA, envío de formularios, scroll 50/90%, interacción con FAQ

### Privacidad
Banner de cookies simple (esencial + analítica)

### Accesibilidad
Navegación por teclado, landmarks, labels

## 11. Stack Tecnológico y Arquitectura

### Frontend
- **Framework:** React/Next.js con TypeScript
- **Styling:** CSS Modules o Styled Components
- **UI Framework:** Componentes personalizados siguiendo design system
- **Gestión de Estado:** React Context API o Zustand
- **Routing:** Next.js App Router

### Backend y Base de Datos
- **Base de Datos:** Supabase (PostgreSQL)
- **Autenticación:** Supabase Auth
- **Almacenamiento:** Supabase Storage
- **Tiempo Real:** Supabase Realtime (para futuras funcionalidades)

### Herramientas de Desarrollo
- **Build Tool:** Next.js con Webpack
- **Linting:** ESLint + Prettier
- **Testing:** Jest + React Testing Library
- **Deployment:** Vercel o Netlify
- **CMS:** Supabase o Strapi para contenido dinámico

### Integraciones
- **Formularios:** Formspree, Netlify Forms o endpoint personalizado
- **Analytics:** Google Analytics 4, Plausible o Umami
- **Email Marketing:** Mailchimp, ConvertKit o SendGrid
- **Pagos:** Stripe o Conekta (roadmap)

### Estructura del Proyecto
```
tazzky-landing/
├── src/
│   ├── components/
│   │   ├── ui/           # Componentes base (Button, Input, Card)
│   │   ├── sections/     # Secciones de la landing
│   │   └── layout/       # Header, Footer, Navigation
│   ├── pages/            # Páginas de la aplicación
│   ├── styles/           # Estilos globales y variables CSS
│   ├── utils/            # Utilidades y helpers
│   ├── types/            # Tipos TypeScript
│   └── constants/        # Constantes y configuración
├── public/               # Assets estáticos
├── docs/                 # Documentación del proyecto
└── package.json
```

## 12. Roadmap Visible (Opcional en Landing)

**Próximamente:** Modo oscuro, moneda/idioma, centro de ayuda, invitar amigos, códigos promocionales

## 13. Legales

- **Empresa:** Tazzky SA DE CV
- **Links:** Términos de uso, Política de privacidad, Aviso de cookies
- **Contacto:** correo de soporte o formulario

## 14. CTAs y Variantes (Para Pruebas A/B)

- **Primary (Hero):** "Obtener acceso" / "Descargar Tazzky" (cuando esté en stores)
- **Secondary (Hero):** "Soy profesional"
- **Mid-page:** "Explorar categorías"
- **Pro Section:** "Quiero ofrecer mis servicios"
- **Footer:** "Empezar ahora"

## 15. Texto Breve para Tarjetas (Placeholders)

- **Tarjeta servicio:** "Edición de video para redes", "Desde $1,200 MXN", "⭐ 4.8 (120)"
- **Tarjeta profesional:** "Ana López — Motion Designer", "45 proyectos • ⭐ 4.9"
- **Inbox highlight:** "Negocia detalles y recibe cotizaciones en un solo chat."

## 16. Entregables Esperados

- Landing responsive (mobile-first) con secciones anteriores
- Formularios conectados a un endpoint/Sheet/CRM
- Etiquetado de analítica (GA4/umami/segment)
- SEO técnico + OG/Twitter
- Accesibilidad AA
- Archivos optimizados y deploy en CDN

## 17. Modo Oscuro (Futuro)

- Invertir fondos, ajustar verdes a variantes más oscuras (no requerido para el MVP de landing)
- Conservar contraste AA

## 18. Información Técnica Adicional

### Base de Datos y Esquema
Basado en la documentación técnica de la app, la landing page puede integrarse con:

#### Tablas Principales de Supabase
- **users:** Para registro y gestión de leads
- **categories:** Para mostrar catálogo de servicios
- **professional_profiles:** Para sección de profesionales
- **services:** Para ejemplos de servicios disponibles
- **reviews:** Para testimonios y valoraciones

#### Estructura de Datos para Landing
```typescript
// Tipos de datos para la landing
interface LandingLead {
  id: string
  email: string
  full_name: string
  interest_type: 'client' | 'professional'
  category?: string
  message?: string
  created_at: Date
}

interface ServiceCategory {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  is_active: boolean
}

interface Professional {
  id: string
  business_name: string
  description: string
  rating: number
  total_reviews: number
  services_count: number
  avatar_url: string
}
```

### Integración con App Móvil
- **Deep Linking:** Configurar URLs para abrir app en secciones específicas
- **Shared Data:** Sincronizar datos entre landing y app
- **Analytics:** Tracking unificado de conversiones

### Consideraciones de Performance
- **Lazy Loading:** Cargar secciones según scroll
- **Image Optimization:** WebP/AVIF con fallbacks
- **Code Splitting:** Separar código por secciones
- **Caching:** Implementar estrategias de cache para contenido estático

### Seguridad y Privacidad
- **Form Validation:** Validación client-side y server-side
- **Rate Limiting:** Protección contra spam en formularios
- **GDPR Compliance:** Banner de cookies y gestión de consentimiento
- **Data Encryption:** Encriptación de datos sensibles en tránsito

### Monitoreo y Analytics
- **Error Tracking:** Sentry o similar para monitoreo de errores
- **Performance Monitoring:** Core Web Vitals y métricas de usuario
- **Conversion Tracking:** Funnels de conversión y A/B testing
- **User Behavior:** Heatmaps y grabaciones de sesión

---

*Documento generado para el proyecto Tazzky Landing Page*
*Empresa: LOGUISAN SA DE CV*
*Fecha: 2024*

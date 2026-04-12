# ⚡ TAZZKY - Manual de Identidad y Reglas de Desarrollo

Este documento es la **Fuente de Verdad** para la IA. Cualquier componente, ruta o lógica debe alinearse con estas reglas para mantener la consistencia del marketplace.

---

## 🎯 1. Misión y Modelo de Negocio
* **Concepto**: Marketplace de servicios profesionales ("Gigs") en LATAM.
* **Modelo**: **MVP Concierge**. [cite_start]El administrador gestiona y sube manualmente cada servicio y profesional[cite: 7].
* **Diferencial**: Pagos protegidos mediante **Escrow** (Garantía Tazzky). El dinero no se libera hasta que el cliente aprueba.
* **Crecimiento Orgánico**: Los profesionales comparten su link directo (`/servicios/[slug]`) en comunidades de WhatsApp.

---

## 🛠️ 2. Stack Tecnológico
* **Frontend**: React.js + Tailwind CSS.
* **Base de Datos / Auth**: Supabase.
* **Almacenamiento**: **Supabase Storage** (Bucket: `tazzky-assets`). No se usan URLs externas; todas las imágenes deben subirse al bucket público.
* **Iconografía**: Lucide-React.
* **Conversión**: Formulario de Tally.so (vía botones con parámetros dinámicos).

---

## 🎨 3. Guía de Estilo (UI/UX)
* **Tema**: **Dark Mode Total**.
    * **Fondo**: `#000000` (Negro puro) o gris muy oscuro.
    * **Texto**: Blanco (`#FFFFFF`) para títulos, Gris claro para descripciones.
* **Colores de Acento**: Verde Lima / Amarillo Neón (`#E2E66B` o `#A3E635`).
* **Componentes**:
    * **Cards**: Bordes redondeados (`rounded-lg`), sombras sutiles.
    * **Badges**: 
        * [cite_start]`Top Talent`: Fondo amarillo, texto negro, icono de trofeo[cite: 11].
        * [cite_start]`Verificado`: Check verde al lado del nombre del profesional[cite: 12, 13].
* [cite_start]**Interactividad**: Los botones de "Contratar" o "Guardar" deben resaltar sobre el fondo oscuro[cite: 52].

---

## 🗄️ 4. Esquema de Base de Datos (Supabase)
La IA debe respetar estrictamente estos nombres de tablas y la lógica de que las URLs de imagen provienen de Storage:
**Categorías**: Solo se usarán las 7 Categorías Madre (Artes gráficas, Programación, Marketing, Video, Escritura, Música, Negocios).
- [cite_start]**Paquetes (Inclusiones)**: La tabla `packages` DEBE permitir una lista de 'Características' o 'Inclusiones' (ej: "3 Revisiones", "Archivos fuente")
- **Packages (Inclusiones):** La tabla `packages` debe incluir un campo `features` (array o jsonb) para listar lo que incluye cada plan (ej. "3 Revisiones", "Archivo fuente").

### `service_categories`
* [cite_start]`id` (uuid), `name` (text), `slug` (text)[cite: 15, 16].

### `marketplace_pros` (Profesionales)
* [cite_start]`id` (uuid), `full_name` (text), **`avatar_url` (File Upload)**, `is_top_talent` (bool), `is_verified` (bool) [cite: 8-13].

### `gigs` (Servicios)
* [cite_start]`id`, `pro_id` (FK), `category_id` (FK), `title`, `description`, **`cover_image` (File Upload)**, `slug` (único) [cite: 14-26].

### `packages` (Precios)
* [cite_start]`id`, `gig_id` (FK), **`type` (Nombre personalizado)**, `description`, `price` (numeric), `delivery_days` [cite: 27-33].

### `portfolio_items` (Trabajos Anteriores)
* [cite_start]`id`, `gig_id` (FK), `title`, `description`, **`image_url` (File Upload)**, `work_date`, `price_range`, `duration` [cite: 34, 41-47].

### `hero_banners` (Promociones)
* [cite_start]`id`, `image_url` (File Upload), `title`, `subtitle`, `cta_link`, `is_active`[cite: 49, 50].

---

## ⚙️ 5. Lógica del Panel de Administración (`/admin-secret-tazzky`)
* [cite_start]**Gestión de Imágenes**: El formulario debe usar `<input type="file" />` para Avatar [cite: 10][cite_start], Cover Image [cite: 23] [cite_start]y Portfolio[cite: 42].
* **Flujo de Subida**: 
    1. Subir archivos al bucket `tazzky-assets`. 
    2. Obtener la URL pública. 
    3. Guardar dicha URL en la columna correspondiente de la base de datos.
* [cite_start]**Paquetes Dinámicos**: Sin límite de cantidad[cite: 27]. [cite_start]El campo `type` debe ser texto libre para definir el nombre del paquete (ej. "Básico", "Premium", "Plan personalizado")[cite: 29, 30].
* **Portfolio Dinámico**: Permitir añadir múltiples trabajos anteriores con su respectiva imagen, descripción, costo y duración[cite: 34, 37, 48].
* [cite_start]**Ruta Unificada**: La gestión se realiza en `/admin-secret-tazzky`[cite: 18, 35, 51].
**Selector de Categorías:** Implementar un sistema de 3 niveles. Al elegir una Categoría, se filtran las Subcategorías, y al elegir una Subcategoría, se muestran los Servicios específicos.
- **Inclusiones de Paquetes:** Cada paquete debe tener un botón "[+] Añadir característica" para listar ítems específicos que el cliente recibirá.

---

## 🔒 6. Seguridad y Acceso
* [cite_start]**Protección de Rutas**: Solo el usuario autenticado con el correo `joral1004@gmail.com` puede acceder al panel[cite: 5].
* **Autenticación**: Uso de Supabase Auth con Correo y Contraseña. 
* **Redirección**: Usuarios no autorizados en `/admin-secret-tazzky` deben ser enviados automáticamente a `/login-admin`.

---

## 🚀 7. Instrucciones para la IA
* **Modularidad**: Separar la lógica de subida a Supabase Storage en una función utilitaria reutilizable.
* **Responsividad**: El Dashboard y el Marketplace deben ser 100% Mobile Friendly (tráfico de WhatsApp).
* **Feedback**: Mostrar indicadores de carga ("Subiendo imagen...", "Guardando...") mientras se procesa el formulario.
* **Limpieza**: No generar código de ejemplo fuera de las tablas y rutas especificadas.

## 📝 8. Gestión de Gigs Existentes (CRUD)
- [cite_start]**Vista de Tabla**: Debajo del formulario, el Admin debe mostrar una lista de todos los Gigs en la base de datos [cite: 52-53].
- [cite_start]**Columnas de Tabla**: Miniatura (`cover_image`), Título del Gig, Nombre del Pro, y Acciones (Editar/Borrar) [cite: 8-13, 14-26].
- **Lógica de Edición**: 
    - [cite_start]Al pulsar 'Editar', el formulario superior debe precargarse con toda la información del Gig, sus paquetes y su portfolio .
    - [cite_start]El botón 'Guardar' debe transformarse en 'Actualizar Cambios' y ejecutar un `.update()` en Supabase[cite: 52].
- **Lógica de Borrado**: 
    - [cite_start]El botón 'Borrar' debe pedir confirmación .
    - [cite_start]Al confirmar, debe eliminar el Gig y, por cascada, sus paquetes y elementos de portfolio asociados para evitar datos huérfanos .

    ## 🛒 9. Especificaciones del Marketplace (`/servicios`)

Esta es la página principal de ventas. [cite_start]Debe ser extremadamente limpia y enfocada en la conversión .

### A. Hero Section (Promocional)
- [cite_start]**Dinámico**: Debe consumir los datos de la tabla `hero_banners` donde `is_active` sea true [cite: 49-50].
- [cite_start]**Contenido**: Imagen de fondo (Storage), Título impactante, Subtítulo y botón de CTA que redirija al link configurado [cite: 49-53].

### B. Sistema de Filtros
- [cite_start]**Categorías Madre**: Barra horizontal con las 7 categorías principales: Artes gráficas, Programación, Marketing, Video, Escritura, Música y Negocios .
- **Interacción**: Al hacer clic en una categoría, el grid de servicios debe filtrarse instantáneamente sin recargar la página.

### C. Grid de Servicios (Gig Cards)
Cada tarjeta (Card) de servicio debe mostrar:
- [cite_start]**Imagen Principal**: `cover_image` (procedente de Storage) con bordes redondeados arriba [cite: 23-24].
- **Info del Profesional**: 
    - [cite_start]Avatar pequeño y Nombre completo [cite: 8-10].
    - [cite_start]Badge de `Verificado` (Check verde) y `Top Talent` (si aplica) [cite: 11-13].
- **Detalles del Servicio**:
    - [cite_start]Título del Gig (máximo 2 líneas)[cite: 17].
    - [cite_start]Precio: Mostrar "Desde $[precio_minimo]" (buscando el precio más bajo en la tabla `packages`)[cite: 32].
- [cite_start]**Navegación**: Al hacer clic en cualquier parte de la card, redirigir a `/servicios/[slug]` [cite: 21-22].

### D. Estilo Visual (UI)
- **Grid**: 1 columna en móvil, 2 en tablet, 3 o 4 en desktop.
- **Dark Mode**: Fondo `#000000`. [cite_start]Cards con un fondo gris muy oscuro (`#121212`) para resaltar del fondo [cite: 1-3].
- **Skeleton Loaders**: Mostrar estados de carga grises mientras se traen los datos de Supabase.
[cite_start]Cada tarjeta debe ser un componente independiente y altamente visual [cite: 1-2].

### A. Estructura de la Card
- [cite_start]**Contenedor**: Fondo negro puro (`#000000`), bordes redondeados (`rounded-lg`) y sombra sutil para separar del fondo[cite: 3].
- [cite_start]**Imagen Superior (`cover_image`)**: Relación de aspecto 16:9, bordes redondeados solo en las esquinas superiores [cite: 23-24].

### B. Fila de Identidad (Debajo de la imagen)
- [cite_start]**Avatar**: Imagen circular muy pequeña (32px aprox.) a la izquierda[cite: 10].
- [cite_start]**Nombre**: Texto blanco, fuente pequeña, seguido inmediatamente por el **Badge de Verificado** (Check verde)[cite: 9, 13].
- [cite_start]**Badge Top Talent**: Etiqueta rectangular amarilla (`#E2E66B`) con texto negro "Top Talent" en el extremo derecho de la fila[cite: 11].

### C. Contenido y Tipografía
- **Título**: Texto blanco en negrita, máximo 2 líneas. [cite_start]Debe ser el `title` de la tabla `gigs`[cite: 17].
- **Descripción**: Texto gris claro (`#9CA3AF`), fuente pequeña. [cite_start]Es el resumen de la `description` [cite: 25-26].

### D. Acción y Precio (Footer de la Card)
- **Botón de Precio**: Situado en la esquina inferior derecha.
- **Texto**: "Desde $[precio_minimo] MXN". [cite_start]El precio se obtiene del valor más bajo en la tabla `packages`.
- [cite_start]**Estilo**: Fondo Verde Lima (`#A3E635`), texto negro, bordes totalmente redondeados (tipo pill)[cite: 3, 32].

### E. Comportamiento
- [cite_start]**Click**: Toda la card es clicable y redirige a `/servicios/[slug]` [cite: 18, 21-22].

## 📄 10. Especificaciones de Detalle del Gig (`/servicios/[slug]`)

Esta página es el cierre de venta. [cite_start]Debe ser visualmente impactante y funcional. 

### A. Estructura de Imágenes (Carrusel)
- [cite_start]**Cabecera**: Un carrusel dinámico que muestre la `cover_image` (de la tabla `gigs`) seguida de todas las fotos de la tabla `gig_gallery`. 
- **Interacción**: Debe permitir navegar entre fotos con flechas o gestos táctiles (swipe).

### A. Tipografía y Estilo Global
- **Fuente Principal**: **Poppins** (importar de Google Fonts). [cite_start]Sin excepciones. [cite: 1-3]
- **Colores**: Fondo `#000000`, Acento Verde Lima `#E2E66B`.

### B. Galería "Fiverr Style" (Hero)
- **Estructura**: Un contenedor principal dividido en:
    - **Izquierda (Thumbnails)**: Columna delgada con miniaturas cuadradas de las imágenes adicionales.
    - **Centro (Main)**: Imagen seleccionada en grande con flechas laterales de navegación.
- **Interacción**: Al hacer clic en una miniatura, la imagen principal cambia.

### C. Sección de Portfolio (Diseño Estricto)
Cada trabajo del portafolio debe ser una card ancha con fondo negro y borde sutil:
- **Izquierda**: Imagen grande del proyecto. Debajo de esta, una fila de miniaturas adicionales del mismo proyecto.
- **Derecha (Detalles)**:
    - **Fecha**: "Del [Mes] de [Año]" en gris pequeño arriba.
    - **Título**: Texto blanco en negrita.
    - **Descripción**: Párrafo explicativo del trabajo.
    - **Meta-info (Fondo)**: Dos columnas: "Rango de precios" y "Duración" con valores en Verde Lima.
    ### A. Tipografía y Estilos
- **Fuente**: **Poppins** (Importar de Google Fonts). [cite_start]Todo el sitio debe usarla. 
- [cite_start]**Paleta**: Fondo `#000000`, Acento Verde Lima `#E2E66B`, Texto Gris `#9CA3AF`. [cite: 1-3, 32]

### B. Galería Principal (Hero)
- [cite_start]**Layout**: Contenedor flex. 
  - **Miniaturas (Izquierda)**: Columna vertical de 4 imágenes pequeñas cuadradas con bordes redondeados.
  - [cite_start]**Imagen Principal (Derecha)**: Imagen grande con flecha de navegación (`chevron-right`) a la derecha. 

### C. Sidebar de Paquetes (Sticky)
- [cite_start]**Tabs**: Selector horizontal (Básico, Estándar, Premium) con línea de acento Verde Lima en la opción activa. [cite: 27-30]
- [cite_start]**Contenido**: [cite: 31-33]
  - Título del pack, Precio en grande, y descripción breve.
  - Lista de beneficios con iconos de check.
  - Iconos de `lucide-react`: Reloj para "Entrega" y Ojo/Refresh para "Revisiones".
- [cite_start]**Botón**: "Contratar ->" (Ancho completo, Verde Lima, texto negro, esquinas redondeadas). [cite: 32]

### D. Sección de Portfolio (Card Horizontal)
[cite_start]Cada elemento del portafolio debe ser un bloque independiente: [cite: 34, 41-48]
- [cite_start]**Contenedor**: Fondo negro con borde muy sutil (`border-white/10`). 
- **Cuerpo Superior (Flex)**:
  - **Izquierda**: Imagen principal del proyecto.
  - **Derecha**: 
    - [cite_start]Fecha en gris ("Del Mes de Año"). [cite: 43]
    - [cite_start]Título del proyecto en blanco negrita. [cite: 41]
    - [cite_start]Descripción del trabajo realizado. [cite: 47]
    - [cite_start]Fila de 2 columnas: "Rango de precios" y "Duración" (Etiquetas arriba, valores en Verde Lima abajo). [cite: 45-46]
- [cite_start]**Cuerpo Inferior**: Fila de 3 miniaturas adicionales del proyecto específico.

### D. Sidebar de Paquetes
- [cite_start]**Tabs**: DE PAQUETES con línea indicadora inferior. [cite: 27-30]
- **Iconografía**: Usar iconos de `lucide-react` (Check para inclusiones, Clock para entrega, Refresh para revisiones). 

### D. Información del Profesional
- [cite_start]Mostrar el perfil completo: Avatar, nombre con check de verificado y el sello de "Top Talent" si aplica. [cite: 8-13]
## 🖼️ 11. Lógica de Imágenes del Gig
Para maximizar el impacto visual, cada servicio se compone de:

1. **Cover Image (1 sola)**: Es la imagen principal que aparece en el Marketplace. [cite_start]Se define como el primer archivo subido en el selector .
2. **Galería del Gig (Múltiples)**: Imágenes adicionales que forman un carrusel en la página de detalle. Son los archivos 2, 3, etc., del mismo selector.
3. [cite_start]**Portfolio (Sección independiente)**: Casos de estudio específicos que incluyen título, descripción, fecha, rango de precio y duración .
- [cite_start]**Lógica de Datos**: Los elementos del Portfolio (`portfolio_items`) son 100% independientes de la galería del Gig (`gig_gallery`) .
- **Gestión de Imágenes**: 
    - [cite_start]Cada trabajo del portfolio tiene su propia "Imagen Principal" y opcionalmente "Miniaturas adicionales"[cite: 37, 42].
    - Estas imágenes deben subirse a una carpeta específica en el bucket: `tazzky-assets/portfolio/`.
- [cite_start]**Relación**: Al guardar, se debe asegurar que el `gig_id` se asigne correctamente a cada fila de `portfolio_items`.
El portafolio no debe ser una lista infinita, sino una galería funcional:

- [cite_start]**Componente de Selección**: Mostrar una fila de miniaturas de todos los trabajos del portafolio (`portfolio_items`)[cite: 34, 41].
- **Estado Activo**: Al seleccionar una miniatura, el área principal del portafolio debe actualizarse instantáneamente con:
    - [cite_start]La imagen grande del trabajo seleccionado[cite: 42].
    - [cite_start]Los detalles específicos: Fecha, Título, Descripción, Rango de Precio y Duración [cite: 43-47].
- **Independencia**: Cada trabajo es un objeto único. Cambiar de imagen en el portafolio NO debe afectar a la galería principal del Gig ni a los paquetes de precios.
- **Campo Duración**: El valor numérico debe ir acompañado SIEMPRE de la palabra "días" (ej: "4 días"). Si es 1, debe decir "1 día".
- **Campo Fecha**: Debe mostrar el formato completo: **"Día de Mes de Año"** (ej: "10 de Abril de 2001").
- **Estructura Visual**:
    - **NO** usar contenedores anidados (double padding). 
    - El portafolio debe ser una sola card limpia con borde sutil.
    - La sección "Otros Trabajos" (miniaturas) debe estar integrada directamente debajo de la imagen principal del trabajo, sin bordes de contenedor extra que la encierren.
### Cambios en Base de Datos:
- [cite_start]**Tabla `gigs`**: Mantiene `cover_image` (URL de la primera imagen) .
- **Nueva Tabla `gig_gallery`**: Relación `id`, `gig_id` (FK), `image_url` (Para almacenar las imágenes adicionales del carrusel).
## ⚙️ 12. Campos de Perfil en el Formulario
- **Sección Profesional**: Al crear o editar un profesional dentro del formulario de Gig, se deben incluir:
    - **Ubicación (Input)**: Texto simple (ej: "CDMX, México").
    - **Idiomas (Input)**: Texto simple (ej: "Español, Inglés").
    - **Bio (Textarea)**: Breve descripción del profesional.
- **Persistencia**: Estos datos deben guardarse en la tabla `marketplace_pros`.
## 🏁 13. Flujo de Pago y Agradecimiento
- **Ruta**: `/agradecimiento`
- **Lógica de Entrada**: La página recibe por URL los datos: `gig`, `package`, `price`, `pro`.
- **Diseño**: Dark Mode, Poppins, con un mensaje de confianza: "Tu pedido está casi listo".
- **Redirección Automática**: 
    - Mostrar un contador de 3 segundos o un spinner de carga.
    - Después de 3 segundos, abrir el link de WhatsApp en una nueva pestaña.
- **Botón de Respaldo**: Un botón Verde Lima que diga "Ir a WhatsApp ahora" por si el navegador bloquea la ventana emergente.

## 🖼️ 16. Metadatos para Previsualización (SEO/Social)
La ruta `/servicios/[slug]` debe generar metadatos dinámicos para que al compartir el link en WhatsApp se vea una miniatura:
- **og:title**: Título del Gig + "en Tazzky".
- **og:description**: Breve resumen del servicio y el precio "Desde".
- **og:image**: La `cover_image` del Gig (URL completa de Supabase Storage).
- **og:url**: La URL real del servicio (ej: `https://tazzky.com/servicios/diseno-logo`).
## 📦 17. Navegación de Paquetes (Escalabilidad)
- **Selector de Tabs**: Si hay más de 3 paquetes, el contenedor de pestañas debe permitir **scroll horizontal** (`overflow-x-auto`) en móvil y escritorio.
- **Scrollbar**: Debe ser invisible o muy sutil (estilo minimalista).
- **Indicador**: Asegurarse de que el paquete activo siempre esté visible al hacer clic.

## 🔗 18. Herramientas de Compartir (Social Share)
- **Componente**: Debajo del botón de 'Contratar', reemplazar el texto por una fila de botones de acción:
    - **Botón Copiar Link**: Al dar clic, copiar la URL al portapapeles y mostrar un mensaje de "¡Copiado!".
    - **Botones de Redes**: Iconos de WhatsApp, Facebook, X (Twitter), Threads e Instagram.
- **Lógica**: Cada botón debe abrir el link de compartir oficial de cada red con la URL del Gig.

## 💰 19. Gestión de Multidivisa (MVP)
- **Dashboard de Admin**: 
    - En la sección de Paquetes, añadir un selector (Dropdown) de divisa: `MXN`, `USD`, `COP`, `ARS`, `CLP`.
    - El precio guardado en la DB debe estar asociado a esa divisa.
- **Visualización en Marketplace**:
    - Las cards ya no dirán fijamente "MXN". Deben mostrar: `$[precio] [currency]`.
- **Lógica de "Desde"**:
    - Si un Gig tiene paquetes en diferentes divisas (no recomendado, pero posible), el "Desde" debe mostrar la moneda del paquete más económico.

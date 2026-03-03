# Configuración de Supabase para Tazzky Landing

## 📋 Pasos para Configurar Supabase

### 1. Acceder al Dashboard de Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Inicia sesión con tu cuenta
3. Selecciona tu proyecto de Tazzky

### 2. Ejecutar el Script SQL

1. En el dashboard de Supabase, ve a **SQL Editor**
2. Crea un nuevo query
3. Copia y pega todo el contenido del archivo `supabase-setup.sql`
4. Haz clic en **Run** para ejecutar el script

### 3. Verificar la Configuración

Después de ejecutar el script, deberías ver:

#### ✅ Tablas Creadas:
- `landing_leads` - Leads de usuarios beta
- `professional_applications` - Aplicaciones de profesionales
- `service_categories` - Categorías de servicios
- `professionals` - Profesionales destacados
- `testimonials` - Testimonios de usuarios
- `faq` - Preguntas frecuentes

#### ✅ Datos Iniciales:
- 8 categorías de servicios
- 4 profesionales destacados
- 4 testimonios
- 8 preguntas frecuentes

#### ✅ Políticas de Seguridad:
- RLS habilitado en todas las tablas
- Políticas de inserción pública para formularios
- Políticas de lectura restringida para datos sensibles

### 4. Configurar Variables de Entorno

Asegúrate de que tu archivo `.env.local` contenga:

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_url_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
```

### 5. Probar la Conexión

Puedes probar la conexión ejecutando:

```bash
npm run dev
```

Y verificar en la consola del navegador que no hay errores de conexión.

## 🔧 Funciones Disponibles

Una vez configurado, tendrás acceso a estas funciones:

### Para Leads:
- `createLandingLead()` - Crear nuevo lead
- `getLandingLeads()` - Obtener todos los leads

### Para Profesionales:
- `createProfessionalApplication()` - Crear aplicación de profesional
- `getProfessionalApplications()` - Obtener aplicaciones

### Para Categorías:
- `getServiceCategories()` - Obtener categorías activas
- `getServiceCategoryBySlug()` - Obtener categoría por slug

### Para Profesionales Destacados:
- `getFeaturedProfessionals()` - Obtener profesionales destacados
- `getProfessionalsByCategory()` - Obtener por categoría

### Para Testimonios:
- `getFeaturedTestimonials()` - Obtener testimonios destacados

### Para FAQ:
- `getFAQByCategory()` - Obtener FAQ por categoría
- `getAllFAQ()` - Obtener todas las FAQ

### Para Estadísticas:
- `getLandingStats()` - Obtener estadísticas de la landing

### Para Validación:
- `checkEmailExists()` - Verificar si un email ya existe

## 📊 Estructura de Datos

### landing_leads
```sql
- id (UUID, Primary Key)
- email (VARCHAR, Unique)
- full_name (VARCHAR)
- interest_type (ENUM: 'client', 'professional')
- category (VARCHAR, Optional)
- message (TEXT, Optional)
- notification_preference (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### professional_applications
```sql
- id (UUID, Primary Key)
- full_name (VARCHAR)
- email (VARCHAR, Unique)
- phone (VARCHAR, Optional)
- category (VARCHAR)
- subcategories (TEXT[])
- experience_years (INTEGER)
- portfolio_url (VARCHAR, Optional)
- description (TEXT)
- availability (ENUM: 'full-time', 'part-time')
- status (ENUM: 'pending', 'approved', 'rejected')
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### service_categories
```sql
- id (UUID, Primary Key)
- name (VARCHAR, Unique)
- slug (VARCHAR, Unique)
- description (TEXT)
- icon (VARCHAR)
- color (VARCHAR)
- is_active (BOOLEAN)
- sort_order (INTEGER)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

## 🔒 Seguridad

### Políticas RLS Configuradas:

1. **landing_leads**:
   - ✅ Inserción pública (para formularios)
   - 🔒 Lectura solo para usuarios autenticados

2. **professional_applications**:
   - ✅ Inserción pública (para formularios)
   - 🔒 Lectura solo para usuarios autenticados

3. **service_categories**:
   - ✅ Lectura pública (solo categorías activas)

4. **professionals**:
   - ✅ Lectura pública

5. **testimonials**:
   - ✅ Lectura pública (solo testimonios destacados)

6. **faq**:
   - ✅ Lectura pública (solo FAQ activas)

## 📈 Monitoreo

### Métricas Disponibles:
- Total de leads registrados
- Leads por tipo (client/professional)
- Aplicaciones de profesionales
- Categorías más populares

### Dashboard de Supabase:
- Ve a **Analytics** en el dashboard
- Monitorea las consultas y el rendimiento
- Revisa los logs de errores

## 🚀 Próximos Pasos

1. **Implementar formularios** usando las funciones creadas
2. **Configurar notificaciones** por email
3. **Integrar con CRM** (Airtable, Notion, etc.)
4. **Configurar analytics** para tracking de conversiones

## ❓ Troubleshooting

### Error: "Missing Supabase environment variables"
- Verifica que las variables de entorno estén configuradas
- Reinicia el servidor de desarrollo

### Error: "relation does not exist"
- Ejecuta el script SQL completo
- Verifica que todas las tablas se crearon

### Error: "permission denied"
- Verifica las políticas RLS
- Asegúrate de que las políticas permitan las operaciones necesarias

### Error: "duplicate key value"
- El email ya existe en la base de datos
- Implementa validación antes de insertar

## 📞 Soporte

Si tienes problemas con la configuración:
1. Revisa los logs en el dashboard de Supabase
2. Verifica la documentación oficial de Supabase
3. Consulta los errores en la consola del navegador

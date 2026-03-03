# Tabla: professional_registrations

## Descripción
Tabla para almacenar los registros completos de profesionales con toda su información de identidad, contacto, operación, pagos y validación.

## Estructura SQL

```sql
-- Crear tabla professional_registrations
CREATE TABLE professional_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- 1. IDENTIDAD DEL PROFESIONAL
  representative_name VARCHAR(100) NOT NULL,
  business_name VARCHAR(100) NOT NULL,
  specialty VARCHAR(100) NOT NULL,
  years_experience INTEGER NOT NULL CHECK (years_experience >= 0),
  service_city VARCHAR(50) NOT NULL,
  
  -- 2. DATOS DE CONTACTO
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  whatsapp VARCHAR(20) NOT NULL,
  
  -- 3. OPERACIÓN DEL SERVICIO
  service_type VARCHAR(20) NOT NULL CHECK (service_type IN ('presencial', 'digital', 'ambos')),
  labor_price DECIMAL(10, 2) NOT NULL CHECK (labor_price >= 0),
  requires_materials BOOLEAN DEFAULT FALSE,
  service_zone TEXT NOT NULL,
  working_hours TEXT NOT NULL,
  
  -- 4. PAGOS
  bank_account_holder VARCHAR(100) NOT NULL,
  clabe VARCHAR(18) NOT NULL UNIQUE,
  
  -- 5. VALIDACIÓN DE CONFIANZA
  social_media_url VARCHAR(255) NOT NULL,
  work_photo_url VARCHAR(255),
  
  -- 6. ACEPTACIÓN LEGAL
  terms_accepted BOOLEAN NOT NULL DEFAULT FALSE,
  payment_only_tazzky BOOLEAN NOT NULL DEFAULT FALSE,
  no_off_platform_payment BOOLEAN NOT NULL DEFAULT FALSE,
  
  -- Metadata
  status VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para búsquedas rápidas
CREATE INDEX idx_professional_registrations_email ON professional_registrations(email);
CREATE INDEX idx_professional_registrations_status ON professional_registrations(status);
CREATE INDEX idx_professional_registrations_created_at ON professional_registrations(created_at);
CREATE INDEX idx_professional_registrations_specialty ON professional_registrations(specialty);

-- Crear tabla de auditoría para cambios de estado
CREATE TABLE professional_registrations_audit (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  registration_id UUID NOT NULL REFERENCES professional_registrations(id) ON DELETE CASCADE,
  old_status VARCHAR(20),
  new_status VARCHAR(20),
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  changed_by VARCHAR(100)
);

-- Trigger para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_professional_registrations_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_professional_registrations_timestamp
BEFORE UPDATE ON professional_registrations
FOR EACH ROW
EXECUTE FUNCTION update_professional_registrations_timestamp();
```

## Row Level Security (RLS)

```sql
-- Habilitar RLS
ALTER TABLE professional_registrations ENABLE ROW LEVEL SECURITY;

-- Política: Usuarios anónimos pueden insertar (registrarse)
CREATE POLICY "Permitir insert anónimo" ON professional_registrations
  FOR INSERT 
  WITH CHECK (true);

-- Política: Solo el admin puede leer todos los registros
CREATE POLICY "Admin puede leer todo" ON professional_registrations
  FOR SELECT 
  USING (auth.role() = 'authenticated' AND (SELECT role FROM users WHERE id = auth.uid()) = 'admin');

-- Política: Los profesionales solo pueden ver su propio registro
CREATE POLICY "Profesional puede ver su registro" ON professional_registrations
  FOR SELECT 
  USING (email = auth.email());

-- Política: Admin puede actualizar estado
CREATE POLICY "Admin puede actualizar" ON professional_registrations
  FOR UPDATE 
  USING (auth.role() = 'authenticated' AND (SELECT role FROM users WHERE id = auth.uid()) = 'admin')
  WITH CHECK (auth.role() = 'authenticated' AND (SELECT role FROM users WHERE id = auth.uid()) = 'admin');
```

## Campos Requeridos

### 1. IDENTIDAD DEL PROFESIONAL (obligatorio)
- `representative_name`: Nombre completo del representante
- `business_name`: Nombre comercial del negocio
- `specialty`: Especialidad / Servicio principal
- `years_experience`: Años de experiencia
- `service_city`: Ciudad donde presta servicio

### 2. DATOS DE CONTACTO (obligatorio)
- `phone`: Teléfono (mínimo 10 dígitos)
- `email`: Correo electrónico (único)
- `whatsapp`: WhatsApp (mínimo 10 dígitos)

### 3. OPERACIÓN DEL SERVICIO (obligatorio)
- `service_type`: Tipo de servicio (presencial, digital, ambos)
- `labor_price`: Precio aproximado de mano de obra
- `requires_materials`: ¿Requiere materiales?
- `service_zone`: Zona de atención
- `working_hours`: Horarios de atención

### 4. PAGOS (obligatorio)
- `bank_account_holder`: Nombre del titular de la cuenta
- `clabe`: CLABE interbancaria (18 dígitos, único)

### 5. VALIDACIÓN DE CONFIANZA (obligatorio)
- `social_media_url`: Enlace a red social
- `work_photo_url`: Fotografía de trabajo realizado (opcional)

### 6. ACEPTACIÓN LEGAL (obligatorio)
- `terms_accepted`: Acepta términos y condiciones
- `payment_only_tazzky`: Acepta pagos solo por Tazzky
- `no_off_platform_payment`: Entiende prohibición de cobrar por fuera

## Validaciones

1. **Email**: Único y válido
2. **CLABE**: Exactamente 18 dígitos, único
3. **Teléfono/WhatsApp**: Mínimo 10 dígitos
4. **Service Type**: Solo valores válidos (presencial, digital, ambos)
5. **Status**: Solo valores válidos (pending, approved, rejected)
6. **Precio**: No puede ser negativo
7. **Años de experiencia**: No puede ser negativo
8. **URLs**: Deben ser URLs válidas

## Vistas Útiles

```sql
-- Vista: Profesionales aprobados por especialidad
CREATE VIEW view_approved_professionals_by_specialty AS
SELECT 
  specialty,
  COUNT(*) as total_approved,
  AVG(years_experience) as avg_experience
FROM professional_registrations
WHERE status = 'approved'
GROUP BY specialty;

-- Vista: Registros pendientes de revisión
CREATE VIEW view_pending_registrations AS
SELECT 
  id,
  representative_name,
  business_name,
  specialty,
  email,
  created_at
FROM professional_registrations
WHERE status = 'pending'
ORDER BY created_at ASC;
```

## Notas de Operación

1. **Revisión Manual**: Los registros comienzan con estado `pending` y deben ser revisados manualmente
2. **Email Único**: El email es único para evitar duplicados
3. **CLABE Única**: La CLABE es única para evitar errores en pagos
4. **Auditoría**: La tabla `professional_registrations_audit` guarda el historial de cambios
5. **RLS Importante**: Configurar correctamente las políticas de acceso según tus roles de usuario

## Campos de Ayuda

- **representative_name**: Es el nombre de la persona que firma el contrato
- **business_name**: Puede ser igual al nombre del representante si es freelancer
- **specialty**: La categoría de servicio principal (Electricidad, Plomería, etc.)
- **labor_price**: Precio aproximado por hora o por trabajo
- **service_zone**: Ej: "Centro, Cuauhtémoc, Benito Juárez"
- **working_hours**: Ej: "Lunes a Viernes 8:00am - 6:00pm"
- **clabe**: Se obtiene en banca electrónica o en la tarjeta de débito
- **status**: 
  - `pending`: Esperando revisión
  - `approved`: Verificado y activo
  - `rejected`: No cumple requisitos

---
**Última actualización**: Diciembre 9, 2025

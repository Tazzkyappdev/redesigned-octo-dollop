-- =====================================================
-- CONFIGURACIÓN DE BASE DE DATOS PARA TAZZKY LANDING
-- =====================================================

-- Habilitar extensiones necesarias
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =====================================================
-- TABLA: landing_leads (Leads de usuarios beta)
-- =====================================================
CREATE TABLE IF NOT EXISTS landing_leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  email VARCHAR(255) NOT NULL UNIQUE,
  full_name VARCHAR(255) NOT NULL,
  interest_type VARCHAR(20) NOT NULL CHECK (interest_type IN ('client', 'professional')),
  category VARCHAR(100),
  message TEXT,
  notification_preference BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para landing_leads
CREATE INDEX IF NOT EXISTS idx_landing_leads_email ON landing_leads(email);
CREATE INDEX IF NOT EXISTS idx_landing_leads_interest_type ON landing_leads(interest_type);
CREATE INDEX IF NOT EXISTS idx_landing_leads_created_at ON landing_leads(created_at);

-- =====================================================
-- TABLA: professional_applications (Aplicaciones de profesionales)
-- =====================================================
CREATE TABLE IF NOT EXISTS professional_applications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20),
  category VARCHAR(100) NOT NULL,
  subcategories TEXT[], -- Array de subcategorías
  experience_years INTEGER NOT NULL CHECK (experience_years >= 0),
  portfolio_url VARCHAR(500),
  description TEXT,
  availability VARCHAR(20) NOT NULL CHECK (availability IN ('full-time', 'part-time')),
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para professional_applications
CREATE INDEX IF NOT EXISTS idx_professional_applications_email ON professional_applications(email);
CREATE INDEX IF NOT EXISTS idx_professional_applications_category ON professional_applications(category);
CREATE INDEX IF NOT EXISTS idx_professional_applications_status ON professional_applications(status);
CREATE INDEX IF NOT EXISTS idx_professional_applications_created_at ON professional_applications(created_at);

-- =====================================================
-- TABLA: service_categories (Categorías de servicios)
-- =====================================================
CREATE TABLE IF NOT EXISTS service_categories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50),
  color VARCHAR(50),
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para service_categories
CREATE INDEX IF NOT EXISTS idx_service_categories_slug ON service_categories(slug);
CREATE INDEX IF NOT EXISTS idx_service_categories_active ON service_categories(is_active);
CREATE INDEX IF NOT EXISTS idx_service_categories_sort_order ON service_categories(sort_order);

-- =====================================================
-- TABLA: professionals (Profesionales destacados para testimonios)
-- =====================================================
CREATE TABLE IF NOT EXISTS professionals (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  business_name VARCHAR(255) NOT NULL,
  description TEXT,
  rating DECIMAL(3,2) CHECK (rating >= 0 AND rating <= 5),
  total_reviews INTEGER DEFAULT 0 CHECK (total_reviews >= 0),
  services_count INTEGER DEFAULT 0 CHECK (services_count >= 0),
  avatar_url VARCHAR(500),
  category VARCHAR(100),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para professionals
CREATE INDEX IF NOT EXISTS idx_professionals_featured ON professionals(is_featured);
CREATE INDEX IF NOT EXISTS idx_professionals_rating ON professionals(rating);
CREATE INDEX IF NOT EXISTS idx_professionals_category ON professionals(category);

-- =====================================================
-- TABLA: testimonials (Testimonios de usuarios)
-- =====================================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  author_name VARCHAR(255) NOT NULL,
  author_role VARCHAR(255),
  content TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para testimonials
CREATE INDEX IF NOT EXISTS idx_testimonials_featured ON testimonials(is_featured);
CREATE INDEX IF NOT EXISTS idx_testimonials_rating ON testimonials(rating);

-- =====================================================
-- TABLA: faq (Preguntas frecuentes)
-- =====================================================
CREATE TABLE IF NOT EXISTS faq (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'general',
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para faq
CREATE INDEX IF NOT EXISTS idx_faq_category ON faq(category);
CREATE INDEX IF NOT EXISTS idx_faq_active ON faq(is_active);
CREATE INDEX IF NOT EXISTS idx_faq_sort_order ON faq(sort_order);

-- =====================================================
-- FUNCIONES Y TRIGGERS
-- =====================================================

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers para actualizar updated_at
CREATE TRIGGER update_landing_leads_updated_at 
  BEFORE UPDATE ON landing_leads 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professional_applications_updated_at 
  BEFORE UPDATE ON professional_applications 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_service_categories_updated_at 
  BEFORE UPDATE ON service_categories 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_professionals_updated_at 
  BEFORE UPDATE ON professionals 
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- DATOS INICIALES
-- =====================================================

-- Insertar categorías de servicios
INSERT INTO service_categories (name, slug, description, icon, color, sort_order) VALUES
('Diseño', 'diseno', 'Servicios de diseño gráfico, branding y creatividad', '🎨', 'from-pink-500 to-rose-500', 1),
('Marketing', 'marketing', 'Marketing digital, redes sociales y publicidad', '📈', 'from-blue-500 to-cyan-500', 2),
('Foto/Video', 'foto-video', 'Fotografía, edición de video y producción audiovisual', '📷', 'from-purple-500 to-violet-500', 3),
('Hogar', 'hogar', 'Servicios domésticos y mantenimiento del hogar', '🏠', 'from-green-500 to-emerald-500', 4),
('Clases', 'clases', 'Educación, tutorías y enseñanza', '📚', 'from-yellow-500 to-orange-500', 5),
('Tecnología', 'tecnologia', 'Desarrollo, soporte técnico y consultoría IT', '💻', 'from-indigo-500 to-blue-500', 6),
('Salud', 'salud', 'Bienestar, fitness y servicios de salud', '💪', 'from-red-500 to-pink-500', 7),
('Negocios', 'negocios', 'Consultoría empresarial y servicios profesionales', '💼', 'from-gray-500 to-slate-500', 8)
ON CONFLICT (name) DO NOTHING;

-- Insertar profesionales destacados (ejemplos)
INSERT INTO professionals (business_name, description, rating, total_reviews, services_count, category, is_featured) VALUES
('Ana López Design', 'Diseñadora gráfica especializada en branding y UI/UX', 4.9, 127, 45, 'Diseño', true),
('Carlos Marketing Pro', 'Experto en marketing digital y estrategias de crecimiento', 4.8, 89, 32, 'Marketing', true),
('María Fotografía', 'Fotógrafa profesional para eventos y retratos', 4.9, 156, 67, 'Foto/Video', true),
('Tech Solutions MX', 'Desarrollo web y aplicaciones móviles', 4.7, 203, 89, 'Tecnología', true)
ON CONFLICT DO NOTHING;

-- Insertar testimonios (ejemplos)
INSERT INTO testimonials (author_name, author_role, content, rating, is_featured) VALUES
('Laura Martínez', 'Emprendedora', 'Tazzky me ayudó a encontrar un diseñador increíble para mi logo. El proceso fue súper fácil y rápido.', 5, true),
('Roberto Sánchez', 'CEO Startup', 'Como profesional, Tazzky me ha permitido conseguir más clientes de calidad. La plataforma es intuitiva y eficiente.', 5, true),
('Carmen García', 'Freelancer', 'Excelente experiencia usando Tazzky. Los clientes son serios y el sistema de pagos es confiable.', 4, true),
('Miguel Torres', 'Empresario', 'Encontré un desarrollador web excepcional en Tazzky. El proyecto se entregó a tiempo y con calidad superior.', 5, true)
ON CONFLICT DO NOTHING;

-- Insertar FAQ
INSERT INTO faq (question, answer, category, sort_order) VALUES
('¿Tazzky es gratis para usuarios?', 'Sí, Tazzky es completamente gratis para usuarios que buscan servicios. Algunos servicios podrían cobrar comisión al profesional.', 'general', 1),
('¿Qué es la beta?', 'La beta es el período de lanzamiento temprano donde ofrecemos acceso prioritario a usuarios seleccionados, sin comisiones y con soporte directo del equipo.', 'beta', 1),
('¿Cuándo se lanza oficialmente?', 'Estamos planificando el lanzamiento oficial para Q2 2024. Los usuarios beta tendrán acceso anticipado.', 'beta', 2),
('¿Cómo funciona el registro beta?', 'Regístrate ahora con tu email y te notificaremos cuando tengas acceso a la plataforma beta.', 'beta', 3),
('¿Los profesionales pagan algo durante la beta?', 'No, durante el período beta no hay comisiones por transacciones. Es completamente gratis para profesionales.', 'professionals', 1),
('¿Cómo pago por los servicios?', 'Próximamente integraremos métodos de pago seguros como Stripe y Conekta para facilitar las transacciones.', 'general', 2),
('¿Qué pasa si el servicio no cumple mis expectativas?', 'Ofrecemos soporte y mediación en caso de problemas. Nuestro equipo está disponible para resolver cualquier disputa.', 'general', 3),
('¿Puedo convertir mi cuenta de usuario a profesional?', 'Sí, puedes cambiar tu tipo de cuenta desde tu perfil en cualquier momento.', 'professionals', 2)
ON CONFLICT DO NOTHING;

-- =====================================================
-- POLÍTICAS DE SEGURIDAD (RLS)
-- =====================================================

-- Habilitar RLS en todas las tablas
ALTER TABLE landing_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE professional_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE professionals ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;

-- Políticas para landing_leads (solo inserción pública, lectura restringida)
CREATE POLICY "Allow public insert on landing_leads" ON landing_leads
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on landing_leads" ON landing_leads
  FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para professional_applications (solo inserción pública, lectura restringida)
CREATE POLICY "Allow public insert on professional_applications" ON professional_applications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow authenticated read on professional_applications" ON professional_applications
  FOR SELECT USING (auth.role() = 'authenticated');

-- Políticas para service_categories (lectura pública)
CREATE POLICY "Allow public read on service_categories" ON service_categories
  FOR SELECT USING (is_active = true);

-- Políticas para professionals (lectura pública)
CREATE POLICY "Allow public read on professionals" ON professionals
  FOR SELECT USING (true);

-- Políticas para testimonials (lectura pública)
CREATE POLICY "Allow public read on testimonials" ON testimonials
  FOR SELECT USING (is_featured = true);

-- Políticas para faq (lectura pública)
CREATE POLICY "Allow public read on faq" ON faq
  FOR SELECT USING (is_active = true);

-- =====================================================
-- COMENTARIOS Y DOCUMENTACIÓN
-- =====================================================

COMMENT ON TABLE landing_leads IS 'Leads capturados desde la landing page para registro beta';
COMMENT ON TABLE professional_applications IS 'Aplicaciones de profesionales para unirse a la plataforma';
COMMENT ON TABLE service_categories IS 'Categorías de servicios disponibles en la plataforma';
COMMENT ON TABLE professionals IS 'Profesionales destacados para mostrar en testimonios';
COMMENT ON TABLE testimonials IS 'Testimonios de usuarios para construir confianza';
COMMENT ON TABLE faq IS 'Preguntas frecuentes para resolver dudas de usuarios';

-- =====================================================
-- FINALIZACIÓN
-- =====================================================

-- Verificar que todas las tablas se crearon correctamente
SELECT 
  table_name,
  table_type
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('landing_leads', 'professional_applications', 'service_categories', 'professionals', 'testimonials', 'faq')
ORDER BY table_name;

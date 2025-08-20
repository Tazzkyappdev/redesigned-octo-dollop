import { supabase } from './supabase'
import type { 
  LandingLead, 
  ProfessionalApplication, 
  ServiceCategory, 
  Professional 
} from './supabase'

// =====================================================
// FUNCIONES PARA LANDING LEADS
// =====================================================

export async function createLandingLead(data: Omit<LandingLead, 'id' | 'created_at'>) {
  try {
    // Nota: No hacemos .select() tras el insert porque RLS permite insertar pero no leer como anónimo
    const { error } = await supabase
      .from('landing_leads')
      .insert([data])

    if (error) {
      const normalized = {
        code: (error as any)?.code ?? (error as any)?.status ?? 'unknown',
        message: (error as any)?.message ?? 'Unknown error',
        details: (error as any)?.details ?? null
      }
      console.error('Error creating landing lead:', normalized)
      throw normalized
    }

    return { success: true }
  } catch (error) {
    console.error('Error in createLandingLead:', error)
    return { success: false, error }
  }
}

export async function getLandingLeads() {
  try {
    const { data: leads, error } = await supabase
      .from('landing_leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching landing leads:', error)
      throw error
    }

    return { success: true, data: leads }
  } catch (error) {
    console.error('Error in getLandingLeads:', error)
    return { success: false, error }
  }
}

// =====================================================
// FUNCIONES PARA PROFESSIONAL APPLICATIONS
// =====================================================

export async function createProfessionalApplication(data: Omit<ProfessionalApplication, 'id' | 'created_at'>) {
  try {
    // Nota: No hacemos .select() tras el insert por la misma razón de RLS
    const { error } = await supabase
      .from('professional_applications')
      .insert([data])

    if (error) {
      const normalized = {
        code: (error as any)?.code ?? (error as any)?.status ?? 'unknown',
        message: (error as any)?.message ?? 'Unknown error',
        details: (error as any)?.details ?? null
      }
      console.error('Error creating professional application:', normalized)
      throw normalized
    }

    return { success: true }
  } catch (error) {
    console.error('Error in createProfessionalApplication:', error)
    return { success: false, error }
  }
}

export async function getProfessionalApplications() {
  try {
    const { data: applications, error } = await supabase
      .from('professional_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching professional applications:', error)
      throw error
    }

    return { success: true, data: applications }
  } catch (error) {
    console.error('Error in getProfessionalApplications:', error)
    return { success: false, error }
  }
}

// =====================================================
// FUNCIONES PARA SERVICE CATEGORIES
// =====================================================

export async function getServiceCategories() {
  try {
    const { data: categories, error } = await supabase
      .from('service_categories')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching service categories:', error)
      throw error
    }

    return { success: true, data: categories }
  } catch (error) {
    console.error('Error in getServiceCategories:', error)
    return { success: false, error }
  }
}

export async function getServiceCategoryBySlug(slug: string) {
  try {
    const { data: category, error } = await supabase
      .from('service_categories')
      .select('*')
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) {
      console.error('Error fetching service category:', error)
      throw error
    }

    return { success: true, data: category }
  } catch (error) {
    console.error('Error in getServiceCategoryBySlug:', error)
    return { success: false, error }
  }
}

// =====================================================
// FUNCIONES PARA PROFESSIONALS
// =====================================================

export async function getFeaturedProfessionals() {
  try {
    const { data: professionals, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(6)

    if (error) {
      console.error('Error fetching featured professionals:', error)
      throw error
    }

    return { success: true, data: professionals }
  } catch (error) {
    console.error('Error in getFeaturedProfessionals:', error)
    return { success: false, error }
  }
}

export async function getProfessionalsByCategory(category: string) {
  try {
    const { data: professionals, error } = await supabase
      .from('professionals')
      .select('*')
      .eq('category', category)
      .order('rating', { ascending: false })

    if (error) {
      console.error('Error fetching professionals by category:', error)
      throw error
    }

    return { success: true, data: professionals }
  } catch (error) {
    console.error('Error in getProfessionalsByCategory:', error)
    return { success: false, error }
  }
}

// =====================================================
// FUNCIONES PARA TESTIMONIALS
// =====================================================

export async function getFeaturedTestimonials() {
  try {
    const { data: testimonials, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('is_featured', true)
      .order('rating', { ascending: false })
      .limit(4)

    if (error) {
      console.error('Error fetching featured testimonials:', error)
      throw error
    }

    return { success: true, data: testimonials }
  } catch (error) {
    console.error('Error in getFeaturedTestimonials:', error)
    return { success: false, error }
  }
}

// =====================================================
// FUNCIONES PARA FAQ
// =====================================================

export async function getFAQByCategory(category: string = 'general') {
  try {
    const { data: faqs, error } = await supabase
      .from('faq')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching FAQ:', error)
      throw error
    }

    return { success: true, data: faqs }
  } catch (error) {
    console.error('Error in getFAQByCategory:', error)
    return { success: false, error }
  }
}

export async function getAllFAQ() {
  try {
    const { data: faqs, error } = await supabase
      .from('faq')
      .select('*')
      .eq('is_active', true)
      .order('category', { ascending: true })
      .order('sort_order', { ascending: true })

    if (error) {
      console.error('Error fetching all FAQ:', error)
      throw error
    }

    return { success: true, data: faqs }
  } catch (error) {
    console.error('Error in getAllFAQ:', error)
    return { success: false, error }
  }
}

// =====================================================
// FUNCIONES DE ESTADÍSTICAS
// =====================================================

export async function getLandingStats() {
  try {
    // Contar leads totales
    const { count: totalLeads, error: leadsError } = await supabase
      .from('landing_leads')
      .select('*', { count: 'exact', head: true })

    if (leadsError) throw leadsError

    // Contar aplicaciones de profesionales
    const { count: totalProfessionals, error: profError } = await supabase
      .from('professional_applications')
      .select('*', { count: 'exact', head: true })

    if (profError) throw profError

    // Contar leads de clientes
    const { count: clientLeads, error: clientError } = await supabase
      .from('landing_leads')
      .select('*', { count: 'exact', head: true })
      .eq('interest_type', 'client')

    if (clientError) throw clientError

    return {
      success: true,
      data: {
        totalLeads: totalLeads || 0,
        totalProfessionals: totalProfessionals || 0,
        clientLeads: clientLeads || 0,
        professionalLeads: (totalLeads || 0) - (clientLeads || 0)
      }
    }
  } catch (error) {
    console.error('Error in getLandingStats:', error)
    return { success: false, error }
  }
}

// =====================================================
// FUNCIONES DE VALIDACIÓN
// =====================================================

export async function checkEmailExists(email: string) {
  try {
    // Verificar en landing_leads
    const { data: leadExists, error: leadError } = await supabase
      .from('landing_leads')
      .select('email')
      .eq('email', email)
      .single()

    if (leadError && leadError.code !== 'PGRST116') {
      throw leadError
    }

    // Verificar en professional_applications
    const { data: profExists, error: profError } = await supabase
      .from('professional_applications')
      .select('email')
      .eq('email', email)
      .single()

    if (profError && profError.code !== 'PGRST116') {
      throw profError
    }

    return {
      success: true,
      exists: !!(leadExists || profExists),
      data: { leadExists: !!leadExists, profExists: !!profExists }
    }
  } catch (error) {
    console.error('Error in checkEmailExists:', error)
    return { success: false, error }
  }
}

// =====================================================
// FUNCIONES DE UTILIDAD
// =====================================================

export function formatDate(date: string | Date) {
  return new Date(date).toLocaleDateString('es-MX', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export function truncateText(text: string, maxLength: number = 100) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

export function generateSlug(text: string) {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

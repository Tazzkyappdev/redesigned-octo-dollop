import { supabase, isSupabaseConfigured } from './supabase'
import type { 
  LandingLead, 
  ProfessionalApplication
} from './supabase'

// =====================================================
// TIPOS PARA ERROR HANDLING
// =====================================================

interface PostgrestError {
  code?: string
  status?: number
  message?: string
  details?: string | null
}

interface NormalizedError {
  code: string
  message: string
  details: string | null
}

const missingSupabaseError = {
  success: false,
  error: 'Missing Supabase environment variables'
}

function getSupabaseClientOrFail(functionName: string) {
  if (!isSupabaseConfigured || !supabase) {
    console.error(`${functionName}: Missing Supabase environment variables`)
    return null
  }

  return supabase
}

interface ProfessionalRegistrationData {
  first_name: string
  last_name: string
  email: string
  phone: string
  profession: string
  experience_years: number
  bio?: string
  service_categories?: string[]
  hourly_rate?: number
  availability?: string
  [key: string]: unknown
}

// =====================================================
// FUNCIONES PARA LANDING LEADS
// =====================================================

export async function createLandingLead(data: Omit<LandingLead, 'id' | 'created_at'>) {
  try {
    const client = getSupabaseClientOrFail('createLandingLead')
    if (!client) return missingSupabaseError

    const response = await client
      .from('landing_leads')
      .insert([data])

    const { error } = response

    if (error) {
      // Manejar errores específicos
      if ((error as any)?.code === '23505') {
        throw new Error('Este email ya está registrado en nuestra lista de espera')
      }
      
      const message = (error as any)?.message || 'Error al guardar tu registro'
      throw new Error(message)
    }

    return { success: true }
  } catch (error) {
    let errorMessage = 'Error desconocido'
    if (error instanceof Error) {
      errorMessage = error.message
    } else if (typeof error === 'string') {
      errorMessage = error
    } else if (error && typeof error === 'object') {
      errorMessage = JSON.stringify(error)
    }
    
    console.error('Form submission error:', errorMessage)
    return { success: false, error: errorMessage }
  }
}

export async function getLandingLeads() {
  try {
    const client = getSupabaseClientOrFail('getLandingLeads')
    if (!client) return missingSupabaseError

    const { data: leads, error } = await client
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
    const client = getSupabaseClientOrFail('createProfessionalApplication')
    if (!client) return missingSupabaseError

    // Nota: No hacemos .select() tras el insert por la misma razón de RLS
    const { error } = await client
      .from('professional_applications')
      .insert([data])

    if (error) {
      const normalized: NormalizedError = {
        code: (error as PostgrestError)?.code ?? (error as PostgrestError)?.status?.toString() ?? 'unknown',
        message: (error as PostgrestError)?.message ?? 'Unknown error',
        details: (error as PostgrestError)?.details ?? null
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
    const client = getSupabaseClientOrFail('getProfessionalApplications')
    if (!client) return missingSupabaseError

    const { data: applications, error } = await client
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
    const client = getSupabaseClientOrFail('getServiceCategories')
    if (!client) return missingSupabaseError

    const { data: categories, error } = await client
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
    const client = getSupabaseClientOrFail('getServiceCategoryBySlug')
    if (!client) return missingSupabaseError

    const { data: category, error } = await client
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
    const client = getSupabaseClientOrFail('getFeaturedProfessionals')
    if (!client) return missingSupabaseError

    const { data: professionals, error } = await client
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
    const client = getSupabaseClientOrFail('getProfessionalsByCategory')
    if (!client) return missingSupabaseError

    const { data: professionals, error } = await client
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
    const client = getSupabaseClientOrFail('getFeaturedTestimonials')
    if (!client) return missingSupabaseError

    const { data: testimonials, error } = await client
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
    const client = getSupabaseClientOrFail('getFAQByCategory')
    if (!client) return missingSupabaseError

    const { data: faqs, error } = await client
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
    const client = getSupabaseClientOrFail('getAllFAQ')
    if (!client) return missingSupabaseError

    const { data: faqs, error } = await client
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
    const client = getSupabaseClientOrFail('getLandingStats')
    if (!client) return missingSupabaseError

    // Contar leads totales
    const { count: totalLeads, error: leadsError } = await client
      .from('landing_leads')
      .select('*', { count: 'exact', head: true })

    if (leadsError) throw leadsError

    // Contar aplicaciones de profesionales
    const { count: totalProfessionals, error: profError } = await client
      .from('professional_applications')
      .select('*', { count: 'exact', head: true })

    if (profError) throw profError

    // Contar leads de clientes
    const { count: clientLeads, error: clientError } = await client
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
    const client = getSupabaseClientOrFail('checkEmailExists')
    if (!client) return { success: false, exists: false, error: 'Missing Supabase environment variables' }

    // Verificar en landing_leads
    const { data: leadExists, error: leadError } = await client
      .from('landing_leads')
      .select('email')
      .eq('email', email)
      .single()

    if (leadError && leadError.code !== 'PGRST116') {
      throw leadError
    }

    // Verificar en professional_applications
    const { data: profExists, error: profError } = await client
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

// =====================================================
// FUNCIONES PARA REGISTRO DE PROFESIONALES
// =====================================================

export async function createProfessionalRegistration(data: Omit<ProfessionalRegistrationData, 'id' | 'created_at' | 'updated_at'>) {
  try {
    const client = getSupabaseClientOrFail('createProfessionalRegistration')
    if (!client) return missingSupabaseError

    const { error } = await client
      .from('professional_registrations')
      .insert([{ ...data, status: 'pending' }])

    if (error) {
      const normalized: NormalizedError = {
        code: (error as PostgrestError)?.code ?? (error as PostgrestError)?.status?.toString() ?? 'unknown',
        message: (error as PostgrestError)?.message ?? 'Unknown error',
        details: (error as PostgrestError)?.details ?? null
      }
      console.error('Error creating professional registration:', normalized)
      throw normalized
    }

    return { success: true, message: 'Registro enviado correctamente' }
  } catch (error) {
    console.error('Error in createProfessionalRegistration:', error)
    return { success: false, error }
  }
}
